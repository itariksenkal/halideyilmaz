---
title: "Bulut Bilişim Temelleri: Hizmet Modelleri, Maliyet ve KVKK"
description: "IaaS, PaaS ve SaaS, bölgeler, kullandıkça öde maliyet tuzakları, paylaşılan sorumluluk modeli ve KVKK kapsamında yurt dışına veri aktarımına genel bakış."
publishDate: "2026-11-20T09:17:00+03:00"
lang: tr
category: "Altyapı"
tags: ["Bulut Bilişim", "KVKK", "Bilgi Güvenliği"]
translation: "cloud-computing-basics"
heroImage:
  src: "../../../assets/blog/covers/bulut-bilisim-temelleri.jpg"
  alt: "Farklı bölgelerdeki veri merkezlerine bağlanan bulut altyapısının şematik görünümü"
---

Bir uygulamayı yayına almak için artık sunucu satın alıp bir odaya yerleştirmek gerekmiyor; birkaç dakika içinde, kredi kartıyla, dünyanın farklı bölgelerindeki veri merkezlerinde kaynak kiralamak mümkün. Bu kolaylık bulut bilişimi kurumların büyük kısmı için varsayılan seçenek hâline getirdi. Ancak bulut, "başkasının bilgisayarı" olmanın ötesinde, kendine özgü bir maliyet mantığı, güvenlik sorumluluğu paylaşımı ve Türkiye'den bakıldığında kişisel verilerin yurt dışına aktarımı gibi hukuki boyutları olan bir model. Bu yazıda bulutun temel kavramlarını ve karar verirken göz önünde bulundurulması gereken noktaları genel hatlarıyla ele almak istiyorum.

## Bulut bilişim nedir?

En sık atıf yapılan tanımlardan biri, ABD Ulusal Standartlar ve Teknoloji Enstitüsü'nün (NIST) Eylül 2011'de yayımladığı SP 800-145 belgesine ait. Bu tanıma göre bulut bilişim; yapılandırılabilir bilişim kaynaklarından (ağlar, sunucular, depolama, uygulamalar ve hizmetler) oluşan ortak bir havuza, ağ üzerinden, ihtiyaç anında erişimi sağlayan ve bu kaynakların asgari yönetim çabasıyla hızla tahsis edilip serbest bırakılabildiği bir modeldir.

NIST bu modeli beş temel özellikle tarif eder: Kullanıcının kaynakları kendi başına talep edebilmesi, geniş ağ erişimi, kaynakların birçok müşteri arasında havuzlanması, hızlı esneklik (ihtiyaca göre büyüyüp küçülme) ve ölçülen hizmet (kullanılan kadar ödeme). Aynı belge dört dağıtım modeli de tanımlar: Genel (public), özel (private), topluluk (community) ve hibrit bulut.

## IaaS, PaaS ve SaaS

Bulut hizmetleri, sağlayıcının ne kadarını yönettiğine göre üç ana modelde toplanır:

| Model | Siz ne alırsınız? | Kim neyi yönetir? | Örnek kullanım |
|---|---|---|---|
| IaaS (Altyapı olarak hizmet) | Sanal sunucu, depolama, ağ | Sağlayıcı fiziksel altyapıyı; siz işletim sistemini, yazılımı ve veriyi | Kendi yapılandırdığınız sunucularda uygulama çalıştırmak |
| PaaS (Platform olarak hizmet) | Uygulama çalıştırma ortamı, yönetilen veritabanı | Sağlayıcı işletim sistemini ve çalışma ortamını; siz kodu ve veriyi | Kodu yükleyip sunucu yönetmeden çalıştırmak |
| SaaS (Yazılım olarak hizmet) | Kullanıma hazır uygulama | Sağlayıcı neredeyse her şeyi; siz kullanıcıları, ayarları ve veriyi | E-posta, ofis yazılımları, müşteri yönetimi |

Yukarıdan aşağıya indikçe yönetim yükünüz azalır, ama kontrolünüz ve özelleştirme imkânınız da azalır. Doğru model, ekibinizin neyi yönetmek istediğine ve neyi yönetebileceğine bağlıdır.

## Bölgeler ve erişilebilirlik alanları

Büyük bulut sağlayıcıları altyapılarını "bölgeler" hâlinde düzenler. Örneğin AWS, bölgeyi veri merkezlerinin kümelendiği coğrafi bir konum olarak tanımlıyor; her bölge, fiziksel olarak birbirinden ayrı birden fazla erişilebilirlik alanından (availability zone) oluşuyor. AWS'nin belgelerine göre bir bölgede oluşturduğunuz kaynaklar ve veriler, siz açıkça bir kopyalama ya da çoğaltma yapmadıkça başka bir bölgede bulunmuyor.

