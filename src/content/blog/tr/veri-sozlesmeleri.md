---
title: "Veri Sözleşmeleri: ML Boru Hattınızı Sessizce Bozan Şema Değişikliklerini Durdurmak"
description: "Yukarı akıştaki sessiz bir değişiklik modeli bozar ama hiçbir veri alarmını tetiklemez. Veri sözleşmesi nedir, ODCS hangi bölümlerden oluşur, CI'da nasıl zorunlu kılınır ve 2026'da araç sahipliği neden yeniden çizildi?"
publishDate: "2026-08-13T23:20:00+03:00"
lang: tr
category: "Veri"
tags: ["Veri", "Yapay Zeka"]
translation: "data-contracts-for-ml"
heroImage:
  src: "../../../assets/blog/covers/veri-sozlesmeleri.jpg"
  alt: "Veri Sözleşmeleri: ML Boru Hattınızı Sessizce Bozan Şema Değişikliklerini Durdurmak"
---

Bir modelin sahada bozulmasının en sık sebebi kavram kayması değil; yukarı akıştaki bir ekibin, sizden habersiz, masum görünen bir değişiklik yapmasıdır. Bir alanın birimi değişir, bir kategori yeniden adlandırılır, bir boş değer oranı sessizce yükselir. Veri alarmı çalmaz, çünkü teknik olarak hiçbir şey bozulmamıştır. Model bozulur. Veri sözleşmesi, tam olarak bu sessiz kırılmayı gürültülü hâle getirmek için var.

## Sessiz kırılma nasıl olur?

Klasik boru hattı hatası gürültülüdür: bir sütun kaybolur, iş akışı çöker, birisi uyanır. Asıl tehlikeli olan diğeridir — boru hattı çalışmaya devam eder, sayılar üretilir, gösterge tabloları yeşil kalır ve model haftalar boyunca sessizce kötüleşir.

Tipik senaryolar:

-   **Birim değişikliği:** bir tutar alanı kuruştan liraya geçer. Şema aynıdır, tip aynıdır, değer aralığı yüz kat kayar.
-   **Kategori yeniden adlandırma:** `"tr"` yerine `"TR"` yazılmaya başlanır. Kodlayıcı bunu bilinmeyen kategori olarak görür ve sessizce varsayılana düşer.
-   **Boş değer oranı sıçraması:** yukarı akıştaki bir servis zaman aşımına düşmeye başlar; alan çoğunlukla boş gelir. Doldurma (imputation) devreye girer ve model artık gerçek bir sinyali değil, ortalamayı görür.
-   **Geriye dönük doldurma:** yukarı akış geçmiş kayıtları düzeltir. Eğitim verisi artık, tahmin anında var olmayan bilgiyi içerir — yani [sızıntı](/posts/veri-sizintisi-capraz-dogrulama/).
-   **Anlam kayması:** alan adı aynı kalır, tanımı değişir. “aktif kullanıcı” 30 günden 7 güne iner. Hiçbir teknik kontrol bunu yakalayamaz; yalnızca yazılı bir tanım yakalar.

> Veri boru hattınızdaki en pahalı hata, hata vermeyen hatadır. Çöken bir işi düzeltirsiniz; sessizce yanlış çalışan bir işi ancak aylar sonra fark edersiniz.

## Veri sözleşmesi tam olarak nedir?

Veri sözleşmesi, bir veri ürününü üreten taraf ile tüketen taraf arasında, _makine tarafından kontrol edilebilir_ bir anlaşmadır. API sözleşmesinin veri tarafındaki karşılığıdır: yalnızca şema değil, anlam, kalite beklentisi, tazelik ve değişiklik yönetimi de içerir.

