---
title: "Embedding Modelleri ve Semantik Benzerlik: Metni Anlama Çeviren Vektörler"
description: "Metinleri vektöre çevirme, kosinüs benzerliği, embedding modeli seçimi ve çok dilli embedding'leri sezgisel analojiler ve kısa bir kod örneğiyle anlatıyoruz."
publishDate: "2026-08-09T23:37:00+03:00"
lang: tr
category: "Temeller"
tags: ["Temeller", "Yapay Zeka"]
translation: "embedding-models-semantic-similarity"
heroImage:
  src: "../../../assets/blog/covers/embedding-semantik-benzerlik.jpg"
  alt: "Embedding Modelleri ve Semantik Benzerlik: Metni Anlama Çeviren Vektörler"
---

Bir arama kutusuna "uygun fiyatlı dizüstü bilgisayar" yazdığınızda, sonuçlar arasında "ekonomik laptop" başlıklı bir ürün de çıkar. Hiçbir kelime birebir eşleşmediği halde sistem ikisinin _aynı şeyi_ kastettiğini anlar. Bu sezgiyi makinelere kazandıran teknolojinin adı: embedding'ler. Bu yazıda metinleri sayılara çevirmenin, anlam yakınlığını ölçmenin ve doğru modeli seçmenin mantığını sezgisel biçimde anlatacağız.

## Metni vektöre çevirmek nedir?

Bilgisayar harfleri ve cümleleri doğrudan "anlamaz"; sadece sayılarla işlem yapar. Embedding, bir metin parçasını (kelime, cümle ya da paragraf) sabit uzunlukta bir sayı listesine, yani bir **vektöre** dönüştüren yöntemdir. Bu vektör genellikle birkaç yüz ila birkaç bin boyuttan oluşur; örneğin 384, 768 veya 1536 boyutlu olabilir.

Bu sayıları, bir metnin "anlam haritasındaki koordinatları" gibi düşünebilirsiniz. Şehirler arası mesafeyi enlem ve boylamla hesapladığımız gibi, metinler arası anlam yakınlığını da bu koordinatlarla hesaplarız. Önemli olan tek tek sayıların ne ifade ettiği değil, vektörlerin birbirine göre _konumudur_.

> İyi bir embedding uzayında, anlamca yakın metinler birbirine yakın; alakasız metinler uzak noktalara düşer. Böylece "anlam" geometrik bir probleme dönüşür.

Bu vektörleri üreten şey, devasa metin kümeleri üzerinde eğitilmiş sinir ağı modelleridir. Model, hangi kelimelerin hangi bağlamlarda birlikte geçtiğini öğrenerek, anlamı bir uzaydaki konuma yerleştirmeyi öğrenir.

## Kosinüs benzerliği: anlam pusulası

İki vektörün ne kadar benzer olduğunu ölçmenin en yaygın yolu **kosinüs benzerliğidir**. Adından korkmayın: aslında iki ok arasındaki açıya bakmaktan ibarettir.

İki vektörü uzayda iki ok gibi düşünün. Aynı yöne bakıyorlarsa anlamca yakınlardır; aralarındaki açı küçüktür. Tamamen farklı yönlere bakıyorlarsa alakasızlardır. Kosinüs benzerliği bu açının kosinüsünü verir:

-   **1.0'a yakın:** neredeyse aynı yön, çok benzer anlam.
-   **0 civarı:** dik açı, alakasız.
-   **Negatif:** zıt yön; pratikte metin embedding'lerinde nadirdir.

Kosinüsün güzelliği, vektörlerin _uzunluğunu_ değil yalnızca _yönünü_ dikkate almasıdır. Yani uzun bir paragraf ile kısa bir cümle, aynı şeyi anlatıyorsa yüksek benzerlik alır. Bu yüzden anlamsal aramada öklid mesafesi yerine genellikle kosinüs tercih edilir.

