---
title: "Veri Seti Belgelendirme (Datasheets for Datasets): Model Kartının Eksik Yarısı"
description: "Model kartı modeli anlatır, veri setini anlatmaz. Veri seti künyesi hangi soruları cevaplar, Ek IV teknik dokümantasyonuyla nasıl örtüşür ve neden bu belge geçmişe dönük olarak üretilemez?"
publishDate: "2026-08-13T23:19:00+03:00"
lang: tr
category: "Veri"
tags: ["Veri", "Yapay Zeka"]
translation: "datasheets-for-datasets"
heroImage:
  src: "../../../assets/blog/covers/veri-seti-belgelendirme.jpg"
  alt: "Veri Seti Belgelendirme (Datasheets for Datasets): Model Kartının Eksik Yarısı"
---

Model kartı yaygınlaştı; artık pek çok ekip modelinin ne yaptığını, nerede çalışmadığını ve hangi metrikte ne skor aldığını yazıyor. Ama aynı kartın “eğitim verisi” satırında genellikle tek bir cümle var: “iç veri kümesi”. Bu, belgelemenin eksik yarısı. Veri seti künyesi — orijinal adıyla _datasheet_ — modelin değil verinin hikâyesini anlatır ve mevzuat tarafında artık isteğe bağlı olmaktan çıktı.

## Fikir nereden geliyor ve neden elektronik parçalardan?

Öneri, Gebru ve arkadaşlarının 2018 tarihli çalışmasından geliyor ve analojisi çok yerinde: elektronik sektöründe her bileşenin bir _datasheet_'i vardır — çalışma voltajı, sıcaklık aralığı, tolerans, test koşulları. Bir mühendis bileşeni devresine koymadan önce bu belgeye bakar; belgesiz bir bileşeni kritik bir devrede kullanmaz ([Datasheets for Datasets](https://arxiv.org/abs/1803.09010)).

Veri kümeleri için bu kültür hiç oluşmadı. Bir veri kümesini indirir, birleştirir, bir modeli eğitir ve o modeli bir karara bağlarız — verinin hangi koşullarda toplandığını, kimlerin etiketlediğini, hangi popülasyonu temsil ettiğini bilmeden.

