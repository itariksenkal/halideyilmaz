---
title: "Model Yorumlanabilirliği (XAI): Bir Model Neden Böyle Karar Verdi?"
description: "SHAP, LIME ve dikkat görselleştirmesini sezgisel örneklerle anlatıyoruz: bir model neden böyle karar verir ve bu açıklamalar güven ile hesap verebilirliği nasıl güçlendirir?"
publishDate: "2026-08-09T23:42:00+03:00"
lang: tr
category: "Yorumlama"
tags: ["Yorumlama", "Yapay Zeka"]
translation: "model-interpretability-xai"
heroImage:
  src: "../../../assets/blog/covers/model-yorumlanabilirligi.jpg"
  alt: "Model Yorumlanabilirliği (XAI): Bir Model Neden Böyle Karar Verdi?"
---

Bir model "kredini reddediyorum" dediğinde, asıl soru "doğru mu?" değildir; asıl soru "neden?" sorusudur. Model yorumlanabilirliği (XAI), bir tahminin ardındaki gerekçeyi insan diliyle açıklamayı hedefler. Bu yazıda SHAP, LIME ve dikkat görselleştirmesini sezgisel biçimde ele alıyor; yorumlanabilirliğin güven ve hesap verebilirlikle nasıl iç içe olduğunu konuşuyoruz.

## Neden "neden" sorusu önemli?

Bir doktorun "bu tahlil iyi görünüyor" demesiyle, "şu üç değer normalin üzerinde, o yüzden ek test istiyorum" demesi arasındaki fark açıklanabilirliktir. İlki sonucu verir; ikincisi gerekçeyi de verir. Yapay zeka modelleri çoğu zaman birinci doktor gibi davranır: yüksek doğrulukla bir sayı üretir ama bu sayının nasıl oluştuğunu söylemez.

Karmaşık modeller (derin ağlar, gradyan artırmalı ağaçlar) milyonlarca parametreyi iç içe kullanır. Bu yüzden bunlara çoğu zaman "kara kutu" denir. Yorumlanabilirlik, kutunun içine ışık tutmak için geliştirilen yöntemler bütünüdür. İki temel ihtiyaç vardır:

-   **Yerel açıklama:** "Bu tek tahmin neden böyle çıktı?"
-   **Genel açıklama:** "Model genel olarak hangi özelliklere ağırlık veriyor?"

> Doğruluk modelin _ne kadar_ isabetli olduğunu söyler; yorumlanabilirlik _neden_ isabetli (ya da isabetsiz) olduğunu söyler.

## SHAP: katkı payını adil bölmek

SHAP (SHapley Additive exPlanations), kökünü işbirlikçi oyun teorisinden alan Shapley değerlerinden alır. Sezgi şudur: bir takım maç kazandı; her oyuncunun galibiyete katkısını adilce nasıl paylaştırırız? Cevap, her oyuncuyu takıma farklı sıralarda ekleyip getirdiği ek katkının ortalamasını almaktır.

Modelde "oyuncular" özelliklerdir (yaş, gelir, geçmiş ödeme...), "galibiyet" ise tahmin değeridir. SHAP, her özelliğin tahmini ortalama bir taban değerden ne kadar ittiğini ölçer. Güzel yanı, katkıların toplamının tam olarak tahmine eşit olmasıdır:

```text
tahmin = taban_değer + Σ shap_değeri[özellik]

# Örnek: kredi skoru tahmini (yüksek = onay olasılığı)
taban_değer            = 0.50
shap[gelir]            = +0.18   # geliri itti
shap[geçmiş_gecikme]   = -0.22   # gecikmeler aşağı çekti
shap[yaş]              = +0.04
# ----------------------------------
tahmin = 0.50 + 0.18 - 0.22 + 0.04 = 0.50
```

Bu tabloyu okumak kolaydır: geçmiş gecikmeler bu başvuruyu en çok aşağı çeken etmen olmuş. SHAP'in en güçlü yanı tutarlı (consistent) ve toplamsal (additive) olmasıdır; yani açıklamalar matematiksel olarak tahminle uyumludur, sezgiyle uydurulmaz.

<div class="callout"><strong>İpucu:</strong> SHAP tam hesaplaması özellik sayısıyla üstel büyür. Pratikte ağaç tabanlı modeller için TreeSHAP, diğerleri için örneklemeye dayalı yaklaşımlar kullanılır; bu sayede hesaplama ölçeklenebilir kalır.</div>

## LIME: yerel ve basit bir vekil

LIME (Local Interpretable Model-agnostic Explanations) farklı bir sezgiyle çalışır. Karmaşık bir modeli bütün olarak açıklamak zordur; ama tek bir tahminin _çevresinde_, model neredeyse doğrusal davranır. LIME bu küçük bölgede modeli taklit eden basit bir vekil (örneğin doğrusal regresyon) eğitir.

Analoji: kıvrımlı bir dağ yolunun tamamını bir denklemle anlatamazsınız; ama durduğunuz noktada yolun eğimi tek bir sayıyla ifade edilebilir. LIME, "tam burada" eğimi ölçer.

1.  Açıklanacak örneğin etrafında küçük değişikliklerle yeni örnekler türet.
2.  Asıl karmaşık modelden bu örneklerin tahminlerini al.
3.  Örneği merkeze yakınlığa göre ağırlıklandır.
4.  Bu ağırlıklı veriye basit, yorumlanabilir bir model uydur.

