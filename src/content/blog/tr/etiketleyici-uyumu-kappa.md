---
title: "Etiketleyici Uyumu ve Değerlendirici Güvenilirliği: Kappa, Alpha ve LLM Hakemi Doğrulamak"
description: "Ham yüzde uyum bir güvenilirlik ölçüsü değildir. Cohen kappa, Fleiss kappa ve Krippendorff alfa ile şans düzeltmesini, eşiklerin nasıl okunacağını ve bir LLM hakemini tıpkı bir insan etiketleyici gibi doğrulamayı anlatıyoruz."
publishDate: "2026-08-13T23:18:00+03:00"
lang: tr
category: "Ölçme"
tags: ["Ölçme", "Yapay Zeka"]
translation: "annotator-agreement-evaluator-reliability"
heroImage:
  src: "../../../assets/blog/covers/etiketleyici-uyumu-kappa.jpg"
  alt: "Etiketleyici Uyumu ve Değerlendirici Güvenilirliği: Kappa, Alpha ve LLM Hakemi Doğrulamak"
---

İki etiketleyiciye aynı yüz örneği verirsiniz, seksen beşinde aynı etiketi koyarlar ve rapora _yüzde 85 uyum_ diye yazılır. Oysa bu sayı tek başına neredeyse hiçbir şey söylemez: iki kişi örneklere hiç bakmadan, yalnızca en sık görülen sınıfı işaretleyerek de yüzde 80'i geçebilir. Etiketleyiciler arası uyum (inter-annotator agreement) ölçmek, tam olarak burada başlar — şans eseri gelen uyumu ölçünün içinden çıkarmakla. Bu yazıda kappa ve alfa katsayılarını, eşiklerin nasıl okunacağını ve son iki yılın yeni sorununu ele alıyoruz: hakem olarak kullandığınız dil modelinin güvenilirliğini, tıpkı bir insan etiketleyicininki gibi doğrulamak.

## Yüzde uyum bir uyum ölçüsü değildir

İki radyoloğa bin görüntü verdiğinizi düşünün. Görüntülerin yüzde doksan beşi normal. İkisi de hiçbir şeye bakmadan her görüntüye _normal_ dese, aralarındaki ham uyum yüzde doksan beş çıkar. Sıfır bilgi ürettiler, neredeyse mükemmel bir skor aldılar.

Ham yüzde uyumun tek ve öldürücü kusuru budur: tesadüfen gelen uyumu ölçünün içinde bırakır. Şans düzeltmeli katsayıların hepsi aynı basit fikir üzerine kuruludur. Gözlenen uyumdan, sınıf dağılımı verildiğinde tesadüfen beklenen uyumu çıkarın; kalan payı, elde edilebilecek en fazla iyileşmeye bölün.

`kappa = (gözlenen uyum − beklenen uyum) / (1 − beklenen uyum)`

Bu düzeltmenin üç okuması vardır. Sıfır: etiketleyicileriniz yazı tura atmaktan daha iyi değil. Negatif: sistematik olarak ters düşüyorlar, ki bu genellikle kılavuzun bir maddesinin iki kişi tarafından iki zıt yönde okunduğu anlamına gelir. Bir: tam uyum.

En önemli sonuç ise şudur: sınıf dağılımı dengesizleştikçe beklenen uyum tavana doğru tırmanır, dolayısıyla aynı ham yüzde giderek daha az şey ifade eder. [Sınıflandırma metriklerinde](/posts/degerlendirme-metrikleri/) doğruluk oranına tek başına güvenmememizin sebebiyle bire bir aynı sebep — bir sayı, ancak taban çizgisiyle birlikte anlamlıdır.

## Kappa ailesi: hangi katsayı, hangi durum

Pratikte üç katsayı işinizi görür. Aralarındaki fark felsefi değil, tasarımsaldır: hangi etiketleme kurulumuna uyduklarıyla ilgilidir.

-   **Cohen kappa:** tam olarak iki etiketleyici, aynı örnek kümesini eksiksiz etiketlemiş, kategoriler nominal. Klasik iki kişilik pilot çalışmanın katsayısı budur.
-   **Fleiss kappa:** her örnek sabit sayıda kişi tarafından etiketlenmiş, ama etiketleyiciler örnekten örneğe değişebilir. Kalabalık bir etiketleme havuzunda doğru seçim budur.
-   **Krippendorff alfa:** etiketleyici sayısı serbest, eksik hücreler sorun değil, ölçek nominal, sıralı ya da aralık olabilir. Uyumsuzluğu bir mesafe fonksiyonu üzerinden hesapladığı için, beş basamaklı bir kalite skorunda 1 ile 2 arasındaki anlaşmazlığı 1 ile 5 arasındakinden daha hafif sayar.

