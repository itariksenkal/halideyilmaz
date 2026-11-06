---
title: "Açık Veri Kaynakları: Nerede Bulunur, Nasıl Kullanılır?"
description: "TÜİK, belediye portalları, Eurostat, Dünya Bankası, OECD, UCI, Kaggle ve Hugging Face: açık veriyi bulmak, lisansını okumak ve kalitesini sınamak için rehber."
publishDate: "2026-11-29T09:17:00+03:00"
lang: tr
category: "Veri"
tags: ["Açık Veri", "Veri Bilimi", "Veri Kalitesi"]
translation: "open-data-sources"
heroImage:
  src: "../../../assets/blog/covers/acik-veri-kaynaklari.jpg"
  alt: "Farklı açık veri portallarından gelen tabloları ve grafikleri temsil eden bir masa üstü görünümü"
---

Bir soruya veriyle cevap aramak istediğinizde ilk engel çoğu zaman analiz değil, doğru veriyi bulmaktır. İnternette milyonlarca tablo var; ama hangisinin güvenilir olduğunu, hangisini işinizde kullanmanıza izin verildiğini ve hangisinin sessizce hatalar taşıdığını anlamak ayrı bir beceri. Veri kalitesiyle uğraşan biri olarak en çok önemsediğim konulardan biri bu: iyi bir model ya da iyi bir rapor, ancak üzerine kurulduğu veri kadar sağlamdır. Bu yazıda Türkiye'den ve dünyadan başvurabileceğiniz açık veri kaynaklarını, lisans ve atıf konusunu ve bir veri setine güvenmeden önce yapabileceğiniz basit kontrolleri derledim.

## Açık veri tam olarak ne demek?

"İnternetten indirebiliyorum" ile "açık veri" aynı şey değil. Açık veri, herkesin erişebildiği, belirli koşullarla (çoğunlukla yalnızca kaynak göstererek) kullanabildiği, değiştirebildiği ve yeniden paylaşabildiği veridir. Bu koşulları belirleyen şey lisanstır. Bir web sitesinde tablo görmek, onu bir ürüne koymanıza ya da yeniden yayımlamanıza izin verildiği anlamına gelmez.

Açık veriyi kabaca üç gruba ayırmak işimi kolaylaştırıyor:

- **Resmî istatistikler:** İstatistik kurumlarının ve merkez bankalarının yayımladığı, yöntemi belgelenmiş göstergeler (enflasyon, nüfus, dış ticaret gibi).
- **Kamu kurumlarının operasyonel verileri:** Belediyelerin ulaşım, su, çevre gibi hizmetlerinden çıkan kayıtlar.
- **Araştırma ve makine öğrenmesi veri setleri:** Belirli bir problemi çalışmak için derlenmiş, çoğu zaman topluluk tarafından paylaşılmış setler.

Her grubun güçlü ve zayıf yanları farklı. Resmî istatistikler genellikle iyi belgelenir ama toplulaştırılmıştır; makine öğrenmesi setleri satır düzeyindedir ama kökenleri bazen belirsizdir.

## Türkiye'den başlamak

Türkiye ile ilgili bir soru soruyorsanız ilk durak çoğu zaman Türkiye İstatistik Kurumu (TÜİK). Kurumun **Veri Portalı** (veriportali.tuik.gov.tr) üzerinden konu başlıklarına göre istatistik tablolarına ve bültenlere ulaşabilirsiniz; eski data.tuik.gov.tr adresi de bu portala yönlendiriyor. Bir göstergeyi kullanmadan önce ilgili bültenin yöntem notlarını okumak, tanımların zaman içinde değişip değişmediğini görmek açısından önemli.

Ekonomik ve finansal zaman serileri için Türkiye Cumhuriyet Merkez Bankası'nın Elektronik Veri Dağıtım Sistemi (EVDS) yaygın olarak kullanılıyor. Kasım 2026 itibarıyla evds2 adresi yeni sürüm olan evds3.tcmb.gov.tr'ye yönleniyor.

Yerel düzeyde ise birçok büyükşehir belediyesinin açık veri portalı var. İstanbul Büyükşehir Belediyesi'nin portalı (data.ibb.gov.tr) veri setlerini kategorilere ayırarak indirme ve API seçenekleriyle sunuyor; kendi açık veri lisansı, CC BY 4.0 ile uyumlu olduğunu belirtiyor ve kişisel verileri kapsam dışında tutuyor. İzmir Büyükşehir Belediyesi'nin portalı (acikveri.bizizmir.com) da ulaşım, çevre ve enerji gibi başlıklarda yüzlerce veri seti yayımlıyor. Başka büyükşehirlerin ve bazı ilçe belediyelerinin de benzer portalları var; ancak bu portalların güncellenme sıklığı birbirinden çok farklı olabiliyor.