Bu alandaki açık spesifikasyon, Bitol projesi altında geliştirilen ve Linux Foundation AI & Data bünyesinde yürüyen **Open Data Contract Standard (ODCS)**. Standart on bir bölüm tanımlıyor: Temeller, Şema, Referanslar, Veri Kalitesi, Destek ve İletişim Kanalları, Fiyatlandırma, Ekip, Roller, Hizmet Seviyesi Anlaşması, Altyapı ve Sunucular, Özel ve Diğer Nitelikler ([belgeler](https://bitol-io.github.io/open-data-contract-standard/latest/)).

Burada dürüst bir not düşmek gerekiyor: standardın en son sürümü **v3.1.0 ve 8 Aralık 2024 tarihli**; 2025 veya 2026'da yeni bir sürüm yayımlanmadı ([sürümler](https://github.com/bitol-io/open-data-contract-standard/releases)). Yani “hızla gelişen bir standart” değil; oturmuş ve şu an sakin bir standart. Asıl hareket araç tarafında: **datacontract-cli 1.1.0 (4 Ağustos 2026) ODCS'i doğrudan destekliyor** ([paket](https://pypi.org/project/datacontract-cli/)), yani sözleşmeler artık sürekli tümleştirmede zorunlu kılınabiliyor.

<div class="callout"><strong>İpucu:</strong> Sözleşmeyi tüketen tarafın yazması cazip gelir, ama işe yaramaz. Sözleşmeyi <em>üreten taraf</em> sahiplenmeli; çünkü değişikliği yapan odur. Tüketenin yazdığı sözleşme, bir dilek listesidir.</div>

## ML için sözleşmeye ne yazmalı?

Genel veri mühendisliği sözleşmeleri şema ve tazelikte durur. ML tüketicisinin ihtiyaçları biraz farklıdır; aşağıdaki dört başlık çoğu şablonda eksiktir.

### 1\. Dağılım beklentisi, sadece tip değil

Bir alanın `float` olması yetmez; beklenen aralığı, boş değer oranı üst sınırı ve kategorik alanlarda izin verilen değer kümesi de yazılmalıdır. Model, tipi değil dağılımı öğrenir.

### 2\. Anlam tanımı ve değişiklik bildirimi

Her alan için tek cümlelik bir tanım. Ve kritik olan: bu tanımın değişmesi, şemanın değişmesiyle aynı ciddiyette bir kırılma sayılmalı.

### 3\. Zaman semantiği

Bir kayıt hangi ana aittir: olayın gerçekleştiği an mı, sisteme girdiği an mı? Geriye dönük düzeltme yapılıyor mu, yapılıyorsa ne kadar geriye? Bu iki soru, nokta-zaman doğruluğunun temelidir; ayrıntısı [eğitim-servis farkı](/posts/ozellik-deposu-egitim-servis-farki/) yazısında.

### 4\. Etiketin kendisi

Hedef değişken de bir veri ürünüdür ve genellikle hiç sözleşmeye bağlanmaz. Etiket nasıl üretiliyor, ne kadar gecikmeyle geliyor, tanımı değişti mi? [Veri kalitesi ve etiketleme](/posts/veri-kalitesi-etiketleme/) disiplini burada sözleşmeye dönüşmeli.

```python
# Sözleşme kontrolü, veri hattının GİRİŞİNDE çalışır (pseudocode)
sozlesme = yukle("contracts/musteri_ozellikleri.yaml")

for alan in sozlesme.alanlar:
    kontrol_et(tip(alan))                       # tip
    kontrol_et(bos_oran(alan) <= alan.max_bos)  # tamlık
    if alan.kategorik:
        kontrol_et(set(degerler(alan)) <= alan.izinli_degerler)
    else:
        kontrol_et(alan.min <= degerler(alan) <= alan.max)
kontrol_et(tazelik(veri) <= sozlesme.sla.gecikme)

# İhlal davranışı, ihlalin türüne göre AYRI olmalı:
#   şema ihlali        -> hattı durdur
#   dağılım ihlali     -> uyar, eğitimi engelle, servisi engelleme
#   tazelik ihlali     -> uyar ve son geçerli anlık görüntüyle devam et
# Her ihlali "durdur" yapan ekip, alarmları kapatır.
```

## Araç dünyası 2026'da yeniden çizildi

Bu konuda arama sonuçlarında ilk sıralarda yer alan sayfaların neredeyse tamamı aynı karşılaştırmayı yapıyor: “Great Expectations mı, Soda mı, dbt testleri mi?”. O karşılaştırma artık sahiplik ve lisans bakımından güncel değil.

-   **Fivetran ve dbt Labs birleşmesi 1 Haziran 2026'da tamamlandı** ([duyuru](https://www.fivetran.com/press/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents)). Birleşen şirket dbt Core'u açık tutmayı ve SQL ile Iceberg gibi açık standartlar üzerine inşa etmeyi taahhüt ediyor.
-   **Great Expectations'ın açık kaynak deposu artık Fivetran'ın GitHub organizasyonu altında** (GX 1.20.0, 7 Ağustos 2026 — [paket](https://pypi.org/project/great-expectations/)).
-   **soda-core 4.20.0 tescilli (proprietary) lisanslı** ([paket](https://pypi.org/project/soda-core/)). Aracı “açık kaynak alternatif” olarak öneren her sayfa bu noktada yanılıyor.
-   dbt ekosisteminde dbt-core 1.12.2 (12 Ağustos 2026) ve dbt-yerel bir seçenek olarak Elementary 0.25.1 mevcut.

<div class="callout"><strong>İpucu:</strong> Araç seçiminden önce lisans ve sahiplik durumunu kendiniz doğrulayın — paket sayfasından, blog yazısından değil. Bu alanda bir yılda değişen şey, aracın yeteneği değil kimin elinde olduğu oldu; ve bu, üç yıllık bir bağımlılık kararında yetenekten daha belirleyicidir.</div>

Araç seçiminin kendisi ise ikincil. Sözleşmenin değeri, hangi kütüphaneyle kontrol edildiğinden değil, kontrolün _nerede_ çalıştığından gelir: veri hattının girişinde ve sürekli tümleştirmede. Gece çalışan bir raporda değil.

## Mevzuat bağlantısı: sözleşme aslında bir belge

Veri sözleşmesini bir mühendislik konforu sanmak kolay. Oysa AB Yapay Zekâ Yasası'nın 10. maddesi, yüksek riskli sistemler için hazırlık işlemlerinin — etiketleme, temizleme, güncelleme, zenginleştirme, birleştirme — belgelenmesini bir yönetişim yükümlülüğü hâline getiriyor ([Madde 10](https://artificialintelligenceact.eu/article/10/)).

Bir veri sözleşmesi tam olarak bunu kodlar. Üstelik bir belgeden daha iyisini yapar: kendini doğrular. Word dosyasındaki bir veri tanımı zamanla gerçeklikten ayrılır; sürekli tümleştirmede çalışan bir sözleşme ayrılamaz, çünkü ayrıldığı anda kırmızıya döner.

> Kendini test etmeyen dokümantasyon, yazıldığı gün doğrudur ve o günden sonra giderek yanlışlaşır. Veri sözleşmesinin asıl üstünlüğü budur.

Bu mantık veri seti belgelendirmesiyle de doğrudan bağlanıyor: sözleşme _akan_ veriyi tanımlar, künye ise _donmuş_ bir sürümü. İkisi birlikte, [veri seti belgelendirme](/posts/veri-seti-belgelendirme/) yazısında anlattığımız Ek IV dokümantasyonunun veri bölümünü neredeyse otomatik üretir.

## Nereden başlamalı: tek bir tablodan

Bütün veri platformunu sözleşmelendirmeye çalışan ekipler genellikle hiçbir sözleşme üretemeden vazgeçer. İşleyen sıra çok daha dar:

-   **1\. En çok acıtan tabloyu seçin.** Geçen yıl bir olaya sebep olmuş tabloyu. Sözleşme kültürü, teoriyle değil bir yara iziyle başlar.
-   **2\. Mevcut hâli yazın, ideali değil.** Bugünkü boş değer oranı neyse onu yazın. İdeal değerlerle başlayan sözleşme ilk gün kırmızı yanar ve kapatılır.
-   **3\. Üreten tarafı sahibi yapın.** Sözleşme, üretenin deposunda yaşamalı ve onun sürekli tümleştirmesinde çalışmalı.
-   **4\. İhlal davranışını türe göre ayırın.** Şema ihlali durdurur, dağılım ihlali uyarır. Bu ayrım, alarm yorgunluğunu önleyen tek şeydir.
-   **5\. Etiketi de sözleşmeye alın.** Çoğu ekip özelliklere sözleşme yazar, hedefe yazmaz — oysa en pahalı sessiz kırılmalar etiket tarafında olur.
-   **6\. Sonra genişletin.** Bir sözleşme çalıştığında ikincisi çok daha kolay gelir; çünkü artık örnek vardır.

Ve son bir bağlantı: sözleşme, [özellik mühendisliği](/posts/ozellik-muhendisligi/) tarafındaki dönüşümlerin de girdi varsayımını sabitler. Özelliklerinizin dayandığı ham alanlar sözleşmesizse, en dikkatli özellik kodu bile kum üzerine yazılmıştır.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>En pahalı veri hatası, hata vermeyen hatadır: boru hattı çalışır, gösterge yeşil kalır, model sessizce kötüleşir.</li><li>ODCS on bir bölüm tanımlar; en son sürümü v3.1.0 ve 8 Aralık 2024 tarihli, yani standart oturmuş durumda.</li><li>Asıl hareket araç tarafında: datacontract-cli 1.1.0 ODCS'i destekliyor, yani sözleşmeler CI'da zorunlu kılınabiliyor.</li><li>Sahiplik ve lisans 2026'da yeniden çizildi: dbt Labs Fivetran ile birleşti, GX deposu Fivetran organizasyonuna geçti, soda-core tescilli lisanslı.</li><li>İhlal davranışını türe göre ayırın: şema ihlali durdurur, dağılım ihlali uyarır; hepsini durduran ekip alarmları kapatır.</li></ul></div>

<div class="faq"><details><summary>Veri sözleşmesi ile şema doğrulama aynı şey mi?</summary><p>Hayır. Şema doğrulama, tip ve alan varlığını kontrol eder. Veri sözleşmesi bunun üstüne dağılım beklentisi, anlam tanımı, tazelik taahhüdü, sahiplik ve değişiklik yönetimi ekler. ML için asıl kırılmalar tipte değil, dağılımda ve anlamda olur.</p></details><details><summary>Sözleşmeyi kim yazmalı: veri üreten ekip mi, ML ekibi mi?</summary><p>Sahibi üreten ekip olmalı, çünkü değişikliği yapan odur ve sözleşme onun sürekli tümleştirmesinde çalışmalıdır. ML ekibi ise beklentileri tanımlar ve gözden geçirir. Yalnızca tüketenin yazdığı bir sözleşme, kimseyi bağlamayan bir dilek listesidir.</p></details><details><summary>Sözleşme ihlali her zaman boru hattını durdurmalı mı?</summary><p>Hayır, bu alarm yorgunluğuna giden en hızlı yoldur. Şema ihlalinde durdurmak makul; dağılım ihlalinde uyarıp yeni eğitim çalıştırmalarını engellemek ama servisi kesmemek genellikle daha doğrudur. Tazelik ihlalinde ise son geçerli anlık görüntüyle devam etmek çoğu üründe en az zararlı davranıştır.</p></details></div>

---

Özetle: veri sözleşmesi, veri ekibiyle ML ekibi arasındaki sözlü mutabakatı makine tarafından kontrol edilebilir hâle getirir. Tek bir tabloyla başlayan ekip, birkaç ay içinde sessiz kırılmaların çoğunu gürültülü hâle getirir. Gürültülü kırılma iyi haberdir; sessiz olanı sizi aylarca yanıltır.
