---
title: "Veri Kalitesi ve Etiketleme: Modelin Asıl Yakıtı"
description: "Çöp girer çöp çıkar: veri temizleme, etiketleme stratejileri, sentetik veri ve dürüst değerlendirme setleriyle modelin asıl yakıtını anlatıyoruz."
publishDate: "2026-08-09T23:30:00+03:00"
lang: tr
category: "Veri"
tags: ["Veri", "Yapay Zeka"]
translation: "data-quality-labeling"
heroImage:
  src: "../../../assets/blog/bimg-20.jpg"
  alt: "Veri Kalitesi ve Etiketleme: Modelin Asıl Yakıtı"
---

Bir modeli ne kadar büyütürseniz büyütün, ona verdiğiniz veri kötüyse sonuç da kötü olur. Yapay zekânın en eski kuralı hâlâ geçerli: çöp girer, çöp çıkar. Bu yazıda modelin asıl yakıtı olan veriyi nasıl temizleyip etiketleyeceğinizi, sentetik veriyi ne zaman kullanacağınızı ve dürüst bir değerlendirme setinin neden her şeyden önemli olduğunu sezgisel bir dille anlatıyoruz.

## Çöp girer, çöp çıkar

Bir aşçı düşünün. Dünyanın en pahalı fırınına, en keskin bıçaklarına sahip olsun. Ama eline çürük domates ve bayat ekmek verirseniz, çıkan yemek de o kadar olur. Yapay zekâ modelleri de böyledir: mimari ve hesaplama gücü fırın ve bıçaklardır, veri ise malzemedir. Malzeme kötüyse, ne kadar usta olursanız olun sonuç hayal kırıklığıdır.

Bu yüzden son yılların en güçlü modelleri sadece "daha büyük" değil, aynı zamanda "daha temiz veriyle beslenmiş" modellerdir. Pek çok ekip, model boyutunu iki katına çıkarmak yerine veri kalitesini iyileştirmenin daha hızlı kazanç getirdiğini gördü.

> Bir modelin zekâsı, gördüğü örneklerin ortalama kalitesinden çok, en kötü örneklerinin ne kadar zarar verdiğine bağlıdır.

## Temizleme: mutfaktaki ilk adım

Temizleme, veriyi "yenebilir" hâle getirmektir. Birkaç temel adım neredeyse her projede tekrarlanır:

-   **Tekilleştirme (deduplication):** Aynı metnin yüzlerce kopyası modeli o örneği ezberlemeye iter ve değerlendirmeyi yanıltır.
-   **Gürültü temizliği:** Bozuk kodlama, yarım kalmış HTML etiketleri, reklam blokları, anlamsız karakterler.
-   **Dil ve alan filtresi:** İstediğiniz dilde ve konuda olmayan örnekleri ayıklamak.
-   **Zararlı/yasak içerik:** Kişisel veri, telif sorunu veya toksik içeriğin temizlenmesi.
-   **Kaçak (leakage) kontrolü:** Test örneklerinizin yanlışlıkla eğitim setine sızmamasını sağlamak.

<div class="callout"><strong>İpucu:</strong> Tekilleştirmeyi tam eşleşmeyle bırakmayın. Neredeyse aynı (near-duplicate) metinler de zararlıdır; basit bir hash yerine MinHash veya gömme (embedding) benzerliği daha güvenlidir.</div>

## Etiketleme stratejileri

Etiket, modele "doğru cevap budur" demenin yoludur. Ama etiketin kendisi tutarsızsa, modele yalan söylüyorsunuz demektir. İyi etiketleme bir süreçtir, tek seferlik bir iş değil.

### Net yönerge ve örnekler

Etiketleyenlere "olumlu mu olumsuz mu?" diye sormak yetmez. Sınır durumları için örnekli bir kılavuz şarttır: "İronik övgü olumsuz sayılır", "ürünle ilgisiz şikâyet nötrdür" gibi.

### Uzlaşma ve tutarlılık ölçümü

Aynı örneği birden fazla kişiye etiketletip aralarındaki uyumu ölçün. Düşük uyum, modelin değil yönergenin sorunlu olduğunun işaretidir.

### Aktif öğrenme

Her örneği etiketlemek pahalıdır. Modelin en kararsız olduğu (en düşük güvenle tahmin ettiği) örnekleri seçip onları etiketletmek, bütçenizi en verimli yere harcar.

<div class="callout"><strong>İpucu:</strong> "Bilmiyorum / emin değilim" seçeneğini her zaman bırakın. Etiketleyiciyi zorla karar vermeye itmek, sınır örneklerde gürültü üretir.</div>

## Sentetik veri: ne zaman, ne kadar

