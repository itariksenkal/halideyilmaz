---
title: "Kuantum Bilişim ve Yapay Zeka: Neyi Bekleyebiliriz?"
description: "Kübit, süperpozisyon ve dolanıklık sade bir dille; kuantum bilgisayarların sınırları, kuantum makine öğrenmesi iddiaları ve kuantum sonrası şifreleme."
publishDate: "2026-12-05T09:17:00+03:00"
lang: tr
category: "Temeller"
tags: ["Kuantum Bilişim", "Yapay Zeka", "Kriptografi"]
translation: "quantum-computing-and-ai"
heroImage:
  src: "../../../assets/blog/covers/kuantum-bilisim-ve-yapay-zeka.jpg"
  alt: "Soğutma tüpleriyle çevrili bir kuantum işlemcisinin yakın plan görüntüsü"
---

"Kuantum bilgisayarlar yapay zekayı kat kat hızlandıracak" ya da "kuantum bilgisayarlar tüm şifreleri kıracak" gibi cümlelerle sık karşılaşıyoruz. Bu iddiaların bir kısmı sağlam bilimsel temellere dayanıyor, bir kısmı ise henüz kanıtlanmamış umutlardan ibaret. Kuantum bilişim gerçekten önemli bir alan, ama neyin bugün mümkün olduğunu, neyin yalnızca kuramsal olarak mümkün göründüğünü ve neyin tamamen belirsiz olduğunu ayırt etmek gerekiyor. Bu yazıda temel kavramları matematiğe girmeden anlatmaya, ardından yapay zeka ve şifreleme açısından gerçekçi bir tablo çizmeye çalışacağım.

## Bit ve kübit: temel fark

Bildiğimiz bilgisayarlar bilgiyi **bit** ile saklar: Her bit ya 0 ya da 1'dir. Kuantum bilgisayarlar ise **kübit** (kuantum biti) kullanır.

Kübitin özelliği, ölçülene kadar 0 ve 1'in bir **süperpozisyonu** içinde bulunabilmesidir. Bu sık sık "aynı anda hem 0 hem 1" diye anlatılır, ama bu ifade biraz yanıltıcı. Daha doğru bir sezgi şu: Kübit, ölçüldüğünde 0 ya da 1 çıkma olasılıklarını belirleyen bir durumda bulunur. Ölçtüğünüz anda bu durum tek bir sonuca dönüşür ve siz yalnızca 0 ya da 1 görürsünüz.

İkinci önemli kavram **dolanıklık** (entanglement). Dolanık kübitlerin ölçüm sonuçları, aralarında ne kadar mesafe olursa olsun, klasik dünyada açıklanamayacak biçimde birbiriyle ilişkilidir. Bu, kübitlerin tek tek değil, bir bütün olarak tanımlanması gerektiği anlamına gelir.

Kuantum bilgisayarın gücü, bu özellikleri kullanarak olasılıkları öyle düzenleyebilmesinden gelir ki yanlış cevaplar birbirini sönümlesin, doğru cevap güçlensin. Bu yalnızca belirli yapıdaki problemlerde işe yarar. Yani kuantum bilgisayar "her şeyi aynı anda deneyen" bir süper bilgisayar değildir.

<div class="callout"><strong>İpucu:</strong> "Kuantum bilgisayar tüm olasılıkları aynı anda dener" cümlesini duyduğunuzda temkinli olun. Ölçüm yalnızca tek bir sonuç verir; asıl hüner, doğru cevabın çıkma olasılığını artıracak bir algoritma tasarlamaktır.</div>

## Kuantum bilgisayarlar bugün ne yapabiliyor?

Kuramsal tarafta güçlü sonuçlar var. En bilineni, Peter Shor'un 1994'te sunduğu algoritma: Yeterince büyük ve hatasız bir kuantum bilgisayarın, büyük sayıları asal çarpanlarına çok hızlı ayırabileceğini gösteriyor. Bugün internette yaygın kullanılan RSA gibi şifreleme yöntemlerinin güvenliği tam da bu işlemin zorluğuna dayanıyor. Kuantum bilgisayarlar ayrıca moleküllerin ve malzemelerin davranışını simüle etmek gibi, doğası gereği kuantum olan problemlerde avantaj sağlayabilir.

Pratik tarafta ise tablo daha temkinli. Fizikçi John Preskill 2018'de bugünkü dönemi **NISQ** (Noisy Intermediate-Scale Quantum, gürültülü orta ölçekli kuantum) çağı olarak adlandırdı. Preskill o dönemde yaklaşık 50 ile 100 kübitlik cihazlardan söz ediyordu. Bu tür cihazlarda kübitler gürültüye çok duyarlı ve hatalar hızla birikiyor. Bu da güvenilir biçimde çalıştırılabilecek hesaplamaların boyutunu sınırlıyor.

