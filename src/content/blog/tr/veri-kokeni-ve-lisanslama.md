---
title: "Veri Kökeni ve Eğitim Verisi Lisanslama: Veri Setinizin Nereden Geldiğini Kanıtlayabiliyor musunuz?"
description: "Eğitim verisinin kökenini boru hattı boyunca nasıl kaydedersiniz? Robots.txt kısıtlarının hızla artması, GPAI eğitim verisi özeti şablonu, IETF çalışmalarının durumu ve 2025-2026 telif kararlarının mühendislik açısından anlamı."
publishDate: "2026-08-13T23:21:00+03:00"
lang: tr
category: "Veri"
tags: ["Veri", "Yapay Zeka"]
translation: "data-provenance-training-data-licensing"
heroImage:
  src: "../../../assets/blog/covers/veri-kokeni-ve-lisanslama.jpg"
  alt: "Veri Kökeni ve Eğitim Verisi Lisanslama: Veri Setinizin Nereden Geldiğini Kanıtlayabiliyor musunuz?"
---

Bir modeli eğittiğiniz veri kümesinin her parçasının nereden geldiğini, hangi izinle alındığını ve hangi işlemlerden geçtiğini bugün kanıtlayabiliyor musunuz? Çoğu ekibin dürüst cevabı hayır. Oysa bu soru artık akademik değil: hem mevzuat hem mahkemeler hem de veri sahiplerinin kendisi bu cevabı istiyor. Bu yazı hukuk haberi değil; kökeni bir _boru hattı boyunca_ nasıl kaydedeceğinizi anlatan mühendislik yazısı.

## Köken neden birdenbire zorlaştı?

Beş yıl önce “internetten topladık” cevabı çoğu bağlamda yeterliydi. Bugün değil, çünkü iki şey aynı anda değişti: veri sahipleri kapıyı kapatmaya başladı ve veriyi kullananlardan hesap sorulmaya başlandı.

