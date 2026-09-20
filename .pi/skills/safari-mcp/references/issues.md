# File Safari findings on the owning GitHub repo

## Resolve the app repo

```bash
gh repo view --json nameWithOwner,url -q .nameWithOwner
```

If that fails:

```bash
git remote get-url origin
```

No GitHub remote → skip `gh issue create` and report findings in chat.

Use the remote that contains the files you audited (workspace package / submodule), not a guessed org from the folder name.

## Dedup

```bash
gh issue list --repo "$REPO" --state open --search "safari <short symptom>"
```

Skip if an open issue already tracks the same route + symptom. Comment with new Safari evidence instead of opening a duplicate.

Add labels only when they already exist (`gh label list`). Do not invent labels.

## Create

```bash
gh issue create --repo "$REPO" --title "$TITLE" --body "$(cat <<'EOF'
## Summary
<one sentence>

## Safari evidence
- URL / route:
- Safari: (from `safaridriver --version` or userAgent)
- Viewport:
- Appearance / reduced motion:
- Screenshot path:
- Console (errors/warnings):
- Network (failed or slow requests):
- `get_page_content` notes (UID / a11y name):

## Repro
1.
2.

## Expected
## Actual
## Suggested optimization
Do not implement in this issue unless asked.

## Severity
P0 | P1 | P2

## Why Safari MCP
Reproduced with Apple `safaridriver --mcp`, not Chromium.
EOF
)"
```

Title pattern: `Safari: <symptom> on <route>`

| Level | Meaning |
|---|---|
| P0 | Broken in Safari: cannot complete a core task |
| P1 | Major a11y, failed requests, serious layout, or clear perf regression |
| P2 | Polish, minor a11y, measured optimization |

One issue per distinct problem. Same root cause → one issue. 8+ findings → file P0/P1, then ask before every P2.

## Do not file

- MCP not configured / remote automation off
- Chromium-only observations
- Third-party / WebKit engine bugs (use [bugs.webkit.org](https://bugs.webkit.org); component **Safari** / **Web Inspector** as appropriate)
- Nitpicks without a repro
- Secrets, tokens, or personal page content in the body — redact

## MCP / WebKit bugs

If `screenshot.node` is a no-op, `set_emulated_media` cannot set `prefers-color-scheme`, or a tool crashes: describe it to the user and point at [WebKit bug reports](https://webkit.org/reporting-bugs/). Do not open that as an app issue.
