---
title: "A/B Testi Nedir? Ürün Kararları için Deney Tasarımının Temelleri"
description: "A/B testi nasıl kurulur: hipotez, rastgele atama, örneklem büyüklüğü, anlamlılık ve pratik etki, erken bakma, çoklu test ve testin uygun olmadığı durumlar."
publishDate: "2026-11-17T09:17:00+03:00"
lang: tr
category: "İstatistik"
tags: ["A/B Testi", "İstatistik", "Ürün Yönetimi"]
translation: "what-is-ab-testing"
heroImage:
  src: "../../../assets/blog/covers/ab-testi-nedir.jpg"
  alt: "İki farklı ekran tasarımının, A ve B sürümlerinin karşılaştırılması"
---

Bir ürün ekibi yeni bir ödeme sayfası tasarlıyor ve ekipteki herkesin bir fikri var: Bazıları yeni tasarımın satışları artıracağından emin, bazıları ise eski sayfanın daha iyi olduğunu düşünüyor. Bu tartışmayı görüşlerle değil verilerle çözmenin en güvenilir yollarından biri A/B testi. Kullanıcıları rastgele iki gruba ayırıp birine mevcut sürümü, diğerine yeni sürümü gösterir ve sonuçları karşılaştırırsınız. Fikir basit; ama doğru uygulanmadığında A/B testleri, var olmayan etkileri "kanıtlayabilir" ya da gerçek etkileri gözden kaçırabilir. Model değerlendirme üzerine çalışırken de aynı istatistiksel tuzaklarla sık karşılaşıyorum. Bu yazıda bir A/B testini güvenilir kılan temel kavramları teknik olmayan bir dille anlatmaya çalışacağım.

## A/B testi nedir?

A/B testi, çevrim içi ortamda yapılan bir rastgele kontrollü deneydir. Kullanıcıların bir kısmı mevcut deneyimi (kontrol, "A"), diğer kısmı değiştirilmiş deneyimi (deney, "B") görür. Gruplar rastgele oluşturulduğu için, iki grup arasında ölçülen farkın en olası açıklaması yapılan değişikliktir; mevsim, kampanya ya da haber gündemi gibi dış etkenler iki grubu da aynı şekilde etkiler.

Bu, "önce-sonra" karşılaştırmasından temel bir farktır. Yeni tasarımı yayına alıp bir önceki haftayla kıyaslarsanız, aradaki farkın tasarımdan mı yoksa o hafta başlayan bir indirimden mi kaynaklandığını ayırt edemezsiniz.

## Önce hipotez ve metrik

İyi bir deney, veriye bakmadan önce yazılmış bir hipotezle başlar: "Ödeme adımlarını üçten ikiye indirmek, ödeme sayfasına gelen kullanıcılar arasında satın alma oranını artırır." Bu cümle üç şeyi netleştirir: Neyi değiştirdiğinizi, kimi ölçtüğünüzü ve hangi metriğe bakacağınızı.

Deneyden önce şunlara karar vermek gerekir:

- **Birincil metrik:** Başarıyı tanımlayan tek bir ölçü (örneğin satın alma oranı).
- **Koruma metrikleri:** Kötüleşmemesi gereken ölçüler (sayfa yüklenme süresi, iade oranı, şikâyetler).
- **Minimum anlamlı etki:** İş açısından fark edilmeye değer en küçük değişim.
- **Süre ve örneklem:** Deneyin ne kadar süreceği ve kaç kullanıcıya ihtiyaç olduğu.

## Rastgele atama

Rastgele atamanın amacı, iki grubun deneyden önce her açıdan benzer olmasını sağlamaktır. Pratikte atama genellikle kullanıcı düzeyinde yapılır: Aynı kişi her ziyaretinde aynı sürümü görmelidir. Sayfa görüntülemesi düzeyinde atama, aynı kişinin iki sürümü de görmesine ve sonuçların karışmasına yol açabilir.

Atamanın doğru çalıştığını kontrol etmek de önemlidir. Trafiği yüzde 50–50 bölmeyi planladıysanız ve gruplardan biri belirgin şekilde daha az kullanıcı aldıysa, bu genellikle bir teknik hataya işaret eder. Bu durumda sonuçlara güvenmeden önce nedeni bulmak gerekir.

