---
title: "Kaggle ile Öğrenmek: Yarışmadan Fazlası"
description: "Kaggle'ı bir öğrenme aracı olarak kullanmak: notebook'lar, veri setleri, yarışmalar, en iyi çözümleri okumak, liderlik tablosu tuzağı ve portföy oluşturmak."
publishDate: "2026-11-30T09:17:00+03:00"
lang: tr
category: "Kariyer"
tags: ["Kaggle", "Makine Öğrenmesi", "Kariyer"]
translation: "learning-with-kaggle"
heroImage:
  src: "../../../assets/blog/covers/kaggle-ile-ogrenmek.jpg"
  alt: "Dizüstü bilgisayar ekranında açık bir veri bilimi notebook'u ve bir liderlik tablosu"
---

Veri bilimine ya da makine öğrenmesine ilgi duyan hemen herkes bir noktada Kaggle'la karşılaşıyor. Kimine göre burası yalnızca ödüllü yarışmaların yapıldığı bir arena, kimine göre ücretsiz bir laboratuvar. Bence ikisi de doğru, ama asıl değeri, doğru kullanıldığında çok iyi bir öğrenme ortamı olması. Bu yazıda Kaggle'ı sıralama peşinde koşmadan, gerçekten bir şeyler öğrenmek için nasıl kullanabileceğinizi; nelere dikkat etmek gerektiğini ve burada yaptığınız işleri bir portföye nasıl dönüştürebileceğinizi anlatmaya çalışacağım.

## Kaggle nedir, neler sunar?

Kaggle 2010'da kurulan ve Mart 2017'de Google tarafından satın alınan bir veri bilimi platformu. Bugün birkaç ana bileşenden oluşuyor:

| Bileşen | Ne işe yarar? |
|---|---|
| Learn | Python, Pandas, makine öğrenmesine giriş gibi konularda kısa, ücretsiz ve uygulamalı kurslar |
| Notebooks (Code) | Tarayıcıda çalışan, kurulum gerektirmeyen kod ortamı; sınırlı kotalarla GPU ve TPU erişimi |
| Datasets | Kullanıcıların ve kurumların paylaştığı veri setleri |
| Competitions | Bir kurumun tanımladığı problem üzerinde katılımcıların çözüm yarıştırdığı etkinlikler |
| Discussions | Yarışma ve konu bazlı forumlar |

Başlangıç için en büyük avantaj, bilgisayarınıza hiçbir şey kurmadan çalışmaya başlayabilmeniz. Bir veri setini açıp "New Notebook" dediğinizde, veri hazır bağlanmış bir ortamda kod yazabiliyorsunuz.

## İlk adım: Learn kursları ve okuyarak öğrenmek

Hiç kod yazmadıysanız ya da Python'a yeni başlıyorsanız Kaggle Learn'deki kısa kurslar iyi bir giriş noktası. Python, Pandas ve "Intro to Machine Learning" gibi kurslar birkaç saatlik, alıştırmalı derslerden oluşuyor ve ücretsiz. Tek başlarına derin bir eğitim sunmuyorlar, ama sizi "bir veri setini açıp ilk modeli kurabilen" noktaya hızla getiriyorlar.

Bundan sonraki en verimli alışkanlık, başkalarının notebook'larını okumak. Bir veri setinin sayfasında o veriyle yapılmış herkese açık notebook'lar listeleniyor. Ben burada şunlara bakmayı öneriyorum:

- **Keşifsel veri analizi (EDA) notebook'ları:** Deneyimli kişilerin bir veri setine ilk baktıklarında hangi soruları sorduğunu gösterir.
- **Sade "baseline" çözümler:** Karmaşık modellerden önce, basit bir yaklaşımın ne kadar iyi çalıştığını görmek önemli bir referans noktasıdır.
- **Yorumlarla zenginleştirilmiş çalışmalar:** Kodun neden öyle yazıldığını açıklayan notebook'lar, yalnızca sonucu gösterenlerden çok daha öğreticidir.

<div class="callout"><strong>İpucu:</strong> Bir notebook'u "Copy & Edit" ile kopyalayıp her hücreyi tek tek çalıştırın ve bir şeyi bilerek değiştirin. Sadece okumak yerine bozup düzeltmek, kavramayı çok hızlandırıyor.</div>

