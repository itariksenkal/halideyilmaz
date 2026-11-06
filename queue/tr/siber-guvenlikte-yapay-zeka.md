---
title: "Siber Güvenlikte Yapay Zeka: Kalkan da Kılıç da Aynı Teknoloji"
description: "Yapay zeka oltalamayı ve zararlı yazılımı yakalamaya yardım ediyor ama saldırganları da güçlendiriyor. Kurumlar ve bireyler için iki taraflı bir rehber."
publishDate: "2026-11-21T09:17:00+03:00"
lang: tr
category: "Güvenlik"
tags: ["Siber Güvenlik", "Yapay Zeka", "Oltalama", "Deepfake"]
translation: "ai-in-cybersecurity"
heroImage:
  src: "../../../assets/blog/covers/siber-guvenlikte-yapay-zeka.jpg"
  alt: "Ağ trafiğini izleyen bir güvenlik paneli ve kilit simgesi"
---

Siber güvenlikte yapay zeka denince akla genellikle iki zıt görüntü gelir: saldırıları kendiliğinden durduran akıllı bir kalkan ya da her şeyi kıran görünmez bir korsan. Gerçek bu ikisinin arasında bir yerde ve biraz daha sıkıcı, ama çok daha önemli. Aynı teknikler hem savunanların hem de saldıranların elinde. Model değerlendirme ve veri kalitesi üzerine çalışan biri olarak bu yazıda yapay zekanın iki tarafta da ne işe yaradığını, nerede abartıldığını ve hem kurumların hem de bizim gibi sıradan kullanıcıların neler yapabileceğini sade bir dille toparlamaya çalışacağım.

## Neden iki taraflı bir hikâye?

Yapay zekanın güvenlikteki gücü, çok büyük miktarda veriden örüntü çıkarabilmesinden gelir. Bir güvenlik ekibi günde milyonlarca e-posta, oturum açma kaydı ve ağ bağlantısıyla karşı karşıya kalabilir; bunları tek tek insan gözüyle incelemek imkânsızdır. Model, "normal" görünen davranışı öğrenir ve sıra dışı olanı işaretler.

Ne var ki örüntü üretmek de örüntü tanımak kadar kolaylaştı. Dil modelleri akıcı, kişiye özel ve dil hatası içermeyen metinler yazabiliyor; ses ve görüntü üreten modeller birkaç saniyelik kayıttan bir insanın sesini taklit edebiliyor. Yani savunmayı güçlendiren aynı ilerleme, saldırganın maliyetini de düşürüyor.

| Savunma tarafında | Saldırı tarafında |
|---|---|
| Oltalama e-postalarını sınıflandırma | Daha ikna edici, hatasız oltalama metinleri |
| Zararlı yazılımı davranışından tanıma | Kod üretimini ve denemeyi hızlandırma |
| Ağda anormallik tespiti | Hedef hakkında bilgi toplamayı otomatikleştirme |
| Uyarıları önceliklendirme | Sahte ses ve görüntüyle kimlik taklidi |

## Savunmada yapay zeka: oltalama ve zararlı yazılım

E-posta kutunuza düşmeyen sahte mesajların önemli bir kısmı, arka planda çalışan sınıflandırıcılar sayesinde ayıklanıyor. Bu modeller yalnızca metne bakmaz; gönderen alan adının geçmişi, bağlantıların nereye gittiği, ekin türü, mesajın gönderildiği saat ve benzer binlerce sinyali birlikte değerlendirir. Tek bir kural ("içinde 'acil' geçiyorsa engelle") kolayca atlatılabilir, ama çok sayıda zayıf sinyalin birleşimi daha dayanıklıdır.

Zararlı yazılım tespitinde de benzer bir değişim yaşandı. Eski yaklaşım, bilinen zararlıların "imzalarını" bir listede tutmaktı; listede olmayan yeni bir varyant kolayca geçebiliyordu. Makine öğrenmesi tabanlı sistemler ise bir programın ne yaptığına bakar: hangi dosyalara dokunuyor, hangi ağ adreslerine bağlanıyor, kendini gizlemeye çalışıyor mu? Bu davranışsal yaklaşım, daha önce görülmemiş tehditleri yakalama şansını artırır.

