import {
  createMarkdownProcessor,
  markdownConfigDefaults,
} from "@astrojs/markdown-remark";

/** @type {import('@astrojs/markdown-remark').MarkdownProcessor | null} */
let processor = null;

export async function renderArticleMarkdown(body) {
  if (!processor) {
    processor = await createMarkdownProcessor(markdownConfigDefaults);
  }

  const { code } = await processor.render(body);
  return code;
}