## Yarışmalar: kazanmak mı, öğrenmek mi?

Yarışmaları iki ayrı amaçla kullanabilirsiniz ve hangisini seçtiğinizi bilmek önemli.

**Öğrenme odaklı katılım:** "Getting Started" ve "Playground" türündeki yarışmalar baskı olmadan pratik yapmak için tasarlanmış. Klasik Titanic yarışması gibi örneklerde amaç ödül değil, uçtan uca bir süreci (veriyi okuma, temizleme, model kurma, tahmin gönderme) ilk kez yaşamak.

**Rekabet odaklı katılım:** Ödüllü yarışmalar çok şey öğretir, ama zaman maliyeti yüksektir ve son haftalarda iş çoğunlukla küçük iyileştirmelere, model birleştirmelerine (ensemble) döner. Bu beceriler değerli, ancak gerçek hayattaki projelerin çoğunda en büyük kazanç problemi doğru tanımlamaktan ve veriyi iyileştirmekten gelir.

Benim önerim, ilk birkaç yarışmada sıralamanızı değil, her yarışmadan neyi öğrendiğinizi not etmeniz.

## Kazananların çözümlerini okumak

Kaggle'ın en değerli ama en az kullanılan kaynaklarından biri, yarışma bittikten sonra paylaşılan çözüm yazıları. Birçok yarışmada üst sıralardaki ekipler tartışma bölümünde ne yaptıklarını, neyin işe yarayıp neyin yaramadığını anlatıyor.

Bu yazıları okurken şu soruları sormak faydalı:

1. Doğrulama (validation) stratejilerini nasıl kurmuşlar? Verinin zaman ya da grup yapısını nasıl hesaba katmışlar?
2. Hangi özellik mühendisliği adımı en büyük farkı yaratmış?
3. "Denedik ama işe yaramadı" dedikleri şeyler neler?

Son madde özellikle önemli: başarısız denemeler, hangi fikirlerin o tür veride neden çalışmadığını gösterir ve size çok zaman kazandırır.

## Liderlik tablosuna aşırı uyum tuzağı

Kaggle yarışmalarında test verisi genellikle ikiye bölünür. Yarışma sürerken gördüğünüz **genel (public) liderlik tablosu**, test verisinin yalnızca bir kısmıyla hesaplanır. Nihai sıralamayı belirleyen **özel (private) liderlik tablosu** ise yarışma bitene kadar gizli kalan diğer kısımla hesaplanır.

Buradaki tuzak şu: Genel tablodaki puanı yükseltmek için çok sayıda gönderim yapıp en iyi görüneni seçtiğinizde, modeliniz farkında olmadan o küçük test parçasına uyum sağlamaya başlar. Moritz Hardt 2015'teki bir yazısında, veriye hiç bakmadan yalnızca gönderimlerin puanlarından yararlanarak genel tabloda ciddi biçimde yükselmenin mümkün olduğunu göstermişti; Avrim Blum ile birlikte yazdıkları "The Ladder" makalesi de bu sorunu ele alıyor. Yarışma bittiğinde genel ve özel tablolar arasındaki büyük sıralama değişimleri ("shake-up") çoğunlukla bu yüzden yaşanıyor.

Korunmanın yolu basit ama disiplin istiyor:

- Kendi **yerel doğrulama** düzeninizi kurun (örneğin çapraz doğrulama) ve kararlarınızı öncelikle ona göre verin.
- Yerel skorunuz ile genel tablo skoru aynı yönde hareket ediyor mu, takip edin.
- Son gönderimlerinizi seçerken yalnızca genel tablodaki en yüksek puana değil, yerelde de tutarlı olan çözüme güvenin.

Bu ders yalnızca Kaggle için değil, gerçek projeler için de geçerli. Bir test setini tekrar tekrar kullanıp en iyi sonucu raporlamak, model değerlendirmesinde en sık gördüğüm hatalardan biri.

## Kaggle çalışmasını portföye dönüştürmek

Kaggle'daki etkinlikler profilinizde görünür. Platformun ilerleme sistemi yarışmalar, veri setleri, notebook'lar ve tartışmalar olmak üzere dört alanda ayrı ayrı işler; Novice'ten Grandmaster'a kadar beş kademe vardır. Bu unvanlar emeğin bir göstergesi olabilir, ama işverenlerin çoğu için asıl ikna edici olan, sizin nasıl düşündüğünüzü gösteren iştir.

