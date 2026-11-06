---
title: "Konformal Tahmin: Dağılımdan Bağımsız Garantilerle Belirsizliği Ölçmek"
description: "Konformal tahmin, modelinizi değiştirmeden dağılımdan bağımsız kapsama garantisi verir. Bölmeli yöntemi adım adım, uyumsuzluk skorunu, garantinin sınırlarını ve marjinal kapsamanın koşullu kapsama olmadığını anlatıyoruz."
publishDate: "2026-08-13T23:14:00+03:00"
lang: tr
category: "Yöntem"
tags: ["Yöntem", "Yapay Zeka"]
translation: "conformal-prediction-uncertainty"
heroImage:
  src: "../../../assets/blog/covers/konformal-tahmin.jpg"
  alt: "Konformal Tahmin: Dağılımdan Bağımsız Garantilerle Belirsizliği Ölçmek"
---

Model bir cevap verir, siz de o cevabın ne kadar güvenilir olduğunu bilmek istersiniz. Konformal tahmin (conformal prediction) bu soruya alışılmadık biçimde net bir yanıt sunar: modelinizi hiç değiştirmeden, çıktıyı tek bir tahminden istediğiniz oranda doğru cevabı içeren bir kümeye ya da aralığa çevirir. Üstelik bunu verinin dağılımı hakkında hiçbir varsayım yapmadan yapar. Bu yazıda yöntemi adım adım kuruyor, garantinin tam olarak neyi vaat ettiğini ve pratikte en sık nerede yanlış okunduğunu anlatıyoruz.

## Tek bir cevaptan cevap kümesine

Deneyimli bir hekim size hiçbir zaman tek kelimelik bir teşhis vermez. Kolay vakalarda tek bir ad söyler, zor vakalarda ise kısa bir liste verir: şu üç ihtimalden biri. Listenin uzunluğu, hekimin ne kadar zorlandığını gösteren en dürüst sinyaldir.

Sınıflandırma modelleri ise neredeyse her zaman tek bir ad söyler. Yanına bir güven skoru koyarlar, ama o skorun ne anlama geldiği çoğu zaman belirsizdir. [Sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/) size modelin ortalamada ne kadar iyi olduğunu söyler; elinizdeki tek bir örnek için hiçbir şey vaat etmez.

**Konformal tahmin (conformal prediction)** bu boşluğu doldurur. Modelinizi değiştirmez, yeniden eğitmez, mimarisine dokunmaz. Üzerine ince bir katman koyar ve çıktıyı tek bir tahminden bir _kümeye_ (sınıflandırmada) ya da bir _aralığa_ (regresyonda) çevirir. Karşılığında size sayısal bir söz verir: bu kümeler, belirlediğiniz oranda gerçek cevabı içerir.

Bu, [model kalibrasyonundan](/posts/model-kalibrasyonu/) farklı bir vaattir. Kalibrasyon skorun ölçeğini düzeltir ve ortalamada doğru olasılıklar üretir. Konformal tahmin ise doğrudan bir kapsama oranını hedefler ve bunu dağılım varsayımı yapmadan yapar. İkisi rakip değil, tamamlayıcıdır: kalibre skorlar konformal katmanın daha küçük, daha kullanışlı kümeler üretmesini sağlar.

> Konformal tahmin modeli daha iyi yapmaz; modelin ne kadar iyi olduğunu dürüstçe itiraf etmesini sağlar.

## Bölmeli konformal tahmin adım adım

En yaygın ve en kolay anlaşılan biçim **bölmeli (tümevarımsal) konformal tahmindir (split / inductive conformal prediction)**. Üç adımdan oluşur ve üçü de sezgiseldir.

**Birinci adım: uyumsuzluk skoru.** Modelin bir örnekte ne kadar şaşırdığını ölçen bir sayı tanımlarsınız. Türkçe kaynaklarda uyumluluk skoru olarak da geçen bu büyüklük (**nonconformity score**), sınıflandırmada en basit haliyle modelin gerçek etikete verdiği olasılığın birden çıkarılmış halidir: model doğru cevaba ne kadar az olasılık verdiyse skor o kadar yüksektir. Regresyonda ise mutlak hatadır.

**İkinci adım: kalibrasyon kümesinde kuantil.** Modeli eğitirken hiç kullanmadığınız bir kalibrasyon bölmesindeki her örnek için bu skoru hesaplarsınız. Elinizde bir skor dağılımı olur. Hedeflediğiniz kapsama yüzde 90 ise, bu dağılımın yaklaşık yüzde 90'lık kuantilini alırsınız. Bu tek sayı, modelin normal şaşkınlık düzeyinin eşiğidir.

