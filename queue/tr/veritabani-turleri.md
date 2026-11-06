---
title: "Veritabanı Türleri: İlişkiselden Vektöre Hangisi Ne Zaman?"
description: "İlişkisel, belge, anahtar-değer, sütun tabanlı, graf, zaman serisi ve vektör veritabanları: ne işe yaradıkları, karşılaştırma tablosu ve seçim ölçütleri."
publishDate: "2026-11-19T09:17:00+03:00"
lang: tr
category: "Veri"
tags: ["Veritabanı", "Veri Mimarisi", "SQL"]
translation: "types-of-databases"
heroImage:
  src: "../../../assets/blog/covers/veritabani-turleri.jpg"
  alt: "Tablo, belge, graf ve vektör biçimindeki farklı veri modellerinin şematik gösterimi"
---

Yeni bir proje başladığında sorulan ilk teknik sorulardan biri genellikle şu oluyor: "Hangi veritabanını kullanalım?" Bu soru eskiden çoğu zaman tek bir cevaba indirgenirdi: Bir ilişkisel veritabanı. Bugün ise belge, anahtar-değer, graf, zaman serisi ve son yıllarda yapay zekâ uygulamalarıyla öne çıkan vektör veritabanları gibi çok sayıda seçenek var. Her birinin güçlü olduğu bir kullanım alanı ve yanlış yerde kullanıldığında ortaya çıkan bir bedeli bulunuyor. Bu yazıda bu türleri teknik olmayan bir dille tanıtmak, bir karşılaştırma tablosunda toplamak ve seçim yaparken sorulabilecek soruları paylaşmak istiyorum.

## Neden tek bir veritabanı türü yok?

Veritabanları, verinin nasıl saklandığı ve nasıl sorgulandığı konusunda farklı varsayımlarla tasarlanır. Bir banka hesabındaki para transferi, her adımın eksiksiz ve tutarlı olmasını gerektirir. Bir web sitesindeki oturum bilgisi ise milisaniyeler içinde okunmalıdır ama kaybolması felaket değildir. Bir sosyal ağda "arkadaşımın arkadaşları" sorusu, tablolar yerine ilişkiler üzerinden düşünmeyi gerektirir. Milyonlarca satır üzerinde aylık satış raporu almak ise bambaşka bir okuma biçimi ister.

Kısacası veritabanı seçimi, "hangisi en iyi?" değil, "verim nasıl görünüyor ve ona en sık hangi soruları soracağım?" sorusudur.

## İlişkisel veritabanları: varsayılan başlangıç noktası

İlişkisel veritabanları veriyi tablolarda saklar. PostgreSQL belgelerindeki tanımla, her tablo adlandırılmış satırlardan oluşur ve her satır aynı sütunlara sahiptir; her sütunun belirli bir veri tipi vardır. Tablolar arasındaki ilişkiler anahtarlar üzerinden kurulur ve veri SQL ile sorgulanır. PostgreSQL, MySQL, SQL Server ve Oracle bu ailenin bilinen örnekleri.

İlişkisel veritabanlarının en önemli güçlü yanı, işlemlerin (transaction) güvenilirliğidir: Bir işlem ya bütünüyle gerçekleşir ya da hiç gerçekleşmez. Ayrıca şema sayesinde veri kalitesi baştan korunur; örneğin bir sütunun boş bırakılamayacağını ya da her siparişin var olan bir müşteriye ait olması gerektiğini veritabanının kendisi denetler.

Bu ailenin hafif bir üyesi de SQLite. SQLite bir sunucu olarak değil, uygulamanın içine gömülü tek bir dosya olarak çalışır. Kendi belgelerinde de belirtildiği gibi, verinin uygulamayla aynı cihazda durduğu ve aynı anda çok sayıda yazma işleminin olmadığı durumlar için çok uygundur.

## Belge ve anahtar-değer veritabanları

"NoSQL" başlığı altında toplanan sistemlerin en yaygın iki türü bunlar.

**Belge veritabanları** veriyi JSON'a benzeyen belgeler olarak saklar. MongoDB'nin belgelerinde tanımlandığı gibi, bir belge alan-değer çiftlerinden oluşur ve alanların değerleri başka belgeler, diziler ya da belge dizileri olabilir. Bir müşterinin adresi ve ilgi alanları aynı kayıt içinde iç içe durabilir. Bu esneklik, yapısı sık değişen ya da kayıttan kayda farklılaşan veriler için kullanışlıdır. Bedeli ise şemanın kontrolünün uygulamaya kayması ve birçok tabloyu birleştiren karmaşık sorguların daha zor hâle gelmesidir.

