---
title: "Finansta Yapay Zeka: Kredi Notundan Dolandırıcılık Tespitine"
description: "Bankalar yapay zekayı kredi değerlendirme, dolandırıcılık tespiti, alım satım ve müşteri hizmetlerinde nasıl kullanıyor? Açıklanabilirlik ve model riski."
publishDate: "2026-11-23T09:17:00+03:00"
lang: tr
category: "Uygulama"
tags: ["Finans", "Yapay Zeka", "Model Riski", "Regülasyon"]
translation: "ai-in-finance"
heroImage:
  src: "../../../assets/blog/covers/finansta-yapay-zeka.jpg"
  alt: "Kredi kartı, grafikler ve veri akışını gösteren finans illüstrasyonu"
---

Finans, yapay zekanın en erken ve en yoğun kullanıldığı alanlardan biri. Kredi kartınızla yaptığınız alışverişin saniyeler içinde onaylanması ya da şüpheli bir işlem yüzünden bankanızdan gelen uyarı mesajı, büyük ihtimalle bir modelin kararıdır. Bu yazıda finans dünyasında yapay zekanın dört temel kullanımını, bu kullanımların neden sıkı kurallara tabi olduğunu ve "model riski" denen kavramı genel okuyucu için açmaya çalışacağım. Model değerlendirme ve yapay zeka yönetişimi üzerine çalışan biri olarak özellikle açıklanabilirlik ve adalet tarafına ağırlık vereceğim.

<div class="callout"><strong>Not:</strong> Bu yazı genel bilgilendirme amaçlıdır; yatırım, finans veya hukuk tavsiyesi değildir.</div>

## Kredi değerlendirme: "Bu kişiye borç verilir mi?"

Bir kredi başvurusunda banka temelde tek bir soruya cevap arar: Bu kişi borcunu zamanında geri öder mi? Geleneksel kredi skorlama modelleri, ödeme geçmişi, mevcut borç miktarı, gelir ve kredi geçmişinin uzunluğu gibi görece az sayıda değişkene dayanan istatistiksel modellerdi. Makine öğrenmesi, daha fazla değişkeni ve aralarındaki karmaşık ilişkileri hesaba katarak tahmin gücünü artırma vaadiyle geldi.

Ancak burada ince bir denge var. Daha karmaşık bir model biraz daha isabetli olabilir, ama "neden reddedildim?" sorusuna cevap vermek zorlaşır. Ayrıca doğrudan cinsiyet ya da etnik köken kullanılmasa bile, posta kodu veya alışveriş alışkanlıkları gibi değişkenler bu özelliklerin yerine geçebilir ve dolaylı ayrımcılığa yol açabilir. Bu yüzden kredi modellerinde yalnızca isabet değil, farklı gruplar için sonuçların nasıl dağıldığı da düzenli olarak ölçülmelidir.

## Dolandırıcılık tespiti: samanlıkta iğne aramak

Dolandırıcılık tespiti, yapay zekanın finanstaki belki de en az tartışmalı ve en faydalı kullanımı. Kartınızla her işlem yaptığınızda bir model, tutarı, yeri, saati, işyeri türünü ve sizin alışkanlıklarınızı birlikte değerlendirip bir risk puanı üretir. İstanbul'da yaşayan birinin kartıyla birkaç dakika arayla hem İstanbul'da hem başka bir kıtada işlem yapılması, sistemin hemen dikkatini çeker.

Buradaki teknik zorluk, dolandırıcılığın çok nadir olmasıdır. İşlemlerin ezici çoğunluğu meşrudur; bu yüzden "her şey normal" diyen bir model kâğıt üzerinde çok yüksek doğruluk gösterir ama hiçbir işe yaramaz. Değerlendirme yaparken doğruluk yerine, gerçek dolandırıcılıkların ne kadarının yakalandığına ve kaç masum müşterinin kartının gereksiz yere bloke edildiğine bakmak gerekir. Bu ikisi arasındaki denge, bankanın hem kaybını hem de müşteri memnuniyetini belirler.

## Algoritmik alım satım: hız ve kırılganlık

