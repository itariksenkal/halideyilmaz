---
title: "NIST Yapay Zekâ Risk Yönetimi Çerçevesi: Govern, Map, Measure, Manage'i Bir ML Ekibine Uyarlamak"
description: "NIST AI RMF'in dört fonksiyonunu tekrar etmek yerine mühendislik işine çeviriyoruz. MEASURE fonksiyonunun neden çoğu ekipte boş kaldığını, Üretken Yapay Zekâ Profilinin ne getirdiğini ve çerçevenin şu anda neden revizyonda olduğunu anlatıyoruz."
publishDate: "2026-08-13T23:25:00+03:00"
lang: tr
category: "Yönetişim"
tags: ["Yönetişim", "Yapay Zeka"]
translation: "nist-ai-rmf-in-practice"
heroImage:
  src: "../../../assets/blog/bimg-05.jpg"
  alt: "NIST Yapay Zekâ Risk Yönetimi Çerçevesi: Govern, Map, Measure, Manage'i Bir ML Ekibine Uyarlamak"
---

NIST Yapay Zekâ Risk Yönetimi Çerçevesi hakkında yazılan hemen her metin aynı işi yapıyor: dört fonksiyonun adını sayıyor ve bitiriyor. Oysa çerçevenin gerçek zorluğu isimlerde değil; **MEASURE** fonksiyonunda. NIST, çoğu ekibin üretemediği ölçümleri istiyor ve bu yazının asıl konusu da o boşluk. Ayrıca çerçevenin kendisi şu anda revizyonda — gönüllü çerçevenin akışkan olduğu bir dönemdeyiz ve bunu bilerek plan yapmak gerekiyor.

## Çerçeve nedir, neye benzer?

NIST AI RMF 1.0, 26 Ocak 2023'te yayımlandı (NIST.AI.100-1). Bağlayıcı değil; gönüllü bir çerçeve. Bu, onu önemsiz yapmıyor: ABD'de federal alım süreçlerinden kurumsal risk politikalarına kadar pek çok yerde referans olarak kullanılıyor ve AB Yapay Zekâ Yasası'nın istediği belgelerin çoğuyla kavramsal olarak örtüşüyor.

Çerçeve dört fonksiyon etrafında kurulu:

-   **GOVERN** — kuruluş çapında risk kültürü, roller, politikalar, hesap verebilirlik. Diğer üçünü kuşatan fonksiyon budur.
-   **MAP** — bağlamın kurulması: sistem ne için, kim etkileniyor, hangi varsayımlar altında çalışıyor.
-   **MEASURE** — risklerin analizi, değerlendirilmesi, kıyaslanması ve izlenmesi.
-   **MANAGE** — risklerin önceliklendirilmesi, azaltılması, kalan riskin kabulü ve olay müdahalesi.

Yapı, ISO/IEC 42001 ile ciddi biçimde örtüşür ama farklı bir felsefeye dayanır. 42001 bir _yönetim sistemi_ kurar ve belgelendirilebilir; AI RMF bir _düşünme çerçevesi_ sunar ve belgelendirilmez. İkisi rakip değil, farklı katmanlardır. Farkı [ISO/IEC 42001 yazısında](/posts/iso-42001-yapay-zeka-yonetim-sistemi/) ayrıntılandırıyoruz.

## GOVERN ve MAP: kolay görünen, sık atlanan kısım

Bu iki fonksiyon kâğıt üzerinde kolay görünür, çünkü kod yazmayı gerektirmez. Tam da bu yüzden atlanır.

### GOVERN: kim durdurabilir?

Bir yönetişim yapısının tek gerçek testi vardır: sistem yanlış davranmaya başladığında onu kim durdurabilir, ne kadar sürede ve kimin onayıyla? Bu sorunun cevabı bir isim ve bir süre içermiyorsa, yönetişim henüz kurulmamıştır.

### MAP: varsayımları yazmak

MAP, sistemin bağlamını kurar: amaçlanan kullanım, etkilenen taraflar, faydalar ve potansiyel zararlar, ve kritik olarak _varsayımlar_. Bir modelin varsayımları neredeyse hiç yazılmaz, oysa sahadaki başarısızlıkların çoğu doğrudan onlardan gelir.

-   Eğitim verisi ile üretim verisi aynı dağılımdan mı geliyor?
-   Etiketler ne kadar sürede geliyor? Hiç gelmiyor mu?
-   Model bir insanı mı yönlendiriyor, yoksa doğrudan mı karar veriyor?
-   Girdi kullanıcı tarafından mı üretiliyor? O hâlde çekişmeli bir girdi bekleniyor mu?

<div class="callout"><strong>İpucu:</strong> MAP çıktısını ayrı bir belge yapmayın; <a href="/posts/model-kartlari-yonetisim/">model kartının</a> “amaçlanan kullanım”, “kapsam dışı kullanım” ve “sınırlar” bölümleriyle aynı yere yazın. İki ayrı belge tutan ekip, ikisini de güncellemeyi bırakır.</div>

