export type VaultFileEntry =
  | string
  | {
      content: string;
      html?: string;
    };

export function getVaultFileContent(entry: VaultFileEntry): string {
  if (typeof entry === "string") return entry;
  return entry.content;
}

export function getVaultFileHtml(entry: VaultFileEntry): string | undefined {
  if (typeof entry === "string") return undefined;
  return entry.html;
}
