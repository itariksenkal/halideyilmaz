---
title: "Türkçe Yapay Zekâda Veri Kalitesi ve Kıyaslama: Elimizde Gerçekte Ne Var?"
description: "Türkçe kaynak manzarası dağınık GitHub listelerine ve arXiv makalelerine sıkışmış durumda. Elimizde gerçekte ne var, hangi kıyaslama neyi ölçüyor, Cetvel'in ters bulgusu ne anlatıyor ve kendi değerlendirme setinizi nasıl kurarsınız?"
publishDate: "2026-08-13T23:06:00+03:00"
lang: tr
category: "Türkçe NLP"
tags: ["Türkçe NLP", "Yapay Zeka"]
translation: "turkish-nlp-data-quality-benchmarks"
heroImage:
  src: "../../../assets/blog/bimg-04.jpg"
  alt: "Türkçe Yapay Zekâda Veri Kalitesi ve Kıyaslama: Elimizde Gerçekte Ne Var?"
---

Türkçe için hangi veri kümeleri var, hangi kıyaslama neyi ölçüyor, bir modelin “Türkçesi iyi” demek ne demek? Bu soruların cevabı bugün tek bir yerde durmuyor; birkaç GitHub listesine, birkaç arXiv makalesine ve kulaktan dolma bilgilere dağılmış durumda. Bu yazıda o manzarayı bir araya getiriyoruz: elimizde ne var, ne ölçüyor, nerede ince ve kendi ekibiniz bunun karşısında ne yapmalı. Her sayıyı raporlayan çalışmaya bağlayacağım, çünkü bu alanda en çok tekrarlanan hatalar kaynaksız sayılardan geliyor.

## Türkçe gerçekten düşük kaynaklı mı? Sayılarla bakalım

