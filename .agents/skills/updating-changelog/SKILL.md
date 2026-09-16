---
name: updating-changelog
description: >-
  Use when finishing registry or docs work in this repo, before claiming done,
  handing off, or committing user-facing changes; or when the user asks to update
  the changelog, release notes, or content/docs/changelog.mdx.
---

# Updating the Changelog

Keep `content/docs/changelog.mdx` current after meaningful work. Skip it only for no-op, story-only, or unpublished-docs-shell edits with no consumer or maintainer impact.

## When to update

Update when any of these landed:

- New or removed published registry items
- Consumer-facing install path, alias, or usage example changes
- Breaking API / prop / file-layout changes for installable items
- New maintainer docs pages that agents or authors must follow
- Theme / styles / CLI behavior that changes how consumers install or use items

Do **not** update for:

- Pure internal refactors with identical published behavior
- Storybook-only or preview-only tweaks
- Typo fixes in unpublished shell UI under `src/`

## Workflow

1. Read `content/docs/changelog.mdx`.
2. Collect the session’s user-facing deltas (`git diff`, commits since last changelog date, or the work just finished).
3. Write bullets that say what changed for consumers or maintainers — not file lists.
4. Place the entry **newest first**, immediately under the intro/`---` block.
5. Run `bun run registry:doctor` after editing the page.

## Entry format

Prefer a dated section unless the user (or `package.json`) bumps a version:

```mdx
## Month D, YYYY

- Published `item-name`.
- One concrete consumer-facing change.
- Breaking: what broke and what to do instead. Link related docs when useful.
```

Versioned form when releasing:

```mdx
## v0.2.0: Month D, YYYY
```

Rules:

- Use today’s date from user/session context (do not invent dates).
- If today’s heading already exists, **append** new bullets there — do not duplicate the heading.
- Keep 1–5 bullets. Merge related edits into one bullet.
- Name registry items with backticks (`spinner`, `button`).
- Link docs with site paths (`[variant files](/docs/variants)`), not filesystem paths.
- Do not invent a version bump. Stay dated until `package.json` version changes or the user asks for a version label.
- Do not rewrite older entries unless correcting a factual error.

## Good vs bad bullets

```mdx
<!-- Good -->

- Published `spinner`.
- Install targets and usage examples now use the `@ui/` alias.
- Standardized `*.variants.ts` recipes. See [variant files](/docs/variants).

<!-- Bad -->

- Updated several files.
- Refactored components.
- Changed Alert.variants.ts, Badge.variants.ts, Bubble.variants.ts, …
```

## Checklist

```
- [ ] Read current changelog.mdx
- [ ] Filter to user-facing / maintainer-facing deltas
- [ ] Add or extend today’s (or versioned) section, newest first
- [ ] Avoid duplicate headings and file-list bullets
- [ ] bun run registry:doctor
```
