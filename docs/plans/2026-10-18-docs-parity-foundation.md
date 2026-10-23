# Vue docs parity foundation implementation plan

Goal: match the React reference's entry page and section navigation while preserving Vue-native setup.

Architecture: retain Nuxt Content and the existing docs shell. Author Introduction as content and map its catalog route to /docs consistently across HTML, navigation, Markdown and llms output. Derive pager neighbors within the active section. Close the mobile sidebar from its descendant navigation component on route changes, and constrain the docs flex children rather than clipping the viewport.

Tech stack: Nuxt 4, Vue 3, Nuxt Content, existing registry components, Vite+/Vitest, Safari MCP.

1. Add navigation regression tests for no wraparound, no cross-section paging and no artificial section landing entries. Run unit tests to observe failures before implementation.
2. Update navigation helpers and the pager composable; show disabled boundary arrows with outline buttons. Keep all source edits in the existing checkout, preserving user work.
3. Add content/docs/index.md and render it through AuthoredDocsPage at /docs. Expose the same canonical route in the catalog and machine-readable outputs. Preserve /docs/index as a redirect for compatibility.
4. Correct namespace, deployment origin and config path in installation docs. Match reference docs ordering and audience labels while retaining Vue's useful Variant files guide.
5. Link sidebar headings to section landing pages; close mobile navigation on route changes and direct link clicks. Add min-w-0 to the docs inset and content wrapper.
6. Update changelog. Format changed files only; run vp check, vp test and registry diagnostics. Validate Introduction, installation, Markdown output, section boundaries and mobile/sidebar behavior in Safari. Record existing baseline failures separately.

Follow-up scope from the broader audit: richer search, preview galleries/category navigation, capability-level catalog mapping, SEO and delivery setup. Do not claim full framework parity from this foundation change.

## Validation results

Implemented the foundation steps above. `vp test` passes: 79 files, 254 tests. The six navigation regression tests were observed failing before the fix. Safari confirmed Introduction at /docs, disabled previous-page control, Installation next-page navigation, mobile sidebar closing after selecting Introduction, light/dark switching, and no horizontal overflow on Installation at 1024px or Introduction at 1440px. Mobile was checked at a 390px window width. No browser console errors or HTTP 4xx/5xx requests were recorded in that session. Reduced-motion preference was read as false; an emulated reduced-motion test was not performed.

Local endpoint checks passed for /docs.md, negotiated Markdown at /docs, /llms.txt, navigation route metadata, and /docs/index redirecting to /docs. Server left running at http://localhost:3100/docs.

Validation limits: vp check still stops on formatting issues in 44 files outside the changed implementation (including the earlier audit report). vp lint reports registry Storybook TS prop errors; no app/server/content-config diagnostics appeared in that output. Nuxt typecheck requires a checker that this project has not installed; no successful full Vue template type check is claimed. No production build or clean-consumer install was performed in this foundation pass. Gallery/search/catalog work remains listed in the audit.

## Continuation: discovery, installation and delivery

Implementation extends the approved reference parity direction: component/block preview galleries with search, category query filters and grid/list modes; server-side Orama search using the same weighted fields/tolerance as React; manifest-aware import rewriting and complete direct install dependencies; canonical metadata/sitemap; Storybook test/MCP integration and Vue template checking. Preview content must run in a separate iframe document to isolate shortcuts, portals and responsive breakpoints from the docs shell. Registry component ports remain an explicit capability map rather than assuming equal names imply equal functionality.
