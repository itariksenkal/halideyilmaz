---
title: "Adalet Denetimi Pratikte: Bir Modeli Gerçekten Nasıl Denetlersiniz (ve Denetimler Neden Tiyatroya Dönüşür)?"
description: "Adalet denetiminin operasyonel hâli: korumalı özniteliği hukuken tutamadığınızda ne yaparsınız, imkânsızlık sonuçlarını bilerek hangi ölçütü seçersiniz, alt grubu ne kadar büyütmeniz gerekir ve raporu nasıl yazarsınız?"
publishDate: "2026-08-13T23:23:00+03:00"
lang: tr
category: "Etik"
tags: ["Etik", "Yapay Zeka"]
translation: "fairness-auditing-in-practice"
heroImage:
  src: "../../../assets/blog/covers/adalet-denetimi-pratikte.jpg"
  alt: "Adalet Denetimi Pratikte: Bir Modeli Gerçekten Nasıl Denetlersiniz (ve Denetimler Neden Tiyatroya Dönüşür)?"
---

Adalet denetimi hakkında yazılanların büyük kısmı ya kavramsal (“model neden ayrımcılık yapar?”) ya da araç tanıtımı. Aradaki asıl boşluk operasyonel: korumalı özniteliği hukuken elinizde tutamıyorsanız neyi ölçersiniz, birbiriyle çelişen ölçütlerden hangisini seçersiniz, bir alt grubun kaç örneği olmalı ki sonuç gürültü olmasın ve bu raporu kim okuyacak? Bu yazı o boşluğu dolduruyor — ve denetimlerin neden bu kadar sık tiyatroya dönüştüğünü de anlatıyor.

## Zorunlu denetimler işe yarıyor mu? Elimizdeki en iyi kanıt

Denetimi mevzuatla zorunlu kılmak mantıklı görünür. Peki uygulamada ne oluyor? Bu sorunun elimizdeki en somut cevabı New York'tan geliyor. Şehrin otomatik işe alım araçlarına ilişkin düzenlemesi 5 Temmuz 2023'ten itibaren uygulanmaya başladı ve işverenlere yıllık bağımsız önyargı denetimi ile denetim sonuçlarını yayımlama yükümlülüğü getirdi.

Cornell'den araştırmacıların yaptığı bir inceleme, yaklaşık 400 işveren arasında yalnızca **18 önyargı denetimi ve 11 şeffaflık bildirimi** bulabildi ([kaynak](https://news.cornell.edu/media-relations/tip-sheets/new-analysis-finds-few-companies-following-nyc-ai-hiring-law)). Yani yükümlülük var, uygulama neredeyse yok.

> Bir denetim yükümlülüğü, kimin denetleneceğini tanımlamıyorsa ve denetimsizliğin bir bedeli yoksa, gönüllü bir raporlama rejimine dönüşür. Gönüllü rejimlerde de yalnızca zaten iyi olanlar raporlar.

