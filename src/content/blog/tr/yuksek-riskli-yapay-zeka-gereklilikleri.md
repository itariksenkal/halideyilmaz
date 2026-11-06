---
title: "Yüksek Riskli Yapay Zekâ Sistemleri: Bir ML Ekibinin Aralık 2027'ye Kadar Gerçekten Kurması Gerekenler"
description: "Yüksek riskli yapay zekâ sistemleri için Madde 9-15 yükümlülüklerini hukuk diliyle değil mühendislik çıktısıyla anlatıyoruz: risk kaydı, veri yönetişimi, Ek IV teknik dokümantasyon, olay kaydı, doğruluk beyanı ve insan gözetimi tasarımı."
publishDate: "2026-08-13T23:28:00+03:00"
lang: tr
category: "Yönetişim"
tags: ["Yönetişim", "Yapay Zeka"]
translation: "high-risk-ai-system-requirements"
heroImage:
  src: "../../../assets/blog/bimg-02.jpg"
  alt: "Yüksek Riskli Yapay Zekâ Sistemleri: Bir ML Ekibinin Aralık 2027'ye Kadar Gerçekten Kurması Gerekenler"
---

Yüksek riskli yapay zekâ sistemlerine ilişkin yükümlülükler (AB) 2026/1744 sayılı Tüzükle 2 Aralık 2027'ye alındı. Bu, kaçırılmış bir tarih değil, açık bir inşa penceresi. Ama Türkçe kaynakların neredeyse tamamı risk _kategorilerini_ anlatıp duruyor; hiçbiri bu yükümlülüklerin hangi dosyaya, hangi tabloya, hangi log satırına karşılık geldiğini söylemiyor. Bu yazı tam olarak onu yapıyor: Madde 9-15'i bir ML ekibinin üreteceği somut çıktılara çeviriyor.

## Önce kapsam: sizin sisteminiz gerçekten yüksek riskli mi?

Bu sorunun cevabını yanlış vermek, iki yönde de pahalıdır. Gereksiz yere yüksek riskli sayarsanız bir yıl boyunca ihtiyacınız olmayan belgeleri üretirsiniz; kapsam dışı sayarsanız 2 Aralık 2027'de piyasadan çekilmek zorunda kalırsınız.

Tüzük iki ayrı yol tanımlar. Birincisi **Ek I**: sistem, hâlihazırda düzenlenmiş bir ürünün güvenlik bileşeniyse veya kendisi böyle bir ürünse — tıbbi cihaz, asansör, makine, oyuncak, havacılık ekipmanı gibi. Bu yol için tarih **2 Ağustos 2028**. İkincisi **Ek III**: sistem, listelenen sekiz alandan birinde kullanılıyorsa — biyometri, kritik altyapı, eğitim ve mesleki eğitim, istihdam ve işçi yönetimi, temel özel ve kamusal hizmetlere erişim, kolluk, göç ve sınır yönetimi, adalet ve demokratik süreçler. Bu yol için tarih **2 Aralık 2027**.

<div class="callout"><strong>İpucu:</strong> Kapsam kararını bir toplantı notunda değil, sürümlenmiş bir belgede tutun. “Neden yüksek riskli saymadık?” sorusunun cevabı, iki yıl sonra hatırlanacak bir şey değil, bugün yazılacak bir gerekçedir. Bu gerekçe zaten teknik dokümantasyonun ilk sayfasıdır.</div>

Takvimin tamamını ve neyin neden değiştiğini [yeni takvim yazısında](/posts/yapay-zeka-yasasi-yeni-takvim/) ayrıntısıyla ele aldık; burada doğrudan yükümlülüklerin içine giriyoruz.

## Madde 9: risk yönetimi bir PDF değil, bir kayıttır

Madde 9, sistemin tüm yaşam döngüsü boyunca sürdürülen, planlanan ve yinelenen bir risk yönetim sistemi ister. Buradaki anahtar kelime **sürdürülen**. Tek seferlik bir değerlendirme, tanım gereği yükümlülüğü karşılamaz.

