---
title: "Embedding Kayması: Temel Model Çağında Drift'i İzlemek"
description: "768 boyutlu bir gömme vektöründe boyut başına KS testi neden çalışmaz? Yüksek boyutlu kaymayı ölçmenin doğru yolları, gömme modeli sürümünün sessiz etkisi ve kaymanın bozunma anlamına gelmediği gerçeği."
publishDate: "2026-08-13T23:12:00+03:00"
lang: tr
category: "Üretim"
tags: ["Üretim", "Yapay Zeka"]
translation: "embedding-drift-monitoring"
heroImage:
  src: "../../../assets/blog/covers/gomme-kaymasi-izleme.jpg"
  alt: "Embedding Kayması: Temel Model Çağında Drift'i İzlemek"
---

Klasik kayma izleme reçetesi nettir: her özellik (feature) için eğitimdeki dağılımla bugünkü dağılımı karşılaştırın, bir test uygulayın, eşik aşılınca alarm verin. Bu reçete tablo verisinde iş görür. Metin, görüntü ve ses üzerinde çalışan sistemlerde ise elinizde adı olan sütunlar değil, 768 ya da 1.536 sayıdan oluşan bir dizi vardır. Aynı reçeteyi oraya uygulamak neredeyse matematiksel bir kesinlikle yanlış alarm üretir. Bu yazıda yüksek boyutlu temsillerde kaymayı nasıl ölçeceğinizi, gömme modelinin sürümünün neden en sessiz kayma kaynağı olduğunu ve izleme sayfalarının çoğunun atladığı gerçeği konuşuyoruz: kayma, bozunma demek değildir.

## Adı olan özellikten adı olmayan geometriye

Klasik kurulumu hatırlayalım. [Üretimde model izleme ve veri kayması](/posts/model-izleme-drift/) yazısında anlattığımız gibi, izlenen her özellik için eğitimdeki dağılımla bugünkü dağılımı karşılaştırır, bir test uygular, eşik aşılınca uyarırsınız. Bu kurulumun sessiz bir varsayımı vardır: izlediğiniz her sütunun bir adı, bir birimi ve bir anlamı vardır. Kayma çıktığında sonucu tek cümleyle anlatabilirsiniz.

Yapılandırılmamış veriyle çalışan bir sistemde bu varsayım ortadan kalkar. Girdi, bir gömme (embedding) modelinden geçip yüzlerce boyutlu bir vektöre dönüşür ve modelin gördüğü şey artık bu vektördür. [Gömme modelleri ve anlamsal benzerlik](/posts/embedding-semantik-benzerlik/) yazısında anlattığımız gibi, vektörün tek tek boyutlarının kendi başına bir anlamı yoktur; anlam noktaların birbirine göre konumunda, yani uzaklıklarda ve komşuluklarda saklıdır.

Tablo verisi bir adres listesidir: mahalle, sokak, kapı numarası. Gömme uzayı ise bir haritadır. Haritada “412. eksende ortalama 0,03 arttı” cümlesinin bir karşılığı yoktur, çünkü eksenler keyfîdir; haritayı döndürseniz bütün eksen değerleri değişir, harita aynı haritadır. Anlamlı olan tek soru şudur: _nokta bulutunun şekli değişti mi, daha önce hiç bulunmadığımız bölgelere mi taşındık?_

> Tablo verisinde bir özelliğin kayması bir olaydır: başvuranların yaş ortalaması düştü. Gömme uzayında tek bir boyutun kayması bir olay değildir; keyfî bir eksende duran, kendi başına yorumlanamayan bir sayıdır.

## Boyut başına test neden çöker

Buna rağmen pek çok ekip refleks olarak aynı reçeteyi uygular: 768 boyutun her biri için bir Kolmogorov-Smirnov (KS) testi çalıştırıp p-değerlerine bakar. Bu kurulum üç ayrı nedenle bozuktur ve üçü de küçük ayarlarla düzelmez.

