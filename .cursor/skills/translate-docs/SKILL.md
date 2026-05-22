---
name: translate-docs
description: Translates ansurfen.github.io MDX content from one docs locale to all other locales under docs/{locale}/blog or docs/{locale}/projects. Use when the user asks to translate a blog post, project page, docs article, MDX in docs/, or sync content across en_us, zh_cn, zh_tw, ja_jp, fr_fr, es_es, pt_pt, ru, ar_sa.
---

# Translate Docs (Multi-locale MDX)

Translate **one source MDX** into **every other locale** in this repo. Do not translate UI strings in `src/lib/messages.ts` unless the user explicitly asks.

## Repo layout

```
docs/{locale}/{blog|projects}/{slug}.mdx
```

| Locale | Path segment | Blog collection |
|--------|--------------|-----------------|
| en_us | `en_us` | `blog` |
| zh_cn | `zh_cn` | `zhCNBlog` |
| zh_tw | `zh_tw` | `zhTWBlog` |
| ja_jp | `ja_jp` | `jaJPBlog` |
| fr_fr | `fr_fr` | `frFRBlog` |
| es_es | `es_es` | `esESBlog` |
| pt_pt | `pt_pt` | `ptPTBlog` |
| ru | `ru` | `ruBlog` |
| ar_sa | `ar_sa` | `arSABlog` |

All locales: `en_us`, `zh_cn`, `zh_tw`, `ja_jp`, `fr_fr`, `es_es`, `pt_pt`, `ru`, `ar_sa`.

## Workflow

Copy and track:

```
- [ ] 1. Resolve source file and locale
- [ ] 2. List target paths (all locales except source)
- [ ] 3. Read source + note frontmatter schema (blog vs projects)
- [ ] 4. Confirm overwrite policy with user if targets exist
- [ ] 5. Translate and write each target file
- [ ] 6. Summarize created/updated/skipped paths
```

### Step 1 — Resolve source

User may give:

- Full path: `docs/zh_cn/blog/en-day-1.mdx`
- Slug + hint: `en-day-1` in Chinese blog
- Open file in editor — use that path

Infer **source locale** from the first path segment under `docs/`. Infer **kind** from `blog` or `projects`.

**Slug rule**: Target files use the **same filename** as the source (`en-day-1.mdx` stays `en-day-1.mdx` in every locale).

List targets:

```bash
node scripts/list-translate-targets.mjs <source-path>
```

### Step 2 — Overwrite policy

| Situation | Action |
|-----------|--------|
| Target missing | Create file + parent dirs if needed |
| Target exists, user said translate/sync all | Overwrite with new translation |
| Target exists, user did not say overwrite | **Ask** before overwriting |
| User said "only missing locales" | Skip existing files |

### Step 3 — Frontmatter rules

**Blog** (`docs/.../blog/*.mdx`):

```yaml
---
pubDatetime: 2025-05-21   # copy unchanged from source
title: ...               # translate
description: ...         # translate
category: ...            # translate (e.g. Essay → 随笔)
series: ...              # translate if present; omit key if source omits it
tags: [...]              # translate tag labels to target language
draft: true              # copy if present
image: /path             # copy unchanged
---
```

**Projects** (`docs/.../projects/*.mdx`):

```yaml
---
name: ...                # translate
description: ...         # translate
technologies: [Astro, React]  # keep tech names in English
type: core|side          # copy unchanged
image, sourceCode, preview  # copy URLs unchanged
---
```

### Step 4 — Body translation rules

**Translate**: headings, paragraphs, lists, blockquotes, table cell text, alt text in markdown images.

**Do not translate**:

- Code blocks and inline code
- URLs, file paths, repo names, `@mentions`, `#hashtags` inside code
- MDX/JSX components and their props (e.g. `<Component name="foo" />`)
- YAML keys in frontmatter
- `pubDatetime`, `type`, `draft`, `image`, `sourceCode`, `preview`, technology names

**Preserve**: MDX structure, heading levels, list nesting, blank lines between sections, emoji if present in source.

**Tone**: Natural for the target language; technical blog style; match source formality (essay vs tutorial vs diary).

### Step 5 — Locale-specific notes

| Target | Notes |
|--------|--------|
| zh_cn | Simplified Chinese |
| zh_tw | Traditional Chinese (not copy-paste from zh_cn) |
| ja_jp | Polite です/ます or consistent plain style |
| ar_sa | RTL content in body is OK; frontmatter keys stay English |
| fr_fr, es_es, pt_pt, ru | Full translation of narrative text |

`category` / `series` / `tags` should read naturally in each locale (existing posts use localized values, not English leftovers).

### Step 6 — Validation

After writing files:

1. Frontmatter parses as valid YAML; required fields present per `src/content.config.ts`.
2. `pubDatetime` is a valid date string unchanged from source.
3. No broken MDX (unclosed fences, broken component tags).
4. Optionally run `pnpm run build` if user wants verification.

## Example

**Input**: `docs/en_us/blog/build-a-blog.mdx`

**Output**: Write 8 files:

- `docs/zh_cn/blog/build-a-blog.mdx`
- `docs/zh_tw/blog/build-a-blog.mdx`
- `docs/ja_jp/blog/build-a-blog.mdx`
- … `fr_fr`, `es_es`, `pt_pt`, `ru`, `ar_sa`

**Do not** write `docs/en_us/blog/build-a-blog.mdx` again (source locale).

## Response format

When done, report:

```markdown
## Translation summary
- **Source**: docs/en_us/blog/foo.mdx (en_us)
- **Created**: 3 paths
- **Updated**: 2 paths
- **Skipped**: 3 paths (reason)
```

## Additional resources

- Locale ↔ collection mapping: [locales.md](locales.md)
