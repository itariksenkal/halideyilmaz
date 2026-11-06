---
title: "Bir Makine Öğrenmesi Projesinin Yaşam Döngüsü"
description: "Problemi tanımlamaktan izlemeye: CRISP-DM aşamaları, başarı ölçütü, veri, basit başlangıç modeli, yineleme, canlıya alma ve ne zaman durmak gerektiği."
publishDate: "2026-12-01T09:17:00+03:00"
lang: tr
category: "Temeller"
tags: ["Makine Öğrenmesi", "CRISP-DM", "Proje Yönetimi"]
translation: "machine-learning-project-lifecycle"
heroImage:
  src: "../../../assets/blog/covers/makine-ogrenmesi-projesinin-yasam-dongusu.jpg"
  alt: "Problem tanımından izlemeye uzanan, döngü biçiminde bir makine öğrenmesi süreci şeması"
---

Makine öğrenmesi denince çoğumuzun aklına önce model gelir: hangi algoritma, kaç katman, hangi doğruluk oranı. Oysa gerçek projelerde model, işin yalnızca bir parçası. Bir projenin başarılı olup olmadığını çoğu zaman modeli kurmadan önce sorulan sorular ve canlıya aldıktan sonra yapılan takip belirler. Model değerlendirme üzerine çalışan biri olarak, sorunların büyük kısmının "yanlış model" değil "yanlış tanımlanmış problem" ya da "izlenmeyen veri" yüzünden çıktığını düşünüyorum. Bu yazıda bir makine öğrenmesi projesinin baştan sona yaşam döngüsünü, basit ve hayalî bir örnek üzerinden anlatacağım.

## Çerçeve: CRISP-DM

Bu süreç için en çok bilinen çerçevelerden biri **CRISP-DM** (Cross-Industry Standard Process for Data Mining). İlk sürümü 2000 yılında NCR, SPSS ve DaimlerChrysler'den uzmanların bulunduğu bir konsorsiyum tarafından yayımlandı. Aradan yıllar geçmesine rağmen hâlâ çok kullanılıyor, çünkü teknolojiden bağımsız, sade bir düşünme biçimi sunuyor. Altı aşamadan oluşuyor:

| Aşama | Temel soru |
|---|---|
| İşi anlamak (Business Understanding) | Hangi problemi, kimin için, neden çözüyoruz? |
| Veriyi anlamak (Data Understanding) | Elimizde hangi veri var, ne kadar güvenilir? |
| Veriyi hazırlamak (Data Preparation) | Veriyi modelin kullanabileceği hâle nasıl getiririz? |
| Modelleme (Modeling) | Hangi yaklaşımları deneyeceğiz? |
| Değerlendirme (Evaluation) | Sonuç, işin ihtiyacını gerçekten karşılıyor mu? |
| Canlıya alma (Deployment) | Model gerçek kullanıma nasıl girecek? |

Önemli bir nokta: Bu aşamalar düz bir çizgi değil, bir döngü. Uygulamada sık sık geri dönülür; değerlendirmede fark edilen bir sorun sizi veriye, hatta problemin tanımına geri götürebilir. CRISP-DM'in orijinal hâlinde açıkça yer almayan ama bugün vazgeçilmez kabul edilen bir adımı da ekleyeceğim: **izleme**.

Yazı boyunca şu hayalî örneği kullanalım: Orta ölçekli bir çevrim içi mağaza, müşteri destek e-postalarını otomatik olarak doğru ekibe (kargo, iade, ödeme, teknik sorun) yönlendirmek istiyor.

## 1. Problemi ve başarıyı tanımlamak

İlk soru "hangi modeli kullanalım?" değil, "neyi iyileştirmek istiyoruz?" olmalı. Örneğimizde gerçek hedef belki de müşterinin ilk yanıtı alma süresini kısaltmak. Otomatik yönlendirme bunun yalnızca bir yolu.

Bu aşamada iki tür ölçüt belirlemek gerekiyor:

- **İş ölçütü:** Örneğin ortalama ilk yanıt süresi ya da yanlış ekibe giden e-postaların oranı.
- **Model ölçütü:** Örneğin sınıflandırma doğruluğu ya da her ekip için ayrı ayrı kesinlik ve duyarlılık.

