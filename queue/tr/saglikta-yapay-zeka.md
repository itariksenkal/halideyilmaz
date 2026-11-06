---
title: "Sağlıkta Yapay Zeka: Neler Yapabiliyor, Sınırları Nerede?"
description: "Tıbbi görüntüleme, triyaj, klinik dokümantasyon ve ilaç keşfinde yapay zeka: kanıtlar, sınırlar, tıbbi cihaz düzenlemeleri ve hasta verisi mahremiyeti."
publishDate: "2026-11-09T09:17:00+03:00"
lang: tr
category: "Uygulama"
tags: ["Sağlık", "Yapay Zeka", "Regülasyon"]
translation: "ai-in-healthcare"
heroImage:
  src: "../../../assets/blog/covers/saglikta-yapay-zeka.jpg"
  alt: "Bir tıbbi görüntü üzerinde vurgulanmış bölgeleri inceleyen hekim"
---

Sağlıkta yapay zeka denince akla genellikle iki uç gelir: ya "doktorların yerini alacak" diye bir abartı ya da "tehlikeli bir oyuncak" diye bir reddediş. Gerçek tablo ikisinin de dışında ve daha ilginç. Bazı alanlarda iyi tasarlanmış çalışmalarla desteklenen somut kazanımlar var; bazı alanlarda ise vaatler kanıtın çok önünde gidiyor. Bu yazıda yapay zekanın sağlıkta nerelerde kullanıldığını, kanıtın nerede güçlü nerede zayıf olduğunu, bu sistemlerin nasıl düzenlendiğini ve hasta verilerinin neden ayrı bir özen gerektirdiğini genel hatlarıyla anlatacağım.

*Bu yazı genel bilgilendirme amaçlıdır; tıbbi tavsiye değildir. Sağlığınızla ilgili kararlar için bir sağlık profesyoneline danışın.*

## Tıbbi görüntüleme: en olgun alan

Yapay zekanın sağlıkta en yerleşik olduğu alan tıbbi görüntüleme. Röntgen, tomografi, MR ve mamografi gibi görüntüler, makine öğrenmesinin güçlü olduğu türden veriler: bol, dijital ve uzmanlar tarafından etiketlenebilir.

ABD Gıda ve İlaç Dairesi (FDA), pazarlama izni almış yapay zeka destekli tıbbi cihazların bir listesini yayımlıyor ve düzenli olarak güncelliyor. Bu listedeki cihazların büyük bölümü radyolojiyle ilgili. FDA, listenin kapsamlı olmadığını, cihazların büyük ölçüde izin belgelerindeki yapay zeka ile ilgili terimlere göre belirlendiğini açıkça not ediyor.

Kanıt açısından dikkat çekici bir örnek İsveç'teki MASAI çalışması. Yaklaşık 106.000 kadının rastgele iki gruba ayrıldığı bu randomize çalışmada, bir grupta mamografiler standart çift okuma ile, diğer grupta yapay zeka desteğiyle değerlendirildi. Şubat 2025'te The Lancet Digital Health'te yayımlanan sonuçlara göre yapay zeka destekli grupta yüzde 29 daha fazla kanser saptandı ve radyologların okuma yükü yüzde 44 azaldı; yanlış pozitif geri çağırmalardaki artış ise küçüktü. Araştırmacılar o aşamada, iki tarama arasında ortaya çıkan "aralık kanserlerinin" henüz analiz edilmediğini ve uzun dönem takibin gerektiğini vurguluyordu.

Bu örnek bence iki şeyi birlikte gösteriyor: doğru tasarlanmış bir sistem gerçek fayda sağlayabilir; ama bu fayda belirli bir yazılım, belirli bir iş akışı ve belirli bir hasta nüfusu için ölçülmüştür. Başka bir ürüne ya da başka bir ülkeye otomatik olarak genellenemez.

## Triyaj ve klinik karar desteği

Triyaj, hastaların aciliyetine göre sıralanması demek. Yapay zeka burada örneğin bir görüntüde acil bir bulgu olasılığı yüksekse o vakayı radyoloğun listesinde öne almak için kullanılabiliyor. Amaç karar vermek değil, insanın dikkatini daha hızlı doğru yere çekmek.

