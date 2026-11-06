---
title: "Etiket Gelmeden Modelin Bozulduğunu Anlamak: Etiketsiz Performans Tahmini"
description: "Etiketler doksan gün sonra geliyorsa model bugün bozuldu mu? Etiketsiz performans tahmininin nasıl çalıştığını, hangi varsayımlara dayandığını ve tam da o varsayımlar çöktüğünde neden sessiz kaldığını anlatıyoruz."
publishDate: "2026-08-13T23:11:00+03:00"
lang: tr
category: "Üretim"
tags: ["Üretim", "Yapay Zeka"]
translation: "performance-estimation-without-labels"
heroImage:
  src: "../../../assets/blog/bimg-19.jpg"
  alt: "Etiket Gelmeden Modelin Bozulduğunu Anlamak: Etiketsiz Performans Tahmini"
---

Üretimdeki bir modelin doğruluğunu ölçmek için gerçek sonucu beklemeniz gerekir. Sorun şu ki gerçek sonuç çoğu zaman aylar sonra gelir: kredinin geri ödenip ödenmediği, aboneliğin iptal edilip edilmediği, ters ibrazın açılıp açılmadığı. O arada model çalışmaya, karar üretmeye ve o kararların sonucunu doğurmaya devam eder. Bu yazıda etiket gelmeden model sağlığını tahmin etmenin yollarını anlatıyoruz; ama sıralamayı bilerek tersine çeviriyoruz. Önce bu yöntemlerin hangi varsayımlara dayandığını konuşacağız, çünkü etiketsiz tahmin ediciler tam da insanların onlara en çok ihtiyaç duyduğunu sandığı senaryoda sessizce yanılır.

## Etiket gecikmesi bir tasarım kısıtıdır

Çoğu ekip etiket gecikmesini bir aksilik gibi görür: “etiketler gelince bakarız”. Oysa gecikme, sistemin kalıcı bir özelliğidir ve mimarinin girdisi olmalıdır. Bir kredi modelinde sonuç aylar sonra netleşir. Abonelik iptalinde tanım gereği doksan günlük bir pencere beklersiniz. Sağlıkta sonuç, tedavi tamamlanmadan bilinmez.

Bazı durumlarda etiket hiç gelmez. Reddettiğiniz başvurunun geri ödenip ödenmeyeceğini asla öğrenemezsiniz; modelin kararı, o kararın sonucunu görmenizi engellemiştir. Bu yüzden “gerçek performans” dediğiniz şey çoğu üretim sisteminde yalnızca bir alt küme için ölçülebilir ve o alt küme modelin kendi kararlarıyla şekillendiği için rastgele de değildir.

Bu boşluğun maliyeti soyut değil. Doksan günlük bir körlük penceresinde model on binlerce karar üretir; bunların çoğu geri alınamaz, bir kısmı da müşteriye doğrudan yansır. Yani soru “etiketsiz tahmin yapmalı mıyız” değil, “o doksan günde neye bakacağız” sorusudur.

Bu boşlukta ne yaparsınız? Yaygın refleks, girdi dağılımını izlemektir. [Üretimde model izleme ve veri kayması](/posts/model-izleme-drift/) yazısında anlattığımız gibi bu değerli bir erken uyarıdır, ama sınırlıdır: size girdilerin değiştiğini söyler, modelin kötüleştiğini söylemez. Bunlar farklı sorulardır ve ekiplerin çoğu ikincisini sorup birincisinin cevabıyla yetinir.

> Bir izleme planının değeri, bozulmayı ne kadar erken görebildiğiyle ölçülür. Etiketler doksan gün sonra geliyorsa, yalnızca etiketlere bakan bir plan doksan gün boyunca hiçbir şey söylemiyor demektir.

## Önce varsayımlar, sonra yöntem

Etiketsiz performans tahmini gerçek ve kullanışlı bir yöntem ailesidir. Ama çoğu tanıtımda varsayımlar en sona, küçük puntoya bırakılır. Tersini yapalım, çünkü bu yöntemin nerede işe yaramadığını bilmek nasıl çalıştığını bilmekten daha kıymetlidir.

