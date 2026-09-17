import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";
import { LinkText, LINK_TONES, LINK_UNDERLINES, LINK_SIZES } from "../";

const meta = {
  title: "Components/Link Text",
  tags: ["autodocs"],
  component: LinkText,
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
    tone: {
      description: "The color tone of the link",
      control: "select",
      options: LINK_TONES,
    },
    underline: {
      description: "The underline behavior",
      control: "select",
      options: LINK_UNDERLINES,
    },
    size: {
      description: "The font size of the link",
      control: "select",
      options: LINK_SIZES,
    },
    external: {
      description: "Opens in a new tab with rel noopener noreferrer",
      control: "boolean",
    },
    class: { control: false },
    as: { table: { disable: true } },
  },
  args: {
    default: "Click here",
    href: "#",
    tone: "default",
    underline: "hover",
    size: "md",
  },
} satisfies Meta<typeof LinkText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Tones: Story = {
  argTypes: {
    tone: { table: { disable: true } },
  },
  render: (args) => ({
    components: { LinkText },
    setup() {
      return { args, LINK_TONES };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <LinkText v-for="tone in LINK_TONES" :key="tone" v-bind="args" :tone="tone">
          Tone: {{ tone }}
        </LinkText>
      </div>
    `,
  }),
};

export const Underlines: Story = {
  argTypes: {
    underline: { table: { disable: true } },
  },
  render: (args) => ({
    components: { LinkText },
    setup() {
      return { args, LINK_UNDERLINES };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <LinkText v-for="underline in LINK_UNDERLINES" :key="underline" v-bind="args" :underline="underline">
          Underline: {{ underline }}
        </LinkText>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  render: (args) => ({
    components: { LinkText },
    setup() {
      return { args, LINK_SIZES };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <LinkText v-for="size in LINK_SIZES" :key="size" v-bind="args" :size="size">
          Size: {{ size }}
        </LinkText>
      </div>
    `,
  }),
};

export const External: Story = {
  args: {
    external: true,
    href: "https://example.com",
    default: "External link",
  },
};
