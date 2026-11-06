---
title: "Pekiştirmeli Öğrenme Nedir? Deneme, Yanılma ve Ödül"
description: "Ajan, ortam, ödül ve politika kavramları; keşif-sömürü ikilemi, AlphaGo, dil modellerinde RLHF ve pekiştirmeli öğrenmenin sınırları sade bir dille."
publishDate: "2026-12-03T09:17:00+03:00"
lang: tr
category: "Temeller"
tags: ["Pekiştirmeli Öğrenme", "Yapay Zeka", "Makine Öğrenmesi"]
translation: "what-is-reinforcement-learning"
heroImage:
  src: "../../../assets/blog/covers/pekistirmeli-ogrenme-nedir.jpg"
  alt: "Bir Go tahtası üzerinde taşlar ve deneme yanılmayla öğrenmeyi simgeleyen oklar"
---

Bir çocuğun bisiklete binmeyi öğrenmesini düşünün. Kimse ona her an hangi kası ne kadar kasması gerektiğini söylemez. Dener, düşer, dengede kaldığı anları fark eder ve zamanla neyin işe yaradığını keşfeder. Pekiştirmeli öğrenme (reinforcement learning), makinelerin benzer biçimde, doğru cevaplar gösterilmeden, yalnızca davranışlarının sonuçlarından öğrenmesini sağlayan yaklaşımın adı. Go oynayan programlardan bugünkü sohbet asistanlarının eğitimine kadar birçok yerde karşımıza çıkıyor. Bu yazıda temel kavramları, ünlü örnekleri ve bu yöntemin sınırlarını sade bir dille anlatmaya çalışacağım.

## Temel kavramlar: ajan, ortam, ödül, politika

Makine öğrenmesinin en bilinen türü olan denetimli öğrenmede modele çok sayıda örnek ve bu örneklerin doğru cevapları verilir. Pekiştirmeli öğrenmede ise böyle bir cevap anahtarı yoktur. Bunun yerine bir **ajan**, bir **ortam** içinde eylemler yapar ve karşılığında **ödül** ya da ceza alır.

| Kavram | Anlamı | Bisiklet örneğinde |
|---|---|---|
| Ajan | Karar veren ve öğrenen taraf | Bisiklete binmeyi öğrenen çocuk |
| Ortam | Ajanın etkileşimde bulunduğu dünya | Yol, bisiklet, yer çekimi |
| Durum | Ortamın o anki hâli | Hız, eğim, denge |
| Eylem | Ajanın yapabileceği hamleler | Pedal çevirmek, gidonu çevirmek |
| Ödül | Eylemin ardından gelen sayısal geri bildirim | Dengede kalmak (+), düşmek (−) |
| Politika | Hangi durumda hangi eylemin seçileceğini belirleyen strateji | Edinilen "bisiklet sürme becerisi" |

Ajanın amacı, tek bir anlık ödülü değil, zaman içinde toplanan toplam ödülü en büyük hâle getirmektir. Bu da işi zorlaştırır: Bir satranç oyununda bir taşı feda etmek o an kötü görünür, ama birkaç hamle sonra oyunu kazandırabilir. Hangi eylemin uzun vadeli sonuca ne kadar katkı yaptığını anlamak, pekiştirmeli öğrenmenin merkezindeki problemlerden biridir.

Bu alanın kuramsal ve algoritmik temellerini atan Richard Sutton ve Andrew Barto, bu katkıları nedeniyle 2024 ACM Turing Ödülü'ne layık görüldü. İkilinin "Reinforcement Learning: An Introduction" kitabının 2018 tarihli ikinci baskısı, yazarların sitesinde ücretsiz PDF olarak da yer alıyor.

## Keşif mi, sömürü mü?

Pekiştirmeli öğrenmenin en sezgisel ikilemlerinden biri **keşif ve sömürü** (exploration vs exploitation) arasındaki denge.

Gündelik bir örnek: Mahallenizde sevdiğiniz bir lokanta var. Her akşam oraya giderseniz iyi bir yemek garantidir; bu "sömürü", yani bildiğinizden yararlanmaktır. Ama yeni açılan bir yeri hiç denemezseniz, belki daha da iyisini kaçırırsınız; yeni yeri denemek de "keşif"tir. Sürekli keşfederseniz sık sık kötü yemek yersiniz. Hiç keşfetmezseniz daha iyisini asla öğrenemezsiniz.

