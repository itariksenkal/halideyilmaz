---
title: "Denetimsiz Öğrenme ve Kümeleme: Etiketsiz Veriden Örüntü Çıkarmak"
description: "K-means, hiyerarşik kümeleme ve PCA üzerinden denetimsiz öğrenmeyi sezgisel olarak anlatıyoruz: etiketsiz veriden gizli örüntüler nasıl çıkarılır, kaç küme seçilir?"
publishDate: "2026-08-09T23:44:00+03:00"
lang: tr
category: "Öğrenme"
tags: ["Öğrenme", "Yapay Zeka"]
translation: "unsupervised-learning-clustering"
heroImage:
  src: "../../../assets/blog/bimg-06.jpg"
  alt: "Denetimsiz Öğrenme ve Kümeleme: Etiketsiz Veriden Örüntü Çıkarmak"
---

Yeni taşındığınız bir şehirde, kimsenin size haritayı anlatmadığını düşünün. Yine de birkaç hafta içinde "şu mahalle öğrenci dolu", "şurası sessiz aile semti", "burası gece hayatının merkezi" demeye başlarsınız. Kimse bu etiketleri size vermedi; siz benzer yerleri kendiliğinizden gruplara ayırdınız. İşte **denetimsiz öğrenme** tam olarak budur: doğru cevabın önceden verilmediği, makinenin etiketsiz veriden kendi başına örüntü çıkardığı öğrenme biçimi.

## Etiketsiz veri ne demek?

Denetimli öğrenmede her örneğin yanında bir "doğru cevap" bulunur: bu e-posta spam, bu fotoğraf kedi, bu ev 2 milyon lira. Model, girdiyle bu hazır cevaplar arasındaki bağı öğrenir. Denetimsiz öğrenmede ise bu cevaplar _yoktur_. Elimizde yalnızca veri vardır; etiket, kategori, hedef hiçbiri verilmemiştir. Görevimiz, verinin kendi içindeki gizli yapıyı bulmaktır.

Bunu, masaya boşaltılmış bir kutu dolusu düğmeye benzetebiliriz. Kimse size "bunları renge göre ayır" demez; ama siz bakar bakmaz benzer olanları kendiliğinizden öbeklemeye başlarsınız: küçük beyazlar, büyük siyahlar, kırmızı yuvarlaklar. Makine de etiketsiz veride aynı şeyi yapar; sadece "benzerlik" tanımını matematikle ifade eder.

> "Denetimli öğrenme cevabı taklit etmeyi öğrenir; denetimsiz öğrenme ise sorunun kendisini keşfeder."

## Kümeleme: benzeri benzerle bir araya getirmek

Denetimsiz öğrenmenin en yaygın görevi **kümelemedir** (clustering): veriyi, içindeki noktaların birbirine benzediği gruplara ayırmak. İyi bir kümeleme şu iki kurala uyar: aynı küme içindeki noktalar birbirine olabildiğince _yakın_, farklı kümelerdeki noktalar birbirinden olabildiğince _uzak_ olmalı.

Peki "yakın" ne demek? Çoğu zaman noktaları çok boyutlu bir uzayda birer koordinat olarak düşünürüz ve aralarındaki _uzaklığı_ ölçeriz; en bilineni iki nokta arasındaki düz çizgi mesafesi olan Öklid uzaklığıdır. Bir müşteriyi örneğin "yaşı, aylık harcaması, ziyaret sıklığı" gibi sayılarla temsil edersek, benzer müşteriler bu uzayda birbirine yakın düşer ve doğal öbekler oluşur.

<div class="callout"><strong>İpucu:</strong> Kümelemeden önce verinizi <em>ölçeklendirin</em>. "Gelir" binlerle, "yaş" onlarla ifade ediliyorsa, ölçeklendirmezseniz gelir tek başına uzaklığı domine eder ve yaş neredeyse görünmez olur.</div>

