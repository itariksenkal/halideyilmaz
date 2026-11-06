---
title: "RNN ve LSTM'den Transformer'a: Dizi Mimarilerinin Evrimi"
description: "Dizileri işleyen mimarilerin evrimini sezgisel olarak anlatıyoruz: RNN'lerin nasıl çalıştığı, kaybolan gradyan ve paralelleşememe gibi sınırları, LSTM'in kapıları ve dikkat mekanizmasının Transformer'la neden kazandığı."
publishDate: "2026-08-09T23:48:00+03:00"
lang: tr
category: "Tarihçe"
tags: ["Tarihçe", "Yapay Zeka"]
translation: "rnn-lstm-to-transformer"
heroImage:
  src: "../../../assets/blog/covers/rnn-den-transformer.jpg"
  alt: "RNN ve LSTM'den Transformer'a: Dizi Mimarilerinin Evrimi"
---

Bir cümleyi okurken kelimeleri tek tek değil, bir sıra hâlinde alırız; ama anlamı, sıranın tamamını zihnimizde tutarak kurarız. Makinelere dizileri işletmenin tarihi de tam olarak bu gerilimin hikâyesidir: **sırayı takip etmek** ile **uzaktaki bilgiyi unutmamak** arasındaki denge. RNN'lerden LSTM'lere, oradan Transformer'a uzanan yol, bu dengeyi her seferinde biraz daha iyi kuran fikirlerin evrimidir.

## Neden "dizi" zor bir problem?

Bir görüntüdeki pikseller aynı anda oradadır; ama bir cümledeki kelimeler bir _sıra_ oluşturur. "Köpek çocuğu ısırdı" ile "Çocuk köpeği ısırdı" aynı kelimeleri taşır, anlamları zıttır. Demek ki bir modelin yalnızca **hangi** kelimelerin geçtiğini değil, **hangi sırayla** ve **birbirleriyle nasıl** ilişkili olduğunu da yakalaması gerekir.

Üstelik dizilerin uzunluğu sabit değildir: üç kelimelik bir cümle de, üç yüz kelimelik bir paragraf da gelebilir. Bu yüzden dizileri işleyen mimarinin, uzunluktan bağımsız çalışabilmesi ve uzaktaki bilgiyi de hesaba katabilmesi beklenir.

> "Dizi işlemenin asıl sınavı kısa cümleler değil, uzun cümlelerdir: başta söyleneni sonda hatırlayabiliyor musun?"

## RNN: hafızası olan bir döngü

İlk güçlü fikir **tekrarlayan sinir ağı**ydı (RNN, recurrent neural network). Sezgi basit: cümleyi soldan sağa tek tek oku ve her kelimeden sonra zihninde küçük bir _özet_ tut. Bu özete **gizli durum** (hidden state) denir. Her adımda model, eldeki kelimeyi ve bir önceki özeti alır, ikisini birleştirir, yeni bir özet üretir.

Bir kitabı okurken aldığınız notları düşünün: her sayfa sonunda notunuzu güncellersiniz, sonraki sayfaya bu güncel notla geçersiniz. RNN tam olarak böyle çalışır; tek bir "not defteri"ni cümle boyunca taşır. Bu döngüsel yapı sayesinde model, prensipte istediği kadar uzun diziyi aynı parametrelerle işleyebilir.

<div class="callout"><strong>İpucu:</strong> RNN'i "hafızası olan tek bir hücrenin, her kelimede tekrar tekrar çağrılması" olarak düşünün. Sihir yeni bir ağ değil, aynı ağın kendine geri beslenmesidir.</div>

## RNN'lerin iki büyük sınırı

Bu zarif fikir iki yerde tıkanır. Birincisi **uzun bağımlılık** sorunudur. Bilgi tek bir özet üzerinden, adım adım taşınır; cümle uzadıkça başta söylenen bir şey, sona ulaşana kadar adeta solar. Teknik adıyla buna _kaybolan gradyan_ (vanishing gradient) denir: eğitim sırasında uzaktaki kelimelerden gelen düzeltme sinyali, geriye doğru katlana katlana neredeyse sıfıra iner. Sonuç: model "çiçekleri suladım, çünkü onlar … solmuştu" gibi uzun mesafeli bağları kurmakta zorlanır.

İkincisi **paralelleştirme** sorunudur. Her adım bir öncekinin özetini beklediği için işlem doğası gereği sıralıdır. Bir kelimeyi işlemeden ötekine geçemezsiniz. Modern donanım (GPU/TPU) binlerce işlemi aynı anda yapmak üzere tasarlanmışken, RNN bu gücün büyük kısmını boş bırakır. Bu da büyük veriyle büyük modelleri eğitmeyi yavaş ve pahalı kılar.

