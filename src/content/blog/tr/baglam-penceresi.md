---
title: "Bağlam Penceresi ve Uzun Belgeler: Token Sınırı, Ortada Kaybolma, Uzun Bağlam vs RAG"
description: "Bağlam penceresi nedir? Token sınırı, \"ortada kaybolma\" sorunu, uzun bağlam mı RAG mi ve özetleme zincirleri (map-reduce, refine) sezgisel analojilerle anlatıldı."
publishDate: "2026-08-09T23:34:00+03:00"
lang: tr
category: "Sınırlar"
tags: ["Sınırlar", "Yapay Zeka"]
translation: "context-window-long-documents"
heroImage:
  src: "../../../assets/blog/covers/baglam-penceresi.jpg"
  alt: "Bağlam Penceresi ve Uzun Belgeler: Token Sınırı, Ortada Kaybolma, Uzun Bağlam vs RAG"
---

Bir dil modeline ne kadar çok metin verebileceğinizin bir sınırı vardır; üstelik bu sınıra dayanmasanız bile, model bağlamın ortasında kalan bilgileri kıyıdakilere göre daha kolay gözden kaçırır. Bu yazıda bağlam penceresini (context window) günlük analojilerle ele alıyor; token sınırını, "ortada kaybolma" sorununu, uzun bağlam ile RAG arasındaki tercihi ve özetleme zincirlerini sezgisel biçimde inceliyoruz.

## Bağlam penceresi nedir?

Bir dil modeliyle konuştuğunuzda, model yalnızca o an kendisine verilen metni "görür": sistem talimatınız, önceki mesajlar ve sorduğunuz soru. Modelin bir defada okuyup üzerinde işlem yapabildiği bu metin kümesinin tamamına **bağlam penceresi** denir. Pencerenin boyutu sabittir ve **token** cinsinden ölçülür.

Bunu bir kişinin masasına benzetin. Masaya aynı anda yalnızca belirli sayıda kâğıt sığar. Yeni bir belge koymak istediğinizde, masa doluysa eskilerden birini kaldırmanız gerekir. Bağlam penceresi de tam böyle çalışır: model "kısa süreli hafızası" kadar metni aynı anda tutabilir; bu sınırın dışında kalan her şey görünmez olur.

> Model, bağlam penceresinin dışındaki hiçbir şeyi "bilmez"; yalnızca o pencerede ne varsa onunla düşünür.

Önemli bir ayrım: bağlam penceresi, modelin eğitim sırasında öğrendiği genel bilgi değildir. Eğitim bilgisi modelin ağırlıklarına gömülüdür ve kalıcıdır. Bağlam penceresi ise o anki konuşmaya özeldir, geçicidir ve her istekte sıfırdan doldurulur.

## Token sınırı ve neden var?

Token, modelin metni işlerken kullandığı en küçük birimdir; kabaca bir kelimenin parçası kadardır. İngilizcede ortalama bir kelime yaklaşık 1,3 token tutar; Türkçede ekler nedeniyle bu oran genellikle daha yüksektir. Bağlam penceresi de işte bu token sayısıyla ölçülür ve hem girdi (prompt) hem de modelin ürettiği çıktı bu bütçeyi paylaşır.

Peki neden bir sınır var? Çünkü Transformer mimarisindeki dikkat (attention) mekanizması, her token'ı diğer tüm token'larla karşılaştırır. Token sayısı _n_ ise, bu karşılaştırmaların sayısı kabaca _n²_ ile artar. Yani bağlamı iki katına çıkardığınızda, hesaplama ve bellek maliyeti yaklaşık dört katına çıkar.

```text
Bağlam = 1.000 token   -> ~1.000.000 ikili ilişki
Bağlam = 2.000 token   -> ~4.000.000 ikili ilişki  (4x)
Bağlam = 10.000 token  -> ~100.000.000 ikili ilişki (100x)

# maliyet ~ n^2  =>  bağlam büyüdükçe pahalılaşma hızlanır
```

<div class="callout"><strong>İpucu:</strong> Token sınırını bir "bütçe" gibi düşünün. Çok uzun bir sistem talimatı, modelin gerçek soruya ve belgelere ayıracağı yeri daraltır. Talimatı kısa ve net tutmak, çoğu zaman pencereyi büyütmekten daha etkilidir.</div>

## "Ortada kaybolma" sorunu

Pencere büyük olsa bile, modelin her token'a eşit dikkat göstermesi garanti değildir. Araştırmalar, modellerin uzun bir bağlamın **başındaki ve sonundaki** bilgileri, **ortasındaki** bilgilere göre çok daha güvenilir biçimde kullandığını göstermiştir. Bu eğilime literatürde "lost in the middle" yani **ortada kaybolma** denir.

