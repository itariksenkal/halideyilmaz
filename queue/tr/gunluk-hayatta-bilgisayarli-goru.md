---
title: "Günlük Hayatta Bilgisayarlı Görü: Makineler Nasıl Görüyor?"
description: "Telefon kamerasındaki gece modu, yüzle kilit açma, plaka tanıma, tıbbi görüntüleme ve kalite kontrol nasıl çalışıyor? Bilgisayarlı görüye sade bir bakış."
publishDate: "2026-11-25T09:17:00+03:00"
lang: tr
category: "Uygulama"
tags: ["Bilgisayarlı Görü", "Yapay Zeka", "Görüntü İşleme"]
translation: "computer-vision-in-everyday-life"
heroImage:
  src: "../../../assets/blog/covers/gunluk-hayatta-bilgisayarli-goru.jpg"
  alt: "Bir kamera merceği ve nesnelerin etrafında çizilmiş tanıma kutuları"
---

Bir fotoğrafa baktığımızda içinde bir kedi, bir masa ya da tanıdık bir yüz olduğunu saniyenin altında anlarız. Bir bilgisayar için ise aynı fotoğraf, her biri birkaç sayıdan oluşan milyonlarca pikselden ibarettir. Bilgisayarlı görü, bu sayı yığınından anlam çıkarmaya çalışan alanın adı ve sandığımızdan çok daha fazla yerde karşımıza çıkıyor: telefonumuzun kamerasında, kilit ekranında, otopark girişinde, hastanede ve fabrikada. Bu yazıda bu uygulamaların her birinin kabaca nasıl çalıştığını ve nerede zorlandığını anlatmak istiyorum. Model değerlendirme üzerine çalışan biri olarak, özellikle "laboratuvarda çalışıyor ama sahada neden şaşırıyor?" sorusuna da değineceğim.

## Bilgisayar bir görüntüde neyi "görür"?

Dijital bir görüntü, her biri renk ve parlaklık bilgisini sayılarla tutan küçük karelerden, yani piksellerden oluşur. Günümüzün bilgisayarlı görü sistemlerinin çoğu, milyonlarca etiketli örnekten öğrenen derin sinir ağlarına dayanıyor. Bu ağlar ilk katmanlarda kenarlar ve renk geçişleri gibi basit örüntüleri, sonraki katmanlarda göz, tekerlek ya da harf gibi daha karmaşık parçaları, en sonda ise bütün nesneleri tanımayı öğrenir.

Bilgisayarlı görüde birkaç temel görev var: Sınıflandırma ("bu fotoğrafta kedi var mı?"), nesne tespiti ("kedi görüntünün neresinde?"), bölütleme ("hangi pikseller kediye ait?") ve tanıma ya da eşleştirme ("bu yüz kayıtlı yüzle aynı kişiye mi ait?"). Aşağıdaki uygulamaların her biri bu görevlerin bir ya da birkaçını birleştiriyor.

## Cebimizdeki görü: telefon kamerası ve yüzle kilit açma

**Telefon kamerasının numaraları.** Akıllı telefonların küçük mercekleri ve sensörleri, fiziksel olarak büyük bir fotoğraf makinesiyle yarışacak kadar ışık toplayamaz. Aradaki farkı büyük ölçüde yazılım kapatıyor; buna hesaplamalı fotoğrafçılık deniyor. Deklanşöre bastığınızda telefon çoğu zaman tek bir kare değil, kısa aralıklarla birkaç kare çeker ve bunları hizalayıp birleştirerek gürültüyü azaltır. Gece modu bu fikrin daha uzun süreli hâlidir. Portre modunda ise model, görüntüde kişiyi arka plandan ayırır (bölütleme), sahnenin derinliğini tahmin eder ve arka planı yapay olarak bulanıklaştırır. Saç telleri veya gözlük kenarlarında gördüğünüz tuhaf bulanıklıklar, bu bölütlemenin zorlandığı yerlerdir.

