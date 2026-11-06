---
title: "Python ile Veri Analizine Başlangıç: pandas ile İlk Adımlar"
description: "Python, Jupyter ve pandas ile veri analizine başlangıç: CSV okuma, filtreleme, gruplama ve grafik çizme adımları, küçük bir örnek veri seti üzerinden."
publishDate: "2026-11-15T09:17:00+03:00"
lang: tr
category: "Veri"
tags: ["Python", "Veri Analizi", "Pandas"]
translation: "getting-started-with-data-analysis-in-python"
heroImage:
  src: "../../../assets/blog/covers/python-ile-veri-analizine-baslangic.jpg"
  alt: "Ekranda Python kodu ve bir tablo ile basit bir çizgi grafik"
---

Elinizde bir Excel dosyası ya da bir CSV çıktısı var ve "bu verilerden ne öğrenebilirim?" diye merak ediyorsunuz. Tablolama programları belli bir noktaya kadar iş görür; ama aynı analizi her ay tekrarlamak, binlerce satırı birleştirmek ya da yaptığınız adımları bir başkasına göstermek gerektiğinde zorlanmaya başlarsınız. Python ve onun en bilinen veri kütüphanesi pandas, tam bu noktada devreye giriyor. Bu yazıda programlama geçmişi olmayan biri için de takip edilebilir bir başlangıç yolu çizmek istiyorum: Ortamı kurmak, küçük bir veri setini okumak, filtrelemek, gruplamak ve bir grafik çizmek.

## Neden Python ve pandas?

Python, okunabilir sözdizimi ve geniş kütüphane ekosistemi sayesinde veri analizinde en yaygın kullanılan dillerden biri. pandas ise Python'a tablo mantığını getiren açık kaynak bir kütüphane. pandas'ta temel yapı `DataFrame`: Satırları ve adlandırılmış sütunları olan, Excel sayfasına benzeyen bir tablo. Tek bir sütun ise `Series` olarak adlandırılır.

Kodla analiz yapmanın bence en büyük faydası tekrarlanabilirlik. Bir hücreye elle yazılmış formülün nereden geldiğini birkaç ay sonra hatırlamak zordur; oysa kod, yapılan her adımın yazılı bir kaydıdır. Veri değiştiğinde aynı analizi tek tıkla yeniden çalıştırabilirsiniz.

## Ortamı kurmak: Python ve Jupyter

