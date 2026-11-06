---
title: "Yapay Zekâ Üretimi İçeriği Etiketlemek: Madde 50, Makine Okunur Filigran ve C2PA"
description: "Madde 50 şeffaflık yükümlülükleri 2 Ağustos 2026'da yürürlüğe girdi ve ertelenmedi. Makine okunur işaretlemenin ne demek olduğunu, sıkı ve gevşek bağlama farkını, C2PA içerik kimlik bilgilerini ve filigranın neden yeniden kodlamada öldüğünü anlatıyoruz."
publishDate: "2026-08-13T23:27:00+03:00"
lang: tr
category: "Yönetişim"
tags: ["Yönetişim", "Yapay Zeka"]
translation: "ai-content-labeling-transparency"
heroImage:
  src: "../../../assets/blog/bimg-03.jpg"
  alt: "Yapay Zekâ Üretimi İçeriği Etiketlemek: Madde 50, Makine Okunur Filigran ve C2PA"
---

Yapay zekâ üretimi içeriğin etiketlenmesi artık bir iyi niyet meselesi değil, yürürlükteki bir yükümlülük. AB Yapay Zekâ Yasası'nın Madde 50'si 2 Ağustos 2026'da uygulanmaya başladı ve Temmuz 2026 değişikliğinde **ertelenmedi**. Buna karşılık yükümlülüğün teknik yarısı — “makine okunur işaretleme” tam olarak nedir, nasıl uygulanır ve neden çoğu zaman çalışmaz — neredeyse hiçbir yerde anlatılmıyor. Bu yazı o yarıyı anlatıyor.

## Madde 50 tam olarak ne istiyor?

Madde 50 tek bir kural değil, dört ayrı yükümlülük demeti. Kimin sorumlu olduğu da değişiyor: bazıları sistemi geliştiren _sağlayıcıya_, bazıları sistemi kullanan _uygulayıcıya_ düşüyor.

-   **Etkileşim bildirimi (sağlayıcı):** gerçek kişilerle doğrudan etkileşime giren sistemler, kişinin bir yapay zekâ ile etkileşimde olduğunu bilmesini sağlayacak biçimde tasarlanmalıdır — durum bağlamdan zaten makul biçimde anlaşılıyorsa bu gerekmez.
-   **Sentetik içeriğin işaretlenmesi (sağlayıcı):** sentetik ses, görüntü, video veya metin üreten sistemlerin çıktıları _makine okunur_ biçimde işaretlenmeli ve yapay olarak üretildiği veya değiştirildiği tespit edilebilmelidir.
-   **Duygu tanıma ve biyometrik sınıflandırma (uygulayıcı):** maruz kalan kişiler sistemin işleyişi hakkında bilgilendirilmelidir.
-   **Derin sahte ve kamusal metin (uygulayıcı):** derin sahte içerik, yapay olarak üretildiği veya değiştirildiği açıklanarak yayımlanmalıdır. Kamuyu ilgilendiren konularda yayımlanan metinler için de benzer bir açıklama gerekir; ancak insan editoryal denetiminden geçmiş ve yayının editoryal sorumluluğunu bir gerçek veya tüzel kişinin üstlendiği içerik bunun dışındadır. Sanatsal, hicivsel, kurgusal ve benzeri eserlerde açıklama, eserin gösterimini veya keyfini engellemeyecek uygun bir biçimde yapılır.

<div class="callout"><strong>İpucu:</strong> Yükümlülüğün sağlayıcıya mı uygulayıcıya mı düştüğünü baştan netleştirin. Bir üretken modeli API üzerinden kullanan ekip, işaretlemeyi sağlayıcının yaptığını varsayar; sağlayıcı ise açıklamanın yayıncı tarafından yapılacağını varsayar. İki taraf da varsayarsa hiç kimse yapmaz.</div>