Ancak burada değerlendirme tarafından gelen bir uyarıyı paylaşmam gerek: Bir güvenlik modelinin "yüzde 99 doğrulukla" çalışması tek başına bir şey söylemez. Günde bir milyon olayın işlendiği bir ortamda yüzde 1'lik yanlış alarm, on bin gereksiz uyarı demektir. Güvenlik ekipleri bu yüzden modelleri yalnızca isabet oranıyla değil, ürettikleri uyarı yüküyle de değerlendirir.

## Ağda anormallik tespiti

Anormallik tespiti, "kötü olanı tanımak" yerine "normal olanı öğrenmek" fikrine dayanır. Örneğin bir muhasebe çalışanının hesabı her gün mesai saatlerinde aynı birkaç sunucuya bağlanıyorsa, gece üçte yurt dışından oturum açıp gigabaytlarca veri indirmesi dikkat çekici bir sapmadır. Model bunun saldırı olduğunu bilmez; yalnızca alışılmışın dışında olduğunu söyler.

Bu yaklaşımın güçlü yanı, adı henüz konmamış saldırıları da yakalayabilmesidir. Zayıf yanı ise "alışılmadık" ile "tehlikeli" arasındaki farkı ayırt edememesidir. Yeni bir yazılımın devreye alınması ya da yoğun bir dönem, sistem için de anormal görünür. Bu nedenle anormallik tespiti iyi bir insan ekibinin yerine geçmez; ona nereye bakması gerektiğini gösteren bir el feneri işlevi görür.

<div class="callout"><strong>İpucu:</strong> Bir güvenlik ürününün yapay zeka iddiasını değerlendirirken "Kaç yanlış alarm üretiyor ve bunları kim, ne kadar sürede inceliyor?" sorusunu sormak, doğruluk yüzdesini sormaktan genellikle daha öğreticidir.</div>

## Saldırganların elindeki yapay zeka

Avrupa Birliği Siber Güvenlik Ajansı ENISA'nın 1 Temmuz 2024 ile 30 Haziran 2025 arasındaki 4.875 olayı incelediği 2025 Tehdit Ortamı raporu, kimlik avını (oltalama) sistemlere ilk sızma yollarının başında gösteriyor ve büyük dil modellerinin oltalama ile sosyal mühendisliği iyileştirmek için kullanıldığına dikkat çekiyor. Eskiden sahte e-postaları ele veren bozuk dil bilgisi, tuhaf hitaplar ve çeviri kokan cümleler artık güvenilir bir işaret değil.

Daha çarpıcı olan, ses ve görüntü taklidi. ABD Federal Soruşturma Bürosu'nun (FBI) İnternet Suçları Şikâyet Merkezi, 3 Aralık 2024'te yayımladığı uyarıda dolandırıcıların üretken yapay zekayı metin, görsel, ses klonlama ve sahte canlı görüntülü görüşmeler için kullandığını anlattı. Bunun en çok konuşulan örneklerinden biri, 2024'ün başında Hong Kong'da yaşandı: Mühendislik şirketi Arup'un bir çalışanı, şirketin finans yöneticisi ve meslektaşları gibi görünen kişilerle yaptığı görüntülü toplantının ardından toplam yaklaşık 200 milyon Hong Kong doları transfer etti. Toplantıdaki kişilerin sahte, yani deepfake olduğu sonradan anlaşıldı; şirket olayı Mayıs 2024'te doğruladı.

Bu örnek önemli, çünkü saldırının teknik bir açıktan değil, insanların "gözümle gördüm, sesini duydum" güveninden faydalandığını gösteriyor. Yapay zeka burada sisteme sızmıyor; insanı ikna ediyor.

## Kurumlar ne yapmalı?

Kurumlar için en etkili adımlar çoğu zaman yapay zekayla doğrudan ilgili değil, ama yapay zeka çağında daha da önemli hâle geliyor:

- **Oltalamaya dayanıklı çok faktörlü doğrulama:** ABD Siber Güvenlik ve Altyapı Güvenliği Ajansı (CISA), SMS ya da uygulama kodlarının da çalınabileceğini hatırlatarak FIDO/WebAuthn tabanlı güvenlik anahtarları ve geçiş anahtarları gibi yöntemleri öneriyor. Parola ve kod ne kadar ikna edici bir sahte sayfaya girilirse girilsin, bu yöntemler yanlış siteye kimlik bilgisini vermez.
- **Para ve yetki taleplerinde ikinci kanal:** Ödeme, tedarikçi hesabı değişikliği veya yetki yükseltme gibi talepler, gelen kanaldan bağımsız, önceden bilinen bir yolla doğrulanmalı. Görüntülü görüşme artık tek başına kimlik kanıtı değil.
- **Yapay zeka araçları için kullanım kuralları:** Çalışanların gizli verileri hangi araçlara girebileceği açıkça belirlenmeli.
- **Bir çerçeveye dayanmak:** ABD Ulusal Standartlar ve Teknoloji Enstitüsü'nün (NIST) Siber Güvenlik Çerçevesi gibi yapılar, yapay zekayı ayrı bir sihirli katman olarak değil, genel risk yönetiminin parçası olarak ele almaya yardım eder.

