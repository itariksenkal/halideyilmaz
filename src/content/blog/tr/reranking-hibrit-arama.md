---
title: "Reranking ve Hibrit Arama: BM25 ile Semantik Aramayı Birleştirmek"
description: "BM25 ile semantik aramayı birleştiren hibrit arama, RRF ile skor füzyonu ve cross-encoder ile reranking'i kısa kod örnekleriyle sezgisel olarak anlatıyoruz."
publishDate: "2026-08-09T23:35:00+03:00"
lang: tr
category: "Getirim"
tags: ["Getirim", "Yapay Zeka"]
translation: "reranking-hybrid-search"
heroImage:
  src: "../../../assets/blog/bimg-15.jpg"
  alt: "Reranking ve Hibrit Arama: BM25 ile Semantik Aramayı Birleştirmek"
---

Bir kütüphaneye girip "ucuz uçuş bulmanın yolları" diye sorduğunuzu düşünün. Bir görevli rafları kelime kelime tarayıp başlığında "uçuş" geçen kitapları getirir; bir diğeri ise ne demek istediğinizi anlayıp "seyahat bütçesi" kitabını uzatır. En iyi sonucu ikisini birleştirip, getirilen yığını dikkatle yeniden gözden geçirerek alırsınız. İşte hibrit arama ve reranking tam olarak budur. Bu yazıda anahtar kelime ile semantik aramayı nasıl harmanlayacağımızı ve cross-encoder ile getirim kalitesini nasıl yükselteceğimizi sezgisel biçimde anlatacağız.

## İki arama, iki güçlü yan

Klasik arama iki büyük okula ayrılır. **Anahtar kelime araması** (en bilineni BM25) kelimelerin birebir geçip geçmediğine bakar. Hızlıdır, açıklanabilirdir ve nadir terimlerde, ürün kodlarında, isimlerde, kanun maddesi numaralarında neredeyse kusursuzdur. Ama bir zaafı vardır: "araba" yazarsanız "otomobil" geçen belgeyi göremez. Kelimeyi bilir, anlamı bilmez.

**Semantik arama** ise metni bir embedding modeliyle vektöre çevirir ve anlamca yakın belgeleri getirir. Eş anlamlıları, farklı ifadeleri, hatta diller arası eşleşmeleri yakalar. Buna karşılık nadir bir kod ya da tam terim ararken "yaklaşık olarak benzer" ama yanlış sonuçlar üretebilir; çünkü o terimi anlam uzayında bir komşusuyla karıştırabilir.

> BM25 kelimeyi bilir, anlamı bilmez. Semantik arama anlamı bilir, kelimeyi kaçırabilir. Hibrit arama, ikisinin körlüklerini birbiriyle kapatma sanatıdır.

Buradan basit bir sonuç çıkar: bu iki yöntem rakip değil, tamamlayıcıdır. Birinin zayıf olduğu yerde diğeri güçlüdür. Onları akıllıca birleştirmenin adı **hibrit aramadır**.

## Hibrit arama: skorları birleştirmek

Hibrit aramanın özü şudur: aynı sorguyu hem BM25'e hem de semantik indekse gönderirsiniz, iki ayrı sonuç listesi alırsınız ve bu listeleri tek bir sıralamada birleştirirsiniz. Birleştirmenin iki yaygın yolu vardır.

**Skor birleştirme (weighted sum):** Her belgenin BM25 skoru ile semantik skorunu bir ağırlıkla toplarsınız. Ancak burada bir tuzak var: iki skor farklı ölçeklerdedir. BM25 skoru sınırsız büyüyebilir, kosinüs benzerliği ise tipik olarak 0 ile 1 arasındadır. Bu yüzden toplamadan önce skorları aynı aralığa _normalize_ etmek gerekir.

**Sıra birleştirme (RRF):** Reciprocal Rank Fusion, skorları hiç toplamaz; her listede belgenin _kaçıncı sırada_ olduğuna bakar. Bir belge iki listede de üst sıralardaysa toplam puanı yükselir. Ölçek sorununu tamamen ortadan kaldırdığı için pratikte çok sevilir.

```python
# Reciprocal Rank Fusion (RRF)
def rrf(listeler, k=60):
    skor = {}
    for liste in listeler:               # her arama yönteminin sonucu
        for sira, belge_id in enumerate(liste):
            skor[belge_id] = skor.get(belge_id, 0) + 1 / (k + sira)
    return sorted(skor, key=skor.get, reverse=True)

bm25_sonuc    = bm25_ara(sorgu, top=50)      # kelime tabanlı
semantik_sonuc = vektor_ara(sorgu, top=50)   # embedding tabanlı

hibrit = rrf([bm25_sonuc, semantik_sonuc])   # tek, birleşik sıralama
```

