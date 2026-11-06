---
title: "Öneri Sistemleri: İşbirlikçi Filtreleme, İçerik Tabanlı Yaklaşım ve Soğuk Başlangıç"
description: "Öneri sistemleri iki temel fikre dayanır: benzer kullanıcılar ve benzer içerikler. İşbirlikçi filtreleme, içerik tabanlı yaklaşım, hibrit mimariler, soğuk başlangıç ve çeşitlilik dengesi."
publishDate: "2026-08-09T23:52:00+03:00"
lang: tr
category: "Yöntem"
tags: ["Yöntem", "Yapay Zeka"]
translation: "recommender-systems"
heroImage:
  src: "../../../assets/blog/covers/oneri-sistemleri.jpg"
  alt: "Öneri Sistemleri: İşbirlikçi Filtreleme, İçerik Tabanlı Yaklaşım ve Soğuk Başlangıç"
---

Bir öneri sistemi, aslında çok basit bir soruyu ölçekte cevaplar: _bu kişi bundan sonra neyle ilgilenir?_ Cevabın iki klasik kaynağı vardır — benzer davranan başka kullanıcılar ve benzer özellik taşıyan başka içerikler. Modern sistemler bu ikisini birleştirir.

## İşbirlikçi filtreleme

Temel sezgi şudur: sizinle benzer şeyleri beğenmiş kişilerin beğendiği ama sizin henüz görmediğiniz şeyler, muhtemelen size de uyar. Bunu yapmak için kullanıcı-ürün etkileşim matrisi kurulur ve bu seyrek matris düşük boyutlu iki matrise ayrıştırılır. Her kullanıcı ve her ürün bir vektörle temsil edilir; tahmin, iki vektörün iç çarpımıdır.

Gücü, içerik hakkında hiçbir şey bilmeden çalışmasıdır. Zayıflığı ise yeni kullanıcı ve yeni ürünlerde hiçbir şey söyleyememesidir.

## İçerik tabanlı yaklaşım

Burada ürünlerin kendi özellikleri kullanılır: metin, kategori, etiketler, görsel. Kullanıcının geçmişte etkileşime girdiği ürünlerin özellik profili çıkarılır ve benzer profildeki ürünler önerilir. [Embedding modelleri](/posts/embedding-semantik-benzerlik/) bu benzerliği ölçmenin bugünkü standart yoludur.

Yeni ürünlerde iyi çalışır, ama kullanıcıyı kendi geçmişine hapsetme eğilimindedir: filtre balonu tam olarak buradan doğar.

<div class="callout"><strong>Pratikte:</strong> Büyük sistemler iki aşamalıdır. Önce milyonlarca aday hızlıca birkaç yüze indirilir (aday üretimi), sonra pahalı bir model bu küçük kümeyi sıralar (yeniden sıralama). Bu ayrım, gecikme bütçesini korumanın anahtarıdır.</div>

## Hibrit ve iki aşamalı mimari

| Yaklaşım | Yeni kullanıcı | Yeni ürün | Sürpriz |
| --- | --- | --- | --- |
| İşbirlikçi | Zayıf | Zayıf | Yüksek |
| İçerik tabanlı | Zayıf | Güçlü | Düşük |
| Hibrit | İyi | İyi | Dengeli |

## Soğuk başlangıç

Sistem, hakkında hiçbir sinyal olmayan bir kullanıcıya ne önermeli? Pratik çözümler basittir ve iyi çalışır: popüler içerikle başlamak, kayıt sırasında birkaç tercih sormak, cihaz ve konum gibi bağlamsal ipuçlarını kullanmak, ve ilk oturumda keşfe ağırlık verip hızla öğrenmek.

## Doğruluk yetmez: çeşitlilik

Yalnızca tıklama olasılığını en üst düzeye çıkaran bir sistem, kısa vadede iyi görünür ama zamanla daralır: aynı türden içerikleri tekrar tekrar gösterir, kullanıcı sıkılır ve keşif durur. Bu yüzden üretim sistemleri doğruluğun yanına üç ölçüt daha koyar — çeşitlilik, yenilik ve kapsam.

Ayrıca _geri besleme döngüsü_ riski vardır: sistem neyi gösterirse onun verisi birikir, o veri de sistemi aynı yöne iter. Bu döngüyü kırmak için bilinçli keşif (exploration) gerekir.

## Sık sorulanlar

<div class="faq"><details><summary>Çevrimdışı metrikler yeterli mi?</summary><p>Hayır. Çevrimdışı sıralama metrikleri yön verir ama gerçek karar A/B testiyle alınır. Çevrimdışı iyi görünen birçok değişiklik canlıda kaybeder.</p></details><details><summary>Örtük geri bildirim mi, açık puan mı?</summary><p>Örtük sinyaller (tıklama, izleme süresi) çok daha boldur ve pratikte daha kullanışlıdır. Ama "tıkladı" ile "beğendi" aynı şey değildir; bunu modele yansıtmak gerekir.</p></details><details><summary>Gizlilik açısından nelere dikkat etmeli?</summary><p>Davranış verisi kişiseldir. Amaç sınırlaması, saklama süresi ve kullanıcıya görünürlük şarttır; öneri açıklanabilirliği burada güven kazandırır.</p></details></div>

---

İyi bir öneri sistemi, doğruluğu yüksek olan değil; kullanıcıyı zaman içinde genişleten sistemdir. Devamı için [reranking ve hibrit arama](/posts/reranking-hibrit-arama/) ile [embedding modelleri](/posts/embedding-semantik-benzerlik/) yazılarına bakabilirsiniz.