Bu alandaki temel risk, Dünya Sağlık Örgütü'nün (DSÖ) de vurguladığı **otomasyon yanlılığı**: insanların makinenin önerisine gereğinden fazla güvenip normalde fark edecekleri hataları gözden kaçırması. İyi bir karar destek sistemi, hekimin muhakemesini tembelleştirmemeli; tam tersine, neden o öneriyi yaptığını anlaşılır kılmalıdır.

## Dokümantasyon ve idari işler

Sağlık çalışanlarının zamanının önemli bir kısmı kayıt tutmaya gidiyor. Muayene sırasındaki konuşmayı yazıya döküp özetleyen, taslak not hazırlayan araçlar bu yükü hafifletme vaadiyle hızla yayılıyor. DSÖ'nün Ocak 2024'te yayımladığı büyük çok modlu modellere (LMM) ilişkin rehberi de beş kullanım alanından biri olarak klinik ziyaretlerin belgelenmesi ve özetlenmesi gibi idari işleri sayıyor.

Burada dikkat edilmesi gereken nokta açık: dil modelleri akıcı ama yanlış ifadeler üretebilir. Bir ilacın dozunda ya da bir alerjide yapılacak küçük bir hata ciddi sonuçlar doğurabilir. Bu yüzden bu araçların ürettiği her taslağın bir sağlık profesyoneli tarafından kontrol edilmesi şart.

<div class="callout"><strong>İpucu:</strong> Bir sağlık kuruluşunda muayene sırasında kayıt alan bir yapay zeka aracı kullanılıyorsa, bunun hakkında bilgi istemek ve verilerinizin nasıl işlendiğini sormak en doğal hakkınızdır.</div>

## İlaç keşfi ve araştırma

İlaç geliştirme uzun, pahalı ve başarısızlık oranı yüksek bir süreç. Yapay zeka; protein yapılarını tahmin etmek, aday molekülleri taramak ve klinik araştırmalar için uygun hastaları belirlemek gibi aşamalarda kullanılıyor. DSÖ rehberi de bilimsel araştırma ve ilaç geliştirmeyi ana kullanım alanları arasında sayıyor.

Ancak bu alanda bir ayrımı akılda tutmak gerekiyor: bir molekülün laboratuvarda umut verici görünmesi ile güvenli ve etkili bir ilaç olarak onaylanması arasında hâlâ yıllar süren klinik araştırmalar var. Yapay zeka bu sürecin bazı adımlarını hızlandırabilir, ama klinik kanıt ihtiyacını ortadan kaldırmaz.

## Düzenleme: yazılım da tıbbi cihaz olabilir

Pek çok kişiyi şaşırtan bir gerçek: bir yazılım, teşhis ya da tedaviye yönelik bir amaçla kullanılıyorsa tıbbi cihaz olarak düzenlenebiliyor.

- **ABD:** FDA, yapay zeka destekli yazılımları tıbbi cihaz çerçevesinde değerlendiriyor. Yukarıda andığım liste de bu izin süreçlerinden geçmiş ürünleri gösteriyor. FDA, büyük dil modeli tabanlı cihazları ileride ayrıca işaretlemenin yollarını araştıracağını belirtiyor.
- **Avrupa Birliği:** Tıbbi cihazlar 2017/745 sayılı Tıbbi Cihaz Tüzüğü (MDR) kapsamında düzenleniyor. 1 Ağustos 2024'te yürürlüğe giren Yapay Zeka Yasası ise üçüncü taraf uygunluk değerlendirmesi gerektiren tıbbi cihazlarda kullanılan yapay zekayı genel olarak "yüksek riskli" kabul ediyor. Avrupa Komisyonu'nun sayfasına göre, düzenlenmiş ürünlere gömülü yüksek riskli sistemlere ilişkin yükümlülükler, 2026'da yürürlüğe giren değişikliklerle birlikte 2 Ağustos 2028'den itibaren uygulanacak.
- **Türkiye:** Tıbbi cihazlar kendi mevzuatına tabi; sağlık verilerinin işlenmesi ise 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında.

Bu takvimler değişebildiği için ayrıntılı uyum çalışmalarında her zaman güncel resmi metinlere bakılmalı.

