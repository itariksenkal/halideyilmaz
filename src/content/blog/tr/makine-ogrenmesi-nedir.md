---
title: "Makine Öğrenmesi Nedir? Örneklerden Öğrenen Bilgisayarlar"
description: "Makine öğrenmesini sade bir dille anlatıyorum: örneklerden öğrenme, denetimli ve denetimsiz öğrenme, eğitim ile tahmin farkı ve günlük hayattan örnekler."
publishDate: "2026-11-06T09:17:00+03:00"
lang: tr
category: "Temeller"
tags: ["Makine Öğrenmesi", "Yapay Zeka", "Temel Kavramlar"]
translation: "what-is-machine-learning"
heroImage:
  src: "../../../assets/blog/covers/makine-ogrenmesi-nedir.jpg"
  alt: "Veri noktalarından bir örüntü çıkaran bilgisayarı anlatan soyut çizim"
---

"Makine öğrenmesi" ifadesini artık haberlerde, iş ilanlarında, hatta market uygulamalarının tanıtımlarında görüyoruz. Ama tanımı sorulduğunda çoğumuz ya çok teknik ya da çok bulanık bir cevap veriyoruz. Bu yazıda kavramı formül kullanmadan, gündelik örneklerle anlatmaya çalışacağım. Amacım şu: yazının sonunda bir ürünün "makine öğrenmesiyle çalışıyor" iddiasını duyduğunuzda, bunun ne anlama geldiğini ve neyi kesinlikle anlamına gelmediğini kendi cümlelerinizle açıklayabilmeniz.

## Kural yazmak yerine örnek göstermek

Klasik yazılımda programcı kuralları tek tek yazar: "Tutar şu değerden büyükse uyarı ver", "E-postada şu kelime varsa spam klasörüne taşı." Bu yaklaşım kurallar net olduğunda çok iyi çalışır. Ama bir fotoğrafta kedi olup olmadığını ya da bir yorumun olumlu mu olumsuz mu olduğunu kurallarla tarif etmeye çalıştığınızda iş hızla içinden çıkılmaz hale gelir.

Makine öğrenmesi burada farklı bir yol izler. Kuralları biz yazmayız; sisteme çok sayıda örnek veririz ve sistem bu örneklerdeki örüntüleri kendisi çıkarır. MIT Sloan'ın derlediği klasik tanımda, 1950'lerde yapay zeka öncülerinden Arthur Samuel'e atfedilen bir ifade geçer: bilgisayarlara açıkça programlanmadan öğrenme yeteneği kazandıran çalışma alanı. Bu cümlenin birebir Samuel'e ait olup olmadığı tartışmalı olsa da fikri iyi özetliyor.

Çocuklara kelime öğretmeyi düşünün. "Köpek dört ayaklıdır, havlar, tüylüdür" diye bir tanım ezberletmek yerine onlara farklı köpekler gösteririz. Bir süre sonra daha önce hiç görmedikleri bir köpeği de tanırlar. Makine öğrenmesi de kabaca buna benzer: örneklerden genelleme yapmak.

## Üç temel öğrenme biçimi

Makine öğrenmesi yöntemleri genellikle üç ana grupta anlatılır. Google'ın giriş materyalleri, bunlara son yıllarda üretken yapay zekayı dördüncü bir başlık olarak ekliyor.

| Tür | Veri nasıl? | Ne yapar? | Gündelik örnek |
|---|---|---|---|
| Denetimli öğrenme | Doğru cevabı (etiketi) belli örnekler | Yeni örnek için cevabı tahmin eder | Spam filtresi, ev fiyatı tahmini |
| Denetimsiz öğrenme | Etiketsiz veri | Benzer olanları gruplar, yapı bulur | Müşterileri alışveriş davranışına göre kümeleme |
| Pekiştirmeli öğrenme | Ödül ve ceza sinyalleri | Deneme yanılmayla strateji geliştirir | Oyun oynayan programlar, robot kontrolü |

