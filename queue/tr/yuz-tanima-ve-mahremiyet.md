---
title: "Yüz Tanıma ve Mahremiyet: Teknoloji, Hata Payı ve Haklarımız"
description: "Yüz tanıma nasıl çalışır, gruplar arasında neden farklı hata yapar, KVKK ve GDPR biyometrik veriyi nasıl korur, AB Yapay Zeka Tüzüğü neleri sınırlar?"
publishDate: "2026-11-26T09:17:00+03:00"
lang: tr
category: "Gizlilik"
tags: ["Yüz Tanıma", "Mahremiyet", "KVKK", "Biyometrik Veri"]
translation: "facial-recognition-and-privacy"
heroImage:
  src: "../../../assets/blog/covers/yuz-tanima-ve-mahremiyet.jpg"
  alt: "Yüz hatları üzerinde noktalar ve çizgilerden oluşan bir biyometrik harita"
---

Parolanızı değiştirebilirsiniz, kredi kartınızı iptal edebilirsiniz; ama yüzünüzü değiştiremezsiniz. Yüz tanıma teknolojisini diğer pek çok yapay zeka uygulamasından ayıran şey tam olarak bu: Kullandığı veri, bize kalıcı olarak bağlı ve çoğu zaman haberimiz olmadan toplanabiliyor. Telefonun kilidini açmak gibi kendi seçtiğimiz kullanımlar ile kalabalık bir meydanda herkesi tarayan kameralar arasında büyük fark var. Bu yazıda yüz tanımanın nasıl çalıştığını, neden her grup için aynı doğrulukta çalışmadığını, Türkiye ve Avrupa'da biyometrik verinin hukuken nasıl korunduğunu ve bireyler olarak neler yapabileceğimizi anlatmaya çalışacağım.

<div class="callout"><strong>Not:</strong> Bu yazı genel bilgilendirme amaçlıdır, hukuki tavsiye değildir. Somut bir durum için bir hukukçuya danışmanızı öneririm.</div>

## Yüz tanıma nasıl çalışır?

Yüz tanıma sistemleri genellikle dört adımda çalışır. Önce **tespit**: Görüntüde yüz olan bölgeler bulunur. Sonra **hizalama**: Yüz, gözlerin ve ağzın konumuna göre standart bir pozisyona getirilir. Ardından **öznitelik çıkarma**: Bir sinir ağı yüzü, "şablon" da denen uzun bir sayı dizisine dönüştürür. Son olarak **karşılaştırma**: Bu şablon, kayıtlı şablonlarla kıyaslanır ve benzerlik belirli bir eşiğin üzerindeyse "eşleşme" kararı verilir.

Burada iki farklı kullanım ayrımını bilmek önemli:

| Kullanım | Soru | Örnek |
|---|---|---|
| Doğrulama (1:1) | "Bu kişi iddia ettiği kişi mi?" | Telefonun kilidini açmak, havalimanında pasaport kontrolü |
| Tanımlama (1:N) | "Bu kişi veritabanındaki kişilerden hangisi?" | Bir kamera görüntüsündeki kişiyi geniş bir veritabanında aramak |

Eşik değeri bir ödünleşim yaratır. Eşik düşük tutulursa sistem daha çok kişiyi eşleştirir ama yanlış eşleşmeler (yanlış pozitif) artar; yüksek tutulursa yanlış eşleşme azalır ama gerçek kişiyi tanıyamama (yanlış negatif) artar. Telefonunuzu açamamak bir rahatsızlıktır; ama bir soruşturmada yanlış kişiyle eşleştirilmek çok daha ciddi sonuçlar doğurabilir.

## Doğruluk herkes için aynı mı? NIST bulguları

ABD Ulusal Standartlar ve Teknoloji Enstitüsü (NIST), yüz tanıma algoritmalarını yıllardır bağımsız olarak test ediyor; bu program bugün Yüz Tanıma Teknolojisi Değerlendirmesi (FRTE) adıyla sürüyor. NIST'in 19 Aralık 2019'da yayımladığı NISTIR 8280 raporu, 99 geliştiriciden 189 algoritmayı demografik etkiler açısından inceledi. Bulgular özetle şöyleydi:

- Test edilen algoritmaların çoğunda demografik gruplar arasında doğruluk farkları görüldü.
- Bire bir eşleştirmede, Asyalı ve Afrikalı Amerikalı yüzlerde yanlış pozitif oranları beyaz yüzlere göre, algoritmaya bağlı olarak çoğu zaman 10 ila 100 kat daha yüksekti.
- Asya'da geliştirilmiş bazı algoritmalarda Asyalı ve beyaz yüzler arasında böyle bir fark görülmedi; NIST bunun eğitim verisiyle ilgili olabileceğini belirtti, ancak bunu ayrıca test etmedi.
- Bire çok aramada, yaklaşık 1,6 milyon sabıka fotoğrafından oluşan bir veritabanıyla yapılan testte Afrikalı Amerikalı kadınlarda yanlış pozitifler daha yüksekti.
- Önemli bir not: Algoritmalar arasında büyük farklar vardı ve en dengeli algoritmalar aynı zamanda en isabetliler arasındaydı.

Bu bulgulardan çıkan ders şu: "Yüz tanıma yüzde şu kadar doğru" gibi genel bir ifade anlamlı değil. Hangi algoritma, hangi kullanım (1:1 mi 1:N mi), hangi eşik ve hangi nüfus için soruları cevaplanmadan bir sistemin adil olup olmadığı söylenemez. Veri kalitesi ve model değerlendirme üzerine çalışan biri olarak, sonuçları gruplara göre ayrıştırarak raporlamanın neden zorunlu olması gerektiğinin en iyi örneklerinden biri bu bence.

## Biyometrik veri neden özel nitelikli?

Hem Türkiye'de hem Avrupa Birliği'nde biyometrik veri, sıradan kişisel veriden daha sıkı korunuyor.

**KVKK:** 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 6. maddesi, biyometrik ve genetik verileri sağlık, din, siyasi düşünce gibi bilgilerle birlikte "özel nitelikli kişisel veri" olarak sayıyor. Bu madde, 7499 sayılı Kanun'la değiştirildi ve yeni hâli 1 Haziran 2024'te yürürlüğe girdi; değişiklikle özel nitelikli verilerin hangi şartlarda işlenebileceği AB düzenlemesine yakın biçimde yeniden düzenlendi. Kapsam ise değişmedi: Biyometrik veri hâlâ özel nitelikli.

**GDPR:** AB Genel Veri Koruma Tüzüğü'nün 9. maddesi, "bir gerçek kişiyi benzersiz şekilde tanımlamak amacıyla işlenen biyometrik veriyi" özel kategoriler arasında sayıyor ve bu verilerin işlenmesini, maddede sayılan istisnalar dışında yasaklıyor.

Pratikte bu, bir işyerinin, spor salonunun ya da binanın yüz tanımayla giriş sistemi kurmasının sıradan bir teknik tercih olmadığı anlamına geliyor. Hukuki dayanak, orantılılık, alternatif yöntemlerin varlığı ve verinin güvenliği ayrıca değerlendirilmeli.

## AB Yapay Zeka Tüzüğü neleri sınırlıyor?

AB'nin 2024/1689 sayılı Yapay Zeka Tüzüğü'nün 5. maddesi, bazı yapay zeka uygulamalarını tamamen yasaklıyor. Bu yasaklar 2 Şubat 2025'ten itibaren uygulanıyor. Yüzle ilgili olanlar şunlar:

- İnternetten veya güvenlik kamerası kayıtlarından **hedefsiz biçimde yüz görüntüsü toplayarak** yüz tanıma veritabanı oluşturmak veya genişletmek.
- **İşyerlerinde ve eğitim kurumlarında duygu tanıma** (tıbbi veya güvenlik amaçlı kullanımlar hariç).
- Biyometrik veriye dayanarak kişileri ırk, siyasi görüş, dini inanç veya cinsel yönelim gibi hassas özelliklere göre **sınıflandırmak**.
- Kolluk amacıyla, kamuya açık alanlarda **gerçek zamanlı uzaktan biyometrik tanımlama**. Bu yasağın üç dar istisnası var: belirli kaçırma, insan ticareti veya cinsel istismar mağdurlarının ve kayıp kişilerin aranması; hayata yönelik belirli, ciddi ve yakın bir tehdidin ya da gerçek bir terör tehdidinin önlenmesi; belirli ağır suçların şüphelilerinin bulunması. Bu istisnalarda da kural olarak yargı makamının veya bağımsız bir idari makamın önceden izni gerekiyor.

Gerçek zamanlı olmayan, yani kayıtlar üzerinden sonradan yapılan uzaktan biyometrik tanımlama ise yasak değil, "yüksek riskli" kategoride ve sıkı yükümlülüklere tabi.