## Örneklem büyüklüğü sezgisi

En sık sorulan sorulardan biri: "Kaç kullanıcıya ihtiyacımız var?" Cevap üç şeye bağlıdır: Mevcut dönüşüm oranı, yakalamak istediğiniz en küçük fark ve ne kadar kesinlik istediğiniz. Aşağıdaki kısa fonksiyon, iki oranı karşılaştıran bir test için grup başına yaklaşık kullanıcı sayısını hesaplıyor (yüzde 5 anlamlılık düzeyi ve yüzde 80 güç ile):

```python
from math import ceil
from statistics import NormalDist

def grup_basina_orneklem(taban_oran, min_fark, alfa=0.05, guc=0.80):
    """İki oranın karşılaştırıldığı çift yönlü test için yaklaşık örneklem."""
    p1 = taban_oran
    p2 = taban_oran + min_fark
    z_alfa = NormalDist().inv_cdf(1 - alfa / 2)
    z_guc = NormalDist().inv_cdf(guc)
    varyans = p1 * (1 - p1) + p2 * (1 - p2)
    return ceil((z_alfa + z_guc) ** 2 * varyans / min_fark ** 2)

print(grup_basina_orneklem(0.05, 0.01))    # 8155
print(grup_basina_orneklem(0.05, 0.005))   # 31231
print(grup_basina_orneklem(0.05, 0.0025))  # 122121
```

Sonuçlar önemli bir sezgiyi gösteriyor: Satın alma oranı yüzde 5 iken 1 puanlık bir artışı yakalamak için grup başına yaklaşık 8 bin kullanıcı yeterli. Yarım puanlık artış için bu sayı yaklaşık 31 bine, çeyrek puan için 122 bine çıkıyor. Yakalamak istediğiniz fark yarıya indiğinde, gereken örneklem kabaca dört katına çıkar. Küçük etkileri ölçmek pahalıdır.

## Anlamlılık ve pratik etki

Deney bittiğinde genellikle bir p-değerine bakılır. Ancak p-değeri sık yanlış yorumlanır. Amerikan İstatistik Derneği'nin (ASA) 2016'da yayımladığı bildiri bunu açıkça vurgular: p-değeri, test edilen hipotezin doğru olma olasılığını ölçmez; etkinin büyüklüğünü ya da önemini de göstermez. Kararlar yalnızca p-değerinin bir eşiği geçip geçmediğine dayanmamalıdır.

Bu yüzden "anlamlı mı?" sorusunun yanında "ne kadar?" sorusunu da sormak gerekir. Çok büyük örneklemlerde, iş açısından önemsiz bir fark bile istatistiksel olarak anlamlı çıkabilir. Tersine, küçük bir örneklemde önemli bir etki "anlamlı değil" görünebilir. Etkinin tahmini büyüklüğünü ve güven aralığını raporlamak, tek bir p-değerinden çok daha fazla bilgi verir.

<div class="callout"><strong>İpucu:</strong> Sonuç raporuna "B sürümü anlamlı çıktı" yerine "B sürümü satın alma oranını tahminen 0,6 puan artırdı; güven aralığı 0,1 ile 1,1 puan arasında" gibi bir cümle yazın. Karar verecek kişi için çok daha anlamlıdır.</div>

## Erken bakma ve çoklu test

A/B testlerindeki en yaygın hatalardan biri, deney sürerken sonuçlara sürekli bakıp "anlamlı" görünür görünmez durdurmaktır. Evan Miller'ın bu konudaki bilinen yazısında, gerçekte hiçbir etkisi olmayan bir değişiklik için her gözlemden sonra test yapıp ilk anlamlı sonuçta durulduğunda, yanlış pozitif oranının yüzde 5 yerine yüzde 26,1'e çıktığı bir örnek gösterilir. En basit çözüm, örneklem büyüklüğünü önceden belirleyip deney tamamlanana kadar karar vermemektir. Erken durma ihtiyacı gerçekten varsa, bunun için tasarlanmış sıralı (sequential) test yöntemleri kullanılabilir.