-   **Uzun bağımlılık:** Uzak kelimeler arasındaki ilişki, zincir boyunca zayıflar.
-   **Sıralılık:** Adımlar birbirini beklediği için eğitim paralelleşemez, ölçeklenmez.

## LSTM ve GRU: kapılarla unutmayı yönetmek

Uzun bağımlılık sorununa ilk büyük yanıt **LSTM** (uzun-kısa süreli bellek) oldu. Fikir şu: düz bir özet yerine, modele bir de _uzun süreli hafıza şeridi_ (hücre durumu) verelim ve bu şeride neyin yazılacağını, neyin silineceğini, neyin dışarı verileceğini küçük **kapılar** belirlesin.

-   **Unutma kapısı:** Eski hafızanın ne kadarını tutalım, ne kadarını atalım?
-   **Giriş kapısı:** Yeni bilgiden ne kadarını hafızaya yazalım?
-   **Çıkış kapısı:** Hafızanın ne kadarını şu anki çıktıya yansıtalım?

Bir analoji: zihninizde bir "ana not defteri" (hücre durumu) tutarsınız ve her sayfada üç karar verirsiniz — neyi silmeli, neyi eklemeli, neyi şimdi söylemeli. Bu kapılar sayesinde önemli bir bilgi, araya yüzlerce kelime girse bile defterde bozulmadan kalabilir. **GRU** ise aynı fikrin daha sade, daha az kapılı bir akrabasıdır; çoğu işte benzer başarıyı daha hafif bir yapıyla verir.

LSTM/GRU, uzun bağımlılık derdini büyük ölçüde hafifletti ve yıllarca çeviriden konuşma tanımaya kadar standart oldu. Ama ikinci sınırı, yani **sıralılığı**, ortadan kaldıramadı: hâlâ kelimeleri tek tek, sırayla işliyorlardı.

## Kırılma noktası: dikkat mekanizması

Asıl sıçrama, "tüm bilgiyi tek bir özete sıkıştırmak" varsayımını bırakmakla geldi. **Dikkat** (attention) fikri şunu söyler: bir kelimeyi işlerken, dizideki _tüm_ kelimelere aynı anda bakabil; ama hepsine eşit değil, ihtiyacına göre farklı ağırlıklarla. Yani model, "şu an hangi kelimelere ne kadar kulak vermeliyim?" sorusunu her adımda yeniden ve doğrudan yanıtlar.

Önemli olan şu: dikkat, iki kelime arasında **mesafe ne olursa olsun tek adımda** doğrudan bir bağ kurar. Artık bilgi uzun bir zincir boyunca taşınmak zorunda değildir; ilgili kelime cümlenin başında da olsa, sonunda da olsa ona doğrudan uzanılır. Dikkatin matematiğine ve Query–Key–Value sezgisine ayrı bir yazıda derinlemesine girdik; burada onu evrimin itici gücü olarak ele alıyoruz.

## Transformer: sırayı bırak, ilişkiye bak

2017'de yayımlanan _"Attention Is All You Need"_ makalesi cesur bir adım attı: tekrarlamayı (recurrence) tümüyle attı ve mimariyi baştan sona dikkat üzerine kurdu. Bu mimariye **Transformer** denir. Artık kelimeler sırayla beklemiyor; bütün dizi aynı anda işleniyor ve her kelime, diğer tüm kelimelere doğrudan bakıyor.

Peki sıra bilgisi nasıl korunuyor? Transformer, kelimelere sırayı kaybetmesin diye **konumsal kodlama** (positional encoding) ekler — her kelimenin temsiline "ben dizinin kaçıncı öğesiyim?" bilgisini katar. Böylece "köpek çocuğu ısırdı" ile "çocuk köpeği ısırdı" arasındaki fark yine yakalanır; ama bu, sıralı işleme zorunluluğu olmadan yapılır.

-   **Paralellik:** Tüm kelimeler aynı anda işlenir; GPU'lar tam kapasite çalışır, eğitim hızlanır.
-   **Doğrudan bağlam:** Uzaktaki kelimeler tek adımda buluşur; uzun bağımlılık doğal biçimde çözülür.
-   **Ölçeklenebilirlik:** Bu iki özellik, devasa veriyle devasa modelleri eğitmeyi mümkün kıldı — bugünkü büyük dil modellerinin temeli budur.

## Küçük bir şema

Üç yaklaşımın özünü birkaç satır sözde-kodla yan yana koyalım; fark, "bilginin nasıl taşındığı"ndadır:

