const VAULT_PASSPHRASE_KEY = "private-vault-passphrase";

function canUseSessionStorage(): boolean {
  return typeof sessionStorage !== "undefined";
}

export function getStoredPassphrase(): string | null {
  if (!canUseSessionStorage()) return null;
  try {
    return sessionStorage.getItem(VAULT_PASSPHRASE_KEY);
  } catch {
    return null;
  }
}

export function setStoredPassphrase(passphrase: string): void {
  if (!canUseSessionStorage()) return;
  try {
    sessionStorage.setItem(VAULT_PASSPHRASE_KEY, passphrase);
  } catch {
    // Quota exceeded or storage disabled — ignore.
  }
}

export function clearStoredPassphrase(): void {
  if (!canUseSessionStorage()) return;
  try {
    sessionStorage.removeItem(VAULT_PASSPHRASE_KEY);
  } catch {
    // Ignore.
  }
}
