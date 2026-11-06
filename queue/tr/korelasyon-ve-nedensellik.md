---
title: "Korelasyon ve Nedensellik: Birlikte Görülmek Neden Yetmez?"
description: "Korelasyon ile nedensellik arasındaki fark akılda kalıcı örneklerle: karıştırıcı değişkenler, sahte ilişkiler, randomize deneyler ve haber başlıklarını okumak."
publishDate: "2026-11-12T09:17:00+03:00"
lang: tr
category: "İstatistik"
tags: ["İstatistik", "Veri Okuryazarlığı", "Bilimsel Düşünme"]
translation: "correlation-vs-causation"
heroImage:
  src: "../../../assets/blog/covers/korelasyon-ve-nedensellik.jpg"
  alt: "Birlikte yükselen iki çizgi grafiği ve aralarında bir soru işareti"
---

"Kahve içenler daha uzun yaşıyor", "Çok kitap okuyan çocuklar daha başarılı", "Şu uygulamayı kullanan şirketler daha hızlı büyüyor"... Bu tür cümleleri her gün okuyoruz. Hepsinin altında aynı soru yatıyor: İki şeyin birlikte görülmesi, birinin diğerine yol açtığı anlamına mı geliyor? İstatistikte buna korelasyon ile nedensellik ayrımı deniyor ve bence veri okuryazarlığının en temel, en çok işe yarayan dersi bu. Bu yazıda farkı akılda kalıcı örneklerle anlatacağım ve bir haber başlığını okurken sorabileceğiniz basit sorular önereceğim.

## Korelasyon nedir, nedensellik nedir?

**Korelasyon**, iki değişkenin birlikte değişme eğilimidir. Biri artarken öteki de artıyorsa pozitif, biri artarken öteki azalıyorsa negatif korelasyondan söz ederiz. Bu tamamen bir ölçümdür; neden hakkında hiçbir şey söylemez.

**Nedensellik** ise birinin değişmesinin ötekini değiştirmesidir. "Eğer X'i değiştirirsem Y de değişir" diyebilmektir.

Aradaki fark masum görünür ama günlük hayatta, sağlıkta, iş dünyasında ve politikada çok büyük sonuçları olur. Yanlış bir nedensellik varsayımı, işe yaramayan bir tedaviye, boşa giden bir yatırıma ya da yanlış bir kamu politikasına dönüşebilir.

## Karıştırıcı değişkenler: arkadaki gizli neden

Klasik örnek: Yaz aylarında dondurma satışları artar, boğulma vakaları da artar. Bu iki veri arasında belirgin bir korelasyon bulursunuz. Ama dondurma insanları boğmaz. İkisini birden etkileyen üçüncü bir etken var: sıcak hava. Sıcakta hem daha çok dondurma yenir hem de daha çok kişi denize girer.

Bu üçüncü etkene **karıştırıcı değişken** (confounder) denir. Daha az bariz bir örnek: 1999'da yayımlanan bir çalışma, gece ışığı açık uyuyan çocuklarda miyopinin daha sık görüldüğünü bildirmişti. Sonraki araştırmalar ise ebeveyn miyopisinin ortak bir etken olduğuna işaret etti: miyop ebeveynlerin hem çocuklarında miyopi daha sık görülüyor hem de bu ebeveynler geceleri ışığı açık bırakmaya daha yatkın olabiliyordu.

| İlişki | Gözlenen | Olası açıklama |
|---|---|---|
| Dondurma satışı ve boğulmalar | Birlikte artıyor | Karıştırıcı: sıcak hava |
| Gece ışığı ve çocuklarda miyopi | Birlikte görülüyor | Karıştırıcı: ebeveyn miyopisi |
| Rüzgâr değirmeni hızı ve rüzgâr | Birlikte artıyor | Ters yön: rüzgâr değirmeni döndürür, tersi değil |
| İki alakasız yıllık veri serisi | Neredeyse aynı eğri | Tesadüf: çok sayıda veri karşılaştırılınca kaçınılmaz |

## Ters nedensellik: ok hangi yöne gidiyor?

Bazen iki şey gerçekten nedensel olarak bağlıdır, ama ok sandığımız yönün tersine gider. Rüzgâr değirmenleri hızlı döndüğünde rüzgâr da güçlüdür; ama değirmenler rüzgâr yaratmaz. Daha ciddi bir örnek: düşük kolesterol bazı araştırmalarda yüksek ölüm oranıyla ilişkili bulunmuştur. Ancak bazı hastalıklar kolesterolü düşürebildiği için, burada düşük kolesterol ölümün nedeni değil, altta yatan hastalığın bir belirtisi olabilir.

## Sahte korelasyonlar: yeterince ararsanız bulursunuz

Tyler Vigen'in "Spurious Correlations" (Sahte Korelasyonlar) sitesi bu konunun en eğlenceli örneklerini topluyor. Site, binlerce değişkeni birbiriyle karşılaştırarak tesadüfen birbirine benzeyen eğrileri buluyor. Örneğin Satürn ile Güneş arasındaki mesafe ile Google'da "how to make baby" aramaları arasında yıllar boyunca şaşırtıcı bir uyum görünüyor.

Mesaj basit: yeterince çok sayıda değişkeni karşılaştırırsanız, bazıları tamamen tesadüfen birlikte hareket eder. Özellikle yalnızca birkaç yıllık veri noktası olan zaman serilerinde bu çok kolay olur. Büyük veri çağında bu risk azalmıyor, artıyor.

<div class="callout"><strong>İpucu:</strong> İki eğrinin aynı grafikte üst üste bindiğini gördüğünüzde, eksenlere bakın. Farklı ölçekte iki dikey eksen ve kırpılmış bir başlangıç noktası, zayıf bir ilişkiyi çok güçlü gösterebilir.</div>