<div class="callout"><strong>İpucu:</strong> Bir yerde yüz tanıma kullanıldığını fark ederseniz üç soru sorun: Verim hangi amaçla ve hangi hukuki dayanakla işleniyor? Ne kadar süre saklanıyor? Yüz tanıma dışında bir alternatif (kart, kod) sunuluyor mu?</div>

## Bireyler olarak ne yapabiliriz?

Yüz tanımaya karşı tamamen görünmez olmak gerçekçi değil, ama birkaç adım kontrolü artırıyor:

- **Haklarınızı kullanın.** KVKK'nın 11. maddesi, kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme gibi haklar tanıyor. Bir işyeri veya kurum yüz verinizi işliyorsa, ilgili veri sorumlusuna başvurabilirsiniz.
- **Alternatif isteyin.** Giriş kontrolünde yüz tanıma yerine kart veya kod gibi bir seçenek olup olmadığını sorun.
- **Paylaşımlarınızı gözden geçirin.** Herkese açık, yüksek çözünürlüklü fotoğraflar, hedefsiz veri toplamanın ham maddesi olabilir. Sosyal medya hesaplarınızın görünürlük ayarlarını kontrol etmek riski azaltır.
- **Cihaz ayarlarını bilin.** Telefonunuzdaki yüzle kilit açmanın verisinin cihazda mı tutulduğunu, fotoğraf uygulamanızın yüz gruplama özelliğinin açık olup olmadığını kontrol edin.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Yüz tanıma; tespit, hizalama, şablon çıkarma ve karşılaştırma adımlarından oluşur; doğrulama (1:1) ile tanımlama (1:N) çok farklı risk taşır.</li><li>NIST'in 2019 raporu, algoritmaların çoğunda demografik gruplar arasında belirgin hata farkları buldu, ancak algoritmalar arasında da büyük farklar vardı.</li><li>Biyometrik veri hem KVKK hem GDPR kapsamında özel nitelikli veri olarak korunuyor.</li><li>AB Yapay Zeka Tüzüğü, hedefsiz yüz verisi toplamayı ve kolluğun kamusal alanda gerçek zamanlı biyometrik tanımlamasını (dar istisnalar dışında) yasaklıyor.</li><li>Bireyler bilgi talep etme, silme isteme ve alternatif yöntem sorma haklarını kullanabilir.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>Telefonumun yüzle kilit açma özelliği de bu kurallara tabi mi?</summary><p>Kendi cihazınızda, sizin isteğinizle ve verinin cihazda kaldığı bir doğrulama kullanımı, kamusal alanda kitlesel tanımlamadan çok farklıdır. Yine de cihaz üreticisinin yüz verisini nerede ve nasıl sakladığını bilmek faydalıdır.</p></details><details><summary>İşyerim yüz tanımayla mesai takibi yapabilir mi?</summary><p>Bu, hukuki dayanağa, orantılılığa ve alternatif yöntemlerin varlığına bağlıdır. Biyometrik veri özel nitelikli olduğu için işverenin ciddi bir gerekçe ve güvenlik önlemi göstermesi beklenir; somut durum için bir hukukçuya danışmak en doğrusudur.</p></details><details><summary>Yüz tanıma sistemleri artık eşit derecede doğru değil mi?</summary><p>Algoritmalar arasında büyük farklar var ve bazıları gruplar arasında çok daha dengeli sonuç veriyor. Ancak bir sistemin adil olduğunu söylemek için o sistemin, o kullanım ve o eşik için gruplara göre test edilmesi gerekir.</p></details><details><summary>Türkiye AB Yapay Zeka Tüzüğü'ne tabi mi?</summary><p>Tüzük AB'de uygulanır; ancak AB pazarına sistem sunan veya çıktısı AB'de kullanılan sağlayıcıları da kapsayabilir. Türkiye'de biyometrik veri açısından temel düzenleme KVKK'dır.</p></details></div>

---

**Kaynaklar**

- [NIST – NISTIR 8280: Face Recognition Vendor Test Part 3, Demographic Effects (2019)](https://nvlpubs.nist.gov/nistpubs/ir/2019/NIST.IR.8280.pdf)
- [NIST – Face Recognition Technology Evaluation: Demographic Effects](https://pages.nist.gov/frvt/html/frvt_demographics.html)
- [6698 sayılı Kişisel Verilerin Korunması Kanunu (Mevzuat Bilgi Sistemi)](https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6698.pdf)
- [GDPR Madde 9 – Özel kategorilerdeki kişisel verilerin işlenmesi](https://gdpr-info.eu/art-9-gdpr/)
- [EUR-Lex – Regulation (EU) 2024/1689 (Yapay Zeka Tüzüğü)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
