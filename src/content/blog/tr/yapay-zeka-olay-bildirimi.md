---
title: "Yapay Zekâ Olay Bildirimi ve Piyasaya Arz Sonrası İzleme: 15 Gün, 10 Gün, 2 Gün"
description: "Ciddi olay bildirimi süreleri 15 gün, ölüm hâlinde 10 gün, yaygın ihlalde 2 gündür. Bu süreleri karşılayabilmek için bir ML ekibinin kurması gereken kayıt altyapısını, ciddiyet sınıflandırmasını ve nöbet akışını anlatıyoruz."
publishDate: "2026-08-13T23:22:00+03:00"
lang: tr
category: "Üretim"
tags: ["Üretim", "Yapay Zeka"]
translation: "ai-incident-reporting-post-market"
heroImage:
  src: "../../../assets/blog/bimg-08.jpg"
  alt: "Yapay Zekâ Olay Bildirimi ve Piyasaya Arz Sonrası İzleme: 15 Gün, 10 Gün, 2 Gün"
---

Bir modelin sahada bozulduğunu fark ettiğinizde geriye kaç gününüz kaldığını biliyor musunuz? AB Yapay Zekâ Yasası ciddi olaylar için net süreler tanımlıyor: kural olarak 15 gün, ölüm hâlinde 10 gün, yaygın bir ihlal söz konusuysa 2 gün. Bu yazının tezi basit: **bu süreler bir hukuk sorunu değil, bir mühendislik sorunu.** Kaydı olmayan bir ekip için 15 gün, bildirim süresi değil arkeoloji süresidir.

## Ciddi olay nedir ve saat ne zaman başlar?

Tüzük “ciddi olay” kavramını tanımlar ve bunlar sıradan hatalar değildir: bir kişinin ölümü veya sağlığının ciddi biçimde zarar görmesi; kritik altyapının işletiminde ciddi ve geri döndürülemez bir aksama; temel hakların korunmasına yönelik yükümlülüklerin ihlali; ve mala veya çevreye ciddi zarar.