Mühendislik karşılığı, aslında bir hata takip sisteminden çok da farklı değil: her risk için tanımlanmış bir sahip, bir olasılık-etki tahmini, alınan azaltıcı önlem, azaltma sonrası kalan risk ve bu değerlendirmenin hangi sürümde, hangi veriyle, hangi ölçümle yapıldığı. Kayıt, model sürümüyle birlikte ilerlemeli; yeni bir model çıktığında risk kaydı otomatik olarak “gözden geçirilmeli” durumuna düşmeli.

-   **Öngörülebilir yanlış kullanım:** sistemin amaçlanan kullanımı kadar, makul biçimde öngörülebilen yanlış kullanımı da kaydedilmelidir. Bu maddeyi çoğu ekip atlar.
-   **Kalan risk:** sıfıra indirilemeyen riskler kullanım talimatında açıkça bildirilmelidir.
-   **Test:** risk yönetimi, tanımlanmış ölçütlere karşı yapılan testlerle desteklenmelidir — yani ölçüm, risk kaydının kanıtıdır.

> Risk kaydı, ekibin modelin nerede çalışmadığını yazılı olarak kabul ettiği tek belgedir. Bu yüzden en kıymetli olan da odur.

## Madde 10: veri yönetişimi, veri kalitesinin mevzuattaki adı

Madde 10, bu yazının ML ekibine en yakın maddesi. Eğitim, doğrulama ve test kümelerinin _amaca uygun biçimde yeterince temsil gücü taşıması_ ve _mümkün olan en iyi ölçüde hatasız ve eksiksiz olması_ isteniyor. Bu ifade önemlidir: mutlak bir hatasızlık değil, amaca göre tanımlanmış ve gösterilebilir bir çaba talep ediliyor.

Madde ayrıca sekiz ayrı yönetişim pratiğini sayıyor: tasarım tercihleri; veri toplama süreçleri ve verinin kökeni; hazırlık işlemleri (etiketleme, temizleme, güncelleme, zenginleştirme, birleştirme); varsayımların formüle edilmesi; veri miktarının ve uygunluğunun değerlendirilmesi; olası önyargıların incelenmesi; bu önyargılara karşı alınan önlemler; ve veri boşluklarının tespiti.

### Bunun karşılığı ne üretmek demek?

-   **Veri seti künyesi:** her veri kümesi için nereden geldiği, hangi izinle toplandığı, hangi sürümün hangi modeli eğittiği. [Veri seti belgelendirme](/posts/veri-seti-belgelendirme/) yazısı bunun şablonunu veriyor.
-   **Hazırlık işlemlerinin kaydı:** temizleme kuralları koda gömülü olabilir, ama hangi kuralın hangi tarihte devreye girdiği koddan okunmaz; sürüm notu gerekir.
-   **Önyargı incelemesi:** alt gruplara ayrılmış performans tabloları. Bunun nasıl yapıldığını [önyargı ve adalet](/posts/onyargi-ve-adalet/) yazısında anlattık.
-   **Kapsam boşluğu analizi:** hangi durum, hangi dil, hangi cihaz, hangi coğrafya veri kümesinde temsil edilmiyor?

<div class="callout"><strong>İpucu:</strong> Madde 10, önyargı tespiti amacıyla özel nitelikli kişisel verilerin işlenmesine dar ve koşullu bir kapı açar. “Etnik köken verisi tutmuyoruz, o yüzden adalet denetimi yapamıyoruz” savunması, bu kapının varlığı bilindiğinde zayıflar. Koşulların tamamı sağlanmadan bu yola girilmez; ayrıntı için <a href="/posts/adalet-denetimi-pratikte/">adalet denetimi</a> yazısına bakın.</div>

## Madde 11-12: teknik dokümantasyon ve otomatik kayıt

Madde 11 ve Ek IV, teknik dokümantasyonun içeriğini belirler: sistemin genel tanımı; unsurlarının ve geliştirme sürecinin ayrıntılı açıklaması; izleme, işleyiş ve kontrol bilgileri; risk yönetim sistemi; yaşam döngüsü boyunca yapılan değişiklikler; uygulanan standartların listesi; uygunluk beyanının bir kopyası; ve piyasaya arz sonrası izleme planı. Küçük ve mikro işletmeler için basitleştirilmiş bir form öngörülmüştür ve Omnibus bu kolaylığı orta ölçekli işletmelere de açmıştır.

