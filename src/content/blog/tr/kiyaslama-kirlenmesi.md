---
title: "Kıyaslama Kirlenmesi: Lider Tablolarındaki Skorlar Neden Şişkin?"
description: "Test verisi sızıntısı artık tek bir ekibin çapraz doğrulama hatası değil, bütün alanın değerlendirme altyapısının sorunu. Kirlenme ve doygunluk skorları nasıl şişiriyor, kendi özel değerlendirme setinizi nasıl kurarsınız?"
publishDate: "2026-08-13T23:17:00+03:00"
lang: tr
category: "Değerlendirme"
tags: ["Değerlendirme", "Yapay Zeka"]
translation: "benchmark-contamination"
heroImage:
  src: "../../../assets/blog/covers/kiyaslama-kirlenmesi.jpg"
  alt: "Kıyaslama Kirlenmesi: Lider Tablolarındaki Skorlar Neden Şişkin?"
---

Veri sızıntısını bilirsiniz: test örnekleri bir şekilde eğitim setine karışır, doğrulama skoru uçar, model canlıda çuvallar. Bu, tek bir ekibin tek bir hafta sonunda yaptığı bir hatadır ve düzeltilebilir. Kıyaslama kirlenmesi (benchmark contamination) ise aynı hatanın alan ölçeğine büyümüş hâlidir: bu kez sızan şey sizin test setiniz değil, herkesin ortak sınav kâğıdıdır. Bu yazıda kirlenmenin skorları ne kadar şişirdiğini, kıyaslamaların neden raf ömrü olduğunu ve pratik tek çözümü — kendi özel, uzman derlemesi değerlendirme setinizi — ele alıyoruz.

## Sızıntının alan ölçeğine büyümüş hâli

Bir öğretmen düşünün: sınav sorularını her yıl aynı soru bankasından seçiyor ve o banka internette dolaşıyor. Öğrenciler dersi öğrenmemiş olsa bile notlar yıldan yıla yükselir. Öğretmen bunu “eğitim kalitesindeki artış” diye raporlar. Bugün lider tablolarında olan tam olarak budur.