## Randomize deneyler neden bu kadar önemli?

Karıştırıcı değişkenlerden kurtulmanın en güçlü yolu **randomize kontrollü deneydir**. Katılımcılar rastgele iki gruba ayrılır: biri müdahaleyi (örneğin bir ilacı) alır, öteki almaz ya da standart tedaviyi alır. Rastgele atama sayesinde yaş, sağlık durumu, yaşam tarzı gibi etkenler, bilinmeyenler de dahil, iki grupta ortalamada dengelenir. Böylece gruplar arasındaki farkı müdahaleye bağlamak çok daha güvenilir hale gelir. İngiltere'nin ulusal sağlık hizmeti NHS de klinik araştırmaları anlatırken grupların karşılaştırılabilir olmasının ve kimin hangi tedaviyi aldığının bilinmemesinin (körleme) yanlılığı azalttığını vurguluyor.

Tarihten öğretici bir örnek: Uzun süre, menopoz sonrası hormon tedavisinin kalp hastalığını önleyebileceği düşünülüyordu. Ancak ABD'deki büyük ölçekli Kadın Sağlığı Girişimi (Women's Health Initiative) kapsamındaki randomize çalışmalar, hormon tedavisinin menopoz sonrası kadınlarda kalp hastalığını "bir zamanlar düşünüldüğü gibi" önlemediğini gösterdi; kombine tedavinin bazı riskleri artırdığı da bulundu. Gözlemsel verilerde görülen ilişki, büyük olasılıkla hormon tedavisi alan kadınların başka açılardan da farklı olmasından kaynaklanıyordu.

Elbette her soruyu deneyle cevaplamak mümkün değil. Sigaranın zararlarını ölçmek için insanları rastgele sigara içmeye atayamazsınız. Bu durumlarda araştırmacılar, farklı türden pek çok kanıtın aynı yönü göstermesine, ilişkinin gücüne, zaman sırasına ve biyolojik açıklamaya bakarak nedensellik hakkında daha güçlü çıkarımlar yapar.

## Haber başlıklarını eleştirel okumak

Bir sonraki "X, Y riskini azaltıyor" başlığında şu soruları sorun:

1. **Bu bir deney mi, gözlem mi?** Gözlemsel çalışmalarda "ilişkili" kelimesi, başlıkta sıklıkla "neden oluyor"a dönüşür.
2. **Karıştırıcı ne olabilir?** Kahve içenler, sigara içme, gelir ya da genel sağlık açısından da farklı olabilir mi?
3. **Ok hangi yöne gidiyor?** Belki Y, X'e yol açıyordur.
4. **Kaç kişiyle, kimlerle yapıldı?** Fareler üzerinde mi, yüz kişiyle mi, yüz bin kişiyle mi?
5. **Etki ne kadar büyük?** "Riski yüzde 50 artırıyor" ifadesi, risk binde 2'den binde 3'e çıkıyorsa farklı anlam taşır.
6. **Başka çalışmalar ne diyor?** Tek bir çalışma nadiren son sözdür.

<div class="callout"><strong>İpucu:</strong> Haberdeki "bağlantılı bulundu", "ilişkili" ya da "eşlik ediyor" gibi ifadeler genellikle gözlemsel bir çalışmaya işaret eder. Başlıktaki "neden oluyor" ya da "önlüyor" ifadesi ise çoğu zaman haberin, çalışmanın söylediğinden fazlasını söylediğini gösterir.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Korelasyon birlikte değişmeyi ölçer; nedensellik ise birinin değişmesinin ötekini değiştirmesidir.</li><li>Karıştırıcı değişkenler, iki şeyin arasında var olmayan bir neden-sonuç ilişkisi görmemize yol açabilir.</li><li>Ters nedensellik ve tesadüfi (sahte) korelasyonlar da yaygın tuzaklardır.</li><li>Randomize kontrollü deneyler, nedenselliği sınamanın en güçlü yoludur.</li><li>Haber başlıklarında çalışma türünü, örneklemi ve etkinin büyüklüğünü sorgulayın.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Korelasyon nedenselliğin hiçbir kanıtı değil mi?</summary><p>Tek başına yeterli değildir, ama bir ipucu olabilir. Korelasyon, nedensellik araştırmasının başlangıç noktasıdır; sonrasında karıştırıcıları ele alan ve mümkünse deneysel tasarım kullanan çalışmalar gerekir.</p></details><details><summary>Makine öğrenmesi modelleri nedensellik bulabilir mi?</summary><p>Standart tahmin modelleri korelasyonlardan yararlanır ve tek başına nedensellik kurmaz. Nedensel çıkarım için özel yöntemler ve dikkatli bir çalışma tasarımı gerekir.</p></details><details><summary>Deney yapılamayan konularda ne olacak?</summary><p>Bu durumlarda farklı türden çok sayıda gözlemsel kanıtın tutarlı olması, ilişkinin gücü, zaman sırası ve biyolojik ya da mantıksal bir mekanizmanın varlığı birlikte değerlendirilir.</p></details></div>

---

**Kaynaklar**

- [Tyler Vigen – Spurious Correlations](https://www.tylervigen.com/spurious-correlations)
- [NHLBI (ABD Ulusal Kalp, Akciğer ve Kan Enstitüsü) – Women's Health Initiative (WHI)](https://www.nhlbi.nih.gov/science/womens-health-initiative-whi)
- [NHS – Clinical trials](https://www.nhs.uk/conditions/clinical-trials/)
- [American Statistical Association – Statement on Statistical Significance and P-Values (2016)](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf)
