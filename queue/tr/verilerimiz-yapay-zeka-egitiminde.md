---
title: "Verilerimiz Yapay Zeka Eğitiminde: Haklarımız ve Yapabileceklerimiz"
description: "Kişisel verilerimiz yapay zeka eğitimine nasıl girebilir? Web kazıma, ürün verileri, KVKK ve GDPR kapsamındaki haklar ve atılabilecek pratik adımlar."
publishDate: "2026-11-11T09:17:00+03:00"
lang: tr
category: "Gizlilik"
tags: ["Gizlilik", "KVKK", "GDPR", "Yapay Zeka"]
translation: "your-data-and-ai-training"
heroImage:
  src: "../../../assets/blog/covers/verilerimiz-yapay-zeka-egitiminde.jpg"
  alt: "Kişisel veri simgelerinin bir yapay zeka modeline doğru aktığı soyut çizim"
---

Bir sosyal medya paylaşımı, bir forumda yazdığımız yorum, bir sohbet botuna sorduğumuz soru ya da bir uygulamaya yüklediğimiz belge... Bunların bir kısmının yapay zeka modellerinin eğitiminde kullanılmış olabileceğini biliyor muyuz? Çoğumuz bunu ya hiç düşünmüyoruz ya da "zaten yapacak bir şey yok" diye geçiştiriyoruz. Bu yazıda kişisel verilerin yapay zeka eğitimine hangi yollarla girebildiğini, Türkiye'de KVKK ve Avrupa'da GDPR kapsamında hangi haklara sahip olduğumuzu ve pratikte neler yapabileceğimizi genel hatlarıyla anlatacağım.

*Bu yazı genel bilgilendirme amaçlıdır; hukuki tavsiye değildir. Somut bir durum için bir hukuk profesyoneline danışmanızı öneririm.*

## Veriler eğitime hangi yollarla giriyor?

Kabaca iki ana yol var.

**1. Web kazıma (scraping).** Büyük dil modelleri, internette herkese açık sayfalardan otomatik olarak toplanan çok büyük metin ve görsel koleksiyonlarıyla eğitiliyor. Avrupa Veri Koruma Kurulu (EDPB), 7 Temmuz 2026'da kamuoyu görüşüne açtığı üretken yapay zeka bağlamında web kazımaya ilişkin rehberinde bunu büyük ölçekli bir işleme faaliyeti olarak tanımlıyor ve çoğu zaman ilgili kişilerin bundan haberi olmadan gerçekleştiğini vurguluyor. Bir bilginin "herkese açık" olması, onun kişisel veri olmaktan çıktığı anlamına gelmiyor.

**2. Ürün ve hizmet verileri.** Kullandığımız uygulamalar da veri kaynağı olabiliyor: sohbet botlarına yazdıklarımız, yüklediğimiz dosyalar, verdiğimiz geri bildirimler, bir platformdaki paylaşımlarımız. Bu verilerin model geliştirmede kullanılıp kullanılmadığı ve hangi koşullarda kullanıldığı hizmetten hizmete, hatta aynı hizmetin bireysel ve kurumsal sürümleri arasında bile değişebiliyor.

| Kaynak | Örnek | Kontrol imkânı |
|---|---|---|
| Herkese açık web | Blog yazıları, forum yorumları, açık profiller | Sınırlı; içeriği kaldırmak, platform gizlilik ayarları, veri sorumlusuna başvuru |
| Ürün içi veriler | Sohbet geçmişi, yüklenen dosyalar, geri bildirimler | Genellikle ayarlar menüsünde eğitim tercihleri, sohbet geçmişi seçenekleri |
| Üçüncü taraf veri setleri | Veri aracılarından alınan ya da paylaşılan veriler | Bilgi talebi ve haklara ilişkin başvurular |

## Avrupa'da durum: GDPR ve EDPB görüşleri

AB'de bu konudaki çerçeveyi büyük ölçüde Genel Veri Koruma Tüzüğü (GDPR) ve onu yorumlayan EDPB belirliyor. EDPB Aralık 2024'te yapay zeka modellerine ilişkin 28/2024 sayılı görüşünü yayımladı. Bu görüşün öne çıkan noktaları şöyle özetlenebilir:

- Kişisel verilerle eğitilmiş bir modelin "anonim" sayılıp sayılamayacağı vaka bazında değerlendirilmeli. Bunun için modelin, eğitimde verisi kullanılan kişileri tanımlamasının ve sorgularla bu verileri ortaya çıkarmasının çok düşük olasılıklı olması gerekiyor.
- Şirketler "meşru menfaat" hukuki sebebine dayanabilir, ama bunun için üç aşamalı bir testten geçmeleri gerekiyor. Bu değerlendirmede verinin herkese açık olup olmadığı ve kişilerin böyle bir kullanımı makul olarak bekleyip bekleyemeyeceği gibi etkenler önem taşıyor.
- Hukuka aykırı işlenmiş verilerle geliştirilmiş bir model, düzgün biçimde anonimleştirilmemişse, sonraki kullanımında da sorun yaratabilir.

Bireyler için önemli sonuç şu: işleme meşru menfaate dayanıyorsa GDPR, kişiye özel durumuna ilişkin gerekçelerle **itiraz etme hakkı** tanıyor. Buna ek olarak verilere erişim, düzeltme ve silme hakları da bulunuyor.

## Türkiye'de durum: KVKK

Türkiye'de temel düzenleme 6698 sayılı Kişisel Verilerin Korunması Kanunu. Kanunun 11. maddesine göre herkes veri sorumlusuna başvurarak:

- Kişisel verilerinin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme,
- İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,
- Verilerin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,
- Eksik ya da yanlış işlenmiş verilerin düzeltilmesini isteme,
- Verilerin silinmesini veya yok edilmesini isteme ve bu işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
- Münhasıran otomatik sistemlerle yapılan analiz sonucu aleyhine bir sonuç çıkmasına itiraz etme,
- Kanuna aykırı işleme nedeniyle zarara uğramışsa zararın giderilmesini talep etme

haklarına sahip. Dikkat edilmesi gereken bir fark var: KVKK'daki itiraz hakkı, GDPR'daki genel itiraz hakkından daha dar; otomatik sistemlerle yapılan analizlerle sınırlı.

Kurumun yayımladığı rehbere göre veri sorumlusu başvuruyu en geç otuz gün içinde, kural olarak ücretsiz sonuçlandırmalı. Başvuru reddedilir, cevap yetersiz bulunur ya da süresinde cevap verilmezse, cevabın öğrenildiği tarihten itibaren otuz gün ve her hâlükârda başvuru tarihinden itibaren altmış gün içinde Kişisel Verileri Koruma Kurulu'na şikâyette bulunulabiliyor.

Kurum ayrıca 24 Kasım 2025'te "Üretken Yapay Zekâ ve Kişisel Verilerin Korunması Rehberi (15 Soruda)" belgesini yayımladı. Rehber, üretken yapay zeka sistemleriyle yapılan veri işlemeyi 6698 sayılı Kanun çerçevesinde değerlendiriyor ve bireylere yönelik önerilere de yer veriyor.

<div class="callout"><strong>İpucu:</strong> Haklarınızı kullanmak için önce şirketin gizlilik politikasını ve aydınlatma metnini okuyun. Başvuru kanalları, iletişim adresleri ve verilerin eğitimde kullanılıp kullanılmadığına dair bilgiler genellikle burada yer alır.</div>

## Vazgeçme (opt-out) ayarları genel olarak nasıl çalışır?

Burada belirli şirketlerin ayarlarını tek tek anlatmayacağım; çünkü bu ayarlar sık değişiyor ve her ürün için güncel durumu doğrulamak gerekiyor. Ancak genel mantık çoğu zaman şöyle:

- **Ürün içi tercih:** Birçok sohbet botu ve yapay zeka hizmeti, ayarlar menüsünde konuşmaların model geliştirmede kullanılmasını kapatmaya yarayan bir seçenek sunuyor. Bu seçenek varsayılan olarak açık da olabilir, kapalı da.
- **İleriye dönük etki:** Bir ayarı kapatmak genellikle bundan sonraki verileri etkiler. Daha önce eğitilmiş bir modelden verinin "çıkarılması" teknik olarak zor ve hizmetten hizmete farklı ele alınıyor.
- **Form ve başvurular:** Bazı şirketler, ayar menüsü dışında itiraz ya da silme talepleri için ayrı formlar sunuyor. Bunlar hukuki haklarınızı kullanmanın bir yolu olabilir.
- **Site sahipleri için:** Kendi web siteniz varsa, bazı tarayıcı botlarını engellemek için teknik yöntemler bulunuyor. EDPB'nin web kazıma rehberi de veri toplayanlara, kazımaya açıkça karşı çıkan siteleri kapsam dışında tutmayı bir önlem olarak öneriyor.