## Bireyler ne yapabilir?

Bizim gibi bireysel kullanıcılar için de birkaç basit alışkanlık büyük fark yaratıyor. FBI'ın aynı uyarısındaki öneriler oldukça pratik: Aileniz ve yakınlarınızla yalnızca sizin bildiğiniz bir "gizli kelime" belirlemek; acil para isteyen bir arama geldiğinde telefonu kapatıp kişiyi ya da kurumu bildiğiniz numaradan geri aramak; sosyal medyada sesinizi ve görüntünüzü içeren paylaşımları sınırlamak; yalnızca internette ya da telefonda tanıştığınız kişilere para, hediye kartı veya kripto varlık göndermemek.

Bunlara ek olarak, mümkün olan her hesapta çok faktörlü doğrulamayı açmak, parola yöneticisi kullanmak ve "acele et" baskısı hissettiğiniz her mesajda bir an durmak hâlâ en iyi savunma. Yapay zeka saldırganın metnini kusursuz hâle getirebilir, ama sizi aceleye getirme taktiği aynı kalır.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Yapay zeka güvenlikte hem savunanların hem de saldıranların aracı; teknoloji tarafsız, kullanım değil.</li><li>Savunmada en büyük katkı, çok büyük veri içinde şüpheliyi öne çıkarmak; ancak yanlış alarm yükü mutlaka hesaba katılmalı.</li><li>Dil hataları artık sahte e-postanın güvenilir bir işareti değil; ses ve görüntü de taklit edilebiliyor.</li><li>Oltalamaya dayanıklı doğrulama ve para taleplerinde ikinci kanal, kurumlar için en etkili önlemler arasında.</li><li>Bireyler için aile içi gizli kelime ve geri arama alışkanlığı basit ama güçlü bir koruma.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Yapay zeka destekli bir antivirüs beni her şeyden korur mu?</summary><p>Hayır. Bu araçlar tespit şansını artırır ama hiçbiri kusursuz değildir. Güncellemeler, çok faktörlü doğrulama, yedekleme ve şüpheli taleplerde durup düşünmek hâlâ gerekli.</p></details><details><summary>Bir görüntülü görüşmenin deepfake olduğunu nasıl anlarım?</summary><p>Görsel kusurlara (gecikme, tuhaf yüz hareketleri, ses-dudak uyumsuzluğu) dikkat etmek yardımcı olabilir, ama teknoloji geliştikçe bu işaretler azalıyor. Daha güvenilir yol, özellikle para veya gizli bilgi söz konusuysa kişiyi bildiğiniz başka bir kanaldan doğrulamaktır.</p></details><details><summary>Küçük bir işletme bu konuda nereden başlamalı?</summary><p>Tüm hesaplarda çok faktörlü doğrulama, ödeme ve hesap değişikliği taleplerinde geri arama kuralı, düzenli yedekleme ve çalışanlara kısa farkındalık eğitimleri iyi bir başlangıçtır. Bunlar pahalı yapay zeka ürünlerinden önce gelir.</p></details><details><summary>Kendi sesimin klonlanmasını tamamen engelleyebilir miyim?</summary><p>Tamamen engellemek zor; kısa ses kayıtları bile yeterli olabiliyor. Ama herkese açık ses ve video paylaşımlarını sınırlamak riski azaltır, yakınlarınızla belirlediğiniz gizli kelime de taklidin işe yaramasını zorlaştırır.</p></details></div>

---

**Kaynaklar**

- [ENISA Threat Landscape 2025](https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025)
- [FBI IC3 – Criminals Use Generative Artificial Intelligence to Facilitate Financial Fraud (3 Aralık 2024)](https://www.ic3.gov/PSA/2024/PSA241203)
- [CISA – Implementing Phishing-Resistant MFA (bilgi notu)](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf)
- [NIST – Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CNN – Arup deepfake dolandırıcılığı haberi (16 Mayıs 2024)](https://edition.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk)
