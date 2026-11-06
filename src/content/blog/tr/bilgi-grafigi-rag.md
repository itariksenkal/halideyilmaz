---
title: "Bilgi Grafiği + RAG (GraphRAG): İlişkileri Yakalayan Getirim"
description: "GraphRAG: bilgi grafiği ile RAG'i birleştiren getirim. Varlıklar arası bağlantılar, çok adımlı ve bütünsel sorular, klasik RAG'ın eksiklerini kapatma. Sezgisel anlatım."
publishDate: "2026-08-09T23:32:00+03:00"
lang: tr
category: "İleri RAG"
tags: ["İleri RAG", "Yapay Zeka"]
translation: "knowledge-graph-rag"
heroImage:
  src: "../../../assets/blog/bimg-18.jpg"
  alt: "Bilgi Grafiği + RAG (GraphRAG): İlişkileri Yakalayan Getirim"
---

Klasik RAG, doğru paragrafı bulmakta iyidir; ama "bu iki kişi nasıl bağlantılı?" gibi ilişki soruları söz konusu olduğunda tökezler. Bilgi grafiği (knowledge graph) ile RAG'i birleştiren GraphRAG, tam da bu boşluğu kapatır: yalnızca benzer metni değil, varlıklar arasındaki bağlantıları da getirir. Bu yazıda GraphRAG'i günlük analojilerle, sezgisel biçimde ele alıyoruz.

## Klasik RAG nerede tıkanır?

Klasik RAG, bir soruya cevap verirken belgeleri parçalara böler, her parçayı bir anlam vektörüne çevirir ve soruya en çok benzeyen parçaları getirir. Bu yaklaşım, "X belgesinde Y konusunda ne yazıyor?" gibi tek noktada toplanan sorularda çok başarılıdır.

Ama şu soruyu düşünün: "Ahmet ile Zeynep ortak hangi projede çalıştı ve o projeyi kim finanse etti?" Bu cevap tek bir paragrafta durmuyor olabilir. Ahmet bir belgede, Zeynep başka bir belgede, finansman bilgisi üçüncü bir yerde geçer. Vektör benzerliği bu parçaları ayrı ayrı bulur ama aralarındaki **bağlantıyı** kuramaz.

> Klasik RAG bir kütüphanedeki en alakalı sayfaları bulur; ama o sayfaların birbirine nasıl bağlandığını anlatan haritayı veremez.

Bu, RAG'in iki tipik zaafını doğurur. Birincisi **çok adımlı (multi-hop) sorular**: cevap, birkaç olgu arasında zincirleme bağlantı kurmayı gerektirir. İkincisi **bütünsel (global) sorular**: "Bu rapor koleksiyonunun ana temaları neler?" gibi, tek bir parçaya değil tüm külliyata bakmayı isteyen sorular. Salt benzerlik araması her iki durumda da yetersiz kalır.

## Bilgi grafiği nedir?

Bilgi grafiği, dünyayı **düğümler** (varlıklar: kişi, kurum, kavram, yer) ve **kenarlar** (ilişkiler: "çalıştı", "finanse etti", "parçasıdır") olarak temsil eden bir veri yapısıdır. Düz metinden farkı, bilginin doğrudan _bağlantılar_ olarak saklanmasıdır.

Bunu bir aile fotoğraf albümü ile bir soyağacı arasındaki farka benzetin. Albümde her fotoğraf ayrı bir karedir; kim kimin kuzeni anlamak için tek tek bakıp çıkarım yaparsınız. Soyağacında ise ilişkiler çizgilerle önceden çizilmiştir; "büyük teyzenin torunu" sorusunu çizgileri takip ederek saniyede yanıtlarsınız. Bilgi grafiği, metnin soyağacıdır.

Bir ilişki, klasik olarak üç parçalı bir ifadeyle (triple) yazılır: (özne, yüklem, nesne).

```text
(Ahmet)      --[calisti]-->      (Atlas Projesi)
(Zeynep)     --[calisti]-->      (Atlas Projesi)
(Vega Fonu)  --[finanse_etti]--> (Atlas Projesi)

# Soru: Ahmet ile Zeynep ortak projesini kim finanse etti?
# Yol:  Ahmet -> Atlas Projesi <- Zeynep ; Atlas Projesi <- Vega Fonu
# Cevap: Vega Fonu
```

