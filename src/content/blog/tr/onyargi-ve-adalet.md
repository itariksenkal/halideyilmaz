---
title: "Yapay Zekâda Önyargı ve Adalet: Model Neden Ayrımcılık Yapar?"
description: "Önyargı modelden değil, çoğu zaman veriden ve problem tanımından gelir. Tarihsel önyargı, temsil dengesizliği, adalet ölçütleri ve bunların birbiriyle çelişmesi sezgisel örneklerle anlatılıyor."
publishDate: "2026-08-09T23:55:00+03:00"
lang: tr
category: "Etik"
tags: ["Etik", "Yapay Zeka"]
translation: "bias-and-fairness"
heroImage:
  src: "../../../assets/blog/bimg-05.jpg"
  alt: "Yapay Zekâda Önyargı ve Adalet: Model Neden Ayrımcılık Yapar?"
---

Bir model kötü niyetli değildir; yalnızca gösterdiğiniz dünyayı öğrenir. Eğer o dünya taraflıysa, model tarafı öğrenir ve üstelik ölçeklendirir. **Önyargı** bu yüzden teknik olduğu kadar tanımsal bir sorundur: neyi tahmin ettiğinize ve hangi veriyle öğrettiğinize bağlıdır.

## Önyargı nereden gelir

-   **Tarihsel önyargı:** Veri geçmişteki kararları yansıtır. Geçmişte taraflı kararlar verildiyse, veri de taraflıdır.
-   **Temsil önyargısı:** Bazı gruplar veri kümesinde çok az temsil edilir; model onlar için daha kötü çalışır.
-   **Ölçüm önyargısı:** Hedef değişken gerçekte ölçmek istediğiniz şey değildir. "Suç" yerine "yakalanma" ölçülüyorsa, model devriye yoğunluğunu öğrenir.
-   **Toplama önyargısı:** Farklı gruplar tek bir modele sıkıştırılır ve hiçbirine iyi uymaz.

<div class="callout"><strong>Kritik ayrım:</strong> Hassas özelliği veriden çıkarmak önyargıyı çözmez. Model onu posta kodundan, isimden ya da alışveriş geçmişinden yeniden inşa edebilir.</div>

## Vekil değişken tuzağı

Cinsiyet ya da etnik köken sütununu silmek yeterli değildir çünkü diğer değişkenler bu bilgiyi dolaylı taşır. Buna vekil değişken denir. Gerçek çözüm, hassas özelliği _ölçmek ve izlemek_tir — silmek değil. Ölçemediğiniz bir eşitsizliği düzeltemezsiniz.

## Adalet ölçütleri

| Ölçüt | Ne ister |
| --- | --- |
| Demografik denklik | Pozitif tahmin oranı gruplar arasında eşit olsun |
| Fırsat eşitliği | Gerçek pozitifleri yakalama oranı eşit olsun |
| Olasılık denkliği | Hem doğru hem yanlış pozitif oranları eşit olsun |
| Kalibrasyon | Aynı skor, her grupta aynı gerçek olasılığa karşılık gelsin |

## Ölçütler neden çelişir

Bu ölçütler aynı anda sağlanamaz. Taban oranlar gruplar arasında farklıysa, kalibrasyon ile olasılık denkliği matematiksel olarak birlikte gerçekleşemez. Bu bir mühendislik eksikliği değil, kanıtlanmış bir imkânsızlıktır.

Sonuç: "adil model" diye tek bir tanım yoktur. Hangi adalet tanımını seçtiğiniz, alanınıza ve hangi hatanın kime zarar verdiğine bağlı bir _değer kararıdır_ ve açıkça yazılmalıdır.

## Pratikte ne yapılır

1.  Hassas grupları belirleyin ve performansı grup bazında ayrı ayrı ölçün.
2.  Toplam metriğe değil, en kötü performans gösteren gruba bakın.
3.  Temsil boşluklarını hedefli veri toplayarak kapatın.
4.  Seçtiğiniz adalet tanımını ve gerekçesini belgeleyin.
5.  Üretimde grup bazlı izlemeyi sürdürün; dağılım kayarsa adalet de kayar.

## Sık sorulanlar

<div class="faq"><details><summary>Model önyargılı mı, veri mi?</summary><p>Neredeyse her zaman veri ve problem tanımı. Model yalnızca gördüğü ilişkileri güçlendirir.</p></details><details><summary>Hassas veriyi toplamak KVKK açısından sorun değil mi?</summary><p>Adalet denetimi meşru bir amaçtır, ama ayrı bir hukuki değerlendirme, açık amaç sınırlaması ve erişim kontrolü gerektirir. Denetim için toplanan veri, model girdisi olarak kullanılmamalıdır.</p></details><details><summary>Küçük gruplarda nasıl ölçerim?</summary><p>Güven aralıklarıyla. Küçük örneklemde grup farkları gürültüden ayırt edilemez; belirsizliği raporlamadan sonuç çıkarmayın.</p></details></div>

---

Adalet, modele sonradan eklenen bir filtre değil, problem tanımıyla başlayan bir tasarım kararıdır. İlgili konular için [model yorumlanabilirliği](/posts/model-yorumlanabilirligi/) ve [veri kalitesi](/posts/veri-kalitesi-etiketleme/) yazılarına bakabilirsiniz.