**Denetimli öğrenme** bugün en yaygın kullanılan türdür. Binlerce e-postayı "spam" ya da "spam değil" olarak etiketleyip sisteme verirsiniz; sistem yeni gelen bir e-postanın hangi gruba girdiğini tahmin etmeyi öğrenir. Cevap bir kategori ise buna sınıflandırma, bir sayı ise (örneğin bir dairenin fiyatı) regresyon denir.

**Denetimsiz öğrenmede** elinizde doğru cevap yoktur. Sistem, verinin içindeki doğal grupları bulmaya çalışır. Burada önemli bir nokta var: bulunan grupların ne anlama geldiğini yorumlamak yine insana düşer.

**Pekiştirmeli öğrenmede** sistem bir ortamda hareket eder, her hareketin sonunda bir ödül ya da ceza alır ve zamanla toplam ödülü artıran bir davranış biçimi geliştirir.

## Eğitim ve tahmin: iki ayrı aşama

Makine öğrenmesini anlamanın en pratik yolu, iki aşamayı birbirinden ayırmaktır:

1. **Eğitim (training):** Model, geçmiş örnekler üzerinde ayarlanır. Bu aşama genellikle uzun sürer, çok veri ve hesaplama gücü ister.
2. **Tahmin ya da çıkarım (inference):** Eğitilmiş model, daha önce görmediği yeni bir girdiye cevap üretir. Telefonunuz bir fotoğraftaki yüzü tanıdığında yaşanan budur.

Bu ayrım önemli, çünkü bir modelin "öğrenmesi" çoğu zaman eğitim aşamasında olup biter. Kullanım sırasında her etkileşimden otomatik olarak bir şey öğrendiğini varsaymak yanlış olabilir; bu, sistemin nasıl tasarlandığına bağlıdır.

Bir de değerlendirme meselesi var. Modeli eğittiğiniz verilerle test etmek, öğrenciye sınavda çalışma sorularının aynısını sormaya benzer. Bu yüzden veri genellikle ayrılır: bir kısmıyla eğitilir, ayrı tutulan kısmıyla sınanır. Model eğitim verisini ezberleyip yeni örneklerde başarısız oluyorsa buna aşırı öğrenme (overfitting) denir. Benim de en çok zaman ayırdığım konulardan biri bu: bir modelin gerçekten genelleyip genellemediğini dürüstçe ölçmek.

<div class="callout"><strong>İpucu:</strong> Bir ürün "yüzde 99 doğrulukla çalışıyor" diyorsa, hemen şunu sorun: <em>Hangi veri üzerinde, kim tarafından ve nasıl ölçüldü?</em> Eğitimde kullanılmamış, gerçek kullanıma benzeyen verilerle yapılmamış bir ölçüm pek bir şey söylemez.</div>

## Hayatımızda nerede karşımıza çıkıyor?

Makine öğrenmesi çoğu zaman görünmez çalışır. Birkaç tanıdık örnek:

- **Öneri sistemleri:** Dizi platformlarının "bunu da beğenebilirsiniz" listeleri, müzik uygulamalarının çalma listeleri.
- **Dolandırıcılık tespiti:** Bankaların kartınızla yapılan alışılmadık bir işlemi işaretlemesi.
- **Dil araçları:** Otomatik çeviri, konuşmayı yazıya dökme, telefon klavyesindeki kelime önerileri.
- **Görüntü işleme:** Fotoğraf uygulamalarında yüzlere göre gruplama, tıbbi görüntülerde şüpheli bölgeleri işaretleyen yardımcı yazılımlar.
- **Sohbet botları:** Büyük dil modelleri de temelde makine öğrenmesiyle, çok büyük metin derlemleri üzerinde eğitilir.

Bu örneklerin ortak noktası şu: hepsinde kural yazmak çok zor ama örnek toplamak mümkün.

## Makine öğrenmesi ne değildir?