İkisinin birbirine bağlı olduğundan emin olmak gerekir. Model ölçütü yükselirken iş ölçütü yerinde sayıyorsa, yanlış şeyi optimize ediyor olabilirsiniz. Google'ın "Rules of Machine Learning" rehberinde de ilk kurallardan biri, modeli kurmadan önce ölçütleri tasarlamak. Aynı rehberin ilk kuralı da dikkat çekici: Makine öğrenmesi olmadan bir ürünü başlatmaktan çekinmeyin. Bazen birkaç basit kural, işin büyük kısmını çözer.

<div class="callout"><strong>İpucu:</strong> Projeye başlamadan önce "Bu model hangi kararı değiştirecek ve bu karar kimin elinde?" sorusunun cevabını tek cümleyle yazın. Yazamıyorsanız, problem henüz yeterince net değildir.</div>

## 2. Veriyi anlamak ve hazırlamak

Örneğimizde veri, geçmiş e-postalar ve bunların hangi ekip tarafından çözüldüğü bilgisi. İlk bakışta hazır etiketli bir veri gibi görünüyor, ama birkaç soru hemen beliriyor:

- E-postalar yanlış ekibe gidip sonra yönlendirilmişse, "doğru etiket" hangisi kabul ediliyor?
- Bazı kategoriler çok az örnek içeriyor mu? (Örneğin teknik sorunlar toplamın küçük bir kısmıysa model bu sınıfı ihmal edebilir.)
- Veride kişisel bilgiler var mı ve bunların işlenmesi için uygun bir dayanak var mı?
- Geçen yılın verisi bugünü temsil ediyor mu? Yeni bir ödeme yöntemi eklenmişse, onunla ilgili şikâyetler eski veride hiç yoktur.

Veri hazırlama genellikle projenin en çok zaman alan kısmıdır ve bu boşa harcanmış zaman değildir. Etiketlerin tutarlılığını kontrol etmek, tekrarlanan kayıtları temizlemek ve eğitim ile test verisini doğru biçimde ayırmak, sonraki her adımın güvenilirliğini belirler.

## 3. Basit bir başlangıç modeli (baseline)

Karmaşık bir modele geçmeden önce mutlaka bir **baseline** kurmak gerekir. Örneğimizde bu, "kargo", "iade", "fatura" gibi anahtar kelimelere bakan birkaç kural ya da basit bir metin sınıflandırıcı olabilir. Hatta daha da basiti: Her e-postayı en sık görülen kategoriye göndermek.

Baseline'ın iki işlevi var. Birincisi, daha gelişmiş bir modelin gerçekten fark yaratıp yaratmadığını ölçmenizi sağlar. İkincisi, veri akışını, değerlendirme düzenini ve altyapıyı erkenden kurmanızı sağlar. Aynı Google rehberi, ilk modeli basit tutmayı ve altyapıyı doğru kurmayı öneriyor.

## 4. Yineleme ve değerlendirme

Baseline'dan sonra daha güçlü yaklaşımlar denenir. Burada sık yapılan hata, test setine tekrar tekrar bakıp en iyi sonucu seçmektir. Bu, modelin test setine sessizce uyum sağlamasına yol açar. Daha sağlıklı yol, ayrı bir doğrulama seti ya da çapraz doğrulama kullanmak, test setini ise yalnızca sona saklamaktır.

Değerlendirme yalnızca tek bir sayıya bakmak da değildir. Örneğimizde şu sorular önemli:

- Model hangi kategorilerde daha çok hata yapıyor?
- Hatalar eşit maliyetli mi? Bir ödeme sorununun teknik ekibe gitmesi, bir kargo sorusunun iade ekibine gitmesinden daha mı zararlı?
- Model emin olmadığında ne olacak? Belirsiz e-postaları bir insana yönlendirmek çoğu zaman en akıllıca çözümdür.

## 5. Canlıya alma

Model iyi sonuç verdiğinde iş bitmiyor, aksine yeni bir aşama başlıyor. 2015'te yayımlanan "Hidden Technical Debt in Machine Learning Systems" makalesi, gerçek sistemlerde model kodunun küçük bir parça olduğunu; veri toplama, doğrulama, yapılandırma, sunum ve izleme gibi bileşenlerin çok daha büyük bir yük oluşturduğunu vurguluyordu.

Canlıya alırken akılda tutulacak birkaç pratik nokta:

- **Kademeli geçiş:** Model önce yalnızca öneri yapsın, kararı insan versin. Sonuçlar tatmin ediciyse otomatik yönlendirmeye geçilsin.
- **Geri dönüş planı:** Bir sorun çıktığında eski kurallara hızla dönebilmek gerekir.
- **Geri bildirim döngüsü:** Ekiplerin yanlış yönlendirmeleri kolayca işaretleyebilmesi, hem hataları yakalar hem de gelecekteki eğitim verisini iyileştirir.

## 6. İzleme ve ne zaman durmak gerektiği

Canlıdaki bir model zamanla bozulabilir, çünkü dünya değişir. Mağaza yeni bir ürün kategorisi açar, bir kampanya dönemi başlar, müşterilerin yazma biçimi değişir. Buna genel olarak **veri kayması** (data drift) deniyor. İzlemede bakılabilecek şeyler:

- Gelen verinin dağılımı eğitim verisine benziyor mu?
- Modelin emin olmadığı e-postaların oranı artıyor mu?
- İş ölçütü (ilk yanıt süresi) hâlâ iyileşiyor mu?

Peki ne zaman durmalı? Bence üç durumda: Modeldeki ek iyileştirmeler iş ölçütüne artık anlamlı bir katkı yapmıyorsa; bakım maliyeti sağladığı faydayı aşıyorsa; ya da problemin kendisi değiştiyse. Bir projeyi bilinçli olarak sonlandırmak, başarısızlık değil, iyi bir mühendislik kararıdır.

<div class="callout"><strong>Not:</strong> Bazı sektörlerde (sağlık, finans, işe alım gibi) model kararları insanların hayatını doğrudan etkiler. Bu alanlarda değerlendirme ve izleme, yasal ve etik yükümlülükleri de kapsayacak şekilde çok daha sıkı yapılmalıdır.</div>

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Bir makine öğrenmesi projesi modelle değil, net bir problem tanımı ve birbirine bağlı iş ve model ölçütleriyle başlar.</li><li>CRISP-DM'in altı aşaması doğrusal değil, döngüseldir; geri dönmek sürecin doğal parçasıdır.</li><li>Basit bir baseline, hem karşılaştırma noktası hem de altyapının erken kurulması için gereklidir.</li><li>Canlıya alma kademeli olmalı, bir geri dönüş planı ve geri bildirim döngüsü içermelidir.</li><li>İzleme olmadan model sessizce bozulur; fayda azaldığında projeyi durdurmak da geçerli bir karardır.</li></ul></div>

<div class="faq"><details><summary>CRISP-DM hâlâ güncel mi?</summary><p>Teknik ayrıntılar değişse de temel aşamaları bugün de geçerli. Birçok ekip onu, izleme ve sürekli yeniden eğitim gibi adımlarla genişleterek kullanıyor.</p></details><details><summary>Baseline modeli neden bu kadar önemli?</summary><p>Çünkü daha karmaşık bir modelin gerçekten işe yarayıp yaramadığını ancak basit bir referansla karşılaştırarak anlayabilirsiniz. Bazen basit çözüm yeterince iyidir ve karmaşık modelin bakım maliyetine değmez.</p></details><details><summary>Model ne sıklıkla yeniden eğitilmeli?</summary><p>Tek bir doğru cevap yok. Veri ne kadar hızlı değişiyorsa o kadar sık gerekir. En sağlıklı yaklaşım, sabit bir takvim yerine izleme göstergelerine göre karar vermektir.</p></details><details><summary>Bir projenin başarısız olduğunu nasıl anlarım?</summary><p>Model ölçütleri iyi görünse bile iş ölçütü iyileşmiyorsa ya da kullanıcılar modelin çıktısına güvenip kullanmıyorsa, proje hedefine ulaşmıyor demektir. Bu durumda problemin tanımına geri dönmek gerekir.</p></details></div>

---

**Kaynaklar**

- [IBM SPSS Modeler Belgeleri – CRISP-DM'e genel bakış](https://www.ibm.com/docs/en/spss-modeler/saas?topic=dm-crisp-help-overview)
- [Google for Developers – Rules of Machine Learning (Martin Zinkevich)](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Sculley vd. (2015), Hidden Technical Debt in Machine Learning Systems – NeurIPS](https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html)
- [Google Machine Learning Crash Course – Production ML Systems](https://developers.google.com/machine-learning/crash-course/production-ml-systems)
