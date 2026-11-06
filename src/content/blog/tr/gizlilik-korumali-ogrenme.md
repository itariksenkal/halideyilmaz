---
title: "Gizlilik Korumalı Öğrenme: Federated Learning ve Diferansiyel Gizlilik"
description: "Veriyi merkezde toplamadan model eğitmek mümkündür. Federated learning, diferansiyel gizlilik, gizlilik bütçesi ve bu yöntemlerin gerçekte neyi garanti ettiği sezgisel örneklerle anlatılıyor."
publishDate: "2026-08-09T23:51:00+03:00"
lang: tr
category: "Gizlilik"
tags: ["Gizlilik", "Yapay Zeka"]
translation: "privacy-preserving-learning"
heroImage:
  src: "../../../assets/blog/covers/gizlilik-korumali-ogrenme.jpg"
  alt: "Gizlilik Korumalı Öğrenme: Federated Learning ve Diferansiyel Gizlilik"
---

Makine öğrenmesinin klasik varsayımı, tüm veriyi tek bir yerde toplayabildiğinizdir. Sağlık, finans ve hukuk gibi alanlarda bu varsayım çoğu zaman geçersizdir. **Gizlilik korumalı öğrenme**, veriyi taşımadan ya da bireyi ifşa etmeden öğrenmenin yollarını sunar.

## Federated learning

Fikir tersine çevirmedir: veriyi modele götürmek yerine modeli veriye götürün. Merkezî sunucu modeli cihazlara ya da kurumlara dağıtır; her taraf kendi verisiyle yerel olarak eğitir ve yalnızca model güncellemelerini geri gönderir. Sunucu bu güncellemeleri birleştirir ve yeni bir sürüm yayınlar.

Ham veri hiçbir zaman ayrılmaz. Bu, hem düzenleyici hem de pratik açıdan büyük bir kolaylıktır.

## Gradyanlar da sızdırır

Yaygın bir yanılgı, "ham veri gitmiyorsa gizlilik sağlandı" sanmaktır. Oysa model güncellemeleri, eğitim verisi hakkında şaşırtıcı miktarda bilgi taşıyabilir; belirli koşullarda örnekleri yeniden inşa etmek mümkündür. Bu yüzden federated learning tek başına bir gizlilik garantisi değildir.

<div class="callout"><strong>Doğru okuma:</strong> Federated learning veriyi <em>yerinde tutar</em>; diferansiyel gizlilik ise <em>bireyin katkısını gizler</em>. İkisi farklı sorunları çözer ve genellikle birlikte kullanılır.</div>

## Diferansiyel gizlilik

Diferansiyel gizlilik matematiksel bir tanımdır: bir kişinin verisi kümeye eklendiğinde ya da çıkarıldığında, çıktının dağılımı belirgin biçimde değişmemelidir. Pratikte bu, hesaplamaya dikkatle ayarlanmış gürültü eklemekle sağlanır.

Güçlü yanı, saldırganın ne bildiğinden bağımsız bir güvence vermesidir. Bedeli ise doğruluktur: gürültü arttıkça gizlilik artar, kullanışlılık azalır.

## Gizlilik bütçesi

Bu dengeyi epsilon adı verilen bir parametre yönetir. Küçük epsilon güçlü gizlilik ve düşük doğruluk; büyük epsilon tersi demektir. Kritik nokta, bütçenin _birikmesidir_: aynı veri üzerinde yapılan her sorgu bütçeden harcar. Sınırsız sorgu, gizliliği sıfırlar.

## Hangi yöntem ne zaman

| Yöntem | Neyi çözer | Bedeli |
| --- | --- | --- |
| Federated learning | Veri merkezde toplanmaz | İletişim ve koordinasyon |
| Diferansiyel gizlilik | Birey ifşa olmaz | Doğruluk kaybı |
| Anonimleştirme | Doğrudan tanımlayıcılar silinir | Yeniden tanımlama riski |
| Sentetik veri | Paylaşılabilir kopya | Ezber ve sızıntı riski |

## Sık sorulanlar

<div class="faq"><details><summary>Anonimleştirme yeterli değil mi?</summary><p>Genellikle değil. Birkaç görünüşte zararsız alanın birleşimi kişiyi yeniden tanımlayabilir. Bu, defalarca gösterilmiş bir zayıflıktır.</p></details><details><summary>Federated learning her zaman daha yavaş mıdır?</summary><p>Genellikle evet; iletişim maliyeti ve cihazlar arası veri dengesizliği yakınsamayı zorlaştırır. Buna karşılık veriyi taşımanın hukuki maliyetini ortadan kaldırır.</p></details><details><summary>Bu yöntemler KVKK uyumu sağlar mı?</summary><p>Tek başına hiçbir teknik yöntem uyum sağlamaz. Hukuki dayanak, amaç sınırlaması ve saydamlık ayrıca gereklidir; bu yöntemler bunları destekler, yerine geçmez.</p></details></div>

---

Gizlilik, modele sonradan eklenen bir özellik değil, mimari bir kısıttır. Erken düşünüldüğünde ucuz, sonradan eklendiğinde çok pahalıdır. Devamı için [sentetik veri üretimi](/posts/sentetik-veri/) yazısına bakabilirsiniz.
