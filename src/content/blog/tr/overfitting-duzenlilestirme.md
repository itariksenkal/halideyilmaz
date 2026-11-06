---
title: "Aşırı Öğrenme (Overfitting) ve Düzenlileştirme: Model Neden Ezberler?"
description: "Model neden ezberler? Aşırı öğrenme ve düzenlileştirmeyi sezgisel anlatıyoruz: dropout, L1/L2, erken durdurma ve çapraz doğrulama günlük örneklerle."
publishDate: "2026-08-09T23:47:00+03:00"
lang: tr
category: "Temeller"
tags: ["Temeller", "Yapay Zeka"]
translation: "overfitting-regularization"
heroImage:
  src: "../../../assets/blog/bimg-03.jpg"
  alt: "Aşırı Öğrenme (Overfitting) ve Düzenlileştirme: Model Neden Ezberler?"
---

Bir öğrenci sınava çalışırken konuyu anlamak yerine geçmiş yılların sorularını ve cevaplarını ezberlerse, tanıdık sorularda parlak ama biraz değiştirilmiş yeni bir soruda çaresiz kalır. Makine öğrenmesi modelleri de aynı tuzağa düşebilir: eğitim verisini "ezberleyip" gerçek dünyada tökezlerler. Bu duruma **aşırı öğrenme (overfitting)** denir. Bu yazıda modelin neden ezberlediğini sezgisel olarak anlatıyor; dropout, L1/L2, erken durdurma ve çapraz doğrulama gibi **düzenlileştirme** araçlarını günlük örneklerle açıyoruz.

## 1\. Ezberleyen öğrenci: overfitting nedir?

Bir modeli eğitmek, ona örnekler gösterip "bu girdiye bu çıktı uyar" demektir. Amaç, modelin örneklerin _altında yatan kuralı_ öğrenmesidir; tek tek örnekleri değil. Ne var ki yeterince esnek bir model, eğitim verisindeki her gürültüyü, her rastlantısal ayrıntıyı da öğrenmeye meyleder. Buna aşırı öğrenme denir.

İşaretleri basittir: model eğitim verisinde neredeyse kusursuz (%99 isabet) ama daha önce görmediği veride zayıftır (%70 isabet). Aradaki bu uçurum, modelin genel kuralı değil, eğitim örneklerinin kendine has detaylarını ezberlediğinin habercisidir.

> Aşırı öğrenme, ormanı görmek yerine her bir ağacın yaprak sayısını ezberlemektir. Yeni bir orman gösterildiğinde model şaşırır.

Zıt uç ise **yetersiz öğrenmedir (underfitting)**: model fazla basittir, eğitim verisinde bile kötüdür. Sanki öğrenci konuya hiç çalışmamıştır. İyi bir model bu ikisi arasında, "yeterince ama fazla değil" dengesini tutturur.

## 2\. Yanlılık-varyans dengesi

Bu dengeyi anlatan klasik çerçeve **yanlılık-varyans (bias-variance)** ikilisidir.

-   **Yüksek yanlılık (bias):** Model fazla katı varsayımlar yapar, örüntüyü kaçırır. Bu, yetersiz öğrenmedir. Tüm verileri bir doğruyla geçmeye çalışan, ama veri eğri olan bir model gibi.
-   **Yüksek varyans:** Model eğitim verisine aşırı duyarlıdır; küçük değişiklikler tahminleri allak bullak eder. Bu, aşırı öğrenmedir.

Bir okçuyu düşünün. Yüksek yanlılık, okların hep aynı yere ama hedeften uzağa saplanmasıdır (tutarlı ama yanlış). Yüksek varyans ise okların hedefin etrafına dağılmasıdır (ortalamada doğru ama savruk). Hedef, okları hem hedefe yakın hem de derli toplu tutmaktır. **Düzenlileştirme (regularization)** dediğimiz teknikler tam da varyansı kısıp bu dengeyi sağlamaya yarar.

<div class="callout"><strong>İpucu:</strong> Eğitim ve doğrulama hatasını birlikte izleyin. İkisi de yüksekse yetersiz öğrenme, eğitim düşük ama doğrulama yüksekse aşırı öğrenme vardır. Teşhis, tedaviden önce gelir.</div>

## 3\. Dropout: rastgele dinlenmeye yollamak

Sinir ağlarında çok etkili bir yöntem **dropout**'tur. Fikir şaşırtıcı derecede basit: her eğitim adımında, ağdaki nöronların rastgele bir kısmını (örneğin %20-50'sini) geçici olarak kapatırsınız. O adımda sanki o nöronlar hiç yokmuş gibi davranılır.

Neden işe yarar? Bir takım hayal edin: eğer her işi hep aynı yıldız oyuncu yapıyorsa, o oyuncu sakatlandığında takım çöker. Ama antrenmanlarda rastgele oyuncuları dinlendirirseniz, herkes her rolü öğrenmek zorunda kalır; takım daha dayanıklı olur. Dropout da nöronların birbirine fazla bel bağlamasını (ko-adaptasyon) engeller, ağı daha sağlam örüntüler öğrenmeye zorlar.

