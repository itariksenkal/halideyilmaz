# halideyilmaz.com — Halide Yılmaz · Kişisel Blog & Portföy

Modern, açık/koyu temalı, tek sayfa + blog yapısında **statik** bir kişisel site.
Halide Yılmaz'ı (Hatson Teknoloji A.Ş. kurucu ortağı, ODTÜ Bilgisayar Mühendisliği mezunu,
Caseon fikrinin öncülerinden) tanıtmak ve yapay zeka / mühendislik üzerine yazılar yayımlamak için tasarlandı.

> HatsonTech ailesinin kardeş sitesi. [tariksenkal.com] ile aynı tasarım sistemini paylaşır;
> kişisel dokunuş olarak **teal** ikincil aksan kullanır (`--accent: #0E9D8C`).

---

## ⚡ Hızlı başlangıç

```bash
python -m http.server 8000
# Tarayıcı: http://localhost:8000
```

Ya da `index.html` dosyasına çift tıklayın (yerel sunucu önerilir).

---

## 📁 Yapı

```
halideyilmaz/
├── index.html                 # Ana sayfa (hero, kimdir, ne yapıyor, uzmanlık, yazılar, yolculuk, iletişim)
├── blog.html                  # Tüm yazıların listesi
├── 404.html                   # Özel hata sayfası
├── posts/
│   ├── halide-yilmaz-kimdir.html
│   ├── hatsontech-nedir.html
│   ├── buyuk-dil-modeli-nedir.html
│   ├── rag-nedir.html
│   └── turkce-yapay-zeka.html
├── css/style.css              # Tüm stiller + tema sistemi (teal aksan)
├── js/main.js                 # Tema, mobil menü, scroll-reveal, okuma çubuğu
├── image/caseon-lockup-black.svg  # Marka logosu (açık tema; koyu tema için -white)
├── CNAME                      # halideyilmaz.com
├── robots.txt · sitemap.xml   # SEO
└── README.md
```

---

## 🎨 Tasarım

- **Tema:** Açık / koyu mod (sağ üstteki ☀️/🌙). Tercih `localStorage`'a kaydedilir.
- **Renkler:** Site yeşili (`#7CB342`) ana aksan + **teal** (`#0E9D8C`) ikincil. `css/style.css` → `:root`.
- **Tipografi:** Başlıklar **Sora**, gövde **Inter**, makaleler **Newsreader** (serif).

---

## ⚠️ İçerik notu (önemli)

Biyografik anlatım **örnek/şablon niteliğindedir** ve verilen gerçeklerle birlikte yazılmıştır:
HatsonTech kurucu ortaklığı, ODTÜ Bilgisayar Mühendisliği mezuniyeti, sektörde uzun deneyim,
Caseon fikrinin öncülerinden olması. Yayına almadan önce tarihleri, kariyer ayrıntılarını ve
sosyal bağlantıları **gözden geçirip kişiselleştirin**:

- `posts/halide-yilmaz-kimdir.html` — kariyer/deneyim ayrıntıları
- `index.html` → "Yolculuk" zaman çizelgesi
- Sosyal bağlantılar: şu an **HatsonTech kurumsal** hesaplarına bağlı; varsa **kişisel profillerle** değiştirin.
- Profil fotoğrafı için hero kartındaki "HY" baş harflerini bir `<img>` ile değiştirin.

---

## 🚀 Yayına alma (GitHub Pages)

```bash
git init && git add . && git commit -m "halideyilmaz.com kişisel blog"
git branch -M main
git remote add origin https://github.com/<kullanici>/halideyilmaz.git
git push -u origin main
```

Repo → **Settings → Pages → Branch: main / root**. `CNAME` `halideyilmaz.com` için ayarlı.

---

© 2024–2026 Halide Yılmaz · Hatson Teknoloji A.Ş. · Ankara, ODTÜ Teknokent 🌿
