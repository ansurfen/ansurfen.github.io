import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from "node:crypto";
import { createInterface } from "node:readline";
import { loadEnv } from "./load-env.mjs";

export const PBKDF2_ITERATIONS = 310_000;
export const BUNDLE_FORMAT_V1 = "private-bundle-v1";
export const BUNDLE_FORMAT_V2 = "private-bundle-v2";
export const ENTRY_FORMAT = "private-entry-v1";

export async function readPassphrase(prompt = "输入口令: ") {
  loadEnv();
  if (process.env.PASSPHRASE) return process.env.PASSPHRASE;

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(prompt, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

export function encrypt(plaintext, passphrase) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = pbkdf2Sync(passphrase, salt, PBKDF2_ITERATIONS, 32, "sha256");
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return {
    v: 1,
    alg: "AES-256-GCM",
    kdf: "PBKDF2",
    iter: PBKDF2_ITERATIONS,
    salt: salt.toString("base64"),
    iv: iv.toString("base64"),
    ciphertext: Buffer.concat([encrypted, authTag]).toString("base64"),
  };
}

export function decrypt(vault, passphrase) {
  if (vault.v !== 1 || vault.alg !== "AES-256-GCM" || vault.kdf !== "PBKDF2") {
    throw new Error("不支持的密文格式");
  }

  const salt = Buffer.from(vault.salt, "base64");
  const iv = Buffer.from(vault.iv, "base64");
  const data = Buffer.from(vault.ciphertext, "base64");
  const authTag = data.subarray(data.length - 16);
  const encrypted = data.subarray(0, data.length - 16);

  const key = pbkdf2Sync(passphrase, salt, vault.iter, 32, "sha256");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString("utf8");
}

/** @param {string} plaintext */
export function parsePayload(plaintext) {
  try {
    const data = JSON.parse(plaintext);
    if (
      (data?.format === BUNDLE_FORMAT_V1 || data?.format === BUNDLE_FORMAT_V2) &&
      data.files &&
      typeof data.files === "object"
    ) {
      return data.files;
    }
  } catch {
    // legacy: 整段就是单个 vault.md
  }
  return { "vault.md": plaintext };
}

/** @param {unknown} entry */
export function getVaultFileContent(entry) {
  if (typeof entry === "string") return entry;
  if (entry && typeof entry === "object" && "content" in entry) {
    return String(entry.content);
  }
  return "";
}

/** @param {{ content: string, html: string }} entry */
export function buildEntryPayload(entry) {
  return JSON.stringify({
    format: ENTRY_FORMAT,
    content: entry.content,
    html: entry.html,
  });
}

/** @param {string} plaintext */
export function parseEntryPayload(plaintext) {
  try {
    const data = JSON.parse(plaintext);
    if (data?.format === ENTRY_FORMAT) {
      return {
        content: String(data.content ?? ""),
        html: typeof data.html === "string" ? data.html : undefined,
      };
    }
  } catch {
    // legacy single markdown file
  }
  return { content: plaintext };
}

/** @param {Record<string, unknown>} files */
export function buildPayload(files) {
  const entries = Object.entries(files);
  if (entries.length === 0) {
    throw new Error("没有可加密的文件");
  }

  const hasHtml = entries.some(
    ([, value]) => value && typeof value === "object" && "html" in value,
  );

  return JSON.stringify({
    format: hasHtml ? BUNDLE_FORMAT_V2 : BUNDLE_FORMAT_V1,
    files,
  });
}
