---
title: "Nedensel Çıkarım ve Uplift Modelleme: “Kim Satın Alır?” Yanlış Soru"
description: "Kimin ayrılacağını kusursuz bilen bir model, kimi aramanız gerektiğini söylemez. Uplift modelleme, dört segment, karıştırıcı ile çarpışma değişkeni farkı, randomize edemediğinizde kalan tasarımlar ve SHAP'ı nedensel okumanın neden hata olduğu."
publishDate: "2026-08-13T23:09:00+03:00"
lang: tr
category: "Yöntem"
tags: ["Yöntem", "Yapay Zeka"]
translation: "causal-inference-uplift-modeling"
heroImage:
  src: "../../../assets/blog/bimg-01.jpg"
  alt: "Nedensel Çıkarım ve Uplift Modelleme: “Kim Satın Alır?” Yanlış Soru"
---

Churn modelinizin kusursuz çalıştığını varsayalım: önümüzdeki ay hangi müşterilerin ayrılacağını neredeyse hatasız söylüyor. Listeyi çağrı merkezine verdiniz. Kaç müşteriyi kurtardınız? Bu sorunun cevabı modelin içinde yok — çünkü model “kim gider” sorusunu cevapladı, sizin sorduğunuz ise “kimi ararsam bir şey değişir” sorusuydu. Bunlar farklı iki sorudur ve aradaki mesafe, tahminleyici modelleme ile nedensel çıkarım (causal inference) arasındaki mesafedir.

## Tahmin başka şeydir, müdahale başka şeydir

Ayrılma olasılığı en yüksek müşterileri düşünün. Çoğu zaman bunlar kararını çoktan vermiş, şehir değiştirmiş, şirketi kapanmış ya da rakiple iki yıllık sözleşme imzalamış müşterilerdir. Onları aramak nazik bir jesttir ama bir bütçe planı değildir. Modelin listenin en tepesine koyduğu isimler, tam olarak müdahalenin işe yaramadığı isimler olabilir.

Teknik dille söylersek: tahminleyici bir model `P(Y | X)` öğrenir, yani dünyanın _şu anki hâlinde_ ne olacağını. Sizin ihtiyacınız olan büyüklük ise `τ(x) = P(Y | do(T=1), X=x) − P(Y | do(T=0), X=x)`, yani bireysel muamele etkisidir. İkincisi birincisinden türetilemez; aralarında bir formül köprüsü yoktur.

Bunun pratikteki sonucu rahatsız edicidir: AUC değeri 0,92 olan bir model, kampanya getirisi hakkında sıfır bilgi taşıyabilir. [Sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/) ne kadar iyi çıkarsa çıksın, ölçtükleri şey sıralama kalitesidir; müdahalenin değeri değildir. İyi bir tahminci ile iyi bir karar aracı aynı nesne değildir.

Aradaki farkı bir kez gördüğünüzde, ekibinizde dolaşan pek çok gösterge tablosunun aslında yanlış soruyu cevapladığını fark edersiniz. “Bu segment yüksek dönüşüm gösteriyor” cümlesi, o segmente ayrılan bütçenin isabetli olduğunu değil, yalnızca o segmentin zaten dönüşüm gösterdiğini söyler.

## Dört segment: kimi aramalısınız?

Uplift literatürü hedef kitleyi dört kutuya ayırır. Kutular kişilerin kendi özelliklerine göre değil, _müdahale ettiğinizde ve etmediğinizde ne olacağına_ göre tanımlanır:

-   **İkna edilebilirler (persuadables):** müdahale ederseniz kalır ya da satın alır, etmezseniz kaybedersiniz. Tüm getiriniz buradan gelir.
-   **Kesinler (sure things):** zaten satın alacaklardı. Onlara indirim vermek, kâr marjını gönüllü olarak yakmaktır.
-   **Kayıp davalar (lost causes):** ne yaparsanız yapın gidiyorlar. Temas maliyeti tamamen boşa gider.
-   **Uyuyan köpekler (sleeping dogs):** müdahale ettiğinizde durum _kötüleşir_. Unutulmuş bir aboneliği hatırlatan e-posta, sözleşme koşullarına dikkat çeken bir arama. Etkileri negatiftir.