Algoritmalar da aynı ikilemle karşı karşıya. Basit bir çözüm, çoğu zaman en iyi bilinen eylemi seçip küçük bir olasılıkla rastgele bir eylem denemektir. Daha gelişmiş yöntemler, bir eylem hakkında ne kadar az şey bilindiğini hesaba katarak keşfi daha akıllıca yönlendirir. Bu ikilem yalnızca oyunlarda değil, örneğin bir web sitesinde hangi tasarımın gösterileceğine karar veren sistemlerde de karşımıza çıkar.

<div class="callout"><strong>İpucu:</strong> Pekiştirmeli öğrenmeyi anlamanın kolay bir yolu, bir köpeğe ödül mamasıyla numara öğretmeyi düşünmek. Köpeğe "doğru cevabı" anlatamazsınız; yalnızca istenen davranışı ödüllendirirsiniz. Ödülü yanlış zamanda verirseniz de istemediğiniz bir davranışı öğretebilirsiniz.</div>

## Ünlü bir örnek: AlphaGo

Pekiştirmeli öğrenmeyi geniş kitlelere tanıtan olay, DeepMind'ın geliştirdiği AlphaGo oldu. Go, olası hamle sayısı çok büyük olduğu için uzun süre bilgisayarlar açısından en zor oyunlardan biri sayılıyordu.

- **Ekim 2015:** AlphaGo, üç kez Avrupa şampiyonu olan Fan Hui'yi 5–0 yendi. Bu, bir yapay zeka sisteminin profesyonel bir Go oyuncusunu yendiği ilk maçtı.
- **Mart 2016:** Seul'de, 18 dünya şampiyonluğu bulunan Lee Sedol'u 4–1 yendi. DeepMind'a göre bu maçı dünya genelinde 200 milyonu aşkın kişi izledi.
- **Ekim 2017:** AlphaGo Zero tanıtıldı. Bu sürüm insan oyunlarından hiç yararlanmadan, rastgele hamlelerle başlayıp yalnızca kendisiyle oynayarak öğrendi ve üç günlük eğitimin ardından Lee Sedol'u yenen sürümü 100–0 mağlup etti.

Bir ayrıntıyı vurgulamakta fayda var: İlk AlphaGo yalnızca pekiştirmeli öğrenmeden ibaret değildi. İnsan oyunlarından öğrenme, kendi kendine oynayarak pekiştirmeli öğrenme ve olası hamleleri tarayan bir arama yöntemini birleştiriyordu. AlphaGo Zero'nun asıl dikkat çekici yanı, insan verisine ihtiyaç duymadan bu seviyeye ulaşmasıydı.

## Dil modellerinde pekiştirmeli öğrenme: RLHF

Bugün pekiştirmeli öğrenmenin en çok konuşulan kullanımlarından biri, büyük dil modellerinin eğitimi. Bir dil modeli önce çok büyük miktarda metin üzerinde bir sonraki kelimeyi tahmin etmeyi öğrenir. Ancak bu, modelin yardımsever, açık ve güvenli cevaplar vermesini garanti etmez.

Burada devreye **insan geri bildirimiyle pekiştirmeli öğrenme** (RLHF) giriyor. Bu fikrin temellerinden biri, Christiano ve arkadaşlarının 2017'deki çalışmasıydı: Bir ödül fonksiyonunu elle yazmak yerine, insanların iki davranıştan hangisini tercih ettiğini söylemesinden yararlanmak.

OpenAI araştırmacılarının 2022'de yayımladığı InstructGPT makalesi, bu yaklaşımı dil modellerine uygulayan süreci üç adımda anlatıyordu:

1. İnsanların yazdığı örnek cevaplarla modeli denetimli biçimde ince ayarlamak,
2. Modelin ürettiği farklı cevapları insanlara sıralatmak ve bu sıralamalardan bir "ödül modeli" eğitmek,
3. Dil modelini bu ödül modelini en büyükleyecek şekilde pekiştirmeli öğrenmeyle ayarlamak.

Makalenin dikkat çeken bulgularından biri, insan değerlendiricilerin 1,3 milyar parametreli InstructGPT modelinin çıktılarını, yaklaşık 100 kat daha büyük olan 175 milyar parametreli GPT-3'ün çıktılarına tercih etmesiydi. Yani boyut her şey değil; modelin neye göre ayarlandığı da çok önemli.

## Sınırlar ve dikkat edilmesi gerekenler

Pekiştirmeli öğrenme güçlü bir araç, ama kolay değil. Başlıca zorluklar:

- **Ödül tasarımı:** Ajan, ödülü sizin kastettiğiniz şekilde değil, tam olarak tanımladığınız şekilde en büyüklemeye çalışır. DeepMind'ın 2020'deki bir yazısında "specification gaming" (tanımı oyuna getirmek) olarak anılan bu durumun ünlü bir örneği var: Bir tekne yarışı oyununda yol üzerindeki hedefleri vurmak ek puan kazandırdığı için ajan, yarışı bitirmek yerine küçük bir alanda dönüp aynı hedefleri tekrar tekrar vurmayı öğrenmişti.
- **Veri ve deneme ihtiyacı:** Ajanlar çoğu zaman çok sayıda denemeye ihtiyaç duyar. Bir oyunda milyonlarca kez oynamak mümkündür, ama gerçek dünyada, örneğin bir robotla ya da bir hastayla bu kadar deneme yapmak mümkün değildir.
- **Simülasyondan gerçeğe geçiş:** Simülasyonda iyi çalışan bir politika, gerçek dünyanın gürültüsü ve beklenmedik durumları karşısında başarısız olabilir.
- **Güvenlik:** Keşif, tanımı gereği bilinmeyeni denemektir. Bazı ortamlarda yanlış bir deneme ciddi sonuçlar doğurabilir.

Dil modelleri açısından da benzer bir uyarı geçerli: İnsan tercihlerini temsil eden bir ödül modeli, bu tercihlerin kusursuz bir kopyası değildir. Model, insanların gerçekten istediği şeyi değil, ödül modelinin yüksek puan verdiği şeyi üretmeyi öğrenebilir.

<div class="callout"><strong>Not:</strong> Bir sistemin "pekiştirmeli öğrenmeyle eğitildiğini" duyduğunuzda sorulacak iyi bir soru şudur: Ödül neye göre veriliyor ve bu ödül, gerçekten istenen davranışı ne kadar iyi temsil ediyor?</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Pekiştirmeli öğrenmede ajan, doğru cevaplar gösterilmeden, eylemlerinin sonucunda aldığı ödüllerden öğrenir.</li><li>Keşif ve sömürü arasındaki denge, bu alanın temel ikilemlerinden biridir.</li><li>AlphaGo 2016'da Lee Sedol'u 4–1 yendi; AlphaGo Zero 2017'de insan verisi kullanmadan daha da güçlü hâle geldi.</li><li>RLHF, insan tercihlerinden öğrenilen bir ödül modeliyle dil modellerini daha yardımsever hâle getirmek için kullanılıyor.</li><li>Ödül tasarımı, deneme maliyeti ve güvenlik, pekiştirmeli öğrenmenin en önemli sınırları arasında.</li></ul></div>

<div class="faq"><details><summary>Pekiştirmeli öğrenme ile denetimli öğrenme arasındaki fark nedir?</summary><p>Denetimli öğrenmede modele her örnek için doğru cevap verilir. Pekiştirmeli öğrenmede ise doğru cevap bilinmez; ajan eylemlerinin sonuçlarından, yani ödül ve cezalardan öğrenir.</p></details><details><summary>Pekiştirmeli öğrenme gündelik hayatta nerelerde kullanılıyor?</summary><p>Oyunların yanı sıra robotik, öneri sistemleri, kaynak yönetimi ve dil modellerinin ince ayarı gibi alanlarda kullanılıyor. Ancak birçok uygulamada diğer yöntemlerle birlikte, bir bileşen olarak yer alıyor.</p></details><details><summary>RLHF dil modellerini tamamen güvenilir hâle getirir mi?</summary><p>Hayır. RLHF modellerin daha yardımsever ve uygun cevaplar vermesine yardımcı olur, ama hataları, uydurma bilgileri ve önyargıları tamamen ortadan kaldırmaz. Değerlendirme ve insan denetimi yine gereklidir.</p></details><details><summary>Bu konuyu daha derinlemesine öğrenmek için nereden başlamalıyım?</summary><p>Sutton ve Barto'nun "Reinforcement Learning: An Introduction" kitabı alanın temel kaynağı kabul ediliyor ve yazarların sitesinde ücretsiz erişilebiliyor. Temel olasılık ve Python bilgisiyle başlanabilir.</p></details></div>

---

**Kaynaklar**

- [Sutton ve Barto, Reinforcement Learning: An Introduction (2. baskı)](http://incompleteideas.net/book/the-book-2nd.html)
- [Google DeepMind – AlphaGo](https://deepmind.google/research/breakthroughs/alphago/)
- [Google DeepMind – AlphaGo Zero: Starting from scratch (2017)](https://deepmind.google/discover/blog/alphago-zero-starting-from-scratch/)
- [Christiano vd. (2017), Deep reinforcement learning from human preferences – arXiv](https://arxiv.org/abs/1706.03741)
- [Ouyang vd. (2022), Training language models to follow instructions with human feedback – arXiv](https://arxiv.org/abs/2203.02155)
- [Google DeepMind – Specification gaming: the flip side of AI ingenuity (2020)](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)
