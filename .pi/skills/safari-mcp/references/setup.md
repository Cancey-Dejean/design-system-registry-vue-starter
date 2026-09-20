# Safari MCP setup

Requires **macOS** and **Safari 27+** (`/usr/bin/safaridriver --mcp`) or **Safari Technology Preview 247+**. Linux/Windows machines cannot run this server.

Confirm:

```bash
/usr/bin/safaridriver --help | grep -e --mcp
```

If `--mcp` is missing, install Safari 27 or [Safari Technology Preview](https://developer.apple.com/safari/download/).

## Enable in Safari

1. Safari → Settings → Advanced → **Show features for web developers**
2. Safari → Settings → Developer → **Allow remote automation and external agents**

STP: same checkboxes inside Safari Technology Preview.

## Cursor (`~/.cursor/mcp.json`)

Project MCP config is not committed here (the binary is macOS-only and would fail on other OSes). Add this to the **user** MCP file on each Mac:

```json
"safari-mcp": {
  "command": "/usr/bin/safaridriver",
  "args": ["--mcp"]
}
```

STP:

```json
"safari-mcp-stp": {
  "command": "/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver",
  "args": ["--mcp"]
}
```

Merge with existing `mcpServers`. Do not overwrite unrelated entries. Reload MCP / restart Cursor, then `GetDynamicTools` with pattern `safari`. One agent connection at a time.

## Claude Code / Codex

```bash
claude mcp add safari-mcp -- "/usr/bin/safaridriver" --mcp
codex mcp add safari-mcp -- "/usr/bin/safaridriver" --mcp
```

STP binary path: `/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver`

## Failure modes

| Symptom | Fix |
|---|---|
| Namespace missing after config | Reload MCP / restart the client |
| Connection refused / not authorized | Enable remote automation in Safari Developer settings |
| `--mcp` unknown | Upgrade to Safari 27 or STP 247+ |
| Wrong browser / Chromium tools | You are not in Safari MCP — do not use `cursor-ide-browser` |

## Privacy

The server is local and does not phone home. Captured DOM, screenshots, and console go to **the connected agent**, not Apple. Isolated automation profile only — no personal Safari data.
