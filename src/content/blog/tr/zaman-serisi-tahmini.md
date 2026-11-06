---
title: "Zaman Serisi Tahmini: Trend, Mevsimsellik ve Doğru Doğrulama"
description: "Zaman serisi problemleri klasik makine öğrenmesinden farklı kurallara tabidir. Trend, mevsimsellik, durağanlık, taban çizgileri ve ileri yönlü doğrulama pratik örneklerle anlatılıyor."
publishDate: "2026-08-09T23:53:00+03:00"
lang: tr
category: "Yöntem"
tags: ["Yöntem", "Yapay Zeka"]
translation: "time-series-forecasting"
heroImage:
  src: "../../../assets/blog/bimg-07.jpg"
  alt: "Zaman Serisi Tahmini: Trend, Mevsimsellik ve Doğru Doğrulama"
---

Zaman serisi tahmini, makine öğrenmesinin alışkanlıkların en çok yanılttığı alanıdır. Veriyi karıştıramazsınız, geleceği eğitimde kullanamazsınız ve gözlemler birbirinden bağımsız değildir. Bu üç kısıt, tüm iş akışını değiştirir.

## Bir seriyi oluşturan bileşenler

Çoğu seri üç parçaya ayrılabilir: uzun vadeli **trend**, tekrar eden **mevsimsellik** ve açıklanamayan **artık**. Bu ayrıştırma, modellemeden önce yapılması gereken ilk iştir; çünkü hangi bileşenin baskın olduğunu görmek yöntem seçimini belirler.

Bir seride birden fazla mevsimsellik olabilir: günlük, haftalık ve yıllık desenler aynı anda bulunabilir. Perakende satışlarında üçü de vardır.

## Durağanlık

Klasik istatistiksel yöntemlerin çoğu, serinin istatistiklerinin zamanla değişmediğini varsayar. Trend ya da değişen oynaklık bu varsayımı bozar. Fark alma (differencing) ve logaritmik dönüşüm en yaygın düzeltmelerdir.

<div class="callout"><strong>Dikkat:</strong> Ağaç tabanlı modeller trendi doğrudan öğrenemez; gördükleri aralığın dışına çıkamazlar. Yükselen bir trend varsa ya fark alın ya da trendi ayrı modelleyin.</div>

## Taban çizgileri ciddiye alın

Zaman serisinde iki taban çizgisi şaşırtıcı derecede güçlüdür:

-   **Naif:** Yarın bugünle aynı olacak.
-   **Mevsimsel naif:** Bu salı, geçen salıyla aynı olacak.

Karmaşık bir model bu ikisini net biçimde geçemiyorsa, karmaşıklığın bedeli boşuna ödeniyor demektir. Birçok projede bu karşılaştırma hiç yapılmaz ve sonuç fazla iyimser yorumlanır.

## Doğru doğrulama

Rastgele K-katlı çapraz doğrulama burada geçersizdir; geleceği eğitime sokar. Doğru yaklaşım ileri yönlü doğrulamadır: her katman yalnızca kendinden önceki veriyle eğitilir, sonraki pencerede test edilir ve pencere ileri kaydırılır.

Ayrıca tahmin ufkunu gerçek kullanımla eşleştirin. Bir gün sonrasını tahmin etmekle otuz gün sonrasını tahmin etmek çok farklı problemlerdir ve aynı modelle ölçülmemelidir.

## Hangi metrik

| Metrik | Avantaj | Zayıflık |
| --- | --- | --- |
| MAE | Yorumlanabilir, sağlam | Büyük hatayı cezalandırmaz |
| RMSE | Büyük hataya duyarlı | Aykırı değerlere hassas |
| MAPE | Yüzde olarak karşılaştırılabilir | Sıfıra yakın değerlerde patlar |
| MASE | Naif tabana göre ölçekli | Daha az bilinir |

## Sık sorulanlar

<div class="faq"><details><summary>Derin öğrenme klasik yöntemleri geçer mi?</summary><p>Çok sayıda ilişkili seri varsa evet, genellikle geçer. Tek ve kısa bir seride klasik yöntemler hâlâ çok rekabetçidir.</p></details><details><summary>Tatiller ve kampanyalar nasıl ele alınır?</summary><p>Takvim etkilerini açık özellik olarak verin. Modelin bunları veriden çıkarmasını beklemek, özellikle kısa serilerde gerçekçi değildir.</p></details><details><summary>Nokta tahmini yeterli mi?</summary><p>Çoğu karar için değil. Tahmin aralığı verin; stok, kapasite ve risk kararları belirsizliğin büyüklüğüne bağlıdır.</p></details></div>

---

Zaman serisinde en sık yapılan hata teknik değil yöntemseldir: yanlış bölme, eksik taban çizgisi ve gerçek kullanımla eşleşmeyen ufuk. Devamı için [veri sızıntısı ve çapraz doğrulama](/posts/veri-sizintisi-capraz-dogrulama/) yazısına bakabilirsiniz.
