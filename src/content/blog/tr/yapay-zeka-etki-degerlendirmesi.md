---
title: "Yapay Zekâ Etki Değerlendirmesi: FRIA, ISO 42005 ve VERBİS/DPIA Aynı Belge mi?"
description: "Temel haklar etki değerlendirmesi, ISO/IEC 42005 etki değerlendirmesi ve veri koruma etki değerlendirmesi üç ayrı belgedir. Hangisi kimi bağlar, ne zaman gerekir, hangi tarihte yürürlüğe girer ve pratikte nasıl birlikte yürütülür?"
publishDate: "2026-08-13T23:24:00+03:00"
lang: tr
category: "Yönetişim"
tags: ["Yönetişim", "Yapay Zeka"]
translation: "ai-impact-assessment-fria"
heroImage:
  src: "../../../assets/blog/bimg-06.jpg"
  alt: "Yapay Zekâ Etki Değerlendirmesi: FRIA, ISO 42005 ve VERBİS/DPIA Aynı Belge mi?"
---

Bir yapay zekâ projesinde “etki değerlendirmesi yapmamız gerekiyor” cümlesi kurulduğunda, masadaki üç kişi genellikle üç farklı belgeden bahsediyor: hukukçu veri koruma etki değerlendirmesini, uyum ekibi ISO/IEC 42005'i, mevzuatı takip eden kişi ise AB Yapay Zekâ Yasası'nın temel haklar etki değerlendirmesini kastediyor. Bunlar aynı belge değil; kapsamları, muhatapları ve tarihleri farklı. Bu yazı üçünü ayırıyor ve tek bir çalışmayla üçünü birden nasıl besleyeceğinizi gösteriyor.

## Üç belge, üç farklı soru

En sade ayrım, her belgenin cevapladığı soruda:

-   **Veri koruma etki değerlendirmesi (DPIA):** “Bu işleme faaliyeti _kişisel veriler_ bakımından hangi riskleri doğuruyor?” Muhatabı veri sorumlusudur; dayanağı veri koruma mevzuatıdır.
-   **Temel haklar etki değerlendirmesi (FRIA):** “Bu yüksek riskli sistemin _etkilenen kişilerin temel hakları_ üzerindeki etkisi nedir?” Muhatabı belirli uygulayıcılardır; dayanağı AB Yapay Zekâ Yasası'nın 27. maddesidir.
-   **ISO/IEC 42005 etki değerlendirmesi:** “Bu yapay zekâ sisteminin bireyler, gruplar ve toplum üzerindeki etkilerini _hangi süreçle_ değerlendiriyoruz?” Muhatabı kuruluşun kendisidir; dayanağı gönüllü bir standarttır.

Üçü de risk değerlendirir ama farklı mercekle bakar. DPIA'in merkezinde veri vardır, FRIA'in merkezinde etkilenen kişi, 42005'in merkezinde ise kuruluşun süreci. Aynı projede üçünün de gerekli olması mümkündür ve bu bir tekrar değildir.

> Aynı riski üç kez yazmak israftır; üç farklı riski tek belgede eritmek ise ihmaldir. Ayrım, hangisinin hangisi olduğunu bilmekte.

Bir de sık karıştırılan dördüncü bir şey var: **VERBİS**. Türkiye'de veri sorumlularının sicile kayıt yükümlülüğü olan VERBİS bir _kayıt_ yükümlülüğüdür, etki değerlendirmesi değildir. Kayıt yapmış olmak bir risk analizinin yerine geçmez.

## FRIA: kimi bağlar, ne zaman?

AB Yapay Zekâ Yasası'nın 27. maddesi, temel haklar etki değerlendirmesini _sağlayıcıya_ değil _uygulayıcıya_ yükler; yani sistemi geliştiren değil, kullanan tarafa. Ve her uygulayıcıya değil:

-   Kamu hukukuna tabi kuruluşlar ve kamu hizmeti sunan özel kuruluşlar, Ek III kapsamındaki yüksek riskli sistemleri kullanırken;
-   Gerçek kişilerin kredi değerliliğini değerlendiren veya kredi puanı üreten sistemleri kullananlar;
-   Hayat ve sağlık sigortasında risk değerlendirmesi ve fiyatlandırma yapan sistemleri kullananlar.

Değerlendirmenin içeriği tanımlıdır: sistemin hangi süreçte kullanılacağı, kullanım süresi ve sıklığı, etkilenmesi muhtemel kişi kategorileri, ilgili özel zarar riskleri, insan gözetimi düzenlemeleri ve risk gerçekleşirse alınacak önlemler — iç yönetişim ve şikâyet mekanizmaları dâhil.

<div class="callout"><strong>İpucu:</strong> FRIA'in tarihi Temmuz 2026'da değişti. (AB) 2026/1744 sayılı Tüzükle Ek III yükümlülükleri 2 Aralık 2027'ye alındığında Madde 27 de birlikte kaydı. 2025 tarihli bir makale okuyup “bu yükümlülük çoktan başladı” diye planlama yapan ekipler yanlış tarihle çalışıyor. Güncel takvim: <a href="/posts/yapay-zeka-yasasi-yeni-takvim/">yeni takvim yazısı</a>.</div>

