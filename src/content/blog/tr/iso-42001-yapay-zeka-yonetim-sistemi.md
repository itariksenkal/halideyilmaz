---
title: "ISO/IEC 42001 Mühendis Gözüyle: Yapay Zekâ Yönetim Sistemi Gerçekte Neyi Zorunlu Kılar (ve AB Yasasına Uyum Sağlamaz)"
description: "ISO/IEC 42001 nedir, Ek A kontrolleri hangi mühendislik çıktısına karşılık gelir, ISO/IEC 42005 ve 42006 ne getirdi ve neden bu standart uyumlaştırılmış standart olmadığı için AB Yapay Zekâ Yasası bakımından uygunluk karinesi sağlamaz?"
publishDate: "2026-08-13T23:26:00+03:00"
lang: tr
category: "Yönetişim"
tags: ["Yönetişim", "Yapay Zeka"]
translation: "iso-42001-ai-management-system"
heroImage:
  src: "../../../assets/blog/covers/iso-42001-yapay-zeka-yonetim-sistemi.jpg"
  alt: "ISO/IEC 42001 Mühendis Gözüyle: Yapay Zekâ Yönetim Sistemi Gerçekte Neyi Zorunlu Kılar (ve AB Yasasına Uyum Sağlamaz)"
---

Türkçe arama sonuçlarında “ISO 42001 nedir” sorusunu yanıtlayan sayfaların neredeyse tamamı belgelendirme kuruluşlarına ait ve hepsi aynı yere çıkıyor: denetim satışı. Oysa bu standardın mühendislik tarafı gerçekten öğretici; ayrıca hemen hiçbir sayfanın söylemediği kritik bir gerçek var: **ISO/IEC 42001, AB Yapay Zekâ Yasası bakımından uygunluk karinesi sağlamaz.** Bu yazı standardı bir ML ekibinin diline çeviriyor ve bu ayrımı netleştiriyor.

## Yapay Zekâ Yönetim Sistemi (AIMS) nedir, ne değildir?

ISO/IEC 42001, 18 Aralık 2023'te yayımlanan bir _yönetim sistemi_ standardı. Bu tür ile daha önce karşılaşmış olabilirsiniz: ISO 9001 kalite için, ISO/IEC 27001 bilgi güvenliği için ne yapıyorsa, 42001 de yapay zekâ için onu yapıyor. Aynı üst yapıyı kullanır: kuruluşun bağlamı, liderlik, planlama, destek, operasyon, performans değerlendirme ve iyileştirme.

Buradaki en yaygın yanlış anlama şudur: yönetim sistemi standardı, **ürününüzün iyi olduğunu söylemez**. Ürününüz hakkında karar verecek bir süreciniz olduğunu, o sürecin tanımlı, uygulanan ve denetlenebilir olduğunu söyler. Türkçesi: 42001 sertifikası “bu model adil” demez; “bu kuruluşun modelin adil olup olmadığını değerlendirecek işleyen bir mekanizması var” der.

> Yönetim sistemi standardı, sonucun değil sürecin belgesidir. Bunu karıştıran ekip, sertifikayı bir kalkan sanır; oysa o bir iskelettir.

Bu ayrım küçümsenecek bir şey değil. Çoğu kuruluşun asıl sorunu kötü modelden çok, kararın kimde olduğunun belirsizliğidir: modeli kim onayladı, hangi eşiği kim seçti, kötü giderse kim durduracak? 42001 tam olarak bu boşluğu doldurmak için yazılmış.

## Ek A kontrolleri mühendislik diline çevrildiğinde

Standardın gövdesi süreci tanımlar; asıl somut kısım ekindeki kontrol listesidir. Kontrolleri tek tek saymak yerine, bir ML ekibinin ürettiği çıktılara göre kümeleyelim — belgelendirme sayfalarının hiç yapmadığı şey budur.

