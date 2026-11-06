---
title: "Özellik Mühendisliği: Ham Veriden Anlamlı Sinyaller ve Sızıntı Tuzakları"
description: "Özellik mühendisliğini sezgisel anlatıyoruz: ham veriden anlamlı özellik türetme, ölçekleme, kodlama ve modelleri sahada çökerten veri sızıntısı tuzakları."
publishDate: "2026-08-09T23:43:00+03:00"
lang: tr
category: "Veri"
tags: ["Veri", "Yapay Zeka"]
translation: "feature-engineering"
heroImage:
  src: "../../../assets/blog/bimg-07.jpg"
  alt: "Özellik Mühendisliği: Ham Veriden Anlamlı Sinyaller ve Sızıntı Tuzakları"
---

İyi bir yemek, malzemelerin kalitesi kadar onları nasıl hazırladığınıza da bağlıdır. Ham soğanı olduğu gibi tabağa koymakla, onu inceltip karamelize etmek arasında dünya kadar fark vardır. Makine öğrenmesinde de durum aynıdır: bir modelin başarısı çoğu zaman algoritmadan değil, ham veriyi modele _anlamlı_ bir biçimde sunmaktan gelir. Bu işe **özellik mühendisliği (feature engineering)** denir. Bu yazıda ham veriden nasıl yararlı özellikler türetildiğini, ölçekleme ve kodlamanın neden gerekli olduğunu ve en sinsi tuzak olan **veri sızıntısını (data leakage)** günlük örneklerle açıyoruz.

## 1\. Özellik mühendisliği nedir?

Bir model, dünyayı yalnızca kendisine verdiğiniz sayılar üzerinden görür. Elinizde bir müşterinin doğum tarihi, alışveriş geçmişi ya da bir evin adresi olabilir; ama model bu ham bilgiyi olduğu gibi anlamaz. **Özellik (feature)**, ham veriden çıkarılmış, modelin tahmin yaparken kullanacağı ölçülebilir bir sinyaldir. Özellik mühendisliği ise bu sinyalleri bilinçli olarak _tasarlama_ sanatıdır.

Bir doğum tarihini düşünün: "1990-04-12" tek başına bir modele pek bir şey söylemez. Ama bundan "yaş", "doğduğu ay" ya da "hafta sonu mu doğmuş" gibi özellikler türetirseniz, model artık örüntü görebilir. Aynı ham veri, doğru sorularla farklı ve değerli sinyallere dönüşür.

> Modeller veriden öğrenir, ama doğru özelliklerden _daha hızlı ve daha iyi_ öğrenir. Çoğu zaman en büyük kazanç, daha karmaşık bir algoritmadan değil, daha akıllı bir özellikten gelir.

## 2\. Ham veriden anlamlı özellik türetmek

İyi bir özellik, alan bilgisini (domain knowledge) sayıya tercüme eder. Birkaç tipik dönüşüm:

-   **Tarih/zaman ayrıştırma:** Bir zaman damgasından "saat", "haftanın günü", "resmi tatil mi" gibi parçalar çıkarmak. Bir kafenin satışlarını tahmin ederken "Cumartesi öğleden sonra" bilgisi ham tarihten çok daha güçlüdür.
-   **Oran ve bileşik özellikler:** İki ham sütunu birleştirmek. "Toplam harcama" ve "ziyaret sayısı" yerine "ziyaret başına ortalama harcama" çoğu zaman daha anlamlıdır.
-   **Toplulaştırma (aggregation):** Bir müşterinin son 30 gündeki işlem sayısı, ortalama sepet tutarı gibi özetler. Tek bir satır, geçmişin sıkıştırılmış bir hikâyesine dönüşür.
-   **Metinden sayıya:** Bir adres metninden "şehir" ya da "posta kodu bölgesi" çıkarmak; bir ürün başlığından kelime sayısını almak.

Sezgisel analoji: bir doktor hastayı muayene ederken ham verileri (boy, kilo) doğrudan kullanmaz; bunlardan vücut kitle indeksi gibi _anlamlı bir gösterge_ türetir. Özellik mühendisliği de verinizden böyle "göstergeler" üretmektir.

<div class="callout"><strong>İpucu:</strong> Yeni bir özellik eklemeden önce kendinize sorun: "Bu sinyal, tahmin etmeye çalıştığım şeyle gerçekten ilişkili mi?" Alan bilgisi olmadan üretilen yüzlerce özellik, modeli güçlendirmek yerine gürültüyle boğabilir.</div>

## 3\. Ölçekleme: aynı terazide tartmak

Birçok algoritma, özelliklerin büyüklüklerine duyarlıdır. Bir özellik "yaş" (0–100 aralığında), diğeri "yıllık gelir" (0–1.000.000 aralığında) ise, modelin gözünde gelir sırf sayıca büyük olduğu için yaşı ezer. Oysa bu, gelirin daha _önemli_ olduğu anlamına gelmez; sadece ölçeği farklıdır.

**Ölçekleme (scaling)**, özellikleri karşılaştırılabilir bir aralığa getirir. İki yaygın yöntem:

-   **Standartlaştırma (standardization):** Her özelliği ortalaması 0, standart sapması 1 olacak şekilde dönüştürür. "Bu değer ortalamadan kaç standart sapma uzakta?" sorusuna çevirir.
-   **Normalleştirme (min-max):** Değerleri sabit bir aralığa, genellikle 0 ile 1 arasına sıkıştırır. En küçük değer 0, en büyük değer 1 olur.

Analoji: bir maraton koşucusuyla bir satranç ustasını karşılaştırırken saniyeyi ve ELO puanını doğrudan toplayamazsınız; ikisini de "kendi alanında ne kadar iyi" ölçeğine çevirmeniz gerekir. Ölçekleme tam da bunu yapar. Özellikle mesafe tabanlı yöntemler (k-en yakın komşu) ve gradyan inişiyle eğitilen modeller bundan büyük fayda görür.

## 4\. Kodlama: kategorileri sayıya çevirmek

Modeller sayılarla çalışır, ama gerçek veride "şehir", "renk" ya da "ürün kategorisi" gibi metinsel kategoriler boldur. Bunları sayıya çevirme işine **kodlama (encoding)** denir.

-   **One-hot kodlama:** Her kategori için ayrı bir sütun açar; o satır o kategoriyse 1, değilse 0 yazar. "Kırmızı / Yeşil / Mavi" üç ayrı sütuna döner. Sıralaması olmayan kategoriler için doğru tercihtir.
-   **Sıralı (ordinal) kodlama:** Kategorilerin doğal bir sırası varsa (örneğin "düşük < orta < yüksek") onları 1, 2, 3 gibi sayılara çevirir.

Neden one-hot'a ihtiyaç var? Eğer "Kırmızı=1, Yeşil=2, Mavi=3" deseydiniz, modele yanlışlıkla "Mavi, Kırmızı'nın üç katıdır" gibi anlamsız bir sıralama dayatmış olurdunuz. Renklerin böyle bir hiyerarşisi yoktur; one-hot bu yanlış varsayımı ortadan kaldırır.

<div class="callout"><strong>İpucu:</strong> Bir kategorik sütunda çok fazla benzersiz değer varsa (örneğin binlerce posta kodu), one-hot kodlama yüzlerce sütun üretip veriyi şişirebilir. Bu durumda gruplama ya da hedef tabanlı kodlama gibi alternatifler düşünülür.</div>

## 5\. Veri sızıntısı: en sinsi tuzak

Şimdi en tehlikeli kısma geldik. **Veri sızıntısı (data leakage)**, modelin eğitim sırasında, gerçek dünyada tahmin anında _asla erişemeyeceği_ bir bilgiye erişmesidir. Sonuç sinsidir: model testte muhteşem görünür, ama sahaya çıkınca çöker.

Klasik bir örnek: bir hastalığı tahmin etmeye çalışıyorsunuz ve veride "uygulanan tedavi" sütunu var. Model bu sütundan harika tahminler yapar; çünkü tedavi ancak teşhis konduktan _sonra_ uygulanmıştır. Yani model geleceği "kopya çekerek" biliyordur. Gerçek hayatta, teşhis anında bu bilgi henüz yoktur.

> Veri sızıntısı, sınav sorularını öğrenciye sınavdan önce vermeye benzer. Notlar muhteşem olur ama hiçbir şey öğrenilmemiştir; gerçek hayatta öğrenci çaresizdir.

Sızıntının daha sinsi bir türü, **ön işleme sızıntısıdır**. Diyelim ki ölçekleme için ortalamayı _tüm_ veriden (eğitim + test) hesapladınız. O an, test verisindeki bilgi gizlice eğitim sürecine sızmıştır. Model, görmemesi gereken test dağılımı hakkında ipucu almıştır.

## 6\. Sızıntıdan korunmak: doğru sıralama

Sızıntıdan korunmanın altın kuralı basittir: **tüm dönüşüm parametrelerini yalnızca eğitim verisinden öğren, sonra aynısını test verisine uygula.** Ölçekleme için kullanacağınız ortalama ve standart sapma yalnızca eğitim kümesinden hesaplanmalı; test kümesi bu hesaplamaya hiç katılmamalıdır.

Aşağıdaki sözde-kod, doğru ve yanlış sıralamayı yan yana gösteriyor:

```text
# YANLIS: olcekleme tum veriden ogreniliyor -> sizinti
ortalama, sapma = istatistik_hesapla(tum_veri)   # test de iceride!
tum_veri = olcekle(tum_veri, ortalama, sapma)
egitim, test = ayir(tum_veri)

# DOGRU: once ayir, sonra YALNIZCA egitimden ogren
egitim, test = ayir(tum_veri)
ortalama, sapma = istatistik_hesapla(egitim)       # sadece egitim
egitim = olcekle(egitim, ortalama, sapma)
test   = olcekle(test,   ortalama, sapma)          # ayni parametreler
```