## MEASURE: çerçevenin gerçek zor kısmı

Şimdi asıl meseleye gelelim. MEASURE fonksiyonu, risklerin _ölçülmesini_ ister: sadece doğruluk değil; güvenilirlik, sağlamlık, adalet, şeffaflık, gizlilik ve bunların zaman içindeki değişimi. Pratikte çoğu ekip bu fonksiyonun altına tek bir doğruluk sayısı yazıp geçer.

> Bir riski adlandırmak ile ölçmek arasındaki mesafe, yönetişim belgeleriyle mühendislik arasındaki mesafedir. Çoğu kuruluş ilkini yapmış, ikincisini yapmamış durumda.

Ölçülebilir hâle getirilmesi gereken tipik başlıklar ve karşılıkları:

-   **Doğruluk:** tek bir skor değil, güven aralığıyla birlikte ve alt gruplara ayrılmış. Bir farkın gerçek olup olmadığını nasıl anlarsınız? [Güven aralığı ve bootstrap](/posts/model-karsilastirma-istatistik/).
-   **Güvenilirlik:** modelin “eminim” dediği yerde gerçekten haklı olup olmadığı — yani [kalibrasyon](/posts/model-kalibrasyonu/). Kalibre olmayan bir skorla eşik seçmek, ölçüm değil tahmindir.
-   **Belirsizlik:** noktasal tahmin yerine kapsama garantili aralık. [Konformal tahmin](/posts/konformal-tahmin/) bunun en pratik yolu.
-   **Adalet:** alt grup büyüklüğü gürültüyü aşacak kadar olmalı; aksi hâlde ölçtüğünüz şey varyanstır. [Adalet denetimi](/posts/adalet-denetimi-pratikte/).
-   **Zaman içindeki değişim:** [veri kayması ve model izleme](/posts/model-izleme-drift/); ve etiket gelmeden performans nasıl tahmin edilir sorusu için [etiketsiz performans tahmini](/posts/etiketsiz-performans-tahmini/).
-   **Değerlendirmenin kendisinin geçerliliği:** ölçüm aracınız güvenilir mi? [Etiketleyici uyumu](/posts/etiketleyici-uyumu-kappa/) ve [kıyaslama kirlenmesi](/posts/kiyaslama-kirlenmesi/).

MEASURE'ı ciddiye alan bir ekip, aslında bu sitedeki ölçme yazılarının tamamını uygulamış olur. Bu tesadüf değil: NIST'in istediği şey, ölçme biliminin ML'e uygulanmasından ibaret.

## MANAGE: risk kabulü ve olay müdahalesi

MANAGE, ölçülen riskin ne yapılacağına karar verildiği yer. Üç ayrı karar içerir ve üçü de yazılı olmalıdır.

-   **Önceliklendirme:** hangi risk önce ele alınacak? Bu bir mühendislik değil, iş kararıdır; ama mühendislik girdisi olmadan verilemez.
-   **Azaltma:** eşik değişikliği, insan gözden geçirme katmanı, kapsam daraltma, veri toplama. Her azaltıcı önlemin bir maliyeti ve genellikle bir yan etkisi vardır — hatırı sayılır bir kesinlik artışı, çoğu zaman duyarlılıktan ödün verir.
-   **Kalan riskin kabulü:** sıfıra inmeyen risk, bir yetkili tarafından açıkça kabul edilmelidir. İmzasız kabul, kabul değildir.

Bir de olay müdahalesi var ve bu, AB Yapay Zekâ Yasası tarafıyla en doğrudan kesişen nokta. Süreleri saatlerle ölçülen bir bildirim yükümlülüğünüz varsa, MANAGE fonksiyonunuz bir nöbet listesi ve bir geri alma prosedürü içermek zorundadır. Ayrıntı: [olay bildirimi ve piyasaya arz sonrası izleme](/posts/yapay-zeka-olay-bildirimi/).

## Üretken yapay zekâ profili ve çerçevenin bugünkü durumu

NIST, çerçeveyi belirli teknoloji ve sektörlere uyarlamak için _profiller_ yayımlıyor. En bilineni **NIST AI 600-1 Üretken Yapay Zekâ Profili**; 26 Temmuz 2024'te yayımlandı ve üretken sistemlere özgü riskleri sayarak her birine RMF eylemlerini bağlıyor. 7 Nisan 2026'da ise kritik altyapıda güvenilir yapay zekâ için bir profil kavram notu yayımlandı.

Ve dürüst olmak gerekirse: **NIST'in kendi sayfası çerçevenin revize edildiğini belirtiyor** ve yayımlanmış bir hedef tarih yok ([kaynak](https://www.nist.gov/itl/ai-risk-management-framework)). Bu bir kusur değil, doğal bir olgunlaşma; ama plan yaparken bilinmesi gereken bir şey. Gönüllü çerçeveye dayanan bir iç politika yazıyorsanız, sürüm numarasını da yazın.

