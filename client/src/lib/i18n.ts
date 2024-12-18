import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hero: {
        title: "Welcome to AIConsult Hub",
        subtitle: "Your Gateway to Exclusive AI Solutions"
      },
      services: {
        aiTools: "AI & Exclusive Tools",
        globalAccess: "Global Digital Access",
        digitalSolutions: "Digital Solutions",
        businessCareer: "Business & Career Development",
        languageEducation: "Language & Education"
      },
      blog: {
        premiumContent: "Exclusive Content",
        subscribe: "Subscribe to Access",
        locked: "This content is locked"
      },
      nav: {
        home: "Home",
        blog: "Blog",
        services: "Services",
        login: "Login"
      }
    }
  },
  fr: {
    translation: {
      hero: {
        title: "Bienvenue à AIConsult Hub",
        subtitle: "Votre Passerelle vers des Solutions IA Exclusives"
      },
      services: {
        aiTools: "Outils IA & Exclusifs",
        globalAccess: "Accès Numérique Mondial",
        digitalSolutions: "Solutions Numériques",
        businessCareer: "Développement Professionnel & Carrière",
        languageEducation: "Langues & Éducation"
      },
      blog: {
        premiumContent: "Contenu Exclusif",
        subscribe: "S'abonner pour Accéder",
        locked: "Ce contenu est verrouillé"
      },
      nav: {
        home: "Accueil",
        blog: "Blog",
        services: "Services",
        login: "Connexion"
      }
    }
  },
  zh: {
    translation: {
      hero: {
        title: "欢迎来到AIConsult Hub",
        subtitle: "您的专属AI解决方案门户"
      },
      services: {
        aiTools: "AI和专属工具",
        globalAccess: "全球数字访问",
        digitalSolutions: "数字解决方案",
        businessCareer: "商业与职业发展",
        languageEducation: "语言与教育"
      },
      blog: {
        premiumContent: "专属内容",
        subscribe: "订阅访问",
        locked: "此内容已锁定"
      },
      nav: {
        home: "首页",
        blog: "博客",
        services: "服务",
        login: "登录"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