<div class="callout"><strong>İpucu:</strong> Birçok kütüphane vektörleri "normalize" eder (uzunluğu 1 yapar). Normalize edilmiş vektörlerde kosinüs benzerliği, basit bir nokta çarpımına eşittir; bu da hesabı hızlandırır.</div>

## Küçük bir örnek

Kosinüs benzerliğinin ne kadar yalın olduğunu görmek için kısa bir sözde-kod inceleyelim. Burada üç cümleyi vektöre çevirip, ilk cümlenin diğer ikisine yakınlığını ölçüyoruz.

```python
import numpy as np

def cosine(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Bir embedding modeli ile cümleleri vektöre çeviriyoruz
v1 = embed("Uygun fiyatlı dizüstü bilgisayar arıyorum")
v2 = embed("Ekonomik bir laptop tavsiyesi")
v3 = embed("Bu akşam hava nasıl olacak?")

print(cosine(v1, v2))   # ~0.83  -> yüksek benzerlik
print(cosine(v1, v3))   # ~0.12  -> alakasız
```

Buradaki `embed()` fonksiyonu, seçtiğiniz embedding modelini temsil eder. Mantık her zaman aynıdır: metin gir, vektör al, vektörleri karşılaştır. Asıl sihir `embed` içinde, yani modelin kalitesinde gizlidir.

Gerçek bir uygulamada bu vektörleri tek tek değil, bir **vektör veritabanında** saklarsınız. Yeni bir sorgu geldiğinde, sorgunun vektörüne en yakın belgeleri saniyenin altında bulursunuz. Anlamsal arama, öneri sistemleri ve RAG (geri-getirmeyle güçlendirilmiş üretim) mimarileri tam olarak bu fikre dayanır.

## Embedding modeli nasıl seçilir?

Tek bir "en iyi" model yoktur; ihtiyaca göre değişir. Karar verirken şu boyutlara bakın:

1.  **Boyut sayısı:** Daha yüksek boyut genellikle daha zengin temsil demektir, ancak daha fazla depolama ve daha yavaş arama anlamına gelir. 384–1024 arası birçok uygulama için dengeli bir aralıktır.
2.  **Bağlam uzunluğu:** Modelin tek seferde işleyebildiği maksimum metin uzunluğu. Uzun belgeleri parçalara bölmeniz (chunking) gerekebilir.
3.  **Alan uyumu:** Hukuk, tıp veya kod gibi özel alanlarda, o alana yakın veriyle eğitilmiş ya da ince ayarlanmış modeller belirgin fark yaratır.
4.  **Maliyet ve barındırma:** API üzerinden çağrılan kapalı modeller mi, yoksa kendi sunucunuzda çalıştıracağınız açık modeller mi? Gizlilik ve maliyet bu kararı belirler.
5.  **Hız:** Saniyede binlerce sorgu mu işleyeceksiniz? Küçük ve hızlı bir model çoğu zaman "en güçlü" modelden daha pratiktir.

Model seçerken karşılaştırma tablolarına bakmak faydalıdır, ancak en güvenilir yol kendi verinizle küçük bir deneme yapmaktır. Birkaç yüz örnek üzerinde iki üç modeli yan yana koyup hangisinin sizin sorularınıza daha doğru sonuç verdiğini ölçün.

<div class="callout"><strong>İpucu:</strong> Sorgularınızı ve belgelerinizi her zaman <em>aynı</em> modelle embed edin. Farklı modellerin vektör uzayları birbiriyle uyumlu değildir; karıştırırsanız benzerlik skorları anlamını yitirir.</div>

## Çok dilli embedding'ler

Klasik bir embedding modeli yalnızca eğitildiği dilde iyi çalışır. **Çok dilli** modeller ise birden çok dili _ortak_ bir anlam uzayına yerleştirir. Bunun pratik sonucu çarpıcıdır: Türkçe bir sorgu, İngilizce bir belgeyle yüksek benzerlik alabilir, çünkü ikisi de aynı kavramı temsil ediyorsa uzayda birbirine yakın düşerler.

