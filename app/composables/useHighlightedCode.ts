import { codeToHtml } from "shiki";

function innerCodeHtml(raw: string): string {
  const match = raw.match(/<code[^>]*>([\s\S]*)<\/code>/);
  return match?.[1] ?? raw;
}

export function useHighlightedCode(code: MaybeRefOrGetter<string>, lang: MaybeRefOrGetter<string>) {
  const html = ref("");

  watchEffect(async () => {
    const currentCode = toValue(code);
    const currentLang = toValue(lang);

    try {
      // Theme keys (`default` / `dark`) and `defaultColor: false` match @nuxtjs/mdc's highlighter
      // so tokens pick up the same `--shiki-default` / `--shiki-dark` CSS already injected for
      // markdown Usage blocks — no inline `color` that would fight dark mode.
      const raw = await codeToHtml(currentCode, {
        lang: currentLang,
        themes: { default: "github-light", dark: "github-dark" },
        defaultColor: false,
        rootStyle: false,
      });
      // Shiki's default renderer puts the source's own newline *between* each line's closing
      // </span> and the next <span class="line">. Making .line a block box (for the line-number
      // gutter) turns that leftover newline into a second, blank line for every real one.
      html.value = innerCodeHtml(raw).replace(/(<\/span>)\n(?=<span class="line")/g, "$1");
    } catch {
      html.value = "";
    }
  });

  return html;
}