<div class="callout"><strong>İpucu:</strong> Belediye portallarında bir veri setini kullanmadan önce "son güncelleme" tarihine bakın. Birkaç yıl önce bırakılmış bir set, bugünkü durumu değil, o yılın fotoğrafını gösterir.</div>

## Uluslararası istatistik kaynakları

Ülkeleri karşılaştırmak istediğinizde uluslararası kuruluşların veri tabanları büyük kolaylık sağlıyor, çünkü göstergeleri ortak tanımlarla uyumlaştırmaya çalışıyorlar.

| Kaynak | Neye iyi gelir? | Kullanım koşulu (özet) |
|---|---|---|
| Eurostat | AB ülkeleri ve aday ülkeler için ekonomi, nüfus, çevre istatistikleri | Kaynak gösterilerek ticari veya ticari olmayan yeniden kullanım serbest; üçüncü taraf içerikler hariç |
| Dünya Bankası Açık Veri | Kalkınma göstergeleri, uzun zaman serileri, API erişimi | Varsayılan lisans CC BY 4.0; bazı setlerde farklı lisanslar |
| OECD Data Explorer | Üye ülkeler için ekonomi, eğitim, sağlık karşılaştırmaları | OECD kullanım şartları geçerli; bazı veri setlerinin ayrı koşulları var |
| data.europa.eu | AB kurumlarının ve üye ülkelerin açık veri katalogları | Her veri seti kendi lisansıyla listeleniyor |

Eurostat, veri setleri için DOI ve erişim tarihini içeren bir atıf biçimi de öneriyor. Veriyi değiştirerek ya da çevirerek kullanıyorsanız bunu açıkça belirtmenizi istiyor. Dünya Bankası da atıfta kurumun adını, veri setinin adını ve mümkünse asıl veri sağlayıcıyı anmanızı bekliyor.

## Makine öğrenmesi için veri depoları

Model eğitmek ya da bir yöntemi denemek istiyorsanız farklı türde kaynaklara ihtiyaç duyarsınız.

- **UCI Machine Learning Repository:** Kaliforniya Üniversitesi Irvine'in yürüttüğü, makine öğrenmesinin en eski veri arşivlerinden biri. Ana sayfasında 600'ü aşkın veri setinin bakımını yaptığını belirtiyor. Bağış politikasına göre yeni eklenen setler CC BY 4.0 lisansıyla yayımlanıyor. Klasik, küçük ve iyi tanınan setler sayesinde yöntemleri karşılaştırmak için hâlâ çok kullanışlı.
- **Kaggle Datasets:** Kullanıcıların yüklediği çok sayıda veri seti barındırıyor. Çeşitlilik büyük, ama kalite de o ölçüde değişken. Her setin sayfasındaki lisans alanını ve açıklamayı mutlaka okumak gerekiyor; bir setin popüler olması, kaynağının sağlam olduğu anlamına gelmiyor.
- **Hugging Face Datasets:** Özellikle metin, ses ve görüntü verileri için büyük bir merkez. Her veri setinin bir "dataset card" (veri seti kartı) sayfası var; lisans, dil ve boyut gibi bilgiler bu kartın başındaki meta verilerde tutuluyor. Kartın ne kadar dolu olduğu, setin ne kadar özenle hazırlandığı hakkında iyi bir ipucu veriyor.

## Lisans ve atıf: indirmeden önce okunacak satırlar

Lisans konusu sıkıcı görünebilir ama sonradan yaşanacak sıkıntıları önlemenin en ucuz yolu. Kendime sorduğum sorular genellikle şunlar:

1. **Ticari kullanıma izin var mı?** CC BY 4.0 gibi lisanslar izin verir; "yalnızca ticari olmayan" (NC) ibareli lisanslar vermez.
2. **Türetilmiş çalışmayı paylaşabilir miyim?** Bazı lisanslar, değiştirdiğiniz veriyi aynı lisansla paylaşmanızı şart koşar (ShareAlike).
3. **Atıf nasıl yapılmalı?** Birçok kurum hazır bir atıf metni öneriyor. Bunu kullanmak hem kolay hem de doğru.
4. **Veri setinin içinde başkasına ait içerik var mı?** Eurostat ve Dünya Bankası gibi kurumlar, üçüncü taraflardan gelen içeriklerin farklı koşullara tabi olabileceğini açıkça belirtiyor.

Kişisel veri içeren setlerde iş daha da hassaslaşıyor. Açık lisans, verideki kişisel bilgilerin istediğiniz gibi işlenebileceği anlamına gelmiyor; Türkiye'de KVKK, Avrupa'da GDPR gibi düzenlemeler ayrıca geçerli. Bu yazı genel bilgi amaçlıdır, hukuki tavsiye yerine geçmez; ciddi bir ürün söz konusuysa bir hukukçuya danışmak en doğrusu.