Bildirim süreleri şöyle ([Madde 73](https://artificialintelligenceact.eu/article/73/)):

-   **Kural: 15 gün.** Sağlayıcı, olay ile sistem arasındaki nedensel bağı veya böyle bir bağın makul ihtimalini tespit ettikten sonra gecikmeksizin, her hâlde 15 gün içinde bildirir.
-   **Yaygın ihlal veya kritik altyapı: 2 gün.** Yaygın bir ihlal ya da kritik altyapının işletiminde ciddi ve geri döndürülemez bir aksama söz konusuysa süre iki güne iner.
-   **Ölüm: 10 gün.** Bir kişinin ölümü hâlinde, olayın öğrenilmesinden itibaren 10 gün.
-   Eksiksiz bilgi beklenmez: tam rapor mümkün değilse önce eksik bir ilk bildirim yapılır, ardından tamamlanır. Piyasa gözetim otoritesinin de 7 gün içinde harekete geçmesi öngörülür.

<div class="callout"><strong>İpucu:</strong> Saatin başlangıcı, olayın <em>gerçekleştiği</em> an değil; nedensel bağın ya da makul ihtimalinin <em>tespit edildiği</em> andır. Bu, tespit yeteneğinizi doğrudan hukuki riske çevirir: geç fark etmek saati geciktirmez, sadece elinizdeki hazırlık süresini kısaltır ve “neden bu kadar geç fark ettiniz?” sorusunu doğurur.</div>

Önemli bir not: bu yükümlülük Ek III yüksek riskli sistemler için diğer yükümlülüklerle birlikte 2 Aralık 2027'de uygulanmaya başlıyor. Yani hazırlık için gerçek bir pencere var; ayrıntı için [yeni takvim yazısı](/posts/yapay-zeka-yasasi-yeni-takvim/).

## Madde 72: izleme planı bir belge değil, bir sistem

Bildirim yükümlülüğünün öncesinde bir başka yükümlülük duruyor: piyasaya arz sonrası izleme planı. Sağlayıcı, sistemin yaşam döngüsü boyunca performansını sistematik olarak toplamalı, belgelemeli ve analiz etmelidir.

Buradaki incelik şu: bir izleme planı, ancak _bozulmayı zamanında gösterebiliyorsa_ plandır. Etiketleri 90 gün sonra gelen bir modelde, yalnızca etiketlere dayanan bir izleme kurgusu tanım gereği 90 gün geç kalır. Bu yüzden izleme planının etiketten bağımsız sinyaller içermesi gerekir:

-   **Girdi tarafı:** veri kalitesi ihlalleri, şema değişiklikleri, boş değer oranı sıçramaları, [veri kayması](/posts/model-izleme-drift/) ve metinsel/gömme verilerde [embedding kayması](/posts/gomme-kaymasi-izleme/).
-   **Çıktı tarafı:** skor dağılımı kayması, eşik üstü karar oranı, güven dağılımının basıklaşması.
-   **Etiketsiz performans tahmini:** etiket gelmeden performansın nereye gittiğini kestirmek; varsayımlarıyla birlikte [etiketsiz performans tahmini](/posts/etiketsiz-performans-tahmini/) yazısında.
-   **İnsan geri bildirimi:** operatör geçersiz kılma oranı. Bu, en ucuz ve en çok göz ardı edilen sinyaldir: insanlar modeli düzeltmeye başladıysa model bozulmuştur.
-   **Aykırı davranış:** [anomali tespiti](/posts/anomali-tespiti/) ile beklenmedik girdi ve çıktı örüntülerinin yakalanması.

> Bozulmayı yalnızca etiketler geldiğinde görebilen bir izleme planı, yangını ancak itfaiye geldiğinde fark eden bir alarm sistemidir.

## Ciddiyet sınıflandırması: SRE'den ödünç alınabilir mi?

Yazılım ekiplerinin çoğunda zaten bir olay ciddiyeti taksonomisi var: SEV1, SEV2, SEV3. Yapay zekâ olayları için bunu doğrudan kullanamazsınız, çünkü klasik taksonomi _kullanılabilirlik_ üzerine kuruludur. Bir model çökmez; yanlış cevap vermeye başlar ve sistem sağlıklı görünmeye devam eder.

ML için taksonomiyi iki eksen üzerine kurmak daha işlevseldir:

-   **Eksen 1 — zararın niteliği:** sağlık ve can güvenliği, temel haklar, mali kayıp, itibar, hizmet kalitesi.
-   **Eksen 2 — geri döndürülebilirlik:** karar geri alınabilir mi? Reddedilen bir başvuruyu yeniden değerlendirebilir misiniz, yoksa kişi çoktan başka bir yola mı yönlendi?

Bu iki eksen, mevzuatın süre kategorileriyle doğrudan eşleşir. Sağlık/can ekseninde ve geri döndürülemez tarafta olan bir olay, ekipte kimin telefonunun çalacağını da belirler.

<div class="callout"><strong>İpucu:</strong> Ciddiyet tanımını olay anında yazmayın. Her ciddiyet seviyesi için önceden şunu belirleyin: kime haber verilir, kaç dakikada, kimin geri alma yetkisi vardır ve hangi kayıtlar otomatik olarak dondurulur. Olay sırasında yazılan tanım, her zaman en düşük seviyeyi seçer.</div>

## Kayıt: bildirimin gerçek altyapısı

Bir olay bildirimi, olayın _ne olduğunu_ değil, _nasıl olduğunu_ anlatmak zorundadır: hangi sistem sürümü, hangi girdi sınıfı, kaç kişi etkilendi, ne zaman başladı, ne zaman durdu. Bu bilgilerin hiçbiri olay anında üretilemez; ya kayıtta vardır ya yoktur.

Bu yüzden Madde 12'nin istediği otomatik kayıt, aslında Madde 73'ün ön koşuludur. Minimum kayıt seti şöyle görünür:

```text
# Olay bildirimini mümkün kılan kayıt (pseudocode)
karar_kaydi = {
  "zaman":            utc_now(),
  "model_surumu":     MODEL_VERSION,     # eğitim çalıştırmasına izlenebilir
  "veri_seti_surumu": DATASET_VERSION,
  "esik":             AKTIF_ESIK,        # eşik değişimi de bir olaydır
  "girdi_sinifi":     kategori(girdi),   # kişisel veri değil, sınıf
  "cikti":            skor,
  "insan_karari":     operator,          # yok / onay / geçersiz kılma
}
# Olay anında sorulacak sorular ve kaydın cevaplaması gerekenler:
#   "ne zaman başladı?"      -> sürüm dağıtım zaman damgası
#   "kaç kişi etkilendi?"    -> tarih aralığında karar sayısı
#   "hangi girdilerde?"      -> girdi sınıfı bazında hata oranı
#   "geri alabilir miyiz?"   -> önceki sürüme dönüş süresi
```

Dikkat edilmesi gereken bir denge var: kayıt, olayı yeniden kurmaya yetecek kadar ayrıntılı, ama gereksiz kişisel veri biriktirmeyecek kadar temkinli olmalı. Ham girdiyi saklamak yerine sınıf ve özet tutmak çoğu durumda hem yeterli hem daha güvenlidir. Bu dengenin gizlilik tarafı için [gizlilik korumalı öğrenme](/posts/gizlilik-korumali-ogrenme/) yazısına bakabilirsiniz.

## Olay akışı: modelden insana giden yol

Bir ML olay müdahale akışı, klasik bir SRE akışından üç noktada ayrılır. Bu üç fark, hazırlıksız ekipleri en çok zorlayan yerlerdir.

### Fark 1: tespit gecikmeli

Sunucu çökerse alarm saniyeler içinde çalar. Model yanlışlaşırsa alarm haftalar sonra, hatta bir müşteri şikâyetiyle çalar. Bu yüzden ML nöbetinde “sayfa” değil, _eşik aşımı incelemesi_ vardır: sinyal bir kişiyi uyandırmaz, bir incelemeyi tetikler.

### Fark 2: geri alma her zaman düzeltmez

Önceki model sürümüne dönmek çoğu zaman doğru ilk hamledir, ama sorun veriden geliyorsa eski model de aynı bozuk veriyi görecektir. Geri alma planı, model sürümü kadar veri hattı sürümünü de kapsamalıdır.

### Fark 3: etkilenen kişilerin tespiti geriye dönüktür

Bir yazılım hatasında etkilenen istekler bellidir. Bir model hatasında “etkilenen” tanımı karar eşiğine bağlıdır ve geriye dönük olarak yeniden hesaplanması gerekir. Bu hesabı yapabilmek, kararların ve eşiklerin kaydedilmiş olmasına bağlıdır — yine kayda dönüyoruz.

> Yazılım olayında “sistem çalışmıyor” dersiniz. Model olayında “sistem çalışıyordu ama yanlış çalışıyordu” demek zorundasınız. İkincisini kanıtlamak için kayıt şart.

## Bir hazırlık listesi

Aralık 2027'ye kadar kurulması gerekenler, önem sırasıyla:

-   **Karar kaydı.** Model sürümü, veri seti sürümü, eşik ve insan müdahalesi dâhil. Bu tek madde, listenin geri kalanının ön koşulu.
-   **Sürüm izlenebilirliği.** Üretimdeki bir modelden geriye doğru eğitim verisine yürüyebilmelisiniz. Bu, [model kartı](/posts/model-kartlari-yonetisim/) ve veri seti künyesi disiplinidir.
-   **Etiketten bağımsız izleme.** En az bir girdi sinyali, bir çıktı sinyali ve bir insan geri bildirimi sinyali.
-   **Ciddiyet taksonomisi.** Zararın niteliği ve geri döndürülebilirlik eksenleriyle, süre kategorilerine eşlenmiş.
-   **Nöbet ve yetki.** Kimin, hangi seviyede, kimin onayı olmadan sistemi durdurabileceği yazılı olmalı.
-   **Bildirim şablonu.** Boş bir sayfaya 15 gün içinde rapor yazmak yerine, doldurulacak alanları önceden belirleyin.
-   **Tatbikat.** Yılda bir kez kurgusal bir olay üzerinden akışı çalıştırın. Tatbikatı olmayan bir plan, plan değil niyettir.

Bu listenin tamamı, aslında [yüksek riskli sistem gereklilikleri](/posts/yuksek-riskli-yapay-zeka-gereklilikleri/) yazısındaki Madde 12 ve Madde 15 çıktılarının işletim tarafıdır. Belgeleri üretmekle bitmiyor; belgelerin arkasındaki sistemi de çalıştırmak gerekiyor.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Ciddi olay bildirimi kural olarak 15 gün, ölüm hâlinde 10 gün, yaygın ihlal veya kritik altyapı aksamasında 2 gündür.</li><li>Saat olayın gerçekleştiği anda değil, nedensel bağın tespit edildiği anda başlar; tespit yeteneği doğrudan hukuki risktir.</li><li>Yalnızca etiketlere dayanan bir izleme planı, etiketler geciktiğinde tanım gereği geç kalır.</li><li>Klasik SRE taksonomisi ML'e doğrudan uymaz: model çökmez, yanlışlaşır ve sistem sağlıklı görünmeye devam eder.</li><li>Bildirimin gerçek altyapısı karar kaydıdır; model sürümünden eğitim verisine yürüyemiyorsanız raporu yazamazsınız.</li></ul></div>

<div class="faq"><details><summary>Modelimiz yüksek riskli değil. Bu yükümlülük bizi bağlar mı?</summary><p>Madde 73 anlamındaki ciddi olay bildirimi yüksek riskli sistemlere yöneliktir. Ancak buradaki mühendislik pratiğinin tamamı — karar kaydı, sürüm izlenebilirliği, etiketten bağımsız izleme — risk sınıfından bağımsız olarak işe yarar. Kapsam dışı olmak, kaydı tutmamak için bir sebep değil.</p></details><details><summary>Olayın modelden kaynaklandığından emin değiliz. Yine de bildirmeli miyiz?</summary><p>Yükümlülük, nedensel bağın tespiti kadar makul ihtimalinin tespitini de kapsar. Eksiksiz bilgi beklenmesi de gerekmez: tam rapor mümkün değilse eksik bir ilk bildirim yapılıp sonradan tamamlanabilir. Kesinlik beklemek genellikle süreyi kaçırmanın en yaygın yoludur.</p></details><details><summary>Kayıtta ne kadar veri saklamalıyız?</summary><p>Olayı yeniden kurmaya yetecek kadar, gereksiz kişisel veri biriktirmeyecek kadar az. Pratikte ham girdi yerine girdi sınıfı ve özet saklamak, model sürümü, veri seti sürümü, eşik ve insan müdahalesiyle birlikte çoğu olayı yeniden kurmaya yeter.</p></details></div>

---

Özetle: bu yükümlülüğün zor kısmı raporu yazmak değil, raporu yazabilecek durumda olmak. Kayıt, sürüm izlenebilirliği ve etiketten bağımsız izleme kuran ekip için 15 gün fazlasıyla yeterlidir. Kurmayan ekip içinse 15 gün, hiçbir zaman yeterli olmayacak.