Dikkat edin: cevap hiçbir tek cümlede yazmıyor. Grafik, ayrı olguları birleştirerek cevabı _türetiyor_. Klasik RAG'in eksiği tam da budur.

## GraphRAG: grafiği getirimle birleştirmek

GraphRAG, dil modeliyle bir bilgi grafiğini birleştiren getirim yaklaşımıdır. Terim, Microsoft Research'ün 2024'te yayımladığı açık kaynaklı çalışmayla geniş kitlelere ulaştı; ancak temel fikir (grafa dayalı getirim) bundan eskidir. Çekirdek mantık üç adımdan oluşur.

1.  **İnşa:** Belgelerden varlıklar ve ilişkiler çıkarılır, bir grafik kurulur.
2.  **Getirim:** Soruya ilgili düğümler bulunur; ardından kenarlar üzerinden komşu varlıklar ve ilişkiler de toplanır.
3.  **Üretim:** Hem getirilen metin parçaları hem de grafikten gelen ilişki bilgisi modele bağlam olarak verilir; model cevabı bunlara dayandırarak yazar.

Microsoft'un GraphRAG'inin getirdiği önemli bir katkı, **topluluk özetleri** fikridir. Grafik kurulduktan sonra, birbirine sıkı bağlı düğüm kümeleri (topluluklar) tespit edilir ve her topluluk için bir özet üretilir. "Bu külliyatın ana temaları neler?" gibi bütünsel bir soru geldiğinde, sistem tek tek parçalara değil bu hazır topluluk özetlerine bakarak yukarıdan aşağı bir cevap verebilir. Klasik RAG'in en zorlandığı global soru türü budur.

<div class="callout"><strong>İpucu:</strong> GraphRAG'i klasik RAG'in yerine koyacak bir rakip değil, onu tamamlayan bir katman olarak düşünün. Pek çok üretim sistemi ikisini birlikte kullanır: vektör araması alaka için, grafik gezinmesi ise ilişki ve bütünsel sorular için.</div>

## Grafi nasıl kurulur?

Grafiği kurmanın en yaygın yolu, dil modelini bir **çıkarım aracı** olarak kullanmaktır. Her metin parçası modele verilir ve "bu metindeki varlıkları ve aralarındaki ilişkileri üçlüler hâlinde çıkar" denir.

```python
# Her belge parcasi icin LLM ile cikarim
for parca in belge_parcalari:
    sonuc = llm.cikar(parca, sema="varlik + iliski")
    for (ozne, iliski, nesne) in sonuc.ucluler:
        graf.dugum_ekle(ozne)
        graf.dugum_ekle(nesne)
        graf.kenar_ekle(ozne, nesne, etiket=iliski)

# Ayni varligin farkli yazimlarini birlestir (varlik cozumleme)
graf.birlestir("Vega Fonu", "Vega Sermaye")   # -> tek dugum
```

İki nokta hayati önemde. Birincisi **varlık çözümleme (entity resolution)**: "Vega Fonu", "Vega Sermaye" ve "Vega" aynı kuruluşsa, bunları tek bir düğümde birleştirmelisiniz; yoksa grafik parçalanır. İkincisi **şema disiplini**: ilişki etiketlerini ("finanse\_etti", "çalıştı") tutarlı tutun. Aynı ilişkinin beş farklı adı varsa, gezinme güvenilmez olur.

## Getirim grafte nasıl çalışır?

Getirim aşamasında soru önce ilgili giriş düğümlerine bağlanır (genellikle vektör benzerliğiyle). Sonra sistem bu düğümlerden başlayarak kenarlar boyunca **birkaç adım** yürür ve komşu varlıkları, ilişkileri toplar. Bu "yerel mahalle"yi modele bağlam olarak verir.

Bunu bir şehirde yol tarifi sormaya benzetin. Klasik RAG size en yakın üç dükkânı söyler. GraphRAG ise "şu caddeden git, köşeden sağa dön, köprüyü geç" der; yani noktaları değil _yolu_ verir. Çok adımlı sorularda işe yarayan şey budur: cevap, düğümleri birbirine bağlayan yolun kendisinde gizlidir.

