---
title: "Büyük Veri Nedir? Hacim, Hız, Çeşitlilik ve Gerçek İhtiyaçlar"
description: "Büyük veri bugün ne anlama geliyor? Hacim, hız ve çeşitlilik; Hadoop ve Spark ile dağıtık işleme; veri gölü ve lakehouse; büyük veriniz olmadığında ne olur?"
publishDate: "2026-11-18T09:17:00+03:00"
lang: tr
category: "Temeller"
tags: ["Büyük Veri", "Veri Mühendisliği", "Dağıtık Sistemler"]
translation: "what-is-big-data"
heroImage:
  src: "../../../assets/blog/covers/buyuk-veri-nedir.jpg"
  alt: "Birbirine bağlı sunuculardan oluşan bir veri merkezi kümesinin şematik görünümü"
---

"Büyük veri" son yirmi yılın en çok kullanılan teknoloji terimlerinden biri. Kimi zaman bir şirketin müşteri kayıtları için, kimi zaman milyarlarca sensör ölçümü için, kimi zaman da yalnızca "çok fazla Excel satırı" için kullanılıyor. Bu belirsizlik, yanlış yatırım kararlarına da yol açabiliyor: Bazı ekipler gerçekten ihtiyaç duymadıkları karmaşık altyapılar kuruyor, bazıları ise verinin gerçekten büyüdüğü noktayı kaçırıyor. Bu yazıda büyük verinin bugün ne anlama geldiğini, dağıtık depolama ve işlemenin temel fikirlerini ve en az onlar kadar önemli olan soruyu ele almak istiyorum: Büyük veriniz yoksa ne olur?

## Terim nereden geliyor?

Büyük veriyi tanımlarken en sık başvurulan çerçeve "üç V"dir: Hacim (volume), hız (velocity) ve çeşitlilik (variety). Bu çerçeve, o dönem META Group'ta analist olan Doug Laney'nin Şubat 2001 tarihli bir araştırma notuna dayanıyor. Laney, e-ticaretin veri yönetimini bu üç boyutta zorladığını yazmıştı. Sonraki yıllarda farklı kaynaklar listeye doğruluk (veracity) ve değer (value) gibi başka "V"ler de ekledi; ama özgün üçlü hâlâ en kullanışlı başlangıç noktası.

Burada önemli bir ayrıntı var: Büyük veri belirli bir boyut eşiği değil. 2001'de büyük sayılan bir veri seti, bugün tek bir dizüstü bilgisayarda rahatça işlenebiliyor. Büyük veriyi tanımlayan şey, verinin mevcut araçlarınızın ve tek bir makinenin kapasitesini aşmaya başlamasıdır.

## Hacim, hız ve çeşitlilik bugün

- **Hacim:** Verinin miktarı. Sorun yalnızca disk alanı değil; veriyi makul bir sürede okumak, taşımak ve işlemek de zorlaşır.
- **Hız:** Verinin üretilme ve işlenmesi gereken hız. Ödeme sistemlerinde dolandırıcılık tespiti ya da trafik sensörleri gibi durumlarda verinin saniyeler içinde değerlendirilmesi gerekir. Bu, "akış işleme" (stream processing) denen ayrı bir alan doğurdu.
- **Çeşitlilik:** Verinin biçimi. Tablolar, JSON kayıtları, serbest metin, görüntü, ses ve log dosyaları farklı araçlar ve farklı kalite kontrolleri gerektirir.

Pratikte bu üç boyuttan birinde zorlanmak, "büyük veri" araçlarını düşünmek için yeterli olabilir. Örneğin veri hacmi küçük ama saniyede binlerce olay geliyorsa, sorun hacim değil hızdır ve çözüm de farklıdır.

## Dağıtık depolama ve işleme fikri

Tek bir makinenin yetmediği noktada temel fikir şudur: Veriyi çok sayıda makineye bölmek ve hesaplamayı da verinin bulunduğu yere götürmek. Google mühendisleri Jeffrey Dean ve Sanjay Ghemawat'ın 2004'te OSDI konferansında yayımladığı MapReduce makalesi, bu fikri geniş kitlelere tanıtan çalışmalardan biri oldu. Model iki adımdan oluşur: "map" adımı her parçayı ayrı ayrı işleyip ara sonuçlar üretir, "reduce" adımı ise aynı anahtara sahip sonuçları birleştirir. Makinelerden biri arızalanırsa, sistem o işi başka bir makinede yeniden çalıştırır.