Bu özellik, birden çok dilde içerik barındıran sistemler için altın değerindedir. Kullanıcı kendi dilinde soru sorar; sistem dil ayrımı yapmadan en alakalı içeriği bulur. Örneğin Türkçe ve İngilizce kopyaları birlikte yayınlanan bir blog ya da bilgi tabanı, tek bir indeksle her iki dilde de aranabilir hale gelir.

Yine de çok dilli modellerin bedeli vardır: belirli bir dilde, o dile özel eğitilmiş bir modele kıyasla biraz daha düşük doğruluk gösterebilirler. Tek dilli bir uygulamada özel model, çok dilli bir uygulamada ise ortak uzay genellikle daha mantıklı tercihtir.

> Çok dilli embedding, "anlam dilden bağımsızdır" fikrinin mühendislikteki karşılığıdır. Kelimeler değişir, kavramların koordinatları yakın kalır.

## Sık yapılan hatalar

-   **Çok uzun metinleri tek vektöre sıkıştırmak:** Bir kitabı tek bir vektöre indirgemek anlamı bulanıklaştırır. Metni anlamlı parçalara bölün.
-   **Sorgu ve belge için farklı model kullanmak:** Skorlar tutarsız olur.
-   **Yalnızca benzerliğe güvenmek:** Çok yakın iki vektör bile bağlamda yanlış olabilir; sonuçları gerektiğinde yeniden sıralayın (re-ranking).
-   **Normalize etmeyi unutmak:** Bazı mesafe metrikleri normalize edilmemiş vektörlerde beklenmedik sonuç verir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Embedding, metni anlamını koruyan sabit uzunlukta bir vektöre çevirir.</li><li>Kosinüs benzerliği, iki vektör arasındaki açıya bakarak anlam yakınlığını ölçer; 1'e yakın çok benzer demektir.</li><li>Model seçiminde boyut, bağlam uzunluğu, alan uyumu, maliyet ve hız dengelenir.</li><li>Çok dilli modeller farklı dilleri ortak bir anlam uzayına yerleştirir; diller arası arama mümkün olur.</li><li>Sorgu ile belgeleri daima aynı modelle embed edin.</li></ul></div>

<div class="faq"><details><summary>Embedding ile anahtar kelime aramasının farkı nedir?</summary><p>Anahtar kelime araması birebir kelime eşleşmesi arar; "laptop" yazarsanız "dizüstü" bulunmaz. Embedding tabanlı arama ise anlamı yakaladığı için eş anlamlı ve farklı ifadeleri de eşleştirir.</p></details><details><summary>Hangi vektör boyutu en iyisidir?</summary><p>Tek bir doğru yok. Daha yüksek boyut daha zengin temsil sağlar ama depolama ve hız maliyeti getirir. Çoğu uygulama için orta seviye bir boyut (örneğin 384–1024) iyi bir dengedir; en sağlıklısı kendi verinizle ölçmektir.</p></details><details><summary>Embedding'ler içerik değişince güncellenmeli mi?</summary><p>Evet. Bir belge değiştiğinde onun vektörünü yeniden hesaplayıp indeksi güncellemeniz gerekir; aksi halde arama eski içeriği yansıtır. Model sürümünü değiştirirseniz tüm koleksiyonu yeniden embed etmelisiniz.</p></details></div>

---

Embedding'ler, "anlamı ölçülebilir kılma" fikrinin bugünkü en pratik karşılığıdır ve anlamsal arama, öneri ve RAG sistemlerinin temelini oluşturur. Bu yapı taşlarını doğru kurmak isteyen ekipler için yapay zeka çözümleri geliştiren [HatsonTech](/posts/hatsontech-nedir/), dil ayrımı gözetmeden çalışan arama ve bilgi sistemleri üzerine odaklanıyor.