## K-means: en sevilen ve en basit yöntem

**K-means**, kümelemenin en sık kullanılan yöntemidir; çünkü hem sezgisel hem de hızlıdır. Tek bir önemli kararı sizden ister: kaç küme (_k_) istiyorsunuz? Geri kalanını kendisi halleder. Mantığı şu döngüye dayanır:

1.  **Başlat:** Rastgele _k_ tane "merkez" (centroid) seç. Bunları kümelerin başlangıç temsilcileri gibi düşün.
2.  **Ata:** Her veri noktasını, kendisine en yakın merkeze ait say. Böylece _k_ tane geçici grup oluşur.
3.  **Güncelle:** Her grubun gerçek ortalamasını hesapla ve merkezi oraya taşı.
4.  **Tekrarla:** Merkezler artık kıpırdamayana kadar atama ve güncelleme adımlarını döndür.

Bunu bir okul bahçesindeki çocuklara benzetebiliriz. Bahçeye rastgele _k_ tane bayrak dikilir; her çocuk en yakın bayrağın yanına koşar. Sonra her bayrak, etrafına toplanan çocukların tam ortasına çekilir. Çocuklar yeniden en yakın bayrağa koşar... Bu birkaç tur sürer ve sonunda herkes doğal olarak en yakın kümede sabitlenir.

K-means hızlıdır ama bazı sınırları vardır: kümelerin yaklaşık küresel ve benzer büyüklükte olduğunu varsayar; uzun, iç içe geçmiş ya da farklı yoğunluktaki şekillerde zorlanır. Ayrıca başlangıç merkezleri kötü seçilirse kötü bir sonuca takılabilir; bu yüzden pratikte birkaç farklı başlangıçla çalıştırılıp en iyisi seçilir (bunu otomatikleştiren yaygın bir yöntem _k-means++_ başlatmasıdır).

## Kaç küme? Dirsek ve siluet

K-means'in en kritik sorusu şudur: _k_ kaç olmalı? Veride doğal grup sayısını çoğu zaman önceden bilmeyiz. Bu kararda yardımcı olan iki pratik araç vardır.

-   **Dirsek yöntemi (elbow):** _k_'yi 1'den artırarak her seferinde küme içi toplam dağınıklığı ölçeriz. _k_ büyüdükçe dağınıklık hep azalır, ama bir noktadan sonra azalma yavaşlar. Grafikte tam bu "dirsek" kıvrımının olduğu yer, çoğu zaman makul bir _k_ değeridir.
-   **Siluet skoru (silhouette):** Her nokta için "kendi kümesine ne kadar yakın, en yakın komşu kümeye ne kadar uzak?" oranını ölçer. Skor +1'e yaklaştıkça kümeleme nettir, 0'a yaklaştıkça noktalar sınırda demektir. Farklı _k_ değerleri arasında en yüksek ortalama siluet veren değer iyi bir adaydır.

Yine de bu araçlar mutlak doğruyu vermez. Çoğu zaman "doğru" küme sayısı, veriden çok _amacınıza_ bağlıdır: pazarlama için 3 müşteri segmenti yeterliyken, ürün ekibine 8 segment daha yararlı olabilir.

## Hiyerarşik kümeleme: bir aile ağacı gibi

K-means baştan kaç küme istediğinizi sorar; **hiyerarşik kümeleme** ise bu kararı sona bırakır. En yaygın biçimi _birleştirici_ (agglomerative) yaklaşımdır ve aşağıdan yukarıya çalışır:

1.  Başta her nokta tek başına bir kümedir.
2.  Birbirine en yakın iki küme birleştirilir.
3.  Bu işlem, geriye tek bir büyük küme kalana dek tekrarlanır.