Bu fikirlerden esinlenen açık kaynak Apache Hadoop projesi, uzun süre büyük verinin neredeyse eş anlamlısı oldu. Hadoop'un temel bileşenleri; veriyi küme genelinde saklayan dağıtık dosya sistemi HDFS, kaynakları ve işleri yöneten YARN ve paralel işleme için MapReduce'tur.

Daha sonra yaygınlaşan Apache Spark, kendisini tek makinede ya da kümelerde çalışabilen, çok dilli bir analiz motoru olarak tanımlıyor; Python, SQL, Scala, Java ve R ile kullanılabiliyor. Spark, MapReduce'a göre daha esnek bir programlama modeli sunduğu için veri mühendisliği, analiz ve makine öğrenmesi iş yüklerinde yaygın biçimde kullanılıyor.

<div class="callout"><strong>Not:</strong> Dağıtık sistemlerin bedeli karmaşıklıktır. Ağ gecikmeleri, makineler arası veri aktarımı, kısmi arızalar ve küme yönetimi, tek makinede hiç karşılaşmayacağınız sorunlar yaratır. Bu yüzden dağıtık bir çözüm, ancak gerçekten gerektiğinde değer katar.</div>

## Veri gölü, veri ambarı ve lakehouse

Büyük veri konuşmalarında sık geçen üç kavramı kısaca ayırmak faydalı olabilir:

| Kavram | Temel fikir | Güçlü yanı | Zorluğu |
|---|---|---|---|
| Veri ambarı | Temizlenmiş, yapılandırılmış veriyi analiz için optimize edilmiş biçimde saklamak | Hızlı ve tutarlı SQL raporlama | Ham ve yapılandırılmamış veri için daha az esnek |
| Veri gölü | Her türlü veriyi ham hâliyle ucuz depolamada (genellikle nesne depolama) tutmak | Esneklik, düşük depolama maliyeti | Yönetilmezse "veri bataklığına" dönüşebilir |
| Lakehouse | Veri gölü üzerinde, açık dosya formatlarıyla ambar benzeri yönetim ve performans sağlamak | Tek platformda hem analiz hem makine öğrenmesi | Görece yeni; araç ve pratikler hâlâ olgunlaşıyor |

Lakehouse yaklaşımı, Michael Armbrust ve arkadaşlarının 2021'de CIDR konferansında yayımladığı makaleyle geniş kitlelerce tartışılmaya başlandı. Makale; veri gölü ve veri ambarını iki ayrı katman olarak tutmanın veri eskimesi, güvenilirlik ve maliyet gibi sorunlar yarattığını savunuyor ve açık formatlar üzerine kurulu tek bir katman öneriyor.

## Büyük veriniz olmayabilir

Benim bu konudaki en pratik önerim şu: Büyük veri araçlarına geçmeden önce verinizin gerçekten büyük olup olmadığını ölçün. Bugün birçok kurumun analiz ettiği veri, tek bir güçlü makinenin belleğine ya da diskine sığacak boyutta. Böyle durumlarda dağıtık bir küme kurmak; maliyeti, bakım yükünü ve hata noktalarını artırır ama işi hızlandırmayabilir.

Tek makinede çok daha fazlasını yapmanızı sağlayan birkaç yaklaşım var:

- **Sütun tabanlı dosya formatları:** Apache Parquet gibi formatlar veriyi sütun sütun ve sıkıştırılmış olarak saklar; yalnızca ihtiyaç duyulan sütunlar okunur.
- **Tek makinede çalışan analitik motorlar:** DuckDB gibi gömülü analitik veritabanları ya da pandas ve benzeri kütüphaneler, orta büyüklükteki verilerde oldukça verimli çalışabilir.
- **Önce özetlemek:** Ham olay verisini saklayıp analiz için günlük ya da saatlik özet tablolar üretmek, sorgulanan veri miktarını büyük ölçüde azaltır.
- **Örneklem almak:** Keşif amaçlı analizlerde verinin temsili bir örneği çoğu zaman yeterlidir.