“Düşük kaynaklı dil” ifadesi çok kullanılıyor ama nadiren niceliksel karşılığı veriliyor. Bir referans noktası: [Vikipedi listesine göre](https://meta.wikimedia.org/wiki/List_of_Wikipedias) Türkçe Vikipedi 694.568 maddeyle 26. sırada; İngilizce Vikipedi ise 7.223.792 maddede. Yani aynı platformda, aynı ölçüte göre on katından fazla bir fark var. Türkçe ne gerçekten kıt bir dil ne de İngilizceyle aynı ligde; ortada, sıkışık bir yerde.

İkinci bir gösterge, uluslararası değerlendirme setlerinde yer alıp almadığınız. Burada doğrulanmış bir olumsuzluk var: OpenAI'nin çok dilli değerlendirme seti [MMMLU](https://huggingface.co/datasets/openai/MMMLU) 14 yerel ayarı kapsıyor ve Türkçe bunların arasında değil. Bir dilin uluslararası bir kıyaslamada bulunmaması, o dilde model performansı hakkında konuşurken elinizde ortak bir zemin olmadığı anlamına gelir.

Buna karşılık envanter boş değil. En görünür kalem [BERTurk](https://huggingface.co/dbmdz/bert-base-turkish-cased): 35 GB, yaklaşık 44 milyar tokenlık bir veriyle eğitilmiş, ayda yaklaşık 150 bin indirme alan ve üzerine 188 türev model kurulmuş bir temel. Türkçe NLP'de bugün hâlâ çok sayıda üretim hattının altında bu model duruyor.

Korpus tarafında [TS Corpus](https://tscorpus.com/) 25'ten fazla derlem ve 1,8 milyardan fazla token sunuyor; akademik tarafta [BOUN TABI](https://github.com/boun-tabi) yayınları, görev odaklı veri kümeleri ve araçlar için ilk bakılacak yerlerden biri. Manzara şu: elde ciddi kaynaklar var, ama bunlar tek bir kataloğa toplanmamış, sürüm ve lisans bilgileri dağınık ve pek çoğunun belgelenmesi kullanıcının inisiyatifine bırakılmış.

## Kıyaslama karmaşası: benzer isimler, farklı ölçüler

Türkçe değerlendirmede en somut pratik sorun, benzer isimli ve birbirinin yerine kullanılan kıyaslamalar. Üçünü ayırmakta fayda var, çünkü üçü farklı şeyler ölçüyor ve skorları karşılaştırılamaz.

-   **[TurkishMMLU](https://arxiv.org/abs/2407.12402)** (Yüksel, Köksal, Şenel, Korhonen, Schütze; EMNLP 2024 Findings): Türk lise müfredatından derlenmiş, 9 ders üzerinde 10.000'den fazla soru. Ölçtüğü şey, müfredat bilgisidir.
-   **[TR-MMLU](https://arxiv.org/abs/2501.00593)** (Bayram ve arkadaşları, Ocak 2025): _farklı_ bir kıyaslama. 67 disiplini kapsayan 280.000 soruluk bir havuzdan seçilmiş, 62 bölüme dağılmış 6.200 çoktan seçmeli soru.
-   **[Cetvel](https://arxiv.org/abs/2508.16431)** (KUIS AI, Koç Üniversitesi; arXiv 22 Ağustos 2025, EACL 2026): 7 kategoriye dağılmış 23 görev üzerinde, 70 milyar parametreye kadar 33 açık ağırlıklı büyük dil modelini değerlendiriyor. Çoktan seçmeli sınav mantığının ötesine geçen, görev çeşitliliği en yüksek düzenek.

<div class="callout"><strong>İpucu:</strong> Biri size “model Türkçe MMLU'da şu skoru aldı” dediğinde tek bir soru sorun: <em>hangisi?</em> TurkishMMLU ve TR-MMLU farklı yapılara, farklı soru sayılarına ve farklı kaynaklara sahip iki ayrı kıyaslamadır. İkisinin skorunu yan yana koymak, iki farklı sınavın notunu karşılaştırmakla aynı şeydir. Rapor ederken kıyaslamanın adını, sürümünü ve makalesini birlikte yazın.</div>

Bir de hepsinin ortak sınırı var: bu kıyaslamalar genel dil ve bilgi yetkinliğini ölçer. Sizin üretim göreviniz — bir dilekçeyi sınıflandırmak, bir çağrı özetini çıkarmak, bir sözleşme maddesini bulmak — hiçbirinde yok. Kıyaslama skoru aday elemek için iyidir; karar vermek için değil.

## Cetvel'in rahatsız edici bulgusu

Cetvel çalışmasının en dikkat çekici sonucu, alandaki yaygın varsayımın tersini söylüyor: Türkçe-merkezli talimat ayarlı (instruction-tuned) modeller, genel amaçlı çok dilli modellerin genellikle gerisinde kalıyor. Yani “Türkçe için ayrıca eğitilmiş model, Türkçede daha iyidir” cümlesi otomatik olarak doğru değil.

Bu bulgu, pratikte çok şey değiştirir. Türkçe bir uygulama kuran ekiplerin refleksi genellikle “Türkçe bir model bulalım” olur. Cetvel'in ölçtüğü tabloda bu refleks, en iyi seçeneği kaçırmanıza yol açabilir. En azından, Türkçe etiketli olması bir modeli otomatik olarak listenin başına koymamalı.

Sonucun nedeni tek bir cümleyle açıklanamaz ve makalenin ölçtüğü şey neden değil, sonuçtur. Akla gelen ihtimaller şunlar — ölçülmüş açıklamalar değil, sınanması gereken hipotezler olarak okuyun: talimat ayarında kullanılan Türkçe verinin çoğunun makine çevirisi olması ve çeviri artefaktları taşıması; ince ayarın, geniş çok dilli ön eğitimden gelen genel yeteneği aşındırması; ve Türkçe veri kümelerinin çeşitlilik bakımından dar kalması.

> Bir dil için model eğitmek, o dilde veri toplamakla değil, o dilde _iyi_ veri toplamakla başlar. Türkçede bağlayıcı kısıt uzun süredir miktar değil, kalite.

Bu, [veri kalitesi ve etiketleme](/posts/veri-kalitesi-etiketleme/) yazısında anlattığımız argümanın Türkçeye özgü hâli. Ham metin toplamak bugün kolay; temiz, tekilleştirilmiş, lisansı belli, alan dengesi kurulmuş ve tutarlı biçimde etiketlenmiş bir veri kümesi kurmak hâlâ zor. Türkçe'nin asıl açığı gigabaytlarda değil, bu ikinci listede.

## Hukuk alanı: yakından bakılmış somut bir örnek

Alan modelleri (domain model) tarafında Türkçe için en somut ilerleme hukuk alanında görünüyor. Hukuk alanında günlük olarak çalıştığımız için, buradaki tabloyu yakından izliyoruz. İki çalışmayı sayılarıyla birlikte aktarayım.

-   **[HukukBERT](https://arxiv.org/abs/2604.04790)** (arXiv, 6 Nisan 2026): 19 GB temizlenmiş hukuk metniyle eğitilmiş bir Türkçe hukuk dili modeli. 48 bin öğeli bir WordPiece sözlüğü kullanıyor; hukuk alanındaki boşluk doldurma (cloze) görevinde %84,40 Top-1 ve yapısal bölütlemede %92,8 geçiş oranı raporluyor.
-   **[Mecellem](https://arxiv.org/abs/2601.16018)** (arXiv, 22 Ocak 2026): 112,7 milyar tokenlık bir korpus üzerinde sürekli ön eğitim (continual pretraining) uygulayarak Türkçe hukuk metninde %36,2 şaşkınlık (perplexity) azalması raporluyor.

Bu sayıları okurken iki temkin gerekiyor. Birincisi, şaşkınlık azalması ve boşluk doldurma başarısı _içsel_ metriklerdir: modelin alan diline uyum sağladığını gösterir, sizin görevinizde iyi çalışacağını göstermez. Alan uyarlamasının kazandırdığı şey genellikle bir başlangıç avantajıdır, bir garanti değil.

İkincisi, alan sözlüğünün genişletilmesi (HukukBERT'te 48 bin öğelik WordPiece sözlüğü) tek başına bir sonuç değil, bir tasarım tercihidir. Alan terimlerinin daha az parçaya bölünmesi bağlam kullanımını verimli kılar; ama bunun etkisini ancak kendi görevinizde ölçerek görürsünüz.

Yine de tablo cesaret verici: birkaç yıl önce Türkçe hukuk alanında karşılaştırılabilir sayı üreten yayın neredeyse yoktu. Bugün en azından üzerine konuşulabilecek, kaynağı gösterilebilir sonuçlar var. Bir alanın olgunlaşması tam olarak böyle görünür.

## Nerede ince — ve bu yazının tokenizasyondan farkı

Önce bir sınır çizelim. [Türkçede tokenizasyon](/posts/tokenizasyon-turkce/) yazısı, dilin biçimbilimsel yapısının alt sözcük parçalanmasını nasıl etkilediğini, yani mekanizmayı anlatıyor. Bu yazı ise veri kümeleri ve kıyaslamalar hakkında. İkisi sık sık birbirine karıştırılıyor: tokenizasyon Türkçe modellerin _maliyetini_ ve bağlam verimliliğini etkiler, veri kalitesi ise ne öğrendiklerini belirler. Farklı problemler, farklı çözümler.

Envantere bakıldığında en çok göze çarpan boşluklar şunlar. Bunlar ölçülmüş iddialar değil, mevcut kaynakların kapsamına dair gözlemler:

-   **Görev çeşitliliği:** kamuya açık değerlendirme büyük ölçüde çoktan seçmeli sınav biçiminde. Üretimde ihtiyaç duyduğunuz özetleme, çıkarım, yapılandırılmış bilgi çıkarma gibi görevlerin standart bir Türkçe karşılığı seyrek.
-   **Üretim değerlendirmesi:** serbest metin üretiminin Türkçede nasıl değerlendirileceği — hangi referansla, hangi ölçütle — ortak bir kabule kavuşmuş değil.
-   **Alan kapsamı:** hukuk tarafında somut çalışmalar var; sağlık, finans ve kamu yönetimi gibi alanlarda karşılaştırılabilir kamuya açık kaynak çok daha az.
-   **Etiketleme belgeleri:** etiketleme yönergesi, etiketleyiciler arası uyum (inter-annotator agreement) ölçümü ve sürüm geçmişi paylaşılan veri kümesi azınlıkta.
-   **Lisans ve köken netliği:** bir veri kümesinin nereden derlendiği ve hangi koşullarla kullanılabileceği, kullanmadan önce her seferinde ayrıca araştırılması gereken bir konu.

Bu listeye bakınca ortaya çıkan tablo şu: Türkçe için ham metin bulmak artık ana darboğaz değil. Darboğaz, **ölçebileceğiniz ve belgeleyebileceğiniz** veri. İyi haber, bunun büyük ölçüde disiplin işi olması — ve dış kaynak beklemeden kendi ekibinizde çözülebilmesi.

## Kendi Türkçe değerlendirme setinizi kurmak

Kamuya açık kıyaslamalar sizin alanınızı kapsamıyorsa — ki çoğu zaman kapsamıyor — yapılacak iş bellidir: kendi değerlendirme setinizi kurarsınız. Bu, bir araştırma projesi değil; iki haftalık disiplinli bir çalışmayla anlamlı bir sürüm çıkarabilirsiniz.

### Sıra

-   **Görevi gerçek trafikten tanımlayın.** Hayali örnek yazmayın; sisteminize gelen gerçek girdilerden örnekleyin. Değerlendirme setinin değeri, kullanım dağılımını yansıtmasından gelir.
-   **Katmanlı örnekleyin.** Kolay örnekler baskın gelmesin; nadir ama önemli durumları bilinçli olarak dahil edin ve bu katmanları etiketleyin ki alt grup skorlarını ayrı ayrı okuyabilesiniz.
-   **Yönergeyi sınır örnekleriyle yazın.** Kararın nerede zorlaştığını gösteren örnekler olmadan yönerge işlemez. “Emin değilim” seçeneğini bırakın.
-   **Bir alt kümeyi çift etiketleyin** ve etiketleyiciler arası uyumu ölçün. Düşük uyum, modelin değil yönergenin sorunlu olduğunun ilk işaretidir.
-   **Dondurun ve sürümleyin.** Çekirdek set sabit kalmalı; yeni kapsam eklemek istediğinizde eskisini değiştirmeyin, yeni sürüm çıkarın.
-   **Kirlenmeyi kontrol edin.** Değerlendirdiğiniz model, kamuya açık bir veri kümesini ön eğitiminde görmüş olabilir — bu, [kıyaslama kirlenmesi](/posts/kiyaslama-kirlenmesi/) problemidir ve kamuya açık Türkçe kaynak sayısı sınırlı olduğu için burada risk daha da yüksektir.

### Türkçeye özgü tuzaklar

Değerlendirme seti kurarken Türkçede tekrarlayan birkaç teknik ayrıntı var ve gözden kaçtıklarında skorunuzu sessizce bozarlar: noktalı ve noktasız i'nin büyük-küçük harf dönüşümü (I/ı ve İ/i), Türkçe karakterlerin ASCII'ye indirgenmiş hâlleriyle karışık gelen metinler, özel adlara gelen eklerin kesme işaretiyle yazımındaki tutarsızlık, taranmış belgelerden gelen OCR hataları ve Türkçe-İngilizce karışık kullanılan alan terimleri. Bunları normalleştirme kurallarınıza yazın ve _kuralı da sürümleyin_.

```python
# Turkce degerlendirme seti kurma dongusu (pseudocode)
ham = gercek_trafikten_ornekle(n=1200, katman=["kolay","sinir","nadir"])
ham = normallestir(ham)          # I/i donusumu, ASCII karisimi, OCR temizligi
ham = tekillestir(ham)           # neredeyse ayni metinler de cikarilir
alt_kume = ornekle(ham, 200)
for ornek in alt_kume:
    etiket_a = etiketle(ornek, kisi=1)
    etiket_b = etiketle(ornek, kisi=2)
    if etiket_a != etiket_b:
        yonerge_kuyruguna_ekle(ornek)   # once yonerge duzeltilir, sonra etiket
uyum = etiketleyiciler_arasi_uyum(alt_kume)
if uyum < esik:
    dur()                        # yonerge hazir degilse set de hazir degildir
dondur_ve_surumle(ham, surum="v1", belge=veri_seti_kunyesi())
```

> Kamuya açık bir kıyaslamada iyi skor almak, ürününüzün iyi çalıştığını göstermez. Kendi alanınızda kurduğunuz dürüst bir değerlendirme seti ise tam olarak bunu gösterir — ve bu yüzden çok daha değerlidir.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Türkçe Vikipedi 694.568 maddeyle 26. sırada, İngilizce 7.223.792 maddede; Türkçe kıt değil ama aynı ligde de değil.</li><li>TurkishMMLU ve TR-MMLU farklı kıyaslamalardır; skorları yan yana koymak iki farklı sınavın notunu karşılaştırmaktır.</li><li>Cetvel çalışması, Türkçe-merkezli talimat ayarlı modellerin genel amaçlı çok dilli modellerin genellikle gerisinde kaldığını raporluyor.</li><li>Hukuk alanında HukukBERT ve Mecellem gibi kaynaklandırılabilir sonuçlar var, ama içsel metrikler görev başarısını garanti etmez.</li><li>Türkçede bağlayıcı kısıt ham metin miktarı değil; ölçülebilir, belgelenmiş ve sürümlenmiş veridir.</li></ul></div>

<div class="faq"><details><summary>Türkçe bir uygulama için mutlaka Türkçe eğitilmiş bir model mi seçmeliyim?</summary><p>Otomatik olarak değil. Cetvel çalışması, Türkçe-merkezli talimat ayarlı modellerin genel amaçlı çok dilli modellerin genellikle gerisinde kaldığını raporluyor. Doğru yaklaşım, Türkçe etiketini bir ön eleme kriteri saymak yerine hem Türkçe hem çok dilli adayları kendi değerlendirme setinizde aynı koşullarda ölçmektir.</p></details><details><summary>Türkçe için hangi kıyaslamayı kullanmalıyım?</summary><p>Amacınıza göre değişir. Müfredat bilgisi için TurkishMMLU, geniş disiplin kapsamı için TR-MMLU, çoktan seçmeli sınav biçiminin ötesinde görev çeşitliliği için Cetvel bakılacak yerlerdir. Ancak hiçbiri sizin üretim görevinizi ölçmez; kamuya açık kıyaslamayı aday elemek için, kararı ise kendi setinizle vermek için kullanın.</p></details><details><summary>Kendi değerlendirme setimi kurmak çok mu pahalı?</summary><p>Sanıldığı kadar değil. Birkaç yüz iyi seçilmiş ve iki kişi tarafından etiketlenmiş örnek, çoğu ekip için binlerce özensiz örnekten daha faydalıdır. Asıl maliyet örnek sayısında değil, sınır durumlarını içeren bir yönerge yazmakta ve uyumu ölçmektedir; o iş bittiğinde etiketleme hızlanır.</p></details></div>

---

Özetle: Türkçe için elimizde sanılandan fazla kaynak, sanılandan az ortak zemin var. Kıyaslamalar birbirine karıştırılıyor, sayılar kaynaksız dolaşıyor ve “Türkçe model” etiketi hak etmediği bir güven taşıyor. Bu tabloda bir ekibin yapabileceği en yüksek getirili iş, yeni bir model aramak değil; kendi alanında dürüst, belgelenmiş ve sürümlenmiş bir değerlendirme seti kurmaktır.
