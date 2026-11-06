---
title: "RAG İçin Chunking Stratejileri: Parçalama Kaliteyi Nasıl Belirler?"
description: "RAG'de chunking stratejileri: sabit boyut, cümle/paragraf, overlap, anlamsal chunking ve başlık-bağlamı koruma. Parçalama kaliteyi nasıl etkiler, sezgisel anlatım."
publishDate: "2026-08-09T23:36:00+03:00"
lang: tr
category: "RAG"
tags: ["RAG", "Yapay Zeka"]
translation: "rag-chunking-strategies"
heroImage:
  src: "../../../assets/blog/bimg-14.jpg"
  alt: "RAG İçin Chunking Stratejileri: Parçalama Kaliteyi Nasıl Belirler?"
---

RAG sistemlerinde başarının yarısı modelde değil, belgeleri nasıl parçaladığınızda gizlidir. Yanlış chunking, en güçlü dil modelini bile yanıltır; doğru chunking ise ortalama bir modeli isabetli bir araştırmacıya dönüştürür. Bu yazıda parçalama (chunking) stratejilerini günlük analojilerle, sezgisel biçimde ele alıyoruz.

## Chunking nedir ve neden önemli?

RAG (Retrieval-Augmented Generation) sistemleri, bir soruya cevap verirken önce ilgili belgeleri bulur, sonra o belgelere bakarak yanıt üretir. Ama bir belge bütün hâlinde aranamaz; çünkü bir vektör veritabanında her parça sabit uzunlukta bir "anlam vektörüne" dönüştürülür. İşte belgeyi bu aranabilir parçalara bölme işine **chunking** diyoruz.

Bunu bir kütüphaneyi düzenlemeye benzetin. Kitapları rastgele sayfalara bölüp kutulara atarsanız, doğru bilgiyi bulmak imkânsızlaşır. Ama her kutuya anlamlı, bütünlüklü bölümler koyarsanız, aradığınızı saniyeler içinde bulursunuz. Chunking, RAG'in arama kalitesini doğrudan belirleyen bu "raf düzenidir".

> Kötü chunking, en pahalı modeli bile cahil bırakır; çünkü model yalnızca kendisine verilen parçayı görür.

## Sabit boyutlu parçalama

En basit yöntem, metni belirli bir uzunlukta (örneğin 500 token) eşit parçalara bölmektir. Hızlıdır, tahmin edilebilir ve uygulaması kolaydır. Ancak bir sorunu vardır: metnin anlamını değil, yalnızca karakter sayısını umursar.

Bunu bir gazete makalesini cetvelle ölçüp her 10 santimde bir kesmeye benzetin. Makas tam bir cümlenin ortasına, hatta bir kelimenin yarısına denk gelebilir. Sonuç: yarım kalmış, bağlamı kopuk parçalar.

-   **Artıları:** Hızlı, basit, öngörülebilir maliyet.
-   **Eksileri:** Cümleleri ve fikirleri ortadan böler; bağlam kaybı yaşatır.

## Cümle ve paragraf temelli parçalama

Daha akıllıca bir yaklaşım, metni doğal sınırlarından, yani cümle veya paragraf sonlarından bölmektir. Böylece her parça en azından dilbilgisel olarak bütündür. Bir paragraf çoğu zaman tek bir fikri taşıdığı için, paragraf temelli chunking pek çok belge türünde dengeli sonuç verir.

<div class="callout"><strong>İpucu:</strong> Önce paragrafa göre bölün; çok uzun paragrafları cümle sınırından alt parçalara ayırın; çok kısa parçaları ise komşusuyla birleştirin. Bu "hibrit" yaklaşım pratikte en sağlam temellerden biridir.</div>

## Üst üste binme (overlap)

Parçaları keskin sınırlarla ayırdığınızda, sınıra denk gelen bir bilgi iki parçadan birinde eksik kalabilir. Çözüm: her parçanın sonunu, bir sonraki parçanın başına biraz taşırmak. Buna **overlap** (üst üste binme) denir.

Analojisi şudur: bir merdiveni boyarken, her fırça darbesini bir öncekinin üzerine biraz bindirirsiniz ki arada boyanmamış çizgi kalmasın. Overlap de parçalar arasındaki "boyanmamış" bağlam boşluklarını kapatır. Tipik olarak parça boyutunun %10-20'si kadar bir bindirme iyi bir başlangıçtır.

```python
def chunk_with_overlap(text, size=500, overlap=80):
    chunks = []
    start = 0
    while start < len(text):
        end = start + size
        chunks.append(text[start:end])
        start = end - overlap   # bir sonraki parça geriye doğru biner
    return chunks
```

Dikkat: Aşırı overlap, depolama ve arama maliyetini artırır, hatta aynı bilginin tekrar tekrar dönmesine yol açar. Denge önemlidir.

## Anlamsal (semantic) chunking