Madde 12 ise otomatik olay kaydı ister: sistem, çalışma süresi boyunca kendi olaylarını kaydedebilmelidir. Bunu “log tutuyoruz zaten” diye geçiştirmeyin. Gerekli olan, bir kararı sonradan yeniden kurabilmenizi sağlayan kayıttır: hangi model sürümü, hangi girdi özeti, hangi çıktı, hangi eşik, hangi insan müdahalesi.

```text
# Karar kaydında en az bulunması gerekenler (pseudocode)
kayit = {
  "karar_id":        uuid(),
  "zaman":           utc_now(),
  "model_surumu":    MODEL_VERSION,      # eğitim çalıştırmasına kadar izlenebilir
  "veri_seti_surumu": DATASET_VERSION,
  "girdi_ozeti":     hash(girdi),        # ham kişisel veri değil, özet
  "cikti":           skor,
  "esik":            AKTIF_ESIK,         # eşik değişimi de bir olaydır
  "insan_muhadalesi": operator_karari,   # yok / onay / geçersiz kılma
  "aciklama_kaydi":  ozellik_katkilari   # varsa
}
# Kural: model sürümünden eğitim verisine geri yürüyemiyorsanız,
#        kaydınız bir olay bildirimini karşılamaz.
```

Bu kaydın neden bu kadar önemli olduğunu [olay bildirimi ve piyasaya arz sonrası izleme](/posts/yapay-zeka-olay-bildirimi/) yazısında anlatıyoruz: 15 günlük bildirim süresi, kaydınız yoksa 15 günlük arkeoloji projesine dönüşür.

## Madde 13-15: şeffaflık, insan gözetimi ve beyan edilen doğruluk

**Madde 13**, kullanıcının sistemi doğru yorumlayabilmesi için gereken bilgiyi ister: kullanım amacı, doğruluk seviyeleri, bilinen sınırlar, gerekli bakım. Bu bir kullanım talimatıdır ve pratikte model kartının kurumsal sürümüdür.

**Madde 14**, insan gözetiminin _tasarlanmasını_ ister. Buradaki incelik şudur: “insan son kararı verir” cümlesi tek başına gözetim değildir. Otomasyon yanlılığı gerçektir; ekranda yüksek güvenle gösterilen bir skor, insan denetçiyi onaylamaya iter. Gözetim tasarımı, insanın gerçekten farklı bir karar verebileceği koşulları üretmeli: kararın gerekçesini görebilmeli, düşük güvenli vakaları ayırt edebilmeli, geçersiz kılma işlemi kolay ve kayıt altında olmalı.

**Madde 15**, bu yazının en çok gözden kaçan hükmü: sağlayıcı, kullanım talimatında _doğruluk seviyelerini ve ilgili doğruluk metriklerini beyan etmek_ zorundadır. Aynı madde sağlamlık, siber güvenlik ve geri besleme döngülerine karşı önlem ister; veri zehirlenmesi, model zehirlenmesi, çekişmeli örnekler ve gizlilik saldırıları açıkça sayılır.

> Beyan edilen tek bir doğruluk sayısı, güven aralığı olmadan bir bilimsel iddia değil, bir uyum belgesidir. Yanlışsa sonucu da farklıdır.

Bu yüzden ölçme disiplini artık isteğe bağlı değil. Hangi metriğin ne zaman doğru olduğu [sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/) yazısında; bir farkın gerçek olup olmadığını nasıl anlayacağınız [güven aralığı ve bootstrap](/posts/model-karsilastirma-istatistik/) yazısında; olasılıkların ne anlama geldiği [model kalibrasyonu](/posts/model-kalibrasyonu/) yazısında.

## Uygunluk değerlendirmesi ve hazır olmayan standartlar

Belgeler tamamlandığında sıra uygunluk değerlendirmesine gelir: sağlayıcı, sistemin gereklilikleri karşıladığını değerlendirir, bir uygunluk beyanı düzenler, CE işaretini iliştirir ve sistemi AB veri tabanına kaydettirir. Ek III'ün çoğu alanı için bu değerlendirme sağlayıcının kendisi tarafından yapılabilir; belirli durumlarda onaylanmış kuruluş devreye girer.

