---
title: "Sınıflandırma Metrikleri: Doğruluk, Kesinlik, Duyarlılık, F1 ve ROC-AUC Ne Zaman Kullanılır?"
description: "Karışıklık matrisinden başlayarak doğruluk, kesinlik (precision), duyarlılık (recall), F1 ve ROC-AUC'yi günlük örneklerle anlatıyor; hangi metriğin ne zaman doğru seçim olduğunu netleştiriyoruz."
publishDate: "2026-08-09T23:45:00+03:00"
lang: tr
category: "Ölçme"
tags: ["Ölçme", "Yapay Zeka"]
translation: "classification-metrics"
heroImage:
  src: "../../../assets/blog/bimg-05.jpg"
  alt: "Sınıflandırma Metrikleri: Doğruluk, Kesinlik, Duyarlılık, F1 ve ROC-AUC Ne Zaman Kullanılır?"
---

Bir model "%95 doğru" diyor diye rahatlamak çoğu zaman erkendir. Hastaların yalnızca %1'inin hasta olduğu bir testte, "herkes sağlıklı" diyen aptal bir model bile %99 doğruluğa ulaşır; ama tek bir hastayı bile yakalayamaz. İşte bu yüzden sınıflandırma modellerini değerlendirmek için doğruluğun ötesine geçmek gerekir. Bu yazıda **doğruluk, kesinlik (precision), duyarlılık (recall), F1 ve ROC-AUC**'u günlük örneklerle anlatıyor; karışıklık matrisini açıyor ve hangi metriğin ne zaman doğru seçim olduğunu netleştiriyoruz.

## 1\. Karışıklık matrisi: dört temel kutu

Tüm sınıflandırma metrikleri tek bir tablodan doğar: **karışıklık matrisi (confusion matrix)**. İkili (ikiye ayıran) bir problemde model her örnek için "pozitif" ya da "negatif" der; gerçek de pozitif ya da negatiftir. Bu iki eksen birbiriyle kesişince dört kutu çıkar:

-   **Doğru Pozitif (TP):** Model "pozitif" dedi, gerçekten de pozitifti. Yangın var dedik, yangın vardı.
-   **Doğru Negatif (TN):** Model "negatif" dedi, gerçekten de negatifti. Yangın yok dedik, yangın yoktu.
-   **Yanlış Pozitif (FP):** Model "pozitif" dedi ama aslında negatifti. Boşuna alarm çaldı (yanlış alarm).
-   **Yanlış Negatif (FN):** Model "negatif" dedi ama aslında pozitifti. Gerçek yangını gözden kaçırdık.

Bütün metrikler bu dört sayının farklı kombinasyonlarıdır. Onları anladığınızda gerisi sezgisel olarak yerine oturur.

```text
              Tahmin: Pozitif    Tahmin: Negatif
Gerçek: Poz.       TP                 FN
Gerçek: Neg.       FP                 TN
```

> Yanlış pozitif "yok yere telaş", yanlış negatif ise "kaçırılan tehlike"dir. Hangisinin daha pahalı olduğu, tamamen probleminize bağlıdır.

## 2\. Doğruluk ve yanıltıcı yüzü

**Doğruluk (accuracy)** en sezgisel metriktir: doğru tahminlerin tüm tahminlere oranı.

_Doğruluk = (TP + TN) / (TP + TN + FP + FN)_

Sınıflar dengeli olduğunda (örneğin %50 pozitif, %50 negatif) doğruluk gayet makul bir özettir. Ama sınıflar dengesizse tehlikeli biçimde yanıltır. Girişteki örneği hatırlayın: hastalık nadirse, hiçbir şey öğrenmeyen "herkes sağlıklı" modeli yüksek doğruluk verir. Sayı parlak görünür ama model işe yaramaz.

<div class="callout"><strong>İpucu:</strong> Sınıf oranlarına bakmadan doğruluğa güvenmeyin. Pozitif sınıf %5 ise, %95 doğruluk hiçbir şey öğrenmemiş olabilir. Önce veri dağılımını sorun.</div>

## 3\. Kesinlik: alarm çaldığında ne kadar güvenebiliriz?

**Kesinlik (precision)** şu soruyu yanıtlar: _Model "pozitif" dediğinde, ne kadar haklı çıkıyor?_

_Kesinlik = TP / (TP + FP)_

Yani modelin tüm pozitif tahminleri içinde gerçekten doğru olanların oranıdır. Bir e-posta spam filtresini düşünün. Filtre bir maili spam kutusuna attığında, gerçekten spam mi? Eğer kesinlik düşükse, önemli bir iş maili spam'e düşer ve gözden kaçar. Burada **yanlış pozitif pahalıdır**: temiz maili spam saymak kullanıcıyı kızdırır. Bu yüzden spam filtrelerinde yüksek kesinlik istenir.

