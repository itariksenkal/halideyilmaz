---
title: "Veri Görselleştirme İlkeleri: Doğru Grafik, Dürüst Eksen, Tek Mesaj"
description: "Doğru grafik türünü seçmek, yanıltmayan eksenler, erişilebilir renkler ve sade tasarım: anlaşılır ve dürüst grafikler hazırlamak için temel ilkeler."
publishDate: "2026-11-14T09:17:00+03:00"
lang: tr
category: "Veri"
tags: ["Veri Görselleştirme", "Erişilebilirlik", "Veri Okuryazarlığı"]
translation: "data-visualization-principles"
heroImage:
  src: "../../../assets/blog/covers/veri-gorsellestirme-ilkeleri.jpg"
  alt: "Sade bir çubuk grafik ve çizgi grafik içeren veri görselleştirme taslağı"
---

Bir toplantıda ekrana gelen grafik, çoğu zaman tablonun kendisinden daha ikna edicidir. İnsanlar sayıları tek tek okumak yerine şekle bakar ve birkaç saniye içinde bir sonuca varır. Bu hız grafiklerin gücüdür, ama aynı zamanda riskidir: Yanlış seçilmiş bir grafik türü, kesilmiş bir eksen ya da renk körlüğü olan birinin ayırt edemeyeceği bir palet, veri doğru olsa bile yanlış bir izlenim bırakabilir. Veri kalitesi ve model değerlendirmesi üzerine çalışırken en çok dikkat ettiğim konulardan biri, sonuçların nasıl gösterildiği. Bu yazıda, herkesin uygulayabileceği birkaç temel ilkeyi bir araya getirmek istedim.

## Önce mesaj, sonra grafik

İyi bir grafik, "veriden ne çıkıyor?" sorusuyla değil, "okuyucunun aklında ne kalmalı?" sorusuyla başlar. Grafiği hazırlamadan önce mesajı tek bir cümleyle yazmayı deneyin: "Kasım ayında iade oranı iki katına çıktı" ya da "Ankara şubesi diğer şubelerin önünde" gibi. Bu cümleyi yazamıyorsanız, grafik de büyük olasılıkla dağınık olacaktır.

Bir grafiğe birden fazla mesaj yüklemek en yaygın hatalardan biri. Altı ürünü, dört bölgeyi ve iki yılı aynı tabloya sığdırmaya çalışan bir grafik, her şeyi gösterir ama hiçbir şeyi anlatmaz. Birden fazla bulgu varsa, birden fazla grafik kullanmak çoğu zaman daha dürüst ve daha okunur bir çözümdür. Mesajı grafiğin başlığına yazmak da işe yarar: "Aylık satışlar" yerine "Satışlar Eylül'den bu yana düşüyor" gibi bir başlık, okuyucuya nereye bakacağını söyler.

## Doğru grafik türünü seçmek

Grafik türünü seçmenin pratik bir yolu, verideki ilişkinin türüne bakmaktır. Financial Times'ın görsel gazetecilik ekibinin hazırladığı "Visual Vocabulary" adlı rehber, grafikleri sapma, korelasyon, sıralama, dağılım, zaman içinde değişim, parça-bütün, büyüklük, mekânsal ve akış gibi ilişki türlerine göre gruplar. Aşağıdaki tablo, en sık karşılaşılan sorular için iyi bir başlangıç noktası sunuyor:

| Sorduğunuz soru | Genellikle işe yarayan grafik |
|---|---|
| Zaman içinde nasıl değişti? | Çizgi grafik |
| Hangi kategori daha büyük? | Yatay ya da dikey çubuk grafik (sıralı) |
| Değerler nasıl dağılıyor? | Histogram, kutu grafiği |
| İki değişken birlikte hareket ediyor mu? | Saçılım (scatter) grafiği |
| Bütünün parçaları nasıl paylaşılıyor? | Yığılmış çubuk; az sayıda parça varsa pasta |
| Hedeften ne kadar sapma var? | Sıfır çizgili sapma çubukları |

Pasta grafikler hakkında kısa bir not: İnsan gözü açıları ve alanları, uzunlukları karşılaştırdığı kadar iyi karşılaştıramaz. İki ya da üç dilimli bir pasta sorun değildir; ama yedi dilimli, birbirine yakın değerler içeren bir pastada sıralamayı görmek zordur. Bu durumda sıralı bir çubuk grafik neredeyse her zaman daha nettir.