Kritik nokta şu: tahminleyici bir churn modeli listeyi ayrılma olasılığına göre sıralar ve tepesine **kayıp davaları** koyar. Bir satın alma modeli listeyi satın alma olasılığına göre sıralar ve tepesine **kesinleri** koyar. Yani olasılığa göre sıralamak, iki uçta da parayı en verimsiz yere gönderir.

Uplift modeli listeyi olasılığa göre değil, olasılık _farkına_ göre sıralar. Aynı ayrım [öneri sistemlerinde](/posts/oneri-sistemleri/) de vardır: kullanıcının tıklayacağı ürünü önermekle, kullanıcının sizin öneriniz olmasa hiç görmeyeceği ürünü önermek farklı işlerdir. Birincisi, insanın zaten arayacağı şeyi vitrine koyup başarı ilan etmektir. Bu ayrımın parasal karşılığı ölçülebilir bir şeydir: [yayımlanmış bir dağıtım çalışması](https://arxiv.org/abs/2607.05242), platform genelinde %4,08'lik artımsal GMV artışı raporluyor.

<div class="callout"><strong>İpucu:</strong> Uyuyan köpekler segmenti teorik bir kuruntu değildir; hatırlatma e-postalarında, yeniden hedeflemede ve “sizi özledik” kampanyalarında düzenli olarak ortaya çıkar. Görebilmenin tek yolu bir kontrol grubu tutmaktır: müdahale ettiğiniz herkes iyileşmiş görünse bile, müdahale etmeseydiniz daha çoğunun iyileşecek olması ihtimali hep masadadır.</div>

## Karıştırıcı, çarpışma, aracı: her kontrol iyi kontrol değildir

Nedensel bir soruyu gözlemsel veriyle cevaplamaya kalkıştığınızda ilk düşman **karıştırıcı değişkendir (confounder)**: hem müdahaleyi hem sonucu etkileyen ortak bir neden. Kampanyayı en sadık müşterilere gönderdiyseniz, kampanya alanların daha çok satın almasının sebebi kampanya değil sadakattir. Karıştırıcıyı hesaba katmazsanız etkiyi olduğundan büyük ölçersiniz.

Buraya kadar sezgi çalışır. Tuzak bir sonraki adımdadır. Tahminleyici modellemeden gelen refleks “elimdeki her değişkeni koyayım, fazlası zarar vermez” der. Nedensel bir soruda bu refleks yanlıştır ve iki ayrı biçimde yanlıştır.

### Çarpışma değişkeni (collider)

Hem müdahaleden hem sonuçtan _etkilenen_ bir değişkendir. Dokunmazsanız sorun çıkarmaz; kontrol ettiğiniz anda gerçekte olmayan bir ilişki yaratırsınız. Müşteri hizmetlerine gelen çağrı sayısı buna iyi bir örnektir: hem kampanyadan hem ayrılma niyetinden etkilenir. Modele koyduğunuz anda, aralarında var olmayan bir bağ görürsünüz.

### Aracı değişken (mediator)

Nedensel yolun üzerinde durur: kampanya → uygulama kullanımı → elde tutma. Uygulama kullanımını kontrol ederseniz, ölçmek istediğiniz etkinin bir kısmını kendi elinizle silersiniz ve toplam etkiyi olduğundan küçük görürsünüz.

[Özellik mühendisliğinde](/posts/ozellik-muhendisligi/) fazladan bir değişken çoğu zaman en kötü ihtimalle işe yaramaz. Nedensel bir soruda fazladan değişken cevabı bozabilir. Bu yüzden nedensel analiz, kod yazmadan önce bir şema çizmeyi gerektirir: hangi ok nereye gidiyor, hangi değişken hangi rolde?

> Tahminde değişken seçmek bir optimizasyon problemidir. Nedensel çıkarımda değişken seçmek bir varsayım beyanıdır — ve o varsayım veriden okunamaz.

## Altın standart randomizasyon; randomize edemediğinizde

Randomize deneyin gücü, ölçtüğünüz değişkenleri dengelemesi değildir. Asıl gücü, **ölçmediklerinizi de dengelemesidir.** Atamayı yazı tura belirlediğinde gruplar arasındaki tek sistematik fark müdahale olur; kayıtlarınıza hiç girmemiş bir değişken bile ortalamada eşitlenir. Hiçbir gözlemsel yöntem bu garantiyi veremez.

Ama her zaman randomize edemezsiniz: bir fiyat değişikliğini yalnızca bazı müşterilere uygulayamazsınız, bir düzenleme herkes için aynı gün yürürlüğe girer, ya da olay çoktan olup bitmiştir. Bu durumda dört klasik tasarım devreye girer. Her biri bir varsayım karşılığında bir cevap verir; varsayım tutmuyorsa cevap da tutmaz.

-   **Fark farkları (difference-in-differences):** müdahale gören ve görmeyen grupların öncesi-sonrası değişimini karşılaştırır. Varsayım: müdahale olmasaydı iki grup paralel hareket edecekti.
-   **Sentetik kontrol (synthetic control):** müdahale görmeyen birimlerin ağırlıklı bileşiminden bir “sanal ikiz” kurar. Tek bir birime — bir şehre, bir ülkeye, bir mağazaya — müdahale edildiğinde işe yarar.
-   **Regresyon süreksizliği (regression discontinuity):** müdahale keskin bir eşiğe bağlıysa, eşiğin hemen iki yakınındaki birimler pratikte rastgele ayrılmıştır. Bu, doğanın size hediye ettiği küçük bir deneydir.
-   **Araç değişken (instrumental variable):** müdahaleyi etkileyen ama sonuca yalnızca müdahale üzerinden dokunan bir değişken bulabilirseniz, dışarıdan bir randomizasyon kaynağı ödünç almış olursunuz.

Dördünü de tek pakette toplayan `CausalPy` 0.9.0 (28 Temmuz 2026, PyMC Labs) makul bir başlangıç noktasıdır. Nedensel grafiği kurup varsayımları açıkça yazmak için `DoWhy` 0.14 (Kasım 2025), etki tahmini içinse `EconML` 0.17.0 (31 Temmuz 2026) ve `CausalML` 0.17.0 (4 Temmuz 2026) canlı geliştirilen seçeneklerdir. Kütüphane seçimi burada en kolay karardır; zor karar, hangi varsayımı savunabileceğinizdir.

## Uplift modeli nasıl eğitilir — ve neden değerlendirmesi gerçekten zor

Üç yaygın yaklaşım var ve hepsi, muamele atamasının bilindiği (tercihen randomize edilmiş) bir veriyle başlar.

-   **İki model / T-öğrenici (T-learner):** muamele grubuna bir model, kontrol grubuna ayrı bir model eğitilir; uplift ikisinin farkıdır. Basittir, ama iki modelin hataları farkta birikir ve gerçek etki küçükse gürültü etkiyi yutar.
-   **Tek model / S-öğrenici (S-learner):** muamele bayrağı sıradan bir özellik olarak modele girer. Veriyi ikiye bölmez, ama model o bayrağı önemsiz bulursa uplift'i sistematik olarak sıfıra yakın tahmin eder.
-   **Dönüştürülmüş hedef (transformed outcome):** hedef değişken atama olasılığına göre yeniden ölçeklenir; böylece tek bir regresyon doğrudan etkiyi tahmin eder. Varyansı yüksektir, ama sıralama amacı için çoğu zaman yeterlidir.

Asıl zorluk eğitimde değil, değerlendirmede. Nedensel çıkarımın temel problemi şudur: **aynı birim için iki sonucu birden asla göremezsiniz.** Müşteriyi aradıysanız, aramasaydınız ne olacağını bilemezsiniz. Yani satır düzeyinde bir doğru cevap yoktur; dolayısıyla satır düzeyinde bir hata da hesaplanamaz. Değerlendirme zorunlu olarak grup düzeyinde yapılır: modeli skora göre dilimlere ayırır, her dilimde muamele ve kontrol gruplarının farkına bakarsınız. Uplift eğrisi, Qini katsayısı ve AUUC bu fikrin farklı paketlenmiş hâlleridir.

```python
# Uplift değerlendirmesinin iskeleti (pseudocode)
# Ön koşul: kontrol grubu ayrılmış, randomize bir test seti
skor = uplift_modeli.tahmin(test)          # tahmini etki, olasılık degil
for dilim in ondaliklara_bol(test, skor):  # yuksek etkiden dusuge
    m = ortalama_sonuc(dilim, muamele=1)
    k = ortalama_sonuc(dilim, muamele=0)
    kaydet(dilim, m - k)                   # gozlenen artimsal etki
# Iyi model: ust dilimlerde fark buyuk, alt dilimlerde sifir veya negatif
# Her dilim icin guven araligi yazin; tek bir egri kendi basina kanit degildir
```

Hangi metriğin doğru olduğu da kapanmış bir tartışma değil. [UpliftBench çalışması](https://arxiv.org/abs/2608.00915), kıyaslamalar arasındaki tutarsızlığı model seçiminden çok _metrik seçiminin_ ürettiğini ve AUUC'nin etki doğruluğuyla Qini katsayısına kıyasla daha iyi hizalandığını raporluyor. “Hangi uplift metriği” sorusu hâlâ açık bir sorudur; bir sayıyı tek başına rapor etmeyin.

## SHAP nedensel değildir — ve neredeyse her XAI yazısı bunu yanlış okuyor

Şimdi bu yazının omurgasına geliyoruz. Açıklanabilirlik üzerine yazılmış içeriklerin büyük bölümü SHAP çıktısını nedensel okur: “bu özelliğin katkısı yüksek, öyleyse onu değiştirirsek sonuç değişir.” Bu cümle yanlıştır ve yanlış olduğunu SHAP'ın kendi dokümantasyonu söyler.

> Korelasyonları şeffaflaştırmak onları nedensel yapmaz.

[SHAP belgelerindeki bu uyarı](https://shap.readthedocs.io/en/latest/example_notebooks/overviews/Be%20careful%20when%20interpreting%20predictive%20models%20in%20search%20of%20causal%20insights.html), işlenmiş bir örnekle geliyor: modelin katkı değerleri okunduğunda, mühendislik ekibinin ürüne _daha çok hata koyması_ gerektiği sonucu çıkıyor. Bu saçmalık bir yazılım hatası değil; gözlenmemiş karıştırıcı ile gözlenen değişkenler arasındaki fazlalığın (redundancy) birlikte ürettiği bir yapaylık. Model kendi eğitim dağılımında doğru çalışıyor; hatalı olan, o çıktıyı bir eylem talimatı gibi okumak.

Aynı eleştiri akademik tarafta da yazıldı: özellik katkılarının nedensellik gibi kullanılmasına yönelik [ICML 2020 eleştirisi](https://arxiv.org/abs/2002.11097) bu okuma biçiminin sınırlarını gösteriyor. Bir ayrıntı daha var ve pratikte sık atlanıyor: Shapley değerlerini hesaplarken “modele sadık” mı yoksa “veriye sadık” mı kalacağınız bir tercihtir ve iki tercih farklı sayılar üretir. Bu [müdahaleci-gözlemsel çatalı](https://arxiv.org/abs/2006.16234), aynı modelin aynı satırı için iki farklı açıklama üretebileceğiniz anlamına gelir.

<div class="callout"><strong>İpucu:</strong> AB Yapay Zekâ Yasası'nın <a href="https://artificialintelligenceact.eu/article/15/" target="_blank" rel="noopener">15. maddesi</a>, önyargılı çıktıların gelecekteki girdilere dönüştüğü geri besleme döngülerine karşı önlem almayı zorunlu kılıyor. Geri besleme döngüsü tanımı gereği nedensel bir problemdir: tahminleyici modelleme onu teşhis edemez, çünkü döngü modelin kendi çıktısıyla kurulur. Bu maddeyi karşılamak için nedensel bir çerçeveye ihtiyacınız var.</div>

Peki SHAP'ı çöpe mi atacağız? Hayır. SHAP 0.52.0 (28 Mayıs 2026) hâlâ modelin _ne öğrendiğini_ anlamak için iyi bir araç — bunu [model yorumlanabilirliği](/posts/model-yorumlanabilirligi/) yazısında ayrıntılandırıyoruz. Doğru cümle şudur: SHAP modelin davranışını açıklar, dünyanın davranışını değil. Zaten baştan yorumlanabilir bir model istiyorsanız [InterpretML'in Açıklanabilir Artırma Makinesi (Explainable Boosting Machine)](https://github.com/interpretml/interpret) gibi bir seçenek de var. Ama hiçbiri, “ne yapmalıyız” sorusunun cevabını nedensel bir tasarım olmadan veremez.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Kimin ayrılacağını bilmek kimi aramanız gerektiğini söylemez; ihtiyacınız olan büyüklük olasılık değil, muamele etkisidir.</li><li>Dört segment: getiriyi ikna edilebilirler üretir, kesinler marjı yakar, kayıp davalar bütçeyi harcar, uyuyan köpekler etkiyi negatife çevirir.</li><li>Nedensel bir soruda her değişkeni modele koymak zararlıdır: çarpışma değişkeni olmayan ilişkiyi yaratır, aracı değişken gerçek etkiyi siler.</li><li>Randomizasyon ölçmediğiniz değişkenleri de dengeler; randomize edemiyorsanız fark farkları, sentetik kontrol, regresyon süreksizliği ve araç değişken kalır.</li><li>SHAP katkısı nedensel etki değildir; bunu en net biçimde SHAP'ın kendi dokümantasyonu söylüyor.</li></ul></div>

<div class="faq"><details><summary>Uplift modeli kurmak için mutlaka randomize deney şart mı?</summary><p>Eğitim için şart değil, ama sağlıklı bir değerlendirme için pratikte şarttır. Muamele ataması sizin kararlarınızla oluştuysa karıştırıcı etkileri ayrıştırmanız gerekir; bu da fark farkları, sentetik kontrol, regresyon süreksizliği veya araç değişken gibi bir tasarım demektir. En ucuz çözüm genellikle kampanyanın küçük bir yüzdesini kalıcı kontrol grubu olarak ayırmaktır.</p></details><details><summary>Uplift modelimin iyi olduğunu nasıl anlarım?</summary><p>Satır düzeyinde anlayamazsınız, çünkü aynı birim için iki sonucu birden hiç görmezsiniz. Değerlendirme grup düzeyinde yapılır: skora göre dilimlere ayırıp her dilimde muamele-kontrol farkına bakarsınız. Uplift eğrisi, AUUC ve Qini bunun farklı özetleridir; UpliftBench çalışması metrikler arasındaki uyuşmazlığın kıyaslama sonuçlarını model seçiminden daha çok değiştirdiğini raporluyor, o yüzden tek bir sayıya güvenmeyin.</p></details><details><summary>SHAP'ı hiç kullanmamalı mıyım?</summary><p>Kullanın, ama doğru soru için. SHAP modelin bir tahmini nasıl kurduğunu gösterir; hata ayıklama, sızıntı tespiti ve modelin beklenmedik bir değişkene yaslandığını fark etmek için değerlidir. Neyin değiştirilmesi gerektiğine karar vermek için ise nedensel bir tasarım gerekir. Baştan yorumlanabilir bir model isterseniz Açıklanabilir Artırma Makinesi gibi alternatifler de var.</p></details></div>

---

Özetle: “kim satın alır” sorusu iyi bir tahmin problemi, ama kötü bir karar problemidir. Bir eylem planı, olasılıkların değil farkların üzerine kurulur. Kontrol grubunu bırakmayan, varsayımlarını yazıya döken ve açıklama çıktılarını eylem talimatı sanmayan ekip, aynı bütçeyle daha çok iş çıkarır — üstelik bunu kanıtlayabilir.
