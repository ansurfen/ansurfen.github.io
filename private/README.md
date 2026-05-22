# 私密内容

只在 `private/` 写 Markdown，**不用**在 `docs/` 里放壳。

## 路径约定（统一）

```text
private/{locale}/{kind}/{id}.md
```

| kind | 示例 | 访问 URL |
|------|------|----------|
| `blog` | `private/zh_cn/blog/my-note.md` | `/zh_cn/articles/my-note` |
| `projects` | `private/zh_cn/projects/secret-app.md` | `/zh_cn/projects/secret-app` |

根目录 `private/vault.md` → `/private`（不进 manifest 列表）

## 博客 frontmatter

```md
---
title: 我的私密笔记
description: 列表上显示的摘要（勿写机密）
pubDatetime: 2025-07-07
category: 随笔
series: 可选
tags:
  - 标签
listed: true
draft: false
---

正文……
```

## 项目 frontmatter

```md
---
name: 私密项目
description: 列表摘要
technologies:
  - TypeScript
  - Node.js
type: core
sourceCode: https://github.com/...
preview: https://...
listed: true
draft: false
---

项目详情正文……
```

## 加密产物

运行 `pnpm private:encrypt` 后：

- **索引** → `public/private/manifest.json`（v2，`entries[]`，含 `kind` / `vaultFile`）
- **密文** → `public/private/vault/**/*.json`（**每篇一个文件**，只解密当前页所需）

不再使用单文件 `vault.json`（旧版会在加密时删除）。

## 命令

```bash
pnpm private:encrypt   # 按篇加密 + 生成 manifest
pnpm private:decrypt   # 从 vault/*.json 恢复到 private/
```

提交：`public/private/manifest.json` 与 `public/private/vault/` 目录。

## 说明

- 标题、摘要等元数据在列表和 URL 中**公开**；只有正文在密文里。
- `draft: true` 不生成页面；`listed: false` 不进列表但仍可通过 URL 访问（若知道 id）。
- 新增内容类型：在 `scripts/private-kinds.mjs` 与 `src/lib/private-kinds.ts` 注册 kind，并接上对应列表/详情页。