-   **Politika ve rol:** yapay zekâ politikası, tanımlı roller ve sorumluluklar. Mühendislik karşılığı: model onay akışında kimin imzası gerektiğini yazan bir belge.
-   **Yaşam döngüsü yönetimi:** hedeflerin tanımlanması, tasarım, doğrulama, dağıtım, işletim ve devreden çıkarma. Karşılığı: model kayıt defteri (registry), sürümleme ve emeklilik prosedürü.
-   **Veri yönetimi:** verinin kaynağı, kalitesi, hazırlanması. Karşılığı: [veri seti künyeleri](/posts/veri-seti-belgelendirme/) ve veri hattı testleri.
-   **Etki değerlendirmesi:** sistemin bireyler ve gruplar üzerindeki etkilerinin değerlendirilmesi. Karşılığı: alt gruplara ayrılmış performans raporu ve zarar senaryoları.
-   **Bilgi ve şeffaflık:** kullanıcıya ve etkilenen taraflara sağlanan bilgi. Karşılığı: [model kartı](/posts/model-kartlari-yonetisim/) ve kullanım talimatı.
-   **Üçüncü taraf ve tedarik zinciri:** dışarıdan alınan model, veri ve hizmetler. Karşılığı: hangi temel modeli hangi lisansla kullandığınızın kaydı.

<div class="callout"><strong>İpucu:</strong> Ek A kontrollerinin tamamı zorunlu değildir; hangilerini uyguladığınızı ve hangilerini neden dışarıda bıraktığınızı gösteren bir <em>uygulanabilirlik bildirimi</em> hazırlarsınız. Bu belge denetimin merkezindedir ve dürüstçe yazıldığında kuruluşun kendisi için de en faydalı çıktıdır.</div>

## 42005 ve 42006: ailenin diğer iki üyesi

2025 yılı bu standart ailesini gerçek bir ekosisteme çeviren yıl oldu. İki yayın önemli:

-   **ISO/IEC 42005:2025** — yapay zekâ sistemi etki değerlendirmesi rehberi, 28 Mayıs 2025'te yayımlandı ([kaynak](https://webstore.iec.ch/en/publication/107659)). Bu, 42001'in “etki değerlendirmesi yapın” dediği yerde _nasıl_ sorusunu cevaplıyor.
-   **ISO/IEC 42006:2025** — yapay zekâ yönetim sistemi denetimi ve belgelendirmesi yapan kuruluşlara ilişkin gereklilikler, 7 Temmuz 2025'te yayımlandı ([kaynak](https://webstore.iec.ch/en/publication/108460)). Yani denetçiyi denetleyen standart.

42006 özellikle önemli, çünkü belgelendirme piyasasının olgunlaşma göstergesi odur. Bir standart yayımlandığı anda ortaya çıkan ilk sorun, denetimi kimin ve hangi yetkinlikle yapacağıdır. Akreditasyon tarafında ilk adım 24 Eylül 2024'te Schellman ile atıldı; BSI 10 Mart 2026'da akreditasyon aldı.