Düzenleme tarafındaki yön de tek yönlü değil. Colorado, eyalet yapay zekâ kanununu yürürlükten kaldırıp yerine yenisini koydu: 14 Mayıs 2026'da imzalanan ve 1 Ocak 2027'de yürürlüğe girecek düzenleme, etki değerlendirmesi yükümlülüğünü kaldırıyor ve icrayı yalnızca başsavcılığa bırakıyor ([SB 26-189](https://leg.colorado.gov/bills/SB26-189)). Kısacası: denetimi mevzuat yaptırmıyor. Denetimi siz yaparsınız, çünkü modelin nerede bozulduğunu başka türlü öğrenemezsiniz.

## İlk engel: korumalı özniteliği tutamıyorsanız

Adalet denetiminin en yaygın gerekçeli reddi şu cümledir: “Etnik köken, din veya sağlık verisi tutmuyoruz; dolayısıyla alt grup analizi yapamayız.” Bu cümle iyi niyetlidir ve çoğu zaman hukuken de doğrudur — ama tam bir cevap değildir.

AB Yapay Zekâ Yasası'nın 10. maddesi, _özellikle önyargı tespiti ve düzeltilmesi amacıyla_ özel nitelikli kişisel verilerin işlenmesine dar ve koşullu bir kapı açar. Koşullar sıkıdır ve hepsi birlikte sağlanmalıdır: başka yollarla etkili biçimde yapılamıyor olması, sıkı teknik sınırlamalar ve erişim kontrolleri, verinin başkalarına aktarılmaması, amaç sona erdiğinde silinmesi ve belgeleme ([Madde 10](https://artificialintelligenceact.eu/article/10/)).

### Öznitelik olmadan yapabilecekleriniz

-   **Vekil değişken kullanmayın, ama vekil _etkiyi_ ölçün.** Posta kodu üzerinden etnik köken tahmin etmek hem hukuken hem istatistiksel olarak kötü bir fikirdir. Buna karşılık modelin posta koduna ne kadar dayandığını ölçmek meşru ve öğreticidir.
-   **Gönüllü ve ayrıştırılmış toplama.** Bazı kuruluşlar, ürün veri tabanından ayrı tutulan ve yalnızca denetim için erişilen gönüllü demografi verisi toplar.
-   **Toplulaştırılmış dış kaynak.** Bireysel etiket olmadan, bölge düzeyinde toplulaştırılmış resmi istatistiklerle karşılaştırma yapılabilir; bu bireysel çıkarım yapmaz ama sistematik sapmayı görünür kılar.
-   **Performans farkı yerine kapsam farkı.** Hangi girdi türlerinde model daha sık “emin değilim” diyor? Bu, korumalı öznitelik gerektirmeden eşitsizliğin izini sürmenin bir yoludur.

<div class="callout"><strong>İpucu:</strong> Denetim verisini ürün veri tabanından fiziksel olarak ayırın ve erişimi loglayın. “Adalet denetimi için topladık” gerekçesi, veri aynı tabloda pazarlama ekibinin de eriştiği bir alan olarak durduğunda çöker.</div>

## Ölçüt seçimi: hepsini birden sağlayamazsınız

Adalet ölçütleri birbiriyle çelişir ve bu bir uygulama hatası değil, matematiksel bir sonuçtur. Taban oranlar gruplar arasında farklıysa ve model mükemmel değilse, yaygın ölçütlerin tamamını aynı anda sağlayamazsınız. Kavramsal arka planı [önyargı ve adalet](/posts/onyargi-ve-adalet/) yazısında ele almıştık; burada seçim kuralına odaklanıyoruz.

-   **Demografik eşitlik:** pozitif karar oranı gruplar arasında eşit olmalı. Kaynak dağıtımı problemlerinde (burs, ilan gösterimi) makuldür; teşhis problemlerinde saçmadır.
-   **Eşitlenmiş olasılıklar / fırsat eşitliği:** gerçek pozitif (ve gerekiyorsa yanlış pozitif) oranları eşit olmalı. Hata maliyeti asimetrikse doğru tercihtir: işe alım elemesinde yanlış negatif, adayın hiç görülmemesi demektir.
-   **Kalibrasyon eşitliği:** aynı skor her grupta aynı gerçek olasılığa karşılık gelmeli. Skoru bir insan yorumlayacaksa bu vazgeçilmezdir; ayrıntısı [model kalibrasyonu](/posts/model-kalibrasyonu/) yazısında.

Seçim kuralı basit ve tek cümlelik: **hangi hatanın kime, ne kadar zarar verdiğine bakın.** Ölçütü matematiksel zarafetine göre değil, zarar mekanizmasına göre seçin ve seçiminizi gerekçesiyle yazın. Yazılmamış bir ölçüt seçimi, sonuç hoşunuza gitmediğinde sessizce değiştirilir — denetimi tiyatroya çeviren tam olarak budur.

> Denetimin dürüstlüğü, ölçütün ne zaman seçildiğiyle ölçülür. Sonuçlara bakmadan önce seçilen ölçüt bir taahhüttür; sonrasında seçilen ölçüt bir savunmadır.

## Alt grup büyüklüğü: ölçtüğünüz şey gürültü olabilir

Denetim raporlarının en sık görülen teknik hatası, küçük alt gruplardaki farkları gerçek fark sanmaktır. 40 kişilik bir alt grupta doğruluk %72 çıktığında, bu sayının etrafındaki belirsizlik o kadar geniştir ki genel ortalamayla arasındaki fark rahatlıkla tesadüf olabilir.

Pratik disiplin şu:

-   **Her alt grup için güven aralığı verin.** Noktasal değer değil, aralık. Yöntem için [güven aralığı ve bootstrap](/posts/model-karsilastirma-istatistik/).
-   **Çoklu karşılaştırmayı hesaba katın.** On iki alt grup incelediğinizde, hiçbir gerçek fark yokken bile en az birinin “anlamlı” çıkması beklenir.
-   **Örneklem yetersizse bunu yazın.** “Bu alt grup için elimizdeki veri sonuç çıkarmaya yetmiyor” meşru ve dürüst bir bulgudur; uydurma bir sayıdan iyidir.
-   **Nadir sınıflara dikkat.** Alt grup küçüldükçe pozitif örnek sayısı da düşer ve metrikler kararsızlaşır; bu sorunun mekaniği [sınıf dengesizliği](/posts/sinif-dengesizligi/) yazısında.

```text
# Bir denetim döngüsünün iskeleti (pseudocode)
for grup in korumali_gruplar:
    n = len(test_seti[grup])
    if n < MIN_ORNEK or pozitif_sayisi(grup) < MIN_POZITIF:
        rapor_et(grup, durum="yetersiz veri")   # uydurma, yaz
        continue
    metrik   = secilen_olcut(model, test_seti[grup])
    aralik   = bootstrap_guven_araligi(metrik, n_yineleme=2000)
    rapor_et(grup, metrik, aralik, n)
# Karşılaştırmayı gruplar arası FARK üzerinde yapın;
# iki ayrı aralığın çakışıp çakışmadığına bakmak yanıltıcıdır.
```

## Denetimler neden tiyatroya dönüşür?

Kötü niyet gerekmez; yapısal olarak buraya kayar. Dört tipik mekanizma:

-   **Kapsam daraltma.** Denetim, modelin en riskli kullanıldığı yeri değil, verinin en temiz olduğu yeri kapsar. Kapsam kararı denetimden önce ve denetlenen taraftan bağımsız verilmelidir.
-   **Ölçüt alışverişi.** Ölçüt sonuçlara göre seçilir. Panzehiri, ölçütü ve eşiği önceden yazıp sürümlemektir.
-   **Anlık fotoğraf.** Denetim tek seferlik yapılır, model ise sürekli değişir. Modelin sahada bozulmasını [izleme ve veri kayması](/posts/model-izleme-drift/) disiplini yakalar; adalet metrikleri de izlenen metrikler arasında olmalıdır.
-   **Kimsenin okumadığı rapor.** Bulguya bağlı bir eylem yoksa denetim bir belge üretme faaliyetidir. Her bulgu için bir sahip ve bir tarih yazın.

<div class="callout"><strong>İpucu:</strong> Denetim raporunu <a href="/posts/model-kartlari-yonetisim/">model kartına</a> ekleyin ve sürümleyin. Ayrı yaşayan bir denetim raporu, bir sonraki model sürümünde geçersiz hâle gelir ve kimse fark etmez.</div>

## Bir denetim protokolü

Sıralı, tekrarlanabilir ve savunulabilir bir protokol:

-   **1\. Kapsamı yazın.** Hangi model sürümü, hangi karar, hangi kullanıcı kitlesi, hangi zaman aralığı.
-   **2\. Zarar mekanizmasını adlandırın.** Yanlış pozitif mi zarar veriyor, yanlış negatif mi? Kime?
-   **3\. Ölçütü ve eşiği önceden seçin.** Gerekçesiyle birlikte, sonuçlara bakmadan.
-   **4\. Grupları ve minimum örneklem eşiğini tanımlayın.** Kesişimsel grupları da (örneğin yaş × cinsiyet) baştan listeleyin; sonradan eklenen grup, arama yapmaya benzer.
-   **5\. Ölçün ve aralık verin.** Farkı ve farkın aralığını raporlayın.
-   **6\. Nedenini arayın.** Fark, temsil eksikliğinden mi, etiket gürültüsünden mi, özellik seçiminden mi geliyor? [Veri merkezli yaklaşım](/posts/veri-merkezli-yapay-zeka/) burada en verimli araç.
-   **7\. Eylem ve sahip yazın.** Her bulgunun bir sorumlusu ve bir tarihi olmalı.
-   **8\. Tekrar tarihini belirleyin.** Denetim bir olay değil, bir ritimdir.

Ve son bir uyarı: adalet metriklerini iyileştirmek ile modeli daha adil yapmak aynı şey değildir. Bir eşiği grup başına ayarlayarak metriği düzeltebilirsiniz; bunun hukuken ve etik olarak kabul edilebilir olup olmadığı ayrı bir sorudur ve bu soruyu mühendislik tek başına cevaplayamaz. Bu yüzden protokolün ilk maddesi kapsam, sonuncusu tekrar; ortadaki her şey ise yazılı gerekçe.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Zorunlu denetim, uygulaması izlenmediğinde gönüllü rejime dönüşür; New York örneğinde 400 işveren arasında 18 denetim bulundu.</li><li>AB Yasası Madde 10, sıkı koşullarla, önyargı tespiti amacıyla özel nitelikli veri işlemeye dar bir kapı açar.</li><li>Adalet ölçütleri matematiksel olarak çelişir; ölçütü zarar mekanizmasına göre seçin ve seçimi sonuçlara bakmadan önce yazın.</li><li>Küçük alt gruplarda ölçtüğünüz şey çoğu zaman varyanstır; her gruba güven aralığı verin ve yetersiz örneklemi dürüstçe raporlayın.</li><li>Denetim bir olay değil ritimdir; raporu model kartına iliştirip sürümleyin, her bulguya sahip ve tarih yazın.</li></ul></div>

<div class="faq"><details><summary>Korumalı öznitelik verisi tutmuyoruz. Denetim yapamaz mıyız?</summary><p>Yapabilirsiniz ama daha zayıf bir denetim olur. AB Yasası Madde 10, yalnızca önyargı tespiti amacıyla ve sıkı koşullarla özel nitelikli veri işlemeye izin verir. Bu yola girmiyorsanız gönüllü ve ayrıştırılmış toplama, toplulaştırılmış dış kaynaklarla karşılaştırma ve kapsam farkı analizi gibi ikinci en iyi yöntemler kalır.</p></details><details><summary>Hangi adalet ölçütünü seçmeliyim?</summary><p>Zarar mekanizmasına bakın. Kaynak dağıtıyorsanız demografik eşitlik, eleme yapıyorsanız fırsat eşitliği, skoru bir insan yorumlayacaksa kalibrasyon eşitliği genellikle doğru tercihtir. Hepsini birden sağlayamazsınız; önemli olan seçimi gerekçesiyle ve sonuçlara bakmadan önce yazmaktır.</p></details><details><summary>Denetimi bağımsız bir tarafın yapması şart mı?</summary><p>Mevzuat gerektirmiyorsa şart değil, ama kapsam kararının denetlenen taraftan bağımsız verilmesi neredeyse şarttır. Denetimlerin tiyatroya dönüşmesinin en yaygın sebebi kötü ölçüm değil, kapsamın en temiz veriye göre çizilmesidir.</p></details></div>

---

Özetle: adalet denetimi, doğru yapıldığında bir uyum belgesi değil bir hata bulma aracıdır. Modelin nerede, kim için ve ne kadar bozulduğunu söyler. Bu bilgiyi isteyen ekip denetimden korkmaz; korkan ekip için ise denetim zaten baştan tiyatrodur.
