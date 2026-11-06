---
title: "Attention (Dikkat) Mekanizması Sezgisel Anlatım: Query, Key, Value ve Self-Attention Neden Devrim Yarattı?"
description: "Bir model bir kelimeyi anlarken hangi kelimelere \"bakar\"? Query-Key-Value, self-attention ve Transformer devrimini günlük analojilerle sezgisel anlatım."
publishDate: "2026-08-09T23:39:00+03:00"
lang: tr
category: "Derin"
tags: ["Derin", "Yapay Zeka"]
translation: "attention-mechanism-explained"
heroImage:
  src: "../../../assets/blog/bimg-11.jpg"
  alt: "Attention (Dikkat) Mekanizması Sezgisel Anlatım: Query, Key, Value ve Self-Attention Neden Devrim Yarattı?"
---

Bir cümleyi okurken aslında her kelimeyi tek başına anlamıyoruz; her kelimeyi _diğer kelimelerin ışığında_ anlıyoruz. “Kediyi gördü, çünkü o açtı.” cümlesinde “o” kim? Modern yapay zekânın bu soruya cevap vermesini sağlayan fikir, tek kelimeyle: **attention** (dikkat).

## Sorun: bağlam her şeydir

Dil bağlamla yaşar. “Banka” kelimesi “para çektim” cümlesinde başka, “nehir kenarındaki banka” cümlesinde başka anlama gelir. Bir modelin bir kelimeyi doğru yorumlaması için, o kelimenin etrafındaki **doğru** kelimelere bakabilmesi gerekir — hepsine eşit değil, sadece ilgili olanlara.

Attention'dan önce yaygın çözüm, cümleyi soldan sağa tek tek işleyen tekrarlayan ağlardı (RNN/LSTM). Bu yaklaşımda bilgi bir tür “zincir” boyunca taşınır. Cümle uzadıkça başta söylenen bir şey sona ulaşana kadar solgunlaşır; üstelik her adım bir öncekini beklediği için işlemi paralelleştirmek zordur.

> “Bir kelimeyi anlamak, cümledeki diğer hangi kelimelere ne kadar bakacağını bilmektir.”

## Sezgi: bir kelime hangilerine bakar?

Şu cümleyi düşünün: _“Çiçekleri suladım çünkü onlar solmuştu.”_ “Onlar” kelimesini işlerken modelin zihninde bir tür projektör vardır: ışığın çoğunu “çiçekler”e tutar, biraz “solmuştu”ya, geri kalan kelimelere neredeyse hiç tutmaz. İşte attention tam olarak bu projektördür: her kelime için **diğer kelimelere dağıtılan bir ağırlık listesi** üretir. Bu ağırlıkların toplamı 1'dir; yani “toplam dikkat” sabittir, onu nereye harcayacağına model karar verir.

Bir toplantı analojisi de işe yarar: bir konuyu anlamak için odadaki herkesi dinlemezsiniz; soruyla en alakalı birkaç kişiye kulak kabartırsınız. Attention, “kime ne kadar kulak vereceğim?” sorusunu sayısal olarak çözer.

## Query, Key, Value: kütüphane benzetmesi

Attention'ın kalbinde üç vektör var: **Query** (sorgu), **Key** (anahtar) ve **Value** (değer). En temiz benzetme bir kütüphanedir:

-   **Query (sorgu):** Aradığınız şey. “Bana bahçecilikle ilgili olanı ver.” İşlemekte olduğunuz kelimenin “ne arıyorum?” sorusudur.
-   **Key (anahtar):** Her kitabın sırtındaki etiket. Sorgunuzla ne kadar uyuştuğuna bakılır. Her kelimenin “ben neyim?” tanıtım kartıdır.
-   **Value (değer):** Kitabın içeriği. Eşleşme güçlüyse o içeriği daha çok alırsınız. Her kelimenin taşıdığı asıl bilgidir.

Mekanizma şöyle işler: Sorgunuzu (Query) tüm etiketlerle (Key) karşılaştırırsınız; en uyumlu etiketlerin kitaplarından (Value) daha fazla, uyumsuzlardan daha az alırsınız. Sonuç, “bu kelime için en alakalı bilgilerin ağırlıklı bir karışımı”dır. Önemli olan şu: Query, Key ve Value, aynı kelimeden öğrenilen üç ayrı doğrusal dönüşümle (matris çarpımı) üretilir — yani model, neye bakacağını veriden kendisi öğrenir.

<div class="callout"><strong>İpucu:</strong> Query–Key benzerliği “neye bakılacağını”, Value ise “o bakıştan ne alınacağını” belirler. Bu ayrım, mekanizmayı esnek kılan asıl numaradır.</div>

## Self-attention adım adım

“Self” (öz) kelimesi şu anlama gelir: cümle _kendi kendine_ bakar. Her kelime hem sorgu sahibidir hem de diğerlerinin baktığı bir kaynaktır. Tek bir kelime için adımlar:

1.  **Skor:** Kelimenin Query'si ile her kelimenin Key'inin nokta çarpımı alınır. Yüksek skor = güçlü ilgi.
2.  **Ölçekleme:** Skorlar, vektör boyutunun kareköküne bölünür ki sayılar aşırı büyümesin (sayısal kararlılık için).
3.  **Softmax:** Skorlar, toplamı 1 olan ağırlıklara dönüştürülür. İşte projektörün ışık dağılımı.
4.  **Ağırlıklı toplam:** Value'lar bu ağırlıklarla çarpılıp toplanır. Çıktı, o kelimenin bağlamla zenginleştirilmiş yeni temsilidir.

Tek bir “bakış açısı” yeterli olmadığı için modeller bunu paralel olarak birkaç kez yapar; buna **çok başlı dikkat** (multi-head attention) denir. Bir baş dilbilgisel ilişkilere, bir başkası anlamsal yakınlığa odaklanabilir — sonra hepsi birleştirilir.

## Küçük bir şema

Mekanizmanın özünü birkaç satır sözde-kodla görelim (gerçek formül: softmax(QKᵀ/√d)·V):

```text
# Girdi: kelime gömüleri X  (n kelime × d boyut)
# Öğrenilen matrisler: W_q, W_k, W_v

Q = X @ W_q        # her kelime icin "ne ariyorum?"
K = X @ W_k        # her kelime icin "ben neyim?"
V = X @ W_v        # her kelime icin "tasidigim bilgi"

skorlar = Q @ K.T            # her kelime cifti icin benzerlik
skorlar = skorlar / sqrt(d)  # olcekleme (kararlilik)
agirliklar = softmax(skorlar, axis=-1)   # toplami 1 olan dikkat

cikti = agirliklar @ V       # baglamla zenginlesmis temsil
```

Dikkat edin: `agirliklar` matrisi, “hangi kelime hangisine ne kadar bakıyor?” sorusunun tam haritasıdır. Bu haritayı görselleştirdiğimizde, modelin “onlar → çiçekler” gibi bağları kendiliğinden kurduğunu görebiliriz.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Attention, her kelimeye “diğer kelimelere ne kadar bakacağını” söyleyen bir ağırlık dağılımı üretir.</li><li>Query–Key benzerliği <em>neye</em> bakılacağını, Value <em>ne alınacağını</em> belirler; üçü de veriden öğrenilir.</li><li>Self-attention'da cümle kendi kendine bakar; çok başlı dikkat aynı anda farklı ilişkileri yakalar.</li><li>Tüm kelimeler aynı anda işlenebildiği için hesaplama paralelleşir — bu, ölçeklenmenin anahtarıdır.</li></ul></div>

## Neden devrim yarattı?

Attention fikri, 2017'de yayımlanan _“Attention Is All You Need”_ makalesiyle **Transformer** mimarisinin merkezine yerleşti. Üç şeyi aynı anda çözdü:

-   **Uzun bağlam:** Herhangi iki kelime, aralarındaki mesafe ne olursa olsun, tek bir adımda doğrudan birbirine bakabilir. Bilgi artık uzun bir zincir boyunca solmuyor.
-   **Paralellik:** RNN'lerin aksine kelimeler sırayla beklemez; hepsi aynı anda işlenir. Bu, modern GPU'larla devasa modelleri eğitmeyi mümkün kıldı.
-   **Yorumlanabilirlik:** Dikkat ağırlıkları, modelin “neye baktığına” dair bir ipucu verir.

Bugün kullandığınız sohbet asistanlarından çeviri araçlarına, hatta görüntü ve ses modellerine kadar pek çok sistemin temelinde bu mekanizma var. Aynı fikir, anlamı sayısal vektörlere taşıyan yaklaşımlarla birleştiğinde, arama ve bilgiye dayalı üretim gibi uygulamaları da besler. Bu zincirin nasıl ürüne dönüştüğünü merak ediyorsanız, yapay zekâyı işlere uygulama tarafına bakan [HatsonTech](/posts/hatsontech-nedir/)'e göz atabilirsiniz.

<div class="faq"><details><summary>Attention ile self-attention arasındaki fark nedir?</summary><p>Genel attention'da sorgular bir diziden, anahtar/değerler başka bir diziden gelebilir (örneğin çeviride kaynak ve hedef cümle). Self-attention'da üçü de aynı diziden gelir: cümle kendi içindeki ilişkilere bakar.</p></details><details><summary>Softmax neden gerekli?</summary><p>Ham benzerlik skorlarını, toplamı 1 olan bir olasılık/ağırlık dağılımına çevirir. Böylece “toplam dikkat” sabit kalır ve model onu en alakalı kelimelere yoğunlaştırmayı öğrenir.</p></details><details><summary>Çok başlı dikkat (multi-head) neden var?</summary><p>Tek bir dikkat hesabı tek bir tür ilişkiyi yakalar. Birden çok “baş”, aynı anda farklı açılardan (dilbilgisi, anlam, konum) bakar; sonuçlar birleştirilince temsil çok daha zengin olur.</p></details></div>

---

Özetle attention, “bir kelimeyi anlamak için doğru kelimelere bakmak” gibi son derece insani bir sezgiyi, öğrenilebilir ve paralelleştirilebilir bir matematiğe çevirir. Basit ama güçlü bu fikir, bugünkü dil modellerinin neden bu kadar yetenekli olduğunu büyük ölçüde açıklar.
