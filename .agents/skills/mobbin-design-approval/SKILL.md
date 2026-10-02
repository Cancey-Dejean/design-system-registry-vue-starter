---
name: mobbin-design-approval
description: >-
  Researches real product UI with the Mobbin MCP, then creates exactly three
  design examples and waits for approval before any project implementation.
  Use whenever a design needs to be made or changed — new or updated screens,
  pages, components, blocks, layouts, empty states, visual restyles, or
  interaction patterns — even if the user only says to build, add, or restyle
  UI and never mentions Mobbin, research, examples, or approval.
---

# Mobbin design approval

A design that ships without looking at real products tends to invent a generic layout. Mobbin is the research step. Three distinct examples give a real choice. Approval is the gate: project files stay untouched until the user picks a direction.

## When this applies

Use this skill before implementing any visual design decision: a new screen, page, component, block, layout, empty state, or a change to how an existing surface looks or behaves.

Skip it when the work has no design decision (bugfix that preserves the current UI, refactor, types, tests, copy, config) or when the user explicitly waives the gate ("skip Mobbin", "don't show options", "implement this exactly"). Once they have approved an example for a surface, implement that direction. A new surface, or a rejected direction, starts the gate again.

## Workflow

Copy this checklist and finish it in order:

```
Design gate:
- [ ] Research the pattern with Mobbin
- [ ] Create 3 distinct design examples
- [ ] Present them and stop for approval
- [ ] Implement only the approved example
```

### 1. Research with Mobbin

Discover the Mobbin tools at runtime, then call them. Do not invent parameters.

- Cursor: `GetDynamicTools` for namespace `plugin-mobbin-mobbin` before the first call. If it needs auth, call `mcp_auth`, then retry.
- Claude Code / Codex: use the Mobbin MCP server's live schema for `search_screens`, `search_flows`, and `search_sections`.

Pick the tool from the job:

- `search_screens` — one screen (a settings page, a dialog, an empty state)
- `search_flows` — a multi-step journey (onboarding, checkout)
- `search_sections` — one website section (hero, pricing, footer)

Search the platform the product actually is. Web UI, including this design system, uses `web`. Native mobile uses `ios`. Search both only when the design must work as both.

Write queries as one specific screen, flow, or section: the elements and how they relate. Good: "settings screen with grouped rows and a destructive action at the bottom". Avoid style words ("modern", "clean"), negations, keyword lists, and putting the platform in the query. Run separate searches for separate intents.

On every call in the same task, reuse the same `task_intent` (one English sentence, no user text or file contents) and set `output_destination` to `code` when the work will land in a repository. Keep `limit` small (about 8 screens, 5 flows) so context stays readable. Use `mode: "deep"` for nuanced screen searches.

Look at the returned images before describing anything. Metadata alone is not enough. When you cite a screen, link its `mobbin_url`. `image_url` values expire; do not treat them as permanent links. If a result includes `ai_usage_notice`, show that markdown to the user unchanged, as its own block.

If Mobbin returns nothing useful, say so. Still create three examples, and mark them as not grounded in a specific screen.

### 2. Create three design examples

Research is the input. The examples are original directions for this project, each adapted from screens you actually examined.

The three must differ in structure — information architecture, density, or interaction — not only color or type. Three recolors of one layout are one example.

Use this template for each:

```markdown
### Example N — [short name]

**Intent:** One sentence on what this direction optimizes for.
**Grounded in:** [App — screen or flow](mobbin_url). What you took from it.
**Structure:** Layout, hierarchy, primary action, and the important states (empty, error, loading) when they matter.
**Tradeoff:** What this direction gives up.
```

### 3. Stop for approval

Present all three in one message, name a recommendation and why, and ask which to implement (or what to combine). Then stop. Do not write or edit project files, components, styles, stories, or previews in the same turn.

These count as approval: choosing a number or name, "build the second one", or an explicit mix ("example 1 with the header from 3"). "Looks good" with no choice does not. Ask which one.

### 4. Implement the approved example

Implement that example only. Do not fold in the other two unless the user asked for the mix. Follow the project's existing components, tokens, and skills for the actual code.
