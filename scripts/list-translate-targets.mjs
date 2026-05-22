#!/usr/bin/env node
/**
 * List all target MDX paths for translating one source file to other locales.
 *
 * Usage:
 *   node scripts/list-translate-targets.mjs docs/zh_cn/blog/en-day-1.mdx
 */

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LOCALES = [
  "en_us",
  "zh_cn",
  "zh_tw",
  "ja_jp",
  "fr_fr",
  "es_es",
  "pt_pt",
  "ru",
  "ar_sa",
];

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseSourcePath(input) {
  const normalized = input.replace(/\\/g, "/");
  const match = normalized.match(/docs\/([^/]+)\/(blog|projects)\/([^/]+\.mdx)$/i);

  if (!match) {
    throw new Error(
      `Invalid path. Expected docs/{locale}/{blog|projects}/{slug}.mdx, got: ${input}`,
    );
  }

  return {
    sourceLocale: match[1],
    kind: match[2],
    filename: match[3],
  };
}

const sourceArg = process.argv[2];

if (!sourceArg) {
  console.error("Usage: node scripts/list-translate-targets.mjs <source-path>");
  process.exit(1);
}

const { sourceLocale, kind, filename } = parseSourcePath(sourceArg);

console.log(`Source: docs/${sourceLocale}/${kind}/${filename}`);
console.log("Targets:\n");

for (const locale of LOCALES) {
  if (locale === sourceLocale) continue;

  const rel = `docs/${locale}/${kind}/${filename}`;
  const abs = join(root, rel);
  const status = existsSync(abs) ? "exists" : "missing";

  console.log(`  [${status}] ${rel}`);
}
