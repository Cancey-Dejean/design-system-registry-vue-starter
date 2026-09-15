import { codeToHtml } from "shiki";

export function useHighlightedCode(code: MaybeRefOrGetter<string>, lang: MaybeRefOrGetter<string>) {
  const html = ref("");

  watchEffect(async () => {
    const currentCode = toValue(code);
    const currentLang = toValue(lang);

    try {
      html.value = await codeToHtml(currentCode, {
        lang: currentLang,
        themes: { light: "github-light", dark: "github-dark" },
      });
    } catch {
      html.value = "";
    }
  });

  return html;
}