Birincisi ölçülebilir hâle geldi. Veri Kökeni Girişimi'nin (Data Provenance Initiative) _Consent in Crisis_ çalışması, Nisan 2023 ile Nisan 2024 arasında en kritik eğitim alanlarındaki **tokenlerin yüzde 25'inden fazlasının robots.txt ile kısıtlanır hâle geldiğini**, en çok kullanılan alan adlarında kısıtlama oranının **%3'ün altından yaklaşık %28'e çıktığını** ölçtü ([rapor](https://www.dataprovenance.org/Consent_in_Crisis.pdf)). Bu tek yıllık bir sıçrama ve yönü belli.

> Web'in “varsayılan olarak açık” olduğu dönem sona ermedi ama daralıyor. Verinizin kökenini bugün kaydetmiyorsanız, iki yıl sonra hangi parçayı hangi izinle aldığınızı yeniden kuramayacaksınız.

İkincisi ise standartlaşma tarafındaki boşluk. Tarayıcılara yönelik yapay zekâ tercihlerini ifade etmek için IETF bünyesinde bir çalışma grubu var, ancak **henüz yayımlanmış bir RFC yok**; çalışma taslak aşamasında ilerliyor ([belgeler](https://datatracker.ietf.org/wg/aipref/documents/)). Yani ortak bir makine okunur izin sözlüğü henüz yerleşmedi; herkes robots.txt'i, kullanım şartlarını ve özel anlaşmaları karışık biçimde kullanıyor.

## Mevzuat tarafı: eğitim verisi özeti

AB tarafında genel amaçlı yapay zekâ modeli (GPAI) sağlayıcıları için somut bir yükümlülük var: eğitim verisinin yeterince ayrıntılı bir özetini kamuya açıklamak. Bu özetin biçimi serbest bırakılmadı; **AI Office 24 Temmuz 2025'te bir şablon yayımladı** ve Komisyon bunu kamuya açıklama için asgari bir taban olarak tanımlıyor.

Yüksek riskli sistemler tarafında ise yükümlülük daha derin. Madde 10, veri toplama süreçlerinin ve verinin kökeninin belgelenmesini isteyen sekiz yönetişim pratiğinden birini bu başlığa ayırıyor ([Madde 10](https://artificialintelligenceact.eu/article/10/)). Yani köken kaydı, iyi bir alışkanlık olmaktan çıkıp bir teslim kalemi hâline geldi.

<div class="callout"><strong>İpucu:</strong> Eğitim verisi özetini yayımlama anında yazmaya kalkmayın. Özet, veri kümesi manifestinden <em>üretilebilir</em> bir çıktı olmalı. Manifest yoksa özet bir tahmin yazısına dönüşür ve tahmin yazısı, kamuya açıklanan bir belge olduğunda ciddi bir risktir.</div>

Ne belgeleyeceğiniz konusunda şablon arayan ekipler için doğrudan yol, veri seti künyesi disiplinidir; ayrıntısını [veri seti belgelendirme](/posts/veri-seti-belgelendirme/) yazısında ele alıyoruz.

## Mahkemeler zıt yönlere karar verdi

2025-2026 döneminde iki büyük dosya, birbirine zıt yönlerde sonuçlandı ve bu zıtlık tam olarak neden tek bir “yapay zekâ ve telif kuralı” beklemenin yanlış olduğunu gösteriyor.

-   **Bartz v. Anthropic:** yaklaşık 482.460 esere ilişkin **1,5 milyar dolarlık uzlaşma 20 Temmuz 2026'da nihai onay aldı**; eser başına yaklaşık 3.000-3.100 dolara karşılık geliyor ([haber](https://apnews.com/article/ai-anthropic-copyright-settlement-claude-books-bartz-74b140444023898aeba8579b6e9f0d63)).
-   **Getty Images v. Stability AI:** İngiltere'de 4 Kasım 2025 tarihli kararla iddiaların büyük kısmı reddedildi; ikincil telif ihlali bulunmadı ([karar](https://www.judiciary.uk/judgments/getty-images-v-stability-ai/)).

Bu iki sonucu birlikte okumanın mühendislik açısından tek doğru yolu var: **hukuki sonuç, verinin nasıl elde edildiğine ve ne kadarının nerede saklandığına bağlı olarak değişiyor.** Yani belirsizliğin yönetimi hukuk departmanına devredilebilecek bir şey değil; kaydı tutan taraf mühendislik.

> Farklı ülkelerde farklı sonuçlar çıkması, kuralın belirsiz olduğunu değil, olguların belirleyici olduğunu gösteriyor. Olguları kaydeden taraf ise sizsiniz.

## Kökeni boru hattı boyunca taşımak

Asıl mühendislik sorusu şu: köken bilgisi, ham veriden eğitim kümesine giden yolda nasıl kaybolmadan taşınır? Çünkü kaybolduğu yer neredeyse her zaman aynı: birleştirme ve temizleme adımları.

### Üç katmanlı kayıt

-   **Kaynak kaydı:** her kaynak için alan adı veya sağlayıcı, erişim tarihi, erişim yöntemi, geçerli lisans/kullanım şartları ve o tarihteki robots.txt durumu. Robots.txt zamanla değişir; _erişim anındaki hâli_ kayda geçmelidir.
-   **Belge kaydı:** her belge için kaynak kimliği, içerik özeti (hash), alınma tarihi ve varsa yayın tarihi. Özet, aynı belgenin farklı kaynaklardan ikinci kez gelmesini de yakalar.
-   **Dönüşüm kaydı:** hangi filtre, hangi sürümüyle, hangi belgeleri eledi. Bu katman en çok atlanan ve en çok işe yarayan katmandır: bir yıl sonra “bu belge neden veri setinde yok?” sorusunun cevabı buradadır.

```text
# Kaynaktan eğitim kümesine köken zinciri (pseudocode)
for belge in ham_havuz:
    kayit = {
      "belge_id":     hash(belge.icerik),
      "kaynak_id":    belge.kaynak,
      "alinma":       belge.alinma_tarihi,
      "lisans":       kaynak_kaydi[belge.kaynak]["lisans"],
      "robots":       kaynak_kaydi[belge.kaynak]["robots_o_tarihte"],
      "filtreler":    []                       # aşağıda dolacak
    }
    for f in FILTRELER:                          # her filtre sürümlü
        if not f.gecer(belge):
            kayit["filtreler"].append((f.ad, f.surum, "eledi"))
            koken_yaz(kayit); break
        kayit["filtreler"].append((f.ad, f.surum, "gecti"))
    else:
        egitim_kumesine_ekle(belge, kayit)
        koken_yaz(kayit)
# Kural: köken kaydı, belgeyle birlikte değil, belgeden BAĞIMSIZ yazılır.
# Elenen belgenin de kaydı kalmalı; yoksa "neden yok?" sorusu cevapsızdır.
```

<div class="callout"><strong>İpucu:</strong> Köken kaydını veri kümesinin içine gömmeyin, yanına yazın. Veri kümesi yeniden örneklendiğinde, karıştırıldığında veya parçalara bölündüğünde gömülü üstveri kaybolur; ayrı tutulan ve belge özetiyle eşleşen bir kayıt kaybolmaz.</div>

## Lisans uyumluluğu: karışık havuzun matematiği

Farklı lisanslara sahip kaynakları tek bir havuzda birleştirdiğinizde, çıkan kümenin lisans durumu en kısıtlayıcı bileşene göre belirlenir. Bu, yazılım bağımlılıklarındaki lisans uyumluluğu problemiyle aynıdır ve aynı disiplinle çözülür.

-   **Havuzu lisansa göre bölümleyin.** Ticari kullanıma açık, yalnızca araştırma, atıf zorunlu, pay-benzeri (share-alike) ve belirsiz. Beşinci kategori en tehlikelisidir ve genellikle en büyüğüdür.
-   **Belirsizi ayrı tutun.** “Lisansı bilmiyoruz” ile “lisansı serbest” arasındaki farkı veri kümesinde teknik olarak görünür kılın.
-   **Türetilmiş veriyi de etiketleyin.** Bir kaynaktan üretilen sentetik veri, kaynağın kısıtlarını taşıyabilir. [Sentetik veri](/posts/sentetik-veri/) yazısındaki üretim döngüsüne köken alanı ekleyin.
-   **Kaldırma yolunu baştan kurun.** Bir kaynağın kaldırılması gerektiğinde hangi eğitim çalıştırmalarının etkilendiğini sorgulayabilmelisiniz. Bunun neden sadece veriyi silmekle bitmediği için [makine unutması](/posts/makine-unutma/) yazısına bakın.

Bu bölümlemenin yan faydası şudur: lisans bölümleri, veri kalitesi analizinin de doğal eksenidir. Belirli bir kaynaktan gelen verinin etiket gürültüsü daha yüksekse, bunu ancak kaynak bazında bakabildiğinizde görürsünüz. [Veri kalitesi ve etiketleme](/posts/veri-kalitesi-etiketleme/) disiplini burada doğrudan işe yarıyor.

## Kendi alanınızda köken: dar veri, derin sorumluluk

Web ölçeğinde çalışmayan ekipler için tablo farklı ama daha kolay değil. Kurumsal ve alana özgü veri kümelerinde kaynak sayısı azdır, buna karşılık her kaynağın sözleşmesel kısıtları çok daha nettir ve ihlalin karşı tarafı bellidir.

Türkçe hukuk metinleriyle çalışan bir ekip olarak bunu ürün tarafında yaşıyoruz: kamuya açık bir kaynağın “erişilebilir” olması, her kullanım biçimi için serbest olduğu anlamına gelmiyor; ve bir metnin işlenmiş hâli, ham hâlinden farklı bir sorumluluk doğurabiliyor. Bu tür alanlarda köken kaydı yalnızca hukuki bir gereklilik değil, aynı zamanda kalite aracıdır — hangi kaynağın hangi hatayı ürettiğini kaynak etiketi olmadan bulamazsınız.

-   **Sözleşmeyi veri kümesine bağlayın.** Her kaynak kaydında, o kaynağın hangi sözleşme veya izinle alındığı yazılı olsun.
-   **Kullanım kapsamını kaydedin.** “Eğitim için serbest, yeniden dağıtım için değil” gibi kısıtlar, kayıtta bir alan olmalı; bir e-postada değil.
-   **Sürüm dondurun.** Bir eğitim çalıştırması, veri kümesinin belirli bir sürümünü kullanmalı ve o sürüm değişmez olmalı. Aksi hâlde [veri merkezli](/posts/veri-merkezli-yapay-zeka/) iyileştirme döngüsünde neyin işe yaradığını da ölçemezsiniz.

Köken kaydının en az takdir edilen faydası burada ortaya çıkıyor: hukuki bir savunma aracı olarak başlıyor, bir hata ayıklama aracı olarak kalıyor.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Consent in Crisis, bir yıl içinde en kritik eğitim alanlarındaki tokenlerin dörtte birinden fazlasının robots.txt ile kısıtlandığını ölçtü.</li><li>Yapay zekâ tercihleri için ortak bir makine okunur sözlük henüz yok; IETF çalışması taslak aşamasında ve yayımlanmış bir RFC bulunmuyor.</li><li>AI Office'in 24 Temmuz 2025 tarihli eğitim verisi özeti şablonu, kamuya açıklama için asgari bir taban tanımlıyor.</li><li>Bartz ve Getty davalarının zıt sonuçları, hukuki sonucun verinin nasıl elde edildiğine bağlı olduğunu gösteriyor.</li><li>Kökeni üç katmanda kaydedin: kaynak, belge ve dönüşüm; elenen belgenin kaydı da kalmalı.</li></ul></div>

<div class="faq"><details><summary>Robots.txt hukuken bağlayıcı mı?</summary><p>Robots.txt teknik bir tercih bildirimidir ve tek başına bir lisans veya sözleşme değildir; hukuki etkisi ülkeye ve somut olaya göre değişir. Mühendislik açısından doğru yaklaşım, bunu hukuki bir soru olarak değil bir kayıt sorunu olarak ele almak: erişim anındaki hâlini kaydedin ki hangi kararı hangi bilgiyle verdiğinizi sonradan gösterebilesiniz.</p></details><details><summary>Zaten toplanmış eski bir veri kümesinin kökenini nasıl çıkarırız?</summary><p>Tamamını geriye dönük çıkaramazsınız ve bunu dürüstçe kabul etmek en iyisidir. Yapılabilecek olan, belge özetleri üzerinden kaynak eşleştirmesi denemek, çıkarılabilenleri kaydetmek ve geri kalanını belirsiz olarak işaretlemektir. Belirsiz bölümü ayrı tutmak, tamamını serbest saymaktan çok daha savunulabilir bir konumdur.</p></details><details><summary>Sentetik veri köken sorununu çözer mi?</summary><p>Kısmen ve dikkatli kullanıldığında. Bir modelden üretilen sentetik veri, o modelin eğitildiği verinin kısıtlarını taşıyabilir; ayrıca sentetik verinin kendi kalite ve çeşitlilik riskleri vardır. Kökeni ortadan kaldırmaz, bir katman daha ekler; o katmanı da kaydetmeniz gerekir.</p></details></div>

---

Özetle: veri kökeni, hukuk ekibinin değil veri ekibinin işi. Kaydı tutmayan ekip, bir gün sorulduğunda cevap veremez; kaydı tutan ekip ise hem soruya cevap verir hem de kendi hata kaynaklarını çok daha hızlı bulur. Bu iki fayda aynı yatırımdan çıkıyor.