**Birincisi, çoklu test.** Yüzde 5 anlamlılık düzeyinde 768 test çalıştırdığınızda, dünyada hiçbir şey değişmemiş olsa bile ortalama otuz sekiz civarında “anlamlı” sonuç üretirsiniz. Bunu her gün yaparsanız panonuz kalıcı olarak kırmızıdır. Kayma tespiti üzerine yeni bir çalışma bu birikimi açıkça adlandırıyor: küçük yanlış pozitif oranları bile zamanla [alarm yorgunluğuna](https://arxiv.org/abs/2607.17336) dönüşebiliyor. Alarm yorgunluğu istatistiksel değil insani bir arızadır ve hep aynı biçimde biter: bir süre sonra kimse bakmaz.

**İkincisi, p-değeri kayma büyüklüğü değildir.** Bir testin p-değeri, etkinin büyüklüğü kadar örneklem büyüklüğünün de fonksiyonudur. Evidently ekibinin notu çok net: KS testi, 100.000’den fazla gözleminiz olduğu anda [yüzde 0,5’lik bir değişimde bile bayrak kaldırır](https://www.evidentlyai.com/blog/data-drift-detection-large-datasets) ve p-değeri kayma miktarının bir ölçümü değildir. Aynı ekip bunu ürün mantığına da yazmış: gözlem sayısı [1.000 eşiğini](https://docs.evidentlyai.com/metrics/explainer_drift) geçtiğinde tespit yöntemini değiştiriyorlar.

**Üçüncüsü, PSI tek başına kurtarmıyor.** Popülasyon Kararlılık İndeksi (PSI) yığın (batch) boyutuna güçlü biçimde duyarlıdır ve küçük örneklemlerde sık sık yanlış alarm üretir. Her kaynakta tekrarlanan sabit PSI eşiklerini evrensel bir kural gibi kullanmayın; onlar bir sektör geleneğidir, istatistiksel bir yasa değil. Doğru eşik, sizin sisteminizin sakin dönemlerdeki gürültüsünden çıkarılır.

Üstüne bir de boyut lanetini ekleyin. Yüksek boyutta uzaklıklar birbirine yakınsar; daha kötüsü, iki dağılımın _her bir eksendeki_ kenar dağılımı neredeyse aynı kalırken ortak dağılımları tamamen değişebilir. Bulutu döndürün, iki kümenin yerini değiştirin, korelasyon yapısını bozun: boyut başına testler hiçbir şey görmez. Yani bu yöntem, en çok önemsediğiniz değişim türüne tam olarak kördür.

<div class="callout"><strong>İpucu:</strong> Çoklu test sorununu Bonferroni benzeri bir düzeltmeyle kapatmak cazip gelir; ama yanlış alarmı azaltan düzeltme, gerçek kaymayı yakalama gücünü de düşürür. Doğru hamle düzeltmek değil, 768 testi tek bir çok değişkenli ölçüyle değiştirmektir.</div>

## Peki ne ölçersiniz?

İyi haber şu: gömme uzayında kaymayı ölçmenin olgun ve pratik yolları var. Hepsinin ortak yanı, yüzlerce ayrı testi tek ve yorumlanabilir bir sayıya indirmeleri.

En doğrudan olanı **dağılımlar arası uzaklıktır**: referans nokta bulutu ile bugünkü bulut arasındaki farkı tek bir sayıyla özetleyen ölçüler. Bunlar eksenlere değil bulutun bütününe bakar; döndürmeye, ölçeklemeye ve korelasyon yapısındaki değişime duyarlıdır.

### Sınıflandırıcıyla iki örneklem testi

Pratikte en çok işe yarayan yöntem budur ve fikri neredeyse hilekârca basittir. Referans penceredeki vektörlere 0, bugünkü vektörlere 1 etiketini verin ve basit bir sınıflandırıcı eğitin; sonra ayrı tuttuğunuz bir test kümesinde ROC AUC’ye bakın. AUC 0,5 civarındaysa iki bulut ayırt edilemiyordur, yani dağılım pratikte değişmemiştir. AUC 1’e yaklaştıkça iki dağılım o kadar ayrışmıştır.

Bu yaklaşımın asıl değeri size bir sayıdan fazlasını vermesidir. Sınıflandırıcının “kesinlikle bugüne ait” dediği örnekleri sıralayın ve ilk yirmisini okuyun. Kaymanın _ne olduğunu_ bir panodan değil metinlerin kendisinden öğrenirsiniz: yeni bir ürün kategorisi, bozulmuş bir karakter kodlaması, bir kampanyanın getirdiği kalıp dil.

### Küme doluluğu ve komşuluk uzaklıkları

İkinci yöntem, referans veriyi bir kez kümeleyip küme merkezlerini dondurmaktır. Sonra her yeni yığındaki noktaları bu sabit merkezlere atar ve küme paylarını karşılaştırırsınız. Böylece 768 boyutlu bir problem, on beş kategorili bir dağılım karşılaştırmasına iner; klasik testler burada yeniden anlamlıdır ve her kümenin içinden örnek okuyabildiğiniz için sonuç insan tarafından denetlenebilir.

Üçüncüsü **en yakın komşu uzaklığıdır**: her yeni nokta için referans kümedeki k’ıncı en yakın komşusuna olan uzaklığa bakarsınız. Bu dağılımın sağ kuyruğu kalınlaşıyorsa, uzayın daha önce hiç örnek görmediğiniz bölgelerine gidiyorsunuz demektir. Bu özünde bir [anomali tespiti](/posts/anomali-tespiti/) problemidir ve modelin en çok zorlanacağı girdileri doğrudan işaret eder.

Dördüncüsü düşük boyutlu bir özet üzerinden izlemedir: referansa oturtulmuş bir izdüşümün ilk birkaç bileşenini takip edersiniz. Tek kritik kural, izdüşümün bir kez öğrenilip dondurulmasıdır; her yığında yeniden oturtulan bir izdüşüm, tam da ölçmek istediğiniz kaymayı gizler.

```text
# Gömme kayması: yüzlerce test yerine tek bir ölçü (sözde-kod)
# 1) Ayrım gücü: bu vektör referanstan mı, bugünden mi?
X = birlestir(referans_gommeler, bugunku_gommeler)
y = birlestir(sifirlar(n_ref), birler(n_bugun))
model = basit_siniflandirici().egit(X_egitim, y_egitim)
auc   = roc_auc(model, X_test, y_test)      # 0,5 = ayirt edilemez

# 2) Alarmi okunur kil: en emin ornekleri insana goster
if auc > kalibre_esik:                      # esigi kendi gecmisinizden cikarin
    incele(en_yuksek_skorlu(model, bugunku_gommeler, k=20))

# 3) Nerede degisti: kume doluluklarini karsilastir
pay_ref = kume_paylari(dondurulmus_merkezler, referans_gommeler)
pay_bug = kume_paylari(dondurulmus_merkezler, bugunku_gommeler)
rapor(kume_bazli_fark(pay_ref, pay_bug))
# Alarm tek basina bir karar degildir; performans tahminiyle birlikte okunur.
```

## En sessiz kayma kaynağı: gömme modelinin sürümü

Şimdi panolarda en sık yanlış okunan olaya gelelim. Referans pencereniz aslında veriden değil, belirli bir gömme modelinin belirli bir sürümünün ürettiği vektörlerden oluşur. O modeli yükselttiğinizde ya da sağlayıcı aynı isim altında modeli sessizce güncellediğinde uzayın geometrisi değişir: eksenler başkadır, ölçek başkadır, komşuluklar başkadır.

Sonuç şudur: ertesi sabah bütün uzaklık ölçüleriniz tavan yapar. Ama ölçtüğünüz şey dünyanın değişmesi değil, iki farklı modelin farkıdır. Referans pencereniz o anda geçersizdir, çünkü karşılaştırdığınız iki bulut artık aynı dili konuşmuyordur. Arşivi yeni sürümle yeniden gömüp eski vektörlerle kıyaslamak da aynı nedenle anlamsızdır: iki farklı model sürümünün vektörleri arasındaki kosinüs benzerliği yorumlanabilir bir büyüklük değildir.

Aynı sorun daha ince biçimlerde de gelir. Metin kırpma uzunluğunu değiştirmek, normalleştirme adımını güncellemek ya da parçalama stratejisini elden geçirmek de geometriyi kaydırır. Model sürümü aynı kalmış olabilir; ön işleme sürümü değişmiştir ve etkisi aynıdır.

> Panoda gördüğünüz her sıçrama dünyaya ait değildir. Bir kısmı sizin dağıtım notlarınızda yazılıdır; onları dünyaya ait sanmak, olmayan bir soruna aylarca müdahale etmek demektir.

<div class="callout"><strong>İpucu:</strong> Sakladığınız her vektörün yanına model adını, model sürümünü ve ön işleme sürümünü yazın. Sürüm değiştiğinde referans pencereyi yeni modelle yeniden gömün, taban çizgisini sıfırdan hesaplayın ve panoda o tarihe bir kesinti işareti koyun. Bir ay sonra “o gün olan şey bizdik” diyebilmeniz gerekir.</div>

## Kayma bozunma değildir

Bu yazının en önemli cümlesi bu başlıkta: kayma alarmı, modelin kötüleştiğini söylemez. Yalnızca girdi dağılımının değiştiğini söyler. Bunlar farklı iddialardır ve aralarındaki mesafe, izlemeye boşa harcanan mühendislik saatlerinin büyük kısmını açıklar.

Çünkü bir modelin performansı girdi dağılımının kendisine değil, o dağılımın modelin _hatalı olduğu_ bölgelerle ne kadar örtüştüğüne bağlıdır. Girdiler modelin zaten sağlam çalıştığı bir bölgeye kayarsa, ölçtüğünüz kayma büyük olabilir ama hata oranı kılını kıpırdatmaz.

Bu soyut bir itiraz değil. NannyML ekibinin yayımladığı bir vaka incelemesinde modelin _en önemli iki özelliği_ belirgin biçimde kayarken ortalama mutlak hata düz gitmiş; yazının kendi ifadesiyle [bütün veri kayması alarmları yanlış alarmmış](https://www.nannyml.com/blog/when-data-drift-does-not-affect-performance-machine-learning-models). Bulgunun, kayma izlemeyi savunan bir ekibin kendi örneği olması onu daha da değerli kılıyor.

Tersi de doğrudur ve daha tehlikelidir: girdi dağılımında ölçülebilir hiçbir değişim yokken performans çökebilir. Bu, kavram kaymasıdır (concept drift); girdiyle çıktı arasındaki ilişkinin kendisi değişmiştir ve yalnızca girdilere bakan bir sistem buna tanım gereği kördür. Ortak değişken kayması (covariate shift) için kurulmuş bir dedektörden kavram kaymasını da yakalamasını beklemek teknik bir eksiklik değil, kategori hatasıdır.

Pratik sonuç bir hiyerarşidir. Alarm, mümkünse gerçek performanstan gelir; etiketler gecikiyorsa [etiketsiz performans tahmininden](/posts/etiketsiz-performans-tahmini/) gelir. Kayma sinyali ise alarmın kendisi değil, _açıklamasıdır_: performans düştüğünde “neden” sorusunu cevaplayan katmandır. Bu sırayı tersine çevirdiğiniz anda, her hafta yeniden eğitim tartışan ama neyin bozulduğunu bilmeyen bir ekibiniz olur.

## Pratik kurulum ve araç ekosisteminin hâli

Bir gömme kayması izleme kurulumunu beş kararla özetleyebilirsiniz.

-   **Referans pencereyi seçin, miras almayın.** “Tüm eğitim verisi” iyi bir referans değildir; üretimde işlerin sağlıklı yürüdüğü temsili bir dönemi seçin, sabitleyin ve sürümleyin.
-   **Yığın boyutunu sabitleyin.** Ölçtüğünüz istatistik örneklem büyüklüğüne duyarlı olduğu için günlük 2.000 kayıtla haftalık 14.000 kaydı aynı eşikle okuyamazsınız.
-   **Eşiği geçmişten çıkarın.** Dedektörü sakin dönemler üzerinde geriye dönük çalıştırın; eşik, gözlenen gürültünün üstüne konur.
-   **Tek bir çok değişkenli alarm kurun.** Ayrıntıya inmeyi talep üzerine yapın; varsayılan pano tek bir sayı göstersin.
-   **Her alarmın yanına yirmi okunabilir örnek koyun.** İnsana gösterilemeyen alarm, kısa sürede sessize alınan alarmdır.

### Araç ekosisteminin bugünkü hâli

Araç seçerken bir gerçeği hesaba katmak gerekiyor: bu alan son dönemde ciddi biçimde yeniden şekillendi. Olguları sade aktaralım. WhyLabs [hikâyesinin bu bölümünü kapattığını](https://whylabs.ai/) duyurdu ve platformunu açık kaynak yaptı; whylogs kütüphanesi Ocak 2025’ten beri hareketsiz. NannyML’in açık kaynak deposu, şirketin [Soda](https://launch.soda.io/) tarafından satın alınmasının ardından durgunlaştı. Evidently kendini “ML izleme”den [ML ve LLM gözlemlenebilirliğine, tablo verisinden üretken yapay zekâya](https://github.com/evidentlyai/evidently) doğru yeniden konumlandırdı; bu tek satır, izlemenin nereye kaydığının en net belgesi. Alibi Detect açık kaynak lisanslı değil, kaynağı görülebilir (source-available) bir üründür; hukuk incelemesinden geçirecekseniz bu ayrım önemlidir. deepchecks’in Aralık 2024’ten beri yeni sürümü yok. `river` ise sağlıklı biçimde sürüyor.

Buradan çıkan ders araç seçmekten çok mimariyle ilgili: yöntem kütüphaneden uzun ömürlüdür. Ölçtüğünüz istatistiği, referans pencerenizi ve eşik kalibrasyonunuzu kendi verinizin yanında tutun; kütüphane değiştirilebilir bir parça olsun.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Yüksek boyutlu gömmelerde boyut başına test yapmak bozuk bir kurulumdur: çoklu test, örneklem büyüklüğüne duyarlı p-değerleri ve boyut laneti üst üste biner.</li><li>Bunun yerine tek bir çok değişkenli ölçü kullanın: sınıflandırıcıyla iki örneklem testi, küme doluluğu, en yakın komşu uzaklık dağılımı.</li><li>Gömme modelinin ya da ön işlemenin sürümü değiştiğinde referans pencere geçersizdir; taban çizgisini yeniden alın ve panoya kesinti işareti koyun.</li><li>Kayma bozunma değildir: en önemli özellikler kayarken hata düz gidebilir, hiç kayma yokken kavram kayması performansı çökertebilir.</li><li>Alarm performanstan gelir; kayma sinyali alarmın kendisi değil açıklamasıdır. Eşiği kendi geçmiş gürültünüzden kalibre edin.</li></ul></div>

<div class="faq"><details><summary>768 boyutun her biri için KS testi çalıştırıp çoklu test düzeltmesi uygulasam olmaz mı?</summary><p>Düzeltme yalnızca birinci sorunu kısmen çözer: p-değeri hâlâ örneklem büyüklüğünün fonksiyonu olmayı sürdürür ve düzeltme, yanlış alarmı azaltırken gerçek kaymayı yakalama gücünüzü de düşürür. Daha önemlisi, boyut başına testler kenar dağılımlar aynı kalırken ortak dağılımın değiştiği duruma kördür; gömme uzayında en sık karşılaşacağınız kayma tipi tam olarak budur.</p></details><details><summary>Gömme modelini yükseltmem gerekiyor; izleme geçmişimi kaybedecek miyim?</summary><p>Ham vektör düzeyindeki karşılaştırılabilirliği kaybedersiniz, çünkü iki farklı modelin vektörleri aynı uzayda değildir. Ama kayma skorlarının zaman serisini saklayabilir ve taban çizgisini yeni modelle yeniden hesaplayabilirsiniz: referans pencereyi yeniden gömün, eski ve yeni taban çizgisini bir süre yan yana çalıştırın, panoda o tarihe bir kesinti notu düşün.</p></details><details><summary>Kayma alarmı aldım ama gerçek etiketler üç ay sonra gelecek. Ne yapmalıyım?</summary><p>Kaymayı tek başına yeniden eğitim gerekçesi saymayın. Önce ayrım sınıflandırıcısının en emin olduğu örnekleri okuyup kaymanın ne olduğunu adlandırın, sonra bu bölgenin modelin zayıf olduğu bölgeyle örtüşüp örtüşmediğine bakın. Karar, kaymanın büyüklüğüne değil tahmini performans etkisine bağlanmalıdır.</p></details></div>

---

Gömme kayması, Türkçe kayma literatürünün en az yazılmış bölümü; oysa üretimdeki sistemlerin giderek büyüyen bir kısmı yapılandırılmamış veriyle çalışıyor. İşi doğru yapmanın sırrı daha karmaşık bir istatistikte değil, iki disiplinde: ölçtüğünüz sayının tam olarak neyi ölçtüğünü bilmek ve alarmı performansla ilişkilendirmek. Kayma bir uyarıdır, bir teşhis değil. Teşhisi hâlâ siz koyarsınız.