Dört varsayım vardır ve dördü de gerçekten gereklidir.

-   **Kavram kayması yok.** Girdiyle çıktı arasındaki ilişki, yani _P(Y|X)_, aynı kalmalıdır. Değişmesine izin verilen tek şey girdilerin dağılımıdır; buna ortak değişken kayması (covariate shift) denir.
-   **Skorlar kalibre.** Model 0,8 diyorsa, o gruptaki örneklerin gerçekten yaklaşık yüzde 80’i pozitif olmalıdır. [Model kalibrasyonu](/posts/model-kalibrasyonu/) burada bir iyileştirme değil, yöntemin taşıyıcı kolonudur.
-   **Model ve karar eşiği sabit.** Tahmini metrikler belirli bir model sürümü ve belirli bir eşik için geçerlidir; ikisi de sessizce değişebilen şeylerdir.
-   **Yeterli örtüşme.** Bugünkü girdiler, referans dönemin kapsadığı bölgelerin içinde kalmalıdır. Modelin hiç örnek görmediği bir bölgeye taşındıysanız, tahmin edicinin dayanacağı bir geçmiş yoktur.

Şimdi ironiye gelelim. Ekipler bu yöntemlere genellikle şu korkuyla başvurur: “dünya değişti, model artık doğru çalışmıyor olabilir”. Ama “dünyanın değişmesi” ilişkiyi bozacak biçimde olduysa, yani kavram kayması varsa, yöntemin birinci varsayımı çökmüştür. Tahmin edici bu durumda hata vermez; sakin sakin yanlış bir sayı üretir. En tehlikeli izleme aracı, yanıldığında sessiz kalandır.

Bu, yöntemi kullanmayın demek değil. Varsayımları bir kapı gibi düşünün: kapıyı görmeden içeri giren, odanın boş olduğunu sanır. Varsayımları panoya yazın, her tahmini metriğin yanında hangi koşullar altında geçerli olduğunu gösterin ve varsayımların kendisini de ayrıca izleyin. Bu yazının geri kalanı büyük ölçüde bunun nasıl yapılacağı hakkında.

## Nasıl çalışır: skor dağılımından beklenen karışıklık matrisi

Fikir, kalibrasyonun tanımından çıkar. Skorlar kalibreyse, 0,8 skoru zaten “bu örneğin pozitif olma olasılığı yüzde 80” demektir. O hâlde etikete ihtiyacınız yoktur: her tahmin, kendi doğruluk olasılığını beraberinde taşır.

Bir eşik seçin. Eşiğin üstünde kalan ve skoru _p_ olan her örnek, beklenen doğru pozitife _p_ kadar, beklenen yanlış pozitife _1-p_ kadar katkı verir. Eşiğin altındakiler için tersi geçerlidir. Bunları bütün yığın boyunca toplayınca elinizde **beklenen karışıklık matrisi** olur ve [sınıflandırma metriklerinin](/posts/degerlendirme-metrikleri/) tamamı bu matristen türetilir: kesinlik, duyarlılık, F1, doğruluk. Eşiği baştan sona tarayarak aynı mantıkla tahmini bir ROC AUC de elde edersiniz.

