---
title: "Modeliniz Anonim mi? Ezberleme, Üyelik Çıkarımı ve EDPB'nin Yeni Anonimleştirme Kılavuzu"
description: "Modelinizde hâlâ kişisel veri var mı? EDPB kılavuzlarının üçlü testini ezberleme, üyelik çıkarımı ve eğitim verisi çıkarımı gibi ölçülebilir saldırı yüzeylerine bağlayan mühendislik protokolünü anlatıyoruz."
publishDate: "2026-08-13T23:13:00+03:00"
lang: tr
category: "Gizlilik"
tags: ["Gizlilik", "Yapay Zeka"]
translation: "is-your-model-anonymous-memorization"
heroImage:
  src: "../../../assets/blog/covers/model-anonim-mi-ezberleme.jpg"
  alt: "Modeliniz Anonim mi? Ezberleme, Üyelik Çıkarımı ve EDPB'nin Yeni Anonimleştirme Kılavuzu"
---

Kişisel veriyle eğitilmiş bir model, eğitim verisi silindikten sonra anonim sayılır mı? Bu soru iki ayrı toplulukta, birbirini duymadan tartışılıyor: hukukçular anonimleştirme testini biliyor ama ezberlemenin nasıl ölçüldüğünü bilmiyor, araştırmacılar ise çıkarım saldırılarını yazıyor ama hukuki teste hiç değinmiyor. Bu yazıda iki tarafı birbirine bağlıyoruz: hukuki testin üç kriterini ölçülebilir saldırı yüzeylerine çeviriyor ve bir mühendisin anonim iddiasında bulunmadan önce fiilen ne ölçmesi gerektiğini anlatıyoruz.

## Aynı soru, iki ayrı dil

Bu soru iki ayrı odada, iki ayrı dille tartışılıyor ve odalar birbiriyle nadiren konuşuyor.

Birinci odada hukukçular var. Bir veri kümesinin ya da modelin kişisel veri olup olmadığını tartışıyorlar, testin adımlarını biliyorlar, ama bir modelin içinde verinin fiilen nasıl kaldığına dair somut bir resimleri yok. İkinci odada makine öğrenmesi araştırmacıları var. Ezberlemeyi ölçüyorlar, çıkarım saldırıları yazıyorlar, ama bulgularının hukuki testin hangi ayağına denk düştüğünü söylemiyorlar.

Sonuç tanıdık: hukuk metni ölçülemeyen bir dille yazılmış gibi görünür, teknik makale ise sorumluluğu olmayan bir merak gibi okunur. Oysa ikisi aynı şeyi soruyor: _bu modelden bir insana geri dönülebilir mi?_

Bu yazının amacı iki odayı birleştirmek. Önce hukuki testin ne sorduğunu net biçimde koyacağız, sonra o soruların her birini ölçülebilir bir saldırı yüzeyine bağlayacağız ve sonunda bir mühendisin, anonim iddiasında bulunmadan önce fiilen ne ölçmesi gerektiğine dair bir protokol çıkaracağız.

Bu yazı, gizliliği koruyan öğrenme yöntemlerinin nasıl çalıştığını değil, bir sistemin anonim sayılıp sayılamayacağının nasıl _değerlendirileceğini_ anlatıyor; yöntemlerin kendisi için [gizlilik korumalı öğrenme](/posts/gizlilik-korumali-ogrenme/) yazısına bakabilirsiniz.

## Hukuki test: tekilleştirme, bağlanabilirlik, çıkarım

