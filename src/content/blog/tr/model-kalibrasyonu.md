---
title: "Model Kalibrasyonu: Modelinizin \"%90 Eminim\" Demesi Ne Anlama Geliyor?"
description: "Kalibre olmayan bir skor, eşik seçimini ve altındaki bütün fayda-maliyet hesabını sessizce geçersiz kılar. Güvenilirlik diyagramı, beklenen kalibrasyon hatası, Platt ölçekleme ve izotonik regresyonu anlatıyoruz."
publishDate: "2026-08-13T23:15:00+03:00"
lang: tr
category: "Ölçme"
tags: ["Ölçme", "Yapay Zeka"]
translation: "model-calibration-probabilities"
heroImage:
  src: "../../../assets/blog/covers/model-kalibrasyonu.jpg"
  alt: "Model Kalibrasyonu: Modelinizin \"%90 Eminim\" Demesi Ne Anlama Geliyor?"
---

Modeliniz bir örnek için 0.9 çıktı verdiğinde bu ne anlama gelir? Çoğu ekip bu sayıyı bir olasılık gibi okur; oysa pek çok modelin çıktısı yalnızca bir sıralama skorudur. Aradaki fark bir ayrıntı değil: kalibre olmayan bir skorla seçtiğiniz eşik, o eşiğin dayandığı bütün fayda-maliyet hesabını sessizce geçersiz kılar. Bu yazıda model kalibrasyonunun ne olduğunu, nasıl ölçüldüğünü, nasıl düzeltildiğini ve doğruluk ile AUC'nin bu konuda neden hiçbir şey söylemediğini anlatıyoruz.

## Eminim demek tam olarak ne demek?

Bir hava durumu sunucusu düşünün. Bir yıl boyunca yağmur ihtimalini yüzde 30 dediği günleri biriktirin. Eğer o günlerin yaklaşık üçte birinde yağmur yağmışsa sunucu kalibredir. Hiç yağmamışsa ya da neredeyse her seferinde yağmışsa, sunucu belki günleri doğru sıralıyordur ama söylediği sayı bir olasılık değildir.

**Model kalibrasyonu (model calibration)** tam olarak bunu sorar. Modelinizin 0.9 skoru verdiği 100 örneği alın: bunların yaklaşık 90'ı gerçekten pozitifse model kalibredir. 60'ı pozitifse model kendine fazla güveniyordur; 99'u pozitifse gereğinden fazla çekingendir.

Tanımda modelin ne kadar iyi olduğuna dair hiçbir şey olmadığına dikkat edin. Her örneğe veri kümesindeki pozitif oranını söyleyen bir model kusursuz kalibredir ve tamamen işe yaramazdır. Kalibrasyon, ayırt etme gücünün yerine geçmez; onun yanında durur. Bir modelin iyi olması için ikisi de gerekir: doğru sıralama _ve_ doğru ölçek.

Pratikte bu ayrım şuraya çarpar: skorunuzu bir olasılık gibi kullanıyorsanız - eşik seçiyor, beklenen maliyet hesaplıyor, iki modelin çıktısını topluyor ya da bir insana devretme kuralı yazıyorsanız - kalibrasyon artık bir süs değil, ön koşuldur.

> Kalibrasyon, modelin haklı olup olmadığını değil, ne kadar haklı olduğunu bilip bilmediğini ölçer.

## Güvenilirlik diyagramı ve beklenen kalibrasyon hatası

Kalibrasyonu görmenin en doğrudan yolu **güvenilirlik diyagramıdır (reliability diagram)**. Tahminleri skorlarına göre kutulara ayırırsınız. Her kutu için yatay eksene o kutudaki ortalama tahmini, dikey eksene ise gerçekte gözlenen pozitif oranını koyarsınız. Kusursuz kalibre bir model köşegenin üzerinde oturur.

Köşegenin altına düşen noktalar aşırı güveni, üstünde kalanlar aşırı çekingenliği gösterir. Derin ağlarda en sık görülen desen, yüksek skorlarda köşegenin belirgin biçimde altına düşen bir eğridir: model 0.99 der, gerçek oran çok daha aşağıdadır.

