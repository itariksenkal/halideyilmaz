---
title: "Makine Unutması: Bir Modele Bir Kişiyi Gerçekten Unutturabilir misiniz?"
description: "Bir modele bir kişiyi unutturmak, veritabanından satır silmeye benzemiyor. Tam ve yaklaşık unutma, unutulanı geri getiren saldırılar, ispat sorunu, EDPB kılavuzları ve gerçekten işe yarayan cevap: silinebilir bir veri mimarisi."
publishDate: "2026-08-13T23:08:00+03:00"
lang: tr
category: "Gizlilik"
tags: ["Gizlilik", "Yapay Zeka"]
translation: "machine-unlearning-right-to-be-forgotten"
heroImage:
  src: "../../../assets/blog/bimg-02.jpg"
  alt: "Makine Unutması: Bir Modele Bir Kişiyi Gerçekten Unutturabilir misiniz?"
---

Bir kullanıcı size yazıp verilerinin silinmesini istiyor. Veritabanı tarafı kolay: satırı silersiniz, yedekleri işaretlersiniz, iş biter. Ama o kişinin verisiyle eğitilmiş bir model üretimdeyse, o model hâlâ ayakta ve ağırlıklarının içinde o kişiden gelen bir şeyler var. İşte makine unutması (machine unlearning) tam bu boşluğu doldurmaya çalışan alan. Dürüst cevabı baştan söyleyelim: bugün elimizdeki yaklaşık yöntemler kırılgan, “unutturuldu” denen davranış geri getirilebiliyor ve asıl çözüm modelde değil, veri mimarisinde.

## Kekten yumurtayı geri çıkarmak

Klasik benzetme hâlâ en iyisi: eğitim, malzemeleri karıştırıp kek pişirmeye benzer. Bir kaydı silmek istediğinizde sizden istenen şey, pişmiş kekten yumurtayı geri çıkarmaktır. Yumurta ortada görünmez ama her yerdedir; dokusuna, kabarmasına, rengine karışmıştır.

Model tarafında da durum böyledir. Bir örnek modele girdiğinde bir hücrede saklanmaz; gradyanlar üzerinden milyonlarca parametreye dağılmış küçük bir etki bırakır. “Şu satırı sil” talebinin model karşılığı, bu dağılmış etkiyi geri almaktır — ve bunun kolay bir yolu yoktur.

Alanın kafa karışıklığının büyük kısmı, birbirine karıştırılan iki farklı işten geliyor. Ayırt etmeye değer:

-   **Bir eğitim kaydını silmek:** belirli bir kişinin verisinin model üzerindeki etkisini kaldırmak. Bu bir gizlilik ve hukuk problemidir; ölçüsü, o kaydın hiç kullanılmamış olmasıyla ayırt edilemez bir modele ulaşmaktır.
-   **Bir model yeteneğini kaldırmak:** modelin belirli bir konudaki bilgisini veya davranışını yok etmek. Bu bir güvenlik problemidir ve tek bir kayda bağlı değildir; aynı bilgi yüzlerce farklı kaynaktan gelmiş olabilir.

İki problem farklı başarı ölçütlerine sahiptir, farklı yöntemler ister ve farklı biçimlerde başarısız olur. Aynı cümlede “unutma” diye anıldıkları için, bir tanesi için üretilmiş bir çözüm diğerine satılabiliyor.

> Silmek bir olaydır; unutmak bir iddiadır. Aradaki fark, ispat yükümlülüğüdür.

## Tam unutma: yeniden eğitim ve onu ucuzlatmanın yolu

Tam unutmanın (exact unlearning) tanımı basittir: söz konusu veri hiç kullanılmamış gibi bir model elde etmek. Bunu garanti eden tek yöntem de bilinen en pahalı yöntemdir — **veriyi çıkarıp sıfırdan yeniden eğitmek.** Küçük bir modelde makul; büyük bir modelde her silme talebinde yapılamaz.

Bu maliyeti sınırlamanın mimari bir yolu var: veriyi baştan parçalara (shard) ayırıp her parça için ayrı bir alt model eğitmek ve çıktıları birleştirmek. SISA olarak bilinen bu yaklaşımda bir kayıt silindiğinde, yalnızca o kaydın bulunduğu parçanın yeniden eğitilmesi gerekir; diğer parçalar olduğu gibi kalır. Parçaların içi ayrıca dilimlenip ara kontrol noktaları tutulursa, yeniden eğitim silinen kaydın bulunduğu dilimden itibaren başlar ve maliyet daha da düşer.