```python
# 1) RNN: tek bir ozeti adim adim tasi (sirali)
h = sifir_vektoru
for kelime in cumle:            # her adim bir oncekini bekler
    h = guncelle(h, kelime)     # ayni hucre tekrar tekrar cagrilir
cikti = h                       # tum cumle tek bir ozete sikismis

# 2) LSTM: ozetin yaninda bir de "hafiza seridi" + kapilar
h, c = sifir, sifir            # c = uzun sureli hafiza (hucre durumu)
for kelime in cumle:
    unut   = kapi(h, kelime)   # eskiden ne tutulsun?
    ekle   = kapi(h, kelime)   # yeniden ne yazilsin?
    c = unut * c + ekle * aday(h, kelime)
    h = cikis_kapisi(h, kelime) * tanh(c)

# 3) Transformer: sira yok; herkes herkese ayni anda bakar (paralel)
X = gomme(cumle) + konumsal_kodlama(cumle)   # sira bilgisi eklenir
cikti = self_attention(X)      # her kelime tum kelimelere dogrudan uzanir
```

Dikkat edin: RNN ve LSTM'de bir `for` döngüsü var — adımlar sıralı. Transformer'da döngü yok; tüm dizi tek bir işlemde, aynı anda işleniyor. Evrimin özü bu satırlarda saklı.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>RNN, cümleyi soldan sağa okuyup tek bir gizli durumda özetler; zarif ama uzun mesafede bilgiyi kaybeder.</li><li>RNN'lerin iki temel sınırı: kaybolan gradyan (uzun bağımlılık) ve sıralı işlemenin paralelleşememesi.</li><li>LSTM/GRU, kapılar ve bir hafıza şeridiyle unutmayı yönetip uzun bağımlılığı büyük ölçüde çözer; ama hâlâ sıralıdır.</li><li>Dikkat, herhangi iki kelime arasında mesafeden bağımsız tek adımda doğrudan bağ kurar.</li><li>Transformer tekrarlamayı atar, konumsal kodlamayla sırayı korur ve tam paralellik sayesinde ölçeklenir.</li></ul></div>

## Sonuç: neden dikkat kazandı?

Bu evrim tek bir cümleye sığar: **bilgiyi taşımaktan vazgeçip ilişkiyi doğrudan kurmak.** RNN bilgiyi bir zincir boyunca taşıdı; LSTM o zinciri daha sağlam yaptı ama kırmadı. Transformer ise zinciri tümden attı — her kelime, ihtiyaç duyduğu her kelimeye doğrudan uzanabildiği için ne bilgi soldu ne de işlemler birbirini bekledi.

Dikkatin kazanmasının iki pratik nedeni var: uzun bağlamı doğal biçimde çözmesi ve modern donanımla tam paralel çalışabilmesi. Bu ikisi birleşince, daha çok veriyle daha büyük modelleri eğitmek mümkün hâle geldi; bugün kullandığımız dil asistanları, çeviri ve arama sistemleri büyük ölçüde bu temel üzerinde yükseliyor. Bu mimarilerin gerçek ürünlere nasıl dönüştüğünü merak ediyorsanız, yapay zekâyı işlere uygulama tarafına bakan [HatsonTech](/posts/hatsontech-nedir/)'e göz atabilirsiniz.

<div class="faq"><details><summary>RNN ve LSTM bugün tamamen gereksiz mi?</summary><p>Hayır. Kaynakların kısıtlı olduğu, dizilerin kısa olduğu veya gerçek zamanlı akışın önemli olduğu kimi uygulamalarda hâlâ tercih edilebilirler. Ancak büyük ölçekli dil görevlerinde Transformer fiilen standart hâline gelmiştir.</p></details><details><summary>Transformer sırayı atıyorsa kelime sırasını nasıl biliyor?</summary><p>Konumsal kodlama (positional encoding) sayesinde. Her kelimenin temsiline, dizideki konumunu belirten bir sinyal eklenir; böylece model sırayı, sıralı işleme zorunluluğu olmadan hesaba katar.</p></details><details><summary>"Kaybolan gradyan" tam olarak ne demek?</summary><p>Eğitim sırasında düzeltme sinyali ağda geriye doğru yayılırken her adımda küçük çarpanlarla katlanır. Uzun dizilerde bu çarpımlar neredeyse sıfıra iner; yani uzaktaki kelimelerden öğrenme sinyali kaybolur. LSTM'in hafıza şeridi bu yolu büyük ölçüde açık tutmak için tasarlanmıştır.</p></details></div>

---

Özetle dizileri işleyen mimarilerin hikâyesi, "geçmişi nasıl hatırlarız?" sorusunun giderek daha iyi yanıtlarıdır. RNN bir not defteri tuttu, LSTM o deftere akıllı kapılar ekledi, Transformer ise defteri bırakıp her şeye aynı anda bakmayı öğretti. Bugünkü yapay zekânın yetkinliğinin büyük kısmı, bu basit ama derin fikir değişiminden geliyor.
