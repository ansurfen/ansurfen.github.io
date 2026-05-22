import type { Page } from "astro";
import type { CollectionEntry } from "astro:content";
import type { BlogCollection } from "@/content.config";
import type { Locale } from "@/lib/i18n";
import type { PrivateManifestEntry } from "@/lib/private-manifest";
import type { ListArticle } from "@/lib/list-articles";

export interface LocalePageProps {
  locale: Locale;
}

export interface ArticlesListPageProps extends LocalePageProps {
  page: Page<ListArticle>;
}

export interface ArticleSlugPageProps {
  post?: CollectionEntry<BlogCollection>;
  privateEntry?: PrivateManifestEntry;
}

export interface ProjectSlugPageProps extends LocalePageProps {
  privateEntry?: PrivateManifestEntry;
}
