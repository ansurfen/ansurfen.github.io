export { buildManifestEntry, parsePrivatePath, vaultPathToVaultFile } from "./private-kinds.mjs";

/** @param {string} yaml */
function parseSimpleYaml(yaml) {
  /** @type {Record<string, unknown>} */
  const data = {};
  let currentKey = null;
  /** @type {string[]} */
  let listItems = [];

  const flushList = () => {
    if (currentKey && listItems.length) {
      data[currentKey] = listItems;
      listItems = [];
    }
  };

  for (const line of yaml.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const listMatch = trimmed.match(/^- (.+)$/);
    if (listMatch && currentKey) {
      listItems.push(stripQuotes(listMatch[1]));
      continue;
    }

    flushList();
    const kv = trimmed.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;

    currentKey = kv[1];
    const raw = kv[2].trim();

    if (!raw) continue;

    if (raw === "true") data[currentKey] = true;
    else if (raw === "false") data[currentKey] = false;
    else if (/^\[.*\]$/.test(raw)) {
      try {
        data[currentKey] = JSON.parse(raw.replace(/'/g, '"'));
      } catch {
        data[currentKey] = raw;
      }
    } else {
      data[currentKey] = stripQuotes(raw);
    }
  }

  flushList();
  return data;
}

/** @param {string} value */
function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

/** @param {string} content */
export function parseMarkdownFile(content) {
  if (!content.startsWith("---")) {
    return { frontmatter: {}, body: content };
  }

  const end = content.indexOf("\n---", 3);
  if (end === -1) {
    return { frontmatter: {}, body: content };
  }

  const yaml = content.slice(3, end).trim();
  const body = content.slice(end + 4).replace(/^\n/, "");
  return { frontmatter: parseSimpleYaml(yaml), body };
}

/** @param {Record<string, unknown>} fm */
export function stringifyFrontmatter(fm) {
  const lines = ["---"];

  for (const [key, value] of Object.entries(fm)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${item}`);
      }
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push("---");
  return lines.join("\n");
}
