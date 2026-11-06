---
title: "Model Kartları ve Yapay Zekâ Yönetişimi: Bir Modeli Belgelemek"
description: "Model kartı, bir modelin ne yaptığını, nerede çalışmadığını ve hangi veriyle eğitildiğini kayda geçirir. Yönetişim, denetlenebilirlik ve risk sınıflandırmasına pratik bir bakış."
publishDate: "2026-08-09T23:50:00+03:00"
lang: tr
category: "Yönetişim"
tags: ["Yönetişim", "Yapay Zeka"]
translation: "model-cards-governance"
heroImage:
  src: "../../../assets/blog/bimg-10.jpg"
  alt: "Model Kartları ve Yapay Zekâ Yönetişimi: Bir Modeli Belgelemek"
---

Bir model üretime alındığında artık yalnızca bir yazılım bileşeni değil, karar veren bir sistemdir. Kim sorumlu, hangi veriyle eğitildi, nerede çalışmıyor ve ne zaman yeniden değerlendirilecek? **Model kartı** bu soruların cevabını tek bir belgede tutar.

## Model kartı nedir

Model kartı, bir modelin kısa ve standart bir künyesidir. Amacı, modeli kullanacak ya da denetleyecek kişinin, kaynak koda bakmadan temel soruları cevaplayabilmesidir. Bir ilaç prospektüsüne benzer: ne için, kimin için, hangi koşulda ve hangi yan etkiyle.

## İyi bir kartta ne bulunur

-   **Amaç:** Model neyi tahmin ediyor ve hangi kararı besliyor.
-   **Kapsam dışı kullanım:** Hangi amaçla kullanılmamalı.
-   **Eğitim verisi:** Kaynak, dönem, boyut, bilinen boşluklar.
-   **Performans:** Genel metrikler _ve_ alt gruplara göre kırılım.
-   **Sınırlar:** Bilinen zayıflıklar ve başarısızlık örnekleri.
-   **Sorumluluk:** Sahibi kim, ne sıklıkla gözden geçirilecek.

<div class="callout"><strong>En değerli bölüm:</strong> Genellikle "kapsam dışı kullanım" başlığıdır. Bir modelin nerede kullanılmaması gerektiğini yazmak, nerede kullanılabileceğini yazmaktan daha çok yanlış kullanımı önler.</div>

## Sınırları yazmak

Kartın işe yarayıp yaramadığı burada anlaşılır. "Model bazı durumlarda hata yapabilir" cümlesi hiçbir şey söylemez. İşe yarayan cümle somuttur: hangi dilimde, ne ölçüde ve neden. Alt grup kırılımı olmayan bir performans bölümü, kartın en zayıf halkasıdır.

## Risk temelli yaklaşım

| Risk düzeyi | Örnek | Beklenen belge |
| --- | --- | --- |
| Düşük | İçerik etiketleme | Kısa kart, temel metrikler |
| Orta | Öneri, sıralama | Alt grup analizi, izleme planı |
| Yüksek | Kredi, sağlık, hukuk | Tam kart, insan denetimi, itiraz yolu |

Belgelemenin derinliği, modelin verdiği kararın insan üzerindeki etkisiyle orantılı olmalıdır. Aynı şablonu her modele aynı yoğunlukta uygulamak, ya gereksiz yük ya da yetersiz denetim üretir.

## Belge yaşayan bir şeydir

Model kartı, yayın anında yazılıp unutulan bir dosya olursa değerini hızla yitirir. Veri kayması, yeniden eğitim ve eşik değişiklikleri kartı geçersiz kılar. Kartın sürüm numarası, model sürümüyle birlikte ilerlemelidir.

## Sık sorulanlar

<div class="faq"><details><summary>Küçük bir ekip için fazla mı ağır?</summary><p>Hayır. Tek sayfalık bir kart bile büyük fayda sağlar. Ağır olan, kartı yazmak değil; kart olmadığında sonradan yapılan arkeolojidir.</p></details><details><summary>Kim yazmalı?</summary><p>Modeli geliştiren ekip yazar, ama kullanan taraf gözden geçirmelidir. Anlaşılmayan bir kart, yazılmamış sayılır.</p></details><details><summary>Üçüncü taraf modeller için de gerekli mi?</summary><p>Evet, hatta daha çok. Dışarıdan aldığınız bir modelin sınırlarını bilmiyorsanız, sorumluluğu yine siz taşırsınız.</p></details></div>

---

Yönetişim, yeniliği yavaşlatan bir bürokrasi değil; modeli üretimde savunulabilir kılan asgari disiplindir. Devamı için [model izleme](/posts/model-izleme-drift/) ve [önyargı ve adalet](/posts/onyargi-ve-adalet/) yazılarına bakabilirsiniz.
