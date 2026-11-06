// Everything that is specific to this person lives here.
// The rest of the site (layouts, components, pages) is shared between personal sites.
import type { Lang } from '@/i18n'

type L<T> = Record<Lang, T>

export const site = {
  url: 'https://halideyilmaz.com',
  name: 'Halide Yılmaz',
  shortName: 'Halide Yılmaz',
  initials: 'HY',
  /** Accent used by the highlight gradient and small details */
  accent: '#0E9D8C',
  email: 'halide.yilmaz@hatsontech.com',
  location: { tr: 'Ankara, Türkiye', en: 'Ankara, Türkiye' } as L<string>,
  socials: [
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/halide-y%C4%B1lmaz-6b48322b0/' },
    { label: 'GitHub', icon: 'github', href: 'https://github.com/halideyilmaz' },
    { label: 'X', icon: 'x', href: 'https://x.com/hatsontech' }
  ],
  alumni: [{ name: 'Orta Doğu Teknik Üniversitesi (ODTÜ)', url: 'https://www.metu.edu.tr/' }],
  companies: [
    { name: 'HatsonTech', legal: 'Hatson Teknoloji Ltd. Şti.', url: 'https://hatsontech.com/' },
    { name: 'Caseon AI', legal: 'Caseon Teknoloji A.Ş.', url: 'https://caseon.ai/' }
  ]
}

