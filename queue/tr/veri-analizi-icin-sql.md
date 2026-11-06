---
title: "Veri Analizi için SQL: SELECT'ten Pencere Fonksiyonlarına"
description: "SELECT, WHERE, GROUP BY, JOIN ve pencere fonksiyonlarıyla veri analizi: küçük bir örnek şema üzerinden analistlerin tipik soruları ve sık yapılan SQL hataları."
publishDate: "2026-11-16T09:17:00+03:00"
lang: tr
category: "Veri"
tags: ["SQL", "Veri Analizi", "Veritabanı"]
translation: "sql-for-data-analysis"
heroImage:
  src: "../../../assets/blog/covers/veri-analizi-icin-sql.jpg"
  alt: "Müşteri ve sipariş tablolarını birleştiren bir SQL sorgusu"
---

Bir şirketteki verinin büyük kısmı hâlâ ilişkisel veritabanlarında, satırlar ve sütunlardan oluşan tablolarda duruyor. Bu veriye soru sormanın en yaygın dili de SQL. "Geçen ay en çok harcama yapan müşteriler kim?", "Hangi şehirden ne kadar sipariş geldi?", "Hiç sipariş vermemiş kayıtlı kullanıcı var mı?" gibi soruların hepsi birkaç satırlık SQL ile yanıtlanabiliyor. Üstelik SQL yalnızca yazılımcıların değil; analistlerin, ürün yöneticilerinin ve finans ekiplerinin de giderek daha sık kullandığı bir araç. Bu yazıda küçük bir örnek şema üzerinden analiz için en çok işe yarayan yapıları ve yeni başlayanların sık düştüğü hataları anlatmak istiyorum.

## Örnek şema: müşteriler ve siparişler

İki tablolu çok basit bir senaryo kullanacağım: Müşteriler ve onların verdiği siparişler. Aşağıdaki kod hem PostgreSQL'de hem de SQLite'ta çalışır:

```sql
CREATE TABLE musteriler (
  musteri_id INTEGER PRIMARY KEY,
  ad         TEXT NOT NULL,
  sehir      TEXT
);

CREATE TABLE siparisler (
  siparis_id     INTEGER PRIMARY KEY,
  musteri_id     INTEGER REFERENCES musteriler(musteri_id),
  siparis_tarihi DATE,
  tutar          NUMERIC
);

INSERT INTO musteriler VALUES
  (1, 'Ayşe',   'Ankara'),
  (2, 'Mehmet', 'İzmir'),
  (3, 'Elif',   'Ankara'),
  (4, 'Can',    NULL);

INSERT INTO siparisler VALUES
  (101, 1, '2026-09-03', 250),
  (102, 1, '2026-10-12', 400),
  (103, 2, '2026-10-15', 150),
  (104, 3, '2026-10-20', NULL),
  (105, 2, '2026-10-28', 300),
  (106, 1, '2026-10-30', 100);
```

Verinin içine bilerek iki "kusur" koydum: Can'ın şehri boş ve Elif'in siparişinin tutarı girilmemiş. Gerçek verilerde bu tür boşluklar her zaman vardır ve sorguların sonucunu sessizce etkiler.

<div class="callout"><strong>İpucu:</strong> Denemek için sunucu kurmanıza gerek yok. SQLite tek bir dosyada çalışan bir veritabanıdır ve Python ile birlikte gelen <em>sqlite3</em> modülüyle hemen kullanılabilir. SQLite, pencere fonksiyonlarını 2018'de yayımlanan 3.25.0 sürümünden beri destekliyor.</div>

## SELECT ve WHERE: doğru satırları seçmek

En temel sorgu, hangi sütunları istediğinizi (`SELECT`), hangi tablodan (`FROM`) ve hangi koşulla (`WHERE`) seçtiğinizi söyler:

```sql
SELECT siparis_id, musteri_id, tutar
FROM siparisler
WHERE siparis_tarihi >= '2026-10-01'
  AND tutar > 120
ORDER BY tutar DESC;
```

Bu sorgu Ekim ayından itibaren verilmiş ve tutarı 120'nin üzerindeki siparişleri büyükten küçüğe sıralar. Sonuçta 102, 105 ve 103 numaralı siparişler gelir. Tutarı boş olan 104 numaralı sipariş gelmez; çünkü `NULL > 120` karşılaştırmasının sonucu "doğru" değil, "bilinmiyor"dur.