**Yüzle kilit açma.** Burada iki farklı yaklaşım var. Yalnızca ön kamerayı kullanan sistemler iki boyutlu bir görüntüyle çalıştığı için bir fotoğrafla kandırılmaya daha açık olabilir. Apple'ın Face ID için yayımladığı bilgilere göre ise TrueDepth kamera yüze binlerce görünmez nokta yansıtarak bir derinlik haritası çıkarıyor ve kızılötesi bir görüntü alıyor; bu veriler matematiksel bir temsile dönüştürülüp cihazdaki kayıtlı yüz verisiyle karşılaştırılıyor. Apple, yüz verisinin cihazdan çıkmadığını, iCloud'a yedeklenmediğini ve tek bir kayıtlı görünümle rastgele birinin telefonu açma olasılığının milyonda birden az olduğunu belirtiyor. Aynı kaynak, bu olasılığın ikizler, birbirine çok benzeyen kardeşler ve yüz hatları henüz tam gelişmemiş 13 yaş altı çocuklar için daha yüksek olduğunu da açıkça yazıyor.

## Yolda ve otoparkta: plaka tanıma

Otopark bariyerlerinde veya trafik kameralarında kullanılan plaka tanıma sistemleri genellikle üç adımda çalışır. Önce nesne tespitiyle görüntüde plakanın yeri bulunur. Sonra plaka düzleştirilip karakterlere ayrılır. Son olarak optik karakter tanıma (OCR) her karakteri okur ve sonuç, ülkenin plaka formatına uyup uymadığı kontrol edilerek doğrulanır. Gece, yağmurda, çamurlu ya da açılı plakalarda hata oranı artar; "0" ile "O" veya "8" ile "B" gibi benzer karakterler klasik zorluklardır. Bu yüzden iyi tasarlanmış sistemler kızılötesi aydınlatma kullanır ve emin olamadığı okumaları insana gönderir.

## Hastanede: tıbbi görüntüleme

Tıbbi görüntüleme, bilgisayarlı görünün en umut verici ve en dikkat isteyen alanlarından biri. Modeller röntgen, tomografi veya mamografi görüntülerinde şüpheli bölgeleri işaretlemek, ölçüm yapmak ya da acil vakaları listenin başına almak için kullanılıyor. ABD Gıda ve İlaç Dairesi (FDA), pazarlanmasına izin verdiği yapay zeka destekli tıbbi cihazların bir listesini yayımlıyor; listedeki cihazların büyük çoğunluğu radyoloji alanında. FDA bu listenin kapsamlı bir kaynak olmadığını da ayrıca belirtiyor.

Bu sistemler genellikle hekimin yerine geçmek için değil, ona ikinci bir göz olmak için tasarlanıyor. Önemli bir sınırlama da şu: Bir hastanenin cihazlarıyla ve hasta profiliyle eğitilmiş bir model, farklı marka cihazlar kullanan başka bir hastanede aynı performansı göstermeyebilir. Sağlıkta yapay zeka, bu yüzden yerel doğrulama gerektiriyor.

<div class="callout"><strong>İpucu:</strong> Bir görüntü tanıma sisteminin başarısı hakkında bir rakam okuduğunuzda "Hangi verilerle, hangi koşullarda test edildi?" diye sorun. Aynı model, eğitildiği ortama benzemeyen görüntülerde belirgin biçimde daha kötü çalışabilir.</div>

## Markette ve fabrikada: perakende ve kalite kontrol

**Perakende.** Bazı self-servis kasalarda kamera, teraziye koyduğunuz meyve veya sebzeyi tanıyıp seçenekleri öneriyor. Bazı mağazalar ise raf kameralarıyla stok takibi yapıyor ya da kasasız alışveriş sistemlerini deniyor. Bu sistemler nesne tespiti ve sınıflandırmayı birleştirir, ama benzer görünen ürünler (iki farklı elma türü gibi) ve kalabalık ortamlar hâlâ zordur. Kasasız sistemlerde ayrıca müşterilerin sürekli izlenmesi bir mahremiyet sorusu doğurur.

**Kalite kontrol.** Üretim hatlarında kameralar, ürünlerdeki çizik, çatlak, eksik parça veya renk hatalarını insan gözünün yorulmadan yapamayacağı bir hızla kontrol edebiliyor. Buradaki ilginç zorluk, kusurlu ürünlerin çok nadir olması: Model eğitmek için yeterince "kötü" örnek bulmak zor. Bu yüzden bazı sistemler yalnızca sağlam ürünlerin neye benzediğini öğrenip ondan sapanları işaretleyen anormallik tespiti yaklaşımını kullanıyor.