## Yalan söylemeyen eksenler

Yanıltıcı grafiklerin büyük kısmı eksenlerle ilgilidir. En bilinen örnek, çubuk grafikte y ekseninin sıfırdan başlamamasıdır. Çubuk grafikte okuyucu değeri çubuğun uzunluğuyla algılar; eksen 95'ten başlarsa, 96 ile 98 arasındaki fark üç kat büyük görünür. Bu yüzden çubuk ve alan grafiklerde eksenin sıfırdan başlaması neredeyse bir kuraldır.

Çizgi grafikte durum biraz farklıdır. Çizgi grafikte göz, değerin kendisinden çok eğime ve değişime odaklanır; bu nedenle ekseni verinin aralığına göre daraltmak kabul edilebilir. Yine de daraltılmış ekseni açıkça etiketlemek ve küçük bir dalgalanmayı büyük bir krizmiş gibi göstermemek gerekir.

Dikkat edilmesi gereken diğer eksen sorunları:

- **Çift y ekseni:** İki farklı ölçeği aynı grafikte üst üste bindirmek, ölçekleri seçen kişinin istediği "ilişkiyi" yaratmasına izin verir. Mümkünse iki ayrı grafik kullanın.
- **Düzensiz aralıklar:** Zaman ekseninde 2020, 2022, 2023, 2026 gibi eşit olmayan aralıkları eşit mesafeyle göstermek eğimi bozar.
- **Kümülatif toplamlar:** Birikimli bir toplam her zaman yükselir; büyümenin yavaşladığını gizleyebilir. Dönemsel değerleri de göstermek iyi bir fikirdir.
- **Üç boyutlu efektler:** 3B çubuklar ve pastalar perspektif nedeniyle bazı değerleri olduğundan büyük gösterir ve hiçbir bilgi eklemez.

<div class="callout"><strong>İpucu:</strong> Bir grafiği paylaşmadan önce kendinize şunu sorun: "Bu grafiği gören biri, sayıları tablodan okusaydı aynı sonuca varır mıydı?" Cevap hayırsa, eksenleri ve ölçeği yeniden gözden geçirin.</div>

## Renk ve erişilebilirlik

Renk, grafikte en güçlü ama en kolay yanlış kullanılan araçlardan biridir. ABD Ulusal Göz Enstitüsü'ne (NEI) göre yaklaşık her 12 erkekten biri renk görme eksikliği yaşıyor ve en yaygın türü kırmızı ile yeşili ayırt etmekte zorlanmak. "Kırmızı kötü, yeşil iyi" mantığıyla hazırlanmış bir grafik, okuyucuların önemli bir kısmı için iki benzer gri tondan ibaret olabilir.

Web erişilebilirliği için yaygın olarak kullanılan WCAG yönergeleri bu konuda iki somut ilke sunar. Birincisi, bilgiyi yalnızca renkle aktarmamak: Renge ek olarak metin etiketi, desen ya da işaret şekli kullanmak. İkincisi, grafikteki anlam taşıyan öğelerin (çizgiler, çubuklar, işaretler) komşu renklere karşı en az 3:1 kontrast oranına sahip olması. Açık gri bir arka plan üzerinde soluk sarı bir çizgi bu eşiği çoğu zaman karşılamaz.

Pratikte işe yarayan birkaç alışkanlık:

- **Renk paletini veri türüne göre seçin.** Sıralı veriler (az→çok) için tek renk tonunun açıktan koyuya geçişi; bir orta noktadan iki yöne sapan veriler için iki uçlu (diverjan) palet; kategoriler için birbirinden belirgin biçimde ayrışan nitel bir palet. ColorBrewer gibi araçlar bu üç türü ayrı sunar ve renk körlüğüne uygun paletleri filtrelemeye izin verir.
- **Doğrudan etiketleyin.** Okuyucuyu lejant ile çizgi arasında gidip gelmeye zorlamak yerine, serinin adını çizginin ucuna yazın.
- **Vurgu için gri kullanın.** Tek bir seriyi öne çıkarmak istiyorsanız, onu renkli, geri kalanları gri yapın. Bu, "tek mesaj" ilkesinin renkteki karşılığıdır.

## Kalabalığı azaltmak

