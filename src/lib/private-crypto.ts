import type { VaultFileEntry } from "@/lib/vault-content";

export interface EncryptedVault {
  v: 1;
  alg: "AES-256-GCM";
  kdf: "PBKDF2";
  iter: number;
  salt: string;
  iv: string;
  ciphertext: string;
}

export const BUNDLE_FORMAT_V1 = "private-bundle-v1";
export const BUNDLE_FORMAT_V2 = "private-bundle-v2";
export const ENTRY_FORMAT = "private-entry-v1";

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(
  passphrase: string,
  salt: Uint8Array,
  iterations: number,
): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  return crypto.subtle.importKey(
    "raw",
    bits,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

export async function decryptVault(
  vault: EncryptedVault,
  passphrase: string,
): Promise<string> {
  if (vault.v !== 1 || vault.alg !== "AES-256-GCM" || vault.kdf !== "PBKDF2") {
    throw new Error("Unsupported ciphertext format");
  }

  const salt = base64ToBytes(vault.salt);
  const iv = base64ToBytes(vault.iv);
  const ciphertext = base64ToBytes(vault.ciphertext);

  const key = await deriveKey(passphrase, salt, vault.iter);

  const plainBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(plainBuffer);
}

export function parseEntryPayload(plaintext: string): VaultFileEntry {
  try {
    const data = JSON.parse(plaintext) as {
      format?: string;
      content?: string;
      html?: string;
    };
    if (data?.format === ENTRY_FORMAT) {
      return {
        content: String(data.content ?? ""),
        html: typeof data.html === "string" ? data.html : undefined,
      };
    }
  } catch {
    // legacy: plaintext is a single markdown file
  }
  return { content: plaintext };
}

export function parsePayload(plaintext: string): Record<string, VaultFileEntry> {
  try {
    const data = JSON.parse(plaintext) as {
      format?: string;
      files?: Record<string, VaultFileEntry>;
    };
    if (
      (data?.format === BUNDLE_FORMAT_V1 ||
        data?.format === BUNDLE_FORMAT_V2) &&
      data.files
    ) {
      return data.files;
    }
  } catch {
    // 旧版：明文即单个 vault.md
  }
  return { "vault.md": plaintext };
}

export function isEncryptedVault(data: unknown): data is EncryptedVault {
  if (!data || typeof data !== "object") return false;
  const v = data as Record<string, unknown>;
  return (
    v.v === 1 &&
    v.alg === "AES-256-GCM" &&
    v.kdf === "PBKDF2" &&
    typeof v.iter === "number" &&
    typeof v.salt === "string" &&
    typeof v.iv === "string" &&
    typeof v.ciphertext === "string"
  );
}
