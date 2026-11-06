---
title: "Özellik Deposu ve Eğitim-Servis Farkı: Model Neden Sahada Farklı Davranıyor?"
description: "Modelin çevrimdışı skoru iyi ama sahadaki davranışı farklı. Eğitim-servis farkının dört somut kaynağını, noktasal-zaman doğruluğunun neden sızıntı önleme olduğunu ve özellik deposunun ne zaman maliyetini hak ettiğini anlatıyoruz."
publishDate: "2026-08-13T23:10:00+03:00"
lang: tr
category: "Üretim"
tags: ["Üretim", "Yapay Zeka"]
translation: "feature-stores-training-serving-skew"
heroImage:
  src: "../../../assets/blog/covers/ozellik-deposu-egitim-servis-farki.jpg"
  alt: "Özellik Deposu ve Eğitim-Servis Farkı: Model Neden Sahada Farklı Davranıyor?"
---

Çevrimdışı değerlendirmede güzel bir skor aldınız, modeli yayına aldınız ve saha davranışı beklediğiniz gibi çıkmadı. İlk refleks veri kaymasını (data drift) suçlamaktır. Oysa vakaların büyük kısmında dünya değişmemiştir: eğitimde hesapladığınız özellik (feature) ile servis anında hesaplanan özellik aynı sayı değildir. Buna eğitim-servis farkı (training-serving skew) denir ve üretimdeki model sürprizlerinin en sık, en sessiz sebebidir. Bu yazıda farkın nereden çıktığını, noktasal-zaman doğruluğunun neden aslında bir sızıntı önleme meselesi olduğunu ve ticari olarak rahatsız edici soruyu konuşuyoruz: özellik deposuna (feature store) gerçekten ihtiyacınız var mı?

## Aynı model, iki farklı dünya

Belirti hep aynıdır. Çevrimdışı ölçümler iyidir, doğrulama seti temizdir, veri hatları yeşildir, hiçbir yerde hata kaydı yoktur. Ama modelin sahadaki davranışı çevrimdışı beklentiyle örtüşmez. Kimse bir şey kırmamıştır; yalnızca aynı özellik iki farklı biçimde hesaplanmıştır.

Bu iki kavramı net ayırmakta fayda var. [Veri kayması](/posts/model-izleme-drift/) dünyanın değişmesidir: girdilerin dağılımı zamanla kayar. Eğitim-servis farkı ise dünyanın değil, sizin iki kod yolunuzun farkıdır. Kayma bir süreç, fark bir durumdur.

Bu ayrım aynı zamanda en ucuz teşhis aracıdır. Model yayına alındığı _ilk günden_ itibaren beklenenden farklı davranıyorsa, bu kayma olamaz; kaymanın oluşması için zaman gerekir. Fark ise sıfırıncı günde oradadır ve hiçbir alarm çalmaz, çünkü izleme sisteminiz dağılımların zaman içindeki değişimine bakacak biçimde kurulmuştur, iki hesaplama yolunun tutarlılığına değil.

Farkın pahalı olmasının sebebi de tam olarak budur: kendini bir hata olarak göstermez. Bir servis çökerse alarm çalar, bir veri hattı kırılırsa iş başarısız olur. Ama iki tarafta farklı hesaplanan bir özellik, her iki tarafta da geçerli görünen bir sayı üretir. Kimse aranmaz, kimse bakmaz; model sadece sessizce biraz daha kötü çalışır ve bu “biraz” aylarca birikir.

> Kayma zamanla gelir, fark ilk günden vardır. Model yayına alındığı gün beklenenden farklı davrandıysa dünyayı değil, kendi iki kod yolunuzu inceleyin.

## Farkın dört somut yolu

Eğitim ile servis arasındaki ayrışma soyut bir tehlike değildir; pratikte hep aynı dört yerden çıkar.

1.  **Aynı dönüşümün iki ayrı uygulaması.** Eğitim tarafında SQL ya da pandas ile yazılmış bir toplama, servis tarafında başka bir dilde yazılmış bir servis. İkisi de doğru yazılmıştır, ama yuvarlama, boşluk kırpma, büyük-küçük harf, sıralama ve bölme sıfıra denk geldiğinde ne olacağı gibi kenar durumlarda ayrışırlar. Kimse hata yapmamıştır; aynı şey iki kez yazılmıştır.
2.  **Farklı toplama pencereleri.** “Son 30 gün” eğitimde takvim günü, serviste kayan 720 saat olabilir. Pencerenin uç noktası dâhil mi değil mi, saat dilimi hangisi, bugünün yarım günü sayılıyor mu? Bu ayrıntılar özellik değerini sessizce kaydırır.
3.  **Boş değer ve varsayılan işleme.** Eğitimde eksik değerler eğitim setinin ortancasıyla doldurulur; serviste bir arama isabetsiz kaldığında 0 ya da -1 gönderilir. Üretimde başarısız bir arama, geçerli görünen bir sayıya dönüşür ve hiçbir uyarı üretmez.
4.  **Etiket zamanı ile servis zamanı arasındaki erişilebilirlik farkı.** Eğitim satırında her sütun doludur, çünkü olay çoktan yerleşmiştir. Servis anında ise o sütun henüz oluşmamıştır. Bu dördüncü kalem aynı zamanda bir sızıntı kaynağıdır ve bir sonraki bölümün konusudur.