Kısacası kesinlik, "alarm çaldığında ona güvenebilir miyim?" sorusunun cevabıdır. Yanlış alarmlardan kaçınmak istiyorsanız kesinliğe bakın.

## 4\. Duyarlılık: kaçırdıklarımızın hesabı

**Duyarlılık (recall)**, diğer adıyla hassasiyet, tam ters açıdan bakar: _Gerçekten pozitif olanların kaçını model yakalayabildi?_

_Duyarlılık = TP / (TP + FN)_

Bu kez kanser taraması düşünün. Gerçekten hasta olan kişilerin kaçını test "hasta" diye işaretleyebiliyor? Burada **yanlış negatif felakettir**: gerçek bir hastayı "sağlıklı" deyip eve göndermek, tedavinin gecikmesi demektir. Böyle durumlarda birkaç yanlış alarma (düşük kesinlik) razı olur, ama hiçbir gerçek vakayı kaçırmamak (yüksek duyarlılık) isteriz.

> Kesinlik "yakaladıklarımın ne kadarı doğru?", duyarlılık "doğruların ne kadarını yakaladım?" sorusudur. İkisi çoğu zaman birbiriyle çekişir.

Neden çekişirler? Modelin eşiğini düşürüp daha cömert davranmasını sağlarsanız (her şüpheye "pozitif" derseniz), daha çok gerçek vakayı yakalar (duyarlılık artar) ama yanlış alarmlar da çoğalır (kesinlik düşer). Eşiği yükseltmek tersini yapar. Bu denge, metrik seçiminin kalbinde yatar.

## 5\. F1: kesinlik ile duyarlılığın ortak paydası

Peki tek bir sayı isterseniz? **F1 skoru**, kesinlik ile duyarlılığın _harmonik ortalamasıdır_.

_F1 = 2 × (Kesinlik × Duyarlılık) / (Kesinlik + Duyarlılık)_

Neden sıradan (aritmetik) ortalama değil de harmonik? Çünkü harmonik ortalama, iki değerden biri çok düşükse sonucu sertçe aşağı çeker. Kesinlik %100 ama duyarlılık %1 olan bir model, aritmetik ortalamayla %50,5 gibi gösterişli bir not alır; oysa neredeyse hiçbir vakayı yakalamadığı için işe yaramaz. F1 ise bunu yaklaşık %2'ye indirir ve gerçeği söyler. F1, ikisinin de makul derecede iyi olmasını ister; biri çökerse F1 de çöker.

```text
# Sözde-kod: dört sayidan metrikler
kesinlik  = TP / (TP + FP)
duyarlilik = TP / (TP + FN)
f1        = 2 * kesinlik * duyarlilik / (kesinlik + duyarlilik)

# Ornek: TP=8, FP=2, FN=4
# kesinlik = 8/10 = 0.80
# duyarlilik = 8/12 ≈ 0.67
# f1 = 2*0.80*0.67 / (0.80+0.67) ≈ 0.73
```

F1, sınıflar dengesizken doğruluğun yerini alan iyi bir tek-sayı özetidir. Yine de hangi hatanın daha pahalı olduğunu önemsiyorsanız, kesinlik ve duyarlılığı ayrı ayrı görmek F1'den daha bilgilendiricidir.

## 6\. ROC-AUC: eşiğe bağlı olmayan bir bakış

Şimdiye kadarki metriklerin hepsi belirli bir **karar eşiğine** (örneğin "olasılık 0,5'ten büyükse pozitif") bağlıydı. Ama eşiği değiştirdikçe kesinlik ve duyarlılık da değişir. Modeli tek bir eşikten bağımsız, bütünsel değerlendirmenin bir yolu var mı? İşte **ROC eğrisi** burada devreye girer.

ROC eğrisi, tüm olası eşikler için iki oranı karşılaştırır: dikeyde **gerçek pozitif oranı** (yani duyarlılık), yatayda **yanlış pozitif oranı** (FP / (FP + TN)). Eşiği gevşettikçe ikisi de artar; eğri bu gidişatı çizer.

**AUC (eğri altındaki alan)**, bu eğrinin altında kalan alandır ve 0 ile 1 arasında bir sayıdır. Sezgisel anlamı çok hoştur: AUC, _rastgele seçilmiş bir pozitif örneğe, rastgele seçilmiş bir negatif örnekten daha yüksek skor verme olasılığıdır_. AUC = 0,5 yazı-tura kadar kötü (model sıralama yapamıyor); AUC = 1,0 kusursuz ayrımdır. AUC'nin güzelliği, eşik seçiminden bağımsız olarak modelin pozitifleri negatiflerden ne kadar iyi _sıralayabildiğini_ ölçmesidir.

