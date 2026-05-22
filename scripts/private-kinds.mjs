/** @typedef {"blog" | "projects"} PrivateKind */

/** @type {PrivateKind[]} */
export const PRIVATE_KINDS = ["blog", "projects"];

const LOCALE_PATTERN = "([a-z]{2}_[a-z]{2})";

/** @type {Record<PrivateKind, { pattern: RegExp, buildMeta: (fm: Record<string, unknown>, parsed: { locale: string, id: string }) => object | null }>} */
export const KIND_REGISTRY = {
  blog: {
    pattern: new RegExp(`^${LOCALE_PATTERN}/blog/([^/]+)\\.md$`),
    buildMeta(fm, parsed) {
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
        ? fm.tags.filter((t) => typeof t === "string")
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
    },
  },
  projects: {
    pattern: new RegExp(`^${LOCALE_PATTERN}/projects/([^/]+)\\.md$`),
    buildMeta(fm) {
      const { name, description, type } = fm;
      if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        (type !== "core" && type !== "side")
      ) {
        return null;
      }
      const technologies = Array.isArray(fm.technologies)
        ? fm.technologies.filter((t) => typeof t === "string")
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
    },
  },
};

/**
 * @param {string} relPath e.g. zh_cn/blog/foo.md
 * @returns {{ kind: PrivateKind, locale: string, id: string } | null}
 */
export function parsePrivatePath(relPath) {
  for (const kind of PRIVATE_KINDS) {
    const match = relPath.match(KIND_REGISTRY[kind].pattern);
    if (match) {
      return { kind, locale: match[1], id: match[2] };
    }
  }
  return null;
}

/**
 * @param {string} relPath
 * @param {Record<string, unknown>} fm
 */
export function buildManifestEntry(relPath, fm) {
  const parsed = parsePrivatePath(relPath);
  if (!parsed) return null;

  const meta = KIND_REGISTRY[parsed.kind].buildMeta(fm, parsed);
  if (!meta) return null;

  const vaultFile = vaultPathToVaultFile(relPath);

  return {
    kind: parsed.kind,
    locale: parsed.locale,
    id: parsed.id,
    vaultPath: relPath,
    vaultFile,
    meta,
    draft: fm.draft === true,
    listed: fm.listed !== false,
  };
}

/** @param {string} vaultPath */
export function vaultPathToVaultFile(vaultPath) {
  return `vault/${vaultPath.replace(/\.md$/, ".json")}`;
}
