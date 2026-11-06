---
title: "Yaygın İstatistik Yanılgıları: Altı Tuzak, Altı Kısa Örnek"
description: "Simpson paradoksu, taban oranı yanılgısı, hayatta kalan yanlılığı, ortalamaya dönüş, p-hacking ve küçük örneklemler; her biri kısa ve anlaşılır bir örnekle."
publishDate: "2026-11-13T09:17:00+03:00"
lang: tr
category: "İstatistik"
tags: ["İstatistik", "Veri Okuryazarlığı", "Bilimsel Düşünme"]
translation: "common-statistical-fallacies"
heroImage:
  src: "../../../assets/blog/covers/yaygin-istatistik-yanilgilari.jpg"
  alt: "Yanıltıcı grafikler ve büyüteçle incelenen sayılar"
---

Sayılar bize genellikle tarafsız ve kesin görünür. Oysa aynı veri, yanlış bir açıdan bakıldığında tam tersi bir hikâye anlatabilir. Bu yanılgılar sadece öğrencilerin sınavda düştüğü tuzaklar değil; hekimlerin test sonuçlarını yorumlamasından şirketlerin yatırım kararlarına, haber başlıklarından kamu politikalarına kadar her yerde karşımıza çıkıyor. Veri kalitesi ve model değerlendirme üzerine çalışırken bunların neredeyse hepsiyle bir şekilde karşılaşıyorum. Bu yazıda en yaygın altı istatistik yanılgısını, her birini kısa bir örnekle anlatacağım.

## 1. Simpson paradoksu: bütün, parçaların tersini söyleyebilir

Simpson paradoksu, gruplar ayrı ayrı incelendiğinde görülen bir eğilimin, gruplar birleştirildiğinde tersine dönmesidir.

1986'da yayımlanan ve böbrek taşı tedavilerini karşılaştıran bir çalışma bunun ders kitaplarına girmiş örneğidir:

| Taş boyutu | Tedavi A | Tedavi B |
|---|---|---|
| Küçük taşlar | %93 (81/87) | %87 (234/270) |
| Büyük taşlar | %73 (192/263) | %69 (55/80) |
| Toplam | %78 (273/350) | %83 (289/350) |

Tedavi A, hem küçük hem büyük taşlarda daha başarılı. Ama toplamda B daha iyi görünüyor. Nasıl? A, daha zor vakalar olan büyük taşlarda çok daha sık uygulanmış. Yani "taş boyutu" hem tedavi seçimini hem de başarıyı etkileyen gizli bir değişken.

Benzer bir tablo, 1973'te Kaliforniya Üniversitesi Berkeley'deki lisansüstü başvurularında da görülmüştü: toplamda erkeklerin kabul oranı (%44) kadınlarınkinden (%35) belirgin biçimde yüksekti. Ancak bölüm bazında bakıldığında kadınlar aleyhine sistematik bir eğilim görülmedi; kadınlar daha çok, kabul oranı düşük ve rekabetçi bölümlere başvurmuştu.

**Ders:** Toplu bir sonuca güvenmeden önce, verinin hangi alt gruplardan oluştuğunu ve bu grupların nasıl dağıldığını sorun.

## 2. Taban oranı yanılgısı: nadir olan şey nadirdir

Bir testin "çok doğru" olması, pozitif bir sonucun büyük olasılıkla doğru olduğu anlamına gelmez. Belirleyici olan, durumun toplumda ne kadar yaygın olduğu, yani taban oranıdır.

Tamamen örnek amaçlı sayılarla düşünelim: Bir hastalık 1.000 kişiden 10'unda var. Test hastaların %90'ını doğru yakalıyor, sağlıklı kişilerin ise %9'unda yanlışlıkla pozitif sonuç veriyor.

- 10 hastadan 9'u pozitif çıkar.
- 990 sağlıklı kişiden yaklaşık 89'u da pozitif çıkar.
- Toplam yaklaşık 98 pozitif sonucun sadece 9'u gerçekten hasta.

Yani pozitif sonuç alan birinin gerçekten hasta olma olasılığı yaklaşık %9. Sezgimiz bize çok daha yüksek bir sayı söyler. Araştırmalar, bilgiyi yüzdeler yerine bu örnekteki gibi "1.000 kişiden kaçı" biçiminde, yani doğal frekanslarla sunmanın hem uzmanların hem de sıradan insanların bu tür hataları azaltmasına yardım ettiğini gösteriyor.

