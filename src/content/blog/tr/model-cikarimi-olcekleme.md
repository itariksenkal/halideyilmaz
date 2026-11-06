---
title: "Model Çıkarımı ve Ölçekleme: Gecikme, Verim, Niceleme ve KV-Cache ile GPU Maliyetini Düşürmek"
description: "Gecikme, verim, niceleme, KV-cache ve batching kavramlarını sezgisel analojilerle anlatan, GPU çıkarım maliyetini düşürmeye odaklı pratik bir rehber."
publishDate: "2026-08-09T23:31:00+03:00"
lang: tr
category: "Ölçekleme"
tags: ["Ölçekleme", "Yapay Zeka"]
translation: "model-inference-scaling"
heroImage:
  src: "../../../assets/blog/bimg-19.jpg"
  alt: "Model Çıkarımı ve Ölçekleme: Gecikme, Verim, Niceleme ve KV-Cache ile GPU Maliyetini Düşürmek"
---

Bir modeli eğitmek bir kerelik bir maratondur; onu her gün, her istekte çalıştırmak ise hiç bitmeyen bir koşudur. Üretimdeki asıl fatura çoğu zaman eğitimden değil, çıkarımdan (inference) gelir. Bu yazıda gecikme, verim, niceleme, KV-cache ve batching kavramlarını günlük analojilerle açıyor; GPU maliyetini nasıl düşürebileceğinizi pratik bir bakışla ele alıyoruz.

## Çıkarım nedir, neden pahalıdır?

Çıkarım, eğitilmiş bir modelin yeni bir girdiye yanıt üretmesidir: sorunuzu yazarsınız, model yanıtı kelime kelime (daha doğrusu token token) oluşturur. Eğitim laboratuvarda bir kez yapılır; çıkarım ise canlı sistemde, her kullanıcı için, günde milyonlarca kez tekrarlanır. Bu yüzden uzun vadede toplam GPU faturasının büyük kısmı çıkarımdan doğar.