<div class="callout"><strong>İpucu:</strong> Sınıflar çok dengesizse ROC-AUC iyimser görünebilir. Böyle durumlarda kesinlik-duyarlılık eğrisi ve onun altındaki alan (PR-AUC) çoğu zaman daha dürüst bir resim verir.</div>

## 7\. Hangi metrik ne zaman?

Tek bir "en iyi" metrik yoktur; doğru metrik probleminizin maliyet yapısına bağlıdır. Pratik bir pusula:

-   **Sınıflar dengeli ve hatalar eşit maliyetli:** Doğruluk yeterli ve anlaşılırdır.
-   **Yanlış pozitif pahalı:** Kesinliğe odaklanın. (Spam filtresi, sahtekârlık alarmı kullanıcıya gösterildiğinde, yargı/içerik moderasyonu.)
-   **Yanlış negatif pahalı:** Duyarlılığa odaklanın. (Kanser taraması, güvenlik tehdidi tespiti, dolandırıcılık yakalama.)
-   **İkisini de dengelemek istiyorsanız ve sınıflar dengesizse:** F1 iyi bir tek-sayı özetidir.
-   **Eşikten bağımsız sıralama kalitesi:** ROC-AUC; çok dengesiz veride ise PR-AUC.

En sağlıklı yaklaşım çoğu zaman tek bir sayıya yaslanmamaktır. Karışıklık matrisini, kesinliği, duyarlılığı ve F1'i birlikte raporlamak; sonra probleminizin "hangi hata daha pahalı?" sorusuna göre birini öne çıkarmaktır. Metrik seçimi teknik değil, aslında bir iş kararıdır.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Tüm metrikler karışıklık matrisinin dört kutusundan (TP, TN, FP, FN) doğar.</li><li>Doğruluk sezgiseldir ama dengesiz sınıflarda yanıltıcıdır; önce veri dağılımına bakın.</li><li>Kesinlik "alarm çaldığında ne kadar güvenilir?", duyarlılık "gerçek vakaların kaçını yakaladım?" sorusudur.</li><li>Kesinlik ve duyarlılık genelde çekişir; eşiği oynatmak biri lehine diğeri aleyhine sonuç verir.</li><li>F1, ikisinin harmonik ortalamasıdır; biri çok düşükse F1 de düşer, bu yüzden dürüst bir tek-sayı özetidir.</li><li>ROC-AUC eşikten bağımsız sıralama kalitesini ölçer; çok dengesiz veride PR-AUC daha dürüsttür.</li><li>Doğru metrik, hangi hatanın (yanlış pozitif mi, yanlış negatif mi) daha pahalı olduğuna göre seçilir.</li></ul></div>

<div class="faq"><details><summary>Yüksek doğruluk neden her zaman iyi bir işaret değildir?</summary><p>Çünkü sınıflar dengesizse doğruluk azınlık sınıfını görmezden gelerek de yükselebilir. Pozitiflerin yalnızca %1 olduğu bir veride "her şey negatif" diyen model %99 doğruluğa ulaşır ama tek bir pozitif örneği bile yakalayamaz. Bu yüzden doğruluğu mutlaka kesinlik ve duyarlılıkla birlikte değerlendirin.</p></details><details><summary>Kesinlik ile duyarlılık arasında nasıl seçim yaparım?</summary><p>Hangi hatanın daha pahalı olduğuna bakın. Yanlış alarm pahalıysa (örneğin temiz bir maili spam saymak) kesinliği öne alın. Gerçek bir vakayı kaçırmak felaketse (örneğin bir hastalığı atlamak) duyarlılığı öne alın. İkisini birden dengelemek istiyorsanız F1 skoru pratik bir orta yoldur.</p></details><details><summary>ROC-AUC ile PR-AUC arasındaki fark nedir?</summary><p>ROC-AUC, gerçek pozitif oranı ile yanlış pozitif oranını karşılaştırır ve genel sıralama kalitesini ölçer. Ancak sınıflar çok dengesizse iyimser görünebilir, çünkü çok sayıda doğru negatif paydayı şişirir. Kesinlik-duyarlılık (PR) eğrisi yalnızca pozitif sınıfa odaklandığı için böyle durumlarda daha dürüst bir resim verir.</p></details></div>

---

Özetle: bir modeli tek bir sayıyla yargılamak çoğu zaman aldatıcıdır. Karışıklık matrisini okumayı öğrenip kesinlik, duyarlılık, F1 ve ROC-AUC'yi birlikte kullandığınızda, modelinizin gerçekte ne yaptığını net görürsünüz. Doğru metriği seçmek nihayetinde teknik bir tercih değil, "hangi hata bizim için daha pahalı?" sorusuna verilen iş kararıdır. Türkçe odaklı yapay zeka modellerinin gerçek dünyada nasıl titizlikle değerlendirildiğini merak ediyorsanız, [HatsonTech](/posts/hatsontech-nedir/)'in çalışmalarına göz atabilirsiniz.
