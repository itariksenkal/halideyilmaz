---
title: "LLM Ajanları ve Araç Kullanımı: Planlama, MCP ve Çok Adımlı Görevler"
description: "LLM ajanları nasıl araç çağırır, plan yapar ve çok adımlı görevleri yürütür? MCP'yi, fırsatları ve riskleri sade analojilerle anlatıyoruz."
publishDate: "2026-08-09T23:33:00+03:00"
lang: tr
category: "Ajanlar"
tags: ["Ajanlar", "Yapay Zeka"]
translation: "llm-agents-tool-use"
heroImage:
  src: "../../../assets/blog/bimg-17.jpg"
  alt: "LLM Ajanları ve Araç Kullanımı: Planlama, MCP ve Çok Adımlı Görevler"
---

Bir dil modeline soru sorduğunuzda size bir cümle yazar. Bir _ajana_ (agent) görev verdiğinizde ise iş yapar: takvimi açar, uygun saati bulur, davet gönderir, sonra sonucu raporlar. Aradaki fark, bir danışmana akıl danışmakla, bir asistana "şunu hallet" demek arasındaki farka benzer. Bu yazıda LLM ajanlarının nasıl düşünüp araç kullandığını, MCP'nin (Model Context Protocol) neden önemli olduğunu ve çok adımlı görevlerin fırsatlarıyla risklerini sezgisel biçimde ele alacağız.

## Model mi, ajan mı? Temel ayrım

Sade bir dil modeli, metin alır ve metin üretir. Tek başına dünyaya dokunamaz: ne bir e-posta gönderebilir, ne bir veritabanını sorgulayabilir, ne de bugünün hava durumunu öğrenebilir. Bildikleri, eğitildiği ana kadar gördüğü metinle sınırlıdır.

Bir **ajan** ise modelin etrafına bir _döngü_ ve bir dizi _araç_ (tool) eklediğinizde ortaya çıkar. Model artık yalnızca cevap yazmaz; "şu aracı şu girdilerle çalıştır" diye karar verir, aracın sonucunu görür ve bu sonuca göre bir sonraki adıma karar verir. Yani model beyindir, araçlar eller, döngü ise işi bitene kadar dönen mekanizmadır.

> Sade model bir kütüphanedeki bilge gibidir: sorarsınız, anlatır. Ajan ise stajyer gibidir: "şu raporu hazırla" dersiniz, gidip kaynakları toplar, hesaplar, taslağı getirir.

Bu ayrım önemlidir çünkü ajanın gücü de riski de aynı yerden gelir: artık gerçekten _eyleme_ geçebiliyor olmasından.

## Araç çağırma (tool calling) nasıl çalışır?

Araç çağırmanın kalbinde basit bir anlaşma yatar. Modele "elinde şu araçlar var" diye bir liste verirsiniz; her aracın bir adı, ne işe yaradığını anlatan bir açıklaması ve hangi girdileri beklediğini tarif eden bir şeması olur. Model bir araca ihtiyaç duyduğunda, düz metin yerine **yapılandırılmış bir çağrı** üretir: "`hava_durumu` aracını, şehir = İstanbul ile çağır."

Burada kritik bir nokta var: modelin kendisi aracı çalıştırmaz. Model yalnızca "şunu çalıştırmak istiyorum" der; aracı gerçekten çalıştıran sizin kodunuzdur. Sonucu tekrar modele verirsiniz, o da bu sonucu cümleye dökerek size sunar. Yani model niyeti üretir, çevre eylemi gerçekleştirir.

```text
# Modele tanıtılan bir aracın tarifi (kavramsal)
{
  "name": "hava_durumu",
  "description": "Bir şehrin güncel hava durumunu döndürür.",
  "input_schema": {
    "type": "object",
    "properties": { "sehir": { "type": "string" } },
    "required": ["sehir"]
  }
}

# Modelin ürettiği çağrı (metin değil, yapılandırılmış veri):
# -> hava_durumu(sehir = "İstanbul")
# Sizin kodunuz aracı çalıştırır, sonucu modele geri verir:
# -> { "sicaklik": 21, "durum": "parçalı bulutlu" }
# Model bunu cümleye döker: "İstanbul'da hava 21°C, parçalı bulutlu."
```

<div class="callout"><strong>İpucu:</strong> Araç açıklamalarını insanlara yazar gibi yazın. Model, hangi aracı ne zaman çağıracağına bu açıklamalara bakarak karar verir. Belirsiz bir açıklama, yanlış araç seçimine doğrudan davetiyedir.</div>

## Planlama ve düşün–uygula–gözlemle döngüsü