**Anahtar-değer depoları** en basit modeldir: Her değere benzersiz bir anahtarla erişilir. Redis gibi bellek içi çalışan sistemler; önbellek, oturum bilgisi, sayaçlar ve kuyruklar gibi çok hızlı okunup yazılması gereken veriler için sık kullanılır. Karşılığında "fiyatı 100 liranın üzerindeki tüm ürünler" gibi esnek sorgular bu modelin doğal güçlü yanı değildir.

## Analiz için sütun tabanlı depolar ve veri ambarları

İşlem odaklı veritabanları genellikle veriyi satır satır saklar; bu, tek bir kaydı hızlıca okuyup güncellemek için idealdir. Analiz sorguları ise çoğu zaman milyonlarca satırın yalnızca birkaç sütununu okur: "Son bir yılda şehir bazında toplam ciro" gibi. Sütun tabanlı (columnar) depolama, her sütunu ayrı ve sıkıştırılmış olarak sakladığı için bu tür sorgularda yalnızca gereken sütunları okur ve çok daha verimli çalışır.

Bulut veri ambarları ve ClickHouse gibi analitik veritabanları bu yaklaşımı kullanır. Genel kural şudur: Uygulamanın günlük işlemleri için işlem odaklı bir veritabanı, raporlama ve analiz için sütun tabanlı bir sistem. İkisini aynı sistemde zorlamak çoğu zaman ikisinden de ödün vermek demektir.

<div class="callout"><strong>İpucu:</strong> Uygulamanızın canlı veritabanında ağır analiz sorguları çalıştırmak, kullanıcıların yaşadığı performansı düşürebilir. Analiz yükü büyüdüğünde verinin bir kopyasını analiz için ayrı bir sisteme taşımak yaygın ve sağlıklı bir uygulamadır.</div>

## Özel amaçlı veritabanları: graf, zaman serisi ve vektör

**Graf veritabanları** veriyi düğümler, ilişkiler ve özellikler olarak saklar. Neo4j'nin tanımıyla, ilişkiler iki düğüm arasındaki adlandırılmış ve yönlü bağlantılardır ve kendi özelliklerine sahip olabilir. Dolandırıcılık ağlarını ortaya çıkarmak, öneri sistemleri ya da "bu iki kişi arasında kaç adım var?" gibi çok adımlı ilişki soruları için güçlüdür. Aynı soruları ilişkisel bir veritabanında sorgulamak, çok sayıda birleştirme gerektirdiğinden hızla karmaşıklaşabilir.

**Zaman serisi veritabanları** zaman damgalı ölçümler için optimize edilmiştir: Sunucu metrikleri, sensör verileri, enerji tüketimi ya da fiyatlar gibi. Bu sistemler genellikle zamana göre bölümleme, eski verinin otomatik silinmesi ya da özetlenmesi ve zaman aralıklarına göre hızlı toplama gibi özellikler sunar.

**Vektör veritabanları** metin, görüntü ya da ses gibi içeriklerin makine öğrenmesi modelleriyle üretilen sayısal temsillerini (gömme vektörleri) saklar ve "buna en çok benzeyenleri bul" türünden benzerlik aramaları yapar. Belgeler üzerinden soru yanıtlayan yapay zekâ uygulamalarında sık kullanılırlar. Bu yetenek yalnızca ayrı ürünlerde değil, mevcut veritabanlarında da bulunabiliyor: Örneğin PostgreSQL için geliştirilen açık kaynak pgvector eklentisi, vektörleri diğer verilerle aynı veritabanında saklamaya ve HNSW ile IVFFlat gibi yaklaşık en yakın komşu indeksleriyle aramaya olanak tanıyor.

## Karşılaştırma ve seçim

