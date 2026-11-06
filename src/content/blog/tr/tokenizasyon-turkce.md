---
title: "Tokenizasyon ve Türkçe'nin Zorlukları: Eklemeli Dil, Kelime Patlaması ve Verimli Tokenizasyon"
description: "Türkçe neden daha fazla token tüketir? Eklemeli dil, kelime patlaması, BPE ve SentencePiece ile verimli tokenizasyonun maliyet ve hıza etkisi."
publishDate: "2026-08-09T23:38:00+03:00"
lang: tr
category: "Türkçe NLP"
tags: ["Türkçe NLP", "Yapay Zeka"]
translation: "tokenization-turkish-challenges"
heroImage:
  src: "../../../assets/blog/bimg-12.jpg"
  alt: "Tokenizasyon ve Türkçe'nin Zorlukları: Eklemeli Dil, Kelime Patlaması ve Verimli Tokenizasyon"
---

Bir yapay zeka modeli metni doğrudan "okumaz"; önce onu küçük parçalara, yani _token_lara böler. Bu görünüşte basit adım, Türkçe gibi eklemeli diller için sessiz ama büyük bir maliyet kaynağıdır. Aynı cümle Türkçe yazıldığında, İngilizcesine kıyasla çok daha fazla token tüketebilir; bu da daha yavaş, daha pahalı ve bazen daha az isabetli sonuçlar demektir. Bu yazıda tokenizasyonun ne olduğunu, Türkçenin neden zorlu bir vaka olduğunu ve BPE ile SentencePiece gibi yöntemlerin işi nasıl çözmeye çalıştığını sezgisel biçimde anlatıyoruz.

## Tokenizasyon nedir?

Tokenizasyon, bir metni modelin işleyebileceği sayısal birimlere dönüştürmenin ilk adımıdır. Modeller harf veya kelimeyle değil, bir sözlükteki kimliklerle (ID) çalışır. Her token bir tam sayıya karşılık gelir; model de aslında bu sayıların dizilerini öğrenir ve tahmin eder.

Token; bir kelime, bir kelime parçası, bir noktalama işareti, hatta bir boşluk olabilir. Günlük bir analoji kuralım: Lego ile düşünün. Sık kullanılan büyük bloklar (örneğin "the" gibi yaygın kelimeler) tek parçadır. Nadir veya uzun kelimeler ise birkaç küçük bloğa bölünür. Amaç, en sık görülen kalıpları tek parçayla temsil edip metni olabildiğince az parçayla ifade etmektir.

> Token sayısı önemlidir çünkü modelin bağlam penceresi, hızı ve ücretlendirmesi genellikle doğrudan token sayısına bağlıdır.

## Eklemeli dil ve kelime patlaması

Türkçe **eklemeli** (sondan eklemeli) bir dildir. Kelimenin köküne sırayla ekler getirilerek anlam genişletilir. İngilizcede ayrı kelimeler ya da yardımcı sözcüklerle ifade edilen pek çok şey, Türkçede tek bir kelimenin içine yerleşir.

Klasik örnek üzerinden gidelim:

-   `ev` → house
-   `evler` → houses
-   `evlerimiz` → our houses
-   `evlerimizden` → from our houses
-   `evlerimizdekiler` → the ones at our houses

Tek bir `ev` kökünden, ekleri farklı kombinasyonlarla dizerek yüzlerce, hatta teoride binlerce ayrı yüzeysel biçim üretebilirsiniz. Buna **kelime patlaması** (vocabulary explosion) denir. Eğer her biçimi sözlüğe ayrı bir giriş olarak koymaya çalışırsanız, sözlük yönetilemez biçimde büyür ve çoğu biçim eğitim verisinde ya hiç ya da çok az geçtiği için model onları iyi öğrenemez.

Sorun yalnızca çekim ekleriyle de sınırlı değil. Türkçede ünlü uyumu nedeniyle aynı ekin birden çok ses biçimi vardır: çokluk eki bağlama göre `-ler` ya da `-lar` olur. Bu da yüzey biçimlerinin çeşitliliğini artırır.

