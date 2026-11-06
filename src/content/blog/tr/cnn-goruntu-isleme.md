---
title: "CNN ve Görüntü İşleme Temelleri: Bir Makine Görüntüyü Nasıl \"Görür\"?"
description: "Filtreler, evrişim, havuzlama ve katmanlar üzerinden CNN'leri sezgisel olarak anlatıyoruz: bir makine bir görüntüyü gerçekte nasıl çözümler ve \"görür\"?"
publishDate: "2026-08-09T23:49:00+03:00"
lang: tr
category: "Görü"
tags: ["Görü", "Yapay Zeka"]
translation: "cnn-image-processing-basics"
heroImage:
  src: "../../../assets/blog/covers/cnn-goruntu-isleme.jpg"
  alt: "CNN ve Görüntü İşleme Temelleri: Bir Makine Görüntüyü Nasıl \"Görür\"?"
---

Bir fotoğrafa baktığınızda "kedi" demeniz saliseler sürer. Oysa bir bilgisayar için o fotoğraf yalnızca milyonlarca sayıdan oluşan dev bir tablodur. Evrişimli sinir ağları (CNN), bu sayı yığınını anlamlı kavramlara dönüştürmenin en etkili yollarından biridir. Bu yazıda filtreleri, evrişimi, havuzlamayı ve katmanları gündelik analojilerle anlatacağız; sonunda bir makinenin bir görüntüyü nasıl "gördüğünü" sezgisel olarak kavrayacaksınız.

## Bir makine için görüntü nedir?

Dijital bir görüntü, ızgara biçiminde dizilmiş minik renk noktalarından, yani piksellerden oluşur. Gri tonlamalı bir görüntüde her piksel, parlaklığı gösteren tek bir sayıdır; genellikle 0 (siyah) ile 255 (beyaz) arasında. Renkli görüntülerde ise her piksel üç sayı taşır: kırmızı, yeşil ve mavi kanallar (RGB). Yani 224x224 boyutunda renkli bir fotoğraf, bilgisayar için yaklaşık 150 binden fazla sayıdan oluşan bir tablodan ibarettir.

Bir analoji yardımcı olabilir: görüntüyü, her karesine bir parlaklık değeri yazılmış devasa bir Excel tablosu gibi düşünün. İnsan gözü tabloyu uzaktan görünce deseni hemen yakalar; bilgisayarsa tek tek hücrelere bakar. İşte CNN'lerin görevi, bu hücreler arasındaki _yerel desenleri_ bulup yorumlamaktır.

> Makine pikselleri görür; CNN ise pikseller arasındaki ilişkileri öğrenir. Asıl zekâ, tek tek sayılarda değil, onların oluşturduğu desenlerdedir.

## Filtreler: küçük desen dedektörleri

Filtre (çekirdek de denir), çoğu zaman 3x3 veya 5x5 boyutunda küçük bir sayı karesidir. Her filtre belirli bir desene duyarlıdır: kimi dikey kenarları, kimi yatay kenarları, kimi de köşe ya da renk geçişlerini yakalar. Filtreyi, üzerinde belirli bir şekil çizili olan küçük bir şablona benzetebilirsiniz. Şablonu görüntünün bir bölgesine bastırdığınızda, o bölge şablonla ne kadar örtüşüyorsa o kadar yüksek bir tepki üretir.

Klasik bir örnek, dikey kenar bulan bir filtredir. Soldaki sütunu negatif, sağdaki sütunu pozitif değerlerle doldurursanız, filtre koyu-açık geçişlerinin olduğu yerlerde güçlü tepki verir; düz bir alanda ise tepki sıfıra yakın kalır. İşin güzel yanı şudur: CNN'lerde bu filtre değerlerini biz elle yazmayız; ağ bunları eğitim sırasında verilerden kendisi öğrenir.

<div class="callout"><strong>İpucu:</strong> Bir CNN'in ilk katmanındaki filtreleri görselleştirirseniz, çoğu zaman kenar ve renk lekesi dedektörleri görürsünüz; tıpkı insan görme sisteminin erken aşamalarında olduğu gibi.</div>

## Evrişim: filtreyi görüntü üzerinde gezdirmek

