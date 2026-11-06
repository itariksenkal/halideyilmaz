---
title: "Yapay Zeka Öğrenmek İçin 6–12 Aylık Bir Yol Haritası"
description: "Matematik, Python, makine öğrenmesi, derin öğrenme ve büyük dil modelleri: ücretsiz kaynaklar ve her aşamaya bir projeyle kendi kendine çalışma planı."
publishDate: "2026-12-02T09:17:00+03:00"
lang: tr
category: "Kariyer"
tags: ["Yapay Zeka", "Öğrenme", "Kariyer"]
translation: "ai-learning-roadmap"
heroImage:
  src: "../../../assets/blog/covers/yapay-zeka-ogrenme-yol-haritasi.jpg"
  alt: "Matematikten büyük dil modellerine uzanan aşamaları gösteren bir öğrenme yol haritası"
---

"Yapay zekayı öğrenmek istiyorum, nereden başlamalıyım?" Bu çok sık sorulan bir soru ve bence dürüst cevabı şu: Tek bir doğru yol yok, ama bazı sıralamalar diğerlerinden çok daha verimli. İnternette kaynak sıkıntısı yok; asıl sorun, hangisini hangi sırayla okuyacağınızı bilmemek ve yarı yolda motivasyonu kaybetmek. Bu yazıda, haftada düzenli olarak birkaç saat ayırabilen biri için 6 ila 12 ay sürebilecek bir kendi kendine çalışma planı öneriyorum. Önerdiğim kaynakların tamamı ücretsiz erişilebilir ve her aşamanın sonunda küçük bir proje var. Süreleri kendi temponuza göre esnetmekten çekinmeyin.

## Önce beklentileri doğru kurmak

Bu yol haritası sizi birkaç ay içinde "yapay zeka uzmanı" yapmayacak. Hedefi daha gerçekçi tanımlayalım: Planın sonunda temel kavramları anlayan, basit modelleri kendi başına kurup değerlendirebilen, büyük dil modellerinin (LLM) nasıl çalıştığına dair sağlam bir sezgisi olan ve bunu gösteren birkaç projesi bulunan biri olmak.

Genel akış şöyle:

| Aşama | Yaklaşık süre | Odak |
|---|---|---|
| 1. Temeller | 1–2 ay | Python ve matematik tekrarı |
| 2. Makine öğrenmesi | 2–3 ay | Klasik yöntemler, değerlendirme |
| 3. Derin öğrenme | 2–3 ay | Sinir ağları, görüntü ve metin |
| 4. Büyük dil modelleri | 1–2 ay | Transformer, ince ayar, uygulama |
| 5. Bitirme projesi | 1–2 ay | Uçtan uca bir çalışma |

Daha önce programlama deneyiminiz varsa ilk aşamayı kısaltabilirsiniz; matematik altyapınız güçlüyse ikinci aşamada daha hızlı ilerlersiniz.

## 1. Aşama: Python ve matematik tekrarı

**Python.** Python'un resmî belgelerindeki öğretici (The Python Tutorial), dili sistemli öğrenmek için hâlâ çok iyi bir başlangıç. Daha uygulamalı bir giriş isterseniz Kaggle Learn'deki kısa Python ve Pandas kursları, veriyle çalışmaya hızlıca geçmenizi sağlar.

**Matematik.** Korkutucu görünse de başlangıç için gereken matematik sınırlı: lineer cebir (vektörler, matrisler), temel türev kavramı ve olasılık-istatistik. Bunlar için birkaç iyi kaynak:

- **Khan Academy:** Lineer cebir ve istatistik konularında ücretsiz, adım adım dersler.
- **3Blue1Brown – Essence of Linear Algebra:** Lineer cebiri görsel sezgiyle anlatan kısa video serisi.
- **MIT OpenCourseWare 18.06:** Gilbert Strang'in lineer cebir dersi; video kayıtları ve ders materyalleri ücretsiz.
- **Mathematics for Machine Learning:** Deisenroth, Faisal ve Ong'un kitabı; yazarlar PDF'ini ücretsiz olarak erişime açık tutuyor. Bu kitabı baştan sona okumak yerine, ihtiyaç duydukça başvurulacak bir kaynak olarak kullanmanızı öneririm.