Aynı mantık tüm ön işleme adımları için geçerlidir: eksik değer doldurma, kodlama, özellik seçimi... Hepsinde önce eğitim/test ayrımını yapın, parametreleri yalnızca eğitimden öğrenin. Modern kütüphanelerdeki **pipeline (işlem hattı)** yapıları tam da bu disiplini otomatik olarak dayatmak için vardır; çapraz doğrulama sırasında her katta ön işlemeyi yeniden eğitim kısmından öğrenir.

<div class="callout"><strong>İpucu:</strong> Bir model "fazla iyi" sonuç veriyorsa sevinmeden önce sızıntıdan şüphelenin. Doğruluk gerçek olamayacak kadar yüksekse, çoğu zaman gerçek değildir.</div>

## 7\. Pratikte denge ve son notlar

Özellik mühendisliği güçlü bir araçtır, ama abartısı da vardır. Yüzlerce özellik üretmek modeli zenginleştirmez; çoğu zaman gürültüyü artırır ve aşırı öğrenme riskini büyütür. İyi bir özellik kümesi _az ama anlamlı_ sinyallerden oluşur. Daha az, daha temiz özellik genellikle daha çok ama alakasız özellikten iyidir.

Ayrıca şunu unutmamak gerekir: derin öğrenme modelleri, ham veriden özellikleri kendileri öğrenmekte (özellikle görüntü ve metinde) çok başarılıdır. Yine de tablosal (tabular) verilerde, sınırlı veride ve yorumlanabilirliğin önemli olduğu alanlarda iyi tasarlanmış özellikler hâlâ paha biçilmezdir. Sonuçta amaç tektir: modele dünyayı en açık, en dürüst dilde anlatmak.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Özellik mühendisliği, ham veriyi modelin anlayabileceği anlamlı sinyallere dönüştürme sanatıdır; başarı çoğu zaman algoritmadan değil iyi özelliklerden gelir.</li><li>Tarih ayrıştırma, oranlar ve toplulaştırma gibi dönüşümler alan bilgisini sayıya tercüme eder.</li><li>Ölçekleme, farklı büyüklükteki özellikleri aynı teraziye getirir; mesafe tabanlı ve gradyanla eğitilen modeller için kritiktir.</li><li>Kodlama kategorileri sayıya çevirir; sırasız kategoriler için one-hot, doğal sıralı olanlar için ordinal kodlama uygundur.</li><li>Veri sızıntısı, modelin tahmin anında erişemeyeceği bilgiyi eğitimde görmesidir; testte parlak, sahada başarısız modeller doğurur.</li><li>Korunmanın kuralı: önce eğitim/test ayrımı, sonra tüm dönüşüm parametrelerini yalnızca eğitimden öğrenip teste uygulamak. Pipeline yapıları bunu otomatikleştirir.</li><li>Az ama anlamlı özellik, çok ama alakasız özellikten iyidir; aşırılık aşırı öğrenmeyi besler.</li></ul></div>

<div class="faq"><details><summary>Ölçekleme her model için gerekli mi?</summary><p>Hayır. Mesafe tabanlı yöntemler (k-en yakın komşu, SVM) ve gradyan inişiyle eğitilen modeller (lineer/lojistik regresyon, sinir ağları) ölçeklemeden büyük fayda görür. Buna karşın karar ağaçları ve onlara dayalı yöntemler (rastgele orman, gradient boosting) özelliklerin mutlak büyüklüğüne duyarsızdır; bu modellerde ölçekleme çoğu zaman gerekli değildir.</p></details><details><summary>One-hot mu ordinal kodlama mı kullanmalıyım?</summary><p>Kategorilerin doğal bir sırası var mı diye sorun. "Düşük / orta / yüksek" gibi sıralı kategorilerde ordinal kodlama bu sırayı korur. "Kırmızı / yeşil / mavi" gibi sırasız kategorilerde ise one-hot doğru tercihtir; aksi halde modele olmayan bir hiyerarşi dayatmış olursunuz. Çok sayıda benzersiz değer varsa alternatif kodlamalar düşünülmelidir.</p></details><details><summary>Veri sızıntısının olmadığından nasıl emin olurum?</summary><p>İki disipline sadık kalın. Birincisi: her özelliğin, tahmin anında gerçekten mevcut olup olmayacağını sorgulayın; geleceği "kopyalayan" sütunları (örneğin sonuçtan sonra dolan alanları) çıkarın. İkincisi: tüm ön işleme parametrelerini yalnızca eğitim verisinden öğrenin ve bu adımları bir pipeline içinde tutarak çapraz doğrulamada her katta yeniden eğitin.</p></details></div>

---

Özetle: özellik mühendisliği, makine öğrenmesinin sessiz kahramanıdır. Modeli zeki kılan çoğu zaman algoritmanın karmaşıklığı değil, veriyi ona ne kadar net ve dürüst sunduğunuzdur. Ölçekleme ve kodlamayı doğru yapmak, sızıntıyı titizlikle önlemek; basit bir modeli bile sağlam ve güvenilir kılar. Türkçe odaklı yapay zeka modellerinin gerçek dünyada nasıl titizlikle kurulduğunu merak ediyorsanız, [HatsonTech](/posts/hatsontech-nedir/)'in çalışmalarına göz atabilirsiniz.