<div class="callout"><strong>İpucu:</strong> Çerçeve değişse bile ürettiğiniz çıktılar değişmez. Alt gruplara ayrılmış performans tablosu, güven aralıklı doğruluk beyanı ve sürümlenmiş risk kaydı; hangi çerçeveye göre isimlendirdiğinizden bağımsız olarak işe yarar. Belgeleri fonksiyon adlarına değil, ölçüme bağlayın.</div>

## ABD tarafındaki hukuk zemini de kayıyor

Gönüllü çerçevenin akışkanlığı tek başına olsa yönetilebilirdi; ama altındaki eyalet mevzuatı da 2026'da yön değiştirdi. En çarpıcı örnek Colorado: eyaletin yapay zekâ kanunu **SB 26-189 ile yürürlükten kaldırılıp yerine yenisi kondu**; yeni metin 14 Mayıs 2026'da imzalandı ve 1 Ocak 2027'de yürürlüğe giriyor. Yeni düzenleme etki değerlendirmesi yükümlülüğünü _kaldırıyor_ ve icrayı yalnızca eyalet başsavcılığına bırakıyor ([SB 26-189](https://leg.colorado.gov/bills/SB26-189)).

Bu, yönü tersine dönmüş bir hareket: Avrupa belgeleme yükümlülüklerini derinleştirirken, bu örnekte ABD eyalet düzeyi ön denetimden sonradan açıklamaya geçiyor. İki rejime birden tabi olan bir ürün ekibi için pratik sonuç şudur: **en katı rejime göre inşa edin, gerisi otomatik karşılanır.** Colorado'nun etki değerlendirmesi istememesi, AB'nin istemediği anlamına gelmiyor.

> Uyum stratejisini en gevşek rejime göre kuran ekip, en sıkı rejim kapıyı çaldığında baştan başlar. Tersi doğru değildir.

AB tarafındaki güncel takvim için [yeni takvim yazısına](/posts/yapay-zeka-yasasi-yeni-takvim/), etki değerlendirmesi rejimlerinin karşılaştırması için [etki değerlendirmesi yazısına](/posts/yapay-zeka-etki-degerlendirmesi/) bakabilirsiniz.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>AI RMF gönüllü bir çerçevedir ama istediği belgelerin çoğu AB Yasasının istedikleriyle örtüşür.</li><li>GOVERN'ın tek gerçek testi şudur: sistem yanlış davrandığında kim, ne kadar sürede durdurabilir?</li><li>MEASURE, çerçevenin zor kısmıdır ve pratikte ölçme biliminin ML'e uygulanmasından ibarettir.</li><li>NIST kendi sayfasında AI RMF 1.0'ın revize edildiğini belirtiyor; iç politikanıza sürüm numarası yazın.</li><li>Colorado örneği gösteriyor ki eyalet mevzuatı gevşeyebilir; uyumu her zaman en katı rejime göre inşa edin.</li></ul></div>

<div class="faq"><details><summary>NIST AI RMF ile ISO/IEC 42001 arasında hangisini seçmeliyim?</summary><p>Bunlar rakip değil, farklı katmanlar. ISO/IEC 42001 belgelendirilebilir bir yönetim sistemi kurar; AI RMF ise riskleri düşünme ve ölçme çerçevesi sunar ve belgelendirilmez. Pek çok kuruluş 42001'i iskelet, AI RMF'i ölçüm rehberi olarak birlikte kullanıyor.</p></details><details><summary>AB'de faaliyet gösteriyorum, NIST çerçevesi bana ne kazandırır?</summary><p>Doğrudan bir hukuki karşılığı yoktur, ancak MEASURE fonksiyonu AB Yasasının Madde 15 doğruluk beyanı ve Madde 9 risk yönetimi yükümlülükleri için gereken ölçüm disiplinini kurar. Yani hukuki değil, hazırlık değeri taşır.</p></details><details><summary>Küçük bir ekip çerçevenin tamamını uygulayabilir mi?</summary><p>Tamamını uygulamaya çalışmayın. GOVERN'dan tek bir cümle (kim durdurur), MAP'ten varsayım listesi ve MEASURE'dan alt gruplara ayrılmış bir performans tablosu ile başlayın. Bu üçü, çerçevenin faydasının büyük kısmını üretir ve haftalar değil günler alır.</p></details></div>

---

Özetle: NIST çerçevesinin değeri, dört fonksiyonun adında değil, MEASURE fonksiyonunu gerçekten doldurmakta. Riskleri adlandırmak kolay; onları güven aralığıyla ölçmek zor. Bu zor kısmı yapan ekip, hangi çerçeve yürürlükte olursa olsun hazırdır.
