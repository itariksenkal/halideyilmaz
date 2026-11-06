---
title: "Gradyan İnişi ve Optimizasyon: Bir Model Nasıl \"Öğrenir\"?"
description: "Kayıp fonksiyonu, öğrenme oranı, SGD ve Adam üzerinden gradyan inişini sezgisel olarak anlatıyoruz: bir model hatasını ölçerek ve azaltarak gerçekte nasıl \"öğrenir\"?"
publishDate: "2026-08-09T23:46:00+03:00"
lang: tr
category: "Eğitim"
tags: ["Eğitim", "Yapay Zeka"]
translation: "gradient-descent-optimization"
heroImage:
  src: "../../../assets/blog/covers/gradyan-inisi-optimizasyon.jpg"
  alt: "Gradyan İnişi ve Optimizasyon: Bir Model Nasıl \"Öğrenir\"?"
---

Sisli bir gecede, hiç görmediğiniz bir dağın yamacındasınız ve tek hedefiniz vadinin en dibine inmek. Ne haritanız var ne de uzağı görebiliyorsunuz. Yapabileceğiniz tek şey, ayağınızın altındaki eğime bakıp _en dik aşağı yönü_ bulmak ve o yöne küçük bir adım atmak. Sonra tekrar bakmak, tekrar adım atmak. İşte bir yapay zekâ modelinin "öğrenmesi" tam olarak budur; ve bu yöntemin adı **gradyan inişi**.

## Öğrenmek bir hata azaltma oyunudur

Bir modelin içinde **parametreler** (ağırlıklar) vardır: başlangıçta rastgele atanmış milyonlarca sayı. Model bir tahmin yapar, bu tahmin gerçek cevaptan ne kadar saparsa o kadar "yanılmış" olur. Öğrenmek, bu sapmayı adım adım küçültmek için o milyonlarca sayıyı azar azar ayarlamaktan ibarettir. Yani model bir şeyi "anlamaz"; hatasını sürekli ölçer ve onu en aza indirecek yönde kendini düzeltir.

Bunu bir aşçının tuz ayarına benzetebiliriz. Çorbayı tadar, "biraz tuzsuz" der, azıcık tuz ekler; tekrar tadar, tekrar ayarlar. Her seferinde hedefe (mükemmel tat) biraz daha yaklaşır. Modelin "tadı" sayısal bir hatadır, "tuzu" ise parametreleridir.

> "Öğrenmek, doğru cevabı bilmek değil; yanlış cevaptan doğru cevaba doğru sistemli biçimde yaklaşmaktır."

## Kayıp fonksiyonu: hata nasıl ölçülür?

Modeli düzeltmek için önce hatayı tek bir sayıyla ifade etmemiz gerekir. Bunu yapan şeye **kayıp fonksiyonu** (loss function) denir. Kayıp, "tahminim gerçeğe ne kadar uzak?" sorusunun nicel cevabıdır. Kayıp büyükse model kötü, küçükse iyi çalışıyor demektir. Tüm eğitimin amacı bu sayıyı olabildiğince küçültmektir.

Hangi kayıp fonksiyonunun kullanılacağı probleme bağlıdır:

-   **Regresyon** (bir sayı tahmin etmek, örneğin ev fiyatı) için sık kullanılan ölçü _ortalama kare hata_dır: tahmin ile gerçek arasındaki farkın karesi alınır. Karesini almak, büyük hataları orantısız biçimde cezalandırır.
-   **Sınıflandırma** (bir kategori tahmin etmek, örneğin "kedi mi köpek mi") için yaygın ölçü _çapraz entropi_dir: model doğru sınıfa ne kadar düşük olasılık verirse ceza o kadar artar.

Kayıp fonksiyonunu, dağın yüksekliğini veren bir yüzey gibi düşünün. Her parametre kombinasyonu bu yüzeyde bir noktadır; yüksekliği o noktadaki hatadır. Vadinin dibi, hatanın en küçük olduğu yerdir. Görevimiz oraya inmek.

<div class="callout"><strong>İpucu:</strong> Kayıp fonksiyonu <em>türevlenebilir</em> (yani pürüzsüz, eğimi hesaplanabilir) olmalıdır. Çünkü inişin tüm sırrı, her noktada eğimi ölçebilmekte yatar.</div>

## Gradyan inişi: dağdan inmenin matematiği

