---
title: "%1'lik Fark Gerçek mi? Model Karşılaştırmasında Güven Aralığı ve Bootstrap"
description: "Bir modelin diğerinden bir puan iyi çıkması çoğu zaman gürültüdür. Test seti örnekleme hatası, bootstrap güven aralıkları, eşleştirilmiş testler ve çoklu karşılaştırma düzeltmesiyle farkın gerçek olup olmadığını nasıl ölçersiniz?"
publishDate: "2026-08-13T23:16:00+03:00"
lang: tr
category: "Değerlendirme"
tags: ["Değerlendirme", "Yapay Zeka"]
translation: "statistical-significance-model-comparison"
heroImage:
  src: "../../../assets/blog/covers/model-karsilastirma-istatistik.jpg"
  alt: "%1'lik Fark Gerçek mi? Model Karşılaştırmasında Güven Aralığı ve Bootstrap"
---

İki model eğittiniz. Biri test setinde 91,2, diğeri 92,1 aldı. Toplantıda ikincisi seçildi, üretime çıktı, üç hafta sonra kimse aradaki farkı göremedi. Bu hikâye her ekipte tekrar eder, çünkü rapor edilen sayının bir hata payı yoktu. Oysa test skoru bir sabit değil, bir tahmindir; ve o tahminin etrafındaki belirsizlik çoğu zaman kutladığınız farktan büyüktür. Bu yazıda farkın gerçek olup olmadığını nasıl ölçeceğinizi anlatıyoruz: örnekleme hatası, bootstrap güven aralığı, eşleştirilmiş testler, tohum varyansı ve çok aday karşılaştırırken kaçınılmaz olarak şişen yanlış bulgu riski.

## Tohum varyansından küçük bir fark

Bir terazi düşünün. Aynı çuvalı üst üste tarttığınızda 50,2 kg, 50,4 kg, 50,1 kg gösteriyor. Bu terazi bozuk değildir; her ölçüm aletinin bir tekrarlanabilirlik payı vardır. Şimdi iki çuvaldan birinin 50,2 diğerinin 50,4 geldiğini görüp “ikincisi daha ağır” diye rapor yazdığınızı düşünün. Model karşılaştırmalarında yaptığımız hata tam olarak budur.

Bir eğitim koşumunun sonucu birkaç bağımsız kaynaktan gürültü taşır: ağırlıkların rastgele başlatılması, veri sırasının karışması, ayrılma (dropout) maskeleri, paralel toplama işlemlerinin belirlenimsizliği ve elbette test setinin kendisinin bir örneklem olması. Aynı kodu yalnızca rastgelelik tohumunu (seed) değiştirerek iki kez çalıştırdığınızda ortaya çıkan fark, çoğu projede raporlanan iyileşmelerle aynı büyüklüktedir.

Bu yüzden ilk soru “hangi model daha iyi?” değildir. İlk soru şudur: _bu ölçüm aletinin tekrarlanabilirlik payı ne kadar?_ Cevabı bilmeden yapılan her karşılaştırma, iki çuvalı bozuk olmayan ama hassasiyeti bilinmeyen bir teraziyle kıyaslamaktır.

> Hata payı olmayan bir skor, ölçüm değil iddiadır. Ve iddiaları karşılaştırarak model seçemezsiniz.

## Test seti bir örneklemdir

Test setiniz evren değildir; evrenden çekilmiş bir örneklemdir. Dolayısıyla üzerinde hesapladığınız doğruluk, F1 ya da hata oranı birer _tahmindir_ ve her tahminin bir standart hatası vardır.

Sezgi basittir: aynı modeli, aynı dağılımdan çekilmiş başka bir test setiyle ölçseydiniz farklı bir sayı çıkardı. Bu dalgalanma örneklem büyüdükçe küçülür, ama karekökle küçülür — test setini iki katına çıkarmak belirsizliği yarıya indirmez. Ve belirsizliği yöneten şey toplam örnek sayısı değil, kararınızın dayandığı hücrelerin sayısıdır: nadir bir sınıfta yalnızca kırk örneğiniz varsa, o sınıfın geri çağırma oranı on binlik bir test setinde bile oynaktır. [Sınıflandırma metriklerinin](/posts/degerlendirme-metrikleri/) her biri için ayrı bir aralık hesaplamanız gerekmesinin sebebi budur.