export const profile: L<{
  metaTitle: string
  metaDescription: string
  role: string
  eyebrow: string
  headline: string
  intro: string
  status: string
  about: { lead: string; points: { title: string; text: string }[] }
  focus: string[]
  ventures: {
    title: string
    items: { name: string; legal: string; since: string; tag: string; text: string; url: string }[]
  }
  now: string
  expertise: { icon: string; title: string; text: string }[]
  timeline: { when: string; title: string; text: string }[]
  stats: { value: string; label: string }[]
  contact: { title: string; text: string; cta: string }
  sections: Record<'about' | 'expertise' | 'journey' | 'writing' | 'contact' | 'ventures', string>
}> = {
  tr: {
    metaTitle: 'Halide Yılmaz — HatsonTech ve Caseon AI kurucu ortağı',
    metaDescription:
      'Halide Yılmaz: ODTÜ Bilgisayar Mühendisliği mezunu; HatsonTech ve Caseon AI’ın kurucu ortaklarından. Makine öğrenmesi, veri ve yapay zekâ yönetişimi üzerine öğrendiklerini burada yazıyor.',
    role: 'Bilgisayar mühendisi · HatsonTech ve Caseon AI kurucu ortağı',
    eyebrow: 'Girişimcilik · Makine öğrenmesi · Veri',
    headline: 'Yapay zeka ve yazılım alanında şirketler kuruyor, yol boyunca öğrendiklerimi paylaşıyorum.',
    intro:
      'ODTÜ Bilgisayar Mühendisliği mezunuyum ve HatsonTech ile Caseon AI’ın kurucu ortaklarındanım. Bu sitede makine öğrenmesi, veri ve yapay zekâ yönetişimi üzerine notlarımı paylaşıyorum.',
    status: 'Yeni yazı',
    about: {
      lead: 'Kısaca: iki teknoloji şirketinin kurucu ortağıyım. Mühendislik geçmişimi, ekiplerimizle birlikte kurumlar için güvenle kullanılabilecek yapay zeka ürünleri geliştirmek için kullanıyorum.',
      points: [
        {
          title: 'Girişimcilik',
          text: 'Bir fikri sağlam bir mühendislik temeli üzerinde, sürdürülebilir bir işe dönüştürmeyi önemsiyorum.'
        },
        {
          title: 'Mühendislik ve ürün',
          text: 'Sistem mimarisi, makine öğrenmesi ve dil modelleri tarafındaki ürün kararlarına yakından dahil oluyorum.'
        },
        {
          title: 'Ölçmek ve güven',
          text: 'Bir modelin ne kadar iyi çalıştığını ölçmeyi ve bunu müşterilerimize açıkça anlatabilmeyi önemsiyorum.'
        }
      ]
    },
    focus: [
      'Girişimcilik',
      'Bilgisayar Mühendisliği',
      'Makine Öğrenmesi',
      'Doğal Dil İşleme',
      'Model Değerlendirme',
      'Hukuk Teknolojisi',
      'Yapay Zekâ Yönetişimi'
    ],
    ventures: {
      title: 'Kurucu ortağı olduğum şirketler',
      items: [
        {
          name: 'HatsonTech',
          legal: 'Hatson Teknoloji Ltd. Şti.',
          since: 'Ağustos 2026, Ankara',
          tag: 'Yazılım ve yapay zeka',
          text: 'Kurumlar için yapay zeka ajanları, kaynak gösteren RAG asistanları, dil modeli ince ayarı, görüntü işleme, veri mühendisliği ile web ve mobil yazılım geliştiriyoruz.',
          url: 'https://hatsontech.com/'
        },
        {
          name: 'Caseon AI',
          legal: 'Caseon Teknoloji A.Ş.',
          since: '2026',
          tag: 'Hukuk teknolojisi',
          text: 'Avukatların durum tespiti (due diligence) ve sözleşme inceleme işleri için bir yazılım geliştiriyoruz. Her cevap dayandığı belge paragrafıyla birlikte gösteriliyor; son kontrol her zaman avukatta.',
          url: 'https://caseon.ai/'
        }
      ]
    },
    now: 'Bugün zamanımı bu iki şirketin büyümesine, ürünlerine ve ekiplerine ayırıyorum.',
    expertise: [
      {
        icon: 'brain',
        title: 'Büyük Dil Modelleri',
        text: 'Dil modellerini Türkçe’ye ve belirli alanlara uyarlamak için ince ayar ve değerlendirme çalışmaları.'
      },
      {
        icon: 'text',
        title: 'Doğal Dil İşleme',
        text: 'Türkçe ve çok dilli metinlerde sınıflandırma, bilgi çıkarımı ve anlam temelli işleme.'
      },
      {
        icon: 'layers',
        title: 'RAG',
        text: 'Cevapları ilgili belgelere dayandıran ve kaynağını gösteren getirim mimarileri.'
      },
      {
        icon: 'search',
        title: 'Semantik Arama & Vektör DB',
        text: 'Anahtar kelimenin yanında anlamı da gözeten arama sistemleri.'
      },
      {
        icon: 'check',
        title: 'Veri ve Model Değerlendirme',
        text: 'Veri kalitesi, etiketleme ve modelleri doğru ölçütlerle değerlendirme.'
      },
      {
        icon: 'book',
        title: 'Hukuk Yazılımları',
        text: 'Durum tespiti (due diligence) ve sözleşme inceleme gibi hukuk iş akışları için yazılım.'
      },
      {
        icon: 'network',
        title: 'MCP & Ajan Sistemleri',
        text: 'Araç kullanan ve önemli adımlarda insan onayı bekleyen ajan iş akışları.'
      },
      {
        icon: 'server',
        title: 'Sistem Mimarisi & MLOps',
        text: 'Web ve arka uç sistemlerin mimarisi; modellerin eğitimi, dağıtımı ve izlenmesi.'
      }
    ],
    timeline: [
      { when: 'Lisans', title: 'ODTÜ · Bilgisayar Mühendisliği', text: 'Lisans eğitimi.' },
      { when: '2024', title: 'İlk şirketimiz', text: 'Yapay zeka alanında ilk şirketimizi kurduk.' },
      { when: 'Ocak 2025', title: 'Büyük ölçekli yapay zeka çalışmaları', text: 'TÜBİTAK, TRUBA ve EUMaster4HPC ile büyük ölçekli model eğitimi çalışmaları.' },
      { when: '2025', title: 'ODTÜ Teknokent', text: 'Hukuk yazılımı projemizle ODTÜ Teknokent’e girdik.' },
      { when: '2026', title: 'Yatırım', text: 'Hukuk yazılımı projemiz yatırım aldı.' },
      { when: 'Temmuz 2026', title: 'Proje satışı', text: 'Hukuk yazılımı projesini başka bir şirkete sattık.' },
      { when: 'Ağustos 2026', title: 'HatsonTech', text: 'Ana şirketimiz; farklı alanlarda yazılım ve yapay zeka ürünleri geliştiriyoruz.' },
      { when: '2026', title: 'Caseon AI', text: 'Sözleşme analizi için kurduğumuz hukuk teknolojisi şirketi.' },
      { when: 'Bugün', title: 'Çevre, hukuk ve yapay zeka', text: 'Çevre, hukuk, yazılım ve yapay zeka alanlarında teknolojik ürünler geliştiriyoruz.' }
    ],
    stats: [
      { value: '2026', label: 'HatsonTech ve Caseon AI' },
      { value: 'ODTÜ', label: 'Bilgisayar Mühendisliği' },
      { value: 'TR · EN', label: 'iki dilde yazılar' }
    ],
    contact: {
      title: 'İş birliği için iletişim',
      text: 'Projeleriniz, olası iş birlikleri ya da şirketlerimiz hakkında konuşmak isterseniz e-postayla ulaşabilirsiniz; en kısa sürede dönmeye çalışırım.',
      cta: 'E-posta gönder'
    },
    sections: {
      about: 'Hakkımda',
      ventures: 'Şirketler',
      expertise: 'İlgi ve çalışma alanları',
      journey: 'Yolculuk',
      writing: 'Yazılar',
      contact: 'İletişim'
    }
  },
  en: {
    metaTitle: 'Halide Yılmaz — Co-founder of HatsonTech and Caseon AI',
    metaDescription:
      'Halide Yılmaz: METU Computer Engineering graduate and one of the co-founders of HatsonTech and Caseon AI, writing about what she learns on machine learning, data and AI governance.',
    role: 'Computer engineer · Co-founder of HatsonTech and Caseon AI',
    eyebrow: 'Entrepreneurship · Machine learning · Data',
    headline: 'I build companies in AI and software, and share what I learn along the way.',
    intro:
      'I’m a METU Computer Engineering graduate and one of the co-founders of HatsonTech and Caseon AI. On this site I share notes on machine learning, data and AI governance.',
    status: 'New post',
    about: {
      lead: 'In short: I co-founded two technology companies. I use my engineering background to build, together with our teams, AI products that organisations can use with confidence.',
      points: [
        {
          title: 'Entrepreneurship',
          text: 'I care about turning an idea into a sustainable business on a solid engineering foundation.'
        },
        {
          title: 'Engineering and product',
          text: 'I stay closely involved in product decisions around system architecture, machine learning and language models.'
        },
        {
          title: 'Measurement and trust',
          text: 'I care about measuring how well a model really works, and explaining it openly to our customers.'
        }
      ]
    },
    focus: [
      'Entrepreneurship',
      'Computer Engineering',
      'Machine Learning',
      'Natural Language Processing',
      'Model Evaluation',
      'Legal Technology',
      'AI Governance'
    ],
    ventures: {
      title: 'Companies I co-founded',
      items: [
        {
          name: 'HatsonTech',
          legal: 'Hatson Teknoloji Ltd. Şti.',
          since: 'August 2026, Ankara',
          tag: 'Software and AI',
          text: 'We build AI agents, source-citing RAG assistants, language-model fine-tuning, computer vision, data engineering, and web and mobile software for organisations.',
          url: 'https://hatsontech.com/'
        },
        {
          name: 'Caseon AI',
          legal: 'Caseon Teknoloji A.Ş.',
          since: '2026',
          tag: 'Legal technology',
          text: 'We are building software for lawyers’ due diligence and contract review work. Every answer is shown with the document paragraph it relies on, and the final check always stays with the lawyer.',
          url: 'https://caseon.ai/en/'
        }
      ]
    },
    now: 'Today I spend my time on the growth, products and teams of these two companies.',
    expertise: [
      {
        icon: 'brain',
        title: 'Large Language Models',
        text: 'Fine-tuning and evaluation work to adapt language models to Turkish and to specific domains.'
      },
      {
        icon: 'text',
        title: 'Natural Language Processing',
        text: 'Classification, information extraction and meaning-based processing of Turkish and multilingual text.'
      },
      {
        icon: 'layers',
        title: 'RAG',
        text: 'Retrieval architectures that ground answers in the relevant documents and show their sources.'
      },
      {
        icon: 'search',
        title: 'Semantic Search & Vector DB',
        text: 'Search systems that consider meaning as well as keywords.'
      },
      {
        icon: 'check',
        title: 'Data and Model Evaluation',
        text: 'Data quality, labelling, and evaluating models with the right metrics.'
      },
      {
        icon: 'book',
        title: 'Legal Software',
        text: 'Software for legal workflows such as due diligence and contract review.'
      },
      {
        icon: 'network',
        title: 'MCP & Agent Systems',
        text: 'Agent workflows that use tools and wait for human approval at important steps.'
      },
      {
        icon: 'server',
        title: 'System Architecture & MLOps',
        text: 'Architecture of web and backend systems; training, deploying and monitoring models.'
      }
    ],
    timeline: [
      { when: 'Bachelor’s', title: 'METU · Computer Engineering', text: 'Bachelor’s degree.' },
      { when: '2024', title: 'Our first company', text: 'We founded our first company, in AI.' },
      { when: 'January 2025', title: 'Large-scale AI work', text: 'Large-scale model training work with TÜBİTAK, TRUBA and EUMaster4HPC.' },
      { when: '2025', title: 'METU Technopark', text: 'Our legal-software project took us into METU Technopark.' },
      { when: '2026', title: 'Investment', text: 'Our legal-software project received investment.' },
      { when: 'July 2026', title: 'Project sale', text: 'We sold the legal-software project to another company.' },
      { when: 'August 2026', title: 'HatsonTech', text: 'Our main company; we build software and AI products across fields.' },
      { when: '2026', title: 'Caseon AI', text: 'The legal-technology company we founded for contract analysis.' },
      { when: 'Today', title: 'Environment, law and AI', text: 'We build technology products in environment, law, software and AI.' }
    ],
    stats: [
      { value: '2026', label: 'HatsonTech & Caseon AI' },
      { value: 'METU', label: 'Computer Engineering' },
      { value: 'TR · EN', label: 'writing in two languages' }
    ],
    contact: {
      title: 'Get in touch',
      text: 'If you’d like to talk about a project, a possible partnership or our companies, feel free to email me; I’ll reply as soon as I can.',
      cta: 'Send an email'
    },
    sections: {
      about: 'About',
      ventures: 'Companies',
      expertise: 'Interests & work',
      journey: 'Journey',
      writing: 'Writing',
      contact: 'Contact'
    }
  }
}