**Gradyan**, çok boyutlu bir yüzeyde eğimin yönünü ve dikliğini veren matematiksel araçtır. Tek bir tepenin eğimini düşünün: gradyan, "yukarı doğru en dik yön" oku gibidir. Aşağı inmek istiyorsak, basitçe bu okun _tersi_ yönde gideriz. Adımın adı buradan gelir: gradyanın negatif yönünde iniş.

Süreç şu döngüden ibarettir:

1.  **Tahmin et:** Mevcut parametrelerle çıktıyı hesapla.
2.  **Kaybı ölç:** Tahminin gerçeğe uzaklığını tek sayıya indir.
3.  **Gradyanı hesapla:** Her parametre kaybı hangi yöne ve ne kadar değiştiriyor? (Bu hesap, _geri yayılım_ ile yapılır.)
4.  **Güncelle:** Her parametreyi, kaybı azaltan yönde küçük bir miktar oynat.

Bu döngü binlerce, milyonlarca kez tekrarlanır. Her turda kayıp biraz daha küçülür; model "biraz daha az yanlış" hâle gelir. Yeterince tur sonunda parametreler, hatanın çok düşük olduğu bir noktaya yerleşir.

## Öğrenme oranı: adımı ne kadar büyük atmalı?

Gradyan bize _hangi yöne_ gideceğimizi söyler ama _ne kadar büyük adım_ atacağımızı söylemez. İşte bu adım boyutunu belirleyen sayıya **öğrenme oranı** (learning rate) denir ve eğitimdeki en kritik ayardır.

-   **Çok küçükse:** Adımlar minicik olur; vadiye inmek çok yavaşlar. Sabırla ama isabetli yürürsünüz, yine de işiniz uzar.
-   **Çok büyükse:** Dev adımlarla vadinin dibini ıskalayıp karşı yamaca çıkarsınız; bir o yana bir bu yana sekersiniz, hatta hiç inemeyebilirsiniz (ıraksama).
-   **İdealse:** Hızlı ama kararlı şekilde dibe yaklaşırsınız.

Sisli dağ benzetmesinde öğrenme oranı, "her bakışta kaç metre yürüyeceğim?" kararıdır. Çoğu zaman eğitimin başında daha büyük, ilerledikçe küçülen bir oran kullanmak işe yarar; buna _öğrenme oranı çizelgesi_ (schedule) denir.

## SGD: tüm dağı görmek yerine bir avuç adımla

Saf gradyan inişinde her adım için _tüm_ veri kümesine bakıp gradyanı hesaplarız. Bu çok doğru ama milyonlarca örnek olduğunda dayanılmaz derecede yavaştır. Çözüm, her adımda verinin rastgele küçük bir kısmını kullanmaktır. Buna **stokastik gradyan inişi** (SGD) denir; "stokastik" sözcüğü buradaki rastgeleliği anlatır.

Pratikte genellikle tek bir örnek değil, küçük bir grup (örneğin 32 veya 64 örnek) kullanılır; bu gruplara _mini-batch_ denir. Bunun bedeli, gradyanın biraz "gürültülü" olmasıdır: her adım tam doğru yönü göstermeyebilir. Ama bu gürültü çoğu zaman bir kusur değil, bir avantajdır:

-   Çok daha hızlı: her adım ucuz olduğu için aynı sürede çok daha fazla adım atılır.
-   Gürültü, modelin sığ ve kötü "çukurlara" (yerel minimumlara) takılıp kalmasına engel olabilir; küçük sarsıntılar onu daha iyi bir vadiye savurabilir.

<div class="callout"><strong>İpucu:</strong> "Batch boyutu" ile "öğrenme oranı" birbirine bağlıdır. Batch'i büyütürseniz çoğu zaman öğrenme oranını da artırmanız gerekir; ikisini birlikte ayarlamak iyi sonuç verir.</div>

## Momentum ve Adam: daha akıllı adımlar

Saf SGD bazen dar ve uzun bir vadide bir o yana bir bu yana zikzak çizerek ilerler; ileri yöndeki gerçek ilerleme yavaş kalır. Bu sorunu çözmek için optimizasyon yöntemleri olgunlaştı.

### Momentum

Yamaçtan aşağı yuvarlanan bir topu düşünün: top, biriktirdiği hız sayesinde küçük tümsekleri aşar ve genel yönünü korur. **Momentum** tam olarak bunu yapar: geçmiş adımların bir kısmını "hız" olarak biriktirir, böylece tutarlı yönde hızlanır, zikzakları söndürür.