Aralık hesaplamadan önce sorulacak bir soru daha var: metrik, kuracağınız cümleyi taşıyabiliyor mu? Ehud Reiter'in [BLEU'nun geçerliliği üzerine yapısal derlemesi](https://aclanthology.org/J18-3002/) — 34 makaleden 284 korelasyon — kanıtların BLEU'yu makine çevirisi dışında, tekil metinlerin değerlendirilmesinde ya da bilimsel hipotez sınamasında kullanmayı desteklemediği sonucuna varır. Geçersiz bir metriğin etrafına çizilen güven aralığı (confidence interval), yanlış cevabı daha ikna edici hâle getirmekten başka işe yaramaz.

## Bootstrap: yeniden örnekleyerek aralık kurmak

Standart hata formülünü ezberlemek yerine, çoğu durumda daha güvenli ve daha genel bir yol var: bootstrap. Fikir neredeyse kabaca basittir. Elinizde tek bir test seti var ama sanki elinizde birçok test seti varmış gibi davranırsınız.

Test setinden, aynı büyüklükte, yerine koyarak yeni bir örneklem çekersiniz; bazı örnekler iki kez girer, bazıları hiç girmez. Bu yeni sette metriği yeniden hesaplarsınız. İşlemi birçok kez tekrarlayıp elde ettiğiniz metrik dağılımının uçlarını kırparsınız — yüzde 2,5 ve yüzde 97,5 yüzdelikleri size yüzde 95'lik bir aralık verir.

Bootstrap'i tercih etmenizin sebebi tembellik değil, kapsamdır. Kapalı formüllü standart hata ifadeleri basit oranlar için vardır; F1, ortalama kesinlik ya da eşik seçimiyle birlikte hesaplanan bileşik metrikler için genellikle yoktur. Yeniden örnekleme ise metriğin ne olduğunu umursamaz: siz nasıl hesaplıyorsanız onu yeniden hesaplar. Aynı yöntem, alt gruplara göre kırılım aldığınızda da çalışır — ki asıl sürprizler çoğu zaman orada çıkar.

```python
# Metrik için bootstrap aralığı (pseudocode)
skorlar = []
for i in range(B):                       # B büyük olsun, örneğin binlerce
    indeksler = yerine_koyarak_cek(test_seti, n=len(test_seti))
    skorlar.append(metrik(tahminler[indeksler], etiketler[indeksler]))

alt, ust = yuzdelik(skorlar, 2.5), yuzdelik(skorlar, 97.5)
# Nadir sınıflar varsa tabakalı çekim yapın: her sınıfın payı korunsun.
# Örnekler bağımsız değilse (aynı kullanıcı, aynı belge) tekil satırı değil,
# o grubun tamamını birlikte çekin; yoksa aralık olduğundan dar çıkar.
```

Bootstrap'in iki tuzağı vardır. Birincisi, bağımlı örnekler: aynı kullanıcıya, aynı belgeye ya da aynı görüşmeye ait satırları tek tek çekerseniz aralığınız gerçekte olduğundan dar çıkar ve sizi olmayan bir kesinliğe ikna eder. İkincisi, sızıntı: eğitimle örtüşen bir test seti üzerinde hesaplanan aralık, yanlış bir sayının etrafına çizilmiş kusursuz bir çemberdir. [Ayrımın temizliği](/posts/veri-sizintisi-capraz-dogrulama/), istatistiğin ön koşuludur.

## Asıl soru: farkın güven aralığı

Şimdi en sık yapılan hataya geliyoruz. İki modelin güven aralıklarını yan yana çizersiniz, aralıklar biraz örtüşür ve “fark anlamlı değil” dersiniz. Bu çıkarım genellikle yanlıştır.

Çünkü ilgilendiğiniz büyüklük iki ayrı skor değil, aralarındaki _farktır_ — ve farkın kendi güven aralığı vardır. İki model aynı test setinde ölçüldüğü için hataları birbirinden bağımsız değildir: ikisi de aynı zor örneklerde yanılır. Bu ortak zorluk hesaba katıldığında farkın belirsizliği, tek tek skorların belirsizliğinden belirgin biçimde küçülür. Örtüşen aralıklara bakarak karar vermek, elinizdeki en güçlü bilgiyi — eşleştirmeyi — çöpe atmaktır.

Doğru yol eşleştirilmiş ölçümdür. Bootstrap tarafında bu, her yinelemede _aynı_ indeksleri iki modele birden uygulayıp farkı hesaplamak demektir; sonuçta farkın dağılımını elde eder ve aralığın sıfırı içerip içermediğine bakarsınız. Sınıflandırmada aynı işi klasik bir sınama da görür: iki modelin nerede ayrıştığına bakan, yani birinin doğru diğerinin yanlış yaptığı örnekleri sayan McNemar sınaması. İkisinin ortak sezgisi şudur: her iki modelin de doğru bildiği örnekler karşılaştırma hakkında hiçbir şey söylemez, bilgi anlaşmazlıklardadır.

> Skorların aralığı sorunuza cevap vermez. Farkın aralığı verir; ve o aralık sıfırı içeriyorsa, elinizde bir kazanan yoktur.

## Çok aday, çok karşılaştırma

Bir farkı sınamak kolaydır. Yirmi farkı sınamak, tamamen tesadüfen en az bir “anlamlı” sonuç bulmanızı neredeyse garanti eder. Hiperparametre taraması yapan, üç mimariyi beş tohumla deneyen ya da lider tablosunda haftalarca tırmanan herkes farkında olmadan bu duruma girer.

### Düzeltme yapmak

En basit çare Bonferroni düzeltmesidir: anlamlılık eşiğinizi yaptığınız karşılaştırma sayısına bölersiniz. Muhafazakârdır, yani gerçek farkları da kaçırabilir. Holm yöntemi aynı güvenceyi daha az güç kaybıyla verir: p değerlerini sıralar ve eşiği kademeli olarak gevşetir. Hangisini seçerseniz seçin, asıl mesele karşılaştırma sayısını dürüstçe saymaktır — rapora yalnızca kazananı yazıp denenen kırk varyantı unutmak, düzeltmeyi anlamsız kılar.

### Tohum varyansını raporlamak

Tohum bir hiperparametre değildir. En iyi tohumu seçip onun skorunu raporlamak, gürültüyü başarı olarak sunmaktır. Doğru pratik, aynı yapılandırmayı birkaç tohumla çalıştırıp sonuçların yayılımını — ortalamayı ve dağılımı birlikte — raporlamaktır. İki modelin tohum yayılımları geniş ölçüde çakışıyorsa, ortalamalar arasındaki fark ne kadar hoşunuza giderse gitsin bir bulgu değildir.

Aynı test setine defalarca bakmanın ikinci bir bedeli daha var: zamanla o sete uyum sağlarsınız. Model ağırlıkları değil, kararlarınız aşırı uyum (overfitting) gösterir. Bu, [eğitim verisine aşırı uyumun](/posts/overfitting-duzenlilestirme/) insan eliyle işleyen versiyonudur ve aynı şekilde ölçüyü bozar. Alan ölçeğinde aynı sorunun adı ise [kıyaslama kirlenmesidir](/posts/kiyaslama-kirlenmesi/).

## Rapor disiplini: hata payı artık bir uyum belgesi

Hata payı raporlamak uzun süre iyi bilim adabı sayıldı; bugün ayrıca bir yükümlülük hâline geliyor. [Yapay Zekâ Yasası'nın 15. maddesi](https://artificialintelligenceact.eu/article/15/), sağlayıcıların doğruluk seviyelerini ve ilgili doğruluk metriklerini kullanım talimatlarında beyan etmesini zorunlu kılıyor. Gönüllü tarafta da aynı talep var: [NIST Yapay Zekâ Risk Yönetimi Çerçevesi](https://www.nist.gov/itl/ai-risk-management-framework), dört işlevinden biri olan MEASURE ile — diğerleri GOVERN, MAP ve MANAGE — sistemin ölçülmesini ve ölçümün belgelenmesini ister.

Bu ikisi bir araya geldiğinde tek bir cümle çıkar: aralıksız bir nokta tahmini artık yalnızca özensiz bilim değil, eksik bir beyandır. Bir sayı beyan ediyorsanız, hangi veri kümesinde, hangi tarihte, hangi belirsizlikle ölçtüğünüzü de beyan ediyorsunuz demektir.

Alanın hızını da hesaba katın. [Stanford HAI Yapay Zekâ Endeksi 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report), SWE-bench Verified skorlarının bir yıl içinde yüzde 60'tan yüzde 100'e yakın seviyeye çıktığını, OSWorld ajanlarının yüzde 12'den yaklaşık yüzde 66'ya ulaştığını bildiriyor. Aynı rapor, en iyi modelin analog saatleri yalnızca yüzde 50,1 oranında doğru okuduğunu da yazıyor. Bu rakamlar raporun ölçtüğü ana aittir ve lider tabloları hızla değişir; ama ders kalıcıdır: manşet skorlar dev sıçramalarla ilerlerken, aynı sistemler basit bir görevde yazı tura seviyesinde kalabiliyor. Tek bir toplam sayı, bu yapıyı görünmez kılar.

<div class="callout"><strong>İpucu:</strong> Her model karşılaştırma raporuna dört satır ekleyin: test setinin adı ve sürümü, farkın güven aralığı, kaç karşılaştırma yapıldığı ve kaç tohumla çalışıldığı. Bu dört satır, tartışmaların çoğunu daha başlamadan bitirir.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Test skoru bir sabit değil tahmindir; hata payı olmayan bir sayı ölçüm sayılmaz.</li><li>Bootstrap, tek bir test setinden aralık kurmanın en genel yoludur; bağımlı satırları grup hâlinde yeniden örnekleyin.</li><li>Örtüşen güven aralıklarına bakmayın; eşleştirilmiş bootstrap ya da McNemar ile doğrudan farkın aralığını hesaplayın.</li><li>Çok aday karşılaştırıyorsanız Bonferroni ya da Holm ile düzeltin ve tohum yayılımını raporlayın; tohum bir hiperparametre değildir.</li><li>Beyan edilen doğruluk artık düzenleyici bir çıktı: sayıyı hangi veriyle, hangi tarihte ve hangi belirsizlikle ölçtüğünüzü birlikte yazın.</li></ul></div>

<div class="faq"><details><summary>İki modelin güven aralıkları örtüşüyor, fark yok mu demektir?</summary><p>Hayır. Modeller aynı test setinde ölçüldüğü için hataları birbiriyle ilişkilidir ve farkın belirsizliği tek tek skorların belirsizliğinden küçüktür. Doğru yöntem, eşleştirilmiş bootstrap ya da McNemar ile doğrudan farkın aralığını hesaplamaktır.</p></details><details><summary>Kaç bootstrap yinelemesi yeterli?</summary><p>Aralığın uçları yineleme sayısını artırdığınızda kayda değer biçimde değişmiyorsa yeterlidir. Pratikte binlerce yineleme ucuzdur; asıl maliyet metriğin hesaplanmasında olur. Yinelemeyi az tutup aralığı raporlamak, aralığın kendisine gürültü eklemek demektir.</p></details><details><summary>Tek bir tohumla eğittim, ne yapmalıyım?</summary><p>En azından son yapılandırmayı birkaç tohumla tekrarlayın ve yayılımı raporlayın. Bu mümkün değilse, tohum varyansını ölçmediğinizi açıkça yazın; ölçülmemiş bir belirsizliği yok saymak yerine sınırı beyan etmek, kararı alan kişiye gerçek bilgiyi verir.</p></details></div>

---

Özetle: model karşılaştırması bir tabelaya bakma işi değil, bir ölçüm işidir. Farkın güven aralığını hesaplayın, kaç karşılaştırma yaptığınızı sayın, tohum yayılımını gösterin ve hiçbir sayıyı belirsizliğinden ayırmadan raporlayın. Bunu yapan ekipler daha az duyuru yapar, ama duyurdukları şey doğru çıkar.