Evrişim (convolution), filtreyi görüntünün sol üst köşesinden başlayarak adım adım kaydırma işlemidir. Her durakta filtre, altında kalan piksellerle çarpılır, sonuçlar toplanır ve tek bir sayı üretilir. Bu sayı, o bölgenin filtrenin aradığı desene ne kadar benzediğini gösterir. Filtre tüm görüntüyü taradığında, ortaya **özellik haritası** (feature map) adı verilen yeni bir tablo çıkar.

Burada iki kavram önemlidir. _Adım (stride)_, filtrenin her seferinde kaç piksel kaydığıdır; büyük adım daha küçük çıktı üretir. _Dolgu (padding)_, kenarlardaki bilgiyi korumak için görüntünün etrafına eklenen sıfır şeritleridir. Bir başka kritik fikir _parametre paylaşımı_dır: aynı filtre tüm görüntüde kullanıldığı için, bir kenarı ister sol üstte ister sağ altta olsun aynı şekilde tanıyabiliriz. Bu, hem öğrenilecek parametre sayısını ciddi biçimde azaltır hem de modele konum bağımsızlığı kazandırır.

Gündelik analoji: elinizde delikli bir mukavva (filtre) olsun ve bunu bir gazetenin üzerinde soldan sağa, yukarıdan aşağıya kaydırdığınızı düşünün. Her durakta delikten görünen harfleri okuyup bir not alıyorsunuz. Sonunda gazetenin tamamı için bir "okuma haritası" çıkarmış olursunuz. Evrişim de tam olarak budur.

## Havuzlama: önemliyi koru, gerisini sadeleştir

Özellik haritaları hâlâ büyük olabilir. Havuzlama (pooling), bu haritaları küçülterek hem hesabı hafifletir hem de küçük konum kaymalarına karşı dayanıklılık kazandırır. En yaygın türü _maksimum havuzlama_dır: örneğin 2x2'lik bir pencere içindeki en yüksek değer alınır, gerisi atılır. Mantık şudur: "Bu bölgede aradığım desen güçlü biçimde var mıydı? Evetse, tam olarak hangi pikselde olduğu o kadar önemli değil."

Bunu bir özet çıkarmaya benzetebilirsiniz. Uzun bir paragrafı okuyup "burada en çarpıcı cümle buydu" demek gibi. Detayın bir kısmını kaybedersiniz ama ana fikri korur ve metni kısaltırsınız. Havuzlama da görüntüde benzer bir özetleme yapar.

-   **Maksimum havuzlama:** penceredeki en büyük değeri alır; baskın özelliği vurgular.
-   **Ortalama havuzlama:** penceredeki değerlerin ortalamasını alır; daha yumuşak bir özet üretir.
-   **Sonuç:** daha küçük haritalar, daha az hesap, küçük kaymalara karşı daha dayanıklı bir model.

## Katmanlar: basitten karmaşığa hiyerarşi

CNN'lerin asıl gücü, bu işlemleri üst üste yığmasından gelir. İlk evrişim katmanları basit şeyleri öğrenir: kenarlar, köşeler, renk geçişleri. Bir sonraki katman bu basit parçaları birleştirerek dokuları ve basit şekilleri yakalar. Daha derin katmanlar ise göz, tekerlek, kapı kolu gibi nesne parçalarını, en üstte ise "kedi" ya da "araba" gibi bütün kavramları temsil etmeye başlar.

Bu, çocuğun çizim öğrenmesine benzer: önce çizgiler, sonra çizgilerden şekiller, sonra şekillerden yüzler. Her katman bir altındakinin çıktısını girdi olarak alır ve daha soyut bir temsil üretir. Tipik bir akış şöyledir: _evrişim → aktivasyon (örneğin ReLU) → havuzlama_ bloğu birkaç kez tekrarlanır, ardından elde edilen özellikler düzleştirilip tam bağlantılı katmanlara verilir ve son katman bir sınıf olasılığı üretir.

### Aktivasyon neden gerekli?

Evrişim ve toplama işlemleri doğrusaldır; yalnızca onları üst üste koyarsanız, kaç katman eklerseniz ekleyin sonuç yine tek bir doğrusal işleme denk gelir. ReLU gibi doğrusal olmayan bir aktivasyon (negatif değerleri sıfırlayan basit bir kural) araya girerek ağa eğri, karmaşık ilişkileri öğrenme yeteneği kazandırır. Doğrusal olmayanlık olmadan derinliğin bir anlamı kalmaz.