Sonuçta ortaya bir ağaç çıkar; buna **dendrogram** denir. Bir soyağacına çok benzer: aşağıda tek tek bireyler, yukarı çıktıkça kardeşler, kuzenler, sülaleler... Bu ağacı istediğiniz yükseklikten "keserek" istediğiniz sayıda küme elde edersiniz. Yani önceden _k_ sabitlemek zorunda değilsiniz; verinin kendi yapısını görüp sonra karar verirsiniz.

Hiyerarşik kümeleme, kümeler arası mesafeyi nasıl tanımladığınıza (en yakın, en uzak ya da ortalama bağlantı gibi) duyarlıdır ve büyük veri kümelerinde k-means'e göre yavaş kalabilir. Buna karşılık, küme sayısını sezgisel olarak keşfetmek ve iç içe yapıları görmek için çok değerlidir.

## Boyut indirgeme ve PCA

Gerçek veride bir örnek genellikle onlarca, yüzlerce, hatta binlerce özellikle (boyutla) tanımlanır. İnsan gözü en fazla üç boyutu rahat algılar; üstelik çok sayıda boyut hem hesabı ağırlaştırır hem de "boyut laneti" denen sorunlara yol açar: yüksek boyutta her şey her şeye uzak görünür ve benzerlik anlamını yitirir. İşte **boyut indirgeme**, bilgiyi olabildiğince koruyarak boyut sayısını azaltma sanatıdır.

En klasik yöntem **PCA**'dır (Temel Bileşen Analizi). PCA, verideki en çok _değişkenliğin_ (bilginin) hangi yönlerde olduğunu bulur ve veriyi bu yeni "ana eksenler" üzerine yansıtır. İlk birkaç eksen genellikle bilginin büyük kısmını taşır; gerisini atarak boyutu büyük ölçüde küçültürsünüz.

Sezgisel bir benzetme: elinizdeki bir 3 boyutlu nesneye doğru açıdan ışık tutup duvara _gölgesini_ düşürdüğünüzü düşünün. Gölge iki boyutludur, yani bilgi kaybeder; ama doğru açıyı seçerseniz nesnenin şeklini hâlâ tanıyabilirsiniz. PCA tam olarak "en çok bilgiyi koruyan açıyı" bulur. Bu sayede yüksek boyutlu veriyi 2 boyuta indirip _görselleştirmek_ ya da kümeleme öncesi gürültüyü azaltmak mümkün olur.

<div class="callout"><strong>İpucu:</strong> PCA bir kümeleme yöntemi değildir; bir <em>ön işlem</em> aracıdır. Yüksek boyutlu veriyi önce PCA ile sadeleştirip sonra k-means uygulamak, hem hızı hem de sonucun kalitesini sıkça artırır.</div>

## Birkaç satırda k-means

Tüm fikri sözde-kodla görelim. Kalbinde yalnızca iki adım var: `en yakın merkeze ata` ve `merkezi ortalamaya taşı`.

```text
# Girdi: veri noktalari, k (kume sayisi)
merkezler = rastgele_k_nokta_sec(veri, k)

dongu (yakinsayana kadar):
    # 1) ATAMA: her noktayi en yakin merkeze bagla
    her nokta icin (veride):
        nokta.kume = en_yakin_merkez(nokta, merkezler)

    # 2) GUNCELLEME: her merkezi kumesinin ortalamasina tasi
    eski_merkezler = merkezler
    her j icin (0..k-1):
        merkezler[j] = ortalama(kumedeki_noktalar(j))

    # merkezler artik kipirdamiyorsa dur
    eger merkezler ~= eski_merkezler:
        dur

dondur merkezler, kume_etiketleri
```

Gerçek kütüphanelerde (örneğin scikit-learn) bunu elle yazmazsınız; tek bir çağrı tüm döngüyü, k-means++ başlatmasını ve yakınsama denetimini sizin için halleder. Ama özü tam olarak budur: _ata, ortala, tekrarla._

## Nerede işe yarar, neye dikkat etmeli?

Denetimsiz öğrenme, etiket toplamanın pahalı ya da imkânsız olduğu yerlerde parlar:

-   **Müşteri segmentasyonu:** Davranışa göre doğal müşteri gruplarını bulup her gruba farklı yaklaşmak.
-   **Anomali tespiti:** Hiçbir kümeye uymayan, kalabalıktan kopuk noktalar çoğu zaman dolandırıcılık ya da arıza sinyalidir.
-   **Belge ve görsel düzenleme:** Benzer içerikleri otomatik öbeklere ayırmak.
-   **Sıkıştırma ve görselleştirme:** Boyut indirgeme ile veriyi sadeleştirmek ve gözle anlaşılır hâle getirmek.

Dikkat edilecek nokta şudur: denetimsiz sonuçlar "doğru cevap" değildir, bir _yorumdur_. Algoritma size kümeleri verir ama o kümelerin _ne anlama geldiğini_ insan belirler. Farklı yöntemler, farklı ölçekler ya da farklı _k_ değerleri bambaşka gruplar üretebilir. Bu yüzden bulguları her zaman alan bilginizle sınamak gerekir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Denetimsiz öğrenme etiketsiz veriden örüntü çıkarır; "doğru cevap" verilmez, yapı keşfedilir.</li><li>Kümeleme, benzer noktaları aynı gruba toplar; iyi küme içte yoğun, dışta ayrıktır.</li><li>K-means hızlı ve sezgiseldir ama <em>k</em>'yi siz seçersiniz ve küresel kümeler varsayar.</li><li>Dirsek ve siluet, makul küme sayısını seçmeye yardımcı olur; ama nihai karar amaca bağlıdır.</li><li>Hiyerarşik kümeleme bir dendrogram üretir; küme sayısını sonradan keserek seçersiniz.</li><li>PCA bir boyut indirgeme aracıdır; bilgiyi koruyarak boyutu küçültür, görselleştirme ve ön işleme için idealdir.</li></ul></div>

---

Özetle denetimsiz öğrenme, yeni bir şehri hiç haritasız tanımaya benzer: kimse size etiket vermez, ama benzer olanı benzerle gruplayarak verinin gizli düzenini ortaya çıkarırsınız. K-means hızlı ilk hamlenizdir, hiyerarşik kümeleme yapıyı katman katman gösterir, PCA ise kalabalığı sadeleştirip her şeyi görünür kılar. Bu fikirlerin gerçek ürünlerde nasıl hayata geçtiğini merak ediyorsanız, yapay zekâyı işlere uygulama tarafına bakan [HatsonTech](/posts/hatsontech-nedir/)'e göz atabilirsiniz.

<div class="faq"><details><summary>K-means ile hiyerarşik kümeleme arasında nasıl seçim yaparım?</summary><p>Küme sayısını kabaca biliyorsanız ve veri büyükse k-means hızlı ve pratiktir. Küme sayısından emin değilseniz ya da iç içe yapıları görmek istiyorsanız, dendrogram üreten hiyerarşik kümeleme daha açıklayıcıdır; ama büyük veride yavaş kalabilir.</p></details><details><summary>PCA neden kümelemeden önce kullanılır?</summary><p>Çok yüksek boyutta uzaklıklar anlamını yitirir ve gürültü artar. PCA, bilginin büyük kısmını koruyarak boyutu küçültür; bu sayede kümeleme hem hızlanır hem de daha temiz, daha ayrık gruplar üretebilir. PCA tek başına kümeleme yapmaz, ona zemin hazırlar.</p></details><details><summary>Kümeleme sonucunun "doğru" olduğunu nasıl anlarım?</summary><p>Mutlak bir doğru yoktur. Siluet gibi ölçütler kümelerin ne kadar ayrık olduğunu sayısal olarak değerlendirir, ama nihai kalite amaca bağlıdır. Bulunan grupların iş açısından anlamlı ve yorumlanabilir olması, çoğu zaman herhangi bir tek skordan daha önemlidir.</p></details></div>