Benzer bir sorun çoklu testte ortaya çıkar. Yirmi farklı metriğe ya da yirmi kullanıcı segmentine ayrı ayrı bakarsanız, hiçbir gerçek etki olmasa bile her biri yüzde 5 olasılıkla "anlamlı" çıkabilir; bağımsız yirmi testte en az birinin tesadüfen anlamlı çıkma olasılığı yaklaşık yüzde 64'tür. Birincil metriği önceden belirlemek ve çok sayıda karşılaştırma yapıldığında düzeltme yöntemleri kullanmak bu riski azaltır.

## Ne zaman A/B testi yapılmamalı?

A/B testi güçlü bir araç, ama her soruya uygun değil:

- **Trafik yetersizse:** Yeterli kullanıcıya ulaşamayacaksanız, deney ya aylarca sürer ya da kararsız biter. Bu durumda kullanıcı görüşmeleri ve nitel araştırma daha verimli olabilir.
- **Etik ya da yasal sınırlar varsa:** Kullanıcılara zarar verebilecek, yanıltıcı olabilecek ya da yasal yükümlülükleri ihlal edebilecek değişiklikler test edilmemelidir.
- **Kullanıcılar birbirini etkiliyorsa:** Mesajlaşma ya da pazar yeri gibi ürünlerde bir grubun davranışı diğerini etkileyebilir; basit kullanıcı düzeyinde rastgele atama yanıltıcı sonuçlar verebilir.
- **Etki uzun vadeliyse:** Marka algısı ya da yıllık müşteri sadakati gibi etkiler birkaç haftalık bir deneyde görünmeyebilir. Yeni bir tasarımın ilk günlerdeki merak etkisi de sonuçları geçici olarak şişirebilir.
- **Doğru karar zaten açıksa:** Bir hata düzeltmesi ya da güvenlik güncellemesi için deney yapmaya gerek yoktur.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>A/B testi, rastgele atama sayesinde bir değişikliğin etkisini dış etkenlerden ayırmayı sağlar.</li><li>Hipotezi, birincil metriği ve örneklem büyüklüğünü deneyden önce belirleyin.</li><li>Yakalanmak istenen etki yarıya indiğinde gereken örneklem kabaca dört katına çıkar.</li><li>p-değeri etkinin büyüklüğünü göstermez; etki tahmini ve güven aralığını birlikte raporlayın.</li><li>Erken bakma ve çok sayıda metrik, yanlış pozitif riskini ciddi biçimde artırır.</li></ul></div>

<div class="faq"><details><summary>Bir A/B testi ne kadar sürmeli?</summary><p>Süre, gereken örneklem büyüklüğüne ve günlük trafiğe göre belirlenir. Hafta içi ve hafta sonu davranışları farklı olabileceği için, örneklem daha erken dolsa bile en az bir ya da iki tam haftayı kapsamak yaygın bir uygulamadır.</p></details><details><summary>Aynı anda ikiden fazla sürüm test edilebilir mi?</summary><p>Evet, buna genellikle A/B/n testi denir. Ancak her ek sürüm hem trafiği böler hem de karşılaştırma sayısını artırır; bu yüzden daha fazla örneklem ve çoklu test için düzeltme gerekir.</p></details><details><summary>Sonuç anlamlı değilse ne demek?</summary><p>Bu, değişikliğin hiçbir etkisi olmadığı anlamına gelmez; yalnızca bu deneyin, belirlenen büyüklükte bir etkiyi ayırt etmeye yetmediğini gösterir. Güven aralığına bakmak, olası etkinin hangi aralıkta olduğunu anlamaya yardımcı olur.</p></details><details><summary>Bayesçi yöntemler erken bakma sorununu çözer mi?</summary><p>Bayesçi yaklaşımlar sonuçları farklı bir dille ifade eder, ancak sürekli bakıp durma kararı vermenin hata oranlarını etkilemediği varsayımı tartışmalıdır. Hangi yöntem kullanılırsa kullanılsın, durma kuralını önceden belirlemek iyi bir pratiktir.</p></details></div>

---

**Kaynaklar**

- [Kohavi, Tang ve Xu – Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing (Cambridge University Press, 2020)](https://doi.org/10.1017/9781108653985)
- [American Statistical Association – Statement on Statistical Significance and P-Values (2016)](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf)
- [Wasserstein ve Lazar – The ASA's Statement on p-Values: Context, Process, and Purpose](https://doi.org/10.1080/00031305.2016.1154108)
- [Evan Miller – How Not To Run an A/B Test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