<div class="callout"><strong>İpucu:</strong> Bir metnin Türkçe ve İngilizce sürümlerini aynı tokenleştiriciye verip token sayılarını karşılaştırın. Aradaki fark, doğrudan maliyet ve hız farkınızdır.</div>

## BPE ve SentencePiece nasıl çalışır?

Kelime patlamasını çözmek için modern modeller **alt kelime** (subword) tokenizasyonu kullanır. Fikir basit: ne tamamen harf bazında (çok uzun diziler) ne de tamamen kelime bazında (devasa sözlük) çalış; ikisinin arasında, sık görülen parçaları birleştirerek dengeli bir sözlük kur.

### BPE (Byte Pair Encoding)

BPE aslında bir veri sıkıştırma fikrinden uyarlanmıştır. Sezgisi şudur: en sık yan yana gelen iki birimi al, onları tek bir yeni birim hâline getir, bunu hedef sözlük boyutuna ulaşana kadar tekrarla. Böylece sık kalıplar tek tokenda toplanırken nadir kelimeler küçük parçalara ayrılabilir.

```text
baslangic: ["e","v","l","e","r"]
sayim: en sik ikili -> "e"+"r" = "er"
birlestir -> ["e","v","l","er"]
sayim: en sik ikili -> "l"+"er" = "ler"
birlestir -> ["e","v","ler"]
...
ogrenilen birlestirme kurallari:
  e r  -> er
  l er -> ler
sonuc sozlugu: ev, ler, im, iz, den, ...
```

Yukarıdaki şemada görüldüğü gibi, `ler` gibi sık görülen bir ek tek bir tokena dönüşür. Bu, Türkçe için özellikle değerlidir: çekim ekleri yeniden ve yeniden geçtiği için onları ayrı tokenlar olarak öğrenmek mantıklıdır.

### SentencePiece

SentencePiece bir algoritmadan çok bir çerçevedir; içinde BPE veya unigram dil modeli tabanlı eğitimi barındırabilir. En önemli iki özelliği şunlardır: birincisi, dile özgü ön işleme (örneğin boşlukla kelime ayırma) varsayımı yapmaz; ham metni karakter dizisi olarak alır. İkincisi, boşluğu görünür bir simgeyle (genellikle `▁`, alt çizgiye benzer bir işaret) kodlar. Böylece tokenlardan orijinal metni kayıpsız geri üretmek mümkün olur.

Bu "boşluğa bağımsızlık", Türkçe gibi morfolojisi zengin diller için pratik bir avantajdır: tokenleştirme, kelimenin nasıl yazıldığına dair sabit kurallara değil, veriden öğrenilen istatistiklere dayanır.

> Özetle: BPE "en sık ikiliyi birleştir" der; SentencePiece bunu dilden bağımsız, kayıpsız bir boru hattı içine yerleştirir.

## Türkçe için verimli tokenizasyon neden önemli?

Çoğu büyük modelin tokenleştiricisi ağırlıklı olarak İngilizce metinle eğitildiği için sözlüğü İngilizce kalıplara daha cömert davranır. Sonuç: Türkçe bir cümle, anlamca eşdeğer İngilizce cümleye kıyasla genellikle daha fazla tokena bölünür. Bunun üç somut etkisi vardır:

1.  **Maliyet:** API kullanımı token başına ücretlendirilir. Daha fazla token, aynı işi yapmak için daha fazla ödeme demektir.
2.  **Hız ve gecikme:** Model token token üretir; daha uzun token dizisi daha uzun yanıt süresi anlamına gelir.
3.  **Etkin bağlam:** Bağlam penceresi token cinsinden sabittir. Türkçe metin daha çok token yediği için aynı pencereye daha az "gerçek içerik" sığar.

Buna ek olarak, bir kelime çok sayıda küçük ve anlamsız parçaya bölünürse, modelin o kelimenin anlamını yakalaması zorlaşabilir. İyi tasarlanmış bir tokenleştirici, `ler`, `imiz`, `den` gibi anlamlı ekleri tutarlı birimler olarak temsil ederek modele daha temiz bir sinyal verir.