Önemli bir ayrıntı: dropout yalnızca _eğitim_ sırasında uygulanır. Tahmin (çıkarım) anında tüm nöronlar açıktır, çünkü artık modelin tüm gücünü kullanmak isteriz.

```python
# Sözde-kod: tek bir katmanda dropout (yalnızca eğitimde)
def dropout(x, p=0.3, egitim=True):
    if not egitim:
        return x                      # cikarimda hicbir noron kapatilmaz
    mask = (rand_like(x) > p)         # her noron icin: %p ihtimalle kapat
    return x * mask / (1 - p)         # olcekle ki ortalama deger korunsun
```

## 4\. L1 ve L2: ağırlıkları dizginlemek

Bir modelin "ezberleme" eğilimi çoğu zaman ağırlıklarının (parametrelerinin) aşırı büyümesinden belli olur. Çok büyük ağırlıklar, modelin tek tek örneklere keskin tepkiler vermesi demektir. **L1 ve L2 düzenlileştirmesi**, kayıp (loss) fonksiyonuna bir ceza ekleyerek ağırlıkları küçük tutmaya teşvik eder.

-   **L2 (ağırlık sönümleme / weight decay):** Ağırlıkların karelerinin toplamını cezalandırır. Tüm ağırlıkları nazikçe sıfıra doğru iter ama tam sıfır yapmaz. Sonuç: daha yumuşak, daha dengeli bir model.
-   **L1:** Ağırlıkların mutlak değerlerini cezalandırır. İlginç bir yan etkisi vardır: birçok ağırlığı tam sıfıra çeker. Bu, modelin gereksiz özellikleri (feature) tamamen elemesini, yani bir tür otomatik özellik seçimi yapmasını sağlar.

Sezgisel analoji: bir valiz hazırlıyorsunuz. L2 size "her şeyi al ama her birinden azar azar" der; L1 ise "gerçekten gerekmeyenleri tamamen çıkar" der. İkisi de bavulu hafifletir, ama farklı felsefelerle.

Matematiksel olarak yeni hedef şudur: _toplam kayıp = veri kaybı + λ × ceza_. Buradaki **λ (lambda)** ceza katsayısıdır: büyük λ daha sert düzenlileştirme (daha basit model), küçük λ daha gevşek demektir. Doğru λ'yı bulmak, dengeyi kurmanın anahtarıdır.

## 5\. Erken durdurma: tam zamanında durmak

Bir modeli eğitirken her turda (epoch) ağırlıklar biraz daha iyileşir. Başlangıçta hem eğitim hem doğrulama hatası düşer. Ama bir noktadan sonra ilginç bir şey olur: eğitim hatası düşmeye devam ederken doğrulama hatası _artmaya_ başlar. İşte tam o an, model genel kuralı öğrenmeyi bırakıp eğitim verisini ezberlemeye geçmiştir.

**Erken durdurma (early stopping)**, doğrulama hatasının dibe vurduğu o anı yakalayıp eğitimi durdurmaktır. Pratikte: doğrulama hatası belirli sayıda turda (örneğin 5 tur) iyileşmezse eğitimi keser ve en iyi noktadaki ağırlıkları geri yükleriz. Yani fırını tam kıvamında kapatmak; keki ne çiğ bırakmak ne de yakmak.

<div class="callout"><strong>İpucu:</strong> Erken durdurma neredeyse bedava bir düzenlileştirmedir; sadece doğrulama hatasını izlemek yeter. Üstelik gereksiz eğitim turlarını keserek zamandan ve hesaplama maliyetinden de tasarruf ettirir.</div>

## 6\. Çapraz doğrulama: dürüst bir sınav

Bütün bu tekniklerin işe yarayıp yaramadığını nasıl anlarız? Modeli eğittiğimiz veriyle test edersek, ezbere kanarız. Bu yüzden veriyi ayırırız: bir kısmıyla eğitir, ayırdığımız bir kısmıyla sınarız. Ama tek bir ayrım şanslı (ya da şanssız) bir bölünmeye denk gelebilir.

**k-katlı çapraz doğrulama (k-fold cross-validation)** bu sorunu çözer. Veriyi k eşit parçaya (örneğin 5) bölersiniz. Sonra k tur yaparsınız: her turda bir parçayı sınav, kalan dördünü eğitim için kullanırsınız. Sırayla her parça bir kez sınav olur. Sonuçların ortalamasını alırsınız.

Bu, bir sınavı tek bir öğretmenin değil, beş farklı öğretmenin ayrı ayrı değerlendirmesi gibidir; tek bir kişinin önyargısına ya da şansa bağlı kalmazsınız. Çapraz doğrulama hem modelin gerçek performansını dürüstçe ölçer hem de λ gibi ayarları (hiperparametreleri) seçmek için güvenilir bir zemin sağlar.

