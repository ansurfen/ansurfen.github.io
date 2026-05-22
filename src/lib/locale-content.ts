import type { BlogCollection, ProjectCollection } from "@/content.config";
import { languages, type Locale } from "@/lib/i18n";

export interface LocaleConfig {
  blogCollection: BlogCollection;
  projectCollection: ProjectCollection;
  articlesBasePath: string;
  projectsBasePath: string;
}

function articlesBasePath(locale: Locale): string {
  return locale === "en_us" ? "/articles" : `/${languages[locale].path}/articles`;
}

function projectsBasePath(locale: Locale): string {
  return locale === "en_us" ? "/projects" : `/${languages[locale].path}/projects`;
}

const localeConfigs: Record<Locale, LocaleConfig> = {
  en_us: {
    blogCollection: "blog",
    projectCollection: "projects",
    articlesBasePath: articlesBasePath("en_us"),
    projectsBasePath: projectsBasePath("en_us"),
  },
  zh_cn: {
    blogCollection: "zhCNBlog",
    projectCollection: "zhCNProjects",
    articlesBasePath: articlesBasePath("zh_cn"),
    projectsBasePath: projectsBasePath("zh_cn"),
  },
  zh_tw: {
    blogCollection: "zhTWBlog",
    projectCollection: "zhTWProjects",
    articlesBasePath: articlesBasePath("zh_tw"),
    projectsBasePath: projectsBasePath("zh_tw"),
  },
  ja_jp: {
    blogCollection: "jaJPBlog",
    projectCollection: "jaJPProjects",
    articlesBasePath: articlesBasePath("ja_jp"),
    projectsBasePath: projectsBasePath("ja_jp"),
  },
  fr_fr: {
    blogCollection: "frFRBlog",
    projectCollection: "frFRProjects",
    articlesBasePath: articlesBasePath("fr_fr"),
    projectsBasePath: projectsBasePath("fr_fr"),
  },
  es_es: {
    blogCollection: "esESBlog",
    projectCollection: "esESProjects",
    articlesBasePath: articlesBasePath("es_es"),
    projectsBasePath: projectsBasePath("es_es"),
  },
  pt_pt: {
    blogCollection: "ptPTBlog",
    projectCollection: "ptPTProjects",
    articlesBasePath: articlesBasePath("pt_pt"),
    projectsBasePath: projectsBasePath("pt_pt"),
  },
  ru: {
    blogCollection: "ruBlog",
    projectCollection: "ruProjects",
    articlesBasePath: articlesBasePath("ru"),
    projectsBasePath: projectsBasePath("ru"),
  },
  ar_sa: {
    blogCollection: "arSABlog",
    projectCollection: "arSAProjects",
    articlesBasePath: articlesBasePath("ar_sa"),
    projectsBasePath: projectsBasePath("ar_sa"),
  },
};

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return localeConfigs[locale];
}

export const nonDefaultLocales = (Object.keys(languages) as Locale[]).filter(
  (locale) => locale !== "en_us",
);

export function pathToLocale(path: string): Locale | undefined {
  return (Object.keys(languages) as Locale[]).find(
    (locale) => locale !== "en_us" && languages[locale].path === path,
  );
}