Kural sadedir: sıralı bir ölçek kullanıyorsanız ya da veri matrisiniz delik deşikse — gerçek etiketleme projelerinde neredeyse her zaman öyledir, çünkü kimse her örneği etiketlemez — alfayı seçin. Nominal, iki kişilik ve tam dolu bir matriste Cohen kappa ile alfa zaten birbirine çok yakın çıkar.

Katsayı seçmek işin kolay kısmı. Zor kısım, düşük çıkan bir uyumu doğru teşhis etmektir. Sorun çoğu zaman etiketleyicilerin dikkatsizliği değil, kılavuzun sınır durumları tarif etmemesidir. [Etiketleme kılavuzunu](/posts/veri-kalitesi-etiketleme/) gerçek uyuşmazlık örnekleriyle zenginleştirip ölçümü tekrarlamak, aynı bütçeyle uyumu en hızlı yükselten müdahaledir. Katsayıyı bir not olarak değil, kılavuzun teşhis aracı olarak kullanın.

## Eşikleri okumak: 0.61 iyi midir?

Ölçtünüz, kappa 0.61 çıktı. İyi mi? Cevap, tabloya bakarak değil, kararın maliyetine bakarak verilir — ama önce tablo.

[McHugh'un 2012 tarihli değerlendirmesi](https://pmc.ncbi.nlm.nih.gov/articles/PMC3900052/) yaygın bantları şöyle verir: 0.61-0.80 arası _kayda değer_, 0.81-1.00 arası _neredeyse mükemmel_. Aynı yazı kritik bir uyarı da ekler: 0.60'ın altındaki her kappa değeri yetersiz uyuma işaret eder. Yani raporlarda sıkça geçiştirilen o “orta düzey” bandı, aslında kullanılabilir bir veri kümeniz olduğu anlamına gelmez.

Krippendorff alfa için ölçüt daha da nettir: [alfa 0.800 ve üzeri güvenilir sayılır](http://faculty.washington.edu/jwilker/559/Krippendorf.pdf), 0.667 ile 0.800 arası yalnızca geçici sonuçlar çıkarmak için kullanılabilir, 0.667'nin altındaki veri kullanılmaz.

> Eşik, kararınızın maliyetine göre okunur. Bir içerik öneri etiketinde 0.70 idare eder; bir triyaj etiketinde 0.70, her üç sınır vakadan birinde iki uzmanın anlaşamadığı demektir.

Bir de tuzak var: kappa paradoksu. Sınıflardan biri çok baskınsa beklenen uyum tavana yapışır ve etiketleyicileriniz gerçekten iyi çalışsa bile kappa düşük çıkar. Böyle durumlarda tek sayıya indirgemeyin; ham yüzdeyi, sınıf bazında özel uyum oranlarını ve kappayı birlikte raporlayın. Uyumun nerede koptuğunu size karışıklık matrisi söyler, katsayı değil.

## LLM hakemi de sadece bir etiketleyicidir

Şimdi asıl mesele. Bir dil modelini çıktıları puanlamak için kullandığınızda ona yeni bir statü vermiş olmuyorsunuz. O bir etiketleyicidir: ucuz, hızlı, yorulmayan ve güvenilirliği henüz ölçülmemiş bir etiketleyici. İnsan etiketleyiciden isteyeceğiniz her şeyi ondan da istemelisiniz — yazılı kılavuz, pilot çalışma, uyum ölçümü, periyodik yeniden ölçüm.

Bu alanın kurucu makalesi olan [MT-Bench çalışması](https://arxiv.org/abs/2306.05685), hakem modellerin insanlarla “yüzde 80'in üzerinde, yani insanların birbiriyle gösterdiğiyle aynı düzeyde” uyum sergilediğini bildirmişti; aynı makale konum (position), uzunluk (verbosity) ve kendini kayırma (self-enhancement) önyargılarını da adıyla koyuyordu. Sorun, alanın cümlenin ilk yarısını ezberleyip ikinci yarısını dipnota atmasıydı. Üstelik o “yüzde 80” ham yüzde uyumdur.

2026 tarihli geniş bir [güvenilirlik çalışması](https://arxiv.org/abs/2606.19544) — 21 hakem, 118 koşum, yaklaşık 541.000 yargı — bu ham yüzdenin şans düzeltmesinden sonra ne kadar eridiğini ölçtü. MT-Bench üzerinde tam eşleşme uyumu ile Cohen kappa arasındaki fark 33 ila 41 yüzde puanı. Bu erime bir istisna değil, kural: aynı çalışma hakem sıralamalarının kıyaslamadan kıyaslamaya 14 basamağa varan kaymalar gösterdiğini, bir hakemin 0.95'in üzerinde test-tekrar test kararlılığına sahipken aynı anda 0.10'un üzerinde konum önyargısı taşıyabildiğini raporluyor.

<div class="callout"><strong>İpucu:</strong> Kararlılık ile geçerlilik aynı şey değildir. Aynı soruyu üç kez sorup üç kez aynı yanıtı veren hakem tutarlıdır; bu, yanıtın doğru olduğunu göstermez. Bozuk bir terazi de her seferinde aynı yanlış kiloyu gösterir.</div>

## Hangi önyargı gerçekten baskın?

Önyargı listeleri her yerde; hangisinin ne kadar büyük olduğunu ölçen çalışma az. Ölçenler ise sezginin tersini gösteriyor.

-   Beş hakem ve üç kıyaslama üzerinde yapılan [bir karşılaştırmada](https://arxiv.org/abs/2604.23178) biçim ve markdown önyargısının etkisi 0.10 ile 0.76 arasında ölçüldü; aynı kurulumda konum önyargısı 0.04'ü aşmadı. Yani herkesin konuştuğu önyargı, ölçülenler arasında en küçüğüydü.
-   Konum önyargısını en geniş inceleyen [çalışma](https://arxiv.org/abs/2406.07791) (15 hakem, 2 kıyaslama, 22 görev, yaklaşık 40 çözüm modeli, 150.000'den fazla değerlendirme örneği) bu önyargının rastlantısal olmadığını, hakemden hakeme ve görevden göreve belirgin biçimde değiştiğini gösteriyor. Aynı çalışmanın kullandığı üç ölçüt — tekrar kararlılığı, konum tutarlılığı ve tercih adaleti — doğrudan sizin hakem doğrulama protokolünüze girebilir.
-   “İkili karşılaştırma yaptırırsak sorun çözülür” sezgisi de sınandı: [COLM 2025'te sunulan bir çalışmada](https://arxiv.org/abs/2504.14716), araya dikkat dağıtıcı içerik enjekte edildiğinde ikili tercihler yaklaşık yüzde 35 oranında yön değiştirirken, mutlak puanlamada bu oran yüzde 9'da kaldı.

Peki birkaç hakemi oylatmak kurtarır mı? [Topluluk (ensemble) yaklaşımını ölçen çalışma](https://arxiv.org/abs/2604.07650), ortak ön eğitimden gelen hakemlerin senkronize hata yaptığını, aralarındaki korelasyonun 0.51 civarında olduğunu buluyor. Bu bulgu uyum istatistiğinin en temel varsayımını hatırlatır: kappa, etiketleyicilerin birbirinden bağımsız olduğunu varsayar. Aynı kaynaktan kopyalanmış üç etiketleyici, üç etiketleyici değildir; üç kez konuşan tek bir etiketleyicidir.

Zor görevlerde hakemlerin mutlak performansı ise ayrı bir uyarıdır: [JudgeBench (ICLR 2025)](https://arxiv.org/abs/2410.12784), GPT-4o gibi güçlü modellerin bile “rastgele tahminden yalnızca biraz daha iyi” sonuç verdiğini raporluyor. Bu tür sıralamaların hızla değiştiğini unutmayın; buradaki sayılar ilgili makalelerin ölçtüğü andaki değerlerdir, bugünün canlı lider tablosu değil.

## İnsan doğrulama örneklemini kurmak

Bir hakemi doğrulamanın somut hâli tek cümleyle özetlenebilir: hakemi, insanların birbirine gösterdiği uyum tabanı karşısında ölçersiniz. Hedef “yüksek kappa” değil, “insan-insan uyumundan anlamlı biçimde kötü olmamak”tır. İnsanların kendi arasında 0.55 uyum tutturduğu bir görevde hakemden 0.85 beklemek, görevin kendisini yanlış tanımlamış olmanın işaretidir.

### Örneklemi nasıl seçersiniz

Örneklemi gerçek trafikten tabakalı olarak çekin; her sınıf ve her zor alt küme için yeterli sayıda örnek bulunsun, çünkü belirsizliğinizi nadir sınıflar yönetir. Küçük bir pilotla başlayın, uyum tahmininin güven aralığı karar verecek kadar daralmıyorsa örneklemi büyütün. [Aktif öğrenmeyle](/posts/aktif-ogrenme/) seçilmiş zor örnekleri de ekleyebilirsiniz, ama bunları ayrı bir tabaka olarak tutun: yalnızca sınır vakalardan oluşan bir örneklem, gerçek uyumu olduğundan kötü gösterir.

### Taban çizgisi, altın set, yeniden doğrulama

```text
# Hakem doğrulama protokolü (pseudocode)
ornekler = tabakali_ornekle(gercek_trafik, her_sinif_icin_yeterli)
insan_etiketleri = uc_bagimsiz_etiketleyici(ornekler, kilavuz)

insan_tabani = krippendorff_alfa(insan_etiketleri)   # ulaşabileceğiniz tavan
altin_set    = uzlastir(insan_etiketleri)            # anlaşmazlığı uzman çözer

hakem_etiketleri = llm_hakem(ornekler, ayni_kilavuz) # aynı kılavuz, aynı sınıflar
hakem_uyumu = cohen_kappa(hakem_etiketleri, altin_set)

if hakem_uyumu < insan_tabani - tolerans:
    kilavuzu_netlestir_veya_hakemi_degistir()
# Model, istem ya da kılavuz değişirse protokolü baştan çalıştırın.
```

Hakem bir etiket yerine olasılık ya da puan üretiyorsa, o sayının güvenilirliği ayrı bir ölçüm işidir; [model kalibrasyonu](/posts/model-kalibrasyonu/) tam olarak bunun için vardır.

Bunun bir de düzenleyici tarafı var. [Yapay Zekâ Yasası'nın 15. maddesi](https://artificialintelligenceact.eu/article/15/), sağlayıcıların doğruluk seviyelerini ve ilgili doğruluk metriklerini kullanım talimatlarında beyan etmesini zorunlu kılıyor. Beyan ettiğiniz metrik bir hakemin ürettiği skora dayanıyorsa, o hakemin güvenilirliğini hiç ölçmemiş olmak beyanı içi boş bırakır. Ölçmediğiniz bir güvenilirliğin üstüne rakam yazamazsınız.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Ham yüzde uyum şans eseri gelen uyumu içinde barındırır; tek başına raporlanacak bir sayı değildir.</li><li>Katsayıyı tasarıma göre seçin: iki etiketleyici için Cohen, değişken havuz için Fleiss, eksik veri ve sıralı ölçek için Krippendorff alfa.</li><li>McHugh 0.60'ın altındaki kappayı yetersiz sayar; alfada güvenilirlik eşiği 0.800, kullanılabilirlik sınırı 0.667'dir.</li><li>LLM hakemi ayrı bir kategori değil, güvenilirliği henüz ölçülmemiş bir etiketleyicidir.</li><li>Hakemi insan-insan uyumu tabanına karşı doğrulayın; model, istem ya da kılavuz değişince ölçümü yenileyin.</li></ul></div>

<div class="faq"><details><summary>Uyum ölçümü için kaç örnek yeterli?</summary><p>Sabit bir sayı yok; belirleyici olan tahmininizin güven aralığıdır. Her sınıf ve her zor alt küme için yeterli örnek bulunmalı, çünkü belirsizliği nadir sınıflar yönetir. Küçük bir pilotla başlayın, aralık karar verecek kadar dar değilse örneklemi büyütün.</p></details><details><summary>Hakemim insanlarla yüzde 85 uyuşuyor, bu yeterli mi?</summary><p>Tek başına hiçbir şey söylemez. Şans düzeltmesi yapıldığında bu yüzdenin ciddi biçimde eridiğini biliyoruz; 2026 tarihli güvenilirlik çalışması MT-Bench üzerinde 33-41 yüzde puanlık bir fark ölçtü. Doğru karşılaştırma, aynı görevde insanların birbirine gösterdiği uyumdur.</p></details><details><summary>Uyum düşük çıktı, önce neyi düzeltmeliyim?</summary><p>Neredeyse her zaman kılavuzu. Hangi sınıf çiftinde koptuğuna karışıklık matrisinden bakın, o sınır durumları gerçek örneklerle kılavuza yazın, uzlaştırma toplantısı yapın ve ölçümü tekrarlayın. Etiket şeması gereğinden ince taneliyse birleştirmeyi de düşünün.</p></details></div>

---

Özetle: ölçmediğiniz bir güvenilirliğin üstüne kurulan her skor, süslenmiş bir tahmindir. Hakeminiz insan da olsa model de olsa aynı disiplini uygulayın — yazılı kılavuz, şans düzeltmeli katsayı, insan taban çizgisi ve değişiklik olduğunda yeniden ölçüm. Bu dört adım, değerlendirme sonuçlarınızı bir kanaatten bir ölçüme dönüştüren şeydir.