Üretken (autoregressive) bir dil modeli metni iki aşamada üretir. Önce **prefill** aşamasında girdinizdeki tüm tokenları tek seferde işler; bu aşama hesap-yoğundur (GPU'nun işlem gücünü zorlar). Sonra **decode** aşamasında çıktıyı her seferinde bir token üretir; bu aşama ise bellek bant genişliği-yoğundur, çünkü her yeni token için modelin tüm ağırlıklarını bellekten okumak gerekir.

> Kısaca: prefill mektubu okumak gibidir, hepsini bir bakışta tararsınız; decode ise mektubu el yazısıyla cevaplamaktır, satır satır ilerler.

## Gecikme ve verim: iki farklı saat

İki ölçü sık sık karıştırılır ama bambaşka şeyleri ifade eder:

-   **Gecikme (latency):** Tek bir isteğin ne kadar sürede tamamlandığı. Burada iki alt metrik önemlidir: ilk tokenı görene kadar geçen süre (TTFT) ve sonraki her token arasındaki süre (TPOT veya token/saniye hızı).
-   **Verim (throughput):** Sistemin birim zamanda toplam kaç token ürettiği; yani saniyede tüm kullanıcılara servis edilen token sayısı.

Analoji: Bir kafede tek bir müşterinin kahvesini ne kadar hızlı aldığı gecikmedir. Barista'nın bir saatte kaç kahve yaptığı ise verimdir. İlginç olan şu: barista aynı anda birden çok kahve hazırlarsa toplam verim artar, ama o tek müşteri belki birkaç saniye daha bekler. Gecikme ile verim çoğu zaman birbiriyle yarışır.

<div class="callout"><strong>İpucu:</strong> Sohbet arayüzünde kullanıcı ilk kelimeyi hızlı görmek ister; bu yüzden TTFT'yi optimize edin. Toplu özetleme gibi arka plan işlerinde ise tek isteğin hızı önemsizdir, verimi maksimize edin.</div>

## KV-cache: aynı işi iki kez yapmamak

Model her yeni token üretirken, önceki tüm tokenlara "dikkat" eder (attention). Saf bir uygulamada her adımda tüm geçmiş yeniden hesaplanır; bu, her cümle eklediğinizde tüm paragrafı baştan okumaya benzer. KV-cache tam burada devreye girer: her tokenın hesaplanan anahtar (key) ve değer (value) vektörlerini bellekte saklar, böylece bir sonraki adımda yalnızca yeni token için hesap yapılır.

Faydası büyüktür: tekrarlanan hesap ortadan kalkar ve decode aşaması ciddi hızlanır. Bedeli ise bellektir. Cache boyutu konuşma uzunluğuyla doğrusal büyür ve uzun bağlamlarda model ağırlıklarından bile fazla yer kaplayabilir. GPU belleği dolduğunda ya eşzamanlı kullanıcı sayısını düşürmek ya da bağlamı kısaltmak gerekir.

```python
# KV-cache'in kavramsal mantığı (pseudocode)
kv_cache = []                      # baslangicta bos
for step in range(max_tokens):
    if step == 0:
        # prefill: tum girdiyi isle, K/V'leri sakla
        k, v = model.encode(prompt)
        kv_cache = [k, v]
    else:
        # decode: yalnizca son token icin hesapla
        k_new, v_new = model.step(last_token)
        kv_cache.append((k_new, v_new))
    last_token = model.predict_next(kv_cache)
    if last_token == EOS: break
```

## Batching: dolu otobüsle yola çıkmak

Bir GPU, tek bir isteği işlerken çoğu zaman atıl kalır; çünkü decode aşaması bellek bant genişliğiyle sınırlıdır, hesap birimleri boş bekler. Birden çok isteği aynı anda işlerseniz (batching), aynı ağırlık okumasıyla daha fazla iş çıkarırsınız. Bu, yarım dolu otobüs yerine dolu otobüsle yola çıkmak gibidir: yakıt aynı, taşınan yolcu kat kat fazla.

Statik batching'de tüm istekler aynı anda başlar ve en yavaş olan bitene kadar diğerleri bekler. Modern sunucular ise **sürekli batching (continuous batching)** kullanır: bir istek bittiğinde onun yerine kuyruktan yenisi anında alınır, böylece GPU sürekli dolu kalır. Bu teknik verimi çarpıcı biçimde artırır.

<div class="callout"><strong>İpucu:</strong> Sürekli batching ve PagedAttention gibi tekniklerle KV-cache belleğini parçalı yöneten vLLM, TGI veya TensorRT-LLM gibi olgun sunucuları doğrudan kullanın; bu çarkı yeniden icat etmeyin.</div>

## Niceleme: bavulu küçültmek

Model ağırlıkları varsayılan olarak 16-bit ondalık sayılarla (FP16/BF16) tutulur. **Niceleme (quantization)**, bu sayıları daha az bit ile temsil etmektir: örneğin 8-bit (INT8) veya 4-bit. Bavulunuzdaki kıyafetleri vakumlu poşetlere koyup hacmini küçültmek gibi düşünün; aynı eşya, çok daha az yer.

Kazançlar somuttur. 16-bit yerine 8-bit kullanmak ağırlıkların bellek ayak izini kabaca yarıya, 4-bit kullanmak ise dörtte birine indirir. Daha küçük model daha az bellek okuması demektir; bu da bellek bant genişliğiyle sınırlı decode aşamasını hızlandırır ve aynı GPU'ya daha büyük model ya da daha fazla eşzamanlı kullanıcı sığdırmanızı sağlar.

Bedava değildir: bit azaldıkça doğrulukta küçük kayıplar olabilir. Ancak GPTQ, AWQ gibi modern yöntemler kaybı çoğu görevde fark edilmez seviyede tutar. Pratik kural: 8-bit neredeyse her zaman güvenli; 4-bit çoğu üretim senaryosunda iyi bir denge; daha agresif şemalarda mutlaka kendi verinizle ölçün.

## Maliyeti düşürmenin pratik yol haritası

Bu parçaları birleştirdiğimizde, GPU faturasını düşürmek için net bir öncelik sırası çıkar:

1.  **Doğru modeli seçin:** Görev için yeterli olan en küçük model en büyük tasarruftur. Devasa bir modeli sırf "ihtiyaten" kullanmayın.
2.  **Niceleme uygulayın:** 8-bit veya 4-bit ile aynı donanımda daha fazla kapasite açın.
3.  **Sürekli batching açın:** GPU'yu boş bırakmayın; verim genellikle birkaç kat artar.
4.  **KV-cache'i yönetin:** Gereksiz uzun bağlamlardan kaçının; sık kullanılan sistem yönergelerinde önek (prefix) cache'inden yararlanın.
5.  **İş yükünü ayırın:** Gecikmeye duyarlı sohbet ile arka plan toplu işlerini farklı kuyruklarda çalıştırın.
6.  **Ölçün ve iterasyon yapın:** p50/p95 gecikme, token/saniye ve GPU kullanımını sürekli izleyin.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Uzun vadede toplam maliyetin büyük kısmı eğitim değil, çıkarımdır.</li><li>Gecikme tek isteğin hızıdır; verim toplam üretimdir, ikisi çoğu zaman birbiriyle yarışır.</li><li>KV-cache tekrar hesabı önler ama bellek tüketir; uzun bağlam pahalıdır.</li><li>Sürekli batching GPU'yu dolu tutarak verimi katlar.</li><li>Niceleme bellek ayak izini düşürür, decode'u hızlandırır ve kapasiteyi artırır.</li></ul></div>

<div class="faq"><details><summary>Niceleme modelimi "aptallaştırır" mı?</summary><p>Genellikle hayır. 8-bit niceleme çoğu görevde neredeyse kayıpsızdır. 4-bit'te küçük kayıplar olabilir ama GPTQ/AWQ gibi yöntemlerle çoğu zaman fark edilmez. Kritik uygulamalarda kendi verinizle ölçmek şarttır.</p></details><details><summary>Verimi artırmak gecikmeyi her zaman bozar mı?</summary><p>Hayır, sürekli batching sayesinde belirli bir noktaya kadar her ikisini birden iyileştirebilirsiniz. Ancak batch boyutunu aşırı büyütürseniz tek isteğin gecikmesi artmaya başlar; doğru denge iş yükünüze bağlıdır.</p></details><details><summary>Kendi sunucumu mu yazmalıyım?</summary><p>Çoğu durumda hayır. vLLM, TGI veya TensorRT-LLM gibi olgun çıkarım sunucuları sürekli batching, KV-cache yönetimi ve niceleme desteğini hazır sunar. Bunları kullanmak hem güvenli hem de hızlıdır.</p></details></div>

---

Çıkarımı optimize etmek, tek bir sihirli düğme değil; model seçimi, niceleme, batching ve cache yönetiminin birlikte ayarlanmasıdır. Doğru kombinasyonla aynı donanımdan kat kat fazla değer çıkarabilirsiniz. Yapay zekâ altyapısını verimli ve sürdürülebilir biçimde kurmak konusunda daha fazlasını merak ediyorsanız [HatsonTech](/posts/hatsontech-nedir/) yaklaşımına göz atabilirsiniz.