**Proje:** Açık bir veri setini (örneğin TÜİK'ten ya da bir belediye portalından) Pandas ile okuyun, temizleyin ve birkaç grafikle basit sorulara cevap veren kısa bir analiz yazın.

<div class="callout"><strong>İpucu:</strong> Matematiği "önce bitireyim, sonra başlarım" diye beklemeyin. Temel kavramları öğrendikten sonra devam edin; ihtiyaç doğdukça geri dönüp derinleştirmek çok daha kalıcı oluyor.</div>

## 2. Aşama: Makine öğrenmesinin temelleri

Bu aşamada amaç, regresyon, sınıflandırma, karar ağaçları gibi klasik yöntemleri ve en önemlisi **modeli doğru değerlendirmeyi** öğrenmek.

- **Google Machine Learning Crash Course:** Google'ın ücretsiz kursu Kasım 2024'te yenilendi. Doğrusal ve lojistik regresyondan sinir ağlarına, büyük dil modellerine ve sorumlu yapay zekaya kadar uzanan modüller içeriyor.
- **An Introduction to Statistical Learning (ISL):** James, Witten, Hastie ve Tibshirani'nin kitabı; 2023'te Python sürümü de yayımlandı ve yazarların sitesinden PDF olarak indirilebiliyor. İstatistiksel düşünmeyi sezgisel biçimde anlatan en iyi kaynaklardan biri.
- **scikit-learn belgeleri:** Kütüphanenin kullanım kılavuzu, yöntemleri örneklerle açıklıyor.

**Proje:** Gerçek bir sınıflandırma problemi seçin. Önce çok basit bir başlangıç modeli kurun, sonra daha gelişmiş bir yöntemle karşılaştırın. Sonuçları yalnızca doğruluk oranıyla değil, hata türleriyle de raporlayın.

## 3. Aşama: Derin öğrenme

Sinir ağlarına geçtiğinizde iki farklı öğrenme tarzından birini seçebilirsiniz: önce uygulama sonra teori, ya da tersi.

- **fast.ai – Practical Deep Learning for Coders:** Jeremy Howard'ın ücretsiz kursu "önce çalışan bir şey kur, sonra içini aç" yaklaşımını benimsiyor. Yaklaşık bir yıllık kod deneyimi öneriyor; üniversite düzeyinde matematik şart koşmuyor.
- **Dive into Deep Learning (d2l.ai):** Açık kaynaklı, etkileşimli bir kitap. Her kavramı çalıştırılabilir kodla anlatıyor ve PyTorch, JAX, TensorFlow gibi farklı çatılarla sürümleri var.
- **Deep Learning (Goodfellow, Bengio, Courville):** Daha kuramsal bir kaynak; kitabın tamamı yazarların sitesinde ücretsiz okunabiliyor.

**Proje:** Küçük bir görüntü ya da metin sınıflandırıcı eğitin. Hazır eğitilmiş bir modeli kendi küçük veri setinize uyarlayın (transfer öğrenme) ve modelin nerede yanıldığını örneklerle gösterin.

## 4. Aşama: Büyük dil modelleri

Bu aşamaya geldiğinizde LLM'leri "sihirli kutu" olarak değil, öğrendiğiniz kavramların büyük ölçekli bir uygulaması olarak görmeye başlarsınız.

- **Andrej Karpathy – Neural Networks: Zero to Hero:** YouTube'da ücretsiz yayımlanan bu seride geri yayılımdan başlayıp adım adım küçük bir GPT modeli ve bir tokenizer inşa ediliyor. Python bilgisi ve türev gibi giriş düzeyi matematik yeterli.
- **Hugging Face LLM Course:** Tamamen ücretsiz ve reklamsız. Transformer modellerini kullanmayı, ince ayar yapmayı, veri setleri ve tokenizer'larla çalışmayı anlatıyor. Kurs, öncesinde giriş düzeyinde bir derin öğrenme eğitimi almanızı öneriyor.

**Proje:** Kendi seçtiğiniz bir belge koleksiyonu üzerinde soru cevaplayan küçük bir uygulama kurun. Ama asıl önemli kısım şu: Uygulamanın ne kadar doğru cevap verdiğini ölçmek için küçük bir test seti hazırlayın ve modelin uydurduğu (halüsinasyon) cevapları kaydedin.

## 5. Aşama: Bitirme projesi ve sorumlu yapay zeka

Son aşamada önceki her şeyi bir araya getiren, size gerçekten ilginç gelen bir problem seçin. Bu proje, öğrendiklerinizi göstermenin en iyi yolu olacak.

İyi bir bitirme projesinde şunlar olmalı:

- Net bir soru ve neden önemli olduğunun kısa bir açıklaması,
- Verinin kaynağı, lisansı ve sınırlılıkları,
- Bir başlangıç modeli ve onunla karşılaştırma,
- Dürüst bir değerlendirme: model nerede iyi, nerede kötü, kimler için yanlış sonuç verebilir?

Son madde, sorumlu yapay zekanın özünü oluşturuyor. Bir modelin farklı gruplar için farklı performans gösterip göstermediğini sormak, artık iyi mühendisliğin bir parçası.

<div class="callout"><strong>İpucu:</strong> Öğrendiklerinizi kısa yazılarla ya da notlarla paylaşın. Bir konuyu başkasına anlatmaya çalışmak, onu ne kadar anladığınızı görmenin en dürüst yolu.</div>

## Motivasyonu korumak

Uzun bir öğrenme sürecinde en zor kısım teknik konular değil, devamlılık. Birkaç öneri:

- **Takvim belirleyin:** Haftada belirli günleri ve saatleri bu işe ayırın.
- **Kaynak biriktirmeyin:** Aynı anda beş kurs başlatmak yerine birini bitirin.
- **Bir topluluğa katılın:** Bir çalışma arkadaşı ya da çevrim içi bir grup, zor haftalarda devam etmenizi kolaylaştırır.
- **Takıldığınız yerde durmayın:** Bir kavramı ilk seferde anlamamak normal. İşaretleyin, devam edin, sonra geri dönün.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Tek bir doğru yol yok, ama temeller, klasik makine öğrenmesi, derin öğrenme ve LLM sıralaması verimli bir akış sunuyor.</li><li>Önerilen kaynakların tamamı ücretsiz erişilebilir: Khan Academy, MIT OCW, fast.ai, d2l.ai, Google MLCC, Hugging Face ve diğerleri.</li><li>Matematiği tamamen bitirmeyi beklemeden ilerleyin; ihtiyaç duydukça geri dönün.</li><li>Her aşamayı küçük bir projeyle kapatın ve modelinizi dürüstçe değerlendirmeyi alışkanlık hâline getirin.</li><li>Devamlılık, yoğunluktan daha önemli.</li></ul></div>

<div class="faq"><details><summary>Yapay zeka öğrenmek için güçlü bir matematik altyapısı şart mı?</summary><p>Başlamak için değil. Lise düzeyinde matematik ve temel lineer cebir, olasılık bilgisiyle başlayabilirsiniz. Daha ileri konulara geçtikçe matematiği derinleştirmeniz gerekecektir.</p></details><details><summary>İngilizce bilmeden bu kaynakları kullanabilir miyim?</summary><p>Önerilen kaynakların çoğu İngilizce. Bazılarının topluluk tarafından yapılmış çevirileri ya da altyazıları bulunuyor, ancak teknik İngilizce okuma becerisi bu alanda uzun vadede büyük avantaj sağlıyor.</p></details><details><summary>Doğrudan büyük dil modellerinden başlasam olmaz mı?</summary><p>LLM'leri hazır araçlarla kullanmaya hemen başlayabilirsiniz. Ancak nasıl çalıştıklarını, neden hata yaptıklarını ve nasıl değerlendirileceklerini anlamak için temel makine öğrenmesi ve derin öğrenme bilgisi gerekiyor.</p></details><details><summary>Bu planın sonunda iş bulabilir miyim?</summary><p>Plan sağlam bir temel ve gösterilebilir projeler kazandırmayı amaçlıyor. İş bulmak ise deneyime, bölgeye, sektöre ve projelerinizin kalitesine bağlı. Bu süreci bir başlangıç olarak görmek daha gerçekçi.</p></details></div>

---

**Kaynaklar**

- [Mathematics for Machine Learning (Deisenroth, Faisal, Ong)](https://mml-book.github.io/)
- [MIT OpenCourseWare – 18.06 Linear Algebra (Gilbert Strang)](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [fast.ai – Practical Deep Learning for Coders](https://course.fast.ai/)
- [Andrej Karpathy – Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)
- [Hugging Face – LLM Course](https://huggingface.co/learn/llm-course)