Bir nokta daha: FRIA, DPIA'i ortadan kaldırmaz. Madde 27, gereken unsurların bir kısmı zaten DPIA'de karşılanmışsa FRIA'in onu tamamlayıcı nitelikte olacağını öngörür. Yani sıra önemlidir: önce DPIA yapılmışsa FRIA daha kısa olur.

## DPIA: veri merceği

Veri koruma etki değerlendirmesi, yapay zekâdan çok daha eski bir araç ve tam da bu yüzden ML bağlamında bazı kör noktaları var. Klasik DPIA, bir _işleme faaliyetini_ tanımlar: hangi veri, hangi amaçla, hangi hukuki sebeple, ne kadar süreyle, kimlerle paylaşılarak.

Bir model eğitimi bu şablona tam oturmaz, çünkü:

-   Eğitim verisi silinse bile modelde _iz_ kalabilir. Modelin anonim sayılıp sayılamayacağı ayrı ve zor bir sorudur; ayrıntısı [modeliniz anonim mi](/posts/model-anonim-mi-ezberleme/) yazısında.
-   Amaç, eğitim ile çıkarım arasında değişir: aynı veri kümesi bir modeli eğitir, sonra o model başka bir amaçla kullanılır.
-   Saklama süresi, veri için tanımlanabilir ama model ağırlıkları için tanımlanması zordur.
-   Silme talebi geldiğinde, veriyi silmek modeli düzeltmez. [Makine unutması](/posts/makine-unutma/) yazısı bu boşluğu ele alıyor.

Bu yüzden bir ML projesinde DPIA'i klasik şablonla doldurup geçmek yerine, bu dört maddeyi ayrı başlıklar olarak eklemek çok daha faydalıdır. Gizlilik korumalı yöntemlerin bu risklerin bir kısmını nasıl azalttığını [gizlilik korumalı öğrenme](/posts/gizlilik-korumali-ogrenme/) yazısında ele almıştık.

## ISO/IEC 42005: süreci standartlaştıran belge

ISO/IEC 42005:2025, 28 Mayıs 2025'te yayımlandı ([kaynak](https://webstore.iec.ch/en/publication/107659)) ve yapay zekâ sistemi etki değerlendirmesi için rehberlik sağlıyor. Diğer ikisinden farkı, bir _yükümlülük_ değil bir _yöntem_ olması: ne zaman değerlendirme yapılacağı, kimin katılacağı, çıktının nasıl belgeleneceği ve ne sıklıkla gözden geçirileceği.

Pratikte en çok işe yarayan yanı, değerlendirmeyi yaşam döngüsüne bağlaması. Etki değerlendirmesi tek seferlik bir kapı değil; sistem önemli ölçüde değiştiğinde, yeni bir kullanım alanına girdiğinde veya izleme yeni bir zarar sinyali ürettiğinde tekrarlanması gereken bir adımdır.

<div class="callout"><strong>İpucu:</strong> Üç belgeyi ayrı süreçler hâlinde yürütmeyin. Tek bir <em>zarar kaydı</em> tutun: her satırda kime, hangi mekanizmayla, hangi olasılıkla zarar gelebileceği ve hangi önlemin alındığı yazsın. Sonra bu kayıttan üç belgeyi de üretin. Aynı bilgiyi üç kez toplamak, ekibin değerlendirmeden nefret etmesinin başlıca sebebidir.</div>

## Tek bir çalışmayla üçünü birden beslemek

Ortak omurga şu altı sorudan oluşuyor. Bunları bir kez, doğru düzgün cevaplarsanız üç belgenin de gövdesi hazır olur.

-   **Sistem ne yapıyor ve hangi kararı etkiliyor?** Karar cümlesini yazın: “bu model, X hakkında Y kararının Z aşamasında kullanılıyor.”
-   **Kim etkileniyor?** Yalnızca kullanıcı değil; kararın öznesi, kararın dışında kalanlar, ve etkilenen ama sistemi hiç görmeyen kişiler.
-   **Hangi mekanizmayla zarar doğar?** Yanlış pozitif mi, yanlış negatif mi, sistematik alt grup farkı mı, geri besleme döngüsü mü?
-   **Zararın büyüklüğü ve geri döndürülebilirliği nedir?** Reddedilen bir kredi başvurusu ile yanlış işaretlenen bir e-posta aynı ağırlıkta değildir.
-   **İnsan nerede devrede?** Ve o insan gerçekten farklı bir karar verebilecek bilgiye ve zamana sahip mi?
-   **Nasıl anlarız?** Hangi ölçüm, hangi sıklıkla, hangi eşikle bu zararın gerçekleştiğini gösterecek?

