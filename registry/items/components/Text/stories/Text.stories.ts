import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Text, TEXT_SIZES, TEXT_ALIGNMENTS, TEXT_WEIGHTS, TEXT_TONES } from "../";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";

const meta = {
  title: "Components/Text",
  tags: ["autodocs"],
  component: Text,
  decorators: [
    () => ({
      components: { StorybookWrapper },
      template: /* html */ `<StorybookWrapper><story /></StorybookWrapper>`,
    }),
  ],
  argTypes: {
    size: {
      description: "The font size of the text",
      control: "select",
      options: TEXT_SIZES,
    },
    weight: {
      description: "The font weight of the text",
      control: "select",
      options: TEXT_WEIGHTS,
    },
    tone: {
      description: "The color tone of the text",
      control: "select",
      options: TEXT_TONES,
    },
    align: {
      description: "The text alignment",
      control: "select",
      options: TEXT_ALIGNMENTS,
    },
    class: { control: false },
    as: { table: { disable: true } },
  },
  args: {
    default:
      "The quick brown fox jumps over the lazy dog. This is a sample paragraph to demonstrate the text component.",
    size: "md",
    weight: "regular",
    tone: "default",
    align: "left",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args, TEXT_SIZES };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <Text v-for="size in TEXT_SIZES" :key="size" v-bind="args" :size="size">
          Size: {{ size }} — The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    `,
  }),
};

export const Weights: Story = {
  argTypes: {
    weight: { table: { disable: true } },
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args, TEXT_WEIGHTS };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <Text v-for="weight in TEXT_WEIGHTS" :key="weight" v-bind="args" :weight="weight">
          Weight: {{ weight }} — The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    `,
  }),
};

export const Tones: Story = {
  argTypes: {
    tone: { table: { disable: true } },
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args, TEXT_TONES };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <Text v-for="tone in TEXT_TONES" :key="tone" v-bind="args" :tone="tone">
          Tone: {{ tone }} — The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    `,
  }),
};

export const Alignments: Story = {
  argTypes: {
    align: { table: { disable: true } },
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args, TEXT_ALIGNMENTS };
    },
    template: /* html */ `
      <div class="flex w-full flex-col gap-4">
        <Text v-for="align in TEXT_ALIGNMENTS" :key="align" v-bind="args" :align="align">
          Align: <strong>{{ align }}</strong> — The quick brown fox jumps over the lazy dog.
        </Text>
      </div>
    `,
  }),
};

export const AsSpan: Story = {
  args: {
    as: "span",
    default: "This renders as a span element.",
  },
};