Bu dört maddeyi [özellik mühendisliği](/posts/ozellik-muhendisligi/) tarafında bir kontrol listesi gibi kullanabilirsiniz. Önemli olan, her özelliğin tanımının tek bir yerde yaşamasıdır: pencere uzunluğu, saat dilimi, eksik değer politikası ve tip dönüşümü tek bir yerde yazılıyorsa, iki yol arasında ayrışacak bir şey kalmaz.

<div class="callout"><strong>İpucu:</strong> Fark avına bütün özelliklerle başlamayın. Modelin en çok ağırlık verdiği beş özelliği seçin ve önce onları eşitleyin. Üretimdeki davranış sürprizlerinin büyük kısmı, birkaç yüksek etkili özelliğin küçük bir tanım farkından doğar.</div>

## Noktasal-zaman doğruluğu, aslında sızıntı önlemedir

Noktasal-zaman doğruluğu (point-in-time correctness) kulağa teknik geliyor ama tanımı sadedir: etiket zamanı _t_ olan her eğitim satırında, her özellik yalnızca _t_ anında gerçekten var olan veriyle hesaplanmalıdır. Yani çevrim içi sistemin o an döndüreceği değerle; bugün tabloda duran değerle değil.

Klasik hata şudur: değişken bir boyut tablosunu — müşteri statüsü, risk segmenti, yaşam boyu değer — bugünkü hâliyle eğitim satırına birleştirmek. O sütun bugün “riskli” yazıyorsa, bunun sebebi büyük ihtimalle tam da tahmin etmeye çalıştığınız olayın gerçekleşmiş olmasıdır. Geleceği özelliğin içine koymuş olursunuz.

### Aynı hata, iki farklı pencereden

Burada söylenmesi gereken şey şu: noktasal-zaman doğruluğu, üretim tarafından bakıldığında [veri sızıntısının](/posts/veri-sizintisi-capraz-dogrulama/) ta kendisidir. Çapraz doğrulamada sızıntıyı satırlar ve katlar arasında engellersiniz; burada zaman ekseninde engellersiniz. Mekanizma aynıdır: modele, tahmin anında sahip olmayacağı bir bilgiyi vermiş olursunuz.

Sonucu da aynıdır ve birinci bölümdeki belirtiyle birebir örtüşür: çevrimdışı skor mükemmel görünür, saha hayal kırıklığı yaratır. Yani “üretimde beklenenden kötü” şikâyetinin arkasında çoğu zaman kayma değil, geçmişe kaçmış bir birleştirme vardır.

Pratikte üç kural yeter. Özellik değerlerini yalnızca güncel hâliyle değil, geçerlilik zaman damgasıyla birlikte saklayın. Eğitim setini kurarken olay zamanına göre geriye doğru birleştirme yapın. Ve özellik tablolarında yerinde güncelleme yerine ekleme yapın; üzerine yazılan her satır, geçmişi yeniden yazar.

> Çevrimdışı skorunuz gerçek olamayacak kadar iyiyse, muhtemelen gerçek değildir. Fazla iyi bir skor, çoğu zaman bir zaman ihlalinin imzasıdır.

## Parite testi: inanç değil kanıt

Ekiplerin çoğu “iki taraf aynı mantığı kullanıyor” cümlesine inanır. Bu bir inançtır; kanıt değildir. Kanıt üretmenin yolu basit ve ucuzdur.

Önce servis anında modele giren özellik vektörünü _olduğu gibi_ kaydedin. Ham girdiyi değil, hesaplanmış vektörü; yanına istek kimliğini, zaman damgasını ve model sürümünü. Sonra bu kayıtları alıp eğitim dönüşümünden yeniden geçirin ve özellik özellik farkı çıkarın.

Raporunuz üç şey söylemelidir: her özellik için uyuşmazlık oranı, farkların dağılımı ve en kötü birkaç özellik. Küçük ve kararlı bir uyuşmazlık oranı normaldir; geç gelen veri bunu üretir. Asıl sinyal oranın kendisi değil, oranın _değişmesidir_.

Toleransı da özellik başına belirleyin. Bir para tutarında binde birlik sapma önemsizken, bir kategori kodunda tek karakterlik fark modelin gördüğü şeyi tamamen değiştirir. Tek bir genel eşik, önemsiz farkları gürültüye, önemli farkları görünmezliğe iter.

