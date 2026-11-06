---
title: "Sınıf Dengesizliği: Nadir Olayı Kaçırmayan Model Nasıl Kurulur?"
description: "Dolandırıcılık, arıza ya da nadir hastalık gibi problemlerde pozitif sınıf çok azdır. Yeniden örnekleme, sınıf ağırlıkları, eşik ayarı ve PR eğrisi ile dengesiz veride doğru modeli nasıl kurarsınız?"
publishDate: "2026-08-09T23:58:00+03:00"
lang: tr
category: "Değerlendirme"
tags: ["Değerlendirme", "Yapay Zeka"]
translation: "class-imbalance"
heroImage:
  src: "../../../assets/blog/covers/sinif-dengesizligi.jpg"
  alt: "Sınıf Dengesizliği: Nadir Olayı Kaçırmayan Model Nasıl Kurulur?"
---

Bin işlemden yalnızca üçü dolandırıcılıksa, hiçbir şeyi yakalamayan ve her zaman "temiz" diyen bir model yüzde 99,7 doğruluk elde eder. Rakam etkileyicidir, model işe yaramaz. **Sınıf dengesizliği**, makine öğrenmesinde metriklerin en kolay yanılttığı yerdir — ve tam da en çok önemsediğimiz problemlerde karşımıza çıkar.

## Doğruluk neden yanıltır

Doğruluk (accuracy), tüm tahminler içinde doğru olanların oranıdır. Sınıflar dengeliyken anlamlıdır. Pozitif sınıf toplamın binde üçüyse, çoğunluğu tahmin eden bir model neredeyse mükemmel görünür. Bu yüzden dengesiz problemlerde doğruluk raporlanmaya değmez.

Bir yangın alarmını düşünün: yılda bir kez çalması gereken bir cihazın "hiç çalmama" stratejisi de yüzde 99,7 doğrudur.

<div class="callout"><strong>İlk soru:</strong> Hangi hata daha pahalı? Kaçırılan bir dolandırıcılık mı, yoksa yanlış yere bloke edilen bir müşteri mi? Bu cevabı bilmeden metrik seçilemez.</div>

## Veri seviyesinde çözümler

En doğrudan yaklaşım, veri dağılımını değiştirmektir:

-   **Aşırı örnekleme:** Azınlık sınıfını çoğaltmak. En basit hali kopyalamaktır; SMOTE gibi yöntemler ise komşular arasında yeni örnekler üretir.
-   **Az örnekleme:** Çoğunluk sınıfından örnek atmak. Veri bolsa hızlıdır, ama bilgi kaybı riski taşır.
-   **Karma:** İkisini birlikte, ölçülü dozda kullanmak.

Kritik ayrıntı: _yeniden örnekleme yalnızca eğitim kümesine uygulanır_. Doğrulama ve test kümeleri gerçek dünyadaki dağılımı korumalıdır, yoksa ölçtüğünüz sayı gerçeği yansıtmaz.

## Algoritma seviyesinde çözümler

Veriye dokunmadan, modelin kayıp fonksiyonuna müdahale edebilirsiniz. Sınıf ağırlıkları, azınlık sınıfındaki hatayı daha pahalı hale getirir; model de doğal olarak o sınıfa daha çok dikkat eder. Çoğu kütüphanede bu tek bir parametredir ve genellikle yeniden örneklemeden daha az yan etkisi vardır.

## Asıl kaldıraç: karar eşiği

Çoğu sınıflandırıcı aslında bir olasılık üretir; 0,5 eşiği yalnızca bir varsayılandır ve dengesiz problemlerde nadiren doğru seçimdir. Eşiği düşürmek duyarlılığı (recall) artırır, kesinliği (precision) düşürür; yükseltmek tersini yapar.

Bu, modeli yeniden eğitmeden yapılabilen en ucuz ve en etkili ayardır. Doğru eşik, teknik bir karar değil _iş kararıdır_: kaç yanlış alarma katlanabileceğinize bağlıdır.

## Hangi metriğe bakmalı?

| Metrik | Ne söyler | Dengesiz veride |
| --- | --- | --- |
| Doğruluk | Genel isabet | Yanıltıcı |
| Kesinlik | Alarm verdiğinde haklı mı | Anlamlı |
| Duyarlılık | Gerçek vakaların kaçını yakaladı | Anlamlı |
| ROC-AUC | Sıralama kalitesi | İyimser görünebilir |
| PR-AUC | Azınlık sınıfına odaklı sıralama | Tercih edilen |

Dengesiz problemlerde ROC eğrisi genellikle fazla iyimserdir, çünkü çok sayıda gerçek negatif yanlış pozitif oranını küçük gösterir. Precision-Recall eğrisi bu tuzağa düşmez.

## Sık sorulanlar

<div class="faq"><details><summary>SMOTE her zaman iyi midir?</summary><p>Hayır. Yüksek boyutlu ya da çok gürültülü veride sentetik örnekler sınıflar arası sınırı bulanıklaştırabilir. Önce sınıf ağırlıklarını ve eşik ayarını deneyin.</p></details><details><summary>Eşiği neye göre seçerim?</summary><p>Doğrulama kümesinde kesinlik-duyarlılık eğrisini çizin ve iş tarafının kabul edebileceği yanlış alarm oranını seçin. Karar teknik değil operasyoneldir.</p></details><details><summary>Dengesizlik ne zaman sorun olmaktan çıkar?</summary><p>Azınlık sınıfının mutlak sayısı yeterince büyükse oran daha az önemlidir. Yüzde bir, on bin örnek demekse genellikle sorun yaşamazsınız.</p></details></div>

---

Sınıf dengesizliği bir veri kusuru değil, çoğu değerli problemin doğal hâlidir. Doğru metrik, doğru eşik ve dürüst bir değerlendirme kümesiyle çalışılabilir. Devamı için [sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/) ve [anomali tespiti](/posts/anomali-tespiti/) yazılarına bakabilirsiniz.
