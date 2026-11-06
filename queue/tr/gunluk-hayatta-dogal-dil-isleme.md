---
title: "Günlük Hayatta Doğal Dil İşleme: Fark Etmeden Kullandıklarımız"
description: "Spam filtresinden otomatik tamamlamaya, çeviriden sesli asistanlara her gün kullandığımız dil teknolojileri nasıl çalışıyor? Her biri için sade bir açıklama."
publishDate: "2026-11-24T09:17:00+03:00"
lang: tr
category: "Uygulama"
tags: ["Doğal Dil İşleme", "Yapay Zeka", "Dil Teknolojileri"]
translation: "nlp-in-everyday-life"
heroImage:
  src: "../../../assets/blog/covers/gunluk-hayatta-dogal-dil-isleme.jpg"
  alt: "Telefon ekranında konuşma balonları ve harflerden oluşan bir illüstrasyon"
---

Doğal dil işleme (DDİ) kulağa uzmanlara ait bir laboratuvar terimi gibi geliyor, ama aslında bu yazıyı okumaya başlamadan önce bile muhtemelen birkaç kez kullandınız. Telefonunuz bir sonraki kelimeyi önerdiğinde, e-postanızdaki sahte bir mesaj kendiliğinden "istenmeyen" klasörüne düştüğünde ya da yabancı bir menüyü kameranızla çevirdiğinizde arka planda bir dil modeli çalışıyor. Bu yazıda, her gün fark etmeden kullandığımız yedi dil teknolojisini, her birinin nasıl çalıştığını birer paragrafta özetleyerek anlatmak istiyorum. Amacım teknik ayrıntıya boğmadan, "bu nasıl oluyor?" merakını biraz gidermek.

## Doğal dil işleme nedir, kısaca?

Bilgisayarlar için metin, en başta yalnızca karakter dizisidir. Doğal dil işleme, bu karakter dizilerinden anlam çıkarmayı ve gerektiğinde anlamlı metin üretmeyi amaçlayan alanın adı. Eski sistemler büyük ölçüde elle yazılmış kurallara dayanıyordu. Bugünkü sistemlerin çoğu ise çok büyük metin koleksiyonlarından istatistiksel örüntüler öğreniyor. 2017'de yayımlanan "Attention Is All You Need" makalesiyle tanıtılan transformer mimarisi, bugün kullandığımız büyük dil modellerinin çoğunun temelini oluşturuyor. Ama aşağıda göreceğiniz gibi, gündelik DDİ uygulamalarının hepsi büyük dil modeli değil; bazıları oldukça sade yöntemlerle de iyi çalışıyor.

## Yazarken: spam filtreleri ve otomatik tamamlama

**Spam filtreleri**, DDİ'nin belki de en eski ve en başarılı gündelik uygulaması. Temel fikir bir sınıflandırma problemi: Bir e-postanın "istenmeyen" mi "normal" mi olduğuna karar vermek. Klasik yöntemlerden Naive Bayes, belirli kelimelerin istenmeyen e-postalarda normal e-postalara göre ne sıklıkta geçtiğini sayarak bir olasılık hesaplar. "Bedava", "kazandınız" gibi kelimeler puanı yükseltir. Günümüzün filtreleri metne ek olarak gönderen bilgisi, bağlantılar ve kullanıcıların "spam olarak işaretle" geri bildirimleri gibi pek çok sinyali birlikte kullanıyor.

**Otomatik tamamlama** ise bir dil modelinin en saf hâli: "Bu kelimelerden sonra hangi kelime gelme olasılığı en yüksek?" sorusunu cevaplar. Telefon klavyeniz, sizin ve milyonlarca başka kullanıcının yazım alışkanlıklarından öğrendiği olasılıklara göre üç öneri sunar. Bazı klavyeler sık kullandığınız kelimeleri cihaz üzerinde öğrenerek önerileri kişiselleştirir. Arama kutusuna yazarken çıkan öneriler de benzer bir mantıkla, başka kullanıcıların sık yaptığı aramalardan beslenir.

## Anlamak ve aktarmak: çeviri ve sesli asistanlar