Avrupa Veri Koruma Kurulu (EDPB), [Anonimleştirme Hakkında 02/2026 sayılı Kılavuz](https://www.edpb.europa.eu/public-consultations/guidelines-022026-on-anonymisation_en)u 7 Temmuz 2026'da kabul etti; kamuoyu istişaresi 30 Ekim 2026'ya kadar açık. Kılavuz, WP29'un 05/2014 sayılı Görüşünü güncelliyor ve **anonimleştirmenin (anonymisation)** üçlü testini koruyor:

-   **Tekilleştirme (singling out):** Veri kümesi içinde tek bir kişiyi ayırt edebilir misiniz?
-   **Bağlanabilirlik (linkability):** Aynı kişiye ait iki farklı kaydı birbirine bağlayabilir misiniz?
-   **Çıkarım (inference):** Bir kişi hakkında, açıkça yazmayan bir bilgiyi yüksek olasılıkla çıkarabilir misiniz?

Kılavuzun en önemli yanı, kimliklenebilirliğe _göreli_ bir yaklaşım benimsemesi. Bu yaklaşım Adalet Divanı'nın C-413/23 P sayılı EDPS v SRB kararında (4 Eylül 2025) de kabul edildi ve pratik sonucu şu: aynı veri kümesi bir taraf için kişisel veri, başka bir taraf için anonim olabilir. Anonimlik, dosyanın kalıcı bir özelliği değil; kimin, hangi ek bilgilere ve makul araçlara sahip olduğuna bağlı bir değerlendirmedir.

Modeller için ayrıca [28/2024 sayılı EDPB Görüşü](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en) (18 Aralık 2024) var. Görüş açık: kişisel veriyle eğitilmiş bir yapay zekâ modelinin anonim olduğu _varsayılamaz_. Değerlendirme vaka bazlıdır ve iki riskin birden ihmal edilebilir olmasını gerektirir: modelden kişisel veri çıkarma riski ve sorgular yoluyla kişisel veri elde etme riski.

> Anonimlik bir rozet değil, bir iddiadır. Her iddia gibi kanıtlanması gerekir ve kanıt, dosyanın kendisinde değil, ona kimin nasıl eriştiğindedir.

## Ezberleme ölçülebilir bir şeydir

Şimdi ikinci odaya geçelim. Mühendislik tarafındaki iyi haber şu: ezberleme mistik bir olgu değil, ölçülebilir ve sınırlı bir kapasitedir.

Bir modelin ağırlıklarında saklayabileceği bilgi miktarı sonludur ve ölçülebilir. Morris ve arkadaşlarının 30 Mayıs 2025 tarihli [çalışmasında](https://arxiv.org/abs/2505.24832) bu kapasite parametre başına yaklaşık 3,6 bit olarak ölçüldü. Bu sayı, tartışmanın zeminini değiştiriyor: model artık içine ne girdiği bilinmeyen bir kara kutu değil, kapasitesi bilinen bir depolama ortamı.

İkinci bulgu daha rahatsız edici. Nasr, Carlini ve arkadaşlarının 28 Kasım 2023 tarihli [çalışmasında](https://arxiv.org/abs/2311.17035), bir sapma (divergence) saldırısı ChatGPT'nin eğitim verisi yayma oranını 150 katına çıkardı. Buradaki asıl ders saldırının kendisi değil, ölçeklenebilir olmasıdır: modelin normal kullanımda hiçbir şey sızdırmıyor görünmesi, sızdırmadığı anlamına gelmez. Yalnızca doğru istemi henüz kimsenin denememiş olduğu anlamına gelir.

Bu ikisi bir araya geldiğinde hukuki testin neden mühendislik işi olduğunu görürsünüz. Ezberleme sonlu bir kapasitedir, çıkarımsa keşfedilmeyi bekleyen bir yüzeydir. İkisi de ölçülebilir, ikisi de tahmin edilemez değildir ve hiçbiri modelin büyüklüğüne bakarak göz kararı kestirilemez.

## Üç kriteri saldırı yüzeyine çevirmek

Köprü tam burada kuruluyor. Hukuki testin her ayağının teknik bir karşılığı var ve bu karşılıklar laboratuvarda ölçülebilir.

### Tekilleştirme karşılığı: eğitim verisi çıkarımı

**Eğitim verisi çıkarımı (training data extraction)**, modelden eğitim kümesindeki belirli bir kaydı geri almaya çalışır. Başarılı bir çıkarım, tekilleştirme kriterinin doğrudan ihlalidir: elinizde tek bir kişiye ait, ayırt edilmiş bir kayıt vardır. Bunun kontrollü biçimi, eğitim öncesinde veriye benzersiz sahte kayıtlar (kanarya kayıtları) yerleştirip modelin bunları geri verip vermediğini test etmektir.

### Çıkarım karşılığı: üyelik çıkarımı saldırısı

**Üyelik çıkarımı saldırısı (membership inference attack)** daha mütevazı ama hukuken en az onun kadar önemli bir soru sorar: bu kayıt eğitim kümesinde var mıydı? Kaydın içeriğini almanız gerekmez. Bir kişinin belirli bir veri kümesinde bulunduğunu öğrenmek, o veri kümesi bir hastalık kohortuysa zaten hassas bir çıkarımdır.

### Bağlanabilirlik karşılığı: yardımcı bilgiyle eşleştirme

Bağlanabilirlik, tek bir saldırıya değil bir bağlama karşılık gelir: modelin çıktıları, kamuya açık başka bir kaynakla birleştirildiğinde aynı kişiye ait kayıtları bir araya getirmeye izin veriyor mu? Kılavuzun göreli yaklaşımı tam olarak buraya oturur; değerlendirme, saldırganın makul olarak erişebileceği yardımcı bilgiye bağlıdır.

Bir noktanın altını çizelim: bu üç yüzey **sentetik veri** için de geçerlidir. Kişisel veriyle eğitilmiş bir üreticiden çıkan [sentetik veri](/posts/sentetik-veri/) otomatik olarak anonim değildir; üretici modelin ezberlediği ne varsa örneklerine sızabilir. Sentetik veri de aynı üç testten geçirilir.

## Mühendisin protokolü: iddia etmeden önce ne ölçersiniz

Bir modelin ya da veri kümesinin anonim olduğunu söylemeden önce yapılması gereken iş bellidir. Aşağıdaki akış, hukuki testi ölçüm adımlarına çeviren asgari bir protokoldür.

```python
# Anonimlik iddiasindan once minimum denetim protokolu (pseudocode)
envanter = kisisel_veri_tara(egitim_kumesi)   # ne girdi, hangi kategorilerde
tekrar_analizi(egitim_kumesi)                 # tekrarli kayitlar ezberlemeyi besler

kanaryalar = benzersiz_sahte_kayit(n)         # egitimden ONCE yerlestirilir
model = egit(egitim_kumesi + kanaryalar)

# 1) tekillestirme: kaydi geri alabiliyor muyum?
cikarim_sonucu = cikarim_saldirisi(model, kanaryalar, butce=yuksek)

# 2) cikarim: bu kayit egitimde miydi?
uyelik_sonucu = uyelik_cikarimi(model, uye_olanlar, uye_olmayanlar)
#    onemli olan tek sayi degil: saldiri sansi asiyor mu, ve KIMDE asiyor
for grup in alt_gruplar:
    uyelik_cikarimi(model, grup)              # azinlik gruplari daha risklidir

# 3) sorgu yuzeyi: agirliklar degil, YAYINLANAN arayuz test edilir
sorgu_sonucu = arayuz_uzerinden_dene(model.api, saldiri_istemleri)

# 4) resmi garanti gerekiyorsa: DP ile egit, epsilon ve delta raporla
# 5) hepsini yaz: ayarlar, butce, negatif sonuclar. Protokolsuz iddia, iddia degildir.
```

Protokolde dikkat edilecek üç ayrıntı var. Birincisi, üyelik çıkarımı sonucunu tek bir ortalama sayı olarak okumayın: saldırı ortalamada rastgele tahminden iyi olmasa bile, küçük bir alt grupta çok daha başarılı olabilir. Gizlilik riski, tıpkı adalet ölçümleri gibi, alt gruplarda saklanır.

İkincisi, 28/2024 sayılı Görüşün sorgu riskini ayrıca sayması boşuna değil. Ağırlıkları kapalı tutan bir servis bile, arayüzü üzerinden kişisel veri verebiliyorsa testi geçemez. Dolayısıyla denetim, yayınladığınız arayüzün üzerinde yapılır.

Üçüncüsü, resmi bir garanti istiyorsanız yolunuz diferansiyel gizlilikten (differential privacy) geçer ve bu, ε ile δ değerlerini raporlamak demektir. Somut bir örnek için Google'ın [VaultGemma-1B](https://huggingface.co/google/vaultgemma-1b) modeli sıfırdan DP-SGD ile, ε ≤ 2.0 ve δ ≤ 1.1e-10 bütçesiyle eğitildi. Karşılaştırma için: ABD 2020 Nüfus Sayımı'nın üretimde kullandığı [gizlilik kaybı bütçesi](https://www.census.gov/programs-surveys/decennial-census/decade/2020/planning-management/process/disclosure-avoidance/2020-das-development.html) toplamda ε = 12.2 idi (kişiler için 10.3, konut birimleri için 1.9). Yani gerçek dünyada ε, ders kitaplarındaki kadar küçük olmak zorunda değil; önemli olan değerin ne olduğu ve neye göre seçildiğidir.

## Belgeleme, Türkiye bağlamı ve makul sınırlar

Denetimi yaptınız diyelim. Geriye en çok atlanan adım kalıyor: yazmak. Anonimlik değerlendirmesi, sonucu kadar yöntemiyle de değerlidir; hangi saldırıların, hangi bütçeyle, hangi varsayımlar altında denendiği yazılmadıysa ortada bir değerlendirme değil bir kanaat vardır. Bu kayıtların doğal yeri [model kartları ve yönetişim belgeleridir](/posts/model-kartlari-yonetisim/).

Göreli yaklaşımın pratik sonucu da burada devreye girer: değerlendirme belirli bir bağlam için geçerlidir. Modeli yalnızca kurum içinde çalıştırırken yaptığınız değerlendirme, ağırlıkları kamuya açtığınızda ya da arayüzü serbest bıraktığınızda geçersizdir. Dağıtım biçimi değişti mi, değerlendirme yenilenir.

Silme talepleri ayrı bir konudur ve sık sık karıştırılır. Bir kaydın etkisini modelden çıkarmaya çalışan [makine unutması (machine unlearning)](/posts/makine-unutma/) yöntemleri değerli olabilir, ama başarılı bir unutma işlemi modelin anonim olduğunun kanıtı değildir; yalnızca belirli bir kaydın etkisine dair bir iddiadır.

Türkiye tarafında yapay zekâya özgü yürürlükte bir kanun bulunmuyor; çerçeveyi kişisel verilerin korunması mevzuatı ve KVKK'nın rehberleri çiziyor. KVKK 24 Kasım 2025'te [Üretken Yapay Zekâ ve Kişisel Verilerin Korunması Rehberi (15 Soruda)](https://www.kvkk.gov.tr/Icerik/8547/uretken-yapay-zeka-ve-kisisel-verilerin-korunmasi-rehberi-15-soruda) belgesini yayımladı; daha önce de 15 Eylül 2021'de [Yapay Zekâ Alanında Kişisel Verilerin Korunmasına Dair Tavsiyeler](https://www.kvkk.gov.tr/Icerik/7048/Yapay-Zeka-Alaninda-Kisisel-Verilerin-Korunmasina-Dair-Tavsiyeler) metnini çıkarmıştı. Avrupa'daki tartışmayı izlemek, yerel uygulamada da işinize yarar; çünkü sorular aynı.

Eğitim verisinin nereden geldiği de aynı masaya oturuyor. EDPB, anonimleştirme kılavuzuyla aynı genel kurulda, üretken yapay zekâ bağlamında web kazımaya ilişkin 03/2026 sayılı kılavuzu da [kabul etti](https://www.edpb.europa.eu/news/edpb-sheds-light-on-anonymisation-and-web-scraping-for-generative-ai-and-adopts-final-version_en). İkisi birlikte okunmalı: veriyi nasıl topladığınız ile modelin sonunda ne kadar anonim olduğu aynı zincirin halkalarıdır.

<div class="callout"><strong>İpucu:</strong> Anonimliği bir kez alıp rafa kaldıracağınız bir sertifika gibi düşünmeyin. Yeni bir dağıtım biçimi, yeni bir arayüz, yeni bir veri kaynağı ya da yayımlanan yeni bir saldırı yöntemi değerlendirmeyi yeniden açar. Denetim protokolünüzü, tıpkı test paketiniz gibi, tekrar çalıştırılabilir biçimde saklayın.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>EDPB'nin üçlü testi hâlâ geçerli: tekilleştirme, bağlanabilirlik ve çıkarım.</li><li>Kişisel veriyle eğitilmiş bir modelin anonim olduğu varsayılamaz; değerlendirme vaka bazlıdır.</li><li>Anonimlik göreli bir kavramdır: aynı veri bir taraf için kişisel, diğeri için anonim olabilir.</li><li>Üç hukuki kriterin de ölçülebilir karşılığı var: çıkarım, üyelik çıkarımı ve yardımcı bilgiyle eşleştirme.</li><li>Sonuç kadar protokol de yazılır; belgelenmemiş bir anonimlik iddiası değerlendirme sayılmaz.</li></ul></div>

<div class="faq"><details><summary>Eğitim verisini sildim, model artık anonim mi?</summary><p>Kendiliğinden değil. 28/2024 sayılı EDPB Görüşü, kişisel veriyle eğitilmiş bir modelin anonim olduğunun varsayılamayacağını söylüyor; hem modelden veri çıkarma hem de sorgular yoluyla veri elde etme riskinin ihmal edilebilir olduğunu göstermeniz gerekir. Kaynak veriyi silmek bu iki riski kendiliğinden ortadan kaldırmaz.</p></details><details><summary>Diferansiyel gizlilikle eğitirsem sorun biter mi?</summary><p>Bitmez ama ölçülebilir hale gelir. Diferansiyel gizlilik size savunulabilir, sayısal bir garanti verir; karşılığında bu garantinin gücünü ε ve δ değerleriyle beyan etmeniz ve seçtiğiniz bütçeyi gerekçelendirmeniz gerekir. Garanti, seçtiğiniz bütçe kadar güçlüdür.</p></details><details><summary>Küçük bir modelim var, ezberleme riski yok değil mi?</summary><p>Model boyutu tek başına bir savunma değildir. Ezberleme kapasitesi parametre sayısıyla ilgilidir, ama asıl belirleyici veri tarafındadır: tekrarlanan kayıtlar ve nadir, ayırt edici örnekler her ölçekte ezberlenmeye açıktır. Kestirmek yerine ölçün.</p></details></div>

---

Anonimlik sorusunun cevabı ne saf hukuk ne saf mühendislik. Hukuki test size neyi kanıtlamanız gerektiğini söyler, ölçüm araçları ise bunu nasıl kanıtlayacağınızı. İki odayı aynı masaya oturtan ekipler hem daha savunulabilir sistemler kuruyor hem de kendi risklerini gerçekten biliyor.