**Ders:** "Test ne kadar doğru?" sorusunun yanına mutlaka "Bu durum ne kadar yaygın?" sorusunu ekleyin.

## 3. Hayatta kalan yanlılığı: sadece kazananları görmek

Yalnızca bir eleme sürecinden "geçebilenlere" bakıp sonuç çıkardığımızda hayatta kalan yanlılığına düşeriz.

En bilinen örnek İkinci Dünya Savaşı'ndan: istatistikçi Abraham Wald ve Columbia Üniversitesi'ndeki İstatistik Araştırma Grubu, görevden dönen uçaklardaki hasarı inceleyerek uçakların hangi bölümlerinin daha savunmasız olduğunu tahmin etmeye çalıştı. Kilit fikir şuydu: veriler sadece geri dönebilen uçaklardan geliyordu. Dönen uçaklarda az isabet görülen bölgeler, belki de isabet aldığında uçağın hiç dönemediği bölgelerdi. (Bu hikâyenin popüler anlatımlarının zaman içinde biraz süslendiği de not edilmeli.)

Günlük hayattan örnekler: "Okulu bırakıp milyarder olanlar"ı konuşup bırakan ve başarısız olan çok daha büyük grubu görmemek; yalnızca hâlâ faaliyette olan fonların performansına bakıp kapanmış fonları unutmak.

**Ders:** "Bu veriye hangi örnekler girememiş olabilir?" diye sorun.

<div class="callout"><strong>İpucu:</strong> Bir başarı hikâyesinde "bu yöntemi uygulayanlar başardı" deniyorsa, aynı yöntemi uygulayıp başaramayanların kaç kişi olduğunu sorun. Bu sayı çoğu zaman hiç verilmez.</div>

## 4. Ortalamaya dönüş: aşırı sonuçlar kendiliğinden yumuşar

Bir ölçümde aşırı bir sonuç (çok iyi ya da çok kötü) alındığında, bir sonraki ölçüm büyük olasılıkla ortalamaya daha yakın olur. Bunun nedeni, aşırı sonuçlarda şansın da payının olmasıdır.

Kavramı ilk kez 19. yüzyılda Francis Galton, boy üzerine yaptığı çalışmalarda tanımladı: çok uzun ebeveynlerin çocukları ortalamada uzundu, ama ebeveynleri kadar değil. Psikolog Daniel Kahneman'ın aktardığı bir örnek ise daha gündelik: bir uçuş eğitmeni, iyi bir manevradan sonra övdüğü öğrencilerin bir sonraki denemede kötüleştiğini, azarladıklarının ise düzeldiğini gözlemleyip cezanın övgüden etkili olduğu sonucuna varır. Oysa bu, büyük ölçüde ortalamaya dönüşün etkisidir. "Spor dergisi kapağı laneti" gibi efsanelerin bir kısmı da buna bağlanır: kapağa çok iyi bir dönemin ardından çıkılır, ardından gelen daha sıradan dönem kapağa yüklenir.

**Ders:** Aşırı bir sonuçtan sonra gelen iyileşmeyi ya da kötüleşmeyi, bir müdahalenin etkisine bağlamadan önce kontrol grubu olup olmadığını sorun.

## 5. P-hacking: yeterince denerseniz bir şey "anlamlı" çıkar

İstatistiksel testlerde yaygın olarak kullanılan p < 0,05 eşiği, gerçekte hiçbir etki yokken yaklaşık her 20 testten birinde tesadüfen "anlamlı" bir sonuç bulunabileceği anlamına gelir. Birbirinden bağımsız 20 farklı sonucu test ederseniz ve hiçbirinde gerçek bir etki yoksa, en az birinin "anlamlı" çıkma olasılığı yaklaşık %64'tür.

P-hacking, farklı analizleri, alt grupları ya da değişkenleri sonuç "anlamlı" çıkana kadar denemek ve yalnızca o sonucu raporlamaktır. Amerikan İstatistik Derneği (ASA) 2016'da yayımladığı bildiride bu soruna dikkat çekti ve altı ilke sıraladı. Bunlardan bazıları: p değeri, incelenen hipotezin doğru olma olasılığını ölçmez; bilimsel sonuçlar yalnızca p değerinin belirli bir eşiği geçip geçmediğine dayandırılmamalıdır; doğru çıkarım için tam raporlama ve şeffaflık gerekir.