**Üçüncü adım: kümeyi kurmak.** Yeni bir örnek geldiğinde, bütün olası etiketleri tek tek denersiniz ve uyumsuzluk skoru bu eşiğin altında kalan her etiketi kümeye koyarsınız. Bitti.

```python
# Bolmeli konformal tahmin (pseudocode)
egitim, kalibrasyon, test = bol(veri)      # kalibrasyon egitimde HIC kullanilmaz
alpha = 0.10                               # hedef kapsama = %90

model = egit(egitim)

# 1) kalibrasyon bolmesinde uyumsuzluk skorlari
skorlar = []
for x, y in kalibrasyon:
    skorlar.append(1 - model.olasilik(x)[y])   # dogru etikete verilen olasilik

# 2) kuantil: (n+1)(1-alpha) yukari yuvarlanir -> sonlu ornek duzeltmesi
n = len(skorlar)
k = ceil((n + 1) * (1 - alpha))
q = sirala(skorlar)[k - 1]

# 3) yeni ornek icin kume: esigi gecmeyen her etiket iceri girer
def tahmin_kumesi(x):
    return [y for y in etiketler if 1 - model.olasilik(x)[y] <= q]

# Kume bos ya da cok genisse: model bu ornekte zorlaniyor demektir.
```

Kuantilde neden n yerine (n+1) var? Bu küçük düzeltme, garantinin sonsuz veriye değil, elinizdeki sonlu kalibrasyon kümesine dayanmasını sağlar. Bütün yöntemin sırrı bu ayrıntıda saklıdır.

## Garanti tam olarak neyi vaat ediyor

Konformal tahminin vaadi tek cümleyle şudur: ürettiğiniz kümeler, gerçek etiketi en az hedeflediğiniz oranda içerir. Bu cümlenin her kelimesinin bir bedeli ve bir sınırı var; sözleşmenin küçük yazılarını okumadan bu araç kullanılmaz.

-   **Dağılımdan bağımsız (distribution-free):** Verinin normal dağıldığını, hataların simetrik olduğunu ya da modelin doğru belirtildiğini varsaymaz. Model bir gradyan artırma ağacı da olabilir, derin bir ağ da, elle yazılmış bir kural kümesi de.
-   **Sonlu örnek (finite-sample):** Garanti asimptotik değildir. Kalibrasyon kümenizde birkaç yüz örnek varken de geçerlidir; yalnızca daha oynak olur.
-   **Marjinal (marginal):** Garanti ortalamadadır. Tüm test dağılımı üzerinden ortalama alındığında tutar. Belirli bir örnek, belirli bir sınıf ya da belirli bir alt grup için tutacağını söylemez.
-   **Değiştirilebilirlik (exchangeability) gerektirir:** Kalibrasyon ve test örneklerinin sırasının bir önemi olmamalıdır. Bu, bağımsız ve aynı dağılımlı olmaktan zayıf ama boş olmayan bir varsayımdır.

Bir de vaat _etmediği_ şey var: modelinizin iyi olduğu. Zayıf bir model hedefi yine tutturur, ama bunu kocaman kümelerle yapar. Beş sınıflı bir problemde her örnek için dört sınıfı birden içeren bir küme kusursuz biçimde geçerlidir ve tamamen işe yaramazdır. Bu yüzden konformal tahmin iki sayıyla birlikte raporlanır: **kapsama** ve **ortalama küme büyüklüğü**. Birincisi doğruluğun, ikincisi verimliliğin ölçüsüdür.

## Kümeler, aralıklar ve küme büyüklüğünün anlattığı

### Sınıflandırmada kümeler

Sınıflandırmada çıktı bir etiket listesidir. Kolay örneklerde tek elemanlı, zor örneklerde birkaç elemanlı olur. Boş küme ise özel bir işarettir: hiçbir etiket eşiğin altına girememiştir, yani model bu örneğe kalibrasyon verisinde gördüğü hiçbir şeye benzemeyen bir tepki vermiştir. Bu, [anomali tespiti](/posts/anomali-tespiti/) için doğrudan kullanılabilecek bir sinyaldir.

### Regresyonda aralıklar

Regresyonda çıktı bir alt ve üst sınırdır. En basit haliyle mutlak hataların kuantilini alır ve tahmine artı-eksi olarak eklersiniz; bu, her örnek için aynı genişlikte bir aralık verir. Daha gelişmiş varyantlar aralığı yerel zorluğa göre uyarlar; örneğin kuantil regresyon üzerine kurulan yöntemler, verinin gürültülü olduğu bölgelerde aralığı genişletir.