**Beklenen kalibrasyon hatası (expected calibration error, ECE)** bu grafiği tek bir sayıya indirir: her kutuda tahmin ile gözlem arasındaki farkın mutlak değerini alır, kutudaki örnek sayısıyla ağırlıklandırır ve toplar.

Buradaki tuzak şudur: ECE bir ölçüm değil, bir kutulama tercihidir. Kutu sayısını değiştirirsiniz, sayı değişir. Eşit genişlikli kutular yerine eşit sayıda örnek içeren kutular kullanırsınız, sayı yine değişir. Az kutu farkları ortalamanın içinde gizler; çok kutu ise örnekleme gürültüsünü kalibrasyon hatası gibi gösterir. Farklı kutulama ayarlarıyla hesaplanmış iki ECE karşılaştırılamaz.

<div class="callout"><strong>İpucu:</strong> Rapora ECE'yi tek başına koymayın. Kutulama kuralını, kutu sayısını ve kutu başına düşen örnek sayısını da yazın, mümkünse ham diyagramı ekleyin. Bir kutuya yalnızca birkaç örnek düşüyorsa gördüğünüz şey kalibrasyon hatası değil, gürültüdür.</div>

## Doğruluk ve AUC neden bu konuda sessizdir

Küçük bir düşünce deneyi yapalım. Modelinizin bütün çıktılarının karesini alın: 0.9 artık 0.81, 0.5 artık 0.25 olsun. Örneklerin birbirine göre sıralaması hiç değişmedi, çünkü kare almak artan bir dönüşümdür.

AUC yalnızca sıralamaya bakar, dolayısıyla hiç kımıldamaz. Doğruluk, kesinlik, duyarlılık ve F1 ise tek bir eşiğe bakar; eşiği de aynı dönüşümden geçirirseniz tam olarak aynı kararları, dolayısıyla aynı sayıları elde edersiniz. Oysa modelin olasılık ölçeği artık tamamen bozuktur.

Sonuç net: [sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/) ailesinin tamamı monoton yeniden ölçeklemeye karşı kayıtsızdır ve bu yüzden kalibrasyon hakkında size hiçbir şey söyleyemez. Mükemmel AUC ile berbat bir olasılık ölçeği aynı modelde rahatça bir arada durabilir.

Kalibrasyonu cezalandıran ölçütler ayrı bir ailedendir: _uygun skorlama kuralları (proper scoring rules)_, yani Brier skoru ve log kaybı. Bunlar hem ayırt etme hem de kalibrasyon bileşeni taşır. Faydalıdırlar ama tek başına bir Brier skoru, iyileşmenin sıralamadan mı yoksa ölçekten mi geldiğini söylemez. Bu yüzden onları her zaman güvenilirlik diyagramıyla birlikte okuyun.

## Eşik seçimi ve sessizce geçersizleşen maliyet hesabı

Kalibrasyonun bedeli grafikte değil, karar masasında ödenir. Bir eşik seçtiğinizde farkında olmadan bir maliyet oranı beyan edersiniz.

Karar kuramının klasik sonucu basittir: bir örneğe müdahale etmenin maliyeti ile onu kaçırmanın maliyeti biliniyorsa, beklenen maliyeti en aza indiren eşik bu iki maliyetin oranıdır. Kaçırmak müdahale etmekten dokuz kat pahalıysa, olasılık 0.1'i geçtiği anda müdahale edersiniz. Bu hesap zariftir ve tamamen tek bir varsayıma dayanır: modelin verdiği sayının gerçek bir olasılık olması.

Model 0.1 dediğinde gerçek oran 0.4 ise, siz maliyet oranını 1:9 sandığınız yerde fiilen bambaşka bir oranı uygulamış olursunuz. Eşiği hangi titizlikle seçtiğinizin önemi kalmaz; çünkü eşiğin altındaki hesap zaten geçersizdir. Aynı bozukluk, skorları bir gelir tahminiyle çarpıp beklenen değer hesaplayan her tabloya, her kural motoruna ve her insana devretme politikasına yayılır.

Kötü haber, bu hatanın sessiz olmasıdır. Doğruluk raporunuz iyi görünmeye devam eder, panolar yeşil kalır, kayıp yalnızca gerçek maliyetlerde birikir.