| Tür | Veri modeli | Tipik kullanım | Dikkat edilmesi gereken |
|---|---|---|---|
| İlişkisel | Tablolar, satırlar, sütunlar | İşlemler, siparişler, muhasebe, genel uygulamalar | Şema değişiklikleri planlama ister |
| Belge | JSON benzeri iç içe belgeler | Değişken yapılı kayıtlar, içerik yönetimi | Tablolar arası karmaşık sorgular zorlaşır |
| Anahtar-değer | Anahtar → değer | Önbellek, oturum, sayaç | Esnek sorgulama sınırlıdır |
| Sütun tabanlı / ambar | Sütun sütun saklanan tablolar | Raporlama, büyük ölçekli analiz | Sık ve küçük güncellemeler için uygun değil |
| Graf | Düğümler ve ilişkiler | Ağ analizi, öneriler, dolandırıcılık tespiti | Basit tablo verisi için gereksiz karmaşıklık |
| Zaman serisi | Zaman damgalı ölçümler | Metrikler, IoT, izleme | Genel amaçlı sorgular için sınırlı |
| Vektör | Sayısal gömme vektörleri | Anlamsal arama, öneri, belge tabanlı yapay zekâ | Sonuçlar yaklaşık; kalite gömme modeline bağlı |

Seçim yaparken kendime sorduğum sorular şunlar: Veri ne kadar yapılandırılmış? Tutarlılık ne kadar kritik? En sık hangi sorgular çalışacak? Veri ne kadar hızlı büyüyecek? Ekip hangi sistemi işletebilecek bilgiye sahip?

Birçok proje için makul başlangıç noktası iyi bilinen bir ilişkisel veritabanıdır; ihtiyaç netleştikçe yanına önbellek, analiz ya da arama için özel sistemler eklenebilir. Her yeni veritabanı türünün yedekleme, güvenlik, izleme ve ekip bilgisi açısından bir işletme maliyeti olduğunu unutmamak gerekir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Doğru veritabanı, verinizin yapısına ve ona en sık soracağınız sorulara bağlıdır.</li><li>İlişkisel veritabanları güvenilir işlemler ve şema denetimi sunar; çoğu proje için iyi bir başlangıçtır.</li><li>Belge ve anahtar-değer depoları esneklik ve hız sağlar, karşılığında sorgu gücünden ödün verir.</li><li>Analiz için sütun tabanlı sistemler, ağ ilişkileri için graf, ölçümler için zaman serisi veritabanları öne çıkar.</li><li>Vektör araması ayrı ürünlerde olduğu gibi pgvector gibi eklentilerle mevcut veritabanlarında da yapılabilir.</li></ul></div>

<div class="faq"><details><summary>NoSQL, SQL'in yerini mi aldı?</summary><p>Hayır. NoSQL sistemleri belirli kullanım alanlarında öne çıktı, ancak ilişkisel veritabanları hâlâ çok yaygın. Birçok sistem bugün her iki yaklaşımı birlikte kullanıyor.</p></details><details><summary>Bir projede birden fazla veritabanı kullanmak doğru mu?</summary><p>Gerektiğinde evet; örneğin ana veri için ilişkisel bir veritabanı, önbellek için bir anahtar-değer deposu kullanmak yaygındır. Ancak her ek sistem işletme ve tutarlılık yükü getirir, bu yüzden gerçek bir ihtiyaca dayanmalıdır.</p></details><details><summary>Yapay zekâ uygulaması için mutlaka vektör veritabanı gerekir mi?</summary><p>Benzerlik araması gerekiyorsa vektör desteği gerekir, ancak bu her zaman ayrı bir ürün anlamına gelmez. Veri miktarı makul düzeydeyse mevcut veritabanının vektör eklentisi yeterli olabilir.</p></details><details><summary>Excel bir veritabanı sayılır mı?</summary><p>Excel bir hesap tablosu programıdır; veri saklamak için kullanılabilir ama eş zamanlı erişim, işlem güvenliği ve veri bütünlüğü denetimi gibi veritabanı özelliklerini sunmaz.</p></details></div>

---

**Kaynaklar**

- [PostgreSQL Documentation – Concepts](https://www.postgresql.org/docs/current/tutorial-concepts.html)
- [SQLite – Appropriate Uses For SQLite](https://www.sqlite.org/whentouse.html)
- [MongoDB Manual – Introduction](https://www.mongodb.com/docs/manual/introduction/)
- [Neo4j – What is a graph database?](https://neo4j.com/docs/getting-started/graph-database/)
- [pgvector – Open-source vector similarity search for Postgres](https://github.com/pgvector/pgvector)