```python
# Sözde-kod: 5-katli capraz dogrulama
parcalar = veriyi_bol(veri, k=5)
skorlar = []
for i in range(5):
    sinav   = parcalar[i]                 # bu tur sinav
    egitim  = tum_parcalar_haric(i)       # kalan 4 parca
    model   = egit(egitim)
    skorlar.append(degerlendir(model, sinav))
print("Ortalama skor:", ortalama(skorlar))   # daha dürüst bir tahmin
```

## 7\. Pratikte hepsini birleştirmek

Gerçek projelerde bu araçlar birbirinin alternatifi değil, tamamlayıcısıdır. Tipik bir sinir ağı eğitiminde dropout, L2 (weight decay) ve erken durdurmayı aynı anda kullanmak; λ ve dropout oranı gibi seçimleri çapraz doğrulamayla ayarlamak yaygındır. Ayrıca en güçlü düzenlileştiricinin çoğu zaman **daha fazla ve daha temiz veri** olduğunu unutmamak gerekir: model ne kadar çok gerçek örnek görürse, gürültüyü ezberlemesi o kadar zorlaşır.

Veri toplamak pahalıysa **veri çoğaltma (data augmentation)** devreye girer: görselleri döndürmek, kırpmak, metinleri eşanlamlılarla yeniden ifade etmek gibi yöntemlerle aynı veriden daha çeşitli örnekler türetilir. Tüm bu yaklaşımların ortak amacı tektir: modeli ezberden uzaklaştırıp genelleştirmeye yöneltmek.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Aşırı öğrenme, modelin genel kuralı değil eğitim verisinin gürültüsünü ezberlemesidir; belirtisi eğitimde yüksek, gerçek veride düşük başarıdır.</li><li>Yanlılık-varyans dengesi, "fazla basit" ile "fazla karmaşık" arasındaki dengeyi tarif eder; düzenlileştirme varyansı kısar.</li><li>Dropout, eğitimde nöronları rastgele kapatarak ağın belirli yollara bağımlı kalmasını engeller.</li><li>L2 ağırlıkları nazikçe küçültür; L1 birçok ağırlığı sıfırlayarak otomatik özellik seçimi yapar. λ cezanın şiddetini ayarlar.</li><li>Erken durdurma, doğrulama hatası artmaya başladığı anda eğitimi keser; ucuz ve etkili bir düzenlileştirmedir.</li><li>Çapraz doğrulama, performansı dürüstçe ölçer ve hiperparametre seçimini güvenilir kılar.</li><li>En güçlü düzenlileştirici çoğu zaman daha fazla, daha temiz veridir; mümkünse veri çoğaltma ile desteklenir.</li></ul></div>

<div class="faq"><details><summary>Modelimin aşırı öğrendiğini nasıl anlarım?</summary><p>En net işaret, eğitim başarısı ile doğrulama başarısı arasındaki büyük açıktır. Model eğitim verisinde çok iyi (örneğin %98) ama görmediği doğrulama verisinde belirgin biçimde kötüyse (örneğin %75), büyük olasılıkla ezberliyordur. Eğitim ve doğrulama hatası eğrilerini birlikte çizmek bu teşhisi kolaylaştırır.</p></details><details><summary>L1 mi L2 mi kullanmalıyım?</summary><p>Duruma bağlı. Eğer çok sayıda özelliğiniz var ve bunların çoğunun gereksiz olduğundan şüpheleniyorsanız, L1 işe yarar çünkü gereksizleri sıfırlayıp seyrek (sparse) bir model üretir. Genel amaçlı, daha pürüzsüz bir model için L2 tercih edilir. İkisini birlikte kullanan (Elastic Net) yöntemler de vardır.</p></details><details><summary>Daha fazla veri toplamak her zaman çözüm müdür?</summary><p>Çoğu zaman en etkili çözümdür, çünkü model gerçek örnekler arttıkça gürültüyü ezberlemekte zorlanır. Ancak veri pahalı ya da kıt olabilir; o durumda veri çoğaltma, dropout, L1/L2 ve erken durdurma gibi tekniklerle aynı veriden daha fazla genelleme çıkarmaya çalışırız. Pratikte hepsi birlikte kullanılır.</p></details></div>

---

Özetle: aşırı öğrenme, makine öğrenmesinin en yaygın tuzağıdır ama teşhisi ve tedavisi bellidir. Yanlılık-varyans dengesini gözeterek dropout, L1/L2, erken durdurma ve çapraz doğrulamayı bir arada kullandığınızda, ezberleyen değil _genelleştiren_ modeller elde edersiniz. Türkçe odaklı yapay zeka modellerinin gerçek dünyada nasıl sağlam kurulduğunu merak ediyorsanız, [HatsonTech](/posts/hatsontech-nedir/)'in çalışmalarına göz atabilirsiniz.