Tam metin için [Madde 50](https://artificialintelligenceact.eu/article/50/); takvimin tamamı ve neyin ertelendiği için [yeni takvim yazısı](/posts/yapay-zeka-yasasi-yeni-takvim/).

## Ertelenmeyen madde: 2 Ağustos 2026'dan beri yürürlükte

Temmuz 2026'da (AB) 2026/1744 sayılı Tüzük yüksek riskli sistemlere ilişkin tarihleri ileri aldı. Kamuoyunda oluşan izlenim — “yapay zekâ yasası ertelendi” — Madde 50 bakımından yanlıştır. Madde 50 değiştirilmedi ve **2 Ağustos 2026**'da uygulanmaya başladı.

Tek geçiş kolaylığı dar bir kapsamda: 2 Ağustos 2026'dan _önce_ piyasaya sürülmüş sistemler için makine okunur işaretleme yükümlülüğüne **2 Aralık 2026**'ya kadar süre tanınmıştır. Bu, mevcut ürünlerin üretim hattına işaretleme eklemesi için verilen dört aylık teknik penceredir; şeffaflığın kendisinin ertelenmesi değildir.

Bu arada Komisyon tarafında gönüllü bir çerçeve de oluştu: **Yapay Zekâ Üretimi İçeriğin Şeffaflığına İlişkin Uygulama Kuralları (Code of Practice)** 10 Haziran 2026'da tamamlandı ve Temmuz 2026 sonu itibarıyla yaklaşık 190 kuruluş imzacı oldu. Uygulama kuralları bir yükümlülük yaratmaz; yükümlülüğün nasıl karşılanacağına dair ortak bir yorum sunar. Ayrıntı: [Komisyon sayfası](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content).

> Kamuoyunun “gecikti” dediği bir düzenlemenin, tam da o sırada yürürlüğe giren bir bölümü olması, mevzuat okumanın neden manşetle yapılamayacağının en iyi örneği.

## “Makine okunur” ne demek: sıkı bağlama ve gevşek bağlama

Yükümlülüğün tamamı tek bir kelimede düğümleniyor: _makine okunur_. İnsanın gördüğü “Yapay zekâ ile üretilmiştir” yazısı bu şartı karşılamaz; çünkü ekran görüntüsü alındığında, kırpıldığında veya yeniden kodlandığında kaybolur. Teknik dünyada bunun iki temel yolu var ve ikisi de tek başına yeterli değil.

### Sıkı bağlama (hard binding)

İşaret, içeriğin _kendi içine_ gömülür: piksel değerlerine, ses dalga formuna veya metin üretimindeki token seçim dağılımına. Avantajı, dosya biçimi değiştiğinde bile bir ölçüde hayatta kalmasıdır. Dezavantajı, sağlamlık ile görünmezlik arasındaki kaçınılmaz ödünleşim: filigranı ne kadar dayanıklı yaparsanız içeriği o kadar bozarsınız; ne kadar görünmez yaparsanız o kadar kolay silinir.

### Gevşek bağlama (soft binding)

İşaret içeriğin _yanında_ taşınır: dosyaya iliştirilen imzalı bir üstveri paketi olarak. Avantajı, çok daha zengin bilgi taşıyabilmesi — hangi model, hangi tarih, hangi düzenlemeler yapıldı. Dezavantajı, üstverinin kırılgan olmasıdır: çoğu platform yüklemede üstveriyi temizler, ekran görüntüsü ise zaten hiç taşımaz. Bu yüzden gevşek bağlama genellikle bir _parmak izi_ ile desteklenir: içeriğin algısal özeti bir kayıt defterinde saklanır ve üstveri kaybolsa bile arama yoluyla eşleştirilebilir.

<div class="callout"><strong>İpucu:</strong> Tek yönteme yaslanmayın. Pratikte işleyen tasarım üçlüdür: gömülü bir filigran (sıkı bağlama), imzalı bir üstveri paketi (gevşek bağlama) ve içeriğin parmak izini tutan bir kayıt. Biri düştüğünde diğerleri kanıt üretmeye devam eder.</div>

## C2PA: içerik kimlik bilgileri nasıl çalışır?

Gevşek bağlama tarafındaki en olgun teknik çerçeve C2PA. Bu bir spesifikasyon; şu anda 2.4 sürümünde ve [açık olarak yayımlanıyor](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html). Temel fikri sade: içeriğin geçmişini, kriptografik olarak imzalanmış bir manifest içinde taşımak.

-   **Beyan (assertion):** içerik hakkındaki tek bir olgu — “bu görsel bir üretken model tarafından üretildi”, “bu bölge kırpıldı”, “bu ses parçası eklendi”.
-   **İddia (claim):** beyanların bir araya getirilip özetlenmiş hâli.
-   **İmza:** iddiayı düzenleyen tarafın sertifikasıyla atılan imza. Doğrulama, imzanın geçerliliğini ve zincirin güvenilirliğini kontrol eder.
-   **Manifest deposu:** içerik düzenlendikçe yeni manifestler eklenir; böylece bir düzenleme geçmişi zinciri oluşur.

Burada iki yaygın yanlış anlamayı düzeltelim. Birincisi: C2PA manifesti bir içeriğin _gerçek_ olduğunu kanıtlamaz. Yalnızca kimin, neyi, ne zaman beyan ettiğini kanıtlar. Manifest, kaynağın güvenilirliği kadar değerlidir. İkincisi: manifestin bulunmaması, içeriğin yapay olduğunu göstermez. Üstveri kaybolmuş da olabilir. Doğrulama sistemi bu iki durumu birbirinden ayırt edecek biçimde tasarlanmalıdır — “imza yok” ile “imza geçersiz” aynı ekranı göstermemelidir.

```text
# Etiketleme boru hattında doğru sıra (pseudocode)
cikti = model.uret(istem)
cikti = filigran_goem(cikti)               # 1) sıkı bağlama: üretim anında
manifest = {
    "uretici":     MODEL_ADI_SURUM,
    "zaman":       utc_now(),
    "beyanlar":    ["yapay_uretim", "duzenleme_yok"],
}
cikti = manifest_iliskilendir(cikti, imzala(manifest))  # 2) gevşek bağlama
parmak_izi_kaydet(algisal_hash(cikti), manifest)        # 3) yedek kayıt
# Yanlış sıra: önce yayımlayıp sonra işaretlemek.
# Yayımlanan kopya asla geri çağrılamaz.
```

## Filigran neden ölür? Dürüst bir sınırlar listesi

Bu alanda satılan çözümlerin çoğu, laboratuvar koşullarındaki tespit oranlarını gerçek dünya oranı gibi sunuyor. Gerçek dünyada içerik şu işlemlerden geçiyor ve her biri işaretin bir kısmını siliyor:

-   **Yeniden kodlama:** sosyal platformlar yüklenen her görseli ve videoyu yeniden sıkıştırır. Kayıplı sıkıştırma, düşük genlikli filigran sinyalinin doğrudan hedefidir.
-   **Kırpma ve ölçekleme:** uzamsal olarak yerleşik bir işaret, kırpma ile kısmen veya tamamen kaybolur.
-   **Ekran görüntüsü:** üstverinin tamamı gider; yalnızca piksellere gömülü sinyal kalır, o da yeniden örnekleme ile zayıflar.
-   **Metnin özel durumu:** metin filigranları token seçim dağılımına yerleştirilir. Kısa metinlerde taşınacak istatistiksel yer yoktur; ayrıca metnin başka bir modelle yeniden yazılması işareti güvenilir biçimde siler. Metin, dört içerik türü içinde en kırılgan olanıdır.
-   **Kasıtlı saldırı:** işaretin varlığını bilen bir taraf onu kaldırmaya çalışır. Sağlamlık iddiaları, çekişmeli bir rakip varsayımı altında test edilmelidir.

> Filigran bir kilit değil, bir mühürdür. Kararlı bir saldırganı durdurmaz; sıradan akışta kaynağı görünür kılar. Yükümlülüğün amacı da zaten budur.

Bu, tespit tarafında bir asimetri yaratıyor: yanlış negatif (işaretli içeriğin işaretsiz görünmesi) çok yaygın, yanlış pozitif ise ender ama çok maliyetlidir — bir insanın ürettiği içeriği “yapay” diye etiketlemek ciddi bir zarardır. Eşik seçiminin neden bir maliyet-fayda kararı olduğunu [sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/) yazısında ele almıştık; burada da aynı mantık geçerli.

## Uygulama listesi: bir ekip ne yapmalı?

Yükümlülüğü ürün planına çevirmek isteyen bir ekip için sıralı bir liste:

-   **Envanter çıkarın.** Hangi ürün yüzeyleri sentetik içerik üretiyor veya yayımlıyor? Çoğu ekip, bir özet üretme özelliğinin de bu kapsama girdiğini geç fark ediyor.
-   **Rolünüzü belirleyin.** Her yüzey için sağlayıcı mısınız, uygulayıcı mı? Yükümlülük buna göre değişiyor.
-   **İşaretlemeyi üretim adımına gömün.** Yayın adımına değil. Yayınlanmış bir kopya geri çağrılamaz.
-   **Bildirimi tasarlayın.** Etkileşim bildirimi bir onay kutusu değildir; kullanıcının konuşmaya başladığı anda görebileceği bir arayüz unsurudur.
-   **Doğrulama tarafını da kurun.** Kendi ürettiğiniz içeriği kendi doğrulayıcınızla test edin; “imza yok” ile “imza geçersiz” ayrımını arayüzde koruyun.
-   **Belgeleyin.** Hangi yöntemi, hangi kapsamda, hangi bilinen sınırlarla uyguladığınız yazılmalı. Bu, [model kartının](/posts/model-kartlari-yonetisim/) doğal bir bölümüdür.

Son bir bağlantı: sentetik veri üretmek ile sentetik içerik yayımlamak farklı şeylerdir, ama aynı disipline dayanır — ne ürettiğinizi, neyle ürettiğinizi ve nasıl işaretlediğinizi bilmek. [Sentetik veri](/posts/sentetik-veri/) yazısındaki kayıt alışkanlığı burada da doğrudan işe yarar; ölçüm tarafında ise alt gruplara bakma disiplini için [önyargı ve adalet](/posts/onyargi-ve-adalet/) yazısına bakabilirsiniz.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Madde 50 ertelenmedi: 2 Ağustos 2026'dan beri yürürlükte; yalnızca eski sistemlerin işaretlenmesi 2 Aralık 2026'ya kadar erteli.</li><li>Makine okunur işaretleme, insanın gördüğü bir etiketle karşılanamaz; içerik yeniden kodlandığında hayatta kalması gerekir.</li><li>Sıkı bağlama (gömülü filigran) ve gevşek bağlama (imzalı manifest) birbirinin yerine geçmez; ikisi ve bir parmak izi kaydı birlikte kullanılır.</li><li>C2PA manifesti içeriğin gerçek olduğunu değil, kimin ne beyan ettiğini kanıtlar; imzasızlık yapaylık kanıtı değildir.</li><li>Metin, dört içerik türü içinde en kırılgan olanıdır: kısa metinde filigran taşıyacak yer yoktur, yeniden yazma işareti siler.</li></ul></div>

<div class="faq"><details><summary>Görselin köşesine “Yapay zekâ ile üretildi” yazmak yeterli mi?</summary><p>Hayır. Görünür bir etiket, insanlara yönelik açıklama yükümlülüğünü destekler ama makine okunur işaretleme şartını karşılamaz. Ekran görüntüsü veya kırpma ile kaybolur. Görünür etiket ile gömülü işaretleme birlikte kullanılmalıdır.</p></details><details><summary>Modeli bir sağlayıcının API'siyle kullanıyorum. İşaretleme kimin sorumluluğunda?</summary><p>Sentetik çıktının makine okunur biçimde işaretlenmesi sağlayıcının yükümlülüğüdür; derin sahte içeriğin yayımlanırken açıklanması ise uygulayıcının. Uygulamada ikisi de sizde olabilir. Sözleşmede hangi tarafın hangi işaretlemeyi ürettiğini açıkça yazın ve çıktı üzerinde kendiniz doğrulayın.</p></details><details><summary>Filigran silinebiliyorsa neden uğraşayım?</summary><p>Çünkü yükümlülük, kararlı bir saldırganı durdurmayı değil, sıradan akışta kaynağı görünür kılmayı hedefliyor. İçeriğin büyük çoğunluğu kötü niyetli bir işlemden değil, sıradan bir paylaşımdan geçer. Ayrıca işaretlemeyi uygulamış olmak, uyum bakımından da belgelenebilir bir çabadır.</p></details></div>

---

Özetle: içerik etiketleme, hukuk metninin en teknik yükümlülüğü. Görünür bir uyarı yazısıyla karşılanamaz; üretim hattının içine giren bir tasarım kararıdır. Bunu bugün yapan ekip, hem yürürlükteki yükümlülüğü karşılar hem de içeriğinin kaynağını kanıtlayabilen az sayıdaki yayıncıdan biri olur.