Tanıdık bir benzetme: uzun bir toplantıyı düşünün. İnsanlar genellikle ilk söylenenleri ve en son söylenenleri hatırlar; ortadaki konuşmalar ise belleğin tozlu raflarına düşer. Diziyi izlerken de ilk ve son bölümler daha akılda kalır. Dil modelleri de benzer bir "kenar etkisi" yaşar.

Bunun pratik sonucu nettir: bir belgenin tam ortasına gizlenmiş kritik bir cümle, pencereye sığsa bile modelin gözünden kaçabilir. Bu yüzden uzun bağlamlarla çalışırken yerleşim önemlidir.

-   En önemli talimat ve bilgileri bağlamın **başına veya sonuna** yerleştirin.
-   Soruyu, ilgili belgelerin hemen ardından, yani **sona yakın** tekrar edin.
-   Alakasız metinle pencereyi doldurmaktan kaçının; gürültü, gerçek sinyali boğar.

> Pencerenin büyük olması, içine ne koyarsanız koyun modelin hepsini eşit ciddiyetle okuyacağı anlamına gelmez.

## Uzun bağlam mı, RAG mi?

Diyelim ki yüzlerce sayfalık bir belge koleksiyonuyla çalışıyorsunuz. İki temel yol var. Birincisi, mümkün olduğunca çok metni doğrudan **uzun bağlam** penceresine sığdırmak. İkincisi, yalnızca soruyla en alakalı parçaları bulup modele vermek; buna **RAG** (Retrieval-Augmented Generation, bilgi getirmeli üretim) denir.

Analoji şu: bir soruya cevap ararken ya kitabın tamamını baştan sona okursunuz (uzun bağlam), ya da dizinden ilgili sayfalara gidip yalnızca onları okursunuz (RAG). İkincisi neredeyse her zaman daha hızlı ve daha ucuzdur; üstelik "ortada kaybolma" riskini de azaltır, çünkü modele yalnızca odaklı, ilgili parçalar verirsiniz.

Kabaca bir karşılaştırma:

-   **Uzun bağlam — Artıları:** Kurulumu basit; belgeler arası ince bağlantıları yakalayabilir; ek altyapı gerektirmez.
-   **Uzun bağlam — Eksileri:** Maliyet ve gecikme yüksek; ortada kaybolma riski; pencere sınırı yine de aşılabilir.
-   **RAG — Artıları:** Ölçeklenebilir (milyonlarca belge); ucuz ve hızlı; cevabı kaynağa dayandırır; güncel veriyle çalışmak kolay.
-   **RAG — Eksileri:** Getirme (retrieval) kalitesine bağımlı; chunking ve indeksleme altyapısı gerektirir; yanlış parça gelirse cevap da bozulur.

<div class="callout"><strong>İpucu:</strong> İki yaklaşım rakip değil, tamamlayıcıdır. Yaygın bir desen, RAG ile aday parçaları daraltıp, ardından kalan en alakalı içeriği uzun bağlama sığdırmaktır. Önce RAG ile sinyali yoğunlaştırın, sonra bağlamı modele verin.</div>

## Özetleme zincirleri

Ya belge pencereye hiç sığmıyorsa? Tek bir istekte işleyemeyeceğiniz kadar uzun bir metni özetlemeniz gerekiyorsa, **özetleme zincirleri** devreye girer. Temel fikir, metni parçalara bölmek ve özetleri kademeli olarak birleştirmektir.

İki klasik desen vardır. Birincisi **map-reduce**: her parçayı ayrı ayrı özetlersiniz (map), sonra bu ara özetleri tek bir bütünde birleştirip son özeti üretirsiniz (reduce). İkincisi **refine** (yinelemeli iyileştirme): ilk parçanın özetiyle başlar, sonraki her parçayı okurken özeti güncelleyerek ilerlersiniz.

```python
# Map-Reduce özetleme (pseudocode)
parcalar = metni_bol(belge, boyut=3000)

ara_ozetler = []
for p in parcalar:                 # MAP
    ara_ozetler.append(ozetle(p))

son_ozet = ozetle("\n".join(ara_ozetler))   # REDUCE
return son_ozet
```

Bunu, kalın bir raporu bir ekibe paylaştırmaya benzetin: her kişi kendi bölümünü özetler (map), sonra bir editör bu özetleri tek bir yönetici özetinde toplar (reduce). Refine deseni ise bunun yerine tek bir okuyucunun, her yeni bölümde notlarını gözden geçirip güncellemesine benzer.

-   **Map-reduce:** Parçalar paralel işlenebildiği için hızlıdır; ama parçalar arası bağlantı zayıflayabilir.
-   **Refine:** Sıralı akışı ve bağlamı daha iyi korur; ama sıralı olduğu için yavaştır.

