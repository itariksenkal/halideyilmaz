---
title: "Zaman Serisi Temel Modelleri: Sıfır-Atış Tahmin Artık Klasik Yöntemleri Geçiyor — Peki Sizin Verinizde de Geçer mi?"
description: "Cevap değişti ve içeriklerin çoğu bunu yakalamadı. fev-bench ile GIFT-Eval'in gerçekte ne raporladığı, LLM tabanlı tahmincilerin neden ayrı bir hikâye olduğu ve kendi serinizde karşılaştırmayı dürüst kurmanın yolu."
publishDate: "2026-08-13T23:07:00+03:00"
lang: tr
category: "Yöntem"
tags: ["Yöntem", "Yapay Zeka"]
translation: "time-series-foundation-models"
heroImage:
  src: "../../../assets/blog/covers/zaman-serisi-temel-modelleri.jpg"
  alt: "Zaman Serisi Temel Modelleri: Sıfır-Atış Tahmin Artık Klasik Yöntemleri Geçiyor — Peki Sizin Verinizde de Geçer mi?"
---

Zaman serisi tahmininde iki yıl önce doğru olan cümle bugün yanlış. 2024 döneminde yazılan “temel modeller hâlâ ARIMA'yı geçemiyor” değerlendirmesi geçerliliğini yitirdi; ama lansman metinlerindeki “artık tahmin çözüldü” cümlesi de doğru değil. Dürüst manşet ikisinin ortasında duruyor: **zaman serisi için özel olarak eğitilmiş temel modeller kazandı, bir dil modelini tahmine cıvatalama fikri kazanmadı.** Bu yazıda rakamların ne söylediğini, neyi söylemediğini ve kendi serinizde karşılaştırmayı nasıl kuracağınızı anlatıyoruz.

## Cevap değişti; içeriklerin çoğu hâlâ eski cevabı yazıyor

Bu konuda arama yaptığınızda karşınıza iki tür yazı çıkıyor. Birincisi model duyurularının etrafında oluşan lansman içeriği: “sıfır-atış tahmin her şeyi geçiyor”. İkincisi 2024 döneminde yazılmış ve o günün kanıtlarıyla haklı olan eleştiri: “temel modeller basit istatistiksel yöntemlerin gerisinde kalıyor”. Bugün ikisi de yanıltıcı.

Aradaki fark, ölçüm tarihiyle ilgili. Alan hızlı ilerledi ve 2025 sonunda yayımlanan kıyaslamalar önceki değerlendirmelerin sonucunu tersine çevirdi. Ama bir kıyaslama sonucunun tersine dönmesi, tersine dönmüş hâlinin kalıcı olduğu anlamına gelmiyor; sadece elimizdeki en güncel ölçümün ne dediğini gösteriyor.

Bu yüzden bu yazıda her sayıyı, o sayıyı raporlayan tarihli makaleye bağlayacağım. Bir kıyaslama tablosunu “şu an durum bu” diye aktarmak, altı ay içinde yanlışa dönüşen en yaygın yazım hatasıdır.

> Bir kıyaslama tablosu, tabloda yer alan modeller ve veri kümeleri hakkında bir şey söyler. Sizin seriniz o tabloda yok.

Ve asıl mesele de bu. Yüz görev üzerinde ölçülmüş bir kazanma oranı, sizin haftalık talep serinizde ne olacağını söylemez. Yazının ikinci yarısı tam olarak bu soruya ayrılmış durumda: karşılaştırmayı kendi verinizde nasıl kurarsınız?

## Sıfır-atış tahmin ne demek ve neden işe yarıyor?

Klasik yaklaşımda her seri için ayrı bir model kurarsınız: veriye bakar, mevsimselliği belirler, parametreleri o serinin geçmişine göre tahmin edersiniz. Bu, [zaman serisi tahmini](/posts/zaman-serisi-tahmini/) yazısında anlattığımız düzenin kendisidir ve iyi çalışır — yeterince geçmişiniz olduğu sürece.

Zaman serisi temel modeli (time-series foundation model) bu düzeni tersine çevirir. Model, milyonlarca farklı seriden oluşan geniş bir korpusla önceden eğitilir. Öğrendiği şey belirli bir serinin parametreleri değil, serilerin genel gramerdir: trend nasıl görünür, mevsimsellik nasıl kırılır, bir sıçrama nasıl sönümlenir. Sonra hiç görmediği bir seriyi girdi olarak alır ve **hiçbir eğitim yapmadan** tahmin üretir. Sıfır-atış (zero-shot) tahmin budur.