Grafikteki her öğe okuyucunun dikkatinden bir pay alır. Bu yüzden bir öğeyi eklemeden önce "bu bir şey anlatıyor mu?" diye sormak gerekir. Yoğun ızgara çizgileri, kalın çerçeveler, gölgeler, gereksiz ondalık basamaklar ve her çubuğun üstüne yazılmış değerler, mesajı boğabilir.

Benim sık uyguladığım bir sadeleştirme listesi şöyle: Izgara çizgilerini açık gri yapın ya da kaldırın; ondalıkları verinin gerektirdiği kadarla sınırlayın; çubukları alfabetik değil değere göre sıralayın; eksen etiketlerinde birimi mutlaka belirtin; kaynak ve tarih bilgisini grafiğin altına küçük harflerle ekleyin. Sadelik, bilgiyi azaltmak değil, gürültüyü azaltmaktır.

## Sık görülen yanıltıcı grafikler

Haberlerde, sunumlarda ve sosyal medyada sık karşılaştığım bazı kalıplar:

- **Kesik eksenli çubuk grafik:** Küçük farkları dramatik gösterir.
- **Seçilmiş zaman aralığı:** Bir eğilimin yalnızca işe gelen kısmını göstermek. Daha uzun bir pencere, tablonun tamamını görmeyi sağlar.
- **Mutlak sayı ile oran karışıklığı:** Nüfusu büyük bir ilin her konuda "en yüksek" çıkması çoğu zaman yalnızca nüfusun etkisidir. Kişi başı ya da oran olarak göstermek gerekebilir.
- **Simge ve resimli grafikler:** Bir değer iki katına çıktığında simgenin hem eni hem boyu iki katına çıkarsa, alan dört katına çıkar ve fark abartılır.
- **Belirsizliği gizlemek:** Anket veya model sonuçlarında hata payını göstermemek, kesinlik izlenimi yaratır.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Grafiğe başlamadan önce mesajı tek bir cümleyle yazın; her grafik tek bir mesaj taşısın.</li><li>Grafik türünü verideki ilişkiye göre seçin: zaman için çizgi, karşılaştırma için sıralı çubuk, ilişki için saçılım.</li><li>Çubuk grafiklerde eksen sıfırdan başlamalı; çift eksen ve 3B efektlerden kaçının.</li><li>Bilgiyi yalnızca renkle aktarmayın; etiket, desen ve yeterli kontrast kullanın.</li><li>Gürültüyü azaltın: hafif ızgara, doğrudan etiket, değere göre sıralama, açık birim ve kaynak.</li></ul></div>

<div class="faq"><details><summary>Pasta grafik kullanmak yanlış mı?</summary><p>Hayır. İki ya da üç parçalı, bütünün paylaşımını gösteren basit durumlarda pasta grafik anlaşılırdır. Parça sayısı arttığında ya da değerler birbirine yakın olduğunda sıralı bir çubuk grafik genellikle daha kolay okunur.</p></details><details><summary>Çizgi grafikte eksen sıfırdan başlamak zorunda mı?</summary><p>Zorunlu değil. Çizgi grafikte göz eğime odaklandığı için ekseni verinin aralığına göre ayarlamak kabul edilir. Ancak ekseni açıkça etiketlemek ve küçük değişimleri abartmamak gerekir.</p></details><details><summary>Renk körlüğüne uygun bir palet nasıl seçerim?</summary><p>Kırmızı-yeşil karşıtlığına dayanmayan, açıklık farkı belirgin paletler seçin ve renge ek olarak etiket ya da desen kullanın. ColorBrewer gibi araçlarda renk körlüğüne uygun paletleri filtreleyebilirsiniz.</p></details><details><summary>Bir grafiğe kaç renk koymalıyım?</summary><p>Kesin bir sayı yok, ama kategori sayısı arttıkça renkleri ayırt etmek zorlaşır. Çok sayıda kategori varsa, önemli birkaçını renklendirip geri kalanını gri bırakmak ya da grafiği bölmek daha iyi sonuç verir.</p></details></div>

---

**Kaynaklar**

- [Financial Times – Visual Vocabulary (chart-doctor deposu)](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
- [data.europa.eu – Veri Görselleştirme Rehberi: Mesaja göre grafik seçimi](https://data.europa.eu/apps/data-visualisation-guide/choosing-charts-the-message)
- [W3C – Understanding SC 1.4.1: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
- [W3C – Understanding SC 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [National Eye Institute – Color Blindness](https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness)
- [ColorBrewer](https://colorbrewer2.org/)
