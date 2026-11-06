---
title: "Üretimde Model İzleme ve Veri Kayması: Kavram Kayması, Performans Düşüşü ve Yeniden Eğitim Tetikleyicileri"
description: "Üretimdeki ML modellerinde veri ve kavram kaymasını ele alıyoruz: performans düşüşünü tespit etme, yeniden eğitim tetikleyicileri ve üretim ML sağlığını koruma için pratik bir rehber."
publishDate: "2026-08-09T23:40:00+03:00"
lang: tr
category: "Üretim"
tags: ["Üretim", "Yapay Zeka"]
translation: "model-monitoring-drift"
heroImage:
  src: "../../../assets/blog/bimg-10.jpg"
  alt: "Üretimde Model İzleme ve Veri Kayması: Kavram Kayması, Performans Düşüşü ve Yeniden Eğitim Tetikleyicileri"
---

Bir bisikleti ilk kez ayarladığınızı düşünün: fren mesafeleri tam, vites geçişleri pürüzsüz. Aylar sonra hiçbir şeye dokunmadığınız hâlde frenler tutmaz, zincir atlamaya başlar. Bisiklet değişmedi; yollar, lastik aşınması ve havalar değişti. Üretime alınmış bir makine öğrenmesi modeli de tıpkı böyledir. Kod aynı kalsa bile dünya kaydıkça model sessizce kötüleşir. Bu yazıda veri kaymasını (drift), kavram kaymasını, performans düşüşünü nasıl fark edeceğimizi ve modeli ne zaman yeniden eğitmemiz gerektiğini sezgisel bir dille konuşacağız.

## Model neden "bayatlar"?

Bir model, eğitildiği andaki dünyanın bir fotoğrafıdır. O fotoğraftaki ilişkileri öğrenir ve gelecekte de aynı ilişkilerin geçerli olacağını varsayar. Sorun şu ki dünya durmaz: müşteri davranışları değişir, fiyatlar oynar, yeni ürünler çıkar, mevsimler döner, hatta bir kriz tüm alışkanlıkları bir gecede altüst eder. Model dünden öğrendiklerini bugüne uygularken, zemin ayağının altından kayar.

Buna genel olarak **kayma (drift)** denir. Kayma bir hata değildir; modelin doğasında olan bir aşınmadır. Tıpkı taze ekmeğin zamanla bayatlaması gibi, hiçbir model sonsuza dek taze kalmaz. Önemli olan kaymayı engellemek değil, onu erkenden fark edip zamanında müdahale etmektir.

> Klasik yazılım hatası "bozulur ve durur"; model kayması ise "yavaşça ve sessizce kötüleşir". İlki bir alarm çalar, ikincisi ise siz bakmadıkça hiç belli olmaz. Asıl tehlikeli olan da budur.

## Veri kayması mı, kavram kayması mı?

Kayma tek tip değildir. Doğru müdahaleyi seçebilmek için iki ana türü ayırt etmek gerekir.

-   **Veri kayması (data drift):** Modele gelen _girdilerin_ dağılımı değişir, ama girdiyle çıktı arasındaki ilişki aynı kalır. Örneğin bir kredi modeline gelen başvuranların yaş ortalaması zamanla düşer. Model hâlâ aynı mantıkla çalışır, ama daha önce az gördüğü bir bölgeye doğru sürüklenir. Buna kovaryat kayması (covariate shift) da denir.
-   **Kavram kayması (concept drift):** Girdiyle çıktı arasındaki _ilişkinin kendisi_ değişir. Yani aynı girdi artık farklı bir sonuca işaret eder. Örneğin bir dolandırıcılık modeli için "olağan" işlem davranışı, dolandırıcılar taktik değiştirdikçe başkalaşır. Girdiler aynı görünse bile "doğru cevap" kayar.

Aradaki fark kritik: veri kaymasında çoğu zaman daha güncel veriyle yeniden eğitim yeter. Kavram kaymasında ise modelin öğrendiği temel kuralın geçersizleştiğini kabul edip, belki yeni özellikler (feature) eklemeniz, hatta problemi yeniden tanımlamanız gerekebilir.

<div class="callout"><strong>İpucu:</strong> Veri kaymasını <em>etiket beklemeden</em> izleyebilirsiniz, çünkü yalnızca girdilere bakarsınız. Kavram kaymasını ölçmek için ise genelde gerçek sonucu (ground truth) beklemek gerekir; bu yüzden ona tepki vermek daha yavaştır ve erken sinyallere daha çok ihtiyaç duyarsınız.</div>

## Performans düşüşünü tespit etmek

Kaymayı iki açıdan dinleyebilirsiniz: doğrudan performanstan ve dolaylı girdi sinyallerinden.

### Doğrudan: gerçek sonuçla karşılaştırma

En net yol, modelin tahminini gerçek sonuçla kıyaslamaktır. Bir teslimat süresi modelinin tahmini ile gerçekleşen süre, ya da bir sınıflandırıcının kararı ile sonradan doğrulanan etiket. Doğruluk, F1, hata oranı gibi metrikleri zamanın bir fonksiyonu olarak çizdiğinizde, eğri aşağı kıvrılmaya başladığında alarm çalmalıdır. Sorun şu ki gerçek sonuç çoğu zaman gecikmeli gelir; bir kredinin geri ödenip ödenmeyeceğini öğrenmek aylar alabilir.