Mekanizma gizemli değil. Kıyaslama setleri kamuya açık depolarda, forumlarda, blog yazılarında ve makale eklerinde durur; web taramasıyla toplanan ön eğitim verisi de aynı yerlerden geçer. Modelin bu metinleri ne ölçüde tutabildiği de ölçüldü: [bir çalışma modellerin parametre başına yaklaşık 3,6 bit ezberlediğini](https://arxiv.org/abs/2505.24832) tahmin ediyor. Yeterince büyük bir model için bu, milyonlarca soru-cevap çiftini taşımaya fazlasıyla yeter.

Sonuç, [çapraz doğrulamada tanıdığımız sızıntının](/posts/veri-sizintisi-capraz-dogrulama/) aynısıdır, sadece failin kim olduğu belirsizdir. Siz test setinizi kirletmediniz; sizden önce biri kirletti ve siz o setle model seçiyorsunuz.

“Biz kirlenmeyi filtreledik” cümlesi de rahatlatıcı değildir, çünkü doğrulanamaz. Eğitim verisini görmüyorsunuz, filtrenin hangi eşikle ve hangi eşleşme kuralıyla çalıştığını bilmiyorsunuz, birebir kopya olmayan ama aynı soruyu farklı ifadelerle soran metinlerin elenip elenmediğini hiç bilmiyorsunuz. Dışarıdan bakan biri için bu, sınav kâğıdını kaybetmediğine dair verilmiş sözlü bir teminattan ibarettir.

> Kirlenmiş bir kıyaslamada yüksek skor, modelin iyi olduğunu değil, sınavın sızdığını gösterir. İkisini ayırt edemiyorsanız elinizde ölçüm değil, izlenim vardır.

## Kirlenme skorlara ne yapıyor?

Etki iki ayrı biçimde ortaya çıkar ve ikisinin de bedeli farklıdır.

Birincisi, mutlak skorun şişmesi. Kirlenmeyi niceleyen [bir çalışma](https://arxiv.org/abs/2607.23514), Makro-F1 skorunda 11,34 puana varan bir şişme ve buna eşlik eden sıralama bozulmaları ölçtü. İkincisi ve daha sinsi olanı, sıralamaların bozulmasıdır: kirlenme her modeli eşit oranda ödüllendirmediği için, tablodaki sıra artık yeteneği değil, hangi modelin o setle daha çok karşılaştığını yansıtır.

Şişmenin gerçekten ezberden geldiğini gösteren en temiz sınav, modelin eğitim kesim tarihinden sonra üretilmiş örneklerdir. [Bir değerlendirmede modellerin yüzde 84'ü kesim sonrası vakalarda performans kaybetti.](https://arxiv.org/abs/2602.10367) Aynı görev, aynı format, sadece tarih farklı — ve skor düşüyor.

Buradaki asıl mesele [metriğin kendisi değil](/posts/degerlendirme-metrikleri/); Makro-F1 de doğruluk da hesaplandıkları veri kadar dürüsttür. Bu sayıların hepsinin ilgili makalelerin ölçtüğü ana ait olduğunu da unutmayın: lider tabloları haftalar içinde değişir, bir makaledeki sıralamayı bugünün canlı durumu gibi aktarmak ikinci bir hatadır.

<div class="callout"><strong>İpucu:</strong> Bir modeli seçmeden önce ucuz bir kirlenme testi yapın: kıyaslamadaki soruları yeniden yazın, sayıları ve isimleri değiştirin, şıkların sırasını karıştırın. Skor belirgin biçimde düşüyorsa ölçtüğünüz şey yetenek değil, tanıdıklıktı.</div>

## Doygunluk: kıyaslamaların raf ömrü vardır

Kirlenmenin kardeşi doygunluktur. Bir kıyaslama yayımlandığı gün ayırt edicidir; birkaç yıl sonra herkes tavana yaklaşır ve tablo bir sıralama aracı olmaktan çıkar, gürültü ölçmeye başlar.

ICML 2026'da sunulan, 60 kıyaslamayı 14 özellik üzerinden inceleyen [bir çalışma](https://arxiv.org/abs/2602.16763) bunu net biçimde ortaya koyuyor: incelenen kıyaslamaların neredeyse yarısı doygunluk gösteriyor ve doygunluk oranı kıyaslamanın yaşıyla birlikte artıyor. Aynı çalışmanın dayanıklılıkla ilgili bulgusu ise bu yazının pratik omurgasıdır: direnç, test verisinin kamuya açık olmasından değil, uzman derlemesinden geliyor.

Altyapının kendisi de yorulur. Alanın en kapsamlı akademik değerlendirme çerçevelerinden biri olan HELM, [1 Haziran 2026 itibarıyla bakım moduna geçti](https://crfm-helm.readthedocs.io/en/latest/maintenance_mode/): yeni özellik eklenmeyecek ve lider tablolarına yeni değerlendirme girmeyecek. Bir kıyaslamayı canlı tutmanın maliyeti, onu kurmanın maliyetinden yüksektir; bu yüzden kalıcı bir ölçüm altyapısı beklemek gerçekçi değildir.

Doygunluğun sinsi tarafı, tavan yaklaştıkça karşılaştırmanın da anlamsızlaşmasıdır. Modellerin tamamı yüzde doksan sekiz civarında toplandığında, aradaki farklar ölçüm gürültüsünün ve birkaç hatalı etiketin altında kalır; sıralama artık yeteneği değil, hangi modelin o birkaç bozuk soruya tesadüfen doğru cevap verdiğini gösterir. Sonuç olarak kıyaslamayı bir kanun değil, tüketim maddesi olarak görün. Son kullanma tarihi vardır ve o tarih, herkesin ona nişan almasıyla birlikte gelir.

## Kirlenme dedektörleri sizi kurtarmıyor

Doğal refleks, kirlenmeyi otomatik olarak tespit eden yöntemlere sarılmaktır: n-gram örtüşmesi, şaşkınlık karşılaştırmaları, üyelik çıkarımı sınamaları. Bu araçlar işe yarar, ama güvenilirlikleri sandığınızdan düşüktür.

Dedektörleri sistematik olarak sınayan [bir çalışma](https://arxiv.org/abs/2606.03305), 335 değerlendirmenin yalnızca 201'inde doğru sonuç alındığını raporluyor. Yani kirlenme teşhisinin kendisi de bir ölçüm problemidir ve o ölçümün de hata payı vardır. Kirlenmediğini “kanıtlayan” bir dedektör çıktısını temiz kâğıt gibi kullanmayın.

Daha derin bir sorun da var: bir kıyaslama kirlenmemiş olsa bile, ölçtüğünü iddia ettiği şeyi ölçmüyor olabilir. NeurIPS 2025'te sunulan [yapı geçerliliği çalışması](https://arxiv.org/abs/2511.04703) — 29 uzman hakem, 445 kıyaslamanın sistematik incelemesi — sekiz somut öneriyle bitiyor ve alanın en rahatsız edici sorusunu soruyor: bu test tam olarak hangi yeteneği ölçüyor?

Bu soru tanıdık gelmeli. Bir kıyaslama nihayetinde etiketli bir veri kümesidir ve [etiketleme kalitesinin](/posts/veri-kalitesi-etiketleme/) bütün kuralları ona da uygulanır: belirsiz yönerge, tutarsız etiket, temsil etmeyen örneklem. Kirlenme yalnızca en görünür kusurdur.

## Lider tablosu asimetrisi ve Türkçedeki karışıklık

Kirlenme her zaman kazara olmaz; bazen sadece erişim eşitsizliğidir. Chatbot Arena'nın pratiklerini inceleyen [bir çalışma](https://arxiv.org/abs/2504.20879), Meta'nın Llama 4 sürümü öncesinde 27 özel varyantı arenada test ettiğini; Google'ın arenadaki tüm verinin yaklaşık yüzde 19,2'sine, OpenAI'ın yaklaşık yüzde 20,4'üne eriştiğini, buna karşılık 83 açık ağırlıklı modelin toplamda yaklaşık yüzde 29,7'yi paylaştığını raporluyor.

Bunun teknik adı, tekrarlı ölçüm avantajıdır. Aynı sınava daha çok deneme hakkıyla girenler, aynı yetenekle daha yüksek skor alır. Sonuç kimsenin kural ihlali yapmadığı ama tablonun yine de yanıltıcı olduğu bir dünyadır.

Türkçe tarafında ise daha basit ama daha sık rastlanan bir tuzak var: iki farklı kıyaslamanın rutin olarak birbirine karıştırılması. [TurkishMMLU](https://arxiv.org/abs/2407.12402) (EMNLP 2024 Findings), Türk lise müfredatından derlenmiş, dokuz derste 10.000'den fazla soru içerir. [TR-MMLU](https://arxiv.org/abs/2501.00593) (Bayram ve arkadaşları, Ocak 2025) ise 280.000 soruluk bir havuzdan seçilmiş, 67 disiplini kapsayan 62 bölümde 6.200 çoktan seçmeli soru içerir. İsimleri benzer, kapsamları ve boyutları farklıdır.

Dolayısıyla “bu model Türkçe MMLU'da şu skoru aldı” cümlesi, hangi setten bahsedildiği söylenmedikçe karşılaştırılabilir değildir. [Türkçe kıyaslamalarla](/posts/turkce-veri-kalitesi-kiyaslama/) çalışırken setin adını, sürümünü ve alt kümesini her zaman birlikte yazın.

## Kendi özel değerlendirme setinizi kurmak

Buraya kadarki bulguların hepsi tek bir pratik sonuca çıkıyor: kararlarınızı, kimsenin göremediği bir sınavla verin. Uzman derlemesi, özel tutulan bir değerlendirme seti bugün elinizdeki en dayanıklı ölçüm aracıdır — hem kirlenmeye hem doygunluğa karşı.

### Neyi, nereden toplarsınız

Örnekleri kendi alanınızın gerçek trafiğinden çekin; kamuya açık bir setten kopyalamayın, çünkü kopyaladığınız an aynı riski içeri almış olursunuz. Mümkünse modelin eğitim kesim tarihinden sonraki vakaları da ekleyin, böylece ezberi yetenekten ayıran doğal bir kontrol grubunuz olur. Etiketleri konunun uzmanına yaptırın ve anlaşmazlıkları uzlaştırın; setin değeri, büyüklüğünden çok etiket kalitesinden gelir.

### Nasıl gizli tutar, nasıl yaşatırsınız

```python
# Özel değerlendirme seti hijyeni (pseudocode)
set = uzman_derle(kendi_alaniniz, kesim_sonrasi_vakalar_dahil)
set = surumle(set, "v1")               # sürüm sabit, karşılaştırma mümkün
yayimla(sadece_toplam_skorlar)         # soruların kendisi asla dışarı çıkmaz

for model in adaylar:
    skor = degerlendir(model, set)
    if model_saglayicisina_veri_gidiyorsa:
        setin_o_bolumunu_yak()         # bir kez gördüyse artık kör değil

her_donem:
    set = yenile(set, taze_vakalar)    # eskiyen bölümü emekliye ayır
    kirlenme_kontrolu(set, kamuya_acik_kaynaklar)
```

Üç kural bu setin ömrünü belirler. Soruları hiçbir zaman yayımlamayın, yalnızca toplu skorları paylaşın. Seti sürümleyin ki zaman içinde karşılaştırma yapabilesiniz. Ve bir bölümü dışarıya gönderdiyseniz — örneğin verinizi saklayan bir sağlayıcıya — o bölümü artık kör sınav saymayın.

Maliyet sorusu genellikle burada gelir: uzman saati pahalıdır. Ama karşılaştırmayı doğru yapın. Yanlış model seçiminin bedeli, birkaç yüz örneği doğru etiketlemenin bedelinden büyüktür ve bu bedel aylara yayılarak, sessizce ödenir. Ayrıca set bir kez kurulduktan sonra tamamen yenilenmez; her dönem yalnızca eskiyen bölüm emekliye ayrılır ve yerine taze vakalar eklenir. Bu, bir projeden çok küçük ve sürekli bir bakım işidir.

<div class="callout"><strong>İpucu:</strong> Setinizin içine birkaç benzersiz işaretçi dizi (canary) yerleştirin. Bu diziler ileride bir modelin çıktısında belirirse, setinizin bir yerden sızdığını doğrudan öğrenmiş olursunuz.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Kıyaslama kirlenmesi, tek bir ekibin veri sızıntısının bütün alanın değerlendirme altyapısına büyümüş hâlidir.</li><li>Kirlenme hem mutlak skoru şişirir hem sıralamayı bozar; kesim sonrası vakalar en temiz kontrol testidir.</li><li>Kıyaslamaların raf ömrü vardır: incelenen setlerin neredeyse yarısı doygun ve direnç uzman derlemesinden geliyor.</li><li>Kirlenme dedektörlerinin kendi hata payı yüksektir; bir dedektör çıktısı temizlik belgesi değildir.</li><li>Kararlarınızı kimsenin göremediği, uzman derlemesi, sürümlenmiş özel bir değerlendirme setiyle verin.</li></ul></div>

<div class="faq"><details><summary>Kirlenmiş bir kıyaslamayı hiç kullanmamalı mıyım?</summary><p>Kullanabilirsiniz, ama tek karar dayanağı yapmayın. Yaygın kıyaslamalar kabaca eleme için hâlâ işe yarar; nihai model seçimini özel setinizle yapın. Ayrıca her skoru ölçüldüğü makaleye ve tarihe bağlayarak aktarın, çünkü tablolar hızla değişir.</p></details><details><summary>Kendi setim kaç örnekten oluşmalı?</summary><p>Kalite, boyuttan önce gelir. Kararlarınızı ayırt edecek kadar dar bir güven aralığı verecek büyüklük yeterlidir; onun ötesinde her yeni örnek yerine etiket kalitesine ve zor vakaların kapsanmasına yatırım yapın. Uzman derlemesi küçük bir set, gevşek etiketli büyük bir setten daha güvenilirdir.</p></details><details><summary>Kirlenmeyi kendim nasıl sınarım?</summary><p>En ucuz yöntem yeniden yazmadır: aynı soruyu farklı ifadelerle, farklı sayılarla ve karıştırılmış şıklarla sorun. İkinci yöntem, eğitim kesim tarihinden sonra üretilmiş vakalarla ölçmektir. İki koşul arasındaki fark büyükse, elinizdeki skor ezberi ölçüyordur.</p></details></div>

---

Özetle: lider tablosu bir pazarlama aracına dönüştüğü anda ölçüm aracı olmaktan çıkar. Yapılacak şey tabloları boykot etmek değil, kararı onlara bırakmamaktır. Kendi alanınızdan derlenmiş, uzman etiketli, gizli tutulan ve sürümlenen küçük bir set, herkesin baktığı devasa bir kıyaslamadan daha çok şey söyler — çünkü onu yalnızca siz görüyorsunuz.