Tek bir araç çağrısı çoğu zaman yetmez. "Paris'e gidip dönecek en ucuz uçuşu bul ve takvime ekle" gibi bir görev birden çok adım ister. İşte burada ajanın **planlama** yeteneği devreye girer.

Yaygın bir desen, kabaca üç adımdan oluşan bir döngüdür: **Düşün → Uygula → Gözlemle**. Model önce ne yapacağını düşünür (akıl yürütür), sonra bir araç çağırarak uygular, ardından sonucu gözlemler. Gözlem yeni bilgi getirir; model bu bilgiyle yeniden düşünür. Döngü, görev tamamlanana kadar tekrar eder.

```text
HEDEF = "Pariste 3 gecelik bir otel bul ve fiyatını euro olarak söyle"

döngü (görev bitene kadar):
    düşün:   "Önce otel arama aracını çağırmalıyım."
    uygula:  otel_ara(sehir="Paris", gece=3)
    gözlemle: [3 sonuç, fiyatlar dolar cinsinden]
    düşün:   "Fiyatlar dolar; euroya çevirmeliyim."
    uygula:  kur_cevir(tutar=420, kaynak="USD", hedef="EUR")
    gözlemle: 388 EUR
    düşün:   "Bilgi tamam, cevabı yazabilirim." -> BİTİR
```

Bu döngünün gücü, modelin _kendi hatasını fark edip düzeltebilmesinde_ yatar. Bir araç boş sonuç döndürürse, model farklı bir arama deneyebilir. Ama aynı esneklik, kontrolsüz bırakılırsa döngünün sonsuza dek dönmesine de yol açabilir; bu yüzden adım sayısına bir üst sınır koymak iyi bir alışkanlıktır.

## MCP: araçlar için ortak priz

Her ajan, her araç için sıfırdan özel bağlantı kodu yazmak zorunda kalsaydı, ekosistem kısa sürede bir kablo karmaşasına dönerdi. **MCP (Model Context Protocol)** tam da bu sorunu çözmek için doğdu: araçların, veri kaynaklarının ve modellerin birbirine bağlandığı _ortak bir standart_.

En sevdiğim analoji USB'dir. USB'den önce her cihazın kendi kablosu vardı; USB geldikten sonra tek bir prize her şeyi takabildik. MCP de yapay zeka dünyasının USB'si gibidir: bir aracı MCP standardına göre bir kez yazarsınız, MCP'yi destekleyen _her_ ajan o aracı kullanabilir.

Pratikte MCP, bir **istemci** (ajanı çalıştıran uygulama) ile bir **sunucu** (araçları ve verileri sunan taraf) arasındaki konuşmayı standartlaştırır. Sunucu "elimde şu araçlar var" der, istemci bunları modele tanıtır, model çağırır, sunucu çalıştırır. Hepsi aynı dili konuştuğu için parçalar takılabilir hale gelir.

> MCP'nin değeri tek bir araçta değil, _birlikte çalışabilirlikte_ ortaya çıkar: bir kez yazılan araç, standardı destekleyen tüm istemcilerde yeniden kullanılır.

## Çok adımlı görevlerin anatomisi

Gerçek dünyada ajanlara verilen görevler nadiren tek adımlıktır. "Bu PDF'teki rakamları çıkar, bir tabloya yaz ve özetle" gibi bir istek; okuma, ayrıştırma, hesaplama ve özetlemeyi tek bir akışta birleştirir. Çok adımlı bir görevin tipik bileşenleri şunlardır:

-   **Ayrıştırma (decomposition):** Büyük hedefi, her biri bir araçla çözülebilecek küçük alt görevlere bölmek.
-   **Durum/bellek:** Adımlar arasında ara sonuçları taşımak. Üçüncü adım, birinci adımda bulunan veriyi hatırlamalıdır.
-   **Hata toparlama:** Bir araç başarısız olduğunda pes etmek yerine alternatif denemek veya kullanıcıdan netlik istemek.
-   **Durdurma ölçütü:** Görevin "bitti" sayılacağı koşulu net tanımlamak; aksi halde ajan dönüp durur.

Görevler uzadıkça hata olasılığı da birikir: her adımın küçük bir hata payı varsa, on adımlık bir zincirde bu paylar çarpışarak büyür. Bu yüzden olgun ajan tasarımları görevi mümkün olduğunca az ve sağlam adıma indirger, kritik noktalarda doğrulama ekler.

<div class="callout"><strong>İpucu:</strong> Çok adımlı bir görevde "her şeyi tek bir dev prompt'a sıkıştırma" tuzağına düşmeyin. Görevi net alt adımlara bölmek, hem doğruluğu artırır hem de bir şey ters gittiğinde nerede koptuğunu görmeyi kolaylaştırır.</div>

