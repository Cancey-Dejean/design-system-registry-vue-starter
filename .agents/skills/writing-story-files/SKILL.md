---
name: writing-story-files
description: >-
  Use when creating a new Storybook story file for a registry component,
  adding a story to an existing component, or when asked about Storybook
  stories, argTypes, decorators, or *.stories.ts conventions in this registry.
---

# Writing Story Files

Story files are optional, authoring-only docs for registry components — they preview a
component in Storybook and are never installed by consumers. See `shadcn-registry` for the
rest of the registry-item workflow (`_registry.md`, install targets, variant files); this skill
only covers `*.stories.ts` itself.

## Where they live

`registry/items/components/<Name>/stories/<name>.stories.ts`, next to the component's own
`.vue`/`index.ts` files. Use **kebab-case** for the filename (`badge.stories.ts`,
`button-group.stories.ts`) — the majority of existing stories follow this even when the
component folder itself is PascalCase (`Badge/stories/badge.stories.ts`). A few older files
(`Button.stories.ts`, `Container.stories.ts`, `Spinner.stories.ts`) are PascalCase; match
kebab-case for anything new so the convention converges.

Never list a `stories/**` path in `_registry.md`'s `files` — stories don't publish, so
`scripts/doctor.ts` doesn't expect them there.

## Imports

```ts
import type { Meta, StoryObj } from "@storybook/vue3";
```

Use `@storybook/vue3`, not `@storybook/vue3-vite`. `.storybook/main.ts` configures the
`@storybook/vue3-vite` framework, but the established convention across the codebase (16 of 18
existing story files) imports the plain `@storybook/vue3` types — both work, so follow the
majority for consistency rather than the framework package name.

## The `meta` object

```ts
import { Badge } from "..";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
  },
  args: { variant: "default" },
};

export default meta;
type Story = StoryObj<typeof Badge>;
```

- `title`: always `"Components/<Name>"`.
- `argTypes`: one entry per prop worth controlling in the Storybook UI. For a variant/size
  axis, **import the component's own exported const array instead of retyping the options**
  (e.g. `BUTTON_VARIANTS`, `BUTTON_SIZES`, `CONTAINER_SIZES` from the component's
  `*.variants.ts` — see `writing-story-files`'s sibling skill `shadcn-registry` for how those
  are produced). A hardcoded list drifts the moment a variant is added or renamed; an imported
  one can't. Badge's own `variant` list above predates this and should be replaced with an
  import if that file is touched again.
- `args`: the default prop values every story starts from.
- Add `tags: ["autodocs"]` when you want Storybook to generate a docs page from the props table.
- `type Story = StoryObj<typeof Badge>` (or `typeof meta` — both appear; either is fine) goes
  right after `export default meta`, and every named story below is typed `Story`.

## Story exports

Two patterns cover almost everything:

**1. Args-only** — let Storybook auto-render `meta.component` with different props:

```ts
export const Secondary: Story = {
  args: { variant: "secondary" },
};
```

**2. Explicit `render`** — needed when a story composes markup around the component (wrapping
elements, iterating a list of variants, combining multiple components):

```ts
export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: /* html */ `
      <div class="flex flex-wrap items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
      </div>
    `,
  }),
};
```

When `render` takes `args` (so the story still responds to Storybook's controls), pass them
through via `setup`:

```ts
export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: /* html */ `<Badge v-bind="args">Badge</Badge>`,
  }),
};
```

Always put the `/* html */` comment immediately before the template literal's opening
backtick — it's what gives editors HTML syntax highlighting inside the string.

## Story-only props

A story sometimes needs to demonstrate a prop the component doesn't actually have — e.g.
Button's `Loading` story adds a `loading` boolean to show composing a `Spinner` inside the
button, without `loading` being a real `Button` prop. Type that story against an extended args
type instead of the shared `Story` alias, and call out the prop's story-only nature in its
`argTypes` description so nobody goes looking for it on the component:

```ts
type LoadingStoryArgs = ButtonProps & { default?: string; loading?: boolean };

export const Loading: StoryObj<LoadingStoryArgs> = {
  args: { default: "Button", loading: true },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Story-only control — compose Spinner inside Button (not a Button prop)",
    },
  },
  render: (args) => ({/* ... */}),
};
```

## Decorators, for layout-sensitive components

Most components need nothing extra. A component whose whole point is filling its container
(like `Container`) needs a wrapper so Storybook's canvas doesn't render it at native page
width with nothing to constrain it against:

```ts
import StorybookWrapper from "@registry/components/utility/StorybookWrapper.vue";

const meta = {
  title: "Components/Container",
  component: Container,
  parameters: { layout: "fullscreen" },
  decorators: [
    () => ({
      components: { StorybookWrapper },
      template: "<StorybookWrapper><story /></StorybookWrapper>",
    }),
  ],
} satisfies Meta<typeof Container>;
```

Reach for this only when the component's rendering genuinely depends on its surrounding
layout — don't add a decorator by default.

## Compound components without variants

A component like `Field` (built from `Field` + `FieldLabel` + `FieldDescription` +
`FieldGroup`) usually has no meaningful variant/size props to control, so skip `argTypes`/`args`
entirely and just render one realistic composed example:

```ts
import { Input } from "../../Input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "..";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => ({
    components: { Field, FieldDescription, FieldGroup, FieldLabel, Input },
    template: /* html */ `
      <FieldGroup class="max-w-sm">
        <Field>
          <FieldLabel for="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
          <FieldDescription>We will never share your email.</FieldDescription>
        </Field>
      </FieldGroup>
    `,
  }),
};
```

## Checklist

```
- [ ] File at registry/items/components/<Name>/stories/<kebab-name>.stories.ts
- [ ] `import type { Meta, StoryObj } from "@storybook/vue3"`
- [ ] title: "Components/<Name>"
- [ ] argTypes.options sourced from the component's own exported variant/size array, not hardcoded
- [ ] Default story covers the common case; add more only for meaningfully different states
- [ ] /* html */ before every template literal
- [ ] Decorator only if the component depends on its layout context
- [ ] Not listed anywhere in _registry.md
```