**Makine çevirisi**, son on yılda en büyük sıçramayı yaşayan alanlardan biri. Eski sistemler cümleyi parçalara ayırıp her parçayı ayrı ayrı çevirip birleştiriyordu; sonuç çoğu zaman anlaşılır ama yapay görünüyordu. Google, Eylül 2016'da sinir ağı tabanlı çeviri sistemini (GNMT) duyurdu ve bu sistem ilk olarak Çince-İngilizce çeviride üretime alındı. Sinir ağı tabanlı çeviri, cümlenin tamamını bir bütün olarak "okuyup" anlamını sayısal bir temsile dönüştürür, sonra hedef dilde bu temsilden yeni bir cümle üretir. Bu yüzden daha akıcıdır, ama kaynak cümlede olmayan bir şeyi de akıcı biçimde "uydurabilir".

**Sesli asistanlar** aslında birkaç teknolojinin zinciridir. Önce otomatik konuşma tanıma, ses dalgasını metne çevirir. Ardından bir dil anlama bileşeni, bu metnin ne istediğini çıkarır: "Yarın sabah yedide beni uyandır" cümlesinden "alarm kur, saat 07:00, yarın" bilgisini. Sonra ilgili işlem yapılır ve cevap, metinden konuşma üretme (sentez) ile size seslendirilir. Zincirdeki her halkanın hatası bir sonrakine taşındığı için, gürültülü bir ortamda yanlış duyulan tek bir kelime tüm komutu bozabilir.

## Ararken: arama motorları

Arama motorları eskiden büyük ölçüde anahtar kelime eşleştirmesine dayanıyordu: Sorgudaki kelimelerin geçtiği sayfaları bulup sıralamak. Sorun şu ki insanlar düşündüklerini her zaman sayfadaki kelimelerle ifade etmiyor. Google, Ekim 2019'da BERT adlı dil modelini arama sonuçlarının sıralamasında kullanmaya başladığını duyurdu ve bunun ABD'deki İngilizce aramaların yaklaşık onda birini anlamaya yardım ettiğini belirtti. Şirketin verdiği örnek öğreticiydi: "2019 brazil traveler to usa need a visa" sorgusunda "to" kelimesi kritik. Önceki sistem ABD'den Brezilya'ya gidenlerle ilgili sonuçlar getirirken, yeni model sorunun Brezilya'dan ABD'ye giden bir yolcuyla ilgili olduğunu kavrıyordu. Türkçe gibi eklerle anlamın değiştiği dillerde bu tür bağlam anlayışı daha da önemli.

<div class="callout"><strong>İpucu:</strong> Arama motoruna anahtar kelime yığını yerine doğal bir soru yazmayı deneyin. Modern arama sistemleri bağlamı anlamaya çalıştığı için, "İstanbul'dan Ankara'ya trenle kaç saat" gibi tam bir ifade çoğu zaman daha isabetli sonuç verir.</div>

## Fikirleri ölçmek: yorumlardaki duygu analizi

Bir e-ticaret sitesinde binlerce ürün yorumu olduğunu düşünün. Şirketler bunları tek tek okumak yerine duygu analizi kullanır: Her yorumun olumlu, olumsuz ya da nötr olduğunu ve hatta hangi konuda (kargo, kalite, fiyat) olumlu ya da olumsuz olduğunu otomatik olarak çıkarmaya çalışan bir yöntem. En basit hâli, olumlu ve olumsuz kelimelerden oluşan sözlüklerle puan hesaplamak; daha gelişmiş hâli, etiketlenmiş örneklerden öğrenen modeller. Bu yöntemler toplam eğilimi görmek için kullanışlıdır, ama ironi ("Harika, üçüncü kez bozuldu!") ve olumsuzlama ("hiç fena değil") hâlâ zorlayıcıdır. Bu yüzden tek bir yorumun etiketi yerine, çok sayıda yorumdaki genel eğilime bakmak daha güvenilirdir.

## Konuşurken: sohbet botları

