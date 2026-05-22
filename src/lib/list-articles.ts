import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { BlogCollection } from "@/content.config";
import type { Locale } from "@/lib/i18n";
import {
  getListablePrivatePostsByLocale,
  isPrivateBlogEntry,
  toPubDate,
  type PrivateManifestEntry,
} from "@/lib/private-manifest";

export type PublicListArticle = {
  kind: "public";
  entry: CollectionEntry<BlogCollection>;
};

export type PrivateListArticle = {
  kind: "private";
  entry: Extract<PrivateManifestEntry, { kind: "blog" }>;
};

export type ListArticle = PublicListArticle | PrivateListArticle;

export async function getMergedSortedArticles(
  collection: BlogCollection,
  locale: Locale,
): Promise<ListArticle[]> {
  const publicArticles = await getCollection(collection, ({ data }) => !data.draft);
  const privateArticles = getListablePrivatePostsByLocale(locale);

  const merged: ListArticle[] = [
    ...publicArticles.map(entry => ({ kind: "public" as const, entry })),
    ...privateArticles.map(entry => ({ kind: "private" as const, entry })),
  ];

  return merged.sort((a, b) => {
    const dateA =
      a.kind === "public"
        ? a.entry.data.pubDatetime.getTime()
        : isPrivateBlogEntry(a.entry)
          ? toPubDate(a.entry.meta.pubDatetime).getTime()
          : 0;
    const dateB =
      b.kind === "public"
        ? b.entry.data.pubDatetime.getTime()
        : isPrivateBlogEntry(b.entry)
          ? toPubDate(b.entry.meta.pubDatetime).getTime()
          : 0;
    return dateB - dateA;
  });
}

export function getArticleSlug(article: ListArticle): string {
  return article.kind === "public" ? article.entry.id : article.entry.id;
}

export function getArticleCategory(article: ListArticle): string {
  if (article.kind === "public") return article.entry.data.category;
  return isPrivateBlogEntry(article.entry)
    ? article.entry.meta.category
    : "";
}

export function getArticleSeries(article: ListArticle): string | undefined {
  if (article.kind === "public") return article.entry.data.series;
  return isPrivateBlogEntry(article.entry)
    ? article.entry.meta.series
    : undefined;
}
