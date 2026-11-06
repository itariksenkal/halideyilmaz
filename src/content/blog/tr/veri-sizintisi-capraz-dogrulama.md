---
title: "Veri Sızıntısı ve Çapraz Doğrulama: Test Skorunuz Neden Yalan Söylüyor?"
description: "Mükemmel görünen bir doğrulama skoru çoğu zaman sızıntının işaretidir. Zaman sızıntısı, grup sızıntısı, ölçekleme hatası ve doğru çapraz doğrulama şemasını sezgisel örneklerle anlatıyoruz."
publishDate: "2026-08-09T23:56:00+03:00"
lang: tr
category: "Değerlendirme"
tags: ["Değerlendirme", "Yapay Zeka"]
translation: "data-leakage-cross-validation"
heroImage:
  src: "../../../assets/blog/bimg-04.jpg"
  alt: "Veri Sızıntısı ve Çapraz Doğrulama: Test Skorunuz Neden Yalan Söylüyor?"
---

Bir modelin doğrulama skoru beklenenden çok yüksek çıktığında sevinmeden önce şüphelenmek gerekir. Makine öğrenmesinde en sık ve en pahalı hata, modelin eğitim sırasında görmemesi gereken bilgiye erişmesidir: **veri sızıntısı**. Sızıntının bedeli laboratuvarda değil, üretimde ödenir.

## Sızıntı nedir

Sızıntı, tahmin anında gerçekte elinizde olmayacak bir bilginin eğitim verisine karışmasıdır. Model bu bilgiyi bulur, kullanır ve sınavda çok yüksek not alır — çünkü sınav sorularını önceden görmüştür. Üretimde o bilgi olmadığında performans çöker.

<div class="callout"><strong>Erken uyarı:</strong> Bir özelliği çıkardığınızda skor dramatik biçimde düşüyorsa, o özelliğin hedefle nasıl ilişkilendiğini iyice inceleyin. Fazla iyi özellikler genellikle sızıntıdır.</div>

## Zaman sızıntısı

Zaman içeren her problemde en yaygın hata, veriyi rastgele bölmektir. Rastgele bölme, geleceğe ait örneklerin eğitim kümesine düşmesine izin verir; model geçmişi tahmin etmek için geleceği kullanır.

Doğrusu zamana göre bölmektir: belirli bir tarihten öncesi eğitim, sonrası test. Çapraz doğrulama gerekiyorsa ileri yönlü kayan pencere (walk-forward) kullanılır — her katman yalnızca kendinden önceki veriyle eğitilir.

## Grup sızıntısı

Aynı hastanın farklı ölçümleri, aynı kullanıcının farklı oturumları ya da aynı belgeden çıkarılmış farklı paragraflar birbirinden bağımsız değildir. Bunlar eğitim ve test kümesine dağılırsa, model kişiyi ya da belgeyi tanır, deseni değil.

Çözüm gruba göre bölmektir: bir grubun tüm kayıtları ya eğitimde ya testte olur, ikisinde birden asla.

## Ön işleme sızıntısı

Bu en sinsi olanıdır. Ölçekleme, eksik değer doldurma ya da özellik seçimi tüm veri üzerinde _bölmeden önce_ yapılırsa, test kümesinin istatistikleri eğitime karışır. Ortalama ve standart sapma bile bir sızıntı kanalıdır.

Doğru yöntem, her adımı bir işlem hattına (pipeline) koymak ve hattı yalnızca eğitim katmanına uydurmaktır. Böylece her katmanda ön işleme yeniden ve yalnızca eğitim verisiyle hesaplanır.

## Doğru şemayı seçmek

| Veri yapısı | Uygun şema |
| --- | --- |
| Bağımsız örnekler, dengeli | K-katlı |
| Bağımsız örnekler, dengesiz | Tabakalı K-katlı |
| Tekrarlayan birimler (hasta, kullanıcı) | Gruba göre K-katlı |
| Zaman serisi | İleri yönlü kayan pencere |
| Çok küçük veri | Tekrarlı K-katlı |

## Sık sorulanlar

<div class="faq"><details><summary>Sızıntıyı nasıl fark ederim?</summary><p>Beklenmedik yükseklikte skor, tek bir özelliğin aşırı baskın olması ve üretimde ani performans düşüşü en güçlü işaretlerdir. Özellik önemlerini mutlaka inceleyin.</p></details><details><summary>Hiperparametre seçimi de sızıntı yaratır mı?</summary><p>Evet. Aynı kümede hem model seçip hem performans raporlarsanız, o skor iyimserdir. Ayrı bir kilitli test kümesi ya da iç içe çapraz doğrulama gerekir.</p></details><details><summary>Test kümesine kaç kez bakabilirim?</summary><p>İdeal olarak bir kez. Her bakış, kararlarınızı o kümeye uydurur ve skorun tarafsızlığını azaltır.</p></details></div>

---

Sızıntı, kötü modelleri iyi gösteren sessiz bir hatadır ve yalnızca dikkatli bir bölme disipliniyle önlenir. İlgili konular için [özellik mühendisliği](/posts/ozellik-muhendisligi/) ve [sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/) yazılarına göz atabilirsiniz.