Şu sorular, dağıtık bir çözüme gerçekten ihtiyacınız olup olmadığını anlamaya yardımcı olabilir: Veri tek bir makinenin diskine sığıyor mu? Sorgular kabul edilemeyecek kadar uzun mu sürüyor? Veri, tek bir makinenin işleyebileceğinden daha hızlı mı geliyor? Bu soruların cevabı "hayır" ise, daha basit bir mimari büyük olasılıkla daha iyi bir başlangıçtır.

## Büyüklük kaliteyi garanti etmez

Son olarak, veri kalitesi üzerine çalışan biri olarak bir noktayı vurgulamak isterim: Daha fazla veri, otomatik olarak daha iyi sonuç demek değildir. Sistematik olarak hatalı, eksik ya da belirli bir grubu temsil etmeyen bir veri seti büyüdükçe, yanlış sonuçlar yalnızca daha kendinden emin görünür. Büyük veri projelerinde veri kalitesi kontrolleri, veri kökeni (lineage) kaydı ve kişisel verilerin korunmasına ilişkin yükümlülükler, depolama ve işleme kadar planlanması gereken konulardır.

<div class="takeaways"><h4>Öne çıkanlar</h4><ul><li>Büyük veri belirli bir boyut değil; verinin mevcut araçların ve tek bir makinenin kapasitesini aşmaya başladığı durumdur.</li><li>Hacim, hız ve çeşitlilikten hangisinde zorlandığınız, ihtiyacınız olan çözümü belirler.</li><li>Dağıtık sistemler veriyi makinelere böler ve hesaplamayı veriye götürür; bedeli karmaşıklıktır.</li><li>Veri gölü esneklik, veri ambarı tutarlılık sunar; lakehouse ikisini birleştirmeyi hedefler.</li><li>Birçok iş yükü tek bir makinede, sütun tabanlı formatlar ve verimli araçlarla rahatça işlenebilir.</li></ul></div>

<div class="faq"><details><summary>Kaç gigabayt veya terabayt "büyük veri" sayılır?</summary><p>Kesin bir eşik yok. Donanım geliştikçe sınır da sürekli kayıyor. Pratik bir ölçüt, verinin elinizdeki araçlarla ve tek bir makinede makul sürede işlenip işlenemediğidir.</p></details><details><summary>Hadoop hâlâ kullanılıyor mu?</summary><p>Hadoop ekosistemi hâlâ birçok kurumda çalışıyor. Ancak yeni projelerde işleme için Spark gibi motorlar, depolama için ise bulut nesne depolama hizmetleri sıkça tercih ediliyor.</p></details><details><summary>Yapay zekâ için büyük veri şart mı?</summary><p>Büyük modellerin eğitimi gerçekten çok büyük veri gerektirir. Ancak birçok pratik uygulama, hazır modelleri daha küçük ve iyi seçilmiş veriyle uyarlayarak çalışır. Burada da verinin kalitesi, miktarı kadar önemlidir.</p></details><details><summary>Veri gölü ile veri ambarı arasında nasıl seçim yapmalıyım?</summary><p>Ağırlıklı olarak yapılandırılmış veriyle standart raporlama yapıyorsanız veri ambarı genellikle yeterlidir. Ham ve çeşitli veriyi saklayıp farklı analizler ve makine öğrenmesi için kullanacaksanız veri gölü ya da lakehouse yaklaşımı daha uygun olabilir.</p></details></div>

---

**Kaynaklar**

- [Doug Laney – Deja VVVu: Gartner's Original "Volume-Velocity-Variety" Definition of Big Data](https://community.aiim.org/blogs/doug-laney/2012/08/25/deja-vvvu-gartners-original-volume-velocity-variety-definition-of-big-data)
- [Dean ve Ghemawat – MapReduce: Simplified Data Processing on Large Clusters (OSDI 2004)](https://research.google/pubs/pub62/)
- [Apache Hadoop](https://hadoop.apache.org/)
- [Apache Spark](https://spark.apache.org/)
- [Armbrust vd. – Lakehouse: A New Generation of Open Platforms that Unify Data Warehousing and Advanced Analytics (CIDR 2021)](https://vldb.org/cidrdb/2021/lakehouse-a-new-generation-of-open-platforms-that-unify-data-warehousing-and-advanced-analytics.html)