<div class="callout"><strong>İpucu:</strong> Türkçe ağırlıklı bir ürün geliştiriyorsanız, model seçerken yalnızca kalite kıyaslamalarına değil, aynı örnek metindeki <em>token verimliliğine</em> de bakın. İki model benzer kalitede olsa bile, biri Türkçeyi daha az tokenla işliyorsa uzun vadede ciddi tasarruf sağlar.</div>

## Pratikte ne yapabiliriz?

Tokenleştiriciyi kendiniz baştan yazmanız genellikle gerekmez, ama bilinçli kararlar verebilirsiniz:

-   **Ölçün:** Tipik girdilerinizi gerçek tokenleştiriciyle ölçüp Türkçe/İngilizce oranını çıkarın. Tahmin yerine veriyle karar verin.
-   **İstemleri sadeleştirin:** Gereksiz tekrar, uzun kalıp metinler ve aşırı biçimlendirme token yer. Aynı talimatı daha derli toplu yazmak doğrudan tasarruftur.
-   **Model/tokenleştirici seçimi:** Türkçeyi daha verimli işleyen, çok dilli sözlüğü güçlü modelleri tercih edin.
-   **Alan-içi sözlük:** Kendi modelinizi eğitiyorsanız, alanınıza ait sık terimleri içeren bir tokenleştirici eğitmek token sayısını belirgin biçimde düşürebilir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Tokenizasyon, metni modelin işleyebileceği sayısal birimlere bölmenin ilk adımıdır.</li><li>Türkçe eklemeli bir dildir; tek kökten çok sayıda yüzey biçimi üretilir ve bu "kelime patlamasına" yol açar.</li><li>BPE en sık görülen ikilileri birleştirerek alt kelime sözlüğü kurar; SentencePiece bunu dilden bağımsız, kayıpsız bir çerçeveye taşır.</li><li>Türkçe genellikle İngilizceden daha fazla token tüketir; bu da maliyet, hız ve etkin bağlamı etkiler.</li><li>Ölçmek, istemleri sadeleştirmek ve token-verimli model seçmek pratikte fark yaratır.</li></ul></div>

<div class="faq"><details><summary>Token sayısı yaklaşık kaç kelimeye denk gelir?</summary><p>Kesin bir oran yoktur; dile ve tokenleştiriciye göre değişir. İngilizcede kabaca bir token genellikle bir kelimenin biraz altına denk gelir. Türkçede ise eklemeli yapı nedeniyle bir kelime çoğu zaman birden fazla tokena bölünür, dolayısıyla kelime başına token sayısı daha yüksektir.</p></details><details><summary>BPE ile SentencePiece arasındaki temel fark nedir?</summary><p>BPE bir birleştirme algoritmasıdır: en sık görülen birim ikilisini tekrar tekrar birleştirir. SentencePiece ise bir çerçevedir; içinde BPE veya unigram yöntemini kullanabilir, dile özgü ön işleme varsaymaz ve boşluğu görünür bir simgeyle kodlayarak kayıpsız geri dönüşüm sağlar.</p></details><details><summary>Türkçe için ayrı bir tokenleştirici eğitmek şart mı?</summary><p>Şart değil. Çok dilli, güçlü tokenleştiricilere sahip modeller çoğu uygulama için yeterlidir. Ancak çok büyük hacimli, alana özgü Türkçe metinle çalışıyorsanız, alan-içi bir tokenleştirici eğitmek token verimliliğini ve dolayısıyla maliyet/hızı belirgin biçimde iyileştirebilir.</p></details></div>

---

Tokenizasyon, modelin "okuma gözlüğü" gibidir: doğru ayarlandığında metni daha az çabayla, daha net görür. Türkçe gibi morfolojisi zengin diller için bu ayarın önemi katlanarak artar. Yapay zekayı Türkçe içeriğe verimli biçimde uygulamak istiyorsanız, ölçmeye ve token-verimli seçimlere bugünden başlamak en sağlam adımdır. Bu tür mühendislik kararlarında nasıl destek olduğumuzu merak ediyorsanız [HatsonTech](/posts/hatsontech-nedir/) sayfasına göz atabilirsiniz.
