import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";
import { LinkSpread } from "..";

const meta = {
  title: "Components/Link Spread",
  tags: ["autodocs"],
  component: LinkSpread,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapper },
      template: /* html */ `<StorybookWrapper><story /></StorybookWrapper>`,
    }),
  ],
  argTypes: {
    href: {
      description: "The destination URL",
      control: "text",
    },
  },
  args: {
    href: "#",
  },
} satisfies Meta<typeof LinkSpread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { LinkSpread },
    setup: () => ({ args }),
    template: /* html */ `
      <article class="relative w-72 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 class="font-medium">Fully clickable card</h3>
        <p class="mt-1 text-sm text-muted-foreground">
          The whole surface links to the details page.
        </p>
        <LinkSpread v-bind="args" aria-label="Open details" />
      </article>
    `,
  }),
};

export const NewTab: Story = {
  args: {
    href: "https://example.com",
    external: true,
  },
  render: (args) => ({
    components: { LinkSpread },
    setup: () => ({ args }),
    template: /* html */ `
      <article class="relative w-72 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 class="font-medium">Opens in a new tab</h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Uses newTab to open the destination in a new browser tab.
        </p>
        <LinkSpread v-bind="args" aria-label="Open example.com in a new tab" />
      </article>
    `,
  }),
};

export const WithoutHref: Story = {
  args: {
    href: undefined,
  },
  render: (args) => ({
    components: { LinkSpread },
    setup: () => ({ args }),
    template: /* html */ `
      <article class="relative w-72 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 class="font-medium">Inactive overlay</h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Without an href, pointer events are disabled.
        </p>
        <LinkSpread v-bind="args" aria-label="Inactive link" />
      </article>
    `,
  }),
};