## Sınırlar: makineler nerede şaşırıyor?

Bilgisayarlı görü sistemlerinin zayıf noktaları birbirine benziyor. **Dağılım kayması:** Model, eğitildiği görüntülere benzemeyen koşullarda (farklı ışık, kamera, mevsim) zorlanıyor. **Temsil eksikliği:** Eğitim verisinde az bulunan gruplar veya durumlar için hata oranı yükselebiliyor; yüz tanıma sistemlerinde demografik gruplar arasında doğruluk farkları ABD Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) tarafından da ölçülmüş bir konu. **Yanıltılabilirlik:** Görüntüye eklenen ve insan gözünün fark etmediği küçük değişiklikler bazı modelleri şaşırtabiliyor. **Mahremiyet:** Kameralar her yerde olduğunda, teknik olarak mümkün olan her şeyin yapılması gerekip gerekmediği ayrı bir soru hâline geliyor.

Bu sınırlar, teknolojinin işe yaramadığı anlamına gelmiyor. Sadece sonuçları körü körüne kabul etmek yerine, sistemin nerede ve hangi koşullarda güvenilir olduğunu bilmemiz gerektiğini hatırlatıyor.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Bilgisayarlı görü; sınıflandırma, nesne tespiti, bölütleme ve eşleştirme gibi temel görevlerin birleşiminden oluşuyor.</li><li>Telefon fotoğraflarının kalitesi büyük ölçüde birden fazla karenin yazılımla birleştirilmesinden geliyor.</li><li>Derinlik bilgisi kullanan yüzle kilit açma sistemleri, yalnızca iki boyutlu görüntü kullananlara göre fotoğrafla kandırılmaya daha dayanıklı.</li><li>Tıbbi görüntülemede yapay zeka hekime ikinci bir göz; farklı hastanelerde yeniden doğrulama gerekiyor.</li><li>Dağılım kayması, temsil eksikliği ve mahremiyet, bilgisayarlı görünün başlıca sınırları.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Yüzle kilit açma parmak izinden daha mı güvenli?</summary><p>Sisteme göre değişir. Derinlik sensörü kullanan sistemler yüksek güvenlik sunabilir, ama ikizler veya çok benzeyen kardeşler için risk artar. Endişeniz varsa güçlü bir parola her zaman en güvenli seçenektir.</p></details><details><summary>Telefonumdaki fotoğraflar buluta mı gönderilip analiz ediliyor?</summary><p>Bu, telefonunuza ve ayarlarınıza bağlı. Birçok işlem artık cihaz üzerinde yapılıyor, ancak bulut yedekleme ve bazı akıllı özellikler fotoğrafları sunuculara gönderebilir. Gizlilik ayarlarınızı kontrol etmek en doğru yoldur.</p></details><details><summary>Yapay zeka radyoloğun yerini alacak mı?</summary><p>Mevcut sistemlerin çoğu hekimin işini destekleyecek şekilde tasarlanıyor: şüpheli bölgeleri işaretlemek, ölçüm yapmak, acil vakaları öne almak gibi. Teşhis ve tedavi kararı hâlâ hekimin sorumluluğunda.</p></details><details><summary>Bilgisayarlı görü neden bazen çok basit hatalar yapıyor?</summary><p>Çünkü model gerçekten "anlamıyor", eğitim verisindeki örüntülere dayanıyor. Görüntü bu örüntülerden farklıysa (alışılmadık açı, ışık veya nesne), bize çok basit görünen bir durumda bile hata yapabiliyor.</p></details></div>

---

**Kaynaklar**

- [Apple – Face ID gelişmiş teknolojisi hakkında](https://support.apple.com/en-us/102381)
- [FDA – Artificial Intelligence-Enabled Medical Devices listesi](https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices)
- [Richard Szeliski – Computer Vision: Algorithms and Applications (2. baskı, 2022)](https://szeliski.org/Book/)
- [NIST – Face Recognition Technology Evaluation: Demographic Effects](https://pages.nist.gov/frvt/html/frvt_demographics.html)
