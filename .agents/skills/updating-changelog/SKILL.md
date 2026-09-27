---
name: updating-changelog
description: >-
  Update content/docs/changelog.mdx after user-facing registry, component,
  docs, or install-path changes. Use when finishing registry work, adding or
  changing published items, documenting breaking changes, or when the user asks
  to update the changelog.
---

# Update Changelog

Keep [`content/docs/changelog.mdx`](../../../content/docs/changelog.mdx) current whenever shipped work is user-facing for registry consumers or maintainers.

This repo is a Nuxt 4 + shadcn-vue registry. Installable source lives in `registry/items/**` (`_registry.md` is the published item). The docs site is `app/` + `content/docs/`. Changelog versions are the source of truth (`package.json` has no `version`).

## When To Run

Run this skill **before handoff** after changes that affect:

- New, renamed, or removed registry items
- Published source layout, install `target`s, or package file lists
- Component APIs, variants, defaults, or breaking behavior
- Public docs that change how consumers install or author items
- Migration notes consumers need

Skip for:

- Pure internal refactors with no install, API, docs, or behavior impact (for example renaming a private helper inside an unpublished story)
- Storybook-only (`**/stories/*.stories.ts`) or `_preview.vue`-only tweaks
- Typo or layout fixes in the unpublished docs shell under `app/` or `.storybook/`
- Tooling-only Vite+ / `vp` config that does not change installs

## Workflow

1. Read `content/docs/changelog.mdx` and note the latest date heading (`## Month D, YYYY`) and its version (`### vX.Y.Z`). Leave the frontmatter (`title`, `description`, `order: 99`) and the intro paragraph alone.
2. Summarize **only what landed in this session / PR** from the git diff or known edits. Prefer consumer impact over implementation detail.
3. Choose a version bump:
   - **Major** (`x.0.0`): breaking consumer API or install path changes
   - **Minor** (`x.Y.0`): new items, conventions, or non-breaking enhancements
   - **Patch** (`x.y.Z`): fixes, docs clarifications, small non-breaking tweaks
4. Use today's date from the conversation/user context as `Month D, YYYY` (for example `August 14, 2026`).
5. Each calendar day has **one** version: the latest version released that day. Edit the changelog:
   - If the latest section is already today's date, **append bullets** under that day's version. If this session's bump is higher, replace the `### vX.Y.Z` subheading with the new version and keep every note from earlier versions that day under it.
   - Otherwise **insert a new day** immediately after the intro blurb and before the previous release:

```mdx
## Month D, YYYY

### vX.Y.Z

- **New:** `Spinner` is an accessible loading indicator.
- **Update:** `Button` variants now use CSS variables for colors.
- **Docs:** [Installation](/docs/installation) now uses one package-manager switcher.
- **Breaking:** Removed the `link` button variant. Use `as="a"` instead.

---
```

   - Do not add a second version heading for the same date. Move notes from any earlier same-day version under the latest version, then remove the earlier version heading.

6. Match existing tone: concise bullets, component names in backticks or plain title case as in prior entries, link to docs pages when helpful (`[Registry](/docs/registry)`).
7. Do not invent unshipped work. Do not rewrite older release sections unless correcting a factual error.

## Bullet Style

Every bullet starts with a kind label:

- **New:** something added
- **Update:** a change to existing behavior
- **Fix:** a bug fix
- **Docs:** documentation and previews
- **Styles:** theme and style publishing
- **Breaking:** a breaking change

Good:

```mdx
- **New:** `Spinner` is an accessible loading indicator.
- **Update:** `cva()` definitions now live in colocated `<name>.variants.ts` files.
- **Docs:** Documented the Component Variants pattern on [Registry](/docs/registry).
- **Fix:** The pointer cursor now appears when hovering `Button` components.
- **Styles:** The `styles` item now publishes `theme-secondary.css`.
- **Breaking:** Removed the `link` button variant. Use `as="a"` instead.
```

Avoid:

- Commit-style noise (`refactor: move files`)
- Exhaustive file lists when a category summary is clearer
- Internal-only tooling notes that do not change published items or docs

## After Editing

- Confirm the new section sits above older versions (newest first).
- Run `vp check` after editing the page.
- No need to run `doctor.ts` for docs-only changelog edits unless other registry files changed in the same handoff.