En gelişmiş yaklaşım, parçaları karakter sayısına göre değil, **anlam değişimine** göre bölmektir. Fikir şudur: ardışık cümlelerin anlam vektörlerini hesaplayın; anlam birden değiştiğinde (yani konu kaydığında) yeni bir parça başlatın.

Bunu bir konuşmayı dinlerken konunun değiştiğini sezmenize benzetin. Konu "sözleşme feshi"nden "tazminat hesabına" kaydığında, zihniniz otomatik olarak yeni bir başlık açar. Anlamsal chunking de tam bunu yapar: her parça tek bir konuya odaklanır.

-   **Artıları:** Konusal bütünlük yüksek; alaka düzeyi yüksek arama sonuçları.
-   **Eksileri:** Embedding hesabı gerektirir, daha yavaş ve daha pahalıdır.

## Başlık ve bağlamı koruma

Bir parça veritabanından tek başına çekildiğinde, hangi bölüme ait olduğunu unutur. "Bu madde 30 gün içinde uygulanır" cümlesi, hangi maddeden bahsettiğini söylemezse anlamsızdır. Çözüm: her parçaya ait olduğu başlık zincirini eklemek.

```text
[Belge: Kira Sözleşmesi]
[Bölüm: 4. Fesih ve Tahliye]
[Alt başlık: 4.2 Bildirim Süreleri]

Metin: Tahliye taahhüdü, taahhüt edilen tarihten
itibaren bir ay içinde icraya konabilir...
```

Bu "başlık-bağlamı koruma" tekniği, kısa ve teknik belgelerde (kanunlar, sözleşmeler, kılavuzlar) arama isabetini gözle görülür biçimde artırır. Model, parçayı her zaman doğru bağlamda okur.

## Kaliteyi nasıl etkiler?

Chunking stratejisi, RAG kalitesini iki yönden belirler. Birincisi **geri getirme (retrieval) isabeti**: parçalar konusal olarak tutarlıysa, doğru parça doğru soruyla eşleşir. İkincisi **üretim kalitesi**: modele bütünlüklü, bağlamı korunmuş parçalar verirseniz, daha doğru ve kaynağa dayalı cevaplar üretir.

Pratik bir özet: çok küçük parçalar bağlamı kaybeder, çok büyük parçalar ise gürültü taşır ve ilgisiz bilgiyi araya sokar. Doğru boyut belge türüne bağlıdır; tek bir "sihirli sayı" yoktur. Bu yüzden ölçüm şarttır: gerçek sorularla geri getirme isabetini test edin ve parça boyutunu, overlap'i, stratejiyi buna göre ayarlayın.

<div class="callout"><strong>İpucu:</strong> Önce basit (paragraf + küçük overlap) başlayın, bir değerlendirme seti kurun, sonra anlamsal chunking gibi karmaşık yöntemlere ölçülen bir kazanç gördüğünüzde geçin. Erken optimizasyon en sık yapılan hatadır.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Chunking, RAG kalitesini doğrudan belirleyen kritik adımdır; modeli seçmeden önce parçalamayı düşünün.</li><li>Sabit boyut hızlıdır ama anlamı böler; doğal sınırlardan (cümle/paragraf) bölmek daha güvenlidir.</li><li>Overlap, sınırlardaki bağlam boşluklarını kapatır; %10-20 iyi bir başlangıçtır.</li><li>Anlamsal chunking konusal bütünlüğü en üst düzeye çıkarır, ama maliyeti yüksektir.</li><li>Başlık-bağlamını parçaya eklemek, kısa ve teknik belgelerde isabeti belirgin artırır.</li><li>Tek bir doğru sayı yoktur; gerçek sorularla ölçün ve ayarlayın.</li></ul></div>

<div class="faq"><details><summary>İdeal chunk boyutu kaç token olmalı?</summary><p>Tek bir doğru cevap yoktur. Yoğun teknik metinler için 200-500 token, daha anlatımsal içerik için 500-1000 token sık kullanılan aralıklardır. En doğrusu, kendi belgelerinizle ve gerçek sorularla test edip geri getirme isabetine bakmaktır.</p></details><details><summary>Overlap olmadan olur mu?</summary><p>Olur, ama riskli. Overlap olmadan, bir parçanın sınırına denk gelen önemli bir bilgi bölünüp her iki parçada da eksik kalabilir. Küçük bir overlap (örneğin %10-15) bu boşlukları kapatır ve çoğu durumda kaliteyi artırır.</p></details><details><summary>Her zaman anlamsal chunking kullanmalı mıyım?</summary><p>Hayır. Anlamsal chunking güçlüdür ama embedding hesabı gerektirdiği için yavaş ve maliyetlidir. Çoğu projede paragraf temelli + küçük overlap ile başlamak yeterlidir; ölçülebilir bir kazanç gördüğünüzde anlamsal yönteme geçin.</p></details></div>

---

Özetle chunking, RAG'in görünmeyen ama belirleyici temelidir. Doğru strateji, modelinizi "tahmin eden" bir konuşmacıdan "kaynağa dayanan" bir araştırmacıya dönüştürür.