Borsalarda emirlerin önemli bir kısmı, önceden belirlenmiş kurallara ya da modellere göre otomatik olarak veriliyor. Bu sistemler insanlardan çok daha hızlı tepki verebilir, büyük emirleri küçük parçalara bölerek piyasa üzerindeki etkiyi azaltabilir. Ancak hız, kırılganlığı da beraberinde getirir. ABD'de 6 Mayıs 2010'da yaşanan ve "flash crash" olarak bilinen olayda piyasalar çok kısa sürede sert düşüp toparlandı; ABD Menkul Kıymetler ve Borsa Komisyonu (SEC) ile Emtia Vadeli İşlemler Ticaret Komisyonu (CFTC) olayı ortak bir raporla inceledi. Bu tür olaylar, otomatik sistemlerin birbirleriyle etkileşime girdiğinde beklenmedik sonuçlar doğurabileceğini hatırlatıyor.

Bireysel yatırımcılar için de bir uyarı eklemek isterim: "Yapay zeka destekli, garantili getiri" vaat eden uygulamalar ve sosyal medya reklamları, dolandırıcılığın sık görülen biçimlerinden biri. Hiçbir model geleceği garanti edemez.

## Müşteri hizmetleri ve sohbet botları

Bankaların mobil uygulamalarındaki sohbet asistanları, bakiye sorgulama, kart kapatma ya da basit işlemler için giderek daha fazla kullanılıyor. Büyük dil modelleriyle bu asistanlar daha doğal konuşabiliyor, ama finans gibi hata payının düşük olduğu bir alanda iki risk öne çıkıyor: Modelin yanlış ya da uydurma bilgi vermesi ve müşteri verilerinin gizliliği. İyi tasarlanmış sistemler, botun yetkisini sınırlar, kritik işlemlerde ek doğrulama ister ve müşteriye her zaman bir insana ulaşma seçeneği sunar.

## Açıklanabilirlik ve adalet: neden bu kadar sıkı kurallar var?

Finansal kararlar insanların hayatını doğrudan etkilediği için, bu alandaki yapay zeka kullanımı özel kurallara tabi.

**AB Yapay Zeka Tüzüğü** (2024/1689 sayılı Tüzük), gerçek kişilerin kredi değerliliğini değerlendirmek veya kredi puanı belirlemek için kullanılan sistemleri Ek III'te "yüksek riskli" olarak sınıflandırıyor; finansal dolandırıcılığı tespit etmeye yönelik sistemler bu kapsamın dışında tutuluyor. Hayat ve sağlık sigortalarında risk değerlendirmesi ve fiyatlama da aynı listede. Yüksek riskli sistemler için risk yönetimi, veri yönetişimi, kayıt tutma, insan denetimi ve şeffaflık gibi yükümlülükler öngörülüyor. Bu yükümlülüklerin uygulanma tarihi, 27 Temmuz 2026'da yürürlüğe giren ve "Dijital Omnibus" olarak bilinen değişiklik düzenlemesiyle 2 Aralık 2027'ye ertelendi.

**AB Genel Veri Koruma Tüzüğü'nün 22. maddesi**, kişileri belirli koşullarda yalnızca otomatik işlemeye dayanan ve kendilerini önemli ölçüde etkileyen kararlardan koruyor ve insan müdahalesi isteme, görüş bildirme ve karara itiraz etme haklarını güvenceye alıyor. Avrupa Birliği Adalet Divanı, 7 Aralık 2023 tarihli SCHUFA kararında (C-634/21), bir kredi kuruluşunun ürettiği puanın, borç veren tarafından kararda belirleyici biçimde kullanılması durumunda bu maddenin kapsamına girebileceğine hükmetti.

Gerçek hayattan bir örnek de konunun nüanslarını iyi gösteriyor. 2019'da Apple Card'ın kadınlara erkeklerden daha düşük kredi limiti verdiği iddiası sosyal medyada geniş yankı uyandırdı. New York Finansal Hizmetler Departmanı, yaklaşık 400.000 başvurunun verisini de inceleyen soruşturmasının sonucunu Mart 2021'de açıkladı: Adil kredi mevzuatı açısından hukuka aykırı bir ayrımcılık bulunmadı. Ancak departman, müşteri hizmetlerindeki eksikliklerin ve algılanan şeffaflık eksikliğinin, kredi kararlarının adil olduğuna duyulan güveni zedelediğini vurguladı. Ders şu: Bir model istatistiksel olarak adil olsa bile, kararını açıklayamıyorsa güven kaybedebilir.