LIME modelden bağımsızdır (model-agnostic): içeriden hiçbir şey bilmeden, yalnızca girdi-çıktı davranışına bakarak çalışır. Bu esneklik avantaj; ama dezavantajı da var: rastgele örnekleme nedeniyle açıklamalar çalıştırmadan çalıştırmaya hafifçe değişebilir. SHAP daha kararlı, LIME daha hızlı ve sezgiseldir.

## Dikkat görselleştirmesi: model nereye baktı?

Metin ve görüntü modellerinde (özellikle Transformer'larda) "dikkat" (attention) mekanizması, modelin her adımda girdinin hangi parçalarına ağırlık verdiğini gösteren bir ağırlık dağılımı üretir. Bunu ısı haritası olarak çizmek güçlü bir görsel açıklama sunar: bir çeviri modeli "kalem" kelimesini üretirken kaynaktaki "pen" kelimesine yoğunlaştıysa, bu bağlantıyı renklerle görebiliriz.

Görüntü modellerinde benzer şekilde Grad-CAM gibi yöntemler, modelin "kedi" kararını verirken görüntünün hangi bölgesine baktığını sıcak renklerle işaretler. Kulaklara ve bıyıklara odaklandıysa içimiz rahat eder; arka plandaki çimene odaklandıysa modeli sorgularız.

> Önemli uyarı: dikkat ağırlıkları her zaman "açıklama" değildir. Yüksek dikkat, o parçanın karara _nedensel_ katkısını kanıtlamaz; yalnızca işlem sırasında oraya bakıldığını gösterir. Bunu bir ipucu olarak kullanın, kesin kanıt olarak değil.

## Güven, hesap verebilirlik ve tuzaklar

Yorumlanabilirlik teknik bir lüks değil; çoğu alanda hukuki ve etik bir gerekliliktir. Kredi, sigorta, sağlık ve işe alım gibi yüksek riskli kararlarda, etkilenen kişinin gerekçeyi öğrenme hakkı vardır. Açıklanabilir bir model şunları mümkün kılar:

-   **Güven:** Uzmanlar gerekçeyi gördüğünde modeli denetleyip onaylayabilir.
-   **Hata ayıklama:** Model yanlış nedenle doğru cevabı veriyorsa (örneğin veri sızıntısı) bunu fark edersiniz.
-   **Adalet denetimi:** Yasak bir özelliğin (örneğin posta kodu üzerinden dolaylı ayrımcılık) karara sızıp sızmadığını görürsünüz.
-   **Hesap verebilirlik:** İtiraz edilebilen, belgelenebilen kararlar oluşur.

Yine de açıklamalar mükemmel değildir. Bir açıklama yanıltıcı olabilir; sadeleştirilmiş bir vekil, asıl modelin tüm inceliklerini taşımaz. "Açıklanabilir" ile "doğru" aynı şey değildir: ikna edici görünen bir açıklama, yanlış bir modeli haklı çıkarmaz. Bu yüzden açıklamaları model değerlendirmesinin yerine değil, yanında kullanmak gerekir.

Sorumlu yapay zeka tasarımı ve denetlenebilir sistemler konusunda daha fazla bağlam için [HatsonTech](/posts/hatsontech-nedir/) yaklaşımına göz atabilirsiniz.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Yorumlanabilirlik "ne" değil "neden" sorusuna yanıt verir; doğruluğu tamamlar, yerine geçmez.</li><li>SHAP, oyun teorisinden gelir; tutarlı ve toplamsaldır, katkıların toplamı tahmine eşittir.</li><li>LIME, tek tahminin etrafında basit bir vekil model eğitir; hızlı ve model-bağımsızdır ama daha az kararlıdır.</li><li>Dikkat ve Grad-CAM "nereye bakıldığını" gösterir, ama yüksek dikkat nedensellik kanıtı değildir.</li><li>Yüksek riskli kararlarda açıklanabilirlik güven, adalet denetimi ve hesap verebilirlik için zorunludur.</li></ul></div>

<div class="faq"><details><summary>SHAP mı LIME mı kullanmalıyım?</summary><p>Kararlılık ve matematiksel tutarlılık öncelikse ve yeterli hesap kaynağınız varsa SHAP tercih edilir; özellikle ağaç tabanlı modellerde TreeSHAP çok verimlidir. Hızlı, sezgisel ve modelden bağımsız bir açıklama gerekiyorsa LIME pratiktir. İkisini birlikte kullanıp tutarlılığı çapraz kontrol etmek de yaygın bir uygulamadır.</p></details><details><summary>Dikkat ağırlıkları modelin gerçek gerekçesi mi?</summary><p>Tam olarak değil. Dikkat, modelin işlem sırasında girdinin hangi kısımlarına ağırlık verdiğini gösterir; ama bu mutlaka nedensel açıklama anlamına gelmez. Faydalı bir ipucu olarak görün, kesin kanıt olarak değil; mümkünse SHAP gibi yöntemlerle destekleyin.</p></details><details><summary>Yorumlanabilirlik doğruluğu düşürür mü?</summary><p>Yöntemin türüne bağlı. SHAP ve LIME gibi post-hoc yöntemler eğitilmiş modeli değiştirmeden onu açıklar, dolayısıyla doğruluğu etkilemez. Doğal olarak yorumlanabilir basit modeller (doğrusal modeller, sığ ağaçlar) bazen daha düşük doğruluk verebilir; bu, açıklanabilirlik ile başarım arasındaki klasik dengeyi gündeme getirir.</p></details></div>

---