### Dolaylı: girdi dağılımını izleme

Gerçek sonuç gecikiyorsa, girdilerin dağılımını izleyerek erken uyarı alabilirsiniz. Eğitim verisindeki bir özelliğin dağılımıyla, bugün gelen verinin dağılımını karşılaştırırsınız. Bunun için yaygın araçlar şunlardır:

-   **Popülasyon Kararlılık İndeksi (PSI):** İki dağılım arasındaki farkı tek bir sayıya indirger; sektörde sıkça eşik tabanlı uyarı için kullanılır.
-   **Kolmogorov-Smirnov (KS) testi:** İki örneklemin aynı dağılımdan gelip gelmediğini sınar.
-   **Histogram/çeyreklik karşılaştırması:** Gözle de fark edilebilen, basit ve açıklanabilir bir yöntem.

Bir başka pratik sinyal de modelin **güven puanlarının** dağılımıdır. Model giderek daha kararsız (örneğin olasılıkları 0,5 civarında yığılmış) tahminler üretmeye başladıysa, bu çoğu zaman zeminin kaydığının habercisidir.

> Tek bir metriğe güvenmeyin. Girdi kaymasını izleyen erken bir sistem ile gerçek sonucu bekleyen kesin bir sistem birlikte çalışmalı: biri "bir şeyler değişiyor" der, diğeri "evet, gerçekten kötüleşti" diye doğrular.

## Yeniden eğitim tetikleyicileri

Kaymayı gördünüz; peki ne zaman yeniden eğiteceksiniz? Üç temel yaklaşım vardır ve çoğu olgun ekip bunları harmanlar.

1.  **Zamanlı (periyodik):** Belirli aralıklarla, örneğin her hafta veya her ay, en güncel veriyle yeniden eğitirsiniz. Basit ve öngörülebilir; ama ya gereksiz yere erken ya da geç kalabilir.
2.  **Tetikleyici tabanlı (reaktif):** Bir metrik (PSI, doğruluk, hata oranı) önceden belirlenen bir eşiği aştığında yeniden eğitim otomatik başlar. Daha verimli, çünkü yalnızca gerektiğinde çalışır; ama eşikleri iyi ayarlamak ister.
3.  **Sürekli/çevrim içi öğrenme:** Model yeni veri geldikçe kademeli olarak güncellenir. Güçlü ama tehlikeli: hatalı veya zehirli veri modeli hızla bozabileceği için sıkı korumalar gerektirir.

Hangisini seçerseniz seçin, üç kuralı asla atlamayın. Birincisi, yeniden eğitilen modeli yayına almadan önce sabit bir doğrulama setinde sınayın; daha yeni olması daha iyi olduğu anlamına gelmez. İkincisi, eski modeli hemen silmeyin; geri dönebilmek (rollback) için yedek tutun. Üçüncüsü, yeni modeli önce küçük bir trafik dilimine açıp (gölge dağıtım veya kademeli yayın) gerçek davranışını izleyin.

<div class="callout"><strong>İpucu:</strong> "Daha çok yeniden eğitim her zaman daha iyidir" bir efsanedir. Her yeniden eğitim, yeni bir regresyon ve gürültüye aşırı uyum riski taşır. Tetikleyiciyi gürültüye değil, anlamlı ve kalıcı kaymaya tepki verecek kadar sabırlı kurun.</div>

## Üretim ML sağlığı: bütünsel bir bakış

Drift, üretim sağlığının yalnızca bir parçasıdır. Sağlıklı bir ML sistemini bir hastanın düzenli kontrolü gibi düşünün; tek bir tahlile değil, birkaç hayati belirtiye birden bakarsınız:

-   **Veri kalitesi:** Eksik değerler, beklenmedik formatlar, bozuk veri kaynakları. Çoğu "model bozuldu" vakası aslında sessizce kırılan bir veri hattıdır.
-   **Girdi kayması:** Özellik dağılımlarının zaman içindeki seyri.
-   **Tahmin kayması:** Modelin çıktı dağılımı (örneğin onay oranı) ani biçimde değişti mi?
-   **Performans:** Gerçek sonuç geldiğinde ölçülen doğruluk ve iş metrikleri.
-   **Operasyonel sağlık:** Gecikme, hata oranı, maliyet; modelin yalnızca doğru değil, zamanında ve sürdürülebilir çalışması.

Bu katmanları birlikte izlediğinizde, bir sorun çıktığında doğru yere bakarsınız: önce veri mi bozuldu, dağılım mı kaydı, yoksa gerçekten kavram mı değişti? Bu ayrım, panikle gereksiz yeniden eğitim yapmakla, sorunun köküne inmek arasındaki farktır.

## Küçük bir izleme örneği

