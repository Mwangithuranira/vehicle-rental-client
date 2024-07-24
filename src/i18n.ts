import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

interface TranslationResources {
  [language: string]: { translation: { [key: string]: string } };
}

const resources: TranslationResources = {
  en: {
    translation: {
      search: "Search",
      deals: "Deals",
      tips: "Tips",
      faqs: "FAQs",
      location: "Location",
      reviews: "Reviews",
      companyStatistics: "Company Statistics",
      loginRegister: "Login/Register",
      choseLanguage: "Choose Language",
      toggleMode: "Toggle Mode",
      logoText: "Kenya's Best Car Rental"
    }
  },
  sw: {
    translation: {
      search: "Tafuta",
      deals: "Mikataba",
      tips: "Vidokezo",
      faqs: "Maswali",
      location: "Mahali",
      reviews: "Mapitio",
      companyStatistics: "Takwimu za Kampuni",
      loginRegister: "Ingia/Sajili",
      choseLanguage: "Chagua Lugha",
      toggleMode: "Badilisha Hali",
      logoText: "Gari Bora Zaidi za Kukodisha Kenya"
    }
  },
  fr: {
    translation: {
      search: "Chercher",
      deals: "Offres",
      tips: "Conseils",
      faqs: "FAQ",
      location: "Emplacement",
      reviews: "Avis",
      companyStatistics: "Statistiques de l'entreprise",
      loginRegister: "Connexion/S'inscrire",
      choseLanguage: "Choisir la langue",
      toggleMode: "Mode sombre",
      logoText: "Le meilleur de la location de voitures au Kenya"
    }
  },
  es: {
    translation: {
      search: "Buscar",
      deals: "Ofertas",
      tips: "Consejos",
      faqs: "FAQ",
      location: "Ubicación",
      reviews: "Reseñas",
      companyStatistics: "Estadísticas de la empresa",
      loginRegister: "Iniciar sesión/Registrarse",
      choseLanguage: "Elegir idioma",
      toggleMode: "Modo oscuro",
      logoText: "El mejor alquiler de coches de Kenia"
    }
  },
  de: {
    translation: {
      search: "Suchen",
      deals: "Angebote",
      tips: "Tipps",
      faqs: "FAQ",
      location: "Standort",
      reviews: "Bewertungen",
      companyStatistics: "Unternehmensstatistiken",
      loginRegister: "Anmelden/Registrieren",
      choseLanguage: "Sprache wählen",
      toggleMode: "Dunkelmodus",
      logoText: "Das beste Autovermietung in Kenia"
    }
  },
  zh: {
    translation: {
      search: "搜索",
      deals: "交易",
      tips: "提示",
      faqs: "常见问题",
      location: "位置",
      reviews: "评论",
      companyStatistics: "公司统计",
      loginRegister: "登录/注册",
      choseLanguage: "选择语言",
      toggleMode: "切换模式",
      logoText: "肯尼亚最好的租车服务"
    }
  },
  ja: {
    translation: {
      search: "検索",
      deals: "取引",
      tips: "ヒント",
      faqs: "FAQ",
      location: "場所",
      reviews: "レビュー",
      companyStatistics: "会社の統計",
      loginRegister: "ログイン/登録",
      choseLanguage: "言語を選択",
      toggleMode: "モード切替",
      logoText: "ケニアで最高のカーレンタル"
    }
  },
  ko: {
    translation: {
      search: "검색",
      deals: "거래",
      tips: "팁",
      faqs: "FAQ",
      location: "위치",
      reviews: "리뷰",
      companyStatistics: "회사 통계",
      loginRegister: "로그인/등록",
      choseLanguage: "언어 선택",
      toggleMode: "모드 전환",
      logoText: "케냐 최고의 렌터카"
    }
  },
  it: {
    translation: {
      search: "Cerca",
      deals: "Offerte",
      tips: "Suggerimenti",
      faqs: "FAQ",
      location: "Posizione",
      reviews: "Recensioni",
      companyStatistics: "Statistiche aziendali",
      loginRegister: "Accedi/Registrati",
      choseLanguage: "Scegli la lingua",
      toggleMode: "Modalità scura",
      logoText: "Il miglior noleggio auto in Kenya"
    }
  },
  pt: {
    translation: {
      search: "Pesquisar",
      deals: "Ofertas",
      tips: "Dicas",
      faqs: "FAQ",
      location: "Localização",
      reviews: "Avaliações",
      companyStatistics: "Estatísticas da empresa",
      loginRegister: "Entrar/Registrar",
      choseLanguage: "Escolha o idioma",
      toggleMode: "Modo escuro",
      logoText: "O melhor aluguel de carros no Quênia"
    }
  },
  ru: {
    translation: {
      search: "Поиск",
      deals: "Сделки",
      tips: "Советы",
      faqs: "FAQ",
      location: "Местоположение",
      reviews: "Отзывы",
      companyStatistics: "Статистика компании",
      loginRegister: "Войти/Регистрация",
      choseLanguage: "Выбрать язык",
      toggleMode: "Темный режим",
      logoText: "Лучший прокат автомобилей в Кении"
    }
  },
  ar: {
    translation: {
      search: "بحث",
      deals: "صفقات",
      tips: "نصائح",
      faqs: "الأسئلة الشائعة",
      location: "موقع",
      reviews: "مراجعات",
      companyStatistics: "إحصائيات الشركة",
      loginRegister: "تسجيل الدخول / تسجيل",
      choseLanguage: "اختر اللغة",
      toggleMode: "تبديل الوضع",
      logoText: "أفضل تأجير سيارات في كينيا"
    }
  },
  hi: {
    translation: {
      search: "खोज",
      deals: "सौदे",
      tips: "टिप्स",
      faqs: "सामान्य प्रश्न",
      location: "स्थान",
      reviews: "समीक्षा",
      companyStatistics: "कंपनी के आंकड़े",
      loginRegister: "लॉग इन/रजिस्टर",
      choseLanguage: "भाषा चुनें",
      toggleMode: "मोड बदलें",
      logoText: "केनिया की सबसे अच्छी कार रेंटल"
    }
  },
  bn: {
    translation: {
      search: "অনুসন্ধান",
      deals: "ডিল",
      tips: "টিপস",
      faqs: "প্রশ্নাবলী",
      location: "অবস্থান",
      reviews: "রিভিউ",
      companyStatistics: "কোম্পানির পরিসংখ্যান",
      loginRegister: "লগ ইন/নিবন্ধন",
      choseLanguage: "ভাষা নির্বাচন করুন",
      toggleMode: "মোড টগল করুন",
      logoText: "কেনিয়ার সেরা গাড়ি ভাড়া"
    }
  },
  ur: {
    translation: {
      search: "تلاش",
      deals: "سودے",
      tips: "مشورے",
      faqs: "معمولی سوالات",
      location: "مقام",
      reviews: "جائزے",
      companyStatistics: "کمپنی کے اعداد و شمار",
      loginRegister: "لاگ ان / رجسٹر",
      choseLanguage: "زبان منتخب کریں",
      toggleMode: "موڈ چیینج کریں",
      logoText: "کینیا میں بہترین کار رینٹل"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