Bölge seçimi üç açıdan önemlidir: Kullanıcılara yakınlık (gecikme), arızalara karşı dayanıklılık (birden fazla alana ya da bölgeye yayılmak) ve verinin fiziksel olarak nerede durduğu. Sonuncusu, aşağıda değineceğim hukuki yükümlülükler açısından özellikle kritiktir.

## Kullandıkça öde: maliyet tuzakları

Bulutun en çekici yanlarından biri, kullandığınız kadar ödemenizdir. Ama bu esneklik, harcamanın kolayca kontrolden çıkabileceği anlamına da gelir. Sık karşılaşılan tuzaklar:

- **Unutulan kaynaklar:** Bir deneme için açılıp kapatılmayan sanal sunucular, kullanılmayan diskler ve eski yedek kopyaları sessizce faturaya eklenir.
- **Veri çıkış ücretleri:** Birçok sağlayıcı, buluttan dışarıya ya da bölgeler arasında aktarılan veriyi ayrıca ücretlendirir. Mimari kararlar bu maliyeti büyük ölçüde belirler.
- **Sınırsız otomatik ölçekleme:** Trafiğe göre büyüyen bir sistem, beklenmedik bir yük ya da hatalı bir döngü karşısında maliyeti de büyütür.
- **Günlük ve izleme verileri:** Her şeyi kaydetmek faydalı görünür, ama günlük (log) depolama ve sorgulama da ücretlidir.
- **Yönetilen hizmetlerin fiyat yapısı:** Bazı hizmetler istek sayısına, bazıları çalışma süresine, bazıları okunan veri miktarına göre ücretlendirilir; aynı iş farklı hizmetlerde çok farklı maliyet çıkarabilir.

<div class="callout"><strong>İpucu:</strong> Bulut hesabını açtığınız ilk gün bir bütçe ve harcama uyarısı tanımlayın, kaynakları proje veya ekip bazında etiketleyin. Fatura geldiğinde değil, harcama başladığında haberdar olmak çok daha az sürprizli bir deneyimdir.</div>

## Paylaşılan sorumluluk modeli

Bulutta güvenlik, sağlayıcı ile müşteri arasında paylaşılır. AWS bunu "bulutun güvenliği" ve "buluttaki güvenlik" ayrımıyla anlatıyor: Sağlayıcı, hizmetlerin üzerinde çalıştığı fiziksel altyapıdan ve temel yazılım katmanlarından sorumlu; müşteri ise kendi verisinden, bu verinin şifrelenmesine ilişkin seçimlerden, varlıklarının sınıflandırılmasından ve erişim yetkilerinin doğru tanımlanmasından sorumlu. Müşterinin payı, kullandığı hizmetin türüne göre değişiyor: IaaS'ta işletim sistemi güncellemeleri de çoğu zaman müşteriye aitken, SaaS'ta bu sorumluluk büyük ölçüde sağlayıcıdadır.

Pratikte bulutla ilgili güvenlik olaylarının önemli bir kısmı, sağlayıcının altyapısındaki bir açıktan değil, müşterinin yaptığı yapılandırma hatalarından kaynaklanır: Herkese açık bırakılmış bir depolama alanı, gereğinden geniş yetkiler ya da kod deposunda unutulmuş bir erişim anahtarı gibi.

## Türkiye'den bakınca: KVKK ve yurt dışına veri aktarımı

Kullandığınız bulut hizmetinin sunucuları yurt dışındaysa ve bu hizmette kişisel veri işliyorsanız, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) yurt dışına aktarıma ilişkin 9. maddesi gündeme gelir. Bu madde 2024'te 7499 sayılı Kanun ile kapsamlı biçimde değiştirildi; yeni hâli 1 Haziran 2024'te yürürlüğe girdi, eski düzenlemenin açık rızaya dayalı birinci fıkrası ise bir geçiş dönemi olarak 1 Eylül 2024'e kadar yeni hükümlerle birlikte uygulanmaya devam etti. Uygulamanın usul ve esasları da 2024 yılında yayımlanan bir yönetmelikle düzenlendi.

Yeni düzenleme genel hatlarıyla kademeli bir yapı kuruyor:

1. **Yeterlilik kararı:** Kişisel Verileri Koruma Kurulu'nun bir ülke, ülke içindeki sektörler ya da uluslararası kuruluşlar hakkında yeterlilik kararı vermesi hâlinde, Kanun'daki işleme şartlarından biri de varsa aktarım yapılabiliyor.
2. **Uygun güvenceler:** Yeterlilik kararı yoksa; Kurul'un ilan ettiği standart sözleşme, Kurul onaylı bağlayıcı şirket kuralları ya da Kurul izniyle yazılı taahhütname gibi güvencelerle aktarım mümkün. Standart sözleşmenin imzalanmasından itibaren beş iş günü içinde Kurum'a bildirilmesi gerekiyor ve bu yükümlülüğe uymamanın idari para cezası yaptırımı var. Kurum, bu bildirim için 25 Ekim 2024'te çevrim içi bir bildirim modülünü kullanıma açtı.
3. **Arızi aktarımlar:** Yeterlilik kararı ve uygun güvence bulunmadığında, yalnızca arızi (süreklilik taşımayan) durumlarda; örneğin riskler hakkında bilgilendirilmiş ilgili kişinin açık rızasıyla ya da bir sözleşmenin ifası için zorunluysa aktarım yapılabiliyor.

Bunlara ek olarak, bankacılık gibi bazı sektörlerde verinin yurt içinde tutulmasına ilişkin ayrı düzenlemeler bulunabiliyor; Kanun da diğer kanunlardaki yurt dışına aktarım hükümlerini saklı tutuyor. Bu nedenle bulut sağlayıcısı ve bölge seçimi, yalnızca teknik bir karar değil, hukuk ve uyum ekipleriyle birlikte verilmesi gereken bir karardır.

*Bu bölüm genel bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez; somut durumlar için güncel mevzuatı ve uzman görüşünü esas alın.*

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Bulut bilişim, paylaşılan bir kaynak havuzuna ağ üzerinden, ihtiyaç anında ve ölçülerek erişim modelidir.</li><li>IaaS'tan SaaS'a doğru gidildikçe yönetim yükü azalır, kontrol ve özelleştirme imkânı da azalır.</li><li>Kullandıkça öde modelinde unutulan kaynaklar, veri çıkış ücretleri ve sınırsız ölçekleme en sık görülen maliyet tuzaklarıdır.</li><li>Güvenlik paylaşılır: Sağlayıcı altyapıdan, müşteri kendi verisinden, yapılandırmasından ve erişim yetkilerinden sorumludur.</li><li>Yurt dışındaki sunucularda kişisel veri işlemek, 2024'te değişen KVKK 9. madde kapsamında değerlendirilmelidir.</li></ul></div>

<div class="faq"><details><summary>Bulut her zaman kendi sunucularımızdan daha mı ucuz?</summary><p>Hayır. Değişken ya da öngörülemeyen yükler için bulut genellikle avantajlıdır. Sürekli ve sabit yüklerde, uzun vadeli toplam maliyeti kendi altyapınızla karşılaştırmak gerekir. Personel, bakım ve güvenlik maliyetlerini de hesaba katmak önemlidir.</p></details><details><summary>Bulutta veri güvende mi?</summary><p>Büyük sağlayıcılar fiziksel ve altyapı güvenliğine ciddi yatırımlar yapar, ancak paylaşılan sorumluluk modeli gereği verinin, erişim yetkilerinin ve yapılandırmanın güvenliği büyük ölçüde müşteriye aittir.</p></details><details><summary>Yurt dışındaki bir bulut hizmetini kullanmak KVKK'ya aykırı mı?</summary><p>Kendiliğinden aykırı değildir, ancak kişisel veri işleniyorsa yurt dışına aktarım kurallarına uyulması gerekir: yeterlilik kararı, uygun güvenceler ya da sınırlı arızi istisnalar. Hangi yolun uygun olduğu somut duruma göre değerlendirilmelidir.</p></details><details><summary>Hangi hizmet modelini seçmeliyim?</summary><p>Altyapıyı yönetecek ekibiniz ve özel ihtiyaçlarınız varsa IaaS, uygulamaya odaklanmak istiyorsanız PaaS, hazır bir çözüm yetiyorsa SaaS genellikle doğru başlangıçtır.</p></details></div>

---

**Kaynaklar**

- [NIST SP 800-145 – The NIST Definition of Cloud Computing](https://csrc.nist.gov/pubs/sp/800/145/final)
- [AWS – Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)
- [AWS Whitepaper – AWS Fault Isolation Boundaries: Regions](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/regions.html)
- [Mevzuat Bilgi Sistemi – 6698 sayılı Kişisel Verilerin Korunması Kanunu](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6698&MevzuatTur=1&MevzuatTertip=5)
- [KVKK – Standart Sözleşme Bildirim Modülü Hakkında Kamuoyu Duyurusu](https://www.kvkk.gov.tr/Icerik/8043/Standart-Sozlesme-Bildirim-Modulu-Hakkinda-Kamuoyu-Duyurusu)
