/**
 * 将 private/ 按篇加密到 public/private/vault/**\/*.json，并生成 manifest v2
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildManifestEntry, parseMarkdownFile } from "./private-frontmatter.mjs";
import { vaultPathToVaultFile } from "./private-kinds.mjs";
import {
  buildEntryPayload,
  encrypt,
  readPassphrase,
} from "./private-crypto.mjs";
import { renderArticleMarkdown } from "./render-article-markdown.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_DIR = join(ROOT, "private");
const OUT_DIR = join(ROOT, "public", "private");
const VAULT_DIR = join(OUT_DIR, "vault");
const MANIFEST_FILE = join(OUT_DIR, "manifest.json");
const LEGACY_VAULT_FILE = join(OUT_DIR, "vault.json");

const SKIP_FILES = new Set(["README.md", ".gitkeep"]);

/** @param {string} dir @param {string} [prefix] */
function collectPrivateFiles(dir, prefix = "") {
  /** @type {Record<string, string>} */
  const files = {};

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_FILES.has(entry.name)) continue;

    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      Object.assign(files, collectPrivateFiles(full, rel));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files[rel] = readFileSync(full, "utf8");
    }
  }

  return files;
}

if (!existsSync(PRIVATE_DIR)) {
  console.error(`找不到目录: ${PRIVATE_DIR}`);
  process.exit(1);
}

const rawFiles = collectPrivateFiles(PRIVATE_DIR);
if (Object.keys(rawFiles).length === 0) {
  console.error(`目录为空: ${PRIVATE_DIR}`);
  process.exit(1);
}

/** @type {ReturnType<typeof buildManifestEntry>[]} */
const manifestEntries = [];
const entryKeys = new Set();

console.log("预渲染 Markdown（Astro markdown-remark + Shiki）…");

const passphrase = await readPassphrase("输入加密口令: ");
if (!passphrase) {
  console.error("口令不能为空");
  process.exit(1);
}

mkdirSync(VAULT_DIR, { recursive: true });

if (existsSync(LEGACY_VAULT_FILE)) {
  rmSync(LEGACY_VAULT_FILE);
}

for (const [relPath, raw] of Object.entries(rawFiles)) {
  const { frontmatter, body } = parseMarkdownFile(raw);
  const html = await renderArticleMarkdown(body);
  const vaultFile = vaultPathToVaultFile(relPath);
  const outPath = join(OUT_DIR, vaultFile);

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(
    outPath,
    `${JSON.stringify(
      encrypt(buildEntryPayload({ content: raw, html }), passphrase),
      null,
      2,
    )}\n`,
  );

  const manifestEntry = buildManifestEntry(relPath, frontmatter);
  if (!manifestEntry) continue;

  const key = `${manifestEntry.kind}/${manifestEntry.locale}/${manifestEntry.id}`;
  if (entryKeys.has(key)) {
    console.error(`slug 冲突: ${key}`);
    process.exit(1);
  }
  entryKeys.add(key);
  manifestEntries.push(manifestEntry);
}

writeFileSync(
  MANIFEST_FILE,
  `${JSON.stringify({ version: 2, entries: manifestEntries }, null, 2)}\n`,
);

console.log(`已加密 ${Object.keys(rawFiles).length} 个文件 → ${VAULT_DIR}/`);
console.log(
  `已写入 ${manifestEntries.length} 条 manifest 索引 → ${MANIFEST_FILE}`,
);