## Kod üzerinde küçük bir örnek

Aşağıdaki sadeleştirilmiş sözde kod, tek bir filtre için evrişimin özünü gösterir. Amacı çalıştırmaktan çok, işlemin mantığını netleştirmektir.

```text
// 3x3 dikey kenar filtresi (basit örnek)
filtre = [[-1, 0, 1],
          [-1, 0, 1],
          [-1, 0, 1]]

ozellik_haritasi = bos_tablo()

her (y, x) konumu icin gorseli tara:
    toplam = 0
    her (i, j) icin filtre uzerinde:
        toplam += gorsel[y+i][x+j] * filtre[i][j]
    ozellik_haritasi[y][x] = max(0, toplam)   // ReLU: negatifi sifirla

// Ardindan havuzlama:
her 2x2 blok icin ozellik_haritasi uzerinde:
    cikti[blok] = en_buyuk_deger(blok)         // maks havuzlama
```

Gerçek kütüphanelerde (örneğin PyTorch veya TensorFlow) bu döngüleri elle yazmazsınız; tek bir katman çağrısı işin tamamını üstlenir ve filtre değerleri eğitimle öğrenilir. Ama altta yatan fikir tam olarak budur: çarp, topla, doğrusal olmayan eşikten geçir, özetle, tekrarla.

## Peki makine gerçekten "görüyor" mu?

Kısa cevap: hayır, en azından bizim anladığımız anlamda değil. CNN, bir görüntüyü giderek soyutlaşan sayısal temsillere dönüştürür ve bu temsillerden istatistiksel olarak en olası etiketi üretir. Anlamı, niyeti veya bağlamı bizim gibi kavramaz; gördüğü şey, eğitildiği verideki desenlerin bir yansımasıdır. Bu yüzden eğitim verisi dengesizse ya da eksikse, model şaşırtıcı hatalar yapabilir.

Yine de bu yaklaşım inanılmaz derecede güçlüdür: tıbbi görüntülerde anomali tespiti, üretim hatlarında kalite kontrolü, belge dijitalleştirme ve çok daha fazlası bu temeller üzerine kuruludur. Yapay zekânın gündelik hayata nasıl entegre olduğunu merak ediyorsanız [HatsonTech](/posts/hatsontech-nedir/) içeriklerine göz atabilirsiniz.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Bir bilgisayar için görüntü, piksel parlaklıklarından oluşan bir sayı tablosudur.</li><li>Filtreler küçük desen dedektörleridir; CNN bunların değerlerini verilerden öğrenir.</li><li>Evrişim, filtreyi görüntü üzerinde gezdirerek özellik haritaları üretir; parametre paylaşımı verimlilik sağlar.</li><li>Havuzlama haritaları küçültür ve küçük konum kaymalarına karşı dayanıklılık kazandırır.</li><li>Katmanlar basit kenarlardan karmaşık nesnelere uzanan bir hiyerarşi kurar; doğrusal olmayan aktivasyon bunu mümkün kılar.</li><li>CNN "görmez"; istatistiksel desenlerden olasılık üretir, bu yüzden veri kalitesi kritiktir.</li></ul></div>

<div class="faq"><details><summary>Filtre değerlerini ben mi belirlemeliyim?</summary><p>Hayır. Klasik görüntü işlemede elle tasarlanmış filtreler kullanılırdı, ancak CNN'lerde filtre değerleri eğitim sırasında verilerden otomatik olarak öğrenilir. Sizin belirlediğiniz şey filtre sayısı ve boyutu gibi mimari seçimlerdir.</p></details><details><summary>Evrişim ile havuzlama arasındaki fark nedir?</summary><p>Evrişim, desenleri tespit ederek yeni özellik haritaları üretir ve öğrenilebilir parametreleri vardır. Havuzlama ise bu haritaları yalnızca küçültüp özetler; öğrenilen bir parametresi yoktur ve genellikle en büyük değeri alarak çalışır.</p></details><details><summary>CNN sadece görüntüler için mi kullanılır?</summary><p>Hayır. Aynı "yerel desen yakalama" fikri ses dalga biçimlerine, zaman serilerine ve hatta metne de uygulanabilir. Yine de en yaygın ve sezgisel kullanım alanı görüntü ve video işlemedir.</p></details></div>

---
