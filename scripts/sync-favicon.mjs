import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(
  root,
  "node_modules/@fortawesome/fontawesome-free/svgs/solid/feather.svg",
);

const raw = readFileSync(source, "utf8");
const pathMatch = raw.match(/\bd="([^"]+)"/);

if (!pathMatch) {
  throw new Error("Could not read feather icon path from Font Awesome package.");
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Surfen An">
  <!-- Generated from @fortawesome/fontawesome-free (pnpm favicon:sync) -->
  <style>
    path { fill: #18181b; }
    @media (prefers-color-scheme: dark) {
      path { fill: #fafafa; }
    }
  </style>
  <path d="${pathMatch[1]}"/>
</svg>
`;

writeFileSync(join(root, "public/favicon.svg"), favicon);
console.log("Synced public/favicon.svg from Font Awesome feather icon.");