## Pratik adımlar

1. **Paylaşmadan önce düşünün.** Sohbet botlarına kimlik numarası, sağlık bilgisi, müşteri verisi ya da gizli iş belgeleri yazmayın.
2. **Ayarları gözden geçirin.** Kullandığınız yapay zeka araçlarında eğitim, sohbet geçmişi ve veri saklama ayarlarını kontrol edin.
3. **Kurumsal ve bireysel hesapları ayırın.** İş verilerini, kurumunuzun onayladığı araçlar dışında kullanmayın.
4. **Herkese açık içeriğinizi gözden geçirin.** Eski profiller ve paylaşımlar da kazınabilir.
5. **Gerekirse başvurun.** Verilerinizin nasıl işlendiğini öğrenmek için veri sorumlusuna yazılı başvuru yapın; tatmin edici cevap alamazsanız şikâyet yolunu kullanın.

<div class="callout"><strong>İpucu:</strong> Başvuru yaparken hangi hizmeti, hangi hesabı ve hangi tarih aralığını kastettiğinizi net yazın ve bir kopyasını saklayın. Somut ve belgelenmiş başvurular daha hızlı sonuç verir.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Kişisel veriler, web kazıma ve ürün içi kullanım verileri yoluyla yapay zeka eğitimine girebilir.</li><li>Herkese açık bir bilgi, kişisel veri olmaktan çıkmaz.</li><li>GDPR, meşru menfaate dayalı işlemeye genel bir itiraz hakkı tanır; KVKK'daki itiraz hakkı daha dardır.</li><li>Vazgeçme ayarları genellikle ileriye dönük çalışır ve hizmetten hizmete değişir.</li><li>En etkili koruma, paylaşmadan önce düşünmek ve ayarları düzenli kontrol etmektir.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Herkese açık paylaşımlarım izinsiz kullanılabilir mi?</summary><p>Herkese açık olmak, verinin her amaçla serbestçe kullanılabileceği anlamına gelmez. Veri işleme yine bir hukuki sebebe dayanmalı ve veri koruma ilkelerine uymalıdır; ayrıntılar ülke mevzuatına göre değişir.</p></details><details><summary>Bir model eğitildikten sonra verilerimi "unutturabilir miyim"?</summary><p>Teknik olarak zor bir konu. Silme ve itiraz haklarınızı kullanabilirsiniz, ancak bunun zaten eğitilmiş bir modele nasıl yansıyacağı hizmete ve duruma göre değişir.</p></details><details><summary>KVKK ile GDPR arasındaki temel fark nedir?</summary><p>İki düzenleme benzer ilkelere dayanır, ancak kapsam ve bazı haklar farklıdır. Örneğin GDPR'daki genel itiraz hakkı KVKK'da aynı genişlikte yer almaz.</p></details><details><summary>Şirket başvuruma cevap vermezse ne yapabilirim?</summary><p>KVKK kapsamında, cevabı öğrendiğiniz tarihten itibaren otuz gün ve her hâlükârda başvuru tarihinden itibaren altmış gün içinde Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz.</p></details></div>

---

**Kaynaklar**

- [Kişisel Verileri Koruma Kurumu – Kanun Kapsamındaki Hak ve Yükümlülükler](https://www.kvkk.gov.tr/Icerik/4192/Kanun-Kapsamindaki-Hak-ve-Yukumlulukler)
- [Kişisel Verileri Koruma Kurumu – Üretken Yapay Zekâ ve Kişisel Verilerin Korunması Rehberi (15 Soruda)](https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda)
- [EDPB – EDPB opinion on AI models: GDPR principles support responsible AI (Aralık 2024)](https://www.edpb.europa.eu/news/edpb-opinion-on-ai-models-gdpr-principles-support-responsible-ai_en)
- [EDPB – Guidelines 03/2026 on web scraping in the context of generative AI (kamuoyu görüşü sürümü)](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_2020603_webscraping_v1_en_0.pdf)
- [EDPB – SME Data Protection Guide: Respect individuals' rights](https://www.edpb.europa.eu/sme-data-protection-guide/respect-individuals-rights_en)
