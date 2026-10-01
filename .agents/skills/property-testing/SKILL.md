---
name: property-testing
description: >-
  Use when adding or changing Vitest property tests with fast-check, testing
  registry component variants or cn, or running Storybook stories as Vitest
  browser tests in this repo.
---

# Property testing

fast-check belongs in the node unit project, where a failure shrinks and replays from a seed. Storybook is the render harness: `@storybook/addon-vitest` turns every `*.stories.ts` into a headless Chromium test (render, `play`, a11y annotations). Do not call `fc.assert` or `test.prop` from a Storybook `play` function — that run is once, non-deterministic, and does not shrink.

| Invariant                                                      | Where                         |
| -------------------------------------------------------------- | ----------------------------- |
| Pure output (`buttonVariants`, `cn`, a composable with no DOM) | `vp test --project unit`      |
| Render, role, focus, `play`, a11y                              | `vp test --project storybook` |

## Commands

```sh
vp test
vp test --project unit
vp test --project storybook
```

There is no root `vitest.config.ts`. Vite+ loads projects from `vite.config.ts` `test.projects`:

- `vitest.unit.config.ts` — node, `**/*.test.ts`. No Vue plugin and no `@registry` aliases.
- `vitest.storybook.config.ts` — Chromium via `playwright()` from `vite-plus/test/browser-playwright`. That re-export imports `@vitest/browser-playwright`, which must be a direct devDependency on the same Vitest version Vite+ bundles. `@storybook/addon-vitest` stays on the repo's Storybook version. Type the `defineProject` callback as `Promise<UserWorkspaceConfig>` so `storybookTest()` typechecks.

Do not import `storybookTest` from `vite.config.ts`. Storybook loads that file during `storybook dev`.

## What stays in sync

The two projects do not generate each other. A new story does not add a property, and a property does not add a story.

They stay aligned on the component's exported variant lists:

- Story `argTypes` and fast-check both import `BUTTON_VARIANTS`, `BUTTON_SIZES`, and the same kind of array on other components. A new key in `*.variants.ts` shows up in Storybook controls and in `oneOf(...)`.
- The property test's class-token map is `satisfies Record<(typeof BUTTON_VARIANTS)[number], string>`, so a new variant fails typecheck until the test names its token.
- The Storybook project runs every `stories/*.stories.ts` that exists. Adding or removing a story changes that suite with no extra registration.

Hand-written story examples and the fast-check cartesian product are different coverage. Stories show chosen states in Chromium. Properties check every combination of the exported enums against a class-string invariant.

## Unit tests

Put each test in a `tests/` directory on the item, parallel to `stories/`:

- `registry/items/components/<Name>/tests/<kebab-name>.test.ts`
- `registry/items/lib/tests/utils.test.ts`

Import `../<Name>.variants.ts`, not the `.vue` file. Do not list `tests/**` in `_registry.md` — same rule as `stories/**`.

```ts
import { fc, test } from "@fast-check/vitest";
import { expect } from "vite-plus/test";

import { BUTTON_SIZES, BUTTON_VARIANTS, buttonVariants } from "../Button.variants";

function oneOf<T extends string>(values: readonly T[]) {
  const [first, ...rest] = values;
  if (first === undefined) throw new Error("constantFrom needs at least one value");
  return fc.constantFrom(first, ...rest);
}

const variantClass = {
  primary: "bg-primary",
  outline: "border-border",
  secondary: "bg-secondary",
  ghost: "hover:bg-muted",
  destructive: "bg-destructive/10",
} as const satisfies Record<(typeof BUTTON_VARIANTS)[number], string>;

test.prop({
  variant: oneOf(BUTTON_VARIANTS),
  size: oneOf(BUTTON_SIZES),
})("buttonVariants returns a stable class string for the variant", ({ variant, size }) => {
  const classes = buttonVariants({ variant, size });
  expect(classes.split(" ")).toContain(variantClass[variant]);
  expect(buttonVariants({ variant, size })).toBe(classes);
});
```

- Build arbitraries from the component's exported variant arrays (`BUTTON_VARIANTS`, `TEXT_SIZES`, …). `fc.constantFrom` wants a non-empty tuple; `oneOf` adapts the exported array. A `as const` tuple such as `themeTextSizes` can spread directly.
- Assert an invariant: returns a string, same inputs return the same string, a class token for that variant is present. Do not snapshot a random class string.
- `expect` comes from `vite-plus/test`. `test` and `fc` come from `@fast-check/vitest` so `test.prop` exists. Existing `describe` / `expect` imports stay on `vite-plus/test`.
- Leave `numRuns` at the fast-check default. On failure, rerun with the printed seed: `test.prop([arb], { seed })`.

## Storybook project

New visual states still go through `writing-story-files`. The browser project picks them up from `.storybook/main.ts` stories globs. You do not add a Vitest file per story.

`.storybook/vitest.setup.ts` calls `setProjectAnnotations` with `@storybook/addon-a11y/preview` and `.storybook/preview.ts`. Keep that call. Addon-vitest skips its automatic preview annotations when it sees `setProjectAnnotations`, and this file is what registers a11y. Leave `a11y.test: "todo"` in `preview.ts` unless the task is to fail CI on violations.

A DOM property test (role, focus, slot text) is rare. Put it in a browser test only when the class string cannot express the invariant, and lower `numRuns` (10–20). Prefer a story plus the browser project for everything else.

## Checklist

```
- [ ] File is <Name>/tests/<kebab-name>.test.ts, importing ../<Name>.variants.ts
- [ ] Options come from the exported variant array, not a hardcoded copy
- [ ] Assertion is an invariant, not a snapshot of generated classes
- [ ] Test file is not listed in _registry.md
- [ ] fast-check is not called from a play function
- [ ] Render / play / a11y coverage is a story, already run by --project storybook
```
