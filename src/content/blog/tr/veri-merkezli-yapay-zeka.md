---
title: "Veri Merkezli Yapay Zeka: Modeli Değil Veriyi İyileştirmek"
description: "Veri merkezli yapay zeka, modeli sabit tutup veriyi sistematik olarak iyileştirme yaklaşımıdır. Etiket tutarlılığı, kapsam boşlukları ve hata analizi ile aynı mimariden nasıl daha yüksek doğruluk çıkar, sezgisel örneklerle anlatıyoruz."
publishDate: "2026-08-09T23:59:00+03:00"
lang: tr
category: "Veri"
tags: ["Veri", "Yapay Zeka"]
translation: "data-centric-ai"
heroImage:
  src: "../../../assets/blog/covers/veri-merkezli-yapay-zeka.jpg"
  alt: "Veri Merkezli Yapay Zeka: Modeli Değil Veriyi İyileştirmek"
---

Bir modelin doğruluğu beklediğinizin altında kaldığında ilk refleks genellikle aynıdır: daha büyük bir mimari denemek, katman eklemek, hiperparametre taramak. Oysa üretimde çalışan ekiplerin deneyimi çoğu zaman başka bir yöne işaret eder — kazancın büyük kısmı modelden değil, **veriden** gelir. Veri merkezli yapay zeka tam olarak bunu söyler: mimariyi sabitleyin, enerjinizi veri kümesini sistematik biçimde iyileştirmeye harcayın.

## Model merkezli ve veri merkezli yaklaşım

Model merkezli çalışmada veri kümesi sabittir ve siz mimariyi değiştirirsiniz. Veri merkezli çalışmada ise tam tersi olur: mimari sabittir, veri kümesi üzerinde çalışırsınız. İkisi rakip değildir, ama sıralama önemlidir. Mimari değişiklikleri genellikle azalan getiri verirken, veri kalitesindeki iyileştirmeler çoğu zaman doğrudan ve ölçülebilir bir sıçrama yaratır.

Bunu bir teleskopla düşünün. Merceği büyütmek belli bir noktaya kadar işe yarar; ama camda leke varsa, daha büyük mercek lekeyi de büyütür. Etiket gürültüsü tam olarak o lekedir.

<div class="callout"><strong>Pratik kural:</strong> Modelinizin hata yaptığı 100 örneği elle inceleyin. Bu hataların önemli bir kısmı yanlış etiketlenmişse, sorununuz mimaride değil veri kümesindedir.</div>

## Etiket tutarlılığı: sessiz tavan

Bir veri kümesinde aynı örnek iki farklı etiketleyici tarafından farklı etiketlenmişse, model bu çelişkiyi öğrenemez — yalnızca ortalamasını alır ve kararsız kalır. Bu, doğruluğa görünmez bir tavan koyar. Etiketleyiciler arası uyum (inter-annotator agreement) ölçmek, bu tavanın nerede olduğunu gösterir.

Uyum düşükse çözüm daha fazla veri değildir; _daha net bir etiketleme kılavuzudur_. Sınır durumlar için açık kurallar yazmak, çoğu zaman binlerce yeni örnek toplamaktan daha çok kazandırır.

## Kapsam boşlukları

Veri kümeniz gerçek kullanımın hangi bölümlerini temsil etmiyor? Bu soru, doğruluk metriğinin gizlediği şeyi ortaya çıkarır. Genel doğruluk yüzde doksanken, kullanıcıların gerçekten önemsediği bir alt kümede yüzde elli olabilir.

Dilimlere ayırarak ölçmek (slice-based evaluation) burada kritiktir: veriyi uzunluk, alan, kaynak, dil ya da kullanıcı tipine göre bölün ve her dilim için ayrı ayrı bakın. Toplam metrik iyi görünürken bir dilimin çökmüş olması çok yaygındır.

## Hata analizi bir döngüdür

Veri merkezli çalışma tek seferlik bir temizlik değil, tekrar eden bir döngüdür:

1.  Modeli eğit ve hataları topla.
2.  Hataları elle kategorilere ayır — yanlış etiket, eksik kapsam, gerçek zorluk.
3.  En büyük kategoriye yönelik hedefli veri ekle ya da düzelt.
4.  Yeniden eğit ve aynı dilimlerde karşılaştır.

Bu döngünün gücü, çabayı en çok kazandıracak yere yönlendirmesidir. Rastgele bin örnek eklemek yerine, hataların yoğunlaştığı yere yüz örnek eklemek çoğu zaman daha etkilidir.

## Küçük ve temiz mi, büyük ve gürültülü mü?

| Boyut | Küçük ve temiz | Büyük ve gürültülü |
| --- | --- | --- |
| Eğitim maliyeti | Düşük | Yüksek |
| Hata ayıklama | Kolay, izlenebilir | Zor |
| Nadir durumlar | Eksik kalabilir | Doğal olarak kapsanır |
| Tavan doğruluk | Etiket kalitesiyle sınırlı | Gürültüyle sınırlı |

Doğru cevap ikisinin ortasındadır: geniş bir taban toplayın, ama _değerlendirme kümesini_ titizlikle temizleyin. Ölçtüğünüz şeye güvenemiyorsanız, hiçbir iyileştirmenin gerçek olup olmadığını bilemezsiniz.

<div class="callout"><strong>Sık yapılan hata:</strong> Eğitim kümesini temizleyip değerlendirme kümesini olduğu gibi bırakmak. Kirli bir test kümesi, iyi bir modeli kötü, kötü bir modeli iyi gösterebilir.</div>

## Sık sorulanlar

<div class="faq"><details><summary>Veri merkezli yaklaşım büyük modelleri gereksiz mi kılıyor?</summary><p>Hayır. İkisi birbirini tamamlar. Ama sabit bir bütçeniz varsa, veri kalitesine harcanan ilk saatler genellikle mimariye harcanan ilk saatlerden daha çok kazandırır.</p></details><details><summary>Etiket kalitesini nasıl ölçerim?</summary><p>Bir alt kümeyi birden fazla kişiye etiketletip uyum oranına bakın. Ayrıca modelin en emin olduğu halde yanıldığı örnekleri inceleyin — bunlar çoğu zaman yanlış etiketlerdir.</p></details><details><summary>Ne kadar veri yeterlidir?</summary><p>Sabit bir sayı yoktur. Öğrenme eğrisine bakın: veri iki katına çıktığında hata anlamlı biçimde düşmüyorsa, sorun miktarda değil kalitede ya da kapsamdadır.</p></details></div>

---

Veri merkezli yapay zeka, dikkati parlak mimarilerden sıkıcı ama belirleyici ayrıntılara çevirir: kim etiketledi, hangi kural uygulandı, hangi durum hiç temsil edilmedi. Türkçe veriyle çalışırken bu ayrıntıların önemi daha da artar; ilgili konular için [veri kalitesi ve etiketleme](/posts/veri-kalitesi-etiketleme/) ile [sınıflandırma metrikleri](/posts/degerlendirme-metrikleri/) yazılarına göz atabilirsiniz.
