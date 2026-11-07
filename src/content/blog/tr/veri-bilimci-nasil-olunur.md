---
title: "Veri Bilimci Nasıl Olunur? Beceriler, Yol Haritası ve Gerçekler"
description: "Veri bilimine girmek isteyenler için beceriler, öğrenme sırası, portföy projeleri ve ilk işin gerçekleri üzerine abartısız, pratik bir rehber."
publishDate: "2026-11-07T09:17:00+03:00"
lang: tr
category: "Kariyer"
tags: ["Veri Bilimi", "Kariyer", "İstatistik"]
translation: "how-to-become-a-data-scientist"
heroImage:
  src: "../../../assets/blog/covers/veri-bilimci-nasil-olunur.jpg"
  alt: "Grafikler, kod ve not defteriyle çalışan bir veri bilimcinin masası"
---

Öğrencilerden ve kariyer değiştirmek isteyen profesyonellerden en sık duyduğum sorulardan biri şu: "Veri bilimci olmak için nereden başlamalıyım?" Soru basit görünse de cevabı bir kurs listesinden ibaret değil. Veri bilimi; istatistik, programlama, iş bilgisi ve iletişimin kesiştiği bir alan ve bu parçaların hangisinin eksik kaldığı, işe başladığınızda hemen ortaya çıkıyor. Bu yazıda gereken becerileri, makul bir öğrenme sırasını, işe yarayan portföy projelerini ve ilk işin gerçeklerini abartmadan anlatmaya çalışacağım.

## Veri bilimci aslında ne yapar?

ABD Çalışma İstatistikleri Bürosu (BLS) meslek tanımında veri bilimcilerin işini, veriden anlamlı içgörüler çıkarmak için analitik araç ve teknikler kullanmak olarak özetliyor. Günlük işler arasında veri toplamak ve temizlemek, makine öğrenmesi modelleri kurup test etmek, bulguları görselleştirmek ve karar vericilere öneri sunmak sayılıyor.

Bu listenin sırası bile öğretici. Pek çok kişi işin "model kurma" kısmını hayal eder; gerçekte zamanın önemli bir bölümü verinin nereden geldiğini anlamaya, eksik ve hatalı kayıtları ayıklamaya ve doğru soruyu netleştirmeye gider. Veri kalitesi üzerine çalışan biri olarak şunu rahatlıkla söyleyebilirim: iyi bir veri bilimciyi ayıran şey çoğu zaman en karmaşık algoritmayı bilmesi değil, verinin neyi temsil ettiğini ve neyi temsil etmediğini sorgulamasıdır.

## Temel beceriler

BLS'nin önemli nitelikler listesinde analitik düşünme, bilgisayar becerileri, iletişim, mantıksal düşünme, matematik ve problem çözme yer alıyor. Bunu pratikte dört ana başlığa ayırmak mümkün:

| Beceri | Neden önemli? | Başlangıç için yeterli seviye |
|---|---|---|
| İstatistik ve olasılık | Sonuçların tesadüf mü, gerçek mi olduğunu ayırt etmek için | Dağılımlar, örnekleme, hipotez testi, güven aralığı, regresyon |
| Programlama (çoğunlukla Python veya R) | Veriyi işlemek, analiz etmek, modellemek için | Veri çerçeveleri, temel görselleştirme, fonksiyon yazma |
| SQL | Kurumlarda veri çoğunlukla veritabanlarında durur | Birleştirme (JOIN), gruplama, alt sorgular, pencere fonksiyonları |
| İletişim | Analiz anlaşılmazsa karar değiştirmez | Teknik olmayan birine bulguyu bir sayfada anlatabilmek |

SQL'in bu listede bu kadar üstte olması bazen şaşırtıcı bulunuyor. Ama ilk işinizde büyük olasılıkla ilk haftalarınız, ihtiyaç duyduğunuz veriyi doğru tablolardan doğru şekilde çekmeyi öğrenmekle geçecek. Basit bir örnek:

```sql
SELECT sehir,
       COUNT(*)            AS siparis_sayisi,
       AVG(tutar)          AS ortalama_tutar
FROM siparisler
WHERE siparis_tarihi >= '2026-01-01'
GROUP BY sehir
ORDER BY siparis_sayisi DESC;
```

Bu sorguyu yazabilmek kolay; asıl beceri, sonuca bakıp "iptal edilen siparişler de sayıldı mı?", "aynı müşteri iki kez mi geçiyor?" diye sorabilmek.

## Makul bir öğrenme sırası

Herkesin yolu farklı olsa da şu sıra çoğu kişi için işe yarıyor:

1. **Temel istatistik ve veriyle düşünme.** Ortalama ile medyanın farkı, örneklem büyüklüğü, korelasyon ile nedenselliğin ayrımı.
2. **Bir programlama dili.** Python veya R'dan birini seçip derinleşmek, ikisine yüzeysel bakmaktan daha değerli.
3. **SQL.** Gerçekçi, birden fazla tablolu bir veri setinde pratik yapmak.
4. **Veri temizleme ve keşifsel analiz.** Eksik değerler, aykırı değerler, tutarsız kategoriler.
5. **Temel makine öğrenmesi.** Doğrusal ve lojistik regresyon, karar ağaçları; en önemlisi de modeli doğru değerlendirmek.
6. **Sunum ve hikâye anlatımı.** Bulguyu bir grafik ve birkaç cümleyle aktarmak.

Eğitim konusunda BLS, ABD için bu meslekte genellikle en az matematik, istatistik, bilgisayar bilimi ya da ilgili bir alanda lisans derecesi beklendiğini, bazı işverenlerin yüksek lisans veya doktora tercih ettiğini belirtiyor. Bu bir ABD tanımı; yine de diploma tek kapı değil. Fizik, ekonomi, mühendislik ya da sosyal bilimler gibi farklı bölümlerden gelip istatistik temelini sağlamlaştıran ve güçlü bir portföy hazırlayan kişiler de bu alana geçebiliyor.

