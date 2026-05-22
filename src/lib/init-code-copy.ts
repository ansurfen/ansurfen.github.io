/** 与 article-layout 中逻辑一致，供私密文解锁后注入的 HTML 使用 */
export function initCodeCopyButtons(root: ParentNode = document) {
  const copyButtonLabel = "Copy";
  const codeBlocks = Array.from(root.querySelectorAll("pre"));

  for (const codeBlock of codeBlocks) {
    if (codeBlock.querySelector(".copy-code")) continue;

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const copyButton = document.createElement("button");
    copyButton.className = "copy-code";
    copyButton.innerHTML = copyButtonLabel;

    codeBlock.appendChild(copyButton);
    codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    copyButton.addEventListener("click", async () => {
      const code = codeBlock.querySelector("code");
      await navigator.clipboard.writeText(code?.innerText ?? "");
      copyButton.innerText = "Copied!";
      setTimeout(() => {
        copyButton.innerText = copyButtonLabel;
      }, 1000);
    });
  }
}
