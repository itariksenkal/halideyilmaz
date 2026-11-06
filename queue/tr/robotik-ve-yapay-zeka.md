---
title: "Robotik ve Yapay Zeka: Fiziksel Dünya Neden Bu Kadar Zor?"
description: "Moravec paradoksu, algılama-planlama-kontrol döngüsü, gösterimden öğrenme, robotlar için temel modeller ve insansı robotlarda abartı ile gerçek."
publishDate: "2026-12-04T09:17:00+03:00"
lang: tr
category: "Uygulama"
tags: ["Robotik", "Yapay Zeka", "İnsansı Robotlar"]
translation: "robotics-and-ai"
heroImage:
  src: "../../../assets/blog/covers/robotik-ve-yapay-zeka.jpg"
  alt: "Bir masa üzerindeki nesneleri kavramaya çalışan iki kollu bir robot"
---

Bugün bir yapay zeka modeli karmaşık bir hukuk metnini özetleyebiliyor, kod yazabiliyor, sınav sorularını çözebiliyor. Ama aynı yapay zekadan bulaşık makinesini boşaltmasını ya da dağınık bir masadan kalemleri toplamasını istediğinizde iş birden zorlaşıyor. Bu çelişki, robotik ile yapay zekanın kesiştiği noktadaki en ilginç sorulardan birini doğuruyor: Bizim için kolay olan şeyler makineler için neden bu kadar zor? Son yıllarda bu alanda gerçekten heyecan verici gelişmeler oldu; ama aynı zamanda abartılı beklentiler de. Bu yazıda robotların neden zor olduğunu, son dönemde neyin değiştiğini ve insansı robotlar konusunda neye dikkat etmek gerektiğini anlatmaya çalışacağım.

## Moravec paradoksu: kolay olan zor, zor olan kolay

Robotik araştırmacısı Hans Moravec, 1988'de yayımlanan "Mind Children" kitabında şu gözlemi dile getirdi: Bilgisayarlara zeka testlerinde yetişkin düzeyinde performans göstertmek görece kolay; ama onlara bir yaşındaki bir bebeğin algılama ve hareket becerilerini kazandırmak son derece zor. Bu gözlem bugün **Moravec paradoksu** olarak biliniyor.

Bunun bir açıklaması evrimle ilgili. Görmek, yürümek, bir nesneyi kavramak gibi beceriler milyonlarca yıllık bir sürecin ürünü ve beynimiz bunları farkına bile varmadan yapıyor. Satranç ya da matematik ise insanlık tarihinde görece yeni ve bilinçli çaba gerektiren beceriler. Bize zor gelenler aslında sadece daha "görünür" olanlar.

Bir robot için bir bardağı kaldırmak şu soruların hepsini çözmeyi gerektirir: Bardak tam olarak nerede, ne kadar ağır, yüzeyi kaygan mı, içinde sıvı var mı, ne kadar sıkı tutmalıyım, kolumu hangi yoldan götürmeliyim ki hiçbir şeye çarpmayayım? Üstelik bu soruların cevapları her bardakta, her masada ve her ışık koşulunda biraz farklıdır.

## Algılama, planlama, kontrol

Geleneksel olarak bir robotun işi üç parçaya ayrılır:

| Bileşen | Ne yapar? | Tipik zorluklar |
|---|---|---|
| Algılama | Kamera, derinlik sensörü, dokunma sensörü gibi kaynaklardan dünyayı anlamak | Kötü ışık, yansıyan yüzeyler, birbirini kapatan nesneler |
| Planlama | Hedefe ulaşmak için bir eylem dizisi belirlemek | Belirsizlik, değişen ortam, çok sayıda olası yol |
| Kontrol | Motorlara doğru komutları anlık olarak göndermek | Sürtünme, gecikme, beklenmedik temaslar |

Fabrikalardaki endüstriyel robotlar onlarca yıldır çok başarılı. Ama bu başarının sırrı, ortamın sıkı biçimde kontrol edilmesi: Parça her seferinde aynı yerde, aynı yönde duruyor. Ev, hastane ya da depo gibi dağınık ve sürekli değişen ortamlarda ise algılama ve planlamanın yükü katlanarak artıyor. Asıl zorluk, kontrollü fabrika ortamından gerçek dünyanın düzensizliğine geçebilmek.

## Gösterimden öğrenme

Bir robota her hareketi tek tek programlamak yerine, ona işi göstererek öğretmek mümkün mü? **Gösterimden öğrenme** (learning from demonstration) ya da taklit yoluyla öğrenme bu fikre dayanıyor.