Buradaki `k` sabiti (yaygın bir varsayılan 60'tır), tek bir listede çok üstte olan belgelerin tüm sıralamayı ezmesini yumuşatır. RRF'nin güzelliği, ikiden fazla kaynağı da aynı mantıkla birleştirebilmesidir: dilerseniz başlık araması, etiket araması gibi yeni listeler ekleyebilirsiniz.

<div class="callout"><strong>İpucu:</strong> Skor toplama yöntemini seçtiyseniz, BM25 ve semantik skorları mutlaka aynı aralığa normalize edin (örneğin min-max). Normalize etmeden toplama yaparsanız, büyük ölçekli skor küçük olanı bastırır ve "hibrit" aslında tek bir yönteme döner.</div>

## Reranking: cross-encoder ile ince eleme

Hibrit arama size geniş ama henüz kaba bir aday listesi verir. İşte burada **reranking** devreye girer. Mantığı bir işe alım sürecine benzetelim: önce yüzlerce CV'yi hızlı bir filtreyle 50'ye indirirsiniz (getirim), sonra bu 50 kişiyle tek tek titiz bir mülakat yaparsınız (yeniden sıralama). Mülakatı herkesle yapmak pahalı olurdu; o yüzden sadece en umut verici adaylara uygularsınız.

Buradaki "titiz mülakat", bir **cross-encoder** modelidir. Aradaki fark kritiktir:

-   **Bi-encoder (embedding):** Sorgu ile belgeyi _ayrı ayrı_ vektöre çevirir, sonra benzerliklerini ölçer. Belge vektörleri önceden hesaplanıp saklanabildiği için çok hızlıdır; milyonlarca belge arasında arama yapmaya uygundur.
-   **Cross-encoder:** Sorgu ile belgeyi _birlikte, aynı anda_ modele verir ve doğrudan bir alaka puanı üretir. İkisini yan yana okuduğu için çok daha isabetlidir, ama her çift için modeli baştan çalıştırmak gerektiğinden yavaştır.

Cross-encoder'ı tüm koleksiyona uygulamak imkânsızdır; ama hibrit aramanın getirdiği 50 adaya uygulamak hem ucuzdur hem de sıralamayı belirgin biçimde düzeltir. Tipik mimari şudur: hızlı yöntemlerle geniş tara, yavaş ama isabetli yöntemle az sayıda adayı yeniden sırala.

> Getirim (retrieval) bir balık ağıdır: geniş atar, çok şey toplar. Reranking ise el ile ayıklamadır: yavaştır ama doğruyu öne çıkarır. İkisini birlikte kullanmak, hız ile isabeti aynı anda yakalamanın yoludur.

## Uçtan uca bir akış

Parçaları birleştirdiğimizde, üretim seviyesinde bir getirim hattı genellikle üç katmandan oluşur:

1.  **Geniş getirim:** Sorguyu hem BM25 hem semantik indekse gönder, her birinden ilk 50 sonucu al.
2.  **Birleştirme:** İki listeyi RRF veya normalize edilmiş skor toplamıyla tek bir listede topla. Elde sağlam bir aday havuzu olur.
3.  **Yeniden sıralama:** Bu havuzdan en üstteki adayları (örneğin ilk 20-30) cross-encoder'a ver, en iyi 5-10 sonucu kullanıcıya ya da bir LLM'e (RAG senaryosunda) sun.

```text
# Üç katmanlı getirim hattı
adaylar = rrf([
    bm25_ara(sorgu, top=50),
    vektor_ara(sorgu, top=50),
])[:30]                                  # birleştir, ilk 30'u tut

ciftler = [(sorgu, belge.metin) for belge in adaylar]
puanlar = cross_encoder.predict(ciftler) # her çift için alaka puanı

siralanmis = [b for _, b in sorted(
    zip(puanlar, adaylar), reverse=True)]
sonuc = siralanmis[:5]                    # en isabetli 5 belge
```

Bu hat, modern bir RAG sisteminin kalbidir. LLM'e gönderilen bağlamın kalitesi doğrudan bu son 5 belgenin kalitesine bağlıdır; çöp girerse çöp çıkar. Reranking, "doğru belgeler listede vardı ama altlarda kalmıştı" sorununu çözen katmandır.

## Pratik ayarlar ve ölçüm

Sistemi kurmak kadar onu ölçmek de önemlidir. Birkaç pratik nokta:

-   **Aday sayısı (top-k):** Getirimde çok geniş ağ atmak (örneğin 100+) reranking'i yavaşlatır; çok dar atmak (örneğin 5) doğru belgeyi en baştan kaçırma riskini artırır. 30-50 civarı çoğu durumda iyi bir başlangıçtır.
-   **Ağırlıklar:** Hukuki metinler, kod, ürün katalogları gibi terim-yoğun alanlarda BM25'in ağırlığını artırmak; sohbet ve doğal dil sorgularında semantiği öne çıkarmak mantıklıdır.
-   **Ölçüm metrikleri:** Sıralama kalitesini körlemesine değil, sayıyla izleyin. Yaygın metrikler: doğru belgenin kaçıncı sırada olduğunu ödüllendiren **MRR** ve sıralamanın genel kalitesini ölçen **nDCG**. Küçük ama gerçek bir test kümesi, fikir tartışmalarından daha değerlidir.

<div class="callout"><strong>İpucu:</strong> Reranking eklemeden önce ve sonra aynı test kümesinde nDCG'yi ölçün. Cross-encoder gecikme (latency) ekler; eğer kalite kazancı kullanıcı için fark yaratmıyorsa, o gecikmeye değmeyebilir. Kararı veriyle verin.</div>

## Sık yapılan hatalar

-   **Skorları normalize etmeden toplamak:** Farklı ölçekli BM25 ve kosinüs skorlarını doğrudan toplarsanız, biri diğerini bastırır.
-   **Cross-encoder'ı tüm koleksiyona uygulamaya çalışmak:** Pratikte imkânsızdır; cross-encoder yalnızca getirimden gelen küçük aday listesine uygulanmalıdır.
-   **Getirimi çok dar tutmak:** Doğru belge ilk 50'ye giremiyorsa, reranking onu asla kurtaramaz. Reranking var olmayan bir sonucu yaratamaz, sadece var olanları yeniden sıralar.
-   **Ölçümsüz ilerlemek:** "Sezgisel olarak daha iyi" yeterli değildir. MRR/nDCG gibi metriklerle önce-sonra karşılaştırması yapın.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>BM25 kelimeyi, semantik arama anlamı yakalar; hibrit arama ikisinin zayıf yanlarını birbiriyle kapatır.</li><li>İki sonuç listesini birleştirmek için RRF (sıra tabanlı) ölçek sorunu yaratmadığı için pratiktir; skor toplarken normalize şarttır.</li><li>Cross-encoder sorgu ile belgeyi birlikte değerlendirir; isabetli ama yavaştır, bu yüzden sadece küçük aday listesine uygulanır.</li><li>Tipik hat: geniş getirim → birleştirme → cross-encoder ile yeniden sıralama.</li><li>Kaliteyi MRR ve nDCG gibi metriklerle, gerçek bir test kümesi üzerinde ölçün.</li></ul></div>

<div class="faq"><details><summary>Sadece semantik arama yetmez mi, neden hibrit kuralım?</summary><p>Semantik arama eş anlamlıları yakalar ama nadir terimlerde, ürün kodlarında, özel isimlerde yanılabilir. BM25 tam da bu birebir eşleşmelerde güçlüdür. Hibrit arama ikisini birleştirerek her iki sorgu türünde de sağlam sonuç verir.</p></details><details><summary>Reranking her zaman gerekli mi?</summary><p>Hayır. Küçük koleksiyonlarda veya getirim zaten çok isabetliyse, cross-encoder'ın eklediği gecikme kazandırdığı kaliteye değmeyebilir. Önce ve sonra nDCG ölçüp karar verin; kalite kazancı belirginse eklemeye değer.</p></details><details><summary>RRF ile skor toplama arasında hangisini seçmeliyim?</summary><p>RRF, farklı ölçekteki skorları birleştirmek için daha güvenli ve kurulumu kolaydır; çoğu ekip buradan başlar. Skorlarınızı güvenle normalize edebiliyor ve ağırlıkları ince ayarlamak istiyorsanız ağırlıklı toplam daha fazla kontrol sunar.</p></details></div>

---

Hibrit arama ve reranking, "doğru belgeyi doğru sıraya koyma" probleminin bugünkü en sağlam çözümüdür ve modern RAG sistemlerinin getirim kalitesini doğrudan belirler. Bu katmanları kendi verisi üzerinde doğru kurmak isteyen ekipler için yapay zeka çözümleri geliştiren [HatsonTech](/posts/hatsontech-nedir/), anlamı ve kelimeyi birlikte gözeten arama ve bilgi sistemleri üzerine odaklanıyor.
