---
title: "Anomali Tespiti: Etiket Olmadan Aykırıyı Bulmak"
description: "Anomali tespitinde genellikle etiket yoktur ve pozitif örnek çok azdır. İstatistiksel yöntemler, Isolation Forest, otokodlayıcılar ve eşik seçimi ile sahte alarmı nasıl yönetirsiniz?"
publishDate: "2026-08-09T23:54:00+03:00"
lang: tr
category: "Yöntem"
tags: ["Yöntem", "Yapay Zeka"]
translation: "anomaly-detection"
heroImage:
  src: "../../../assets/blog/bimg-06.jpg"
  alt: "Anomali Tespiti: Etiket Olmadan Aykırıyı Bulmak"
---

Anomali tespiti, sınıflandırmaya benzer ama kritik bir farkı vardır: aradığınız şeyin örneği neredeyse yoktur. Bir fabrikada arıza nadirdir, bir ağda saldırı seyrektir, bir hesapta dolandırıcılık istisnadır. Bu yüzden problem çoğu zaman "iki sınıfı ayırmak" değil, **normali öğrenip dışına çıkanı işaretlemek**tir.

## Üç problem tipi

-   **Nokta anomalisi:** Tek bir kayıt aykırıdır. Olağandışı büyüklükte bir işlem gibi.
-   **Bağlamsal anomali:** Değer tek başına normaldir ama bağlamında değildir. Gece üçte yapılan rutin bir işlem gibi.
-   **Toplu anomali:** Tek tek kayıtlar normaldir, ama dizilim anormaldir. Küçük tutarlı yüzlerce transfer gibi.

Hangi tipi aradığınızı bilmeden yöntem seçilemez; çoğu başarısızlık bu adımın atlanmasından doğar.

## İstatistiksel temel

En basit yaklaşım dağılıma dayanır: ortalamadan üç standart sapma uzaktaki değerleri işaretlemek. Tek değişkenli ve yaklaşık normal dağılan veride şaşırtıcı derecede iyi çalışır. Çarpık dağılımlarda ise çeyrekler arası aralık (IQR) daha güvenilirdir çünkü aykırı değerlerden daha az etkilenir.

<div class="callout"><strong>Başlangıç kuralı:</strong> Karmaşık bir modele geçmeden önce basit istatistiksel bir taban çizgisi kurun. Çoğu üretim sisteminde bu taban çizgi, karmaşık modellerin büyük kısmını yakalar.</div>

## Isolation Forest

Fikir zariftir: rastgele bölmelerle veriyi parçalayın. Aykırı bir nokta, kalabalıktan uzakta olduğu için birkaç bölmede yalnız kalır; normal noktalar ise ayrılmak için çok sayıda bölme gerektirir. Bir noktayı izole etmek için gereken ortalama bölme sayısı doğrudan anomali skoruna dönüşür.

Yüksek boyutlu veride hızlıdır, ölçekleme gerektirmez ve etiket istemez. Çok modlu (birden fazla normal desenin olduğu) verilerde ise zorlanabilir.

## Otokodlayıcılar

Bir otokodlayıcı, girdiyi sıkıştırıp yeniden kurmayı öğrenir. Yalnızca normal veriyle eğitilirse, normal örnekleri iyi yeniden kurar; anormal bir örnek geldiğinde yeniden kurma hatası yükselir. Bu hata, anomali skorudur.

Görüntü, sinyal ve yüksek boyutlu telemetri verisinde güçlüdür. Bedeli, eğitim için temiz bir "normal" kümesi gerekmesidir — eğitim verisine anomali karışırsa model onları da normal saymayı öğrenir.

## Eşik ve sahte alarm

| Yöntem | Etiket | Güçlü olduğu yer |
| --- | --- | --- |
| İstatistiksel | Gerekmez | Tek değişkenli, açıklanabilir |
| Isolation Forest | Gerekmez | Yüksek boyut, hız |
| Otokodlayıcı | Temiz normal küme | Karmaşık desenler |
| Denetimli | Etiket şart | Bilinen arıza tipleri |

Her yöntem sonuçta bir skor üretir; asıl karar eşiktedir. Eşik teknik değil operasyonel bir seçimdir: ekibin günde kaç alarmı gerçekten inceleyebileceğine bağlıdır. İncelenemeyen alarm, alarm değildir.

## Sık sorulanlar

<div class="faq"><details><summary>Etiketim varsa yine de anomali tespiti mi kullanmalıyım?</summary><p>Yeterli sayıda pozitif örnek varsa denetimli sınıflandırma genellikle daha iyidir. Anomali tespiti, bilinmeyen ve daha önce görülmemiş arıza tiplerinde üstündür.</p></details><details><summary>Mevsimsellik alarmı bozar mı?</summary><p>Evet. Hafta sonu düşen trafik anomali değildir. Mevsimselliği modelden çıkarmak ya da bağlamı özellik olarak vermek gerekir.</p></details><details><summary>Sistemi nasıl değerlendiririm?</summary><p>İncelenen alarmların ne kadarının gerçek çıktığını ve bilinen olayların ne kadarının yakalandığını izleyin. Doğruluk burada anlamsızdır.</p></details></div>

---

Anomali tespiti, "normal nedir?" sorusuna verilen işlevsel bir cevaptır ve o tanım zamanla değişir. Bu yüzden izleme ve yeniden kalibrasyon şarttır. Devamı için [model izleme ve veri kayması](/posts/model-izleme-drift/) ile [sınıf dengesizliği](/posts/sinif-dengesizligi/) yazılarına bakabilirsiniz.
