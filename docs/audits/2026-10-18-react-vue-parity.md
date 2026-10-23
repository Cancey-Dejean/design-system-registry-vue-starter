# React → Vue parity audit

Date: 2026-10-18. Scope: current Vue working tree against the local React starter and https://reactdocs.canceydejean.dev/docs. This is an initial parity audit, not an implementation or certification of every route.

## Implementation update — October 19, 2026

The findings below preserve the original audit baseline. The working tree now includes Introduction and corrected setup instructions; section navigation, bounded paging and mobile-close behavior; preview galleries with category/search/grid controls; weighted typo-tolerant search; isolated preview artboards; canonical metadata, sitemap and robots; Storybook integration; consumer import/dependency repairs; and all 17 missing registry capabilities.

The catalog increased from 76 to 93 descriptors. See [capability mapping](2026-10-18-catalog-capabilities.md) for intentional aliases and implementation details.

Fresh validation: `vp install` completed; `vp test` passed **105 files / 348 tests**; `vp exec nuxt typecheck` exited 0. `vp check` stops on **42 existing formatting issues**. Registry doctor exits 0 with authoring/publication warnings. `vp run build` exited 0. Production docs, search, registry JSON and sitemap returned HTTP 200. The actual shadcn-vue CLI installed the new items into a disposable consumer, and its exported components/composables bundled successfully with Vite. Safari verified Data Table filtering from six rows to one.

Earlier browser checks verified docs/search navigation, responsive overflow, category/grid controls and isolated previews. Full pixel comparison, every shared component API, flow parity and arbitrary consumer alias layouts remain outside the verified coverage. Consumer smoke tests use root `@/*` aliases and the documented Styles prerequisite.

## Evidence and boundaries

- React source: `/Users/canceydejean/Documents/Code/UI Libraries/React/Projects/design-system-registry-react-starter`.
- Vue source: current repository. Source comparisons below are observed implementations; unexercised interactions are not claimed as runtime tests.
- Safari opened the deployed React `/docs` and local Vue `http://localhost:3100/docs`; Vue redirected to `/docs/installation`. Captured text and screenshots. Screenshots were taken at different initial viewport sizes and are not a pixel-difference comparison.
- REA skill was consulted. It explicitly recommends ordinary repository tools for complete source repositories. No REA analysis tools were available in this session. `rea-agents@6.5.0 doctor --client codex --json` reported aligned Codex registration, unknown live-server state, and an unsupported Node 24.10.0 runtime in that invocation. Vite+ separately reports managed Node 24.22.0. No REA configuration was changed. These findings are source/Safari evidence, not REA Evidence records.
- Complete component API equivalence, all flow interactions, all install dependency closures, production build/deployment, dark-mode interaction, keyboard accessibility and all mobile interactions remain unverified.

## Priority findings

| Priority | Finding                                                               | Evidence / consequence                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1       | Installation instructions disagree with actual registry configuration | `content/docs/installation.md:13-23` uses `@design-system-ui-vue` and `design-system-registry-vue.vercel.app`, while `app/lib/registry/config.ts` declares `@design-system-ui` and `vuedocs.canceydejean.dev`. Also points readers to `registry/config.ts`, which is not the Vue configuration location. `server/utils/registry-json.ts` emits dependency names using the configured namespace. Align setup examples and published dependencies. |
| P1       | Missing Introduction landing page                                     | React has `registry/docs/index.mdx`; Vue `app/pages/docs/index.vue` redirects to first sorted page. Observed in Safari: React `/docs` displays Introduction; Vue redirects to Installation.                                                                                                                                                                                                                                                      |
| P1       | Preview galleries and category browsing absent                        | React `src/components/docs/block-gallery.tsx` supports previews, search, grid/list views and block categories. Vue `app/pages/[section]/index.vue` renders `RegistryItemList.vue`, which has title/description cards.                                                                                                                                                                                                                            |
| P1       | Sidebar category navigation and heading destinations differ           | React `src/components/docs/docs-sidebar.tsx` groups blocks with counts/category destinations. Vue `app/components/docs/DocsSidebarNav.vue` lists items directly and section headings lead to the first item rather than landing pages.                                                                                                                                                                                                           |
| P1       | Search has substantially less capability                              | React `src/lib/search/registry-search.ts` indexes category, dependency, filename, keywords and type with weighted relevance and typo tolerance. Vue `app/components/docs/SearchDialog.vue` filters title/name/slug/description; lacks React panel loading/error and keyboard-footer presentation. Source finding.                                                                                                                                |
| P1       | Mobile sidebar does not explicitly close after navigation             | React `docs-sidebar.tsx` closes mobile state on navigation; Vue `DocsSidebarNav.vue` lacks corresponding handlers, `DocsLayout.vue` has no route-close watcher, and search closes only its dialog. Source finding requiring an interaction regression test.                                                                                                                                                                                      |
| P1       | Intermediate-width layout overflow                                    | At actual Safari `innerWidth=1024`, Vue Installation article extended to x=1105 and document overflowed horizontally. `DocsLayout.vue` main flex child lacks React's `min-w-0`. This is a candidate cause, not a proven fix. At actual mobile innerWidth=390, document scrollWidth=373 and no horizontal overflow was observed.                                                                                                                  |
| P2       | Page navigation semantics/style differ                                | React `src/lib/navigation.ts` stays within a section and disables missing neighbors. Vue `app/lib/navigation.ts` includes landing pages, traverses sections and wraps end-to-start; `DocsPageNav.vue` uses primary rounded controls instead of outlined controls. Safari Installation showed previous Styles in Utilities and next Styles in Docs.                                                                                               |
| P2       | Audience labels/order differ                                          | React sidebar shows Dev/Maintainers badges and its docs order differs. Vue `app/lib/navigation.ts` lacks audience metadata; sidebar titles omit badges. Vue also includes a Variant files page.                                                                                                                                                                                                                                                  |
| P2       | SEO and delivery setup differ                                         | React `vite.config.ts` configures prerendering and sitemap generation; `src/lib/seo.ts` and related tests handle SEO. Vue has no corresponding sitemap/prerender configuration in `nuxt.config.ts`, and inspected page routes primarily set titles. Framework APIs can differ, but desired public metadata and discoverability should be equivalent.                                                                                             |
| P2       | Storybook setup differs                                               | React `.storybook/main.ts` registers addon-vitest and addon-mcp; Vue registers neither, although Vue already has Storybook Vitest execution configured separately. Vue test output warns about deprecated default vue-docgen-api and redundant setProjectAnnotations. This does not mean browser story testing is absent.                                                                                                                        |
| P2       | Registry diagnostics expose publication gaps                          | `vp run registry:doctor` exits successfully with warnings: Sidebar03/Sidebar07 lack `_registry.md`; Spinner/index.ts not published; utility directory unrecognized. Many other warnings concern intentionally unpublished stories/tests and should not all be treated as missing consumer files.                                                                                                                                                 |

