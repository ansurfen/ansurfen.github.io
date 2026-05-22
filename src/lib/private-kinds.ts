import type { Locale } from "@/lib/i18n";

export type PrivateKind = "blog" | "projects";

export const PRIVATE_KINDS: PrivateKind[] = ["blog", "projects"];

export interface PrivateBlogMeta {
  title: string;
  description: string;
  pubDatetime: string;
  category: string;
  series?: string;
  tags: string[];
  image?: string;
}

export interface PrivateProjectMeta {
  name: string;
  description: string;
  technologies: string[];
  type: "core" | "side";
  image?: string;
  sourceCode?: string;
  preview?: string;
}

export type PrivateEntryMeta = PrivateBlogMeta | PrivateProjectMeta;

interface PrivateManifestEntryBase {
  locale: Locale;
  id: string;
  vaultPath: string;
  vaultFile: string;
  draft: boolean;
  listed: boolean;
}

export type PrivateManifestEntry =
  | (PrivateManifestEntryBase & {
      kind: "blog";
      meta: PrivateBlogMeta;
    })
  | (PrivateManifestEntryBase & {
      kind: "projects";
      meta: PrivateProjectMeta;
    });

const LOCALE_PATTERN = "([a-z]{2}_[a-z]{2})";

function parseBlogMeta(
  fm: Record<string, unknown>,
): PrivateBlogMeta | null {
  const { title, description, pubDatetime, category } = fm;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof pubDatetime !== "string" ||
    typeof category !== "string"
  ) {
    return null;
  }
  const tags = Array.isArray(fm.tags)
    ? fm.tags.filter((t): t is string => typeof t === "string")
    : [];
  return {
    title,
    description,
    pubDatetime,
    category,
    series: typeof fm.series === "string" ? fm.series : undefined,
    tags,
    image: typeof fm.image === "string" ? fm.image : undefined,
  };
}

function parseProjectMeta(
  fm: Record<string, unknown>,
): PrivateProjectMeta | null {
  const { name, description, type } = fm;
  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    (type !== "core" && type !== "side")
  ) {
    return null;
  }
  const technologies = Array.isArray(fm.technologies)
    ? fm.technologies.filter((t): t is string => typeof t === "string")
    : [];
  return {
    name,
    description,
    type,
    technologies,
    image: typeof fm.image === "string" ? fm.image : undefined,
    sourceCode: typeof fm.sourceCode === "string" ? fm.sourceCode : undefined,
    preview: typeof fm.preview === "string" ? fm.preview : undefined,
  };
}

const KIND_PATTERNS: Record<PrivateKind, RegExp> = {
  blog: new RegExp(`^${LOCALE_PATTERN}/blog/([^/]+)\\.md$`),
  projects: new RegExp(`^${LOCALE_PATTERN}/projects/([^/]+)\\.md$`),
};

export function vaultPathToVaultFile(vaultPath: string): string {
  return `vault/${vaultPath.replace(/\.md$/, ".json")}`;
}

export function getPrivateVaultUrl(vaultFile: string): string {
  return `/private/${vaultFile}`;
}

export function isPrivateBlogEntry(
  entry: PrivateManifestEntry,
): entry is PrivateManifestEntry & { kind: "blog"; meta: PrivateBlogMeta } {
  return entry.kind === "blog";
}

export function isPrivateProjectEntry(
  entry: PrivateManifestEntry,
): entry is PrivateManifestEntry & {
  kind: "projects";
  meta: PrivateProjectMeta;
} {
  return entry.kind === "projects";
}