<div class="callout"><strong>İpucu:</strong> Kurs bitirme sertifikalarını biriktirmek yerine her öğrendiğiniz konuyu küçük bir projeyle pekiştirin. İşe alım sürecinde "ne izledim" değil, "ne yaptım ve neden öyle yaptım" sorusu belirleyici olur.</div>

## Portföy: neyi göstermeli?

İyi bir portföy projesi, sizin nasıl düşündüğünüzü gösterir. Birkaç öneri:

- **Kendi sorunuzla başlayın.** Herkesin kullandığı hazır veri setleri yerine ilginizi çeken bir konuda açık veri bulun: belediye verileri, ulaşım, hava kalitesi, spor istatistikleri.
- **Uçtan uca gidin.** Veriyi edinme, temizleme, analiz, sonuç ve sınırlılıklar. Yarım kalmış beş proje yerine tamamlanmış iki proje daha ikna edicidir.
- **Sınırlılıkları açıkça yazın.** "Bu veri şu grupları kapsamıyor, bu yüzden sonuç şuna genellenemez" demek, olgunluk işaretidir.
- **Okunabilir bırakın.** Düzenli bir kod deposu, kısa bir açıklama dosyası ve teknik olmayan biri için bir özet paragraf.
- **Doğruluk yüzdesine takılmayın.** Modelinizin başarısını basit bir referans yöntemle (örneğin her zaman en sık sınıfı tahmin etmek) karşılaştırın. Bu karşılaştırma, tek başına yüksek bir sayıdan çok daha fazla şey anlatır.

## İlk işin gerçekleri

Bu bölümü yazmamın nedeni, beklenti ile gerçek arasındaki farkın pek çok kişiyi erken hayal kırıklığına uğratması.

- **Unvanlar karışık.** Bir kurumda "veri bilimci" denen iş, başka bir kurumda "veri analisti" ya da "makine öğrenmesi mühendisi" olarak geçebilir. İlanda unvana değil, görev tanımına bakın.
- **Giriş seviyesi kapısı çoğu zaman analistlikten geçer.** Raporlama, SQL ve gösterge panelleri ile başlayıp zamanla modellemeye kaymak yaygın bir yol.
- **Rekabet var.** Alan popüler ve giriş seviyesindeki ilanlara çoğu zaman çok sayıda başvuru geliyor. Bu yüzden belirli bir sektöre (sağlık, finans, perakende, enerji) ilgi ve bilgi göstermek sizi ayırt edebilir.
- **Talep görünür ama yere göre değişir.** BLS, ABD'de veri bilimci istihdamının 2025–2035 döneminde yüzde 35 büyümesini öngörüyor. Bu bir ülke projeksiyonu; Türkiye ya da başka bir pazar için doğrudan geçerli sayılmamalı.

Maaş rakamları konusunda bilerek bir şey yazmıyorum: ülkeye, şehre, sektöre ve deneyime göre çok değişiyor ve kaynağı, tarihi belli olmayan rakamlar yanıltıcı oluyor.

<div class="callout"><strong>İpucu:</strong> Mülakatta size bir veri seti verilip "ne görüyorsun?" diye sorulursa, hemen model kurmaya atlamayın. Önce verinin nasıl toplandığını, neyin eksik olabileceğini ve hangi soruya cevap arandığını sorun.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Veri bilimi; istatistik, programlama, SQL ve iletişimin birleşimidir ve en zayıf halka işte hemen görünür.</li><li>Zamanın önemli kısmı veriyi anlamaya ve temizlemeye gider; model kurmak işin sadece bir parçasıdır.</li><li>Az sayıda ama uçtan uca tamamlanmış, sınırlılıkları açıkça yazılmış projeler en güçlü portföydür.</li><li>Unvanlar kurumdan kuruma değişir; ilanlarda görev tanımına odaklanın.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Veri bilimci olmak için yüksek lisans şart mı?</summary><p>Şart değil, ama bazı işverenler tercih ediyor. Özellikle araştırma ağırlıklı rollerde lisansüstü eğitim avantaj sağlar; uygulama ağırlıklı rollerde güçlü bir portföy de kapı açabilir.</p></details><details><summary>Python mı öğrenmeliyim, R mı?</summary><p>İkisi de iş görür. Sektörde Python daha yaygın görünse de asıl önemli olan birinde derinleşmek ve veriyle düşünmeyi öğrenmektir.</p></details><details><summary>Matematiğim zayıfsa bu alana girebilir miyim?</summary><p>Temel istatistik ve olasılık kaçınılmaz, ancak bunlar sistemli çalışmayla öğrenilebilir. İleri matematik ise daha çok araştırma rollerinde gerekir.</p></details><details><summary>Kaç projeyle iş başvurusuna başlamalıyım?</summary><p>Kesin bir sayı yok. İki ya da üç iyi belgelenmiş, uçtan uca proje çoğu zaman çok sayıda yarım projeden daha ikna edicidir.</p></details></div>

---

**Kaynaklar**

- [U.S. Bureau of Labor Statistics – Occupational Outlook Handbook: Data Scientists](https://www.bls.gov/ooh/math/data-scientists.htm)
- [U.S. Bureau of Labor Statistics – Career Outlook: Data occupations (2023)](https://www.bls.gov/careeroutlook/2023/data-on-display/data-occupations.htm)
- [Google for Developers – Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [American Statistical Association – Statement on Statistical Significance and P-Values (2016)](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf)