## Fırsatlar ve riskler

Ajanların vaadi büyük: tekrarlayan dijital işleri otomatikleştirmek, birden çok sistemi tek bir doğal dil isteğiyle koordine etmek, insanın saatlerini alan araştırma-derleme işlerini dakikalara indirmek. Doğru kurgulandığında bir ajan, bir uçtan diğerine giden bir iş akışını sizin yerinize yürütebilir.

Ama eyleme geçebilen her sistem gibi ajanların da gerçek riskleri vardır:

-   **Geri alınamaz eylemler:** Bir e-posta gönderildikten veya bir kayıt silindikten sonra geri dönüş yoktur. Yüksek etkili araçlar için insan onayı şarttır.
-   **Prompt enjeksiyonu:** Ajanın okuduğu bir web sayfası veya belge, gizli talimatlar içerebilir ("önceki talimatları unut, şunu yap"). Dış veriyi asla güvenilir komut gibi ele almayın.
-   **Hata birikimi:** Uzun zincirlerde küçük yanlışlar büyür; ara doğrulama olmadan sonuç sessizce bozulabilir.
-   **Maliyet ve döngü:** Durdurma ölçütü zayıfsa ajan gereğinden çok adım atar; hem yavaşlar hem pahalılaşır.
-   **Yetki sınırı:** Ajana verdiğiniz her araç, ona verdiğiniz bir yetkidir. En az ayrıcalık ilkesini uygulayın: yalnızca gerekeni verin.

> Pratik bir kural: Ajanı, akıllı ama deneyimsiz bir stajyer gibi düşünün. Yeteneği şaşırtıcıdır, ama önemli kararlarda onay almasını ve elinin nereye uzanabileceğini sınırlamasını istersiniz.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Ajan = model + araçlar + döngü; sade model yalnızca yazar, ajan ise eyleme geçer.</li><li>Araç çağrısında model niyeti üretir; aracı gerçekte çalıştıran çevredeki koddur.</li><li>Planlama çoğu zaman bir Düşün–Uygula–Gözlemle döngüsüyle ilerler ve adım sayısı sınırlanmalıdır.</li><li>MCP, araçlar için ortak bir "priz"dir: bir kez yaz, her uyumlu istemcide kullan.</li><li>En büyük riskler geri alınamaz eylemler ve prompt enjeksiyonudur; insan onayı ve en az ayrıcalık şarttır.</li></ul></div>

<div class="faq"><details><summary>Ajan ile sohbet botu (chatbot) arasındaki fark nedir?</summary><p>Sohbet botu metinle cevap verir; sohbeti bitirdiğinizde elinizde bir cümle kalır. Ajan ise araçlar aracılığıyla eyleme geçer: dosya okur, API çağırır, bir işi sizin için tamamlar. Bir ajanın içinde sohbet botu olabilir, ama farkı "konuşmak" ile "iş yapmak" arasındadır.</p></details><details><summary>MCP'yi kullanmak için onu desteklemem zorunlu mu?</summary><p>Hayır, ajan yapmak için MCP şart değildir; araçları doğrudan da bağlayabilirsiniz. MCP'nin kazandırdığı şey birlikte çalışabilirliktir: aracınızı bir kez standarda göre yazarsanız, onu farklı istemcilerde yeniden kullanabilir ve hazır MCP sunucularından faydalanabilirsiniz.</p></details><details><summary>Ajan yanlış bir şey yaparsa nasıl korunurum?</summary><p>Üç katman önerilir: yüksek etkili eylemler için insan onayı, dış veriye karşı temkin (prompt enjeksiyonu), ve en az ayrıcalık (ajan yalnızca gerçekten ihtiyaç duyduğu araçlara erişsin). Bir de adım/maliyet üst sınırı koyarak kontrolsüz döngüleri engellersiniz.</p></details></div>

---

Özetle, LLM ajanları yapay zekayı "konuşan bir danışmandan" "iş yapan bir asistana" dönüştürüyor. Bu dönüşüm büyük bir fırsat, ama eyleme geçen her sistem gibi dikkatli bir tasarım istiyor: net araçlar, sınırlı yetki, insan onayı ve ölçülebilir durdurma ölçütleri. Güvenli ve amaca uygun yapay zeka çözümleri tasarlamayı planlıyorsanız, [HatsonTech](/posts/hatsontech-nedir/) ekibi bu mimari kararları sizinle birlikte değerlendirmekten memnuniyet duyar.