Bedeli var: her alt model daha az veri gördüğü için tek büyük modele kıyasla biraz doğruluk kaybedersiniz ve topluluk yapısı çıkarım maliyetini artırır. Ama asıl kısıt teknik değil, zamansal: **bu yapı eğitimden önce kurulur.** Model çoktan üretimdeyse, sonradan SISA'ya geçemezsiniz; yeniden eğitmeniz gerekir — yani kaçındığınız şeyi yapmanız gerekir.

Bu yüzden makine unutmasını bir “kriz anı çözümü” olarak değil, bir mimari tercih olarak düşünmek gerekir. Silme talebi geldiğinde verilecek cevap, talep gelmeden aylar önce yazılmıştır.

## Yaklaşık unutma ve neden kırılgan olduğu

Yeniden eğitim pahalı olduğu için alan, ucuz alternatiflere yöneldi. Yaklaşık unutma (approximate unlearning) genel olarak modelin ağırlıklarını hedefli biçimde düzenlemeye dayanır.

### Yaygın yaklaşımlar

-   **Gradyan tabanlı düzenleme:** unutulacak veri üzerinde ters yönde bir güncelleme uygulanır — kabaca “bu örnekleri öğrenmenin tersini yap”.
-   **Etki fonksiyonu (influence function) yaklaşımları:** bir örneğin ağırlıklara katkısı analitik olarak tahmin edilir ve bu tahmin geri çıkarılır. Tahminin kendisi bir yaklaşıklıktır ve büyük modellerde hata payı büyür.
-   **Kalan veriyle ince ayar:** model, tutulacak veri üzerinde yeniden eğitilerek unutulacak davranışın üzeri örtülür.