Bu kısım bence en az ilk kısım kadar önemli, çünkü yanlış beklentiler hayal kırıklığına ya da daha kötüsü, yanlış kararlara yol açıyor.

- **Yapay zekanın tamamı değildir.** IBM'in özetlediği gibi, her makine öğrenmesi yapay zekadır ama her yapay zeka makine öğrenmesi değildir. Kurallarla çalışan bir termostat da basit bir yapay zeka örneği sayılabilir.
- **Anlamak ya da düşünmek değildir.** Model istatistiksel örüntüler yakalar. Bu örüntüler çok güçlü olabilir, ama insan gibi bir kavrayış anlamına gelmez.
- **Veriden bağımsız değildir.** Model, kendisine gösterilen örnekler kadar iyidir. Eksik, hatalı ya da belirli grupları temsil etmeyen veri, aynı sorunları modele taşır.
- **Bir kez kurulup unutulacak bir şey değildir.** Dünya değişir; müşteri alışkanlıkları, dil, dolandırıcılık yöntemleri değişir. Dün iyi çalışan model yarın bozulabilir, bu yüzden izlenmesi gerekir.
- **Nedensellik bulmaz.** Model "bu ikisi birlikte görülüyor" der; "biri diğerine yol açıyor" demez. Bu ayrımı ayrı bir yazıda ele alacağım.

<div class="callout"><strong>İpucu:</strong> Makine öğrenmesini öğrenmeye başlamak için ileri matematik şart değil. Önce kavramları oturtmak, ardından küçük bir veri setiyle denetimli öğrenmeyi denemek iyi bir başlangıçtır. Google'ın Machine Learning Crash Course gibi giriş materyalleri bu sırayı izler.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Makine öğrenmesi, kuralları elle yazmak yerine örneklerden örüntü çıkaran yöntemlerin genel adıdır.</li><li>Üç temel tür vardır: denetimli (etiketli veri), denetimsiz (etiketsiz veri) ve pekiştirmeli (ödül ve ceza) öğrenme.</li><li>Eğitim ve tahmin ayrı aşamalardır; bir modelin başarısı eğitimde görmediği verilerle ölçülmelidir.</li><li>Model, verisi kadar iyidir ve dünya değiştikçe izlenmesi gerekir.</li><li>Makine öğrenmesi ilişkileri yakalar, ama tek başına neden-sonuç ilişkisi kurmaz.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Makine öğrenmesi ile yapay zeka aynı şey mi?</summary><p>Hayır. Makine öğrenmesi yapay zekanın bir alt alanıdır. Yapay zeka, kurallara dayalı sistemler de dahil olmak üzere daha geniş bir şemsiye terimdir.</p></details><details><summary>Derin öğrenme nerede duruyor?</summary><p>Derin öğrenme, çok katmanlı yapay sinir ağlarını kullanan bir makine öğrenmesi yaklaşımıdır. Görüntü ve dil gibi alanlarda çok başarılıdır ama genellikle çok veri ve hesaplama gücü ister.</p></details><details><summary>Makine öğrenmesi modelleri kullandıkça kendiliğinden öğrenir mi?</summary><p>Her zaman değil. Pek çok model eğitildikten sonra sabit kalır ve ancak yeniden eğitildiğinde güncellenir. Kullanıcı verisinin eğitime nasıl katıldığı, ürünün tasarımına ve gizlilik ayarlarına bağlıdır.</p></details><details><summary>Öğrenmeye nereden başlamalıyım?</summary><p>Temel istatistik ve biraz Python ile başlamak, ardından ücretsiz giriş kurslarından birini takip edip küçük bir proje yapmak iyi bir yol olur.</p></details></div>

---

**Kaynaklar**

- [MIT Sloan – Machine learning, explained](https://mitsloan.mit.edu/ideas-made-to-matter/machine-learning-explained)
- [Google for Developers – What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml)
- [Google for Developers – Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [IBM – What is machine learning?](https://www.ibm.com/think/topics/machine-learning)