### Adam

Bugün en yaygın kullanılan yöntemlerden biri **Adam**'dır (Adaptive Moment Estimation). Adam iki fikri birleştirir: momentum gibi geçmiş yönü hatırlar _ve_ her parametre için adım boyutunu ayrı ayrı uyarlar. Bazı parametreler hızlı, bazıları yavaş öğrenmeli; Adam bunu otomatik dengeler. Sonuç: çoğu problemde az ayarla hızlı ve kararlı bir eğitim.

Bunu, her ayağını ayrı ayrı yöneten deneyimli bir dağcıya benzetebiliriz: kaygan yerde küçük, sağlam zeminde büyük adım atar. Yine de Adam sihirli değnek değildir; bazı durumlarda iyi ayarlanmış SGD + momentum daha iyi genelleyebilir. Doğru seçim probleme göre değişir.

## Birkaç satırda öğrenme döngüsü

Tüm fikri sözde-kodla görelim. Güncelleme kuralının kalbi tek satırdır: `parametre = parametre − oran × gradyan`.

```text
# Baslangic: parametreler rastgele
parametreler = rastgele_baslat()
oran = 0.01            # ogrenme orani

her epoch icin:
    veri karistir()
    her mini_batch icin (veride):
        tahmin = model(mini_batch, parametreler)
        kayip  = kayip_fonksiyonu(tahmin, gercek)

        # gradyan: kaybi her parametreye gore turevle (geri yayilim)
        gradyan = turev(kayip, parametreler)

        # gradyanin TERSI yonunde kucuk adim
        parametreler = parametreler - oran * gradyan

    yazdir("epoch sonu kayip:", kayip)
```

Adam gibi gelişmiş yöntemler bu son satırı zenginleştirir: ham gradyan yerine, geçmişten süzülmüş ve parametre başına uyarlanmış bir adım kullanırlar. Ama özü aynı kalır: _ölç, eğimi bul, ters yöne küçük bir adım at, tekrarla._

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Bir model "öğrenmez", hatasını ölçer ve onu en aza indirecek yönde parametrelerini ayarlar.</li><li>Kayıp fonksiyonu hatayı tek sayıya indirir; eğitim, bu sayıyı küçültme oyunudur.</li><li>Gradyan inişi, kaybın eğimini ters yönde izleyerek vadinin dibine yürür.</li><li>Öğrenme oranı adım boyudur: çok küçükse yavaş, çok büyükse kararsız.</li><li>SGD veriyi küçük gruplar hâlinde işleyerek hızlanır; momentum ve Adam adımları daha akıllı kılar.</li></ul></div>

---

Özetle bir modelin "öğrenmesi", sisli bir dağda dokunarak yön bulup adım adım dibe inmek gibidir: kaybı ölç, eğimi hesapla, ters yöne küçük bir adım at, binlerce kez tekrarla. Öğrenme oranı bu adımın boyunu, SGD hızını, Adam ise isabetini ayarlar. Basit ama derin bu döngü, bugünkü yapay zekâ sistemlerinin neredeyse tamamının kalbinde atar. Bu fikirlerin gerçek ürünlere nasıl dönüştüğünü merak ediyorsanız, yapay zekâyı işlere uygulama tarafına bakan [HatsonTech](/posts/hatsontech-nedir/)'e göz atabilirsiniz.

<div class="faq"><details><summary>Gradyan tam olarak nedir?</summary><p>Gradyan, kaybın her parametreye göre kısmi türevlerinden oluşan bir vektördür. Çok boyutlu yüzeyde "en dik yukarı çıkış" yönünü gösterir; biz hatayı azaltmak için onun tersi yönde ilerleriz.</p></details><details><summary>SGD ile toplu (batch) gradyan inişi arasındaki fark nedir?</summary><p>Toplu gradyan inişi her adımda tüm veriye bakar; doğru ama yavaştır. SGD ise her adımda rastgele küçük bir grup (mini-batch) kullanır; biraz gürültülü ama çok daha hızlıdır ve genellikle daha iyi sonuç verir.</p></details><details><summary>Her zaman Adam mı kullanmalıyım?</summary><p>Adam çoğu durumda hızlı ve az ayarla iyi çalıştığı için güçlü bir başlangıçtır. Ancak iyi ayarlanmış SGD + momentum bazı problemlerde daha iyi genelleyebilir. En iyisi probleme göre denemektir; tek doğru yöntem yoktur.</p></details></div>