**Ders:** Bir çalışmada kaç test yapıldığını, analiz planının önceden belirlenip belirlenmediğini ve etki büyüklüğünü sorun.

## 6. Küçük örneklemler: az veri, büyük dalgalanma

Küçük örneklemlerde tesadüf, sonuçları kolayca uç noktalara taşır. Hilesiz bir parayı 10 kez attığınızda 7 ya da daha fazla tura gelme olasılığı yaklaşık %17'dir; yani hiç de şaşırtıcı değildir. 1.000 atışta 700 tura gelmesi ise pratikte imkânsızdır. "Bu yeni yöntemi deneyen 10 kişiden 7'si memnun kaldı" cümlesi, bu yüzden göründüğünden çok daha az şey söyler.

John Ioannidis'in 2005'te PLOS Medicine'de yayımlanan ve çok tartışılan makalesi de, bir alandaki çalışmalar ne kadar küçükse bulguların doğru olma olasılığının o kadar düşük olduğunu, küçük etki büyüklüklerinin ve analizdeki esnekliğin de bu riski artırdığını savunuyor.

**Ders:** Etkileyici bir sonuç gördüğünüzde ilk soru "kaç kişiyle?" olmalı.

<div class="callout"><strong>İpucu:</strong> Bu altı yanılgıyı akılda tutmanın kısa yolu, her istatistik iddiasında üç soru sormak: <em>Kimler veriye girdi, kimler girmedi? Kaç kişiyle ve kaç denemede? Karşılaştırma neye göre yapıldı?</em></div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Simpson paradoksu: Toplu sonuçlar, alt gruplardaki eğilimin tersini gösterebilir.</li><li>Taban oranı yanılgısı: Nadir durumlarda doğru görünen bir testin pozitif sonucu bile çoğu zaman yanlış alarmdır.</li><li>Hayatta kalan yanlılığı ve ortalamaya dönüş, görmediğimiz verinin ve şansın etkisini hatırlatır.</li><li>P-hacking ve küçük örneklemler, tesadüfi sonuçların gerçek bulgu gibi sunulmasına yol açar.</li><li>Her istatistik iddiasında örneklemi, karşılaştırmayı ve etki büyüklüğünü sorgulayın.</li></ul></div>

## Sık sorulan sorular

<div class="faq"><details><summary>P değeri 0,05'in altındaysa sonuç doğru mudur?</summary><p>Hayır. ASA'nın da vurguladığı gibi p değeri, hipotezin doğru olma olasılığını ölçmez ve etkinin büyüklüğü ya da önemi hakkında bilgi vermez. Çalışma tasarımı, tam raporlama ve başka kanıtlarla birlikte değerlendirilmelidir.</p></details><details><summary>Simpson paradoksunda hangi sonuca güvenmeliyim?</summary><p>Bu, sorunun ne olduğuna ve verinin nasıl oluştuğuna bağlıdır. Alt gruplar gerçekten farklı koşulları temsil ediyorsa, genellikle alt grup düzeyindeki karşılaştırma daha bilgilendiricidir; ama hangi değişkenin gerçekten karıştırıcı olduğunu bağlam belirler.</p></details><details><summary>Örneklem ne kadar büyük olmalı?</summary><p>Tek bir sihirli sayı yok. Gereken büyüklük, aranan etkinin büyüklüğüne ve verideki değişkenliğe bağlıdır; bunun için güç analizi denen hesaplamalar yapılır.</p></details><details><summary>Bu yanılgılar yapay zeka modellerini de etkiler mi?</summary><p>Evet. Örneğin yalnızca belirli kullanıcılardan toplanan veri hayatta kalan yanlılığı taşıyabilir, toplu doğruluk oranları alt gruplardaki kötü performansı gizleyebilir. Model değerlendirmede alt grup analizi bu yüzden önemlidir.</p></details></div>

---

**Kaynaklar**

- [American Statistical Association – Statement on Statistical Significance and P-Values (7 Mart 2016)](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf)
- [Ioannidis, J. P. A. (2005) – Why Most Published Research Findings Are False, PLOS Medicine](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124)
- [Wikipedia – Simpson's paradox (Bickel vd. 1975 ve Charig vd. 1986 örnekleri)](https://en.wikipedia.org/wiki/Simpson%27s_paradox)
- [Wikipedia – Regression toward the mean](https://en.wikipedia.org/wiki/Regression_toward_the_mean)
- [Wikipedia – Survivorship bias](https://en.wikipedia.org/wiki/Survivorship_bias)