Model kartı önerisi de aynı dönemden gelir ([Model Cards](https://arxiv.org/abs/1810.03993)) ve ikisi tasarım gereği birbirini tamamlar. [Model kartları ve yönetişim](/posts/model-kartlari-yonetisim/) yazısında birincisini ele almıştık; bu yazı ikincisini tamamlıyor.

> Modelin sınırlarını yazıp verinin sınırlarını yazmamak, ilacın yan etkilerini listeleyip etken maddesini gizlemek gibidir.

<div class="callout"><strong>İpucu:</strong> Türkçe içerik üretirken “model kartı” terimi arama tarafında “ekran kartı” sorgularıyla karışıyor. Bu yüzden belgeyi kurum içinde <strong>veri seti künyesi</strong> olarak adlandırmak hem daha anlaşılır hem de aramada daha isabetli.</div>

## Künye hangi soruları cevaplar?

Orijinal öneri, veri kümesinin yaşam döngüsünü izleyen bir soru dizisi kurar. Pratikte işe yarayan hâli şu yedi başlıkta toplanabilir.

-   **Motivasyon:** Bu veri kümesi hangi amaçla oluşturuldu? Kim finanse etti? Hangi boşluğu doldurmak için?
-   **Bileşim:** Örnekler neyi temsil ediyor? Kaç örnek var? Bir alt küme mi yoksa tamamı mı? Kişisel veri, hassas içerik veya alt gruplar var mı?
-   **Toplama süreci:** Veri nasıl elde edildi — doğrudan gözlem, kullanıcı bildirimi, üçüncü taraftan alım? Hangi zaman aralığında? Örnekleme stratejisi neydi?
-   **Ön işleme ve etiketleme:** Hangi temizleme uygulandı? Ham veri saklanıyor mu? Etiketleyenler kim, hangi kılavuzla çalıştı, uyum ölçüldü mü?
-   **Kullanım:** Bu veri kümesi hangi görevlerde kullanıldı? Hangi kullanımlar için uygun _değil_?
-   **Dağıtım:** Kimlerle paylaşıldı, hangi lisansla, hangi kısıtlarla?
-   **Bakım:** Sahibi kim? Ne sıklıkla güncelleniyor? Eski sürümler korunuyor mu? Hata bildirimi nereye yapılır?

Bu listenin en çok atlanan iki maddesi dördüncü ve beşincidir. Etiketleyicilerin kim olduğu ve hangi kılavuzla çalıştığı, veri kümesinin en belirleyici özelliğidir; ölçülmüş bir etiketleyiciler arası uyum değeri olmadan bir veri kümesinin kalitesi hakkında konuşmak zordur. Yöntemi [etiketleyici uyumu ve kappa](/posts/etiketleyici-uyumu-kappa/) yazısında ele alıyoruz.

## Mevzuat: belgeleme artık gönüllü değil

2018'de bu bir iyi uygulama önerisiydi. Bugün, yüksek riskli sistemler için doğrudan bir yükümlülük.

-   **Madde 10**, sekiz veri yönetişimi pratiği sayıyor ve bunlar neredeyse birebir bir künye anketi gibi okunuyor: tasarım tercihleri, toplama süreçleri ve verinin kökeni, hazırlık işlemleri, varsayımların formüle edilmesi, veri miktarının ve uygunluğunun değerlendirilmesi, olası önyargıların incelenmesi, alınan önlemler ve veri boşluklarının tespiti ([Madde 10](https://artificialintelligenceact.eu/article/10/)).
-   **Ek IV**, teknik dokümantasyonun bölümlerini belirliyor ve bunların içinde veri kümelerine ilişkin ayrıntılı açıklama da yer alıyor. Bu yükümlülükler Ek III sistemleri için **2 Aralık 2027**'de uygulanmaya başlıyor.
-   **Madde 11(3)** küçük ve mikro işletmeler için basitleştirilmiş bir dokümantasyon formu öngörüyor; Omnibus bu kolaylığı orta ölçekli işletmelere de açtı ([Madde 11](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-11)).

Yani künye, artık bir araştırma etiği önerisi değil; teknik dokümantasyonun veri bölümünün taslağı. Bunu böyle kurgulamanın pratik faydası da var: aynı bilgiyi iki kez toplamazsınız.

<div class="callout"><strong>İpucu:</strong> Künyeyi Ek IV başlıklarına göre değil, kendi veri kümenizin gerçekliğine göre yazın; sonra Ek IV'e eşleyen bir tablo ekleyin. Doğrudan mevzuat başlıklarıyla yazılan belgeler, mühendisin okumadığı belgelerdir ve okunmayan belge güncellenmez.</div>

## Neden geçmişe dönük üretilemez?

Bu yazının en önemli cümlesi bu bölümde. Teknik dokümantasyonun büyük kısmını sonradan yazabilirsiniz: mimariyi hatırlarsınız, metrikleri yeniden hesaplarsınız, risk kaydını oturup çıkarırsınız. Veri künyesini yazamazsınız.

-   **Toplama koşulları kaybolur.** Verinin hangi tarihte, hangi arayüzden, hangi kullanıcı kitlesinden geldiği bir yıl sonra yeniden kurulamaz.
-   **Etiketleyiciler dağılır.** Kılavuzun hangi sürümüyle çalışıldığı, hangi sınır durumların nasıl karara bağlandığı yazılmadıysa kaybolmuştur.
-   **Ön işleme kodu ilerler.** Bugünkü temizleme kodu, iki yıl önceki veriyi üreten kod değildir; depo geçmişi ne olduğunu söyler, _neden_ olduğunu söylemez.
-   **Dışlanan veriyi kimse hatırlamaz.** Hangi kayıtların neden elendiği, künyenin en değerli ve en çabuk kaybolan bilgisidir.

> Teknik dokümantasyonun çoğu ertelenebilir. Veri künyesi ertelenemez, çünkü ertelendiğinde yazılacak bilgi artık yoktur.

Bu yüzden künye, veri kümesi _oluşturulurken_ yazılmalı ve bir kod deposunda, veri kümesiyle aynı sürüm etiketiyle yaşamalıdır. Ayrı bir paylaşımlı sürücüde duran künye, ikinci sürümde güncellenmez.

## Künye ile veri sözleşmesi farkı

Bu iki belge sık karıştırılıyor, oysa farkları basit ve önemli:

-   **Veri sözleşmesi** _akan_ veriyi tanımlar. Sürekli tümleştirmede çalışır, ihlal ettiğinde kırmızıya döner ve gelecekteki değişikliği engeller. Ayrıntısı [veri sözleşmeleri](/posts/veri-sozlesmeleri/) yazısında.
-   **Veri seti künyesi** _donmuş_ bir sürümü tanımlar. Bir eğitim çalıştırmasının kullandığı belirli anlık görüntünün hikâyesidir ve değişmez.

Birlikte kullanıldıklarında güçlü bir çift oluştururlar: sözleşme, verinin bugün beklendiği gibi olmasını sağlar; künye, geçmişte nasıl olduğunu kaydeder. Model bozulduğunda ilk bakılacak yer, o modeli eğiten sürümün künyesidir.

```text
# Künyeyi eğitim çalıştırmasına bağlamak (pseudocode)
calistirma = {
  "model_surumu":     "2026.08.13-a",
  "veri_seti_surumu": "musteri-v7",
  "kunye":            "datasheets/musteri-v7.md",   # aynı depoda
  "kunye_ozeti":      hash(dosya("datasheets/musteri-v7.md"))
}
# Kural: künye özeti değiştiyse veri seti sürümü de değişmelidir.
# Aynı sürüm adı altında değişen künye, belgelemenin en sinsi hatasıdır.
```

## Hafif bir şablon ve ilk adım

Yirmi sayfalık bir künye şablonu, kimsenin doldurmadığı bir şablondur. İşleyen hafif sürüm bir sayfayı geçmez ve şu soruları cevaplar:

-   **Ne:** Bu veri kümesi neyi temsil ediyor, kaç örnek, hangi zaman aralığı?
-   **Nereden:** Hangi kaynaklardan, hangi izinle? Köken kaydı için [veri kökeni ve lisanslama](/posts/veri-kokeni-ve-lisanslama/).
-   **Kim etiketledi:** Kaç kişi, hangi kılavuz sürümüyle, ölçülen uyum değeri nedir?
-   **Ne çıkarıldı:** Hangi filtreler uygulandı ve yaklaşık ne kadarını eledi?
-   **Kim temsil edilmiyor:** Bilinen kapsam boşlukları. Bu satır boş bırakılıyorsa muhtemelen henüz aranmamıştır.
-   **Ne için uygun değil:** Bu veri kümesiyle eğitilmiş bir modelin kullanılmaması gereken durumlar.
-   **Sahibi ve sürümü:** Kime sorulur, hangi sürüm, ne zaman donduruldu?

İlk adım için tavsiye: yeni bir veri kümesi oluşturmayı beklemeyin. Şu anda üretimde olan modelin eğitim verisi için bu yedi soruyu cevaplayın. Cevaplayamadığınız her soru, aslında bir bulgudur; ve bu bulgular [veri merkezli](/posts/veri-merkezli-yapay-zeka/) iyileştirme döngüsünün en verimli girdisidir. Etiket kalitesi tarafında ise [veri kalitesi ve etiketleme](/posts/veri-kalitesi-etiketleme/) yazısındaki adımlar doğrudan künyenin üçüncü ve dördüncü satırını doldurur.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Model kartı modeli anlatır; veri seti künyesi veriyi anlatır ve ikisi tasarım gereği birbirini tamamlar.</li><li>AB Yasası Madde 10'un sekiz yönetişim pratiği, neredeyse birebir bir künye anketi gibi okunur.</li><li>Ek IV teknik dokümantasyonu Ek III sistemleri için 2 Aralık 2027'de bağlayıcı hâle geliyor; Madde 11(3) basitleştirmesi orta ölçekli işletmelere de açıldı.</li><li>Künye, teknik dokümantasyonun geçmişe dönük üretilemeyen tek parçasıdır: toplama koşulları ve elenen veri kaydedilmezse kaybolur.</li><li>Sözleşme akan veriyi, künye donmuş bir sürümü tanımlar; model bozulduğunda ilk bakılacak yer künyedir.</li></ul></div>

<div class="faq"><details><summary>Model kartımız var. Ayrıca künye tutmak gerçekten gerekli mi?</summary><p>Evet, çünkü ikisi farklı soruları cevaplıyor. Model kartı modelin davranışını, künye ise o davranışın kaynağını belgeler. Uygulamada model kartının en zayıf satırı hemen her zaman eğitim verisi satırıdır; künye tam olarak o satırı doldurur.</p></details><details><summary>Veri kümemiz sürekli büyüyor. Künyeyi her seferinde güncellemeli miyiz?</summary><p>Künye, veri kümesinin sürümüne bağlıdır, kendisine değil. Her eğitim çalıştırması dondurulmuş bir sürüm kullanmalı ve o sürümün künyesi değişmemelidir. Yeni veri geldiğinde yeni bir sürüm ve yeni bir künye üretilir; eskisi silinmez.</p></details><details><summary>Üçüncü taraftan aldığımız veri kümesi için künyeyi kim yazacak?</summary><p>Sağlayıcıdan isteyin; yoksa kendi bildiğiniz kadarını yazıp bilmediğinizi açıkça belirtin. Bilinmeyen alanların dürüstçe boş bırakıldığı bir künye, uydurma bilgiyle doldurulmuş bir künyeden hem daha yararlı hem de daha savunulabilirdir.</p></details></div>

---

Özetle: bir modeli belgelemek, onu üreten veriyi belgelemeden yarım kalır. Künyeyi veri kümesiyle birlikte, o kümeyi oluştururken yazan ekip hem mevzuat tarafında hazırlıklı olur hem de bir yıl sonra modelin neden bozulduğunu arayacağı ilk yeri elinde bulundurur.
