import type { Locale } from "@/lib/i18n";

export interface HomeMessages {
  title: string;
  aboutTitle: string;
  techStackTitle: string;
  statisticTitle: string;
}

export interface ProjectsMessages {
  title: string;
  description: string;
  coreTitle: string;
  sideTitle: string;
}

export interface ArticlesMessages {
  title: string;
  description: string;
  seriesTitle: string;
  categoriesTitle: string;
  articlesTitle: string;
}

export interface VaultMessages {
  hint: string;
  passphraseLabel: string;
  passphrasePlaceholder: string;
  unlock: string;
  unlocking: string;
}

export interface PageMessages {
  home: HomeMessages;
  projects: ProjectsMessages;
  articles: ArticlesMessages;
  vault: VaultMessages;
  categoryDescription: (category: string) => string;
  seriesDescription: (series: string) => string;
}

export const messages: Record<Locale, PageMessages> = {
  en_us: {
    home: {
      title: "Surfen An",
      aboutTitle: "About",
      techStackTitle: "Tech Stack",
      statisticTitle: "Statistic",
    },
    projects: {
      title: "My Projects",
      description: "Keep track of my ideas and project development progress",
      coreTitle: "Experience",
      sideTitle: "Side Projects",
    },
    articles: {
      title: "Blog sharing",
      description:
        "Share front-end, back-end, full-stack development and other articles from time to time",
      seriesTitle: "Series",
      categoriesTitle: "Categories",
      articlesTitle: "Articles",
    },
    vault: {
      hint: "This document is encrypted. Enter the passphrase to view it.",
      passphraseLabel: "Passphrase",
      passphrasePlaceholder: "Passphrase used when encrypting",
      unlock: "Unlock",
      unlocking: "Decrypting…",
    },
    categoryDescription: (category) =>
      `Exploring ${category} insights, lessons, and discoveries from my software engineering journey.`,
    seriesDescription: (series) =>
      `Deep dive into ${series} a curated series from my software engineering journey.`,
  },
  zh_cn: {
    home: {
      title: "Surfen An",
      aboutTitle: "关于",
      techStackTitle: "技术栈",
      statisticTitle: "统计",
    },
    projects: {
      title: "我的项目",
      description: "记录我的想法和项目开发进度",
      coreTitle: "经历",
      sideTitle: "副项目",
    },
    articles: {
      title: "博客分享",
      description: "不定期分享前端、后端、全栈开发等文章",
      seriesTitle: "系列",
      categoriesTitle: "分类",
      articlesTitle: "文章",
    },
    vault: {
      hint: "这份文档已加密，输入口令以查看内容。",
      passphraseLabel: "口令",
      passphrasePlaceholder: "输入加密时设置的口令",
      unlock: "解锁",
      unlocking: "解密中…",
    },
    categoryDescription: (category) =>
      `探索 ${category} 的见解、教训和发现，从我的软件工程之旅中。`,
    seriesDescription: (series) =>
      `深入探讨 ${series} 系列，从我的软件工程之旅中精选。`,
  },
  zh_tw: {
    home: {
      title: "Surfen An",
      aboutTitle: "關於",
      techStackTitle: "技術棧",
      statisticTitle: "統計",
    },
    projects: {
      title: "我的项目",
      description: "记录我的想法和项目开发进度",
      coreTitle: "經歷",
      sideTitle: "副專案",
    },
    articles: {
      title: "博客分享",
      description: "不定期分享前端、后端、全栈开发等文章",
      seriesTitle: "系列",
      categoriesTitle: "分类",
      articlesTitle: "文章",
    },
    vault: {
      hint: "這份文件已加密，輸入口令以查看內容。",
      passphraseLabel: "口令",
      passphrasePlaceholder: "輸入加密時設定的口令",
      unlock: "解鎖",
      unlocking: "解密中…",
    },
    categoryDescription: (category) =>
      `探索 ${category} 的见解、教训和发现，从我的软件工程之旅中。`,
    seriesDescription: (series) =>
      `深入探讨 ${series} 系列，从我的软件工程之旅中精选。`,
  },
  ja_jp: {
    home: {
      title: "Surfen An",
      aboutTitle: "プロフィール",
      techStackTitle: "技術スタック",
      statisticTitle: "統計",
    },
    projects: {
      title: "私のプロジェクト",
      description: "私のアイデアとプロジェクト開発の進捗を記録しています",
      coreTitle: "経歴",
      sideTitle: "サイドプロジェクト",
    },
    articles: {
      title: "ブログ共有",
      description: "不定期分享前端、後端、全スタック開発等の記事",
      seriesTitle: "シリーズ",
      categoriesTitle: "カテゴリー",
      articlesTitle: "記事",
    },
    vault: {
      hint: "この文書は暗号化されています。パスフレーズを入力して内容を表示してください。",
      passphraseLabel: "パスフレーズ",
      passphrasePlaceholder: "暗号化時に設定したパスフレーズ",
      unlock: "解除",
      unlocking: "復号中…",
    },
    categoryDescription: (category) => `${category} に関する気づきや学びを探ります。`,
    seriesDescription: (series) =>
      `「${series}」 シリーズを深掘りし、私のソフトウェアエンジニアリングの旅から選び抜かれた内容をお届けします。`,
  },
  fr_fr: {
    home: {
      title: "Surfen An",
      aboutTitle: "À propos",
      techStackTitle: "Technologie",
      statisticTitle: "Statistiques",
    },
    projects: {
      title: "Mes projets",
      description: "Enregistre mes idées et mon progresse dans le développement de projets",
      coreTitle: "Parcours",
      sideTitle: "projets secondaires",
    },
    articles: {
      title: "Blog partagé",
      description: "Partage des articles sur le développement web, backend, full stack, etc.",
      seriesTitle: "Séries",
      categoriesTitle: "Catégories",
      articlesTitle: "Articles",
    },
    vault: {
      hint: "Ce document est chiffré. Saisissez la phrase secrète pour le lire.",
      passphraseLabel: "Phrase secrète",
      passphrasePlaceholder: "Phrase secrète utilisée lors du chiffrement",
      unlock: "Déverrouiller",
      unlocking: "Déchiffrement…",
    },
    categoryDescription: (category) =>
      `Explore les idées, les leçons et les découvertes liées à ${category}, de mon parcours en ingénierie de logiciels.`,
    seriesDescription: (series) =>
      `Explore la série ${series} de mon parcours en ingénierie de logiciels.`,
  },
  es_es: {
    home: {
      title: "Surfen An",
      aboutTitle: "Sobre",
      techStackTitle: "Pilha de tecnologia",
      statisticTitle: "Estatísticas",
    },
    projects: {
      title: "Mis proyectos",
      description: "Registro de mis ideas y progreso en el desarrollo de proyectos",
      coreTitle: "Experiencia",
      sideTitle: "Proyectos secundarios",
    },
    articles: {
      title: "Blog compartido",
      description: "Comparto artículos sobre desarrollo web, backend, full stack, etc.",
      seriesTitle: "Series",
      categoriesTitle: "Categorías",
      articlesTitle: "Artículos",
    },
    vault: {
      hint: "Este documento está cifrado. Introduce la contraseña para verlo.",
      passphraseLabel: "Contraseña",
      passphrasePlaceholder: "Contraseña usada al cifrar",
      unlock: "Desbloquear",
      unlocking: "Descifrando…",
    },
    categoryDescription: (category) =>
      `Explora la categoría ${category} de mi viaje en ingeniería de software.`,
    seriesDescription: (series) =>
      `Explora la serie ${series} de mi viaje en ingeniería de software.`,
  },
  pt_pt: {
    home: {
      title: "Surfen An",
      aboutTitle: "Sobre",
      techStackTitle: "Pilha de tecnologia",
      statisticTitle: "Estatísticas",
    },
    projects: {
      title: "Meus projetos",
      description: "Regista as minhas ideias e o meu progresso no desenvolvimento de projetos",
      coreTitle: "Experiência",
      sideTitle: "projetos paralelos",
    },
    articles: {
      title: "Blog partilhado",
      description: "Partilha de artigos sobre desenvolvimento web, backend, full stack, etc.",
      seriesTitle: "Séries",
      categoriesTitle: "Categorias",
      articlesTitle: "Artigos",
    },
    vault: {
      hint: "Este documento está encriptado. Introduza a palavra-passe para o ver.",
      passphraseLabel: "Palavra-passe",
      passphrasePlaceholder: "Palavra-passe usada na encriptação",
      unlock: "Desbloquear",
      unlocking: "A desencriptar…",
    },
    categoryDescription: (category) =>
      `Explore as ideias, as lições e as descobertas relacionadas a ${category}, do meu percurso na engenharia de software.`,
    seriesDescription: (series) =>
      `Explore a série ${series} do meu percurso na engenharia de software.`,
  },
  ru: {
    home: {
      title: "Surfen An",
      aboutTitle: "Обо мне",
      techStackTitle: "Технологии",
      statisticTitle: "Статистика",
    },
    projects: {
      title: "Мои проекты",
      description: "Записываю свои идеи и прогресс в разработке проектов",
      coreTitle: "Опыт",
      sideTitle: "побочные проекты",
    },
    articles: {
      title: "Блог",
      description: "Нерегулярно делюсь статьями о веб-разработке",
      seriesTitle: "Серия",
      categoriesTitle: "Категория",
      articlesTitle: "Статьи",
    },
    vault: {
      hint: "Этот документ зашифрован. Введите парольную фразу, чтобы просмотреть содержимое.",
      passphraseLabel: "Парольная фраза",
      passphrasePlaceholder: "Фраза, указанная при шифровании",
      unlock: "Разблокировать",
      unlocking: "Расшифровка…",
    },
    categoryDescription: (category) =>
      `Исследуйте мои статьи и идеи о ${category} и их практические применения.`,
    seriesDescription: (series) =>
      `Исследуйте мои статьи и идеи о ${series} и их практические применения.`,
  },
  ar_sa: {
    home: {
      title: "Surfen An",
      aboutTitle: "عني",
      techStackTitle: "التقنيات",
      statisticTitle: "الإحصائيات",
    },
    projects: {
      title: "مشاريعي",
      description: "تسجيل أفكاري وتقدمي في تطوير المشاريع",
      coreTitle: "الخبرة",
      sideTitle: "المشاريع الجانبية",
    },
    articles: {
      title: "مشاركة المدونة",
      description: "يتم مشاركة المقالات المختلفة بشكل غير منتظم",
      seriesTitle: "السلسلة",
      categoriesTitle: "التصنيف",
      articlesTitle: "المقالات",
    },
    vault: {
      hint: "هذا المستند مشفّر. أدخل عبارة المرور لعرض المحتوى.",
      passphraseLabel: "عبارة المرور",
      passphrasePlaceholder: "عبارة المرور المستخدمة عند التشفير",
      unlock: "فتح",
      unlocking: "جارٍ فك التشفير…",
    },
    categoryDescription: (category) =>
      `استكشف آراء ودروس واكتشافاتي عن ${category} في رحلتي البرمجية`,
    seriesDescription: (series) => `تحديثات عن ${series} في رحلتي البرمجية`,
  },
};

export function getMessages(locale: Locale): PageMessages {
  return messages[locale];
}
