import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Locale } from "@/lib/i18n";
import {
  type PrivateKind,
  type PrivateManifestEntry,
  type PrivateBlogMeta,
  vaultPathToVaultFile,
} from "@/lib/private-kinds";

export type {
  PrivateKind,
  PrivateManifestEntry,
  PrivateBlogMeta,
  PrivateProjectMeta,
  PrivateEntryMeta,
} from "@/lib/private-kinds";

export {
  PRIVATE_KINDS,
  getPrivateVaultUrl,
  isPrivateBlogEntry,
  isPrivateProjectEntry,
  vaultPathToVaultFile,
} from "@/lib/private-kinds";

/** @deprecated Use PrivateManifestEntry with kind "blog" */
export type PrivatePostMeta = PrivateManifestEntry & {
  kind: "blog";
  meta: PrivateBlogMeta;
};

interface PrivateManifestV2 {
  version: 2;
  entries: PrivateManifestEntry[];
}

interface PrivateManifestV1Post {
  id: string;
  locale: string;
  vaultPath: string;
  vaultFile?: string;
  title: string;
  description: string;
  pubDatetime: string;
  category: string;
  series?: string;
  tags: string[];
  image?: string;
  draft: boolean;
  listed: boolean;
}

interface PrivateManifestV1 {
  version: 1;
  posts: PrivateManifestV1Post[];
}

const LOCALES = new Set<string>([
  "en_us",
  "zh_cn",
  "zh_tw",
  "ja_jp",
  "fr_fr",
  "es_es",
  "pt_pt",
  "ru",
  "ar_sa",
]);

function normalizeV1Post(post: PrivateManifestV1Post): PrivateManifestEntry | null {
  if (!LOCALES.has(post.locale)) return null;

  return {
    kind: "blog",
    locale: post.locale as Locale,
    id: post.id,
    vaultPath: post.vaultPath,
    vaultFile: post.vaultFile ?? vaultPathToVaultFile(post.vaultPath),
    meta: {
      title: post.title,
      description: post.description,
      pubDatetime: post.pubDatetime,
      category: post.category,
      series: post.series,
      tags: post.tags ?? [],
      image: post.image,
    },
    draft: post.draft === true,
    listed: post.listed !== false,
  };
}

function loadManifest(): PrivateManifestEntry[] {
  const path = join(process.cwd(), "public/private/manifest.json");
  try {
    const raw = readFileSync(path, "utf8");
    const data = JSON.parse(raw) as PrivateManifestV2 | PrivateManifestV1;

    if (data?.version === 2 && Array.isArray(data.entries)) {
      return data.entries.filter(
        e => LOCALES.has(e.locale) && !e.draft,
      ) as PrivateManifestEntry[];
    }

    if (data?.version === 1 && Array.isArray(data.posts)) {
      return data.posts
        .map(normalizeV1Post)
        .filter((e): e is PrivateManifestEntry => e !== null && !e.draft);
    }
  } catch {
    // 本地尚未 encrypt
  }
  return [];
}

export interface GetPrivateEntriesOptions {
  kind?: PrivateKind;
  locale?: Locale;
  listed?: boolean;
}

type PrivateBlogEntry = Extract<PrivateManifestEntry, { kind: "blog" }>;
type PrivateProjectEntry = Extract<PrivateManifestEntry, { kind: "projects" }>;

export function getPrivateEntries(
  options: GetPrivateEntriesOptions & { kind: "blog" },
): PrivateBlogEntry[];
export function getPrivateEntries(
  options: GetPrivateEntriesOptions & { kind: "projects" },
): PrivateProjectEntry[];
export function getPrivateEntries(
  options?: GetPrivateEntriesOptions,
): PrivateManifestEntry[];
export function getPrivateEntries(
  options: GetPrivateEntriesOptions = {},
): PrivateManifestEntry[] {
  const { kind, locale, listed } = options;
  return loadManifest().filter(entry => {
    if (kind && entry.kind !== kind) return false;
    if (locale && entry.locale !== locale) return false;
    if (listed === true && !entry.listed) return false;
    return true;
  });
}

export function getPrivateEntry(
  kind: PrivateKind,
  locale: Locale,
  id: string,
): PrivateManifestEntry | undefined {
  return getPrivateEntries({ kind, locale }).find(e => e.id === id);
}

/** @deprecated Use getPrivateEntries({ kind: "blog", locale }) */
export function getPrivatePostsByLocale(locale: Locale): PrivateManifestEntry[] {
  return getPrivateEntries({ kind: "blog", locale });
}

/** @deprecated Use getPrivateEntries({ kind: "blog", locale, listed: true }) */
export function getListablePrivatePostsByLocale(
  locale: Locale,
): PrivateBlogEntry[] {
  return getPrivateEntries({ kind: "blog", locale, listed: true });
}

/** @deprecated Use getPrivateEntry("blog", locale, slug) */
export function getPrivatePost(
  locale: Locale,
  slug: string,
): PrivateManifestEntry | undefined {
  return getPrivateEntry("blog", locale, slug);
}

export function getListablePrivateProjectsByLocale(
  locale: Locale,
): PrivateProjectEntry[] {
  return getPrivateEntries({ kind: "projects", locale, listed: true });
}

export function getPrivateProjectsByLocale(
  locale: Locale,
): PrivateProjectEntry[] {
  return getPrivateEntries({ kind: "projects", locale });
}

export function getPrivateProject(
  locale: Locale,
  projectId: string,
): PrivateProjectEntry | undefined {
  return getPrivateEntry("projects", locale, projectId) as
    | PrivateProjectEntry
    | undefined;
}

export function toPubDate(iso: string): Date {
  return new Date(iso);
}

/** Flat blog fields for article pages (legacy shape) */
export function getBlogDisplayFields(entry: PrivateManifestEntry) {
  if (entry.kind !== "blog") {
    throw new Error(`Expected blog entry, got ${entry.kind}`);
  }
  const meta = entry.meta;
  return {
    title: meta.title,
    description: meta.description,
    pubDatetime: meta.pubDatetime,
    category: meta.category,
    series: meta.series,
    tags: meta.tags,
    image: meta.image,
    vaultPath: entry.vaultPath,
    vaultFile: entry.vaultFile,
  };
}