Bu yöntemler ölçülen metriklerde genellikle iyi görünür: unutulması istenen içerik sorulduğunda model artık cevap vermez. Sorun, bunun ne kadar derin olduğu. [“Unlearning Isn't Deletion” çalışması](https://arxiv.org/html/2505.16831v3) tam bu noktayı inceliyor ve unutmanın büyük ölçüde _geri döndürülebilir_ olduğunu gösteriyor. Yani davranış kaldırılmamış, bastırılmıştır.

Daha rahatsız edici olan, geri getirmenin ne kadar kolay olabildiği: [yeniden öğrenme saldırısı çalışmaları](https://arxiv.org/pdf/2502.05374), küçük miktarda ve _zararsız_ veriyle yapılan bir ince ayarın unutturulmuş davranışı geri getirebildiğini raporluyor. Saldırganın silinen veriye erişmesi gerekmiyor; ilgili alandan sıradan metin yeterli olabiliyor.

Doğru zihinsel model şu: yaklaşık unutma, lekenin üzerini boyamaya benzer. Uzaktan bakınca leke yoktur. Yüzeyi biraz zımparalayan biri için hâlâ oradadır.

## Asıl zor kısım: unuttuğunu nasıl ispatlarsınız?

Bu alanda en çok hafife alınan soru budur. Bir modelin bir şeyi _unuttuğunu_ nasıl gösterirsiniz? “Sorduk, cevap vermedi” bir kanıt değildir; modelin cevabı reddetmesi ile bilgiyi taşımaması farklı şeylerdir. Ölçüt aslında daha katıdır: unutulmuş modelin, o veriyle hiç eğitilmemiş bir modelden ayırt edilememesi gerekir.

Bu ölçütü pratikte uygulamak zordur, çünkü karşılaştıracağınız referans model çoğu zaman elinizde yoktur — onu üretmek zaten kaçındığınız yeniden eğitim demektir. Sonuç olarak alan, dolaylı testlerle çalışır: üyelik çıkarımı sınamaları, hedefli sorgu kümeleri, davranışsal sondalar.

Bu zorluğun ne kadar temel olduğunu gösteren iyi bir kanıt var: yaklaşık 1.200 takımın katıldığı [NeurIPS makine unutması yarışmasının raporu](https://arxiv.org/abs/2406.09073), unutmanın _kıyaslanmasının kendisinin_ açık bir problem olduğu sonucuna varıyor. Yani yalnızca “nasıl unuttururuz” değil, “unutturduğumuzu nasıl ölçeriz” sorusu da hâlâ çözülmüş değil.

Bugün kullanılan kıyaslamalar TOFU, MUSE ve WMDP. Bunları benimserken tek bir şeyi hatırlayın: her biri belirli bir unutma tanımını ölçer, hepsini birden değil. Bir kıyaslamada iyi skor almak, sizin hukuki yükümlülüğünüzün karşılandığı anlamına gelmez.

<div class="callout"><strong>İpucu:</strong> Unutma değerlendirmesini üç ayrı eksende raporlayın: <em>unutma başarısı</em> (hedef davranış gitti mi), <em>fayda kaybı</em> (kalan görevlerde model ne kadar bozuldu) ve <em>dayanıklılık</em> (küçük bir ince ayarla davranış geri geliyor mu). Üçüncü ekseni ölçmeyen bir rapor, en kritik başarısızlık biçimini görmez.</div>

Bir de fiziksel bir sınır var. Ölçümlere göre modellerin ezberleme kapasitesi [parametre başına yaklaşık 3,6 bit](https://arxiv.org/abs/2505.24832) düzeyinde. Bu, eğitim verisinin gerçekten ağırlıklara yazıldığı anlamına gelir; dolayısıyla silme işlemi bedava değildir. Ezberleme konusunu [modeliniz anonim mi](/posts/model-anonim-mi-ezberleme/) yazısında ayrıca ele alıyoruz.

## Hukuki baskı: silme hakkı ve anonimlik varsayımı

Bu tartışma akademik bir merak değil; arkasında somut bir hukuki zorlama var. GDPR'ın 17. maddesi silme hakkını (right to erasure) düzenler ve talep geldiğinde veri sorumlusunun kişisel veriyi silmesini gerektirir. Soru şudur: eğitilmiş model, o kişisel verinin bir kopyası mıdır?

Avrupa Veri Koruma Kurulu'nun 18 Aralık 2024 tarihli [28/2024 sayılı Görüşü](https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en) bu soruya net bir yön verdi: kişisel veriyle eğitilmiş bir yapay zekâ modelinin anonim olduğu _varsayılamaz_. Anonimlik, iddia edilecek değil gösterilecek bir şeydir; ve gösterme yükü model sahibindedir.

Kurul bu çizgiyi 2026'da sürdürdü: [Anonimleştirmeye ilişkin 02/2026 sayılı Kılavuz](https://www.edpb.europa.eu/public-consultations/guidelines-022026-on-anonymisation_en) 7 Temmuz 2026'da kabul edildi ve kamuoyu görüşüne açıldı; görüş süreci 30 Ekim 2026'ya kadar açık. Anonimleştirmenin nasıl değerlendirileceği hâlâ şekillenen bir konu; kesinleşmiş sayması gereken tek şey, varsayımın işe yaramadığıdır.

Türkiye tarafında karşılığı KVKK mevzuatındaki _silme, yok etme ve anonim hâle getirme_ rejimidir; yani kişisel veri tarafındaki yükümlülük mevcut çerçeveden geliyor. Yürürlükte bir yapay zekâ kanunundan söz etmiyoruz.

Mühendislik açısından bunun anlamı sade: silme talebine verdiğiniz cevabı belgeleyebilmeniz gerekiyor. Hangi kaydın hangi eğitim çalışmasına girdiğini, ne zaman ve nasıl çıkarıldığını gösteren bir iz olmadan, uyum iddianız bir cümleden ibaret kalır. [Model kartları ve yönetişim](/posts/model-kartlari-yonetisim/) yazısındaki belgeleme disiplini burada doğrudan işe yarar.

## İşe yarayan cevap: silinebilir bir veri mimarisi

Bütün bunlardan çıkan pratik sonuç şu: unutma problemini model üzerinde çözmeye çalışmak, çoğu ekip için yanlış cephede savaşmaktır. Doğru cephe veri hattıdır. Silme talebi geldiğinde ne yapacağınız, veriyi ilk topladığınız gün belirlenir.

### Dört yapı taşı

-   **Veri sahibine göre parçalama:** eğitim verisini kişi/kiracı bazında ayrılabilir parçalarda tutun. Silme, bütün korpusun değil bir parçanın işidir.
-   **Silmeye elverişli bir eğitim verisi indeksi:** hangi kaydın hangi sürüme, hangi parçaya ve hangi eğitim çalışmasına girdiğini kaydedin. Bu indeks yoksa, silme talebine verilecek dürüst cevap “bilmiyorum”dur.
-   **Veri kümesi sürümleme:** her eğitim çalışması, içeriği tam olarak belirlenmiş bir veri kümesi sürümüne bağlanmalı. “Yaklaşık olarak şu veriyle eğitildi” bir kayıt değildir.
-   **Periyodik yeniden eğitim bütçesi:** silme taleplerini bir kuyrukta biriktirip planlı aralıklarla toplu yeniden eğitim yapın. Bu, en pahalı ama tek kesin çözümü öngörülebilir bir maliyet kalemine dönüştürür.

```text
# Silme talebi akışı (pseudocode)
talep = silme_talebi_al(kisi_id)
kayitlar = egitim_indeksi.bul(kisi_id)       # indeks yoksa buradan devam edilemez
ham_veriden_sil(kayitlar)                    # once kaynak: golu, yedegi, ozellik deposunu
kuyruga_ekle(etkilenen_parcalar(kayitlar))   # hangi shard yeniden egitilecek
if kuyruk_esigi_asildi() or planli_pencere(): # toplu isle, talep basina degil
    yeniden_egit(kuyruk)                     # eski model surumunu emekliye ayir
kanit_kaydi_yaz(talep, kayitlar, model_surumu)
# Not: model surumu emekli edilmeden silme tamamlanmis sayilmaz
```

### Ve en ucuz strateji: baştan az öğrenmek

Silinmesi gereken veriyi hiç öğrenmemek, her zaman silmekten ucuzdur. Kişisel veriyi eğitim öncesinde ayıklamak, [gizlilik korumalı öğrenme](/posts/gizlilik-korumali-ogrenme/) tekniklerini kullanmak veya hassas alanlarda gerçek kayıtlar yerine [sentetik veri](/posts/sentetik-veri/) ile çalışmak, sonradan unutturma ihtiyacını doğrudan azaltır. Bu tekniklerin hiçbiri sihir değildir ve her biri fayda-gizlilik dengesi ister; ama hepsi, unutma probleminin bir kısmını hiç doğmadan çözer.

> Silinebilir bir mimari, silme talebine hızlı cevap vermenizi sağlamaz; cevabın ne olduğunu _bilmenizi_ sağlar. Asıl kazanç budur.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Bir eğitim kaydını silmek ile bir model yeteneğini kaldırmak farklı problemlerdir; farklı ölçütleri vardır ve farklı biçimlerde başarısız olurlar.</li><li>Tam unutmanın tek garantisi yeniden eğitimdir; SISA benzeri parçalı yapılar maliyeti sınırlar ama eğitimden önce kurulmalıdır.</li><li>Yaklaşık unutma büyük ölçüde geri döndürülebilir: küçük miktarda zararsız veriyle yapılan ince ayar unutturulmuş davranışı geri getirebiliyor.</li><li>Unutmayı ölçmek de çözülmüş değil; yaklaşık 1.200 takımlı NeurIPS yarışmasının raporu kıyaslamanın kendisini açık problem sayıyor.</li><li>Gerçek çözüm modelde değil veri mimarisinde: veri sahibine göre parçalama, silinebilir eğitim indeksi, sürümleme ve planlı yeniden eğitim bütçesi.</li></ul></div>

<div class="faq"><details><summary>Yaklaşık unutma yöntemleri hukuki uyum için yeterli mi?</summary><p>Bugünkü kanıtlarla temkinli olmak gerekir. Yaklaşık yöntemler hedef davranışı bastırmayı başarıyor, ancak yeniden öğrenme saldırıları o davranışın küçük miktarda zararsız veriyle geri gelebildiğini gösteriyor. Ayrıca EDPB'nin 28/2024 sayılı Görüşü, kişisel veriyle eğitilmiş bir modelin anonim olduğunun varsayılamayacağını söylüyor. Uyum iddiasını, kanıtlanabilir bir silme kaydı ve gerektiğinde yeniden eğitim planı üzerine kurun.</p></details><details><summary>Her silme talebinde modeli yeniden eğitmek zorunda mıyım?</summary><p>Genellikle hayır, ama silmeyi tamamlanmış saymadan önce bir plana bağlamanız gerekir. Yaygın çözüm, talepleri bir kuyrukta toplayıp planlı aralıklarla toplu yeniden eğitim yapmak ve etkilenen model sürümünü emekliye ayırmaktır. Veri parçalı bir yapıda tutuluyorsa yalnızca ilgili parçanın yeniden eğitilmesi yeterli olabilir.</p></details><details><summary>Unuttuğumu nasıl ölçerim?</summary><p>Tek bir metrikle ölçemezsiniz. Üç eksen birden raporlayın: hedef davranışın gidip gitmediği, kalan görevlerdeki fayda kaybı ve küçük bir ince ayarla davranışın geri gelip gelmediği. TOFU, MUSE ve WMDP kıyaslamaları başlangıç noktası verir, ama her biri belirli bir unutma tanımını ölçer; sizin tanımınızı yerine koymaz.</p></details></div>

---

Özetle: makine unutması gerçek bir araştırma alanı, ama bugün pazarlandığı gibi bir düğme değil. Elimizdeki yaklaşık yöntemler davranışı bastırıyor, ispat tarafı hâlâ açık ve hukuki taraf modelin anonim sayılmasına izin vermiyor. Bu tabloda en sağlam mühendislik hamlesi de en sıkıcı olanı: neyin nereye girdiğini bilen, parçalanabilir ve sürümlenmiş bir veri hattı kurmak.
