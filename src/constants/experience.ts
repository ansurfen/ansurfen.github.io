import type { Experience, ExperienceTexts } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

export const experienceTexts: Record<Locale, ExperienceTexts> = {
    en_us: {
        name: "Experience",
        showMore: "Show more",
        showLess: "Show less"
    },
    zh_cn: {
        name: "经历",
        showMore: "展开",
        showLess: "收起"
    },
    zh_tw: {
        name: "經歷",
        showMore: "展開",
        showLess: "收起"
    },
    ja_jp: {
        name: "経験",
        showMore: "展開",
        showLess: "閉じる"
    },
    fr_fr: {
        name: "Expérience",
        showMore: "Afficher plus",
        showLess: "Afficher moins"
    },
    es_es: {
        name: "Experiencia",
        showMore: "Mostrar más",
        showLess: "Mostrar menos"
    },
    pt_pt: {
        name: "Experiência",
        showMore: "Mostrar mais",
        showLess: "Mostrar menos"
    },
    ru: {
        name: "Опыт",
        showMore: "Показать больше",
        showLess: "Показать меньше"
    },
    ar_sa: {
        name: "الخبرة",
        showMore: "إظهار المزيد",
        showLess: "إخفاء المزيد"
    }
};

export const enUS: Experience[] = [
    {
        title: "University",
        positions: [
            {
                subtitle: "Backend Developer / Golang Developer",
                year: "09.2021 - 06.2025",
                description: `I met Golang in the first semester of my freshman year. 
Since then, my technical stack has been almost entirely based on Go language.

As a Gopher, I learned and used the first Web development stack as Gin + Gorm.
Through this experience, it allowed me to quickly get started with various different language frameworks (such as: SpringBoot, Django, Flask, Express, Koa, etc.) and their third-party libraries.

Later, I started to study microservices and researched various modern technologies and toolchains (such as: GRPC, ProtoBuf, ETCD, Grafana, Prometheus, Docker, etc.).
I feel like I've learned quite a lot, but it's a bit regrettable that I didn't get to fully build a complete microservices project myself in the end.
`,
                tags: ["Backend Developer", "Golang", "Go language", "Container", "Microservices", "Cloud Native"]
            },
            {
                subtitle: "Frontend Developer",
                year: "05.2022 - 06.2025",
                description: `Like backend development, my encounter with frontend was also full of serendipitous moments.
If I had to pinpoint a starting point, it would be a competition and a group chat.

Thanks to some experiences in high school, I gained basic knowledge of JQuery and the frontend trifecta (HTML/CSS/JS).
So I jumped straight into a simple project using Vue framework and its ecosystem (Pinia, Vite, Vue Router, Vuex).

Driven by interest in TSX, I later learned React and its toolchain.

Subsequently, my curiosity about mobile development led me to discover Flutter and its "write once, run anywhere" capability,
which eventually became the main technology stack for my graduation project.`,
                tags: ["Frontend Developer", "JQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                "subtitle": "My Journey",
                "year": "09.2021 - 12.2022",
                "description": `During university, I learned many technologies out of curiosity, though looking back, most were just surface-level explorations without practical project implementation.
However, the learning process greatly satisfied my technical curiosity at the time.
Due to length limitations, please visit my article [《Past, Present, Future》](./articles/past-now-future) for details.`,
                "tags": ["Retrospective", "Memories", "Future", "Graduate Entrance Exam", "Blockchain", "Smart Contracts", "Solidity", "Unreal 5", "Quantitative Trading", "Databases", "Operating Systems", "Deep Learning", "Desktop Development", "Game Development", "Minecraft Modding"]
            }
        ]
    },
    {
        title: "Internship / First Job",
        positions: [
            {
                subtitle: "Full Stack Developer",
                year: "03.2025 - Present",
                description: `
- ♦ Developed and maintained mini-game server-side services: framework iteration, multi-channel login, and APIs for clients and operations backends.
- ♦ Maintained a TypeScript-based in-house CI/CD platform with automated builds, deployments, and hook triggers.
- ♦ Built an AIGC art batch generation and image-selection delivery system for mini-game production, with keyword/theme-driven text-to-image, async scheduling, WebSocket progress sync, retries, rate limiting, and containerized deployment.
- ♦ Contributed to a GitLab Merge Request AI code review service: webhook integration, diff chunk review, result write-back, and notification distribution.
- ♦ Developed complex admin dashboards for operations management, ROI estimation, and business management, including drag-and-drop task assignment and OKR alignment tree visualizations.
- ♦ Designed and built an intelligent assistant for the task management system with RAG retrieval, OA integration for auto task creation/assignment, and department lookup.
                `,
                tags: ["Full Stack", "NodeJS", "TypeScript", "Vue", "koa", "express", "mysql", "mongo", "redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "element-plus", "Docker"]
            }
        ]
    }
] as const;

export const zhCN: Experience[] = [
    {
        title: "大学",
        positions: [
            {
                subtitle: "后端开发/ Golang 开发",
                year: "09.2021 - 06.2025",
                description: `我与 Golang 的相识始于大一上学期末的寒假。 
从此， 我大部分的技术栈几乎都围绕 Go 语言展开。

同大部分 Gopher 一样，我学习和使用首个 Web 开发的技术栈就是 Gin + Gorm。 通过这个经历， 让我往后能够直接上手各种不同的语言框架(如：SpringBoot, Django, Flask, Express, Koa 等)以及其第三方库。

再后来开始接触微服务，陆陆续续研究起了 GRPC、ProtoBuf、ETCD、Grafana、Prometheus、Docker 等现代化技术及工具链。
感觉还是学到挺多东西的，不过比较可惜的是后面没有自己完整的搭建一套微服务项目。`,
                tags: ["后端开发", "Golang", "Go语言", "容器", "微服务", "云原生"]
            },
            {
                subtitle: "前端开发",
                year: "05.2022 - 06.2025",
                description: `同后端开发一样，接触前端也同样充斥着各种机缘巧合。
如果非要说一个起点的话，应该是一次比赛和一个群聊吧。

由于高中的一些经历，使我对编写JQuery以及前端三件套（HTML/CSS/JS）有一定的了解。
因此，我就找了个简单的项目直接上手了 Vue 框架及其工具链 （如：Pinia、Vite、Vue Router、Vuex）。

出于对 TSX 的兴趣，我还学习了 React 及其工具链。

再后来，由于对移动端开发的兴趣，得知了 Flutter 这个技术栈以及它 “一次编写，多端运行” 的特性。
它也因此成为了我毕业设计的主要技术栈。
`,
                tags: ["前端开发", "JQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                subtitle: "心路历程",
                year: "09.2021 - 12.2022",
                description: `在大学期间出于好奇陆陆续续学了挺多东西，虽然回忆起来基本上都是浅尝辄止，没有用他们写出实际的项目。
不过，学习这些项目的过程极大的满足了我当时对技术的好奇心。
由于篇幅过长，请移步我的文章 [《过去，现在，未来》](./articles/past-now-future) 查看详情。
`,
                tags: ["总结", "回忆", "展望", "考研", "区块链", "智能合约", "Solidity", "虚幻5", "量化交易", "数据库", "操作系统", "深度学习", "桌面开发", "游戏开发", "我的世界模组"]
            },
        ]
    },
    {
        title: "实习 / 第一份工作",
        positions: [
            {
                subtitle: "全栈开发工程师",
                year: "03.2025 - 至今",
                description: `
- ♦ 参与小游戏服务端开发与维护，负责框架迭代、多渠道登录、客户端与运营后台接口编写等。
- ♦ 参与基于 TypeScript 自研 CI/CD 平台维护，支持自动构建、部署与钩子触发。
- ♦ 面向小游戏研发的 AIGC 美术批量出图与选片交付系统，支持关键词/主题驱动文生图，并实现异步调度、WebSocket 进度同步、重试、限流与容器化部署。
- ♦ 参与 GitLab Merge Request AI Code Review 服务开发，实现 Webhook 接入、Diff 分片评审、结果回写与通知分发。
- ♦ 负责经营管理、ROI 预估、业务管理等复杂中后台页面开发，涉及拖拽任务分配、OKR 系统对齐树等可视化场景。
- ♦ 负责任务管理系统的智能助手设计与开发，支持 RAG 知识检索、对接 OA 接口自动创建/分配任务、查询部门情况等功能。
                `,
                tags: ["全栈开发", "NodeJS", "TypeScript", "Vue", "koa", "express", "mysql", "mongo", "redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "element-plus", "Docker"]
            }
        ]
    }
] as const;

const zhTW: Experience[] = [
    {
        title: "大學",
        positions: [
            {
                subtitle: "後端開發/ Golang 開發",
                year: "09.2021 - 06.2025",
                description: `我與 Golang 的相識始於大一上學期末的寒假。
從此，我大部分的技術棧幾乎都圍繞 Go 語言展開。

同大部分 Gopher 一樣，我學習和使用的首個 Web 開發技術棧就是 Gin + Gorm。通過這個經歷，讓我往後能夠直接上手各種不同的語言框架（如：SpringBoot、Django、Flask、Express、Koa 等）及其第三方函式庫。

後來開始接觸微服務，陸續研究了 GRPC、ProtoBuf、ETCD、Grafana、Prometheus、Docker 等現代化技術及工具鏈。
感覺還是學到不少東西，不過比較可惜的是後來沒有自己完整搭建一套微服務專案。`,
                tags: ["後端開發", "Golang", "Go語言", "容器", "微服務", "雲端原生"]
            },
            {
                subtitle: "前端開發",
                year: "05.2022 - 06.2025",
                description: `同後端開發一樣，接觸前端也充滿各種機緣巧合。
如果非要說一個起點的話，應該是一次比賽和一個群組聊天吧。

由於高中的一些經歷，使我對編寫 JQuery 以及前端三件套（HTML/CSS/JS）有一定的了解。
因此，我找了個簡單的專案直接上手了 Vue 框架及其工具鏈（如：Pinia、Vite、Vue Router、Vuex）。

出於對 TSX 的興趣，我還學習了 React 及其工具鏈。

後來，由於對行動端開發的興趣，得知了 Flutter 這個技術棧及其「一次編寫，多端運行」的特性。
它也因此成為了我畢業設計的主要技術棧。`,
                tags: ["前端開發", "JQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                subtitle: "心路歷程",
                year: "09.2021 - 12.2022",
                description: `在大學期間出於好奇陸續學了不少技術，雖然回憶起來基本上都是淺嘗輒止，沒有用它們寫出實際的專案。
不過，學習這些技術的過程極大滿足了我當時對技術的好奇心。
由於篇幅過長，請移步我的文章 [《過去，現在，未來》](./articles/past-now-future) 查看詳情。`,
                tags: ["總結", "回憶", "展望", "考研", "區塊鏈", "智能合約", "Solidity", "虛幻5", "量化交易", "資料庫", "作業系統", "深度學習", "桌面開發", "遊戲開發", "Minecraft 模組"]
            },
        ]
    },
    {
        title: "實習 / 第一份工作",
        positions: [
            {
                subtitle: "全棧開發工程師",
                year: "03.2025 - 至今",
                description: `
- ♦ 參與小遊戲服務端開發與維護，負責框架迭代、多渠道登入、客戶端與營運後台介面編寫等。
- ♦ 參與基於 TypeScript 自研 CI/CD 平台維護，支援自動建置、部署與鉤子觸發。
- ♦ 面向小遊戲研發的 AIGC 美術批量出圖與選片交付系統，支援關鍵詞/主題驅動文生圖，並實現非同步調度、WebSocket 進度同步、重試、限流與容器化部署。
- ♦ 參與 GitLab Merge Request AI Code Review 服務開發，實現 Webhook 接入、Diff 分片評審、結果回寫與通知分發。
- ♦ 負責經營管理、ROI 預估、業務管理等複雜中後台頁面開發，涉及拖拽任務分配、OKR 系統對齊樹等可視化場景。
- ♦ 負責任務管理系統的智能助手設計與開發，支援 RAG 知識檢索、對接 OA 介面自動建立/分配任務、查詢部門情況等功能。`,
                tags: ["全棧開發", "NodeJS", "TypeScript", "Vue", "koa", "express", "mysql", "mongo", "redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "element-plus", "Docker"]
            }
        ]
    }
] as const;

export const jaJP: Experience[] = [
    {
        title: "大学",
        positions: [
            {
                subtitle: "バックエンド開発 / Golang 開発",
                year: "09.2021 - 06.2025",
                description: `Golangとの出会いは、大学1年の冬休みに始まりました。
  それ以来、私の技術スタックはほぼGo言語を中心に展開しています。
  
  多くのGopherと同じように、私が最初に学び使ったWeb開発スタックは Gin + Gorm でした。
  この経験により、SpringBoot、Django、Flask、Express、Koaなど、他の多くの言語フレームワークやサードパーティライブラリにもすぐに対応できるようになりました。
  
  その後、マイクロサービスにも触れ始め、GRPC、ProtoBuf、ETCD、Grafana、Prometheus、Dockerなどのモダンな技術やツールチェーンを順に学んできました。
  多くのことを学べたと思いますが、残念ながら完全なマイクロサービスプロジェクトを一から構築することはできませんでした。`,
                tags: ["バックエンド開発", "Golang", "Go言語", "コンテナ", "マイクロサービス", "クラウドネイティブ"]
            },
            {
                subtitle: "フロントエンド開発",
                year: "05.2022 - 06.2025",
                description: `バックエンド開発と同様に、フロントエンドとの出会いも偶然の積み重ねでした。
  出発点を挙げるなら、それはあるコンテストとチャットグループです。
  
  高校時代の経験から、JQueryやHTML/CSS/JSの基本にはある程度慣れていました。
  そのため、簡単なプロジェクトからVueフレームワークとそのツールチェーン（Pinia、Vite、Vue Router、Vuex）に手を出しました。
  
  TSXに興味を持ったことから、Reactとそのエコシステムにも取り組みました。
  
  さらに、モバイル開発への興味から、"一度書けば複数プラットフォームで動作する"という特徴を持つFlutterを知り、卒業制作の主要技術スタックとして採用しました。`,
                tags: ["フロントエンド開発", "JQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                subtitle: "学びの道のり",
                year: "09.2021 - 12.2022",
                description: `大学生活中、好奇心から多くの技術に手を出しましたが、振り返ってみるとほとんどが表面的な学習に留まり、実際のプロジェクトとして形にすることはできませんでした。
  とはいえ、それらを学ぶ過程は、当時の技術への強い興味を十分に満たしてくれました。
  詳細については、私の記事 [《過去、現在、未来》](./articles/past-now-future) をご覧ください。`,
                tags: ["まとめ", "思い出", "展望", "大学院試験", "ブロックチェーン", "スマートコントラクト", "Solidity", "Unreal Engine 5", "クオンツ取引", "データベース", "OS", "ディープラーニング", "デスクトップ開発", "ゲーム開発", "Minecraft Mod"]
            }
        ]
    },
    {
        title: "インターン / 初めての仕事",
        positions: [
            {
                subtitle: "フルスタック開発エンジニア",
                year: "03.2025 - 現在",
                description: `
  - ♦ ミニゲームサーバーサイドの開発・保守に参画。フレームワークの改善、マルチチャネルログイン、クライアントおよび運営バックエンド向け API の実装を担当。
  - ♦ TypeScript ベースの自社 CI/CD プラットフォームの保守に参画。自動ビルド、デプロイ、フックトリガーをサポート。
  - ♦ ミニゲーム向け AIGC 美術の一括生成・選片納品システムを構築。キーワード/テーマ駆動の文生図、非同期スケジューリング、WebSocket による進捗同期、リトライ、レート制限、コンテナ化デプロイを実装。
  - ♦ GitLab Merge Request AI Code Review サービスの開発に参画。Webhook 連携、Diff 分割レビュー、結果の書き戻し、通知配信を実装。
  - ♦ 経営管理、ROI 予測、業務管理などの複雑な管理画面を開発。ドラッグ＆ドロップによるタスク割当、OKR 整合ツリーなどの可視化を担当。
  - ♦ タスク管理システムのインテリジェントアシスタントを設計・開発。RAG による知識検索、OA 連携によるタスクの自動作成・割当、部門情報の照会などを実装。
          `,
                tags: ["フルスタック", "NodeJS", "TypeScript", "Vue", "koa", "express", "mysql", "mongo", "redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "element-plus", "Docker"]
            }
        ]
    }
] as const;

export const frFR: Experience[] = [
    {
        title: "Université",
        positions: [
            {
                subtitle: "Développement Backend / Développement Golang",
                year: "09.2021 - 06.2025",
                description: `J'ai découvert Golang pendant les vacances d'hiver de ma première année universitaire. Depuis, la majorité de ma pile technologique tourne autour de ce langage.
  
  Comme beaucoup de développeurs Golang, j'ai commencé avec le framework web Gin et l'ORM Gorm. Cette expérience m'a permis de m'adapter rapidement à divers frameworks dans d'autres langages (tels que SpringBoot, Django, Flask, Express, Koa) et à leurs bibliothèques tierces.
  
  Par la suite, je me suis intéressé aux microservices, explorant des technologies modernes et des chaînes d'outils telles que GRPC, ProtoBuf, ETCD, Grafana, Prometheus et Docker.
  
  J'ai beaucoup appris, bien que je n'aie pas eu l'occasion de construire un projet complet de microservices moi-même.`,
                tags: ["Développement Backend", "Golang", "Langage Go", "Conteneurs", "Microservices", "Cloud Native"]
            },
            {
                subtitle: "Développement Frontend",
                year: "05.2022 - 06.2025",
                description: `Mon parcours en développement frontend a également été marqué par des événements fortuits. Si je devais identifier un point de départ, ce serait une compétition et une discussion de groupe.
  
  Grâce à certaines expériences au lycée, j'avais une compréhension de base de jQuery et des technologies frontend (HTML/CSS/JS). J'ai donc directement abordé le framework Vue et sa chaîne d'outils (telles que Pinia, Vite, Vue Router, Vuex) avec un projet simple.
  
  Par intérêt pour TSX, j'ai également appris React et sa chaîne d'outils.
  
  Plus tard, motivé par un intérêt pour le développement mobile, j'ai découvert Flutter et sa fonctionnalité "écrire une fois, exécuter partout". Il est ainsi devenu la principale pile technologique de mon projet de fin d'études.`,
                tags: ["Développement Frontend", "jQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                subtitle: "Parcours Personnel",
                year: "09.2021 - 12.2022",
                description: `Pendant l'université, j'ai exploré de nombreuses choses par curiosité. Bien que, rétrospectivement, la plupart aient été superficielles, et je n'ai pas construit de projets concrets avec elles.
  
  Néanmoins, le processus d'apprentissage de ces technologies a grandement satisfait ma curiosité à l'époque.
  
  En raison de la longueur, veuillez consulter mon article [“Passé, Présent, Futur”](./articles/past-now-future) pour plus de détails.`,
                tags: ["Résumé", "Réflexion", "Perspective", "Examen d'entrée aux études supérieures", "Blockchain", "Contrats Intelligents", "Solidity", "Unreal Engine 5", "Trading Quantitatif", "Bases de Données", "Systèmes d'Exploitation", "Apprentissage Profond", "Développement Desktop", "Développement de Jeux", "Mods Minecraft"]
            }
        ]
    },
    {
        title: "Stage / Premier emploi",
        positions: [
            {
                subtitle: "Développeur Full Stack",
                year: "03.2025 - Présent",
                description: `
  - ♦ Développement et maintenance des services serveur de mini-jeux : itération du framework, connexion multi-canal, APIs clients et back-office opérationnel.
  - ♦ Maintenance d'une plateforme CI/CD interne en TypeScript : builds, déploiements et déclenchement par hooks automatisés.
  - ♦ Système AIGC de génération d'assets en lot et de sélection d'images pour mini-jeux : text-to-image par mots-clés/thèmes, planification asynchrone, synchronisation WebSocket, nouvelles tentatives, limitation de débit et déploiement conteneurisé.
  - ♦ Service AI Code Review pour les Merge Requests GitLab : webhooks, revue par fragments de diff, écriture des résultats et distribution des notifications.
  - ♦ Tableaux de bord admin complexes (gestion opérationnelle, estimation ROI, gestion métier) : attribution de tâches par glisser-déposer, arbres d'alignement OKR, etc.
  - ♦ Assistant intelligent pour le système de gestion des tâches : RAG, intégration OA pour création/attribution automatique, consultation des départements.
          `,
                tags: ["Full Stack", "NodeJS", "TypeScript", "Vue", "Koa", "Express", "MySQL", "MongoDB", "Redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "Element Plus", "Docker"]
            }
        ]
    }
] as const;


export const esES: Experience[] = [
    {
        title: "Universidad",
        positions: [
            {
                subtitle: "Desarrollo Backend / Desarrollo Golang",
                year: "09.2021 - 06.2025",
                description: `Descubrí Golang durante las vacaciones de invierno al final de mi primer semestre universitario. Desde entonces, la mayoría de mi stack tecnológico ha girado en torno a este lenguaje.
  
  Como muchos desarrolladores de Golang, comencé con el framework web Gin y el ORM Gorm. Esta experiencia me permitió adaptarme rápidamente a diversos frameworks en otros lenguajes (como SpringBoot, Django, Flask, Express, Koa) y sus bibliotecas de terceros.
  
  Posteriormente, me adentré en los microservicios, explorando tecnologías modernas y cadenas de herramientas como GRPC, ProtoBuf, ETCD, Grafana, Prometheus y Docker.
  
  Aprendí mucho, aunque es una pena que no haya tenido la oportunidad de construir un proyecto completo de microservicios por mi cuenta.`,
                tags: ["Desarrollo Backend", "Golang", "Lenguaje Go", "Contenedores", "Microservicios", "Cloud Native"]
            },
            {
                subtitle: "Desarrollo Frontend",
                year: "05.2022 - 06.2025",
                description: `Mi camino en el desarrollo frontend también estuvo lleno de eventos fortuitos. Si tuviera que señalar un punto de partida, sería una competencia y una conversación grupal.
  
  Gracias a algunas experiencias en la escuela secundaria, tenía una comprensión básica de jQuery y las tecnologías frontend (HTML/CSS/JS). Por lo tanto, abordé directamente el framework Vue y su cadena de herramientas (como Pinia, Vite, Vue Router, Vuex) con un proyecto simple.
  
  Por interés en TSX, también aprendí React y su cadena de herramientas.
  
  Más tarde, motivado por un interés en el desarrollo móvil, descubrí Flutter y su característica de "escribir una vez, ejecutar en todas partes". Así se convirtió en la principal pila tecnológica de mi proyecto de graduación.`,
                tags: ["Desarrollo Frontend", "jQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                subtitle: "Trayectoria Personal",
                year: "09.2021 - 12.2022",
                description: `Durante la universidad, exploré muchas cosas por curiosidad. Aunque, en retrospectiva, la mayoría fueron superficiales y no construí proyectos concretos con ellas.
  
  Sin embargo, el proceso de aprendizaje de estas tecnologías satisfizo en gran medida mi curiosidad en ese momento.
  
  Debido a la extensión, por favor consulte mi artículo [“Pasado, Presente, Futuro”](./articles/past-now-future) para más detalles.`,
                tags: ["Resumen", "Reflexión", "Perspectiva", "Examen de ingreso a posgrado", "Blockchain", "Contratos Inteligentes", "Solidity", "Unreal Engine 5", "Trading Cuantitativo", "Bases de Datos", "Sistemas Operativos", "Aprendizaje Profundo", "Desarrollo de Escritorio", "Desarrollo de Juegos", "Mods de Minecraft"]
            }
        ]
    },
    {
        title: "Pasantía / Primer trabajo",
        positions: [
            {
                subtitle: "Desarrollador Full Stack",
                year: "03.2025 - Presente",
                description: `
  - ♦ Desarrollo y mantenimiento de servicios de mini-juegos: iteración del framework, inicio de sesión multicanal y APIs para clientes y back-office operativo.
  - ♦ Mantenimiento de plataforma CI/CD propia en TypeScript con builds, despliegues y disparadores por hooks automatizados.
  - ♦ Sistema AIGC de generación masiva de arte y entrega de selección de imágenes: text-to-image por palabras clave/tema, programación asíncrona, sincronización WebSocket, reintentos, limitación de tasa y despliegue en contenedores.
  - ♦ Servicio AI Code Review para Merge Requests de GitLab: webhooks, revisión por fragmentos de diff, escritura de resultados y notificaciones.
  - ♦ Paneles admin complejos (gestión operativa, estimación ROI, gestión de negocio): asignación de tareas por arrastre, árboles de alineación OKR, etc.
  - ♦ Asistente inteligente del sistema de tareas: RAG, integración OA para creación/asignación automática y consulta de departamentos.
          `,
                tags: ["Full Stack", "NodeJS", "TypeScript", "Vue", "Koa", "Express", "MySQL", "MongoDB", "Redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "Element Plus", "Docker"]
            }
        ]
    }
] as const;

export const ptPT: Experience[] = [
    {
        title: "Universidade",
        positions: [
            {
                subtitle: "Desenvolvimento Backend / Golang",
                year: "09.2021 - 06.2025",
                description: `Conheci a linguagem Go durante as férias de inverno do primeiro ano. 
  Desde então, a maioria das minhas stacks giram em torno do Golang.
  
  Como a maioria dos Gophers, comecei com o stack Gin + Gorm para desenvolvimento web. Essa experiência me permitiu adaptar-me rapidamente a outros frameworks (como SpringBoot, Django, Flask, Express, Koa) e bibliotecas de terceiros.
  
  Mais tarde, comecei a explorar microsserviços e tecnologias modernas como GRPC, ProtoBuf, ETCD, Grafana, Prometheus e Docker.
  Aprendi bastante, embora infelizmente não tenha construído um sistema completo de microsserviços.`,
                tags: ["Desenvolvimento Backend", "Golang", "Contêineres", "Microsserviços", "Cloud Native"]
            },
            {
                subtitle: "Desenvolvimento Frontend",
                year: "05.2022 - 06.2025",
                description: `Minha jornada no frontend também começou com algumas coincidências interessantes.
  Talvez o ponto de partida tenha sido uma competição e um grupo de bate-papo.
  
  Graças a experiências anteriores no ensino médio, eu já tinha algum conhecimento em JQuery e no trio HTML/CSS/JS.
  Assim, comecei com Vue e suas ferramentas (Pinia, Vite, Vue Router, Vuex).
  
  Por interesse no TSX, também aprendi React e seu ecossistema.
  
  Mais tarde, descobri o Flutter e sua proposta de "escreva uma vez, execute em qualquer lugar", o que acabou sendo a base do meu projeto de graduação.`,
                tags: ["Frontend", "JQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                subtitle: "Jornada de Aprendizado",
                year: "09.2021 - 12.2022",
                description: `Durante a universidade, explorei muitos assuntos por curiosidade. Embora a maioria tenha sido superficial, me diverti bastante.
  
  Essas experiências satisfizeram minha curiosidade tecnológica.
  
  Para mais detalhes, consulte meu artigo [Passado, Presente e Futuro](./articles/past-now-future).`,
                tags: ["Resumo", "Memórias", "Futuro", "Mestrado", "Blockchain", "Solidity", "Unreal Engine", "Trading", "Banco de Dados", "SO", "IA", "Desktop", "GameDev", "Minecraft Mods"]
            }
        ]
    },
    {
        title: "Estágio / Primeiro emprego",
        positions: [
            {
                subtitle: "Desenvolvedor Full Stack",
                year: "03.2025 - presente",
                description: `
  - ♦ Desenvolvimento e manutenção de serviços de mini-jogos: iteração de framework, login multicanal e APIs para clientes e back-office operacional.
  - ♦ Manutenção de plataforma CI/CD própria em TypeScript com builds, deploys e gatilhos por hooks automatizados.
  - ♦ Sistema AIGC de geração em lote de arte e entrega de seleção de imagens: text-to-image por palavras-chave/tema, agendamento assíncrono, sincronização WebSocket, retentativas, rate limiting e deploy em containers.
  - ♦ Serviço AI Code Review para Merge Requests do GitLab: webhooks, revisão por fragmentos de diff, gravação de resultados e notificações.
  - ♦ Painéis admin complexos (gestão operacional, estimativa de ROI, gestão de negócios): atribuição de tarefas por arrastar, árvores de alinhamento OKR, etc.
  - ♦ Assistente inteligente do sistema de tarefas: RAG, integração OA para criação/atribuição automática e consulta de departamentos.`,
                tags: ["Full Stack", "NodeJS", "TypeScript", "Vue", "koa", "express", "mysql", "mongo", "redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "element-plus", "Docker"]
            }
        ]
    }
];

export const ru: Experience[] = [
    {
        title: "Университет",
        positions: [
            {
                subtitle: "Бэкенд-разработка / Golang",
                year: "09.2021 - 06.2025",
                description: `С Go я познакомился в зимние каникулы первого курса.
  С тех пор большинство моих стеков сосредоточены вокруг Go.
  
  Как и многие Gopher'ы, я начал с Gin + Gorm. Этот опыт позволил мне быстро освоить другие фреймворки (SpringBoot, Django, Flask, Express, Koa) и сторонние библиотеки.
  
  Позже я начал изучать микросервисы и современные технологии: GRPC, ProtoBuf, ETCD, Grafana, Prometheus, Docker.
  Многое удалось изучить, но, к сожалению, не получилось создать полноценную систему микросервисов.`,
                tags: ["Бэкенд", "Golang", "Контейнеры", "Микросервисы", "Облачные технологии"]
            },
            {
                subtitle: "Фронтенд-разработка",
                year: "05.2022 - 06.2025",
                description: `Моя история с фронтендом началась также случайно — благодаря конкурсу и чату.
  
  Благодаря опыту в школе, я знал JQuery и HTML/CSS/JS.
  Сразу начал с Vue и его экосистемы (Pinia, Vite, Vue Router, Vuex).
  
  Из интереса к TSX я изучил React и его инструменты.
  
  Позже узнал о Flutter и его кросс-платформенной возможности. Это стало основой моего дипломного проекта.`,
                tags: ["Фронтенд", "JQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                subtitle: "Личный путь",
                year: "09.2021 - 12.2022",
                description: `В университете я изучал многое ради интереса. Пусть это и было поверхностно, но я получал удовольствие.
  
  Этот путь удовлетворил моё техническое любопытство.
  
  Подробнее читайте в моей статье [Прошлое, Настоящее, Будущее](./articles/past-now-future).`,
                tags: ["Итоги", "Воспоминания", "Будущее", "Магистратура", "Блокчейн", "Solidity", "Unreal Engine", "Алготрейдинг", "БД", "ОС", "ИИ", "Desktop", "GameDev", "Моды Minecraft"]
            }
        ]
    },
    {
        title: "Стажировка / Первая работа",
        positions: [
            {
                subtitle: "Full Stack разработчик",
                year: "03.2025 - по настоящее время",
                description: `
  - ♦ Разработка и поддержка серверной части мини-игр: итерации фреймворка, мультиканальный вход, API для клиентов и операционного бэкенда.
  - ♦ Поддержка собственной CI/CD-платформы на TypeScript: автоматические сборки, деплой и хуки.
  - ♦ AIGC-система пакетной генерации арта и отбора изображений: text-to-image по ключевым словам/темам, асинхронное планирование, WebSocket-синхронизация, повторы, rate limiting, контейнерный деплой.
  - ♦ AI Code Review для GitLab Merge Request: webhooks, пофрагментный diff-ревью, запись результатов и уведомления.
  - ♦ Сложные админ-панели (операционное управление, ROI, бизнес): drag-and-drop задач, деревья OKR и др.
  - ♦ Умный ассистент системы задач: RAG, интеграция с OA для создания/назначения задач, запросы по отделам.`,
                tags: ["Full Stack", "NodeJS", "TypeScript", "Vue", "koa", "express", "mysql", "mongo", "redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "element-plus", "Docker"]
            }
        ]
    }
];

export const arSA: Experience[] = [
    {
        title: "الجامعة",
        positions: [
            {
                subtitle: "تطوير الخلفية / Golang",
                year: "09.2021 - 06.2025",
                description: `بدأت التعرف على Golang في عطلة الشتاء من السنة الأولى.
  منذ ذلك الحين، أصبحت معظم تقنياتي تدور حول لغة Go.
  
  مثل معظم المبرمجين، بدأت باستخدام Gin + Gorm لتطوير الويب، مما ساعدني لاحقًا على التكيف بسهولة مع أطر عمل أخرى مثل SpringBoot وDjango وFlask وExpress وKoa.
  
  لاحقًا، بدأت في استكشاف الخدمات المصغرة والتقنيات الحديثة مثل GRPC وProtoBuf وETCD وGrafana وPrometheus وDocker.
  تعلمت الكثير، رغم أنني لم أبني نظام خدمات مصغرة متكامل.`,
                tags: ["تطوير الخلفية", "Golang", "الحاويات", "الخدمات المصغرة", "الحوسبة السحابية"]
            },
            {
                subtitle: "تطوير الواجهة الأمامية",
                year: "05.2022 - 06.2025",
                description: `بدأت رحلتي في الواجهة الأمامية بسبب بعض الصدف.
  ربما كان نقطة البداية هي مسابقة ومجموعة دردشة.
  
  بفضل تجربتي في المدرسة الثانوية، كنت أعرف JQuery وثلاثي HTML/CSS/JS.
  ثم بدأت باستخدام Vue وأدواته (Pinia وVite وVue Router وVuex).
  
  بدافع الفضول، تعلمت أيضًا React.
  
  لاحقًا، اكتشفت Flutter وإمكانيته لتشغيل التطبيقات على عدة منصات. أصبح هو التقنية الرئيسية لمشروعي التخرج.`,
                tags: ["الواجهة الأمامية", "JQuery", "Vue3", "TypeScript", "React", "Dart", "Flutter"]
            },
            {
                subtitle: "رحلة التعلم",
                year: "09.2021 - 12.2022",
                description: `خلال الجامعة، تعلمت أشياء كثيرة بدافع الفضول. ربما لم أقم بإنشاء مشاريع عملية بها، لكنها أشبعت فضولي.
  
  لمزيد من التفاصيل، راجع مقالتي [الماضي، الحاضر، المستقبل](./articles/past-now-future).`,
                tags: ["ملخص", "ذكريات", "مستقبل", "الدراسات العليا", "البلوك تشين", "Solidity", "Unreal Engine", "تداول آلي", "قواعد البيانات", "أنظمة التشغيل", "الذكاء الاصطناعي", "تطوير سطح المكتب", "تطوير الألعاب", "مودات Minecraft"]
            }
        ]
    },
    {
        title: "التدريب / أول وظيفة",
        positions: [
            {
                subtitle: "مطور Full Stack",
                year: "03.2025 - حتى الآن",
                description: `
  - ♦ تطوير وصيانة خدمات الألعاب المصغرة: تطوير الإطار، تسجيل الدخول متعدد القنوات، وواجهات برمجة للعملاء واللوحة التشغيلية.
  - ♦ صيانة منصة CI/CD داخلية مبنية على TypeScript مع بناء ونشر تلقائي وتشغيل عبر Webhooks.
  - ♦ نظام AIGC لتوليد الفنون بالجملة واختيار الصور: نص إلى صورة بالكلمات/الموضوع، جدولة غير متزامنة، مزامنة WebSocket، إعادة المحاولة، تحديد المعدل، ونشر في حاويات.
  - ♦ خدمة مراجعة كود AI لطلبات دمج GitLab: Webhooks، مراجعة مقطعية للـ Diff، كتابة النتائج والإشعارات.
  - ♦ لوحات إدارة معقدة (تشغيل، تقدير ROI، أعمال): سحب وإفلات للمهام، أشجار محاذاة OKR، وغيرها.
  - ♦ مساعد ذكي لنظام المهام: RAG، تكامل OA لإنشاء/تعيين المهام تلقائياً، واستعلام الأقسام.`,
                tags: ["Full Stack", "NodeJS", "TypeScript", "Vue", "koa", "express", "mysql", "mongo", "redis", "DevOps", "CI/CD", "WebSocket", "AIGC", "RAG", "GitLab", "element-plus", "Docker"]
            }
        ]
    }
];


export const experiences: Record<Locale, Experience[]> = {
    en_us: enUS,
    zh_cn: zhCN,
    zh_tw: zhTW,
    ja_jp: jaJP,
    fr_fr: frFR,
    es_es: esES,
    pt_pt: ptPT,
    ru: ru,
    ar_sa: arSA,
} as const;