Son madde, bu yazının en çok atlanan kısmı. Bir zarar senaryosu, onu tespit edecek bir ölçüm tanımlanmadan yazıldığında temenniden ibarettir. Alt gruplara ayrılmış ölçümün nasıl yapıldığını [adalet denetimi](/posts/adalet-denetimi-pratikte/) yazısında, ölçümün kendisinin ne zaman anlamlı olduğunu [güven aralığı ve bootstrap](/posts/model-karsilastirma-istatistik/) yazısında ele alıyoruz.

> Ölçümü tanımlanmamış bir risk, kaydedilmiş bir endişedir. Kayıt iyi bir şeydir ama koruma sağlamaz.

## Türkiye'de durum ve pratik sıra

Türkiye'de yürürlükte bir yapay zekâ kanunu bulunmuyor. Kişisel veri tarafında KVKK mevzuatı geçerli; Kurum ayrıca yapay zekâya özgü rehberler yayımladı — 15 Eylül 2021 tarihli [Yapay Zekâ Alanında Kişisel Verilerin Korunmasına Dair Tavsiyeler](https://www.kvkk.gov.tr/Icerik/7048/Yapay-Zeka-Alaninda-Kisisel-Verilerin-Korunmasina-Dair-Tavsiyeler) ve 24 Kasım 2025 tarihli [Üretken Yapay Zekâ ve Kişisel Verilerin Korunması Rehberi](https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda).

AB pazarına ürün sunan bir Türk ekibi için pratik sıra şudur:

-   **Önce kapsam.** Sistem AB Yasası bakımından yüksek riskli mi, siz sağlayıcı mısınız uygulayıcı mı? Bu iki cevap, FRIA'in size düşüp düşmediğini belirler.
-   **Sonra veri.** Kişisel veri işleniyorsa KVKK ve gerekiyorsa GDPR tarafındaki değerlendirmeyi yapın; bu, FRIA'i de kısaltır.
-   **Sonra zarar kaydı.** Yukarıdaki altı soruyu tek bir tabloda cevaplayın.
-   **En son belge.** Belgeleri kayıttan üretin, kaydı belgeden değil.

Bu çalışmanın çıktısı, aynı zamanda [model kartınızın](/posts/model-kartlari-yonetisim/) “sınırlar” ve “etik değerlendirmeler” bölümlerini de doldurur; ve [önyargı ve adalet](/posts/onyargi-ve-adalet/) yazısındaki kavramsal çerçeve, zarar mekanizmalarını adlandırırken en çok işinize yarayacak referanstır.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>DPIA veriye, FRIA etkilenen kişiye, ISO/IEC 42005 ise kuruluşun sürecine odaklanır; üçü aynı belge değildir.</li><li>FRIA sağlayıcıya değil belirli uygulayıcılara düşer ve (AB) 2026/1744 ile 2 Aralık 2027'ye ertelendi.</li><li>VERBİS bir kayıt yükümlülüğüdür, etki değerlendirmesi değildir; kayıt risk analizinin yerine geçmez.</li><li>Klasik DPIA şablonu ML'de dört kör nokta bırakır: modeldeki iz, amaç kayması, ağırlıkların saklama süresi ve silme talebi.</li><li>Tek bir zarar kaydı tutup üç belgeyi ondan üretin; her zarar satırının kendi ölçümü olmalı.</li></ul></div>

<div class="faq"><details><summary>DPIA yaptıysam FRIA yapmama gerek var mı?</summary><p>Gerekiyorsa yine yapmanız gerekir, ama sıfırdan değil. Madde 27, gerekli unsurların bir kısmının veri koruma etki değerlendirmesinde zaten karşılanmış olması hâlinde temel haklar değerlendirmesinin onu tamamlayacağını öngörür. Pratikte DPIA'i önce yapan ekip daha az iş yapar.</p></details><details><summary>Sağlayıcıyım, uygulayıcı değilim. FRIA bana düşer mi?</summary><p>Madde 27 yükümlülüğü uygulayıcılara yükler. Ancak sağlayıcı olarak uygulayıcının bu değerlendirmeyi yapabilmesi için gereken bilgiyi sunmanız beklenir: amaçlanan kullanım, bilinen sınırlar, doğruluk seviyeleri ve alt grup performansı. Bu bilgiyi vermeyen sağlayıcı, müşterisini uyumsuz bırakır.</p></details><details><summary>ISO/IEC 42005 uygulamak zorunlu mu?</summary><p>Hayır, gönüllü bir standarttır ve tek başına hiçbir mevzuat yükümlülüğünü karşılamaz. Değeri, etki değerlendirmesini tekrarlanabilir bir sürece bağlamasında ve yaşam döngüsü boyunca ne zaman yeniden yapılacağını tanımlamasındadır.</p></details></div>

---

Özetle: üç belgenin varlığı bir bürokrasi sorunu değil, üç farklı mercek meselesi. Aynı zarar kaydından beslendiklerinde iş yükü üçe katlanmaz; aksine, her biri diğerinin gözden kaçırdığını yakalar. Karışıklık, belgeler çoğaldığı için değil, hangisinin neye baktığı yazılmadığı için çıkıyor.
