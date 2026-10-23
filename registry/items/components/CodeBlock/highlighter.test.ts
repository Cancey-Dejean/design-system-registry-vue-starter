import { describe, expect, test } from "vite-plus/test";
import {
  createIncrementalHighlight,
  highlightCode,
  loadHighlighter,
  splitCodeLines,
} from "./highlighter";

function text(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(text).join("");
  if (value && typeof value === "object" && "children" in value) return text(value.children);
  return "";
}

describe("code block highlighting", () => {
  test("plain text fallback keeps blank lines and removes only the final terminator", () => {
    expect(splitCodeLines("a\n\nb\n")).toEqual(["a", "", "b"]);
    expect(splitCodeLines("")).toEqual([""]);
  });
  test("unsupported languages fall back without throwing", async () => {
    expect(await highlightCode("<unsafe>", "unknown-language")).toBeNull();
  });
  test("language aliases return safe Vue tokens with source text intact", async () => {
    const result = await highlightCode('const text = "<script>";', "ts");
    expect(result).not.toBeNull();
    expect(result?.map(text).join("\n")).toBe('const text = "<script>";');
  });
  test("incremental code matches full tokenization across multiline grammar state", async () => {
    const highlighter = await loadHighlighter("typescript");
    const update = createIncrementalHighlight();
    update("/* comment\n", highlighter);
    const source = "/* comment\ncontinued */\nconst done = true;\n";
    const streamed = update(source, highlighter);
    const complete = await highlightCode(source.replace(/\n$/u, ""), "typescript");
    expect(streamed.map(text)).toEqual(complete?.map(text));
    const tokenStyles = (lines: typeof streamed) =>
      lines.map((line) =>
        typeof line === "string"
          ? line
          : line.map((token) => ({ content: token.children, style: token.props?.style })),
      );
    expect(tokenStyles(streamed)).toEqual(tokenStyles(complete ?? []));
    expect(streamed.map(text)).toEqual(["/* comment", "continued */", "const done = true;"]);
  });
  test("ANSI output preserves text and does not require grammar state", async () => {
    const result = await highlightCode("\u001b[31merror\u001b[0m\nnext", "ansi");
    expect(result?.map(text)).toEqual(["error", "next"]);
  });
  test("replacing code resets completed lines", async () => {
    const highlighter = await loadHighlighter("json");
    const update = createIncrementalHighlight();
    update('{\n"old": 1\n}', highlighter);
    expect(update('{"new": 2}', highlighter).map(text)).toEqual(['{"new": 2}']);
  });
});
