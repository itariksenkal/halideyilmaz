---
title: "Aktif Öğrenme: Etiketleme Bütçesini En Değerli Örneklere Harcamak"
description: "Her örneği etiketlemek pahalıdır. Aktif öğrenme, modelin en çok kararsız kaldığı örnekleri seçerek aynı bütçeyle daha yüksek doğruluk elde etmeyi sağlar. Belirsizlik örneklemesi, çeşitlilik ve soğuk başlangıç sorunu."
publishDate: "2026-08-09T23:57:00+03:00"
lang: tr
category: "Veri"
tags: ["Veri", "Yapay Zeka"]
translation: "active-learning"
heroImage:
  src: "../../../assets/blog/covers/aktif-ogrenme.jpg"
  alt: "Aktif Öğrenme: Etiketleme Bütçesini En Değerli Örneklere Harcamak"
---

Etiketleme, makine öğrenmesinin en pahalı ve en yavaş adımıdır. Yüz bin örneğin tamamını etiketletmek çoğu ekip için mümkün değildir. **Aktif öğrenme** bu kısıtı tersine çevirir: hangi örneklerin etiketleneceğine modelin kendisi karar verir ve en çok öğrenebileceği örnekleri ister. Sonuç, aynı bütçeyle belirgin biçimde daha iyi bir model olabilir.

## Temel fikir

Klasik yaklaşımda önce veri etiketlenir, sonra model eğitilir. Aktif öğrenmede döngü kurulur: küçük bir çekirdek kümeyle model eğitilir, model etiketsiz havuzu tarar, en bilgilendirici bulduğu örnekleri seçer, bunlar etiketlenir ve model yeniden eğitilir.

Bir öğrenciyi düşünün. Bildiği soruları tekrar çözmek zaman kaybıdır; asıl kazanç, tam olarak kararsız kaldığı sorularda yatar. Aktif öğrenme modele bu soruları sordurur.

<div class="callout"><strong>Neden işe yarar:</strong> Veri kümelerinin çoğu fazlalıklıdır. Birbirinin neredeyse aynısı olan binlerce örnek, modele ilk örnekten sonra neredeyse hiçbir şey katmaz.</div>

## Belirsizlik örneklemesi

En yaygın seçim ölçütü belirsizliktir. Model bir örneğe yüzde elli olasılık veriyorsa, o örnek karar sınırının tam üzerindedir ve etiketi çok şey öğretir. Pratikte üç ölçüt kullanılır:

-   **En düşük güven:** En yüksek olasılığın en küçük olduğu örnekler.
-   **Marj:** İlk iki sınıf arasındaki farkın en küçük olduğu örnekler.
-   **Entropi:** Olasılık dağılımının en dağınık olduğu örnekler.

## Çeşitlilik neden gerekli

Yalnızca belirsizliğe bakmak bir tuzak barındırır: model aynı zor bölgeden birbirine çok benzeyen yüz örnek seçebilir. Etiketleme bütçesi harcanır ama öğrenilen şey tek bir dar durumdur.

Bu yüzden seçim genellikle belirsizlik ve çeşitliliği birlikte kullanır: önce belirsiz örnekler bulunur, sonra bunlar embedding uzayında kümelenip her kümeden temsilci alınır. Böylece hem zor hem de birbirinden farklı örnekler etiketlenir.

## Soğuk başlangıç sorunu

Aktif öğrenmenin çalışması için ortada bir model olması gerekir; ama başta model yoktur. Bu kısır döngü, ilk turda rastgele ya da çeşitliliğe dayalı bir seçimle kırılır. Yeterince iyi bir çekirdek küme oluştuktan sonra belirsizliğe geçilir.

## Ne zaman işe yaramaz

| Durum | Aktif öğrenme |
| --- | --- |
| Etiketleme ucuz ve otomatik | Gereksiz karmaşıklık |
| Etiketleme pahalı, uzman gerektiriyor | Yüksek kazanç |
| Veri çok gürültülü | Belirsizlik gürültüyü seçer |
| Sınıflar çok dengesiz | Nadir sınıfı bulmaya yardım eder |

Özellikle dikkat edilmesi gereken nokta gürültüdür: belirsizlik ölçütü, zor örnekle bozuk örneği ayırt edemez. Etiketlenemeyecek kadar bozuk kayıtlar havuzu kirletiyorsa, aktif öğrenme bütçeyi çöpe harcar.

## Sık sorulanlar

<div class="faq"><details><summary>Kaç turda bir yeniden eğitmeliyim?</summary><p>Model eğitimi ucuzsa her turda; pahalıysa daha büyük gruplar hâlinde. Grup büyüdükçe seçimlerin birbirini tekrar etme riski artar, bu yüzden çeşitlilik daha da önemli hâle gelir.</p></details><details><summary>Değerlendirme kümesini nasıl kurarım?</summary><p>Değerlendirme kümesi <em>rastgele</em> seçilmelidir. Aktif öğrenmeyle seçilmiş örneklerden test kümesi kurmak, gerçek dağılımı temsil etmez ve sonucu bozar.</p></details><details><summary>LLM etiketlemesiyle birlikte kullanılabilir mi?</summary><p>Evet ve bu yaygınlaşıyor. Model kolay örnekleri otomatik etiketler, yalnızca kararsız kaldıklarını insana yönlendirir. İnsan zamanı en pahalı kaynaktır ve tam da oraya harcanır.</p></details></div>

---

Aktif öğrenme, "daha çok veri" yerine "daha doğru veri" diyen bir stratejidir. Etiketleme maliyetinin yüksek olduğu her alanda doğrudan karşılığı vardır. Devamı için [veri kalitesi ve etiketleme](/posts/veri-kalitesi-etiketleme/) ile [veri merkezli yapay zeka](/posts/veri-merkezli-yapay-zeka/) yazılarına bakabilirsiniz.