Hata düzeltme bu yüzden alanın en kritik konusu. Google, Aralık 2024'te tanıttığı 105 kübitlik Willow çipiyle önemli bir eşiğin aşıldığını açıkladı: Kübit sayısı artırıldıkça hata oranının artmak yerine azaldığını gösterdi. Aynı duyuruda Willow'un, rastgele devre örneklemesi adlı bir testi beş dakikadan kısa sürede tamamladığı, aynı işin bugünün en hızlı süper bilgisayarlarından birinde tahminen 10²⁵ yıl süreceği belirtildi. Ancak Google'ın kendisi de bu testin henüz pratik bir ticari uygulaması olmadığını ve bir sonraki hedefin gerçek dünyada işe yarayan bir hesaplama olduğunu vurguladı.

## Kuantum makine öğrenmesi: iddialar ve kanıtlar

Kuantum bilişim ile yapay zekanın kesişimi, "kuantum makine öğrenmesi" adı altında çok ilgi görüyor. Burada iddialarla kanıtları ayırmak özellikle önemli.

| İddia | Bugünkü durum |
|---|---|
| Kuantum bilgisayarlar büyük dil modellerinin eğitimini hızlandıracak | Bunu destekleyen pratik bir gösterim yok; büyük veriyi kuantum bilgisayara yüklemek başlı başına ciddi bir darboğaz |
| Bazı kuantum algoritmaları makine öğrenmesinde üstel hızlanma sağlıyor | Bazı kuramsal sonuçlar var, ancak bir kısmı sonradan klasik algoritmalarla da yakalanabildi |
| Kuantum bilgisayarlar belirli bilimsel problemlerde yardımcı olabilir | Kuramsal olarak güçlü bir beklenti; özellikle kimya ve malzeme simülasyonlarında |

Bu konuda öğretici bir örnek var. Kuantum algoritmalarıyla çalışan bir öneri sisteminin klasik yöntemlere göre üstel hızlanma sağladığı düşünülüyordu. 2018'de Ewin Tang, benzer varsayımlar altında çalışan klasik bir algoritma geliştirerek bu kuantum yönteminin aslında klasik yöntemlere göre üstel bir hızlanma sağlamadığını gösterdi. Bu tür "kuantumdan arındırma" (dequantization) sonuçları, bir kuantum avantajı iddiasını değerlendirirken karşılaştırmanın en iyi klasik yöntemle yapılması gerektiğini hatırlatıyor.

Kendi çalışma alanım olan model değerlendirmesi açısından baktığımda da aynı ilke geçerli: Yeni bir yöntemin başarısını, zayıf bir referansa göre değil, en güçlü alternatife göre ölçmek gerekir. Kasım 2026 itibarıyla, bildiğim kadarıyla, gerçek dünyadaki yaygın makine öğrenmesi görevlerinde kuantum bilgisayarların klasik donanıma göre pratik bir üstünlük sağladığını gösteren güçlü bir kanıt yok. Bu alan araştırma için ilginç, ama yakın vadeli bir yapay zeka devrimi beklentisi için temkinli olmak gerekiyor.

## Kuantum sonrası kriptografi: asıl acil konu

Kuantum bilişimin günlük hayatımızı en yakından ilgilendiren yanı belki de yapay zeka değil, şifreleme. Shor algoritmasını çalıştırabilecek kadar büyük ve hatasız bir kuantum bilgisayarın ne zaman yapılabileceği belirsiz. Ama bir risk bugünden geçerli: Kötü niyetli biri şifreli verileri bugün kaydedip yıllar sonra, uygun bir kuantum bilgisayar ortaya çıktığında çözebilir. Buna "şimdi topla, sonra çöz" (harvest now, decrypt later) yaklaşımı deniyor. Uzun yıllar gizli kalması gereken veriler için bu ciddi bir endişe.

Bu yüzden kuantum bilgisayarlara karşı dayanıklı şifreleme yöntemleri, yani **kuantum sonrası kriptografi** üzerinde yıllardır çalışılıyor. ABD Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) bu alanda önemli bir takvim yürütüyor:

- **13 Ağustos 2024:** NIST ilk üç kuantum sonrası standardı yayımladı. FIPS 203 (ML-KEM) genel şifreleme ve anahtar oluşturma için, FIPS 204 (ML-DSA) ve FIPS 205 (SLH-DSA) dijital imzalar için. NIST, sistem yöneticilerini bu standartlara geçişe hemen başlamaya çağırdı.
- **Mart 2025:** NIST, ML-KEM'e yedek olması için farklı bir matematiksel temele dayanan HQC algoritmasını seçti. Kurum, nihai standardın 2027'de yayımlanmasını beklediğini açıkladı.
- **Ekim 2026:** NIST, geçiş planını anlatan IR 8547 raporunun nihai sürümünü yayımladı. Rapora göre RSA ve eliptik eğri tabanlı yöntemler gibi kuantuma karşı savunmasız açık anahtarlı algoritmalar 2030'dan sonra "kullanımdan kaldırılıyor" (deprecated) sayılacak, 2035'ten sonra ise NIST standartları kapsamında kullanımlarına izin verilmeyecek.