Her iki yöntemde de bir miktar bilgi kaybı kaçınılmazdır; özet, doğası gereği kayıplı bir sıkıştırmadır. Bu yüzden kritik ayrıntıların korunması gereken durumlarda, özetlemeyi RAG ile birleştirmek (özette geçmeyen detayı gerektiğinde kaynaktan çekmek) daha sağlam bir yaklaşımdır.

## Pratik bir karar rehberi

Hangi yaklaşımı seçeceğiniz, veri büyüklüğüne ve göreve bağlıdır. Basit bir sezgi:

1.  **Birkaç sayfa, tek belge:** Doğrudan bağlam penceresine koyun. En basit ve genellikle en isabetli yol.
2.  **Büyük ama statik koleksiyon, hedefli sorular:** RAG kullanın. Ölçeklenir, ucuzdur, cevabı kaynağa bağlar.
3.  **Tek bir uzun belgenin bütününü kavramak (örneğin "bu raporu özetle"):** Özetleme zinciri kullanın.
4.  **Hem geniş hem isabetli olması gereken işler:** RAG + uzun bağlamı birlikte kullanın.

<div class="callout"><strong>İpucu:</strong> Pencereyi büyütmek her sorunun çözümü değildir. Önce sinyali yoğunlaştırın: alakasız metni atın, önemli bilgiyi kenarlara yerleştirin, soruyu sona yakın tekrarlayın. Çoğu zaman daha küçük ama daha temiz bir bağlam, daha büyük ve gürültülü bir bağlamdan iyi sonuç verir.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Bağlam penceresi, modelin bir defada görebildiği metindir; token cinsinden ölçülür ve sabit bir sınırı vardır.</li><li>Sınır vardır çünkü dikkat maliyeti token sayısının karesiyle (~n²) artar; bağlam büyüdükçe pahalılaşma hızlanır.</li><li>"Ortada kaybolma": modeller bağlamın baş ve sonundaki bilgiyi ortasındakine göre daha iyi kullanır.</li><li>Önemli bilgiyi kenarlara koyun, soruyu sona yakın tekrarlayın, gürültüyü ayıklayın.</li><li>RAG, büyük koleksiyonlar için uzun bağlamdan genellikle daha ucuz, hızlı ve ölçeklenebilirdir.</li><li>Pencereye sığmayan metinler için map-reduce veya refine gibi özetleme zincirleri kullanın.</li></ul></div>

<div class="faq"><details><summary>Bağlam penceresi büyüdükçe RAG'e gerek kalmaz mı?</summary><p>Hayır. Pencere büyüse de iki sorun kalır: maliyet/gecikme token sayısıyla hızla artar ve "ortada kaybolma" nedeniyle uzun bağlamda isabet düşebilir. Üstelik milyonlarca belgeyi hiçbir pencere bir defada alamaz. RAG, ilgili parçaları seçerek hem ucuzluk hem isabet sağlar; bu yüzden büyük pencereler RAG'i gereksiz kılmaz, tamamlar.</p></details><details><summary>Girdi ile çıktı aynı token bütçesini mi paylaşır?</summary><p>Pratikte evet sayılır. Modelin toplam bir bağlam sınırı vardır ve prompt ile üretilecek cevap birlikte bu sınırın içinde kalmalıdır. Çok uzun bir girdi verirseniz, modele uzun bir cevap üretmesi için bırakılan yer azalır. Bu yüzden uzun çıktı beklediğiniz durumlarda girdiyi sıkı tutmak gerekir.</p></details><details><summary>Özetleme zincirinde map-reduce mi yoksa refine mı tercih etmeliyim?</summary><p>Hıza ve bağlam bütünlüğüne göre değişir. Map-reduce parçaları paralel işlediği için hızlıdır ve büyük belgelerde iyi ölçeklenir, ama parçalar arası ilişkiyi zayıflatabilir. Refine sıralı ilerlediği için anlatı akışını ve bağlamı daha iyi korur, ama yavaştır. Bağımsız bölümlerden oluşan belgelerde map-reduce, sürekli akan metinlerde refine genellikle daha iyidir.</p></details></div>

---

Özetle bağlam penceresi, dil modelleriyle çalışırken en çok hafife alınan kısıttır. Doğru strateji, daha büyük bir pencere satın almak değil; sinyali yoğunlaştırmak, bilgiyi akıllıca yerleştirmek ve RAG ile özetlemeyi yerinde kullanmaktır. Bu yaklaşımları üretim sistemlerinde nasıl hayata geçirdiğimizi merak ediyorsanız, [HatsonTech](/posts/hatsontech-nedir/)'in yapay zekâ mimarisine göz atabilirsiniz.