Bunun neden işe yaradığını görmek için en zayıf durumu düşünün: elinizde on sekiz aylık bir seri var. Mevsimselliği güvenle kestirmeye yetmez, bir makine öğrenmesi modeli eğitmeye hiç yetmez. Klasik yolla yapabileceğiniz en iyi şey, kaba bir varsayımla parametre uydurmaktır. Önceden eğitilmiş bir model ise bu seriye, daha önce gördüğü binlerce benzer desenin bilgisiyle bakar. Az veri rejiminde avantajı buradan gelir.

Ölçek de artık devasa değil. Chronos-2 ([Ekim 2025, 120 milyon parametre](https://github.com/amazon-science/chronos-forecasting)) ve TimesFM 2.5 ([Eylül 2025, 200 milyon parametre, 16 bin bağlam uzunluğu](https://github.com/google-research/timesfm)) bugünün dil modelleriyle kıyaslandığında küçük modeller. Bu, kurulum maliyetini pek çok ekip için makul hâle getiriyor.

## Rakamlar ne diyor — ve hangi tarihte diyor?

[fev-bench makalesinde raporlandığı hâliyle](https://arxiv.org/abs/2509.26468), 7 alandan toplanmış 100 görev üzerinde sonuçlar şöyle: kazanma oranı ve beceri skoru (skill score) sırasıyla,

-   **Chronos-2:** %91,4 kazanma oranı, %47,3 beceri skoru.
-   **TiRex:** %83,3 ve %42,6.
-   **TimesFM-2.5:** %79,6 ve %42,2.
-   **İstatistiksel topluluk (Statistical Ensemble):** %45,5 ve %20,7.
-   **CatBoost:** %34,4 ve %23,0.
-   **Mevsimsel naif (Seasonal Naive):** %19,6 ve %0,0.

Makalenin kendi sonucu da açık: önceden eğitilmiş modellerin tümü, en iyi istatistiksel ve göreve özel modellerden hem belirgin biçimde daha doğru hem de daha hızlı. “Daha hızlı” kısmı çoğu özette atlanıyor ama pratikte belirleyici olabilir.

İkinci bir ölçü çubuğu olarak [GIFT-Eval](https://arxiv.org/abs/2410.10393) var: 23 veri kümesi, 144.000 zaman serisi, 177 milyon veri noktası, 7 alan, 10 farklı frekans ve 17 temel karşılaştırma yöntemi. Tek bir kıyaslamaya yaslanmak yerine iki bağımsız düzeneğe bakmak, sonucun düzeneğe özgü olup olmadığını anlamanın en ucuz yoludur.

<div class="callout"><strong>İpucu:</strong> Yukarıdaki sayılar, ilgili makalelerin yayımlandığı andaki ölçümlerdir; bugünkü canlı sıralama değildir. Liderlik tabloları hareket eder: yeni model sürümleri çıkar, veri kümeleri güncellenir, değerlendirme protokolleri değişir. Bir karar vermeden önce ilgili kıyaslamanın güncel tablosuna bakın ve hangi sürümün ölçüldüğünü not edin.</div>

Bir uyarı daha: kazanma oranı ile hata büyüklüğü aynı şey değildir. Bir model görevlerin %91'inde önde olabilir ama her birinde kıl payı önde olabilir. Tek bir toplam metriğin dağılımı nasıl sakladığı, [metrik seçimi](/posts/degerlendirme-metrikleri/) tartışmasının değişmez konusudur; zaman serisinde de aynen geçerlidir.

## Karşı ağırlık: LLM'i tahmine cıvatalamak işe yaramadı

Bu yazının pazarlama metnine dönüşmemesi için burada durup önemli bir ayrım yapmak gerekiyor. Zaman serisi tahmininde iki farklı fikir aynı başlık altında anıldı:

-   **Zaman serisi için özel olarak önceden eğitilmiş modeller** — Chronos ailesi gibi. Mimari ve eğitim korpusu doğrudan seriler için tasarlanmıştır.
-   **Dil modeli uyarlamalı tahminciler** — hazır bir LLM'in, sayısal serileri işleyecek biçimde uyarlanması.

İkinci gruba yönelik [bir çalışma](https://arxiv.org/abs/2406.16964) şunu buluyor: bu tahmincilerden LLM bileşenini çıkarmak ya da onu basit bir dikkat katmanıyla değiştirmek, tahmin performansını düşürmüyor. Yani modelin başarısı, iddia edilenin aksine dil modelinden gelmiyordu.

Bu bulguyu dikkatle okuyun: **eleştiri LLM uyarlamalı tahmincileri hedefliyor, Chronos gibi amaca özel zaman serisi temel modellerini değil.** İki sonucu birbirine karıştırmak, alanda en sık yapılan alıntı hatası. Doğru özet şu: önceden eğitim fikri işe yaradı, dil modelini araya sıkıştırma fikri işe yaramadı.

Benzer bir hikâye tablo verisi tarafında da yaşanıyor ve aynı temkini gerektiriyor. TabPFN-3 için raporlanan sonuç iddialı: [1 milyon eğitim satırına kadar olan veri kümelerinde, sekiz saat ayarlanmış gradyan artırmalı ağaç temel modellerini geçiyor](https://arxiv.org/abs/2605.13986). Buna karşılık bağımsız bir [sigorta fiyatlama çalışması](https://arxiv.org/abs/2605.22892), aynı yaklaşımın yerleşik temel yöntemleri tutarlı biçimde geçmediğini buluyor. İkisi de doğru olabilir; çünkü “ortalamada kazanıyor” ile “sizin alanınızda kazanıyor” aynı cümle değildir.

## Sizin serinizde kazanır mı? Karşılaştırmayı doğru kurmak

Bir kıyaslama tablosu size aday listesi verir, karar vermez. Kararı ancak kendi verinizdeki ölçüm verir ve bu ölçümü kurmanın belirli bir disiplini var.

### Ölçüm düzeni

-   **Önce mevsimsel naif taban çizgisi.** Bir sonraki dönemi geçen yılın aynı dönemine eşitleyen bu basit kural, şaşırtıcı sayıda üretim serisinde yenilmesi zor bir rakiptir. Onu geçemeyen hiçbir model tartışmaya girmez.
-   **İleri kaydırmalı doğrulama (walk-forward validation).** Zaman serisinde rastgele bölme, geleceği geçmişe sızdırır. Kesme noktasını ileri kaydırarak birden çok kez tahmin edin ve hataları o pencereler üzerinden toplayın.
-   **Her aday için aynı ufuk, aynı kesme noktası.** Farklı ufuklarda ölçülmüş iki model karşılaştırılamaz. Bu, en sık yapılan ve en kolay kaçırılan hatadır.
-   **Sızıntı kontrolü.** Sıfır-atış model, önceden eğitim korpusunda sizin veri kümenizin kamuya açık bir sürümünü görmüş olabilir. Kamuya açık bir veri kümesiyle test ediyorsanız bu ihtimali not edin.

```text
# Adil bir zaman serisi karsilastirmasi (pseudocode)
adaylar = [mevsimsel_naif, istatistiksel_model, gbdt_modeli, temel_model]
ufuk = 28                                  # tum adaylar icin ayni
for kesme in ileri_kaydirmali_pencereler(seri, adim=ufuk, sayi=12):
    gecmis = seri[:kesme]                  # kesmeden sonrasi gorulmez
    for aday in adaylar:
        t0 = simdi()
        tahmin = aday.tahmin(gecmis, ufuk)  # ayni ufuk, ayni kesme
        kaydet(aday, kesme, hata(tahmin, seri[kesme:kesme+ufuk]),
               gecikme=simdi()-t0)          # maliyet de sonucun parcasi
# Pencereler uzerinden ortalama alin ve dagilimi da raporlayin;
# tek bir pencere, model degil sans olcer.
```

### Maliyeti sonucun bir parçası sayın

Bir modelin hata metriğini raporlayıp çıkarım maliyetini ve gecikmesini raporlamamak, kararın yarısını gizlemektir. On bin seriyi her gece tahmin edecekseniz, %2 daha iyi ama otuz kat daha pahalı bir model çoğu zaman yanlış tercihtir. fev-bench makalesinin “daha hızlı” vurgusu tam da bu yüzden önemli: hız burada bir konfor değil, karar değişkeni.

<div class="callout"><strong>İpucu:</strong> Pencereler arasındaki farkı da raporlayın. İki modelin ortalama hatası birbirine yakınsa, aradaki farkın gürültüden ayırt edilip edilemediğini sormanız gerekir — bu tam olarak <a href="/posts/model-karsilastirma-istatistik/">model karşılaştırmasında istatistiksel anlamlılık</a> meselesidir. Tek bir ondalık basamak farkına dayanarak mimari değiştirmeyin.</div>

## Klasik yöntemler hâlâ ne zaman kazanır?

Kıyaslamalardaki genel üstünlük, klasik yöntemlerin emekli olduğu anlamına gelmiyor. Dört durumda hâlâ ilk tercih olmayı sürdürüyorlar.

-   **Güçlü ve bilinen mevsimsellik:** mevsimselliği zaten kesin olarak bildiğiniz bir seride — resmî tatiller, maaş günleri, akademik takvim — bu bilgiyi doğrudan modele yazmak, modelin veriden keşfetmesini beklemekten daha güvenilirdir.
-   **Kontrol etmeniz gereken dışsal değişkenler:** fiyat, promosyon, hava durumu gibi girdilerin etkisini _ayrı ayrı görmeniz_ gerekiyorsa, katsayıları okunabilen bir model size bir temel modelin veremeyeceği şeyi verir.
-   **Sıkı yorumlanabilirlik gereksinimi:** tahminin nasıl oluştuğunu bir denetçiye veya bir yönetim kuruluna anlatmanız gerekiyorsa, açıklanabilir bir yapı pazarlık konusu değildir.
-   **Küçük hesaplama bütçesi:** uç cihazda, gömülü bir sistemde veya milyonlarca seriyi saatte bir güncellemeniz gereken bir hatta, istatistiksel bir model hâlâ en ucuz doğru cevaptır.

Bir de sınırı doğru çizmek gerekiyor: tahmin ile [anomali tespiti](/posts/anomali-tespiti/) aynı iş değildir. Bir temel model iyi bir beklenen değer üretebilir, ama “bu nokta anormal mi” sorusu bir eşik, bir belirsizlik bandı ve bir yanlış alarm bütçesi gerektirir. Tahmin modelini değiştirmek, anomali tespitinizin kalibrasyonunu da bozar; ikisini aynı anda değiştirmeyin.

> Doğru soru “hangi model daha iyi” değil, “bu kararı hangi ölçümle vereceğim” sorusudur. İkinci soruyu cevaplayan ekip, birinci sorunun cevabı değiştiğinde de hazırdır.

Pratik bir kapanış tavsiyesi: temel modeli mevcut hattınıza rakip olarak değil, _ek bir aday_ olarak ekleyin. Mevsimsel naif taban çizgisi, mevcut modeliniz ve bir sıfır-atış temel model — üçünü aynı düzenekte, aynı ufukta, aynı kesme noktalarıyla ölçün. Kararı tablo değil, sizin ölçümünüz versin.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Cevap değişti: fev-bench makalesinde raporlandığı hâliyle önceden eğitilmiş modeller istatistiksel ve göreve özel modellerden hem daha doğru hem daha hızlı çıktı.</li><li>Amaca özel zaman serisi temel modelleri kazandı; LLM uyarlamalı tahmincilerde LLM bileşenini çıkarmak performansı düşürmedi.</li><li>Yüz görev üzerinde ölçülmüş bir kazanma oranı, sizin serinizde ne olacağını söylemez; kararı kendi ölçümünüz verir.</li><li>Karşılaştırmayı mevsimsel naif taban çizgisiyle, ileri kaydırmalı doğrulamayla ve her aday için aynı ufuk ve kesme noktasıyla kurun.</li><li>Klasik yöntemler bilinen mevsimsellik, dışsal değişkenler, yorumlanabilirlik ve küçük hesap bütçesi durumlarında hâlâ ilk tercih olabilir.</li></ul></div>

<div class="faq"><details><summary>Temel model kullanırsam artık model eğitmem gerekmiyor mu?</summary><p>Eğitim gerekmeyebilir, ama değerlendirme her hâlükârda gerekir. Sıfır-atış tahmin, hiç görmediği bir seri için doğrudan çıktı üretir; bu kurulum maliyetini büyük ölçüde ortadan kaldırır. Buna karşılık modelin sizin serinizde iyi çalıştığını yalnızca kendi ileri kaydırmalı ölçümünüz gösterir. Ayrıca çıkarım maliyeti ve gecikme, artık kararın parçasıdır.</p></details><details><summary>Kıyaslama tablolarındaki sıralamaya güvenebilir miyim?</summary><p>Bir başlangıç noktası olarak evet, bir karar olarak hayır. Bu yazıdaki sayılar ilgili makalelerin raporladığı ölçümlerdir, bugünkü canlı sıralama değil; liderlik tabloları model sürümleri ve protokoller değiştikçe hareket eder. Karar vermeden önce ilgili kıyaslamanın güncel tablosuna bakın ve tabloda hangi sürümün ölçüldüğünü not edin.</p></details><details><summary>Kısa serilerde gerçekten avantaj var mı?</summary><p>Az veri rejimi, önceden eğitilmiş modellerin en güçlü olduğu yer. On sekiz aylık bir seride mevsimselliği güvenle kestirmek ya da bir makine öğrenmesi modeli eğitmek mümkün değildir; önceden eğitilmiş bir model ise seriye daha önce gördüğü desenlerin bilgisiyle bakar. Yine de mevsimsel naif taban çizgisiyle karşılaştırmadan karar vermeyin.</p></details></div>

---

Özetle: zaman serisi tahmininde varsayılan başlangıç noktası değişti ve bunu kabul etmemek eskimiş bir bilgiyle çalışmak demek. Ama bir kıyaslamanın manşeti, sizin serinizin ölçümü değildir. Doğru refleks basit: mevsimsel naifi taban alın, adayları aynı düzenekte ölçün, maliyeti sonuca dahil edin ve bir yıl sonra aynı ölçümü tekrar çalıştırın.