Sentetik veri, gerçek veri kıt veya pahalı olduğunda işe yarar: nadir durumları çoğaltmak, dengesiz sınıfları doldurmak, ya da gizlilik nedeniyle gerçek veriyi paylaşamadığınızda. Bir dil modeline örnek ürettirmek bugün çok kolay; ama tehlike de tam burada.

Aynı modelin ürettiği veriyle yine aynı tip modeli beslerseniz, zamanla bir "yankı odası" oluşur: model kendi önyargılarını ve hatalarını pekiştirir. Buna model çöküşü (model collapse) denir. Çeşitlilik azalır, kalite sessizce düşer.

```python
# Sentetik veri için güvenli bir döngü (pseudocode)
for ornek in sentetik_uret(istem, n=1000):
    if not gecerli_format(ornek):      # şema kontrolü
        continue
    if cok_benzer(ornek, mevcut_veri): # çeşitlilik kontrolü
        continue
    if not insan_onayli_ornek(ornek):  # örneklem denetimi
        kuyruga_ekle(ornek)            # insan gözden geçirsin
    else:
        veri_setine_ekle(ornek)
# Altın kural: sentetik veri toplamın küçük, kontrollü bir payı olsun.
```

Sentetik veriyi bir baharat gibi düşünün: doğru miktarda yemeği güzelleştirir, aşırısı her şeyi bastırır.

## Değerlendirme seti: dürüst terazi

Eğitim verisi modelin okuduğu kitap ise, değerlendirme seti final sınavıdır. Sınav soruları sızmışsa, yüksek not bir şey ifade etmez. İyi bir değerlendirme setinin özellikleri:

-   **Temiz ayrım:** Eğitimle hiçbir örtüşme olmamalı (leakage yok).
-   **Temsil gücü:** Gerçek kullanım dağılımını yansıtmalı, sadece kolay örnekleri değil.
-   **Sabit ve sürümlü:** Zamanla karşılaştırma yapabilmek için sabit tutulmalı; değişiklikler sürümlenmeli.
-   **İnsan referansı:** Mümkünse insan performansıyla kıyaslanabilir olmalı.

> Değerlendirme setiniz ne kadar dürüstse, kararlarınız o kadar isabetli olur. Kendinizi kandıran bir terazi, en pahalı hatadır.

## Pratik bir akış

Yeni bir veri kümesiyle çalışırken şu sırayı izlemek çoğu ekibe yeter: önce küçük bir örneklemi gözle inceleyin, sonra temizleme kurallarını yazın, ardından net bir etiketleme kılavuzu hazırlayın, değerlendirme setini en başta ayırıp kilitleyin, ve son olarak sentetik veriyi yalnızca belirli boşlukları doldurmak için ekleyin. Veri kalitesi tek seferlik bir proje değil, sürekli dönen bir döngüdür.

Bu disiplini kurumsal süreçlerine taşımak isteyen ekipler için [HatsonTech](/posts/hatsontech-nedir/), veri hazırlığından değerlendirmeye uzanan bir bakış açısı sunar.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Model mimarisi fırın, veri ise malzemedir; kötü malzeme iyi yemek vermez.</li><li>Temizleme; tekilleştirme, gürültü ayıklama ve kaçak kontrolüyle başlar.</li><li>Etiketleme bir süreçtir: net yönerge, uzlaşma ölçümü ve aktif öğrenme.</li><li>Sentetik veri bir baharattır; aşırısı model çöküşüne yol açar.</li><li>Dürüst, sızıntısız bir değerlendirme seti en değerli varlığınızdır.</li></ul></div>

<div class="faq"><details><summary>Az ama temiz veri mi, çok ama gürültülü veri mi?</summary><p>Çoğu durumda az ama temiz veri kazanır. Gürültülü örnekler modeli yanlış yöne çeker ve değerlendirmeyi bozar. Önce kaliteyi yükseltin, sonra ölçeklemeyi düşünün.</p></details><details><summary>Sentetik veri gerçek veriyi tamamen değiştirebilir mi?</summary><p>Genellikle hayır. Boşlukları doldurmak ve nadir durumları çoğaltmak için iyidir, ama tamamen sentetik bir döngü model çöküşü riski taşır. Çekirdek olarak gerçek veriyi koruyun.</p></details><details><summary>Değerlendirme setini ne sıklıkla güncellemeliyim?</summary><p>Çekirdek seti sabit ve sürümlü tutun ki zaman içinde karşılaştırma yapabilesiniz. Yeni kullanım örnekleri ortaya çıktıkça ayrı, etiketli yeni sürümler ekleyin; eskisini silmeyin.</p></details></div>

---

Özetle: modelin sihri çoğu zaman mimaride değil, ona verdiğiniz veriden gizlidir. Veriyi ciddiye alan ekip, rakibini hesaplama gücüyle değil, kaliteyle geçer.
