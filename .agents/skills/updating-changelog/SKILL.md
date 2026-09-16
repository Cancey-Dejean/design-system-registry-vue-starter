---
name: updating-changelog
description: >-
  Use when finishing registry, docs, or published-item work in this Nuxt
  shadcn-vue registry, before claiming done, handing off, or committing
  user-facing changes; or when the user asks to update the changelog,
  release notes, or content/docs/changelog.mdx.
---

# Updating the Changelog

Keep `content/docs/changelog.mdx` current after meaningful work. Skip it only for no-op, Storybook/`_preview.vue`-only, or unpublished docs-shell edits with no consumer or maintainer impact.

This repo is a Nuxt 4 + shadcn-vue registry. Installable source lives in `registry/items/**` (`_registry.md` is the published item). The docs site is `app/` + `content/docs/`. Changelog versions are the source of truth — `package.json` has no `version`, and there is no `registry:doctor` script.

## When to update

Update when any of these landed:

- New, moved, or removed published registry items under `registry/items/{components,blocks,hooks,files}/**`
- Consumer-facing install path, alias, or usage example changes (`_registry.md` `target`, `@ui/`, `@/components/ui/`, `#registry-ui`)
- Breaking API / prop / variant / file-layout changes for installable items
- New maintainer docs pages under `content/docs/` that agents or authors must follow
- Theme / styles / CLI behavior that changes how consumers install or use items (`components.json`, `globals.css`, `theme.css`)

Do **not** update for:

- Pure internal refactors with identical published behavior
- Storybook-only (`**/stories/*.stories.ts`) or `_preview.vue`-only tweaks
- Typo or layout fixes in the unpublished docs shell under `app/` or `.storybook/`
- Tooling-only Vite+ / `vp` config that does not change installs

## Workflow

1. Read `content/docs/changelog.mdx`. Leave the frontmatter (`title`, `description`, `order: 99`) and the intro paragraph alone.
2. Collect the session’s user-facing deltas (`git diff`, commits since the latest changelog heading, or the work just finished).
3. Write bullets that say what changed for consumers or maintainers — not file lists.
4. Place the entry **newest first**, immediately under the intro/`---` block. Separate version sections with `---`.
5. Run `vp check` after editing the page.

## Entry format

Always use a versioned heading matching existing entries:

```mdx
## v1.5.4: Month D, YYYY

- Published `Spinner`.
- One concrete consumer-facing change.
- **Breaking:** what broke and what to do instead. Link related docs when useful.
```

Version rules:

- Use today’s date from user/session context (do not invent dates). Date form is `September 16, 2026` (Month D, YYYY).
- If the latest heading is already today, **append** bullets there — do not duplicate the heading or bump the version.
- Otherwise increment the latest `vX.Y.Z`. Default to **patch**. Use **minor** for a batch of new published items or a requested feature release. Use **major** only when the user asks.
- Do not skip ahead of the latest heading. Do not use date-only headings (`## Month D, YYYY`).

Content rules:

- Name items with their `_registry.md` `title` in backticks (`Button`, `Spinner`, `Hero`). Hooks stay camelCase (`useBodyOverflow`).
- Link docs and catalog pages with site paths (`[variant files](/docs/variants)`, `[Button](/components/button)`), not filesystem paths — except when the change *is* a move or install-target, then include the new published path.
- Prefix breaking notes with `**Breaking:**`. Optional bold label for a moved item (`**Announcement Bar:**`).
- Keep bullets concrete. Merge related edits. Do not dump file lists.
- Do not rewrite older entries unless correcting a factual error.

## Good vs bad bullets

```mdx
<!-- Good -->

- Published `Spinner`.
- Updated `Button` variants to use CSS variables. See [variant files](/docs/variants).
- **Breaking:** Removed the `link` variant. Use an `as="a"` button instead.

<!-- Bad -->

- Updated several files.
- Refactored components.
- Changed Button.variants.ts, Badge.variants.ts, Bubble.variants.ts, …
```

## Checklist

```
- [ ] Read current changelog.mdx
- [ ] Filter to user-facing / maintainer-facing deltas
- [ ] Add or extend today’s versioned section, newest first, separated by ---
- [ ] Use PascalCase titles, **Breaking:**, and site-path links
- [ ] vp check
```