Standardın ana metnine ise [IEC Webstore](https://webstore.iec.ch/en/publication/90574) üzerinden ulaşabilirsiniz. Bu standartlar ücretli olduğu için, ücretsiz özet arayan ekiplerin çoğu ikinci elden ve çoğu zaman satış amaçlı içeriklere düşüyor — bu yazının yazılma sebeplerinden biri de bu.

## Kritik düzeltme: bu standart AB Yasasına uyum sağlamaz

Şimdi bu yazının asıl sebebine gelelim. Piyasada yaygın bir cümle dolaşıyor: “ISO 42001 alırsanız AB Yapay Zekâ Yasası'na hazır olursunuz.” Bu cümle yanlıştır ve yanlışlığı teknik bir ayrıntıya değil, mevzuatın işleyiş mantığına dayanır.

Yapay Zekâ Yasası, uygunluğun _karinesini_ yalnızca **uyumlaştırılmış standartlara** tanır. Uyumlaştırılmış standart, Komisyon'un talebi üzerine hazırlanan ve **Avrupa Birliği Resmî Gazetesi'nde atıf alan** bir standarttır. Bir standardı uyumlaştırılmış yapan şey içeriğinin kalitesi değil, bu resmî atıftır.

ISO/IEC 42001 bu atfı almamıştır. Dolayısıyla:

-   42001 sertifikası, yüksek riskli bir sistem için uygunluk karinesi **sağlamaz**.
-   Gereklilikleri karşıladığınızı yine ayrı ayrı göstermeniz gerekir; sertifika bu ispatı hafifletebilir ama yerine geçmez.
-   Uyumlaştırılmış standartların hazırlandığı komite (CEN-CENELEC bünyesindeki JTC 21) tarafında ise yaklaşık dokuz çıktıdan hiçbiri bu yazının yazıldığı tarihte Resmî Gazete'de atıf almış değil ([standardizasyon durumu](https://artificialintelligenceact.eu/standard-setting-overview/)).

<div class="callout"><strong>İpucu:</strong> Bir tedarikçi size “42001 sertifikamız var, dolayısıyla AB Yasasına uygunuz” diyorsa, tek bir soru sorun: bu standart Resmî Gazete'de atıf almış mı? Cevap hayır ise, sertifika iyi bir yönetişim işaretidir ama uygunluk beyanı değildir. Bu ayrımın kaynağı için <a href="https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/" target="_blank" rel="noopener">CSA araştırma notu</a>.</div>

> Sertifika, doğru soruyu sorduğunuzu gösterir. Cevabınızın doğru olduğunu göstermez. Mevzuat ikincisini ister.

## Peki neden yine de değerli?

Buraya kadar okuyan bir ekip haklı olarak sorabilir: uyum sağlamıyorsa neden uğraşayım? Üç iyi sebep var ve hiçbiri sertifikanın kendisi değil.

### 1\. Karar hakkını yazılı hâle getirir

Çoğu ekipte model onayı, kimsenin adının geçmediği bir rıza sürecidir. 42001, kararın kimde olduğunu yazmaya zorlar. Bu tek başına, olay anında kimin duracağını bilmek demektir — ve [olay bildirimi](/posts/yapay-zeka-olay-bildirimi/) yükümlülüğünün ön koşuludur.

### 2\. İzleme ve gözden geçirmeyi takvime bağlar

Standardın “performans değerlendirme” bölümü, ölçümü düzenli bir ritme oturtur. Modelin sahada bozulup bozulmadığını yalnızca bir şikâyet geldiğinde bakmak yerine, [izleme ve veri kayması](/posts/model-izleme-drift/) disiplinini kurumsal bir yükümlülüğe çevirir.

### 3\. Tedarik zincirini görünür kılar

Hangi temel modeli, hangi lisansla, hangi veriyle kullandığınızı kayıt altına almanız gerekir. Bu, hem [veri kökeni](/posts/veri-kokeni-ve-lisanslama/) hem de [gizlilik korumalı öğrenme](/posts/gizlilik-korumali-ogrenme/) tarafındaki kararlarınızı denetlenebilir kılar.

Kısacası 42001'in değeri, kuruluşa AB Yasasının isteyeceği belgeleri üretecek _alışkanlığı_ kazandırmasıdır. Alışkanlık değerlidir; sertifika ise onun kanıtı olabildiği ölçüde.

## Uygulama sırası: nereden başlamalı?

Sertifikasyon danışmanlığı satmadan, mühendislik gözüyle makul bir sıra:

-   **Envanter.** Kuruluşta kaç yapay zekâ sistemi var? Bu soruya ilk seferde doğru cevap veren kuruluş nadirdir; gölge kullanımlar her zaman çıkar.
-   **Sınıflandırma.** Her sistem için: hangi karara etki ediyor, kim etkileniyor, hata hâlinde ne olur? Bu, hem 42001 etki değerlendirmesinin hem de AB Yasası risk sınıflandırmasının ortak girdisidir.
-   **Boşluk analizi.** Ek A kontrollerini mevcut pratiğinizle karşılaştırın. Çoğu ekip kontrollerin yarısını zaten yapıyor, ama yazmıyor.
-   **Uygulanabilirlik bildirimi.** Neyi neden uyguladığınızı yazın. Dışarıda bıraktığınız kontrolün gerekçesi, uyguladığınızınki kadar önemlidir.
-   **Ölçüm.** “Performans değerlendirme” maddesini gerçek metriklerle doldurun. Hangi metriğin ne zaman doğru olduğu için [sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/).
-   **Sonra sertifika.** İlk beş adımı yapmadan denetime girmek, sınavdan önce konuyu öğrenmemek gibidir; belgeyi alırsınız, faydayı almazsınız.

Ve son not: etki değerlendirmesi konusunda üç farklı rejim var ve ekipler bunları sürekli karıştırıyor — ISO/IEC 42005, AB Yasasının temel haklar etki değerlendirmesi ve veri koruma etki değerlendirmesi. Aralarındaki farkı [etki değerlendirmesi yazısında](/posts/yapay-zeka-etki-degerlendirmesi/) ayırıyoruz.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>ISO/IEC 42001 bir yönetim sistemi standardıdır: ürününüzün iyi olduğunu değil, karar sürecinizin tanımlı olduğunu belgeler.</li><li>Ek A kontrolleri, doğru okunduğunda model kayıt defteri, veri künyesi, model kartı ve alt grup raporundan ibarettir.</li><li>ISO/IEC 42005:2025 etki değerlendirmesini, ISO/IEC 42006:2025 ise denetçinin kendisini standartlaştırdı.</li><li>Standart uyumlaştırılmış standart değildir ve Resmî Gazete'de atıf almadığı için AB Yasası bakımından uygunluk karinesi sağlamaz.</li><li>Değeri sertifikada değil, AB Yasasının isteyeceği belgeleri üretecek alışkanlığı kurmasında.</li></ul></div>

<div class="faq"><details><summary>ISO/IEC 42001 sertifikası AB Yapay Zekâ Yasası'na uyum sağlar mı?</summary><p>Hayır. Uygunluk karinesi yalnızca Avrupa Birliği Resmî Gazetesi'nde atıf almış uyumlaştırılmış standartlara tanınır ve ISO/IEC 42001 bu atfı almamıştır. Sertifika iyi bir yönetişim göstergesidir ve hazırlığınızı kolaylaştırır; ancak gerekliliklerin karşılandığını ayrıca göstermeniz gerekir.</p></details><details><summary>ISO/IEC 27001 belgemiz var, 42001 için ne kadar ek iş çıkar?</summary><p>Üst yapı aynı olduğu için yönetim sistemi iskeletinin büyük kısmı yeniden kullanılabilir. Asıl ek iş, yapay zekâya özgü kontrollerde toplanır: veri kaynağı ve kalitesi, etki değerlendirmesi, model yaşam döngüsü ve üçüncü taraf model kullanımı. Bunlar bilgi güvenliği standardında karşılığı olmayan başlıklardır.</p></details><details><summary>Küçük bir ekibiz. Sertifikasyona girmeden standarttan yararlanabilir miyiz?</summary><p>Evet, ve çoğu ekip için doğrusu budur. Envanter, sınıflandırma, boşluk analizi ve uygulanabilirlik bildirimi adımları denetim olmadan da yapılabilir ve faydanın büyük kısmını üretir. Sertifika esas olarak dışa dönük bir kanıt ihtiyacı doğduğunda anlamlıdır.</p></details></div>

---

Özetle: ISO/IEC 42001 iyi bir iskelet, kötü bir kalkan. İçini gerçek ölçümlerle ve gerçek kayıtlarla dolduran kuruluş için hem yönetişimi hem de mevzuat hazırlığını kolaylaştırır. Sertifikayı uyumun kendisi sanan kuruluş içinse, pahalı bir yanlış güvenlik hissi üretir.
