import { h, type VNode } from "vue";
import { createHighlighterCore, type GrammarState, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const languages = {
  bash: () => import("shiki/langs/shellscript.mjs"),
  css: () => import("shiki/langs/css.mjs"),
  diff: () => import("shiki/langs/diff.mjs"),
  html: () => import("shiki/langs/html.mjs"),
  javascript: () => import("shiki/langs/javascript.mjs"),
  json: () => import("shiki/langs/json.mjs"),
  jsx: () => import("shiki/langs/jsx.mjs"),
  markdown: () => import("shiki/langs/markdown.mjs"),
  python: () => import("shiki/langs/python.mjs"),
  sql: () => import("shiki/langs/sql.mjs"),
  tsx: () => import("shiki/langs/tsx.mjs"),
  typescript: () => import("shiki/langs/typescript.mjs"),
  vue: () => import("shiki/langs/vue.mjs"),
  yaml: () => import("shiki/langs/yaml.mjs"),
};
const aliases: Record<string, keyof typeof languages> = {
  js: "javascript",
  md: "markdown",
  py: "python",
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  ts: "typescript",
  yml: "yaml",
  zsh: "bash",
};
let highlighter: Promise<HighlighterCore> | undefined;
function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [import("shiki/themes/github-light.mjs"), import("shiki/themes/github-dark.mjs")],
    langs: [],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });
  return highlighter;
}
export type HighlightedLine = string | VNode[];

export { splitCodeLines } from "./lines";

export async function loadHighlighter(language: string) {
  const name = language.toLowerCase();
  const lang =
    name === "ansi"
      ? "ansi"
      : Object.hasOwn(languages, name)
        ? (name as keyof typeof languages)
        : aliases[name];
  if (!lang) return null;
  const shiki = await getHighlighter();
  if (lang !== "ansi" && !shiki.getLoadedLanguages().includes(lang)) {
    await shiki.loadLanguage(languages[lang]);
  }
  return {
    highlight(code: string, state?: GrammarState) {
      const tokenize = (source: string) =>
        shiki.codeToTokens(source, {
          lang,
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
          grammarState: state,
        }).tokens;
      const tokens = lang === "ansi" ? code.split("\n").flatMap(tokenize) : tokenize(code);
      return {
        lines: tokens.map((line) =>
          line.map((token) =>
            h(
              "span",
              {
                style: token.htmlStyle,
                class: "text-(--shiki-light) dark:text-(--shiki-dark)",
              },
              token.content,
            ),
          ),
        ),
        state: shiki.getLastGrammarState(tokens),
      };
    },
  };
}
export type LoadedCodeHighlighter = Awaited<ReturnType<typeof loadHighlighter>>;

export async function highlightCode(code: string, language: string) {
  const loaded = await loadHighlighter(language);
  return loaded ? loaded.highlight(code).lines : null;
}

/** Cache only completed lines; tokenize the unfinished tail again as text streams. */
export function createIncrementalHighlight() {
  let previous: LoadedCodeHighlighter = null;
  let text = "";
  let lines: HighlightedLine[] = [];
  let state: GrammarState | undefined;
  return (value: string, loaded: LoadedCodeHighlighter): HighlightedLine[] => {
    const code = value.endsWith("\n") ? value.slice(0, -1) : value;
    if (loaded !== previous || !code.startsWith(text)) {
      previous = loaded;
      text = "";
      lines = [];
      state = undefined;
    }
    if (!loaded) return code.split("\n");
    const end = code.lastIndexOf("\n") + 1;
    if (end > text.length) {
      const result = loaded.highlight(code.slice(text.length, end - 1), state);
      text = code.slice(0, end);
      lines = [...lines, ...result.lines];
      state = result.state;
    }
    return [...lines, loaded.highlight(code.slice(end), state).lines[0] ?? ""];
  };
}
