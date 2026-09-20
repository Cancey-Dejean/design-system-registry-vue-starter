# Safari MCP tools (Safari 27 `safaridriver --mcp`)

Server name: `Safari` `1.0.0`. Always prefer the live schema over this list.

| Tool | Use for |
|---|---|
| `list_tabs` | Open tabs + handles |
| `create_tab` | New tab, optional `url` |
| `switch_tab` / `close_tab` | `handle` required |
| `navigate_to_url` | `url` required; optional `tab_uuid`; waits and returns extracted content |
| `wait_for_navigation` | Optional `timeout_seconds` (default 30) |
| `page_info` | URL, title, loading state |
| `get_page_content` | **Preferred read.** UIDs for interactions. See flags below |
| `page_interactions` | Batched click/type/keyPress/scroll/selectText/selectMenuItem/hover/highlightText |
| `screenshot` | PNG **file path**. Viewport default; `full_page` optional |
| `evaluate_javascript` | Function **body** with `return`. `$uid(N)` from page content |
| `browser_console_messages` | Clears buffer by default (`clear: true`) |
| `list_network_requests` / `get_network_request` | Summaries then full headers/body/timing |
| `set_viewport_size` | `width` + `height` CSS px; window-wide |
| `set_emulated_media` | CSS media **type** (`screen`/`print`). Empty string clears |
| `browser_dialogs` | `action`: `list` / `respond` / `dismiss`; `inputText` for prompts |

## `get_page_content` defaults

- `format`: `textTree` (`text` is an alias). Also `markdown`, `json`, `html`, `plainText`
- `region`: `viewport` — use `entire_page` when needed
- `nodeIds`: `interactive` (ignored for markdown/plainText)
- `includeAccessibilityAttributes`: true
- `includeURLs`: true
- `maxWordsPerParagraph`: 15 — raise for full copy
- Output ≥ 32 kB → temp file path. `savePath` always writes to disk

## `page_interactions`

Each item needs `purpose` + `type`. Prefer **one batched call**. Target `node` (UID string) first; `text` is find-in-page; `point` last. 400 ms settle between steps. Clicks that navigate wait and return new content.

## `evaluate_javascript`

```javascript
const el = $uid(42);
return getComputedStyle(el).display;
```

`frameId` runs inside an iframe UID from page content.

If `$uid` throws `Can't find variable: $uid` (seen through Cursor's MCP wrapper), fall back to `document.querySelector` / the element's `href` / `aria-label`. Do not invent snapshot refs.

## Session gotchas

- `list_network_requests` may error with `Network request recording is unavailable for this session`. Continue the rest of the loop; do not file that as an app issue.
- Parallel tool calls can drop the browsing context (`No active tab` / `Could not find browsing context`). Prefer sequential calls for a single tab.
- `screenshot.node` is a documented no-op; crop the viewport PNG.

## Not in this server

No dedicated a11y-tree tool, no `prefers-color-scheme` / `prefers-reduced-motion` emulation, no per-element screenshot (the `node` screenshot arg is a no-op), no personal-profile access, no network mocking.