-   **Yerel getirim:** Belirli varlıklar etrafındaki komşuluğu gezer; "X ile Y nasıl bağlantılı?" gibi nokta sorular için.
-   **Bütünsel getirim:** Topluluk özetlerine bakar; "ana temalar neler?" gibi geniş sorular için.

## Ne zaman kullanmalı, ne zaman kullanmamalı?

GraphRAG ücretsiz değildir. Grafiği kurmak, her parça için dil modeli çağrısı gerektirdiğinden klasik RAG'e göre belirgin biçimde daha pahalı ve yavaştır. Grafiği güncel tutmak (belgeler değiştikçe) ayrı bir bakım yükü getirir. Bu yüzden seçimi ihtiyaca göre yapın.

GraphRAG, varlıklar arası ilişkilerin yoğun olduğu ve sorulanın çoğunlukla "kim, neyle, nasıl bağlantılı" olduğu alanlarda parlar: araştırma külliyatları, soruşturma dosyaları, kurumsal bilgi tabanları, hukuki ve tıbbi metinler. Buna karşılık, soruların tek bir belgeden yanıtlanabildiği, ilişkilerin az olduğu durumlarda klasik RAG hem yeterli hem daha ucuzdur.

<div class="callout"><strong>İpucu:</strong> Önce klasik RAG ile başlayın ve bir değerlendirme seti kurun. Çok adımlı veya bütünsel sorularda isabetin düştüğünü ölçtüğünüzde GraphRAG katmanını ekleyin. Karmaşıklığı, ölçülmüş bir kazanç gördüğünüzde almak en sağlam yoldur.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Klasik RAG benzer metni bulur ama varlıklar arası bağlantıları kuramaz; çok adımlı ve bütünsel sorularda tökezler.</li><li>Bilgi grafiği, dünyayı düğümler (varlıklar) ve kenarlar (ilişkiler) olarak saklar; cevap, ayrı olguları birleştirerek türetilir.</li><li>GraphRAG üç adımdır: grafik inşası, grafa dayalı getirim, bağlama dayalı üretim.</li><li>Topluluk özetleri, "ana temalar neler?" gibi global sorulara yukarıdan aşağı cevap verir.</li><li>Varlık çözümleme ve tutarlı ilişki şeması, grafiğin güvenilirliğini belirler.</li><li>Grafik kurmak pahalı ve yavaştır; ilişki yoğunluğu düşükse klasik RAG yeterlidir.</li></ul></div>

<div class="faq"><details><summary>GraphRAG, klasik RAG'in yerini alır mı?</summary><p>Genellikle hayır. İkisi farklı sorulara iyidir: vektör araması alaka temelli getirimde, grafik ise ilişki ve bütünsel sorularda güçlüdür. Olgun sistemlerin çoğu ikisini birlikte kullanır; GraphRAG bir rakip değil, tamamlayıcı bir katmandır.</p></details><details><summary>Grafiği elle mi kurmam gerekir?</summary><p>Hayır. Pratikte grafik, dil modeli bir çıkarım aracı olarak kullanılarak otomatik kurulur: her metin parçasından varlıklar ve ilişkiler üçlüler hâlinde çıkarılır. Elle yapılan kısım, şemayı tanımlamak ve varlık çözümleme kurallarını gözden geçirmektir.</p></details><details><summary>Küçük bir projede GraphRAG'e değer mi?</summary><p>Çoğunlukla hayır. Grafik kurmak ek maliyet ve bakım yükü getirir. Eğer sorularınız tek bir belgeden yanıtlanabiliyorsa ve varlıklar arası ilişki azsa, klasik RAG hem daha ucuz hem yeterlidir. GraphRAG'e, çok adımlı veya bütünsel sorularda ölçülen bir kayıp gördüğünüzde geçin.</p></details></div>

---

Özetle GraphRAG, RAG'e "bağlantıları görme" yeteneği kazandırır: benzer metni bulmakla kalmaz, varlıklar arasındaki ilişkileri de getirir ve klasik yaklaşımın çok adımlı ile bütünsel sorulardaki açıklarını kapatır.