Asıl kazanç, küme büyüklüğünün _kullanılabilir_ bir büyüklük olmasıdır. Büyük küme, örneğin zor olduğunu söyler. Bunu bir iş kuralına çevirebilirsiniz: tek elemanlı kümeler otomatik geçer, çok elemanlı kümeler insana gider. Böylece belirsizlik nicelemesi (uncertainty quantification) bir grafik olmaktan çıkıp iş akışının parçası olur.

Aynı sinyal etiketleme bütçesi için de değerlidir. [Aktif öğrenmede](/posts/aktif-ogrenme/) hangi örneklerin etiketleneceğine karar verirken ham güven skoru yerine küme büyüklüğünü kullanmak, tanımı gereği daha anlamlı bir zorluk ölçüsü sağlar.

<div class="callout"><strong>İpucu:</strong> Kapsama oranını tek başına raporlamayın. Yanına ortalama küme büyüklüğünü ve boş küme oranını da koyun. Hedefini tutturan ama kümeleri şişmiş bir sistem, teknik olarak doğru, pratikte işe yaramazdır.</div>

## Marjinal kapsama, koşullu kapsama değildir

Bu yazıdan tek bir şey hatırlayacaksanız, bu bölüm olsun. Konformal tahminin en sık yapılan yanlış okuması, marjinal garantiyi koşullu bir garanti sanmaktır.

Marjinal kapsama, bütün test dağılımı üzerinden ortalama alınmış kapsamadır. Sisteminiz hedefini tam tutturabilir ve aynı anda belirli bir sınıfta, belirli bir bölgede ya da belirli bir demografik alt grupta hedefin sistematik olarak altında kalabilir. Ortalama, çoğunluk sınıfındaki fazla kapsamayı azınlık sınıfındaki eksik kapsamayla takas eder ve sonuç raporda kusursuz görünür.