Tipik bir yöntem şöyle: Bir insan, robotu uzaktan kumandayla (teleoperasyon) yönlendirerek bir görevi birçok kez yapıyor. Bu sırada kamera görüntüleri ve robotun hareketleri kaydediliyor. Ardından bir model, "bu görüntüyü gördüğümde bu hareketi yapmalıyım" ilişkisini bu kayıtlardan öğreniyor.

Bu yaklaşımın güçlü yanı, insanların kolayca gösterebildiği ama tarif etmekte zorlandığı becerileri, örneğin bir kumaşı katlamayı, robota aktarabilmesi. Zayıf yanı ise veri toplamanın pahalı ve yavaş olması: Her gösterim için bir insanın gerçek zamanlı çalışması gerekiyor. Ayrıca robot, gösterimlerde hiç karşılaşmadığı bir durumla karşılaştığında ne yapacağını bilemeyebiliyor.

<div class="callout"><strong>İpucu:</strong> Bir robot videosunu izlerken açıklamada "teleoperated" (uzaktan kumandalı) ya da "autonomous" (otonom) ibaresine bakın. İkisi arasındaki fark, robotun gerçekte ne kadar "akıllı" olduğunu anlamak için çok önemli.</div>

## Robotlar için temel modeller

Son birkaç yılda dil modellerindeki başarı, robotik araştırmacılarını da benzer bir soruya yöneltti: Çok büyük ve çeşitli verilerle eğitilmiş genel amaçlı bir model, robotları da daha genel becerili hâle getirebilir mi?

Bu yönde öne çıkan birkaç örnek:

- **RT-2 (Temmuz 2023):** Google DeepMind'ın tanıttığı bu model, web verisiyle eğitilmiş görüntü-dil modellerini robot verisiyle ince ayarlayarak doğrudan robot eylemleri üretiyordu. Bu tür modellere **görüntü-dil-eylem** (vision-language-action, VLA) modelleri deniyor. DeepMind'ın bildirdiğine göre RT-2, daha önce görmediği senaryolarda başarı oranını önceki modelin yüzde 32'sinden yüzde 62'ye çıkardı.
- **Open X-Embodiment (Ekim 2023):** 21 kurumun iş birliğiyle 22 farklı robot türünden toplanan verileri bir araya getiren bir çalışma. Proje sayfasına göre veri seti bir milyonu aşkın gerçek robot hareket kaydı içeriyor. Amaç, farklı robotlardan toplanan verilerle eğitilen bir modelin her bir robota daha iyi genelleyip genelleyemeyeceğini sınamaktı.
- **Gemini Robotics (Mart 2025):** Google DeepMind'ın Gemini 2.0 üzerine kurduğu VLA modeli. Şirket, modelin yeni nesnelere, ortamlara ve talimatlara uyum sağlayabildiğini ve origami katlamak gibi ince beceri gerektiren görevleri yapabildiğini açıkladı.

Bu gelişmeler gerçek bir ilerlemeyi temsil ediyor. Ama bir noktanın altını çizmek gerekiyor: Bu sonuçların büyük kısmı araştırma ortamlarında, belirli görevler ve belirli ölçütlerle elde edildi. Bir modelin laboratuvardaki başarısı, aynı modelin bir evde ya da depoda yıllarca güvenilir biçimde çalışacağı anlamına gelmiyor.

## İnsansı robotlar: abartı ve gerçek

Son yıllarda insansı (humanoid) robotlar büyük ilgi görüyor. Birçok şirket insan biçimli robotlar geliştirdiğini açıkladı ve etkileyici videolar yayımladı. Örneğin Boston Dynamics, Nisan 2024'te hidrolik Atlas robotunu emekliye ayırdığını ve tamamen elektrikli yeni bir Atlas geliştirdiğini duyurdu; ilk ortağın Hyundai olacağını ve uygulamaların önümüzdeki yıllarda sınırlı sayıda müşteriyle test edileceğini belirtti.

İnsan biçiminin mantıklı bir gerekçesi var: Dünyamız insanlar için tasarlandı. Merdivenler, kapı kolları, raflar ve aletler insan bedenine göre şekillendi. İnsan biçimli bir robot, teoride bu ortamlara ek bir düzenleme gerekmeden uyum sağlayabilir.

Ancak bu alandaki haberleri okurken bazı soruları akılda tutmak faydalı:

- **Gösterim mi, üretim mi?** Bir videoda bir görevi yapmak ile o görevi günde binlerce kez, düşük hata oranıyla ve güvenli biçimde yapmak çok farklı şeyler.
- **Otonom mu, kumandalı mı?** Bazı gösterimlerde robotlar kısmen ya da tamamen bir insan tarafından yönlendiriliyor.
- **Maliyet ve verim:** Belirli bir iş için tekerlekli bir platform ya da sabit bir robot kolu çoğu zaman daha ucuz ve daha güvenilir bir çözüm olabilir.
- **Güvenlik:** İnsanlarla aynı ortamda çalışan, ağır ve güçlü bir makinenin güvenliği ayrıca ciddi bir mühendislik ve düzenleme konusu.

Kasım 2026 itibarıyla benim değerlendirmem şu: İnsansı robotlar ilginç bir araştırma ve pilot uygulama alanı, ama bunların evlerde ve iş yerlerinde yaygın, güvenilir ve ekonomik biçimde çalıştığını gösteren kamuya açık kanıtlar hâlâ sınırlı. Bu, gelecekte olmayacağı anlamına gelmiyor; sadece haberlerdeki heyecanı biraz temkinle okumak gerektiğini gösteriyor.

<div class="callout"><strong>Not:</strong> Robotik alanındaki duyurular hızla değişiyor. Bir şirketin "yakında" dediği bir ürünün takvimini değerlendirirken, geçmişteki duyurularının ne kadarının zamanında gerçekleştiğine bakmak iyi bir ölçüt olabilir.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Moravec paradoksu, bizim için kolay olan algılama ve hareket becerilerinin makineler için en zor işler olduğunu hatırlatıyor.</li><li>Robotların işi algılama, planlama ve kontrol olarak ayrılabilir; asıl zorluk kontrolsüz ve değişken ortamlar.</li><li>Gösterimden öğrenme, insanların kolayca yapıp zor tarif ettiği becerileri robotlara aktarmanın güçlü bir yolu.</li><li>RT-2, Open X-Embodiment ve Gemini Robotics gibi çalışmalar, büyük modellerin robotlara genelleme kazandırabileceğini gösteriyor.</li><li>İnsansı robotlarda etkileyici gösterimlerle güvenilir, ekonomik kullanım arasında hâlâ önemli bir mesafe var.</li></ul></div>

<div class="faq"><details><summary>Moravec paradoksu bugün hâlâ geçerli mi?</summary><p>Büyük ölçüde evet. Dil ve akıl yürütme gerektiren görevlerde yapay zeka çok hızlı ilerledi, ama gerçek dünyada güvenilir algılama ve hassas hareket hâlâ zor problemler olarak duruyor. Son yıllardaki gelişmeler bu mesafeyi daraltıyor, ama kapatmış değil.</p></details><details><summary>Görüntü-dil-eylem (VLA) modeli nedir?</summary><p>Kamera görüntülerini ve doğal dildeki talimatları girdi olarak alıp doğrudan robot eylemleri üreten modellerdir. Genellikle web verisiyle eğitilmiş büyük modellerin robot verisiyle ince ayarlanmasıyla oluşturulur.</p></details><details><summary>İnsansı robotlar yakında evlere girecek mi?</summary><p>Bu konuda kesin bir tarih vermek mümkün değil. Pilot uygulamalar ve araştırmalar sürüyor, ancak güvenlik, maliyet ve güvenilirlik konularında aşılması gereken ciddi engeller var.</p></details><details><summary>Robotik alanında çalışmak için nereden başlamalı?</summary><p>Programlama, lineer cebir ve temel kontrol kuramıyla başlamak iyi bir temel oluşturur. Simülasyon ortamlarında çalışmak, pahalı donanıma ihtiyaç duymadan deneyim kazanmanın pratik bir yoludur.</p></details></div>

---

**Kaynaklar**

- [Google DeepMind – RT-2: New model translates vision and language into action (2023)](https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/)
- [Open X-Embodiment Collaboration (2023), Open X-Embodiment: Robotic Learning Datasets and RT-X Models – arXiv](https://arxiv.org/abs/2310.08864)
- [Open X-Embodiment proje sayfası](https://robotics-transformer-x.github.io/)
- [Google DeepMind – Gemini Robotics brings AI into the physical world (2025)](https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/)
- [Boston Dynamics – An electric new era for Atlas](https://bostondynamics.com/blog/electric-new-era-for-atlas/)
