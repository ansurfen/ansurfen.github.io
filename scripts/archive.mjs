import { execFileSync } from "node:child_process";
import { basename, dirname, join, relative, resolve } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const defaultOut = join(root, "..", `${basename(root)}.tar.gz`);
const out = resolve(process.argv[2] ?? defaultOut);
const outRel =
  out.startsWith(root + "/") || out === root
    ? relative(root, out)
    : null;

const tmp = mkdtempSync(join(tmpdir(), "archive-"));
const staging = join(tmp, "payload");

try {
  const rsyncArgs = [
    "-a",
    "--filter=:- .gitignore",
    "--exclude=.git/",
    "--exclude=node_modules/",
    "--exclude=dist/",
    "--exclude=.astro/",
  ];

  if (outRel) {
    rsyncArgs.push(`--exclude=${outRel}`);
  }

  rsyncArgs.push(`${root}/`, `${staging}/`);

  execFileSync("rsync", rsyncArgs, { stdio: "inherit" });
  execFileSync("tar", ["-czf", out, "-C", staging, "."], { stdio: "inherit" });
  console.log(`Created ${out}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