## Catalog inventory

Counted `_registry.mdx` React and `_registry.md` Vue frontmatter names: **87 React, 76 Vue**, with **68 exact names shared**. Counts are descriptors, not proof of functional equivalence.

React-only exact names: announcement-bar, code-block, data-table, datepicker, direction, dot-canvas, hero-01, hero-02, mode-toggle, questionnaire, section, theme-toggle, toast, trace, use-body-overflow, use-close-mobile-menu-on-resize, use-copy-to-clipboard, use-highlighted-code, use-mobile.

Vue-only exact names: date-picker, form, hero, number-field, range-calendar, sonner, stepper, tags-input.

Do not translate this directly into a missing-component count: datepicker/date-picker and toast/sonner are potential counterparts; hero needs variant-level comparison. React hooks need Vue composable equivalents, not React source copied literally. Theme controls exist in the Vue docs shell even though installable theme-toggle/mode-toggle registry descriptors are absent. Shared scroll-fade and shimmer have different registry folder classifications.

## Already broadly aligned in source

- Sticky docs shell, sidebar, breadcrumbs, footer, light/dark controls and three accent choices.
- Page actions for Markdown/copy and AI tools.
- Preview/code tabs, CLI/manual installation tabs, and active-heading table of contents.
- Registry JSON endpoints, Markdown and llms endpoints, content negotiation, registry scaffolding/doctor tasks, Storybook and browser story tests.
- Flow pages exist in both; detailed graph/UI parity remains an independent follow-up.

## Validation baseline

- `vp install`: successful with execution permission; 1606 installs checked across 1790 packages, no dependency changes.
- `vp env doctor`: checks passed, with an nvm conflict warning.
- `vp check`: failed on existing formatting issues in 44 files; later lint/type stages were not established by this command. No mass formatting applied.
- `vp test`: successful with local browser permission: 78 files and 248 tests passed. Warnings include Storybook docgen setup and undefined ChartTooltipContent accesses; passing stories do not establish warning-free UI behavior.
- `vp run registry:doctor`: exit 0 with warnings described above.
- Initial sandbox attempts blocked temporary writes/listen/task communication; reruns with permission succeeded. These are environment restrictions, not application bugs.
- Application code unchanged by this audit.

## Suggested implementation sequence

1. Fix install identity examples and establish Introduction and docs ordering.
2. Match shell sizing, pager behavior, sidebar destinations/audience labels and mobile navigation.
3. Implement galleries, category browsing and richer search.
4. Map catalog items by capability and API, then fill true gaps with Vue implementations.
5. Align SEO, Storybook/quality configuration and registry publication diagnostics.
6. Validate representative docs, component, block, utility and flow routes at desktop/mobile sizes, both themes, keyboard navigation, install into a clean consumer and production deployment.

For Svelte and future frameworks, use this as a capability contract: same destinations, user-visible behavior, design tokens, content model and install outcomes; framework-specific primitives, composables/hooks and build configuration remain idiomatic.
