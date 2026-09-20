---
name: safari-mcp
description: Use when verifying, auditing, debugging, testing, or optimizing a web UI in Safari or WebKit; when Safari MCP, safaridriver --mcp, Safari 27, or Safari Technology Preview is available or should be used; when checking Safari rendering, compatibility, dark mode, reduced motion, accessibility, console/network, layout, or iOS viewport quirks; and when Safari findings should become GitHub issues on the current project instead of Chromium-as-Safari or silent drive-by fixes.
---

# Safari MCP

Drive Apple's official Safari MCP (`safaridriver --mcp`). Do not substitute Cursor's Chromium browser, Playwright WebKit, or a screenshot of another engine and call it Safari.

Official docs: [Connecting an AI agent to Safari](https://developer.apple.com/documentation/safari-developer-tools/connecting-an-ai-agent-to-safari) · [WebKit announcement](https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/)

## This registry

Nuxt 4 docs site + Storybook. Start with `vp run dev` if nothing is listening. Typical URLs:

| Surface | URL |
|---|---|
| Docs / registry site | http://localhost:3000 |
| Storybook | http://localhost:6006 |

`@nuxtjs/color-mode` uses `classSuffix: ""`, so dark mode is `class="dark"` on `<html>`. Prefer the header **Toggle theme** control (`sr-only` name "Toggle theme") over injecting the class. Ignore Nuxt DevTools, Storybook manager chrome, and Vite overlays when filing issues.

This skill travels with the repo. Safari MCP itself does not — on a new Mac, follow [references/setup.md](references/setup.md) (Safari 27+, remote automation, then add the MCP server in the client).

## Fail closed

Safari MCP missing, macOS-only binary missing, or remote automation disabled → **stop**. Print the setup in [references/setup.md](references/setup.md). Do **not** fall back to `cursor-ide-browser` and claim Safari verification.

The MCP session is an **isolated automation profile**: no personal Safari cookies, AutoFill, or history. Do not try to test logged-in third-party accounts in this session.

## Discover tools at runtime

Cursor: `GetDynamicTools` with pattern `safari` / `safaridriver`, then `GetDynamicTools` for the namespace + tool before `CallDynamicTool`. The namespace is often `user-safari-mcp`.

Claude Code / Codex: tools appear on the `safari-mcp` (or `safari-mcp-stp`) server. Use the live schema; do not invent Chrome-style snapshot refs.

Prefer Apple's `safaridriver --mcp`. Use a community logged-in Safari MCP only if the user explicitly wants that profile.

Tool catalog and gotchas: [references/tools.md](references/tools.md)

## Verification loop

Copy and track:

```
Safari MCP
- [ ] Server discovered (not Chromium)
- [ ] Dev server URL known
- [ ] create_tab / navigate_to_url + wait_for_navigation / page_info
- [ ] get_page_content (prefer over screenshot/JS scrape)
- [ ] screenshot of the changed UI (visual proof only)
- [ ] Exercise the changed control via page_interactions (batch)
- [ ] browser_console_messages (errors/warnings)
- [ ] list_network_requests (4xx/5xx, failed assets)
- [ ] Desktop + one mobile viewport
- [ ] Color scheme + reduced motion (see audits — not set_emulated_media)
- [ ] Findings filed or explicitly none
```

1. Find the target URL (running terminal / `vp run dev` / table above). Start the app if needed.
2. `create_tab` with the URL or `navigate_to_url`. Then `wait_for_navigation` / `page_info`.
3. `get_page_content` with `format: "textTree"`, `includeAccessibilityAttributes: true`. Use `region: "entire_page"` when content is below the fold. Interact with **node UIDs** from that output (`page_interactions.node`, `evaluate_javascript` `$uid(N)`).
4. `screenshot` only when rendering/layout/appearance matters. It returns a **file path**, not inline PNG. Element `node` screenshots are currently a no-op — crop the viewport shot if needed.
5. Batch related clicks/types in **one** `page_interactions` call (`purpose` required on each step).
6. After exercising the UI: console + network. `browser_console_messages` **clears the buffer by default** — read errors before a second clear, or pass `clear: false`.
7. `set_viewport_size` to `1440x900` and `390x844` (or the project's documented breakpoints). Viewport is **window-wide**, not per-tab — resize, re-extract, screenshot, then restore if needed.
8. `set_emulated_media` is **CSS media type only** (`screen` / `print`). For dark appearance and reduced motion, use the app's theme control or the JS in [references/audits.md](references/audits.md).
9. `evaluate_javascript` is a **function body**: include `return`. Prefer `get_page_content` for reading; use JS for computed styles, `CSS.supports`, timing, a11y math.

A screenshot alone is not verification. The checklist is the minimum for claiming "verified in Safari": narrow **which routes** you cover, not which boxes you skip.

## Optimizations → GitHub issues

Default: **file issues**, do not silently "optimize" the product. Fix in-repo only when the user asked to fix, or the change is a one-line regression you just introduced.

Route the issue to the **repo that owns the finding**:

| Finding | Repo |
|---|---|
| App rendering, a11y, performance, Safari CSS/JS quirks | Current git remote (`gh repo view --json nameWithOwner -q .nameWithOwner`) |
| Files live in a nested package/submodule | That package's remote, not a parent monorepo by default |
| `safaridriver --mcp` crash, wrong schema, tool no-op | WebKit ([bugs.webkit.org](https://bugs.webkit.org)), **not** the app |
| Community Safari MCP (AppleScript/extension) | That GitHub repo |

Before opening: `gh issue list --search "<symptom>" --state open` and skip duplicates.

Issue template and `gh` commands: [references/issues.md](references/issues.md)

Keep only reproducible Safari/WebKit bugs, a11y failures, failed requests, layout breaks, and measured performance issues. Drop HMR chatter, TanStack/Vite overlay internals, extension noise, and speculation.

Every app issue needs Safari evidence (URL, viewport, Safari version, screenshot path, console/network, expected vs actual). No evidence → no issue. No GitHub remote → report in chat only. If 8+ findings, file P0/P1 first and list the rest.

## Red flags

| Excuse | Reality |
|---|---|
| "Cursor browser is close enough" | Different engine. Not Safari. |
| "Screenshot looks fine" | Misses console, network, a11y tree, keyboard. |
| "I'll just fix this alt text while I'm here" | User asked for issues unless they asked to fix. |
| "Safari MCP isn't loaded, I'll use Chromium" | Fail closed. Set it up. |
| "set_emulated_media covers dark mode" | It does not. Media **type** only. |

## When not to use

- Non-web tasks, native iOS/macOS apps, or CI E2E (use Playwright/WebKit tests).
- Driving the user's **personal** logged-in Safari windows — this MCP cannot see that profile.