```python
# Egitim-servis paritesi: iddiayi kanitla (sözde-kod)
# 1) Servis aninda kullanilan vektoru oldugu gibi kaydet
kaydet(istek_id, zaman_damgasi, ozellik_vektoru, model_surumu)

# 2) Ayni girdileri egitim donusumunden gecir ve karsilastir
for kayit in servis_kayitlari(gun):
    yeniden = egitim_donusumu(kayit.ham_girdi, an=kayit.zaman_damgasi)
    for ad in ozellik_adlari:
        fark = mutlak(yeniden[ad] - kayit.vektor[ad])
        if fark > tolerans[ad]:
            uyusmazlik[ad] += 1

# 3) Ozellik basina orani rapor et, taban cizgisi asilinca uyar
rapor(sirala(uyusmazlik, azalan=True))
# Kucuk ve kararli bir uyusmazlik normaldir; sinyal, oranin degismesidir.
```

Bu kurulumun ikinci bir faydası var ve genelde gözden kaçar. Servis anında kaydettiğiniz vektörler, etiketler geldiğinde tanımı gereği noktasal-zaman doğru bir eğitim seti oluşturur; çünkü o vektörler zaten yalnızca o an mevcut olan veriyle üretilmiştir. Kaydet ve bekle yaklaşımı yavaştır, ama bir hata sınıfını tamamen ortadan kaldırır.

<div class="callout"><strong>İpucu:</strong> Parite testini bir kereye mahsus bir doğrulama değil, günlük çalışan bir iş olarak kurun. Farkların çoğu yeni bir sürümle birlikte girer; ilk gün yakalanan bir uyuşmazlık ucuz, altı ay sonra fark edilen aynı uyuşmazlık ise altı aylık yanlış karardır.</div>

## Özellik deposuna gerçekten ihtiyacınız var mı?

Şimdi satıcıların pek sevmediği soruya gelelim. Bir özellik deposu aslında dört ayrı yetenek satar ve bunlar birbirinden bağımsızdır.

-   **Tek dönüşüm tanımı:** aynı hesabın hem eğitim hem servis tarafından çağrılması.
-   **Noktasal-zaman doğru geçmiş sorgusu:** eğitim seti kurarken zaman ihlali yapmayan birleştirme.
-   **Düşük gecikmeli çevrim içi depo:** istek anında milisaniyeler içinde özellik okuma.
-   **Keşif, yeniden kullanım ve yönetişim:** hangi özelliği kimin ürettiği, kimin tükettiği, neyin bozulduğunda kimin arandığı.

Ekiplerin çoğunun gerçekten ihtiyaç duyduğu şey ilk ikisidir. İlk ikisi ise bir ürün değil, iki mühendislik kararıdır: ortak bir dönüşüm kütüphanesi ve olay zamanına göre geriye doğru birleştiren bir sorgu deseni. Bunlar için yeni bir sistem kurmanız gerekmez; mevcut veri ambarınızda da kurulabilirler.

### Basit bir karar kuralı

Üçüncü yetenek, özellikleriniz akış hâlindeki olaylardan hesaplanıyorsa ve gecikme bütçeniz milisaniyelerle ölçülüyorsa maliyetini hak eder. Dördüncüsü ise çok sayıda ekip ve model aynı özellikleri paylaşıyorsa, yani kimin neyi ürettiği artık kimsenin aklında tutamayacağı kadar çoğaldıysa hak eder.

Buna karşılık maliyet tarafı da gerçektir: durum tutan yeni bir sistem, yeni bir arıza modu, yeni bir nöbet listesi ve ileride yapılacak yeni bir göç. Tek bir modeliniz, gecelik toplu hesaplanan özellikleriniz ve tek bir ekibiniz varsa, ortak kütüphane artı geriye doğru birleştirme artı günlük parite testi büyük olasılıkla daha az riskle aynı sonucu verir.

## Kategori ölmedi, soğuruldu

Peki bu alanda ne oldu? Kısa cevap: özellik deposu kategorisi ortadan kalkmadı, veri platformunun içine çekildi.

