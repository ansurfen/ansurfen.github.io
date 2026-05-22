import type { GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import {
  getCategoryPaths,
  getSeriesPaths,
  getSortedArticles,
} from "@/lib/articles";
import { SITE } from "@/lib/config";
import { getProjectPaths } from "@/lib/projects";
import { languages, type Locale } from "@/lib/i18n";
import { getLocaleConfig, nonDefaultLocales } from "@/lib/locale-content";
import { getPrivateEntries } from "@/lib/private-manifest";

export function getLocaleStaticPaths() {
  return nonDefaultLocales.map((locale) => ({
    params: { locale: languages[locale].path },
    props: { locale },
  }));
}

async function mergePaginatedPaths(
  locales: Locale[],
  { paginate }: Parameters<GetStaticPaths>[0],
  options: { withLocaleParam?: boolean } = {},
) {
  const { withLocaleParam = false } = options;
  const merged = [];

  for (const locale of locales) {
    const { blogCollection } = getLocaleConfig(locale);
    const sortedArticles = await getSortedArticles(blogCollection, locale);
    const paths = paginate(sortedArticles, {
      pageSize: SITE.postPerPage,
      ...(withLocaleParam
        ? { params: { locale: languages[locale].path } }
        : {}),
    });

    for (const path of paths) {
      merged.push({
        ...path,
        props: {
          ...path.props,
          locale,
        },
      });
    }
  }

  return merged;
}

export const getLocalizedArticleListPaths: GetStaticPaths = async (context) =>
  mergePaginatedPaths(nonDefaultLocales, context, { withLocaleParam: true });

export const getDefaultArticleListPaths = async (
  context: Parameters<GetStaticPaths>[0],
) => mergePaginatedPaths(["en_us"], context);

export async function getLocalizedCategoryPaths() {
  const merged = [];

  for (const locale of nonDefaultLocales) {
    const { blogCollection } = getLocaleConfig(locale);
    const paths = await getCategoryPaths(blogCollection, locale);

    for (const path of paths) {
      merged.push({
        params: {
          locale: languages[locale].path,
          category: path.params.category,
        },
        props: { locale },
      });
    }
  }

  return merged;
}

export async function getLocalizedSeriesPaths() {
  const merged = [];

  for (const locale of nonDefaultLocales) {
    const { blogCollection } = getLocaleConfig(locale);
    const paths = await getSeriesPaths(blogCollection, locale);

    for (const path of paths) {
      merged.push({
        params: {
          locale: languages[locale].path,
          series: path.params.series,
        },
        props: { locale },
      });
    }
  }

  return merged;
}

export async function getLocalizedArticleSlugPaths() {
  const merged = [];

  for (const locale of nonDefaultLocales) {
    const { blogCollection } = getLocaleConfig(locale);
    const posts = await getCollection(blogCollection, ({ data }) => !data.draft);

    for (const post of posts) {
      merged.push({
        params: {
          locale: languages[locale].path,
          slug: post.id,
        },
        props: { post, locale },
      });
    }

    for (const privateEntry of getPrivateEntries({
      kind: "blog",
      locale,
    })) {
      merged.push({
        params: {
          locale: languages[locale].path,
          slug: privateEntry.id,
        },
        props: { privateEntry, locale },
      });
    }
  }

  return merged;
}

export async function getLocalizedProjectPaths() {
  const merged = [];

  for (const locale of nonDefaultLocales) {
    const { projectCollection } = getLocaleConfig(locale);
    const paths = await getProjectPaths(projectCollection);

    for (const path of paths) {
      merged.push({
        params: {
          locale: languages[locale].path,
          projectId: path.params.projectId,
        },
        props: { locale },
      });
    }

    for (const privateEntry of getPrivateEntries({
      kind: "projects",
      locale,
    })) {
      merged.push({
        params: {
          locale: languages[locale].path,
          projectId: privateEntry.id,
        },
        props: { privateEntry, locale },
      });
    }
  }

  return merged;
}