Bu yaklaşımın belgelenmiş adı **CBPE**’dir (Confidence-Based Performance Estimation) ve sınıflandırma için tasarlanmıştır. Regresyon tarafında ise **DLE** (Direct Loss Estimation) vardır: birinci modelin hatasını, girdilerden ve tahminin kendisinden yola çıkarak öngörmeyi öğrenen ikinci bir model. İkisi de [NannyML](https://github.com/NannyML/nannyml) tarafından belgelenmiş, gerçek yöntemlerdir.

### Kalibrasyon burada süs değil

Model 0,8 diyorken gerçekte oran yüzde 60 ise, beklenen karışıklık matrisinin her hücresi aynı yöne doğru yanlıdır ve türetilen bütün metrikler o yanlılığı miras alır. Daha ince bir tuzak da şudur: eğitim popülasyonunda kalibre olan bir model, girdi dağılımı kaydığında otomatik olarak kalibre kalmaz. Yani kalibrasyon bir kez yapılıp unutulacak bir adım değil, izlenmesi gereken bir büyüklüktür.

```python
# Etiketsiz performans tahmini (sözde-kod)
# Varsayim: skorlar kalibre ve P(Y|X) degismedi.
tp = fp = tn = fn = 0.0
for p in kalibre_skorlar(bugunku_tahminler):   # p = pozitif olma olasiligi
    if p >= esik:
        tp += p          # beklenen dogru pozitif
        fp += 1 - p      # beklenen yanlis pozitif
    else:
        fn += p          # beklenen yanlis negatif
        tn += 1 - p      # beklenen dogru negatif

tahmini_kesinlik   = tp / (tp + fp)
tahmini_duyarlilik = tp / (tp + fn)
# Esigi tarayarak ayni mantikla tahmini ROC AUC de cikarilir.
# Kalibrasyon bozulursa butun bu sayilar ayni yone yanlilanir.
```

<div class="callout"><strong>İpucu:</strong> Tahmini metriği tek bir sayı olarak yayımlamayın. Küçük yığınlarda beklenen karışıklık matrisi gürültülüdür; yanına bir belirsizlik aralığı koyun ve aralık yeterince darsa karar alın. Aksi hâlde tahmin ediciyi, yerine geçtiği ölçümden daha kesinmiş gibi sunmuş olursunuz.</div>

## Neden ortak değişken kayması kurtarılabilir, kavram kayması kurtarılamaz

Bu ayrım yöntemin kalbidir ve bir mühendislik eksikliği değil, bir bilgi sınırıdır.

**Ortak değişken kaymasında** girdilerin dağılımı değişir ama girdiyle çıktı arasındaki kural aynı kalır. Bu durumda etiketsiz girdiler işe yarar bilgi taşır: hangi bölgeye kaydığınızı görür, modelin o bölgedeki bilinen davranışını kullanır ve beklenen performansı yeniden hesaplarsınız. Sınavın soru dağılımı değişmiştir ama cevap anahtarı aynıdır.

**Kavram kaymasında** ise cevap anahtarı değişmiştir. Aynı girdi artık farklı bir sonuca işaret eder: dolandırıcılar taktik değiştirir, bir mevzuat kalemi yeniden tanımlanır, rakip fiyat politikasını değiştirir. Elinizde ne kadar etiketsiz girdi olursa olsun, hiçbiri size bu değişimi anlatamaz; çünkü değişen şey girdilerde değil, girdiden sonuca giden eşlemededir.

> Etiketsiz veri, girdinin nereye gittiğini anlatır; o girdinin karşılığının ne olduğunu anlatamaz. Cevap anahtarı değiştiyse, sınav kâğıtlarına ne kadar bakarsanız bakın bunu göremezsiniz.

Aradaki farkı ölçmenin doğrudan bir yolu olmadığını da kabul etmek gerekir. Etiketsiz veriyle bakarken iki durum aynı görünür: girdiler kaydı ve model hâlâ doğru, ya da girdiler kaydı ve kural da değişti. Ayrımı ancak az sayıda gerçek etiket ya da alan bilgisi yapabilir; “bu sektörde geçen ay mevzuat değişti” cümlesi, çoğu istatistikten daha güçlü bir kanıttır.

Pratikte bir uyarı daha: [sınıf dengesizliği](/posts/sinif-dengesizligi/) bu tahminlerin varyansını büyütür. Azınlık sınıfı yüzde birlik bir paydaysa, beklenen karışıklık matrisinin ilgili hücreleri az sayıda örneğin skorundan beslenir ve tahmini duyarlılık oynak hâle gelir. Bu tür kurulumlarda tahmini metriği günlük değil, yeterli hacim biriktiren pencerelerde okuyun.

## Kısmi etiketiniz varken: vekil sinyaller

Etiketlerin tamamı geç gelse de, çoğu sistemde bir kısmı erken gelir ya da az sayıda etiketi satın alabilirsiniz. Bu parçaları doğru kullanmak, etiketsiz tahmini tek başına kullanmaktan çok daha sağlamdır.

### Erken gelen alt kümeler

Bazı sonuçlar hızlı belli olur: ilk taksitte gerçekleşen temerrütler, birkaç gün içinde açılan ters ibrazlar, ilk hafta iptalleri. Bunlar hızlıdır ama yanlıdır; popülasyonun rastgele bir örneklemi değil, uç bölgesidir. Erken alt kümeyi öncü gösterge olarak kullanın, popülasyon tahmini olarak değil. Yönü doğru, seviyesi yanlış bir sinyaldir.

### Örneklenmiş insan denetimi

İkinci kaynak, küçük ve tabakalı bir örneklemi insana etiketletmektir. Bu, yansız ama küçük bir ölçüm verir; yani güven aralığı geniştir. Etiket bütçenizi en çok buraya harcayın ve tahmin edicinin riskli dediği bölgeyi bilerek fazla örnekleyin. Böylece iki sinyal birbirini denetler: etiketsiz tahmin alarmı çalar, örneklenmiş denetim onu doğrular ya da yalanlar.

Üçüncü kaynak iş metrikleridir: onay oranı, dönüşüm, itiraz ve şikâyet oranı, insan operatörün modelin kararını ne sıklıkla geçersiz kıldığı, tahmin dağılımının kendisi. Bunlar performansın ölçümü değildir ama davranışın aynasıdır ve genelde en erken kıpırdayan göstergelerdir.

<div class="callout"><strong>İpucu:</strong> Vekil sinyalleri panoya koyarken her birinin yanına ne <em>olmadığını</em> yazın: “öncü, yanlı”, “yansız, geniş aralıklı”, “dolaylı”. Etiketli bir ölçümle vekil bir göstergeyi aynı grafikte aynı görünümde çizmek, altı ay sonra yanlış karar vermenin en kestirme yoludur.</div>

## Varsayım tutmadığında ne yaparsınız

Tahmin edicinin sessizce yanıldığını fark etmenin üç pratik yolu var.

-   **Destek kontrolü.** Bugünkü girdiler referansın kapsamadığı bölgelere taşındıysa tahmin güvenilmezdir. Yapılandırılmamış veride bunu [gömme kayması izleme](/posts/gomme-kaymasi-izleme/) ile, tablo verisinde komşuluk ve yoğunluk kontrolleriyle yaparsınız.
-   **Kalibrasyon takibi.** Gelen az sayıda etiketi performans ölçmek için değil, kalibrasyonu denetlemek için kullanın. Kalibrasyon bozulduysa tahmini metrik değil, önce kalibrasyon düzeltilir.
-   **Değiştirilebilirlik testleri.** Konformal tahmin dünyasından gelen araçlar bu iş için daha sağlam bir temel sunuyor: crepes 0.9.1 (Haziran 2026) değiştirilebilirlik test martingalleri getiriyor, [MAPIE 1.5.0](https://pypi.org/project/MAPIE/) (5 Ağustos 2026) dağılım kayması tespiti için değiştirilebilirlik testi ekliyor. Bunlar, özellik başına KS testinden çok daha iyi temellendirilmiş bir alarmdır.

### Yöntemi önerin, kütüphaneye bağlanmayın

Dürüst olmak gerekirse ekosistem tarafında bir risk var ve başka sayfalar bunu yazmıyor. CBPE ve DLE’yi belgeleyen NannyML’in açık kaynak deposu 12 Temmuz 2025’ten bu yana durgun; şirket [Soda](https://launch.soda.io/) tarafından satın alındı. Yöntem sağlamdır, kütüphanenin geleceği ise belirsizdir. İyi haber şu ki beklenen karışıklık matrisi hesabı, kendi skor dağılımınız üzerinde çalışan birkaç düzine satırlık bir aritmetiktir; bu yeteneği kendi tarafınızda tutabilirsiniz.

Son olarak yönetişim tarafı. AB Yapay Zekâ Yasası’nın 72. maddesi, yüksek riskli sistemler için bir piyasaya arz sonrası izleme planı zorunlu kılar; komşu [73\. madde](https://artificialintelligenceact.eu/article/73/) ise ciddi olayların bildirimini düzenler. Buradaki mühendislik gerçeği düzenleyici gerçekle örtüşüyor: bozulmayı ancak etiketler geldikten sonra fark edebilen bir plan, gerçek anlamda bir izleme planı değildir. Etiket gecikmesini plana açıkça yazın ve o gecikme boyunca hangi ara sinyale güvendiğinizi de yazın.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Etiket gecikmesi bir aksilik değil, kalıcı bir tasarım kısıtıdır; bazı örneklerde etiket hiç gelmez.</li><li>Etiketsiz performans tahmini kavram kayması olmadığını ve skorların kalibre olduğunu varsayar; varsayımları yöntemden önce okuyun.</li><li>Kalibre skorlardan beklenen karışıklık matrisi hesaplanır; kesinlik, duyarlılık ve tahmini ROC AUC buradan türetilir.</li><li>Ortak değişken kayması etiketsiz veriden kurtarılabilir, kavram kayması kurtarılamaz; bu bir bilgi sınırıdır.</li><li>Erken etiketler, örneklenmiş insan denetimi ve iş metrikleri tahmini denetler; hiçbiri tek başına ölçüm yerine geçmez.</li></ul></div>

<div class="faq"><details><summary>Etiketsiz performans tahmini gerçek ölçümün yerini tutar mı?</summary><p>Hayır, onun yerine geçmez; etiketler gelene kadar geçen sürede karar verebilmenizi sağlar. Etiketler geldiğinde tahmini gerçek ölçümle karşılaştırın ve aradaki farkı kaydedin. Bu geriye dönük karşılaştırma zamanla size tahmin edicinin sizin sisteminizde ne kadar güvenilir olduğunu söyler; asıl kıymetli bilgi budur.</p></details><details><summary>Modelim kalibre değilse ne yapmalıyım?</summary><p>Önce kalibrasyonu düzeltin, sonra tahmin ediciyi kurun. Kalibre olmayan skorlarla hesaplanan beklenen karışıklık matrisi sistematik olarak yanlıdır ve türetilen bütün metrikler aynı yönde kayar. Ayrıca kalibrasyonun girdi dağılımı kaydıkça bozulabileceğini unutmayın; onu tek seferlik bir adım değil, izlenen bir büyüklük olarak ele alın.</p></details><details><summary>Kavram kaymasını hiçbir biçimde erken göremez miyim?</summary><p>Etiketsiz girdilere bakarak göremezsiniz, çünkü değişen şey girdilerde değil girdi-sonuç ilişkisindedir. Yapabileceğiniz şey dolaylı kanıt toplamaktır: erken gelen etiket alt kümeleri, küçük ama tabakalı bir insan denetimi örneklemi, itiraz ve geçersiz kılma oranları gibi iş sinyalleri. Bunlar kesin ölçüm değildir ama doksan günlük körlüğü otuz güne indirir.</p></details></div>

---

Etiketsiz performans tahmini, üretim ekiplerinin gerçekten sorduğu soruya verilen en iyi cevaplardan biri: model bugün bozuldu mu? Ama gücü kadar sınırını da bilmek gerekiyor. Bu yöntem, dünyanın kurallarının değişmediği ama girdilerin kaydığı bir dünyada olağanüstü işe yarar; kuralların kendisi değiştiğinde ise sessizce yanılır. Doğru kurulum, tek bir sayıya güvenmek değil, tahmini bir destek kontrolüyle, bir kalibrasyon takibiyle ve küçük ama dürüst bir insan denetimi örneklemiyle birlikte okumaktır.