Portföy açısından işe yarayan birkaç fikir:

- **Az ama iyi anlatılmış notebook:** Problemi, veriyi, denediğiniz yaklaşımları ve sınırlılıkları açık bir dille anlatan iki üç çalışma, onlarca yarım işten daha değerlidir.
- **Kendi veri setinizi hazırlayın:** Açık bir kaynaktan veri toplayıp temizleyerek, iyi bir açıklama ve lisans bilgisiyle paylaşmak, gerçek hayatta en çok ihtiyaç duyulan becerilerden birini gösterir.
- **Kaggle dışına taşıyın:** Aynı çalışmayı kısa bir blog yazısına ya da düzenli bir kod deposuna dönüştürmek, onu daha geniş bir kitleye ulaştırır.
- **Dürüst olun:** Kopyalayıp az değiştirdiğiniz bir notebook'u kendi işinizmiş gibi sunmak yerine, esinlendiğiniz kaynağı belirtin. Bu hem etik hem de güven veren bir davranış.

<div class="callout"><strong>İpucu:</strong> Her notebook'un başına iki üç cümlelik bir özet yazın: hangi soruyu sordunuz, ne buldunuz, sonuca ne kadar güveniyorsunuz. Okuyan kişi, işin değerini ilk on saniyede anlamalı.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Kaggle; kurslar, kod ortamı, veri setleri ve yarışmalarla kurulum gerektirmeden öğrenmeye başlamayı sağlıyor.</li><li>Başkalarının notebook'larını kopyalayıp bozarak ve düzelterek okumak, en verimli öğrenme yollarından biri.</li><li>Kazanan çözüm yazıları, özellikle doğrulama stratejileri ve işe yaramayan fikirler açısından çok öğretici.</li><li>Genel liderlik tablosuna göre karar vermek aşırı uyuma yol açar; yerel doğrulamaya güvenin.</li><li>Portföy için sıralamadan çok, iyi anlatılmış ve dürüstçe kaynak gösterilmiş çalışmalar önemlidir.</li></ul></div>

<div class="faq"><details><summary>Kaggle kullanmak ücretli mi?</summary><p>Hesap açmak, Learn kurslarını almak, notebook çalıştırmak ve yarışmalara katılmak ücretsiz. GPU ve TPU gibi hızlandırıcıların kullanımı ise haftalık kotalarla sınırlı; güncel limitleri platformun kendi sayfalarından kontrol etmek en doğrusu.</p></details><details><summary>Hiç kod bilmeden Kaggle'a başlanır mı?</summary><p>Başlanabilir. Learn bölümündeki Python kursu temel konulardan başlıyor. Ancak Kaggle bir programlama okulu değil; düzenli pratik ve gerektiğinde başka kaynaklarla desteklemek gerekir.</p></details><details><summary>Kaggle unvanları iş bulmakta işe yarar mı?</summary><p>Bazı işverenler için olumlu bir sinyal olabilir, ama tek başına yeterli değildir. Problemi nasıl tanımladığınızı, veriyi nasıl incelediğinizi ve sonuçlarınızı nasıl değerlendirdiğinizi gösteren çalışmalar genellikle daha belirleyicidir.</p></details><details><summary>Public ve private liderlik tablosu arasındaki fark neden önemli?</summary><p>Çünkü yarışma sürerken gördüğünüz puan test verisinin yalnızca bir kısmına dayanıyor. Bu kısma göre çok fazla ayar yaparsanız, nihai sıralamayı belirleyen gizli kısımda performansınız düşebilir.</p></details></div>

---

**Kaynaklar**

- [Kaggle Learn](https://www.kaggle.com/learn)
- [Kaggle – Competitions Documentation](https://www.kaggle.com/docs/competitions)
- [Kaggle – Progression System](https://www.kaggle.com/progression)
- [Moritz Hardt (2015), Competing in a data science contest without reading the data](https://blog.mrtz.org/2015/03/09/competition.html)
- [Blum ve Hardt (2015), The Ladder: A Reliable Leaderboard for Machine Learning Competitions – arXiv](https://arxiv.org/abs/1502.04585)