## Hasta verisi ve mahremiyet

Sağlık verisi hem KVKK'da hem de AB'nin Genel Veri Koruma Tüzüğü'nde (GDPR) "özel nitelikli" ya da "özel kategoride" veri olarak ayrıca korunuyor. Bunun nedeni açık: bu veriler sızdığında ya da kötüye kullanıldığında ayrımcılık, damgalanma ve geri dönüşü zor zararlar doğabilir.

Yapay zeka projelerinde bu risk birkaç şekilde büyüyor. Modeller büyük veri setlerine ihtiyaç duyuyor; anonimleştirildiği düşünülen veriler başka verilerle birleştirildiğinde kişiler yeniden tanınabilir hale gelebiliyor; dış hizmet sağlayıcılara ve yurt dışına veri aktarımı yeni sorular doğuruyor. DSÖ de rehberinde siber güvenlik risklerine ve verinin kalitesizliği ya da yanlılığından kaynaklanan sorunlara dikkat çekiyor.

<div class="callout"><strong>İpucu:</strong> Sağlık şikâyetlerinizi genel amaçlı bir sohbet botuna yazmadan önce iki kez düşünün: hem cevaplar hatalı olabilir hem de paylaştığınız bilgilerin nasıl saklanacağı ve kullanılacağı her zaman net değildir.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Tıbbi görüntüleme, yapay zekanın sağlıkta en olgun ve en çok kanıt üretilmiş alanı.</li><li>MASAI gibi randomize çalışmalar gerçek faydayı gösterebilir, ama sonuçlar belirli bir sistem ve bağlamla sınırlıdır.</li><li>Otomasyon yanlılığı ve akıcı ama hatalı çıktılar, klinik kullanımda en önemli risklerden.</li><li>Yazılım da tıbbi cihaz olarak düzenlenebilir; ABD'de FDA, AB'de MDR ve Yapay Zeka Yasası devrede.</li><li>Sağlık verisi özel nitelikli veridir ve yapay zeka projelerinde ek özen gerektirir.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Yapay zeka doktorların yerini alacak mı?</summary><p>Bugünkü kanıtlar, yapay zekanın belirli görevlerde hekimlere destek olduğunu gösteriyor; klinik kararın ve sorumluluğun sağlık profesyonelinde kalması, hem etik hem de düzenleyici açıdan temel ilke.</p></details><details><summary>Bir sohbet botuna sağlık sorusu sormak güvenli mi?</summary><p>Genel bilgi almak için kullanılabilir, ancak cevaplar hatalı ya da eksik olabilir. Teşhis ve tedavi için mutlaka bir sağlık profesyoneline başvurun.</p></details><details><summary>Bir yapay zeka ürününün onaylı olup olmadığını nasıl anlarım?</summary><p>ABD'de FDA'nın listesine ve veri tabanlarına bakılabilir. AB'de CE işareti ve üreticinin uygunluk beyanı önemli göstergelerdir. Emin değilseniz ürünü kullanan sağlık kuruluşuna sorabilirsiniz.</p></details><details><summary>Sağlık verilerim yapay zeka eğitiminde kullanılabilir mi?</summary><p>Bu, ilgili ülkenin mevzuatına, verinin işlenme amacına ve hukuki dayanağa bağlıdır. KVKK ve GDPR kapsamında sağlık verisi özel koruma altındadır ve haklarınızı veri sorumlusuna başvurarak kullanabilirsiniz.</p></details></div>

---

**Kaynaklar**

- [FDA – List of Artificial Intelligence-Enabled Medical Devices](https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices)
- [WHO – WHO releases AI ethics and governance guidance for large multi-modal models (18 Ocak 2024)](https://www.who.int/news/item/18-01-2024-who-releases-ai-ethics-and-governance-guidance-for-large-multi-modal-models)
- [WHO – Ethics and governance of artificial intelligence for health: Guidance on large multi-modal models](https://www.who.int/publications-detail-redirect/9789240084759)
- [EurekAlert! – MASAI çalışmasının The Lancet Digital Health sonuçları (Şubat 2025)](https://www.eurekalert.org/news-releases/1072522)
- [Avrupa Komisyonu – AI Act: Regulatory framework for AI](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
