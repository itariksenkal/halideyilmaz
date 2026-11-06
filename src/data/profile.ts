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
  company: { name: 'HatsonTech', legal: 'Hatson Teknoloji A.Ş.', url: 'https://hatsontech.com/' }
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
  process: { title: string; steps: { title: string; text: string }[] }
  now: string
  expertise: { icon: string; title: string; text: string }[]
  timeline: { when: string; title: string; text: string }[]
  stats: { value: string; label: string }[]
  contact: { title: string; text: string; cta: string }
  sections: Record<'about' | 'expertise' | 'journey' | 'writing' | 'contact' | 'process', string>
}> = {
  tr: {
    metaTitle: 'Halide Yılmaz — Bilgisayar ve yapay zeka mühendisi',
    metaDescription:
      'Halide Yılmaz: ODTÜ Bilgisayar Mühendisliği mezunu bilgisayar ve yapay zeka mühendisi. Makine öğrenmesi, NLP, veri ve yapay zekâ yönetişimi üzerine yazılar. HatsonTech kurucu ortağı.',
    role: 'Bilgisayar ve yapay zeka mühendisi · HatsonTech kurucu ortağı',
    eyebrow: 'Bilgisayar mühendisliği · Yapay zeka · NLP',
    headline: 'Makine öğrenmesini, insanların güvenebileceği ürünlere dönüştürüyorum.',
    intro:
      'ODTÜ Bilgisayar Mühendisliği mezunuyum. Makine öğrenmesi ve doğal dil işlemeyle gerçekten kullanılan ürünler kuruyorum; modellerin yalnızca çalışmasını değil, doğru, ölçülebilir ve güvenilir olmasını önemsiyorum.',
    status: 'Yeni yazı',
    about: {
      lead: 'Kısaca: makine öğrenmesini ve doğal dil işlemeyi, insanların güvenebileceği ürünlere dönüştürüyorum.',
      points: [
        {
          title: 'Fikirden ürüne',
          text: 'Bir fikri alıp, sağlam bir mühendislik temeliyle uçtan uca ölçeklenebilir bir ürüne dönüştürmekle ilgileniyorum.'
        },
        {
          title: 'Makine öğrenmesi ve NLP',
          text: 'Makine öğrenmesi, doğal dil işleme ve dil modelleriyle çalışıyor; bir modeli denemeden üretime kadar taşıyorum.'
        },
        {
          title: 'Güvenilir, ölçülebilir AI',
          text: 'Modellerin yalnızca çalışmasını değil; doğru, ölçülebilir ve güvenilir olmasını önemsiyorum.'
        }
      ]
    },
    focus: [
      'Bilgisayar Mühendisliği',
      'Sistem Mimarisi',
      'Büyük Dil Modelleri',
      'Doğal Dil İşleme',
      'RAG & Semantik Arama',
      'Ürün Vizyonu',
      'Girişimcilik'
    ],
    process: {
      title: 'Fikirden ürüne, üç adımda',
      steps: [
        { title: 'Uyarla', text: 'Önce veriyi ve modeli ele aldığım probleme uyarlıyorum.' },
        { title: 'Bağla', text: 'Cevapları RAG ile gerçek kaynaklara bağlayıp güvenilir hâle getiriyorum.' },
        { title: 'İzle', text: 'Modeli üretime taşıyıp izlenebilir ve ölçeklenebilir kılıyorum.' }
      ]
    },
    now: 'Bugünlerde bunu HatsonTech’te yapıyorum — Türkçe hukuk diline özel yapay zeka sistemleri üzerinde çalışıyorum.',
    expertise: [
      {
        icon: 'brain',
        title: 'Büyük Dil Modelleri',
        text: 'Türkçe hukuk diline göre ince ayar yapılmış modeller eğitiyor ve üretime alıyorum.'
      },
      {
        icon: 'text',
        title: 'Doğal Dil İşleme',
        text: 'Türkçe ve çok dilli metni anlama: sınıflandırma, çıkarım ve anlam temelli işleme.'
      },
      {
        icon: 'layers',
        title: 'RAG',
        text: 'Modelin uydurmasını engelleyip cevapları gerçek belgelere dayandıran getirim mimarileri.'
      },
      {
        icon: 'search',
        title: 'Semantik Arama & Vektör DB',
        text: 'Anahtar kelime değil anlam temelli, geniş arşivlerde isabetli ve hızlı arama.'
      },
      {
        icon: 'network',
        title: 'MCP & Ajan Sistemleri',
        text: 'Model Context Protocol ile araç kullanan ve akıllı yönlendirme yapan ajan mimarileri.'
      },
      {
        icon: 'server',
        title: 'Model Eğitimi & MLOps',
        text: 'Büyük ölçekli altyapıda eğitim, ince ayar, izleme ve sürekli dağıtım.'
      }
    ],
    timeline: [
      {
        when: 'Eğitim',
        title: 'ODTÜ Bilgisayar Mühendisliği',
        text: 'Orta Doğu Teknik Üniversitesi Bilgisayar Mühendisliği’nde algoritmalar, bilgisayar bilimleri ve sistem tasarımı üzerine sağlam bir mühendislik temeli edindim.'
      },
      {
        when: 'Deneyim',
        title: 'Bilgisayar ve yapay zeka mühendisliği',
        text: 'Bilgisayar ve yapay zeka alanında mühendislik deneyimi biriktirdim; sistem mimarisi ve ürün geliştirme üzerine çalıştım.'
      },
      {
        when: 'Fikir',
        title: 'İhtiyaçtan ürün fikrine',
        text: 'Hukuk alanındaki gerçek bir ihtiyaçtan yola çıkarak bir sorunu, hukuk profesyonellerine değer katacak bir ürün fikrine dönüştürdüm.'
      },
      {
        when: '2024',
        title: 'HatsonTech’in kuruluşu',
        text: 'Ankara ODTÜ Teknokent’te Hatson Teknoloji A.Ş.’yi kurucu ortak olarak hayata geçirdim. Hedef: Türkçe’ye odaklı yapay zeka ürünleri.'
      },
      {
        when: 'Bugün',
        title: 'Türkçe hukuk için yapay zeka',
        text: 'Türkçe hukuk diline özel LLM ve RAG mimarileri geliştiriyor, kurucu ortağım İsmail Tarık Şenkal ile ekibi büyütüyorum.'
      }
    ],
    stats: [
      { value: '2024', label: 'HatsonTech kuruluşu' },
      { value: 'ODTÜ', label: 'Bilgisayar Mühendisliği' },
      { value: 'TR · EN', label: 'iki dilde yazılar' }
    ],
    contact: {
      title: 'Yapay zeka, ürün ya da iş birliği konuşalım',
      text: 'Yapay zeka, ürün ya da olası bir iş birliği hakkında konuşmak isterseniz yazmaktan çekinmeyin.',
      cta: 'E-posta gönder'
    },
    sections: {
      about: 'Hakkımda',
      process: 'Nasıl çalışıyorum',
      expertise: 'Uzmanlık alanları',
      journey: 'Yolculuk',
      writing: 'Yazılar',
      contact: 'İletişim'
    }
  },
  en: {
    metaTitle: 'Halide Yılmaz — Computer and AI engineer',
    metaDescription:
      'Halide Yılmaz: computer and AI engineer, METU Computer Engineering graduate. Writing on machine learning, NLP, data and AI governance. Co-founder of HatsonTech.',
    role: 'Computer and AI engineer · Co-founder at HatsonTech',
    eyebrow: 'Computer engineering · AI · NLP',
    headline: 'I turn machine learning into products people can trust.',
    intro:
      'I’m a METU Computer Engineering graduate. I build genuinely useful products with machine learning and natural language processing, and I care that models are not just working but accurate, measurable and reliable.',
    status: 'New post',
    about: {
      lead: 'In short: I turn machine learning and natural language processing into products people can rely on.',
      points: [
        {
          title: 'From idea to product',
          text: 'I care about taking an idea and turning it into an end-to-end, scalable product on a solid engineering foundation.'
        },
        {
          title: 'Machine learning and NLP',
          text: 'I work with machine learning, natural language processing and language models — carrying a model from experiment to production.'
        },
        {
          title: 'Reliable, measurable AI',
          text: 'I care that models don’t just work, but are accurate, measurable and trustworthy.'
        }
      ]
    },
    focus: [
      'Computer Engineering',
      'System Architecture',
      'Large Language Models',
      'Natural Language Processing',
      'RAG & Semantic Search',
      'Product Vision',
      'Entrepreneurship'
    ],
    process: {
      title: 'From idea to product, in three steps',
      steps: [
        { title: 'Adapt', text: 'First I adapt the data and the model to the problem at hand.' },
        { title: 'Ground', text: 'Then I ground the answers in real sources with RAG to make them reliable.' },
        { title: 'Monitor', text: 'Finally I move the model into production and keep it observable and scalable.' }
      ]
    },
    now: 'These days I do this at HatsonTech — working on AI systems purpose-built for the Turkish legal language.',
    expertise: [
      {
        icon: 'brain',
        title: 'Large Language Models',
        text: 'I train and deploy models fine-tuned to the Turkish legal language.'
      },
      {
        icon: 'text',
        title: 'Natural Language Processing',
        text: 'Understanding Turkish and multilingual text: classification, inference and meaning-based processing.'
      },
      {
        icon: 'layers',
        title: 'RAG',
        text: 'Retrieval architectures that ground answers in real documents and stop the model from making things up.'
      },
      {
        icon: 'search',
        title: 'Semantic Search & Vector DB',
        text: 'Meaning-based rather than keyword search — precise, fast retrieval across large archives.'
      },
      {
        icon: 'network',
        title: 'MCP & Agent Systems',
        text: 'Agent architectures that use tools and route intelligently via the Model Context Protocol.'
      },
      {
        icon: 'server',
        title: 'Model Training & MLOps',
        text: 'Training, fine-tuning, monitoring and continuous deployment on large-scale infrastructure.'
      }
    ],
    timeline: [
      {
        when: 'Education',
        title: 'METU Computer Engineering',
        text: 'At Middle East Technical University’s Computer Engineering department I built a solid foundation in algorithms, computer science and system design.'
      },
      {
        when: 'Experience',
        title: 'Computer and AI engineering',
        text: 'I gained engineering experience in computing and artificial intelligence, working on system architecture and product development.'
      },
      {
        when: 'Idea',
        title: 'From a real need to a product idea',
        text: 'Starting from a real need in the legal domain, I turned a problem into a product idea that would add value for legal professionals.'
      },
      {
        when: '2024',
        title: 'Founding HatsonTech',
        text: 'I co-founded Hatson Teknoloji A.Ş. at METU Technopark in Ankara, with one goal: AI products focused on Turkish.'
      },
      {
        when: 'Today',
        title: 'AI for Turkish law',
        text: 'I build LLM and RAG architectures for the Turkish legal language and grow the team together with my co-founder İsmail Tarık Şenkal.'
      }
    ],
    stats: [
      { value: '2024', label: 'HatsonTech founded' },
      { value: 'METU', label: 'Computer Engineering' },
      { value: 'TR · EN', label: 'writing in two languages' }
    ],
    contact: {
      title: 'Let’s talk AI, products or collaboration',
      text: 'If you’d like to talk about artificial intelligence, products or a possible collaboration, don’t hesitate to write.',
      cta: 'Send an email'
    },
    sections: {
      about: 'About',
      process: 'How I work',
      expertise: 'Expertise',
      journey: 'Journey',
      writing: 'Writing',
      contact: 'Contact'
    }
  }
}