Bankaların, kargo firmalarının ya da belediyelerin sitelerindeki sohbet botları iki farklı kuşaktan gelebilir. Eski tip botlar, önceden tanımlanmış soruları ve cevapları eşleştirir; sizin mesajınızın hangi "niyete" ait olduğunu tahmin edip hazır bir cevap verir. Büyük dil modeliyle çalışan yeni nesil botlar ise cevabı o anda üretir; daha esnek ve doğal konuşurlar. Ancak bu esneklik bir bedelle gelir: Model, emin olmadığı bir konuda bile akıcı ve kendinden emin bir cevap üretebilir. İyi tasarlanmış sistemler bu yüzden modeli kurumun kendi belgelerine dayandırır ve emin olmadığında insana yönlendirir.

## Sınırlar ve bilinçli kullanım

Bu teknolojilerin hepsi istatistiksel tahmine dayanır; yani "anlamak" dediğimiz şey, gerçekte çok iyi bir örüntü eşleştirmesidir. Bunun birkaç pratik sonucu var. Birincisi, veride az temsil edilen diller, lehçeler ve konuşma biçimleri için performans genellikle daha düşüktür. Türkçenin eklemeli yapısı, tek bir kelimenin çok sayıda biçimde görünmesine yol açtığı için bazı sistemlerde ek zorluk yaratır. İkincisi, akıcılık doğruluğun garantisi değildir: Çok düzgün bir çeviri ya da cevap da yanlış olabilir. Üçüncüsü, sesli asistanlara söylediklerimiz ve sohbet botlarına yazdıklarımız veri olarak işlenir; hassas bilgileri paylaşmadan önce gizlilik ayarlarını kontrol etmek iyi bir alışkanlıktır.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Spam filtresi, otomatik tamamlama, çeviri, sesli asistan, arama, duygu analizi ve sohbet botları günlük hayattaki başlıca DDİ uygulamaları.</li><li>Bu sistemlerin hepsi büyük dil modeli değil; bazıları kelime sayımına dayanan sade yöntemlerle iyi çalışıyor.</li><li>Sinir ağı tabanlı çeviri ve arama, cümleyi bir bütün olarak ele aldığı için bağlamı daha iyi yakalıyor.</li><li>Akıcılık doğruluğun garantisi değil; özellikle önemli konularda çeviri ve cevapları kontrol etmek gerekiyor.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Telefonum konuşmalarımı sürekli dinliyor mu?</summary><p>Sesli asistanlar genellikle bir uyandırma ifadesini cihaz üzerinde bekleyecek şekilde tasarlanır ve ancak bu ifadeyi algıladıktan sonra kaydı işlemeye başlar. Yine de ayarlarınızdan ses kayıtlarının saklanıp saklanmadığını kontrol etmek ve gerekirse silmek iyi bir fikirdir.</p></details><details><summary>Makine çevirisine resmi belgelerde güvenebilir miyim?</summary><p>Genel anlamı kavramak için çok faydalıdır, ama hukuki, tıbbi veya resmi belgelerde tek başına güvenilmemelidir. Bu tür metinlerde bir uzman çevirmenin kontrolü gerekir.</p></details><details><summary>Duygu analizi Türkçede iyi çalışıyor mu?</summary><p>Türkçe için de çalışan sistemler var, ancak eklemeli yapı, ironi ve olumsuzlama gibi özellikler işi zorlaştırır. Sonuçları tek tek yorumlara değil, genel eğilimlere bakarak değerlendirmek daha sağlıklıdır.</p></details><details><summary>Sohbet botuyla mı yoksa insanla mı konuştuğumu nasıl anlarım?</summary><p>Birçok kurum bunu açıkça belirtir; belirtmiyorsa sormak en kolay yoldur. Şeffaflık, yapay zeka etiğinin temel ilkelerinden biri olduğu için kurumların bu soruya dürüst cevap vermesi beklenir.</p></details></div>

---

**Kaynaklar**

- [Jurafsky & Martin – Speech and Language Processing (3. baskı taslağı)](https://web.stanford.edu/~jurafsky/slp3/)
- [Google Research – A Neural Network for Machine Translation, at Production Scale (2016)](https://research.google/blog/a-neural-network-for-machine-translation-at-production-scale/)
- [Google – Understanding searches better than ever before (BERT, 2019)](https://blog.google/products/search/search-language-understanding-bert/)
- [Vaswani vd. – Attention Is All You Need (2017)](https://arxiv.org/abs/1706.03762)
