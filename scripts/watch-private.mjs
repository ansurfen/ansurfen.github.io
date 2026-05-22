/**
 * chokidar 监听 private/，变更后子进程执行 encrypt-private.mjs
 * 口令：项目根 .env 的 PASSPHRASE（子进程继承），或环境变量
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import chokidar from "chokidar";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_DIR = join(ROOT, "private");
const ENCRYPT_SCRIPT = join(ROOT, "scripts", "encrypt-private.mjs");

let busy = false;
let pending = false;
let timer = null;

function runEncrypt() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [ENCRYPT_SCRIPT], {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    });

    child.on("error", reject);
    child.on("close", code => {
      if (code === 0) resolve();
      else reject(new Error(`encrypt-private 退出码 ${code}`));
    });
  });
}

async function triggerEncrypt() {
  if (busy) {
    pending = true;
    return;
  }
  busy = true;
  try {
    await runEncrypt();
  } catch (err) {
    console.error(
      `[private:watch] ${err instanceof Error ? err.message : err}`,
    );
  } finally {
    busy = false;
    if (pending) {
      pending = false;
      scheduleEncrypt();
    }
  }
}

function scheduleEncrypt() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    void triggerEncrypt();
  }, 300);
}

if (!existsSync(PRIVATE_DIR)) {
  console.error(`找不到目录: ${PRIVATE_DIR}`);
  process.exit(1);
}


console.log(`[private:watch] 监听 ${PRIVATE_DIR}`);
void triggerEncrypt();

chokidar
  .watch(join(PRIVATE_DIR, "**/*.md"), {
    ignored: path => path.endsWith("README.md"),
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 400, pollInterval: 50 },
  })
  .on("all", (event, path) => {
    console.log(`[private:watch] ${event} ${path}`);
    scheduleEncrypt();
  });