Aşağıda, girdi kaymasını PSI ile izleyip eşik aşıldığında yeniden eğitimi tetikleyen bir sözde-kod taslağı var. Amaç, kayma ölçümünü periyodik bir nabız kontrolüne dönüştürmek:

```python
# Bir özelliğin kaymasını PSI ile izle
def psi(beklenen, gozlenen, kova_sayisi=10):
    kovalar = quantile_kovalari(beklenen, kova_sayisi)
    deger = 0.0
    for k in kovalar:
        b = oran(beklenen, k)      # eğitimdeki pay
        g = oran(gozlenen, k)      # bugünkü pay
        b, g = max(b, 1e-4), max(g, 1e-4)
        deger += (g - b) * log(g / b)
    return deger

# Periyodik sağlık kontrolü
for ozellik in izlenen_ozellikler:
    skor = psi(egitim[ozellik], bugun[ozellik])
    kaydet(ozellik=ozellik, psi=skor)
    if skor > 0.2:                  # belirgin kayma eşiği
        uyari(f"{ozellik} kaydi", psi=skor)
        yeniden_egitim_tetikle()    # önce doğrulama, sonra yayın
```

Buradaki kilit nokta eşik mantığıdır. Yaygın bir sezgi olarak PSI 0,1'in altında kayma ihmal edilebilir, 0,1-0,2 arası dikkat, 0,2 üstü belirgin kabul edilir; ama bu sınırlar mutlak değildir, kendi sisteminizin geçmiş gürültüsüne göre kalibre edilmelidir. Ayrıca tetikleyici doğrudan yayına değil, önce bir doğrulama adımına bağlanır: yeni model gerçekten daha iyiyse yayına alınır, değilse eski model yerinde kalır.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Hiçbir model sonsuza dek taze kalmaz; dünya değiştikçe model sessizce <strong>kayar (drift)</strong>. Amaç engellemek değil, erken fark etmektir.</li><li><strong>Veri kaymasında</strong> girdilerin dağılımı, <strong>kavram kaymasında</strong> girdi-çıktı ilişkisinin kendisi değişir; ikisi farklı müdahale ister.</li><li>Performansı hem doğrudan (gerçek sonuçla) hem dolaylı (girdi dağılımı, güven puanları) izleyin; biri erken uyarır, diğeri doğrular.</li><li>Yeniden eğitim periyodik, tetikleyici tabanlı veya sürekli olabilir; her zaman doğrulama, yedek (rollback) ve kademeli yayınla birlikte yapın.</li><li>Drift, üretim sağlığının bir parçasıdır; veri kalitesi, tahmin kayması ve operasyonel metrikleri birlikte izleyin.</li></ul></div>

<div class="faq"><details><summary>Veri kayması ile kavram kayması arasındaki fark nedir?</summary><p>Veri kaymasında modele gelen girdilerin dağılımı değişir, ama girdi-çıktı ilişkisi aynı kalır; genelde güncel veriyle yeniden eğitim yeterlidir. Kavram kaymasında ise ilişkinin kendisi değişir, yani aynı girdi artık farklı bir sonuca işaret eder; bu durumda yeni özellikler eklemek ya da problemi yeniden tanımlamak gerekebilir.</p></details><details><summary>Gerçek sonuçlar gecikmeliyken kaymayı nasıl yakalarım?</summary><p>Etiketleri beklemek yerine girdilerin dağılımını izleyin. PSI, KS testi veya basit histogram karşılaştırmalarıyla eğitim verisi ile güncel veriyi kıyaslayabilir, modelin güven puanlarındaki dağılım değişimini takip edebilirsiniz. Bunlar gerçek sonuç gelmeden önce erken uyarı verir; sonuç geldiğinde de kesin performans ölçümüyle doğrularsınız.</p></details><details><summary>Modeli ne sıklıkla yeniden eğitmeliyim?</summary><p>Tek bir doğru cevap yoktur; alanınızın değişim hızına bağlıdır. Hızlı değişen alanlarda (örneğin dolandırıcılık) sık, durağan alanlarda seyrek eğitim gerekir. En sağlam yol, periyodik bir tabanla tetikleyici tabanlı uyarıları birleştirmek ve her yeniden eğitimi yayın öncesi doğrulamadan geçirmektir. Unutmayın: gereksiz sık eğitim, yeni regresyon ve gürültüye aşırı uyum riski taşır.</p></details></div>

---

Özetle, bir modeli üretime almak yarışın başıdır, sonu değil. Gerçek iş, dünya kaydıkça modeli ayakta ve dürüst tutmaktır. Veri ve kavram kaymasını izleyen, performans düşüşünü erkenden yakalayan ve yeniden eğitimi disiplinli tetikleyicilere bağlayan bir sistem kurduğunuzda, modeliniz bayatlamaya mahkûm bir fotoğraf olmaktan çıkıp canlı ve güvenilir bir varlığa dönüşür. Üretimde sağlıklı, izlenebilir ve sürdürülebilir yapay zeka sistemleri kurmayı planlıyorsanız, [HatsonTech](/posts/hatsontech-nedir/) ekibi bu yapıyı sizinle birlikte tasarlamaktan memnuniyet duyar.