Burada bilinmesi faydalı bir ayrıntı daha var: SQL sorgusu yazıldığı sırayla değil, mantıksal olarak kabaca `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` sırasıyla değerlendirilir. Önce tablo belirlenir, sonra satırlar süzülür, gruplanır, gruplar süzülür ve en son hangi sütunların gösterileceğine karar verilir. Bu sıra, birçok "neden çalışmıyor?" sorusunu açıklar. Örneğin `SELECT` içinde verdiğiniz bir takma adı PostgreSQL gibi birçok veritabanında `WHERE` içinde kullanamazsınız; çünkü `WHERE` çalıştığında o ad henüz tanımlanmamıştır. `ORDER BY` ise en sonda çalıştığı için takma adları kullanabilir.

## GROUP BY ve HAVING: özetlemek

Analiz çoğu zaman tek tek satırlarla değil, özetlerle ilgilidir. `GROUP BY`, satırları bir sütuna göre gruplar ve her grup için toplu (aggregate) fonksiyonlar hesaplar:

```sql
SELECT musteri_id,
       COUNT(*)     AS siparis_sayisi,
       COUNT(tutar) AS tutari_olan,
       SUM(tutar)   AS toplam_tutar
FROM siparisler
GROUP BY musteri_id
HAVING COUNT(*) >= 2;
```

Burada iki önemli ayrıntı var. Birincisi, `COUNT(*)` tüm satırları sayar; `COUNT(tutar)` ise yalnızca tutarı boş olmayan satırları. İkincisi, `WHERE` ile `HAVING` arasındaki fark: `WHERE` gruplamadan önce tek tek satırları süzer, `HAVING` ise gruplama ve toplama yapıldıktan sonra grupları süzer. "En az iki siparişi olan müşteriler" bir grup koşulu olduğu için `HAVING` ile yazılır.

## JOIN: tabloları birleştirmek

İlişkisel veritabanlarının gücü, bilgiyi tekrar etmeden ayrı tablolarda tutup gerektiğinde birleştirebilmekten gelir. Şehir bazında toplam sipariş tutarını bulmak için iki tabloyu `musteri_id` üzerinden birleştiririz:

```sql
SELECT m.sehir, SUM(s.tutar) AS toplam_tutar
FROM musteriler AS m
JOIN siparisler AS s ON s.musteri_id = m.musteri_id
GROUP BY m.sehir
ORDER BY toplam_tutar DESC;
```

`JOIN` (iç birleştirme) yalnızca iki tabloda da eşleşmesi olan satırları getirir. "Hiç sipariş vermemiş müşteriler kim?" sorusu için ise `LEFT JOIN` gerekir: Soldaki tablonun her satırı sonuçta yer alır, sağ tarafta eşleşme yoksa o sütunlar `NULL` ile doldurulur.

```sql
SELECT m.ad
FROM musteriler AS m
LEFT JOIN siparisler AS s ON s.musteri_id = m.musteri_id
WHERE s.siparis_id IS NULL;
```

Bu sorgu yalnızca Can'ı döndürür. Bu kalıp; kayıt olup alışveriş yapmayan kullanıcıları, eşleşmeyen faturaları ya da eksik kayıtları bulmak için çok sık kullanılır.

## Pencere fonksiyonları: satırları kaybetmeden hesaplamak

`GROUP BY` satırları tek bir özet satıra indirger. Bazen ise hem her satırı görmek hem de bir grup hesabı yapmak istersiniz: Her siparişin yanında müşterinin o güne kadarki toplam harcaması gibi. Pencere fonksiyonları tam olarak bunu yapar; bir fonksiyonu pencere fonksiyonu yapan şey `OVER` ifadesidir.

```sql
SELECT musteri_id, siparis_tarihi, tutar,
       SUM(tutar)   OVER (PARTITION BY musteri_id ORDER BY siparis_tarihi) AS kumulatif,
       ROW_NUMBER() OVER (PARTITION BY musteri_id ORDER BY siparis_tarihi) AS sira
FROM siparisler
ORDER BY musteri_id, siparis_tarihi;
```

`PARTITION BY` hesabın hangi grup içinde yapılacağını, `ORDER BY` ise sıralamayı belirler. Ayşe için kümülatif toplam 250, 650 ve 750 olarak ilerler; `sira` sütunu da her müşterinin kaçıncı siparişi olduğunu gösterir. "Her müşterinin ilk siparişi" gibi sorular bu sütunla kolayca yanıtlanır.

Pencere fonksiyonları `WHERE` içinde kullanılamaz. "Her müşterinin en yüksek tutarlı siparişi" gibi bir filtre için sorguyu bir alt sorgunun içine almak gerekir:

```sql
SELECT *
FROM (
  SELECT musteri_id, siparis_id, tutar,
         RANK() OVER (PARTITION BY musteri_id ORDER BY tutar DESC) AS derece
  FROM siparisler
  WHERE tutar IS NOT NULL
) AS sirali
WHERE derece = 1;
```

## Sık yapılan hatalar

SQL'in sözdizimi basittir; asıl zorluk, sorgunun sessizce yanlış bir sonuç üretmesidir. En sık karşılaştığım hatalar:

- **`= NULL` yazmak:** `WHERE sehir = NULL` hiçbir satır döndürmez. Boş değerleri aramak için `IS NULL` kullanılmalıdır.
- **NULL'ların ortalamaya etkisini unutmak:** `AVG(tutar)` boş değerleri hesaba katmaz. Örnek veride ortalama 240 çıkar; boş tutarı sıfır kabul etseydik 200 olurdu. Hangisinin doğru olduğu iş sorusuna bağlıdır.
- **JOIN ile satırları çoğaltmak:** Bire-çok ilişkide birleştirme yapıp ardından toplam almak, aynı değeri birden çok kez saydırabilir. Birleştirmeden önce ve sonra satır sayısını kontrol etmek iyi bir alışkanlıktır.
- **LEFT JOIN'i WHERE ile bozmak:** Sağ tablodaki bir sütuna `WHERE` ile koşul koymak, eşleşmeyen (`NULL`) satırları eler ve sorguyu fiilen iç birleştirmeye çevirir. Böyle bir koşul gerekiyorsa `ON` kısmına yazılmalıdır.
- **Tarih fonksiyonlarının farklı olduğunu unutmak:** Ay bazında gruplama gibi işlemler için PostgreSQL, SQLite ve diğer sistemler farklı fonksiyonlar kullanır. Çalıştığınız sistemin belgelerine bakmak gerekir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>SELECT, WHERE, GROUP BY ve JOIN, analistlerin sorularının büyük bölümünü yanıtlamaya yeter.</li><li>WHERE satırları gruplamadan önce, HAVING grupları toplamadan sonra süzer.</li><li>LEFT JOIN ve IS NULL kalıbı, eşleşmeyen kayıtları bulmanın en pratik yoludur.</li><li>Pencere fonksiyonları satırları kaybetmeden kümülatif toplam, sıra ve derece hesaplar.</li><li>NULL değerler ve JOIN kaynaklı çoğalma, en sık görülen sessiz hata kaynaklarıdır.</li></ul></div>

<div class="faq"><details><summary>SQL öğrenmek için hangi veritabanıyla başlamalıyım?</summary><p>Başlangıç için SQLite çok pratiktir; kurulum gerektirmez. Temel sorgular PostgreSQL, MySQL ve diğer ilişkisel sistemlerde büyük ölçüde aynıdır, farklar daha çok tarih fonksiyonları gibi ayrıntılardadır.</p></details><details><summary>SQL mi öğrenmeliyim, pandas mı?</summary><p>İkisi farklı yerlerde güçlüdür. Veri bir veritabanındaysa, süzme ve özetlemeyi SQL ile veritabanında yapmak genellikle daha verimlidir. Ayrıntılı analiz ve görselleştirme için sonucu pandas gibi bir araca almak yaygın bir iş akışıdır.</p></details><details><summary>Pencere fonksiyonu ile GROUP BY arasındaki fark nedir?</summary><p>GROUP BY her grup için tek bir satır döndürür. Pencere fonksiyonu ise her satırı korur ve hesaplamanın sonucunu o satırın yanına ekler.</p></details><details><summary>Sorgum doğru mu, nasıl kontrol ederim?</summary><p>Küçük bir alt küme üzerinde sonucu elle doğrulayın, JOIN öncesi ve sonrası satır sayılarını karşılaştırın ve NULL içeren sütunların sonucu nasıl etkilediğini ayrıca sorgulayın.</p></details></div>

---

**Kaynaklar**

- [PostgreSQL Documentation – Concepts](https://www.postgresql.org/docs/current/tutorial-concepts.html)
- [PostgreSQL Documentation – Joins Between Tables](https://www.postgresql.org/docs/current/tutorial-join.html)
- [PostgreSQL Documentation – Aggregate Functions](https://www.postgresql.org/docs/current/tutorial-agg.html)
- [PostgreSQL Documentation – Window Functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [SQLite – Window Functions](https://www.sqlite.org/windowfunctions.html)