Bu yalnızca teorik bir endişe değil; azınlık sınıfının marjinal konformal tahminde sistematik olarak eksik kapsandığı [açıkça belgelenmiş bir olgu](https://arxiv.org/abs/2607.06605). Zaten [sınıf dengesizliği](/posts/sinif-dengesizligi/) ile uğraşıyorsanız, kalibrasyon kümenizde azınlık sınıfına ait az sayıda örnek vardır ve o sınıfın skor dağılımı ortak kuantilin içinde kaybolur.

> Yüzde 90 kapsama, herkesin yüzde 90 kapsandığı anlamına gelmez. Ortalamanın kimin lehine çalıştığını sormadan hiçbir garanti okunmamalıdır.

Çare kavramsal olarak basittir: tek bir ortak kuantil yerine grup başına ayrı kuantil hesaplayın. Sınıf koşullu ya da Mondrian konformal olarak anılan bu yaklaşım, her grup için ayrı bir eşik kullanır ve garantiyi grup düzeyine taşır. Bedeli de açıktır: her grubun kendi kalibrasyon örneklerine ihtiyacı vardır, bu yüzden çok küçük gruplarda eşik oynak hale gelir. Yine de doğru soru şudur: garantiyi kim için istiyorsunuz? Cevap ortalama bir kullanıcı değilse, koşullu sürüme geçmeniz gerekir.

## Uygulamada: kayma, varsayımlar ve araçlar

Değiştirilebilirlik varsayımı, konformal tahminin tek gerçek kırılganlığıdır. Veri dağılımı zamanla kaydığında kalibrasyon kümeniz artık geleceği temsil etmez ve garanti sessizce erir. Mevsimsellik taşıyan zaman serilerinde, kullanıcı tabanı değişen ürünlerde ve kampanya dönemlerinde bu durum kuraldır, istisna değil. Uyarlamalı ve çevrimiçi varyantlar bu sorunu hedefler, ama hiçbiri sizi kalibrasyon kümesini tazelemekten kurtarmaz.

Araç tarafında ekosistem hızlı hareket ediyor ve internetteki tavsiyelerin önemli bir kısmı bayat. Python tarafında en görünür kütüphane olan [MAPIE](https://pypi.org/project/MAPIE/) 1.5.0 sürümünü 5 Ağustos 2026'da yayımladı; 22 Mayıs 2025'teki v1.0.0 sürümü ise API'yi kırdı, yani 0.x döneminden kalma öğreticilerdeki kod olduğu gibi çalışmaz. [MAPIE](https://mapie.readthedocs.io/en/stable/) scikit-learn-contrib altındadır; Capgemini Invent, Quantmetry, Michelin ve ENS Paris-Saclay katkısıyla sürdürülür ve 2026 güncellemeleri büyük dil modelleri ile görüntü bölütlemesi için risk kontrolü ve uyarlamalı konformal yöntemler ekler. Alternatifler arasında konformal öngörü sistemleri ile değiştirilebilirlik testi martingalleri ekleyen crepes 0.9.1 (Haziran 2026) ve 1.2.1 sürümündeki TorchCP sayılabilir.

<div class="callout"><strong>İpucu:</strong> Hâlâ AWS Fortuna ya da <code>nonconformist</code> öneren sayfalara rastlarsanız, o sayfa güncelliğini yitirmiştir. Fortuna deposu 23 Nisan 2025'te <a href="https://github.com/awslabs/fortuna" target="_blank" rel="noopener">arşivlendi</a>, <code>nonconformist</code> ise son sürümünü 2017'de verdi. Bu, o sayfadaki diğer tavsiyeler için de bir uyarı işaretidir.</div>

Kavramsal giriş için Angelopoulos ve Bates'in [A Gentle Introduction to Conformal Prediction](https://arxiv.org/abs/2107.07511) metni hâlâ en iyi başlangıç noktası. Daha derine inmek isteyenler için Angelopoulos, Barber ve Bates'in Cambridge University Press için hazırladığı ve 6 Mart 2026'da güncellenen [Theoretical Foundations of Conformal Prediction](https://arxiv.org/abs/2411.11824) taslağı var. Bu kitap sık sık yanlış atıfla anılıyor; yazarları arasında Candès yoktur.

Son olarak düzenleme boyutu: [AB Yapay Zekâ Yasası'nın 15. maddesi](https://artificialintelligenceact.eu/article/15/) sağlayıcıdan doğruluk seviyelerini ve ilgili metrikleri beyan etmesini istiyor. Tek bir doğruluk yüzdesi beyan etmek yerine, hedeflenen ve doğrulanmış bir kapsama oranı beyan etmek hem daha savunulabilir hem de denetlenmesi daha kolay bir ifadedir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Konformal tahmin modeli değiştirmez; çıktıyı kapsama garantili bir kümeye ya da aralığa çevirir.</li><li>Yöntem üç adımdır: uyumsuzluk skoru, kalibrasyon kümesinde kuantil, eşiği geçmeyen etiketlerin kümesi.</li><li>Garanti dağılımdan bağımsız, sonlu örnek ve marjineldir; değiştirilebilirlik varsayımına dayanır.</li><li>Marjinal kapsama koşullu kapsama değildir: sistem hedefi tutturup azınlık sınıfını eksik kapsayabilir.</li><li>Kapsamayı asla tek başına raporlamayın; ortalama küme büyüklüğü verimliliğin ölçüsüdür.</li></ul></div>

<div class="faq"><details><summary>Konformal tahmin için modelimi yeniden eğitmem gerekir mi?</summary><p>Hayır. Bölmeli konformal tahmin modeli olduğu gibi kullanır; tek ihtiyacınız eğitimde kullanılmamış bir kalibrasyon bölmesidir. Zaten eğitilmiş, hatta içine bakamadığınız bir modelin üzerine de uygulanabilir.</p></details><details><summary>Kalibrasyon kümesinde kaç örnek olmalı?</summary><p>Kesin bir sayı yerine şu sezgiyle çalışın: kuantili tahmin ediyorsunuz, yani hedeflediğiniz kapsamanın kuyruğunda yeterince örnek bulunmalı. Küçük kümelerde eşik oynak olur ve gerçekleşen kapsama hedefin etrafında dalgalanır. Grup bazlı garanti istiyorsanız bu ihtiyaç her grup için ayrı ayrı geçerlidir.</p></details><details><summary>Kalibrasyon mu konformal tahmin mi kullanmalıyım?</summary><p>İkisi farklı işler yapar. Kalibrasyon skorun olasılık ölçeğini düzeltir, konformal tahmin ise bir kapsama oranı garanti eder. Kalibre skorlar konformal kümelerin daha küçük olmasını sağladığı için pratikte ikisini birlikte kullanmak en iyi sonucu verir.</p></details></div>

---

Konformal tahmin, belirsizliği ölçmenin nadiren rastlanan bir özelliğini taşır: ne vaat ettiği ve neyi vaat etmediği tam olarak yazılıdır. Bu yüzden onu bir sihir olarak değil, bir sözleşme olarak okuyun. Sözleşmenin geçerli olduğu koşulları koruduğunuz sürece, modeliniz size ilk kez gerçekten dürüst bir belirsizlik ifadesi verecek.