Düzenleme tarafı da aynı yere bakıyor: [AB Yapay Zekâ Yasası'nın 15. maddesi](https://artificialintelligenceact.eu/article/15/) sağlayıcıdan doğruluk seviyelerini ve ilgili doğruluk metriklerini beyan etmesini istiyor. Beyan ettiğiniz sayıların dışarıdan okuyan biri için bir anlamı olması gerekir; kalibre olmayan bir güven skoru bu anlamı taşıyamaz.

Aynı sorun açıklamalara da bulaşır. [Model yorumlanabilirliği](/posts/model-yorumlanabilirligi/) araçları size bir çıktının nasıl oluştuğunu anlatır; çıktının ölçeği bozuksa, elinizde bozuk bir sayının çok ikna edici bir açıklaması olur.

## Düzeltme: Platt, izotonik ve sıcaklık ölçekleme

İyi haber, kalibrasyonun genellikle modeli yeniden eğitmeden düzeltilebilmesidir. Yaptığınız şey, ham skoru olasılığa çeviren küçük bir eşleme öğrenmektir. Bu eşleme sıralamayı bozmaz, yalnızca ölçeği düzeltir.

### Platt ölçekleme ve izotonik regresyon

**Platt ölçekleme (Platt scaling)** skorun üzerine iki parametreli bir lojistik eğri oturtur. Az veriyle çalışır ve kararlıdır, ama bozulmanın sigmoid biçiminde olduğunu varsayar; bozulma başka bir şekildeyse tam düzeltemez.

**İzotonik regresyon (isotonic regression)** ise parametrik bir biçim varsaymaz; yalnızca artan olma koşuluyla basamaklı bir eşleme öğrenir. Çok daha esnektir, ama serbestliği yüzünden küçük kalibrasyon kümelerinde aşırı uyum yapar ve çıktıyı birkaç ayrık değere yapıştırabilir.

### Sıcaklık ölçekleme

**Sıcaklık ölçekleme (temperature scaling)** çok sınıflı sinir ağlarının varsayılan yöntemidir: softmax öncesinde bütün logitleri tek bir sayıya bölersiniz. Tek parametre olduğu için aşırı uyum riski çok düşüktür ve en yüksek skorlu sınıfı değiştirmediği için doğruluğunuz aynı kalır. Yalnızca güven dağılımı sıkışır ya da yayılır.

Hangisini seçerseniz seçin, tek bir kural pazarlığa kapalıdır: kalibrasyon eşlemesi **ayrı tutulmuş bir bölmede** öğrenilir. Eğitim verisi üzerinde kalibre ederseniz, modelin zaten ezberlediği örneklerin üzerine bir düzeltme oturtmuş olursunuz ve gerçekte hâlâ kalibre olmayan bir modele kusursuz bir diyagram çizersiniz.

```text
# Kalibrasyon eşlemesini ayrı bir bölmede öğrenmek (pseudocode)
egitim, kalibrasyon, test = bol(veri)      # test hicbir asamada gorulmez

model = egit(egitim)                       # 1) modeli sadece egitim ile egit
skor_kal = model.skor(kalibrasyon)         # 2) kalibrasyon bolmesinde ham skorlar
esleme  = kalibratoru_egit(skor_kal,       #    Platt / izotonik / sicaklik
                           etiket(kalibrasyon))

# 3) uretimde her tahmin iki adimdan gecer
olasilik = esleme(model.skor(yeni_ornek))

# 4) degerlendirmeyi yalnizca test bolmesinde yap
diyagram(esleme(model.skor(test)), etiket(test))
# Kural: kalibratoru egitim verisiyle egitmek, kendi kendine not vermektir.
```

## Kalibrasyonun kırıldığı yerler

Kalibrasyon bir kez yapılıp bitirilen iş değildir, çünkü onu bozan şeylerin çoğu boru hattınızın standart parçalarıdır.

En yaygın kırılma noktası dengesizlik müdahaleleridir. Azınlık sınıfını çoğaltmak, çoğunluk sınıfını seyreltmek ya da sınıf ağırlığı vermek, modelin gördüğü taban oranını kasten değiştirir. Sonuç, sistematik olarak yukarı kaymış olasılıklardır: model azınlık sınıfını gerçek dünyadakinden çok daha sık görmüştür ve buna göre konuşur. [Sınıf dengesizliği](/posts/sinif-dengesizligi/) ile uğraşırken bunu kabul edip kalibrasyonu doğal orana sahip bir bölmede yapmanız gerekir; yeniden örneklenmiş bir kümede kalibre etmek hatayı sabitler.

İkinci kırılma noktası zamandır. Bir olgunun görülme sıklığı değiştiğinde modelin ayırt etme gücü bir süre daha korunabilir, ama olasılık ölçeği çoktan kaymıştır. Bu yüzden kalibrasyon, izleme panosunda doğruluk kadar düzenli bakılması gereken bir büyüklüktür ve kalibratör de en az model kadar sürümlenmesi gereken bir bileşendir.

Üçüncüsü, kalibrasyonun tek başına yeterli olmamasıdır. Ortalamada doğru olan bir olasılık ölçeği, tek bir örnek için ne kadar güvenilir olduğunuzu söylemez. Garanti isteyen ekipler bu noktada [konformal tahmine (conformal prediction)](/posts/konformal-tahmin/) geçer: kalibre skorlar iyi bir başlangıç noktası verir, konformal katman ise bunun üzerine kapsama garantisi koyar. Etiketsiz veride performans tahmini yapan yöntemler de aynı ön koşula dayanır; kalibre olmayan skorlarla üretilen etiketsiz performans tahminleri güvenilmezdir.

Araç tarafında bu ekosistem hızlı gelişiyor. Örneğin [MAPIE](https://mapie.readthedocs.io/en/stable/), scikit-learn-contrib altında yer alan ve v1 sürümü 2025'te yayımlanan bir kütüphanedir; Capgemini Invent, Quantmetry, Michelin ve ENS Paris-Saclay katkısıyla sürdürülür ve 2026 güncellemeleri büyük dil modelleri ile görüntü bölütlemesi için risk kontrolü ve uyarlamalı konformal yöntemler ekler.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Kalibrasyon şudur: 0.9 dediğiniz 100 örneğin yaklaşık 90'ı gerçekten pozitif olmalıdır.</li><li>Doğruluk ve AUC monoton yeniden ölçeklemeye kayıtsızdır; kalibrasyon hakkında hiçbir şey söylemez.</li><li>Kalibre olmayan bir skor, eşiğin altındaki bütün maliyet hesabını sessizce geçersiz kılar.</li><li>Platt, izotonik ve sıcaklık ölçekleme sıralamayı bozmadan ölçeği düzeltir; hepsi ayrı bir bölmede öğrenilir.</li><li>Yeniden örnekleme, sınıf ağırlıkları ve zamanla değişen taban oranı kalibrasyonu düzenli olarak bozar.</li></ul></div>

<div class="faq"><details><summary>Kalibrasyon modelimin doğruluğunu artırır mı?</summary><p>Genellikle hayır. Sıcaklık ölçekleme en yüksek skorlu sınıfı hiç değiştirmez, dolayısıyla doğruluk sabit kalır. Platt ve izotonik de sıralamayı korur. Kalibrasyon, kararlarınızın kalitesini eşik ve maliyet hesabı üzerinden iyileştirir, ham doğruluk üzerinden değil.</p></details><details><summary>ECE değerim düşük, işim bitti mi?</summary><p>Hayır. ECE kutulama ayarlarına duyarlıdır ve ortalama bir ölçüdür. Ortalamada iyi görünen bir model, belirli bir alt grupta ya da skor aralığında ciddi biçimde bozuk olabilir. Diyagramı alt gruplara ayırarak da çizin.</p></details><details><summary>Kalibrasyonu ne sıklıkla yenilemeliyim?</summary><p>Modeli her yeniden eğittiğinizde, örnekleme stratejisini her değiştirdiğinizde ve olgunun görülme sıklığı kaydığında. Kalibratörü model gibi ele alın: ayrı bir bölmede öğretilir, sürümlenir ve izlenir.</p></details></div>

---

Kalibrasyon, ölçme disiplininin en ucuz ama en çok atlanan adımıdır. Modelin sıralamasını iyileştirmek aylar sürebilir; olasılık ölçeğini düzeltmek çoğu zaman bir bölme ve birkaç satır kod meselesidir. Modelinizin söylediği sayıya inanılmasını istiyorsanız, önce o sayının ne anlama geldiğini kontrol edin.
