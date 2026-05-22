/**
 * 从 public/private/vault/ 下各篇 .json（manifest v2）解密并恢复到 private/
 *
 * 用法:
 *   pnpm private:decrypt
 *   口令：项目根 .env 的 PASSPHRASE，或环境变量，或交互输入
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { vaultPathToVaultFile } from "./private-kinds.mjs";
import {
  decrypt,
  getVaultFileContent,
  parseEntryPayload,
  parsePayload,
  readPassphrase,
} from "./private-crypto.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_DIR = join(ROOT, "private");
const OUT_DIR = join(ROOT, "public", "private");
const MANIFEST_FILE = join(OUT_DIR, "manifest.json");
const LEGACY_VAULT_FILE = join(OUT_DIR, "vault.json");
const SKIP_FILES = new Set(["README.md", ".gitkeep"]);

function privateHasMarkdown() {
  if (!existsSync(PRIVATE_DIR)) return false;
  return findMarkdownFiles(PRIVATE_DIR).length > 0;
}

/** @param {string} dir @returns {string[]} */
function findMarkdownFiles(dir) {
  /** @type {string[]} */
  const found = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_FILES.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...findMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      found.push(full);
    }
  }

  return found;
}

/** @param {string} dir */
function clearPrivateMarkdown(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_FILES.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      clearPrivateMarkdown(full);
      if (readdirSync(full).length === 0) {
        rmSync(full, { recursive: true, force: true });
      }
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      unlinkSync(full);
    }
  }
}

function confirmOverwrite() {
  if (process.env.PRIVATE_DECRYPT_FORCE === "1") return Promise.resolve(true);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(
      `${PRIVATE_DIR} 下已有 Markdown，是否覆盖？(y/N) `,
      answer => {
        rl.close();
        resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
      },
    );
  });
}

/** @param {string} vaultRelPath */
function decryptVaultFile(vaultRelPath, passphrase) {
  const full = join(OUT_DIR, vaultRelPath);
  if (!existsSync(full)) {
    throw new Error(`Missing vault file: ${vaultRelPath}`);
  }
  const vault = JSON.parse(readFileSync(full, "utf8"));
  const plaintext = decrypt(vault, passphrase);
  return parseEntryPayload(plaintext);
}

/** @param {unknown} manifest */
function normalizeManifest(manifest) {
  if (manifest?.version === 2 && Array.isArray(manifest.entries)) {
    return manifest.entries;
  }

  if (manifest?.version === 1 && Array.isArray(manifest.posts)) {
    return manifest.posts.map(post => ({
      kind: "blog",
      locale: post.locale,
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
    }));
  }

  return [];
}

if (!existsSync(MANIFEST_FILE) && !existsSync(LEGACY_VAULT_FILE)) {
  console.error("找不到 manifest 或 legacy vault.json");
  console.error("请先运行 pnpm private:encrypt");
  process.exit(1);
}

const passphrase = await readPassphrase("输入解密口令: ");
if (!passphrase) {
  console.error("口令不能为空");
  process.exit(1);
}

/** @type {Record<string, string>} */
const restored = {};

try {
  if (existsSync(MANIFEST_FILE)) {
    const manifest = JSON.parse(readFileSync(MANIFEST_FILE, "utf8"));
    const entries = normalizeManifest(manifest);

    for (const entry of entries) {
      const payload = decryptVaultFile(entry.vaultFile, passphrase);
      restored[entry.vaultPath] = getVaultFileContent(payload);
    }

    const standaloneVault = vaultPathToVaultFile("vault.md");
    const standalonePath = join(OUT_DIR, standaloneVault);
    if (existsSync(standalonePath)) {
      const payload = decryptVaultFile(standaloneVault, passphrase);
      restored["vault.md"] = getVaultFileContent(payload);
    }
  } else if (existsSync(LEGACY_VAULT_FILE)) {
    const vault = JSON.parse(readFileSync(LEGACY_VAULT_FILE, "utf8"));
    const plaintext = decrypt(vault, passphrase);
    const files = parsePayload(plaintext);
    for (const [relPath, entry] of Object.entries(files)) {
      restored[relPath] = getVaultFileContent(entry);
    }
  }
} catch (err) {
  const message = err instanceof Error ? err.message : "解密失败";
  console.error(`解密失败：${message}`);
  process.exit(1);
}

if (Object.keys(restored).length === 0) {
  console.error("没有可恢复的文件");
  process.exit(1);
}

if (privateHasMarkdown()) {
  const ok = await confirmOverwrite();
  if (!ok) {
    console.log("已取消");
    process.exit(0);
  }
  clearPrivateMarkdown(PRIVATE_DIR);
}

mkdirSync(PRIVATE_DIR, { recursive: true });

for (const [relPath, content] of Object.entries(restored)) {
  const outPath = join(PRIVATE_DIR, relPath);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, content, "utf8");
  console.log(`  ✓ ${relPath}`);
}

console.log(`\n已恢复到 ${PRIVATE_DIR}（共 ${Object.keys(restored).length} 个文件）`);
