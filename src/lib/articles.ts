import { SITE } from "@/lib/config";
import type { GetStaticPaths } from "astro";
import type { BlogCollection } from "@/content.config";
import type { Locale } from "@/lib/i18n";
import {
  getArticleCategory,
  getArticleSeries,
  getMergedSortedArticles,
} from "@/lib/list-articles";

export async function getSortedArticles(
  collection: BlogCollection,
  locale: Locale,
) {
  return getMergedSortedArticles(collection, locale);
}

export async function getArticlePaths(
  collection: BlogCollection,
  locale: Locale,
) {
  const sortedArticles = await getSortedArticles(collection, locale);
  return async ({ paginate }: Parameters<GetStaticPaths>[0]) => {
    return paginate(sortedArticles, { pageSize: SITE.postPerPage });
  };
}

export async function getSeriesPaths(
  collection: BlogCollection,
  locale: Locale,
) {
  const articles = await getMergedSortedArticles(collection, locale);
  const names = new Set(
    articles
      .map(getArticleSeries)
      .filter((series): series is string => Boolean(series)),
  );

  return [...names].map(series => ({ params: { series } }));
}

export async function getSeriesArticles(
  collection: BlogCollection,
  locale: Locale,
  series: string,
) {
  const articles = await getMergedSortedArticles(collection, locale);
  return articles.filter(article => getArticleSeries(article) === series);
}

export async function getCategoryPaths(
  collection: BlogCollection,
  locale: Locale,
) {
  const articles = await getMergedSortedArticles(collection, locale);
  const categories = new Set(articles.map(getArticleCategory));

  return [...categories].map(category => ({ params: { category } }));
}
