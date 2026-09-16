import { codeToHtml } from "shiki";

export function useHighlightedCode(code: MaybeRefOrGetter<string>, lang: MaybeRefOrGetter<string>) {
  const html = ref("");

  watchEffect(async () => {
    const currentCode = toValue(code);
    const currentLang = toValue(lang);

    try {
      const raw = await codeToHtml(currentCode, {
        lang: currentLang,
        themes: { light: "github-light", dark: "github-dark" },
      });
      // Shiki's default renderer puts the source's own newline *between* each line's closing
      // </span> and the next <span class="line">. Making .line a block box (for the line-number
      // gutter) turns that leftover newline into a second, blank line for every real one.
      html.value = raw.replace(/(<\/span>)\n(?=<span class="line")/g, "$1");
    } catch {
      html.value = "";
    }
  });

  return html;
}