Databricks, Tecton’u satın aldığını [22 Ağustos 2025’te](https://www.databricks.com/blog/tecton-joining-databricks-power-real-time-data-personalized-ai-agents) duyurdu. Aynı tarafta eski Workspace Feature Store kullanımdan kaldırıldı; bugünkü yol, [Unity Catalog nesneleri olarak Feature View’lar](https://docs.databricks.com/aws/en/machine-learning/feature-store/) ve Lakebase üzerinden çevrim içi servis. Yani özellik deposu ayrı bir ürün olmayı bırakıp katalog ve göl evi katmanının bir parçası hâline geldi.

Bağımsız tarafta Feast ayakta: [0.65.0 sürümü 20 Temmuz 2026’da](https://pypi.org/project/feast/) yayımlandı, [deposunda](https://github.com/feast-dev/feast) yaklaşık 7,2 bin yıldız ve 4.681 işleme var, yol haritasına vektör arama (alfa) girmiş durumda. Ama README artık projeyi yalnızca bir topluluk projesi olarak tanımlıyor; bu, kendi başına okunması gereken bir cümle. Hopsworks tam yığını sunmayı sürdürüyor (SDK 5.0.4, 5 Ağustos 2026). Google ise Vertex AI belgelerinde artık bir Agent Platform Feature Store yüzeyini öne çıkarıyor.

Akademik tarafta da benzer bir sessizlik var: arXiv aramaları 2025-2026 döneminden özellik deposu makalesi getirmiyor ve konuya en yakın güncel çalışma, geleneksel özel yapım özellik depoları yerine [sorgulanabilir meta veri görünümlerini](https://arxiv.org/abs/2408.02498) savunuyor.

### Bundan ne çıkarmalı?

Problem gerçek ve kalıcı; ürün kategorisi ise veri platformunun bir özelliğine dönüştü. Pratik sonuç şu: yeteneği verinizin zaten yaşadığı yerden alın ya da gerçekten önemli olan iki şeyi kendiniz kurun. Hangi yolu seçerseniz seçin, özelliği üreten ekiple tüketen ekip arasındaki arayüz bir sözleşmedir; [veri sözleşmeleri](/posts/veri-sozlesmeleri/) yazısında anlattığımız disiplin, özellik tanımları için de aynen geçerlidir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Eğitim-servis farkı dünyanın değil, iki kod yolunuzun farkıdır; kayma zamanla gelir, fark ilk günden vardır.</li><li>Ayrışma hep aynı dört yerden çıkar: iki ayrı uygulama, farklı pencereler, farklı boş değer politikası, servis anında olmayan veri.</li><li>Noktasal-zaman doğruluğu, üretim tarafından bakılan veri sızıntısıdır; fazla iyi bir çevrimdışı skor genelde bir zaman ihlalidir.</li><li>Parite testi kurun: servis vektörünü kaydedin, eğitim dönüşümünden yeniden geçirin, özellik özellik farkı raporlayın.</li><li>Çoğu ekibin ihtiyacı ortak dönüşüm kütüphanesi ve noktasal-zaman doğru birleştirmedir; özellik deposu bunun ötesinde bir maliyettir.</li></ul></div>

<div class="faq"><details><summary>Üretimdeki sorunun kayma mı yoksa eğitim-servis farkı mı olduğunu nasıl anlarım?</summary><p>En hızlı ayrım zamanlamadır. Model yayına alındığı ilk günden itibaren beklenenden farklı davranıyorsa bu fark demektir, çünkü kaymanın oluşması zaman ister. Kesin kanıt için parite testi kurun: servis anında kullanılan özellik vektörünü kaydedip aynı girdileri eğitim dönüşümünden geçirin. Uyuşmazlık varsa tartışma biter.</p></details><details><summary>Özellik deposu kurmadan noktasal-zaman doğruluğunu sağlayabilir miyim?</summary><p>Evet. Gereken şey ürün değil desendir: özellik değerlerini geçerlilik zaman damgasıyla saklamak, eğitim setini olay zamanına göre geriye doğru birleştirmeyle kurmak ve özellik tablolarında yerinde güncelleme yapmamak. Bunlar standart bir veri ambarında da yapılabilir; özellik deposu bu deseni kolaylaştırır, tek yolu değildir.</p></details><details><summary>Özellik deposu kategorisi öldü mü?</summary><p>Hayır, soğuruldu. Databricks Tecton’u satın aldı ve yeteneği katalog katmanına taşıdı, Feast bağımsız bir topluluk projesi olarak sürüyor, Hopsworks tam yığını sunmayı sürdürüyor. Çözdüğü problem kalıcı; değişen şey, bunun ayrı bir ürün olarak mı yoksa veri platformunun bir özelliği olarak mı alındığıdır.</p></details></div>

---

Modelin sahada farklı davranmasının arkasında çoğu zaman gizemli bir dünya değişimi değil, aynı hesabın iki kez yazılmış olması yatar. Bu yüzden üretim kalitesinin ilk adımı yeni bir sistem kurmak değil, tanımı tekilleştirmek ve iddiayı ölçmektir. Ortak bir dönüşüm tanımı, olay zamanına saygı duyan bir birleştirme ve her gün çalışan bir parite testi; bu üçü, çoğu ekibin bir özellik deposundan beklediği faydanın büyük kısmını, çok daha az işletme maliyetiyle verir.