## Veriye güvenmeden önce: kalite kontrolü

Gebru ve arkadaşlarının 2018'de önerdiği "Datasheets for Datasets" fikri, her veri setinin amacını, nasıl toplandığını ve hangi kullanımlara uygun olduğunu anlatan bir "veri sayfası" ile gelmesini savunuyordu. Her sette böyle bir belge bulamazsınız; ama aynı soruları kendiniz sorabilirsiniz:

- **Kim, neden ve nasıl topladı?** Anket mi, sensör mü, idari kayıt mı? Toplama yöntemi, verideki boşlukları ve yanlılıkları belirler.
- **Kapsam ne?** Hangi yıllar, hangi bölgeler, hangi gruplar var; hangileri eksik?
- **Tanımlar değişmiş mi?** Resmî istatistiklerde yöntem değişiklikleri zaman serisinde ani kırılmalar yaratabilir.
- **Eksik ve tutarsız değerler:** Boş hücreler, "0" ile "bilinmiyor"un karışması, birimlerin karışması (bin kişi mi, kişi mi?).
- **Tekrarlar ve sızıntı:** Makine öğrenmesi setlerinde aynı kaydın hem eğitim hem test kısmında yer alması, sonuçları olduğundan iyi gösterebilir.

<div class="callout"><strong>İpucu:</strong> İndirdiğiniz her veri seti için küçük bir not dosyası tutun: kaynak adresi, indirme tarihi, lisans ve yaptığınız değişiklikler. Altı ay sonra kendinize teşekkür edeceksiniz.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Açık veri, yalnızca erişilebilir değil, lisansı yeniden kullanıma izin veren veridir.</li><li>Türkiye için TÜİK Veri Portalı, TCMB EVDS ve belediye portalları iyi başlangıç noktalarıdır.</li><li>Eurostat, Dünya Bankası ve OECD ülke karşılaştırmaları için ortak tanımlı göstergeler sunar.</li><li>UCI, Kaggle ve Hugging Face model denemeleri için zengin; ama her setin lisansını ve kartını ayrı ayrı okuyun.</li><li>Kaynak, kapsam, tanım değişiklikleri ve eksik değerler kontrol edilmeden hiçbir veri setine tam güvenmeyin.</li></ul></div>

<div class="faq"><details><summary>Kaggle'daki bir veri setini ticari bir projede kullanabilir miyim?</summary><p>Bu tamamen o setin lisansına bağlı. Kaggle'da her veri setinin sayfasında bir lisans alanı bulunur. Lisans belirtilmemişse ya da veri başka bir kaynaktan kopyalanmış görünüyorsa, asıl kaynağa gidip koşulları oradan kontrol etmek daha güvenlidir.</p></details><details><summary>TÜİK verisini kullanırken nasıl atıf yapmalıyım?</summary><p>Genel kural, kurumun adını, tablonun ya da bültenin adını, yayım tarihini ve eriştiğiniz adresi belirtmektir. Kurumun kendi sayfalarında özel bir atıf talimatı varsa onu esas alın.</p></details><details><summary>Açık lisanslı bir veri setinde kişisel veri varsa ne olur?</summary><p>Açık lisans, kişisel verilerin korunmasına ilişkin yasal yükümlülükleri ortadan kaldırmaz. İBB'nin lisansı gibi bazı lisanslar kişisel verileri açıkça kapsam dışında tutar. Böyle verilerle çalışacaksanız KVKK gibi düzenlemeleri dikkate almanız gerekir.</p></details><details><summary>Bir veri setinin güncel olup olmadığını nasıl anlarım?</summary><p>Sayfadaki son güncelleme tarihine, kapsadığı dönemin bitiş yılına ve varsa sürüm notlarına bakın. Resmî istatistiklerde ise kurumun yayım takvimini kontrol etmek, bir sonraki güncellemenin ne zaman geleceğini gösterir.</p></details></div>

---

**Kaynaklar**

- [TÜİK Veri Portalı](https://veriportali.tuik.gov.tr/tr)
- [İBB Açık Veri Portalı – Lisans](https://data.ibb.gov.tr/license)
- [Eurostat – Copyright notice](https://ec.europa.eu/eurostat/help/copyright-notice)
- [World Bank – Terms of Use for Datasets](https://www.worldbank.org/ext/en/legal/terms-conditions/datasets)
- [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu/)
- [Gebru vd. (2018), Datasheets for Datasets – arXiv](https://arxiv.org/abs/1803.09010)