Başlamak için bilgisayarınızda güncel bir Python 3 sürümü olması yeterli; python.org üzerinden indirebilirsiniz. Ardından terminalde (Windows'ta Komut İstemi ya da PowerShell) gerekli paketleri kurabilirsiniz:

```bash
pip install pandas matplotlib jupyterlab
jupyter lab
```

İkinci komut, tarayıcınızda JupyterLab'i açar. Jupyter not defterleri, kodu küçük hücreler halinde çalıştırıp sonucu hemen altında görmenizi sağlar. Bu, keşif amaçlı analiz için çok rahat bir çalışma biçimi: Bir şey deneyin, sonuca bakın, bir sonraki adıma geçin.

Kurulumla uğraşmak istemiyorsanız, tarayıcıda çalışan not defteri ortamları da bir seçenek. Google Colab gibi hizmetler, bilgisayarınıza hiçbir şey kurmadan Python kodu çalıştırmanıza olanak tanır. Ancak bu tür hizmetlere kişisel ya da kurumsal hassas veri yüklemeden önce verinin nerede saklandığını ve kimlerin erişebileceğini düşünmek gerekir. Öğrenme aşamasında, bu yazıdaki gibi uydurma ya da kamuya açık veri setleriyle çalışmak en güvenli yoldur.

<div class="callout"><strong>İpucu:</strong> Her proje için ayrı bir sanal ortam (<em>python -m venv .venv</em>) oluşturmak, farklı projelerin paket sürümlerinin birbirine karışmasını önler. Başlangıçta zorunlu değil, ama erken edinilecek iyi bir alışkanlık.</div>

## İlk veri seti: CSV'yi okumak

Örnek olarak, iki şubesi olan hayali bir kafenin üç günlük satış kayıtlarını kullanacağım. Gerçek hayatta bu veri bir dosyadan gelir ve `pd.read_csv("satislar.csv")` ile okunur. Burada herkesin aynı kodu çalıştırabilmesi için veriyi doğrudan kodun içine yazıyorum:

```python
import io
import pandas as pd
import matplotlib.pyplot as plt

csv_metni = """tarih,sube,urun,adet,birim_fiyat
2026-10-01,Kızılay,Çay,120,15
2026-10-01,Kızılay,Simit,80,20
2026-10-01,Bahçelievler,Çay,90,15
2026-10-01,Bahçelievler,Simit,60,20
2026-10-02,Kızılay,Çay,135,15
2026-10-02,Kızılay,Simit,70,20
2026-10-02,Bahçelievler,Çay,95,15
2026-10-02,Bahçelievler,Simit,,20
2026-10-03,Kızılay,Çay,150,15
2026-10-03,Kızılay,Simit,90,20
2026-10-03,Bahçelievler,Çay,110,15
2026-10-03,Bahçelievler,Simit,75,20
"""

df = pd.read_csv(io.StringIO(csv_metni), parse_dates=["tarih"])
print(df.shape)   # (12, 5): 12 satır, 5 sütun
print(df.head())  # ilk 5 satır
df.info()         # sütun tipleri ve boş olmayan değer sayıları
```

`parse_dates` parametresi, `tarih` sütununun metin olarak değil tarih olarak okunmasını sağlıyor. Bu küçük ayrıntı, ileride tarihe göre sıralama ve gruplama yaparken işinizi kolaylaştırır.

## Veriyi tanımak ve temizlemek

Analize geçmeden önce verinin ne durumda olduğuna bakmak gerekir. Veri kalitesiyle uğraşan biri olarak bu adımı atlamamayı özellikle öneririm: Eksik ya da hatalı değerler, sonraki her hesabı sessizce etkiler.

```python
print(df.isna().sum())  # her sütunda kaç eksik değer var?

df = df.dropna(subset=["adet"])          # adedi eksik satırı çıkar
df["ciro"] = df["adet"] * df["birim_fiyat"]  # yeni sütun hesapla
```

Örnek veride 2 Ekim'de Bahçelievler şubesinin simit adedi boş. Bu satırı çıkardım, ama bunun bir karar olduğunu unutmamak gerekir: O günün simit satışları artık olduğundan düşük görünecek. Gerçek bir projede bu boşluğun nedenini (kayıt hatası mı, gerçekten satış olmadı mı?) araştırmak, satırı silmekten çoğu zaman daha doğru olur.

## Filtrelemek ve gruplamak

pandas'ta filtreleme, köşeli parantez içine bir koşul yazarak yapılır. Birden fazla koşulu `&` (ve) ya da `|` (veya) ile birleştirirsiniz; her koşulu parantez içine almayı unutmayın:

```python
kizilay_cay = df[(df["sube"] == "Kızılay") & (df["urun"] == "Çay")]
print(kizilay_cay)

sube_ciro = df.groupby("sube")["ciro"].sum().sort_values(ascending=False)
print(sube_ciro)
# Kızılay         10875.0
# Bahçelievler     7125.0

tablo = df.pivot_table(index="tarih", columns="urun", values="adet", aggfunc="sum")
print(tablo)
```

`groupby` mantığı "böl, uygula, birleştir" diye özetlenebilir: Veriyi şubelere böl, her grubun cirosunu topla, sonuçları tek tabloda birleştir. `pivot_table` ise Excel'deki özet tabloların karşılığıdır; burada her gün için ürün bazında toplam adedi görüyoruz.

Sonuçları okurken bir adım geri çekilip sağduyu kontrolü yapmak da önemli. Kızılay'ın cirosu Bahçelievler'den yüksek görünüyor; ama Bahçelievler'in bir günlük simit verisinin eksik olduğunu biliyoruz. Aradaki farkın ne kadarının gerçek, ne kadarının eksik veriden kaynaklandığını sormadan kesin bir sonuca varmamak gerekir. Analizde edinilebilecek en değerli alışkanlıklardan biri, her sayının yanında "bu sayıyı ne etkiliyor olabilir?" sorusunu sormaktır.

## İlk grafik

pandas, grafik çizmek için arka planda Matplotlib kütüphanesini kullanır. Günlük toplam ciroyu bir çizgi grafikle göstermek birkaç satır sürüyor:

```python
gunluk = df.groupby("tarih")["ciro"].sum()
ax = gunluk.plot(marker="o", title="Günlük toplam ciro (TL)")
ax.set_xlabel("Tarih")
ax.set_ylabel("Ciro (TL)")
ax.set_ylim(bottom=0)
plt.tight_layout()
plt.show()
```

Eksen etiketlerini ve birimi yazmak, küçük ama önemli bir alışkanlık. `set_ylim(bottom=0)` ise eksenin sıfırdan başlamasını sağlıyor; böylece günler arasındaki fark olduğundan büyük görünmüyor.

## Sonraki adımlar

Bu küçük örnek; okuma, inceleme, temizleme, özetleme ve görselleştirme döngüsünün tamamını içeriyor. Gerçek projelerin çoğu bu döngünün daha büyük ve daha karmaşık versiyonları. Buradan sonra şu konulara bakmanızı öneririm:

- **Tabloları birleştirmek:** `merge` ile iki tabloyu ortak bir sütun üzerinden eşleştirmek (SQL'deki JOIN'in karşılığı).
- **Zaman serileri:** `resample` ile günlük veriyi haftalık ya da aylık özetlere dönüştürmek.
- **Metin verisi:** `.str` yöntemleriyle büyük-küçük harf, boşluk ve yazım farklarını düzeltmek.
- **Resmî belgeler:** pandas'ın kendi "10 minutes to pandas" rehberi ve başlangıç eğitimleri, sade ve güncel bir sonraki adım.
- **Kendi veriniz:** En iyi öğrenme yolu, merak ettiğiniz gerçek bir veri setiyle küçük bir soru sormak.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>pandas'ın temel yapısı DataFrame'dir: satırları ve adlandırılmış sütunları olan bir tablo.</li><li>Jupyter, kodu adım adım çalıştırıp sonucu hemen görmeyi sağlar; keşif amaçlı analiz için idealdir.</li><li>Analize geçmeden önce eksik değerleri kontrol edin; silmek ya da doldurmak bir karardır ve sonuçları etkiler.</li><li>Filtreleme, groupby ve pivot_table ile analistlerin sorularının büyük kısmı yanıtlanabilir.</li><li>Grafiklerde eksen etiketi, birim ve sıfırdan başlayan eksen gibi küçük ayrıntılar okunabilirliği artırır.</li></ul></div>

<div class="faq"><details><summary>Python öğrenmek için programlama bilmem gerekiyor mu?</summary><p>Hayır. Veri analizi için gereken temel Python bilgisi (değişkenler, listeler, fonksiyon çağırmak) birkaç haftalık düzenli pratikle edinilebilir. pandas'ı öğrenirken Python'ı da birlikte öğrenmek mümkündür.</p></details><details><summary>Excel yerine neden pandas kullanmalıyım?</summary><p>Excel küçük ve tek seferlik işler için hâlâ çok kullanışlı. pandas ise tekrarlanan analizlerde, büyük dosyalarda ve adımların kayıt altında olması gereken durumlarda öne çıkar. İkisi birbirinin rakibi değil, tamamlayıcısıdır.</p></details><details><summary>Türkçe karakterli CSV dosyaları sorun çıkarır mı?</summary><p>Dosya UTF-8 olarak kaydedildiyse genellikle sorun olmaz. Bazı eski dosyalarda farklı bir kodlama kullanılmış olabilir; bu durumda read_csv fonksiyonuna encoding parametresiyle doğru kodlamayı belirtmek gerekir.</p></details><details><summary>Jupyter yerine başka bir editör kullanabilir miyim?</summary><p>Evet. Aynı kodu düz bir .py dosyası olarak da çalıştırabilirsiniz; birçok kod editörü Jupyter not defterlerini doğrudan açmayı da destekler. Başlangıç için önemli olan, rahat ettiğiniz bir ortamı seçmektir.</p></details></div>

---

**Kaynaklar**

- [pandas – Getting started](https://pandas.pydata.org/docs/getting_started/index.html)
- [pandas – 10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [pandas – How do I create plots in pandas?](https://pandas.pydata.org/docs/getting_started/intro_tutorials/04_plotting.html)
- [Project Jupyter – Install](https://jupyter.org/install)
- [Python – Downloads](https://www.python.org/downloads/)