## Model riski yönetimi: modeli de denetlemek

Finans sektörü, "modelin kendisi de bir risk kaynağıdır" fikrini erkenden kurumsallaştırdı. ABD Merkez Bankası'nın (Federal Reserve) 2011'de yayımladığı SR 11-7 rehberi, model riskini yönetmek için geliştirme, bağımsız doğrulama ve yönetişim süreçlerini tarif ediyor. Rehberin merkezindeki kavramlardan biri "etkili itiraz" (effective challenge): Modeli geliştirenlerden bağımsız, yetkin ve sözü dinlenen kişilerin modelin varsayımlarını ve sınırlarını sorgulaması.

Bu yaklaşım, yapay zeka çağında da geçerliliğini koruyor. Pratikte model riski yönetimi şu soruları düzenli olarak sormak demek: Model hangi veriyle eğitildi ve bu veri hâlâ bugünü temsil ediyor mu? Performans zamanla düşüyor mu? Model beklenmedik bir piyasa koşulunda nasıl davranıyor? Kararlar belgeleniyor ve gerektiğinde açıklanabiliyor mu? Bu soruların cevabı yoksa, en gelişmiş model bile kurum için gizli bir yük olabilir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Finansta yapay zeka en çok kredi değerlendirme, dolandırıcılık tespiti, algoritmik alım satım ve müşteri hizmetlerinde kullanılıyor.</li><li>Dolandırıcılık nadir olduğu için doğruluk yanıltıcıdır; yakalanan vakalar ve yanlış alarmlar birlikte değerlendirilmeli.</li><li>AB Yapay Zeka Tüzüğü kredi değerliliği değerlendirmesini yüksek riskli sayıyor; ilgili yükümlülükler 2 Aralık 2027'den itibaren uygulanacak.</li><li>İstatistiksel adalet tek başına yetmez; kararların açıklanabilmesi güven için şart.</li><li>Model riski yönetimi, modeli bağımsız gözlerle sürekli sorgulamayı gerektirir.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Kredi başvurum bir yapay zeka tarafından reddedildiyse ne yapabilirim?</summary><p>Bankanızdan kararın gerekçesini ve hangi bilgilerin kullanıldığını sorabilirsiniz. Kişisel verilerinizin işlenmesiyle ilgili bilgi talep etmek, bulunduğunuz ülkenin veri koruma mevzuatı kapsamında genellikle mümkündür.</p></details><details><summary>Dolandırıcılık modeli kartımı neden bloke etti?</summary><p>Muhtemelen işlem, alışkanlıklarınızdan belirgin şekilde farklıydı (yeni bir ülke, alışılmadık tutar veya saat gibi). Bu sistemler bilerek temkinli ayarlanır; bankanızla doğrulama yaptıktan sonra işlem genellikle normale döner.</p></details><details><summary>Yapay zeka destekli yatırım uygulamalarına güvenebilir miyim?</summary><p>Hiçbir model getiri garanti edemez. Garanti vaat eden, acele ettiren veya lisansını doğrulayamadığınız platformlara karşı dikkatli olun; yetkili kuruluşlardan lisans bilgisini kontrol edin.</p></details><details><summary>Açıklanabilir yapay zeka daha mı az isabetli?</summary><p>Her zaman değil. Bazı durumlarda daha basit ve yorumlanabilir modeller karmaşık olanlara yakın performans gösterir. Karmaşık modeller için de kararı etkileyen ana faktörleri gösteren açıklama yöntemleri kullanılabilir.</p></details></div>

---

**Kaynaklar**

- [EUR-Lex – Regulation (EU) 2024/1689 (Yapay Zeka Tüzüğü)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
- [EU AI Act – Digital Omnibus on AI özeti](https://www.euaiact.com/digital-omnibus-ai)
- [GDPR Madde 22 – Otomatik bireysel karar verme](https://gdpr-info.eu/art-22-gdpr/)
- [NYDFS – Apple Card soruşturması basın açıklaması (23 Mart 2021)](https://www.dfs.ny.gov/reports_and_publications/press_releases/pr202103231)
- [SEC – 6 Mayıs 2010 piyasa olaylarına ilişkin ortak rapor duyurusu](https://www.sec.gov/news/press/2010/2010-179.htm)