Bu takvim ABD kurumlarına yönelik olsa da NIST standartları dünya genelinde yaygın olarak referans alındığı için birçok ülkede ve sektörde de belirleyici olması bekleniyor.

<div class="callout"><strong>Not:</strong> Bir kurumda bilgi güvenliğinden sorumluysanız atılabilecek ilk adım, hangi sistemlerde hangi şifreleme yöntemlerinin kullanıldığını gösteren bir envanter çıkarmak. Bu yazı genel bilgi amaçlıdır; kurumunuza özgü kararlar için güvenlik uzmanlarına danışmanız en doğrusu.</div>

## Sonuç olarak nasıl düşünmeli?

Kuantum bilişim konusundaki haberleri değerlendirirken birkaç soru işime yarıyor:

- Bu sonuç bir laboratuvar gösterimi mi, yoksa pratik bir problemi mi çözüyor?
- Karşılaştırma en iyi klasik yönteme göre mi yapılmış?
- Hata oranları ve kübit sayısı, iddia edilen uygulama için gerçekten yeterli mi?

Yapay zeka açısından kısa vadede büyük bir dönüşüm beklemek için henüz erken. Şifreleme açısından ise hazırlık için beklemek gerekmiyor; geçiş zaten başladı.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Kübitler süperpozisyon ve dolanıklık sayesinde belirli problemlerde klasik bitlerden farklı davranır, ama "her şeyi aynı anda deneyen" makineler değildir.</li><li>Bugünkü kuantum bilgisayarlar gürültülüdür; hata düzeltmede önemli adımlar atılsa da pratik ticari üstünlük henüz gösterilmedi.</li><li>Kuantum makine öğrenmesi iddialarının bir kısmı, daha iyi klasik algoritmalarla yakalanabildi.</li><li>NIST ilk kuantum sonrası şifreleme standartlarını Ağustos 2024'te yayımladı.</li><li>NIST'in Ekim 2026'daki raporuna göre kuantuma karşı savunmasız açık anahtarlı yöntemler 2030'dan sonra kullanımdan kaldırılacak, 2035'ten sonra izin verilmeyecek.</li></ul></div>

<div class="faq"><details><summary>Kuantum bilgisayarlar bugün şifreleri kırabiliyor mu?</summary><p>Bilinen kamuya açık kuantum bilgisayarlar, bugün yaygın kullanılan RSA gibi şifreleri kıracak büyüklükte ve hatasızlıkta değil. Ancak şifreli verilerin bugün toplanıp gelecekte çözülme riski nedeniyle geçiş şimdiden başladı.</p></details><details><summary>Kuantum bilgisayarlar yapay zekayı hızlandıracak mı?</summary><p>Bazı kuramsal olasılıklar var, ama gerçek dünyadaki yaygın makine öğrenmesi görevlerinde pratik bir üstünlük henüz gösterilmiş değil. Yakın vadede yapay zekadaki ilerlemenin ana kaynağı klasik donanım olmaya devam ediyor.</p></details><details><summary>Kuantum sonrası kriptografi kuantum bilgisayar gerektiriyor mu?</summary><p>Hayır. Bu yöntemler bugünkü klasik bilgisayarlarda çalışan, ama kuantum bilgisayarların saldırılarına karşı dayanıklı olacak şekilde tasarlanmış matematiksel problemlere dayanan algoritmalardır.</p></details><details><summary>Bireysel kullanıcı olarak bir şey yapmam gerekiyor mu?</summary><p>Çoğu durumda doğrudan bir şey yapmanız gerekmez; geçiş, tarayıcılar, işletim sistemleri ve hizmet sağlayıcılar tarafından yapılacak. Yazılımlarınızı güncel tutmak, bu geçişten yararlanmanın en basit yolu.</p></details></div>

---

**Kaynaklar**

- [NIST – NIST Releases First 3 Finalized Post-Quantum Encryption Standards (2024)](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [NIST – NIST Selects HQC as Fifth Algorithm for Post-Quantum Encryption (2025)](https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption)
- [NIST IR 8547, Transition to Post-Quantum Cryptography Standards (2026)](https://csrc.nist.gov/pubs/ir/8547/final)
- [Google – Meet Willow, our state-of-the-art quantum chip (2024)](https://blog.google/technology/research/google-willow-quantum-chip/)
- [Preskill (2018), Quantum Computing in the NISQ era and beyond – arXiv](https://arxiv.org/abs/1801.00862)
- [Tang (2018), A quantum-inspired classical algorithm for recommendation systems – arXiv](https://arxiv.org/abs/1807.04271)