Burada dürüst olmak gerekiyor: uygunluk değerlendirmesinin dayanacağı **uyumlaştırılmış standartlar henüz hazır değil**. CEN-CENELEC bünyesindeki JTC 21 komitesinin yaklaşık dokuz çıktısından hiçbiri, bu yazının yazıldığı tarih itibarıyla Resmî Gazete'de atıf almış değil; Komisyon 2025 yılında standardizasyon çalışmalarındaki gecikmeleri resmen kayda geçirdi. Ertelemenin gerçek sebebi de kısmen budur.

<div class="callout"><strong>İpucu:</strong> Standart yokluğu bir bekleme gerekçesi değil. Uyumlaştırılmış standart, uygunluğun <em>karinesini</em> sağlar; yokluğunda gereklilikleri başka yollarla karşıladığınızı göstermeniz gerekir. Bu da daha fazla belge demektir, daha az değil.</div>

Bu boşluğu ISO/IEC 42001 belgesiyle kapattığını sanan ekipler için önemli bir uyarı var: o standart uyumlaştırılmış standart değildir ve AB Yapay Zekâ Yasası bakımından uygunluk karinesi sağlamaz. Nedenini [ISO/IEC 42001 yazısında](/posts/iso-42001-yapay-zeka-yonetim-sistemi/) ayrıntısıyla açıklıyoruz.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Ek III sistemleri için tarih 2 Aralık 2027, Ek I için 2 Ağustos 2028; bu bir kaçırılmış tarih değil, açık bir inşa penceresi.</li><li>Madde 9 sürdürülen bir risk kaydı ister; tek seferlik bir değerlendirme tanım gereği yetersizdir.</li><li>Madde 10, veri kalitesini bir mühendislik erdemi olmaktan çıkarıp belgelenebilir bir yükümlülüğe çevirir.</li><li>Madde 12 kaydı, olay bildiriminin altyapısıdır: model sürümünden eğitim verisine geri yürüyebilmelisiniz.</li><li>Madde 15 doğruluk beyanı ister; güven aralığı olmayan bir skor artık sadece kötü bilim değil, zayıf bir uyum belgesidir.</li></ul></div>

<div class="faq"><details><summary>Sistemim Ek III listesinde ama sadece dar bir yardımcı işlev görüyor. Yine de yüksek riskli mi?</summary><p>Tüzük, Ek III kapsamındaki bir alanda kullanılsa bile karar üzerinde anlamlı etkisi olmayan, dar bir usul görevi yerine getiren veya insan değerlendirmesini yalnızca hazırlayan sistemler için istisna öngörür. Ancak bu istisnayı kullanan sağlayıcının değerlendirmesini belgelemesi ve sistemi yine de kaydettirmesi beklenir; sessizce kapsam dışı saymak bir seçenek değildir.</p></details><details><summary>ISO/IEC 42001 belgesi alırsam uyum sağlamış olur muyum?</summary><p>Hayır. ISO/IEC 42001 bir yönetim sistemi standardıdır ve iyi bir yönetişim iskeleti kurar, ancak uyumlaştırılmış standart olarak Resmî Gazete'de atıf almadığı için AB Yapay Zekâ Yasası bakımından uygunluk karinesi sağlamaz. İkisi birbirini tamamlar, biri diğerinin yerine geçmez.</p></details><details><summary>Belgeleri 2027'de toplu olarak hazırlasak olmaz mı?</summary><p>Bir kısmını hazırlayabilirsiniz, ama en kritik kısmını hazırlayamazsınız. Veri toplama sürecinin, hazırlık işlemlerinin ve model sürümlerinin kaydı geçmişe dönük üretilemez. Bugün tutmadığınız kaydı 2027'de yazmak, belgelemek değil hatırlamaya çalışmak olur.</p></details></div>

---

Özetle: yüksek riskli sistem yükümlülüklerinin büyük kısmı, iyi bir ML ekibinin zaten yapması gereken şeylerin yazıya dökülmüş hâlidir. Aradaki fark, artık yazmanın da bir teslim kalemi olması. On altı ayı belge yığmak için değil, kayıt tutan bir sistem kurmak için kullanan ekip, 2 Aralık 2027'de telaşa kapılmayacak olan ekiptir.
