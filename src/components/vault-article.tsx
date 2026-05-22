import { useCallback, useEffect, useRef, useState } from "react";
import {
  decryptVault,
  isEncryptedVault,
  parseEntryPayload,
  type EncryptedVault,
} from "@/lib/private-crypto";
import { getVaultFileHtml } from "@/lib/vault-content";
import { initCodeCopyButtons } from "@/lib/init-code-copy";
import type { VaultMessages } from "@/lib/messages";

type ViewState = "locked" | "loading" | "unlocked" | "error";

interface VaultArticleProps {
  vaultUrl: string;
  messages: VaultMessages;
}

export default function VaultArticle({ vaultUrl, messages }: VaultArticleProps) {
  const [passphrase, setPassphrase] = useState("");
  const [html, setHtml] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>("locked");
  const [error, setError] = useState<string | null>(null);
  const proseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (html && proseRef.current) {
      initCodeCopyButtons(proseRef.current);
    }
  }, [html]);

  const handleUnlock = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setError(null);
      setViewState("loading");

      try {
        const response = await fetch(vaultUrl);
        if (!response.ok) {
          throw new Error(
            "Failed to load ciphertext. Run pnpm private:encrypt first.",
          );
        }

        const payload: unknown = await response.json();
        if (!isEncryptedVault(payload)) {
          throw new Error("Invalid ciphertext format");
        }

        const plain = await decryptVault(payload as EncryptedVault, passphrase);
        const entry = parseEntryPayload(plain);
        const rendered = getVaultFileHtml(entry);

        if (!rendered) {
          throw new Error(
            "No prerendered HTML for this entry. Run pnpm private:encrypt again.",
          );
        }

        setHtml(rendered);
        setPassphrase("");
        setViewState("unlocked");
      } catch (err) {
        const message =
          err instanceof DOMException && err.name === "OperationError"
            ? "Wrong passphrase or corrupted ciphertext"
            : err instanceof Error
              ? err.message
              : "Decryption failed";
        setError(message);
        setViewState("locked");
      }
    },
    [passphrase, vaultUrl],
  );

  if (viewState === "unlocked" && html !== null) {
    return (
      <div
        ref={proseRef}
        className="prose min-w-full max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <form onSubmit={handleUnlock} className="space-y-4">
      <p className="text-sm text-muted-foreground">{messages.hint}</p>
      <label className="block space-y-2">
        <span className="text-sm font-medium">{messages.passphraseLabel}</span>
        <input
          type="password"
          name="passphrase"
          autoComplete="current-password"
          value={passphrase}
          onChange={e => setPassphrase(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus-visible:ring-2"
          placeholder={messages.passphrasePlaceholder}
          required
        />
      </label>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={viewState === "loading" || !passphrase}
        className="rounded-md border border-border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
      >
        {viewState === "loading" ? messages.unlocking : messages.unlock}
      </button>
    </form>
  );
}
