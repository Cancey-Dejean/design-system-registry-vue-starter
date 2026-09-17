import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";
import {
  Heading,
  HEADING_LEVELS,
  HEADING_SIZES,
  HEADING_WEIGHTS,
  HEADING_TONES,
} from "@registry/components/Heading";

const meta = {
  title: "Components/Heading",
  tags: ["autodocs"],
  component: Heading,
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
    level: {
      description: "The semantic heading level (h1–h6)",
      control: "select",
      options: HEADING_LEVELS,
    },
    size: {
      description: "Override the visual size independently from level",
      control: "select",
      options: HEADING_SIZES,
    },
    weight: {
      description: "The font weight of the heading",
      control: "select",
      options: HEADING_WEIGHTS,
    },
    tone: {
      description: "The color tone of the heading",
      control: "select",
      options: HEADING_TONES,
    },
    class: { control: false },
  },
  args: {
    default: "Heading",
    level: 2,
    weight: "semibold",
    tone: "default",
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  argTypes: {
    level: { table: { disable: true } },
    size: { table: { disable: true } },
  },
  render: (args) => ({
    components: { Heading },
    setup() {
      return { args, HEADING_SIZES };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <Heading v-for="size in HEADING_SIZES" :key="size" v-bind="args" :level="2" :size="size">
          Size: {{ size }}
        </Heading>
      </div>
    `,
  }),
};

export const Weights: Story = {
  argTypes: {
    weight: { table: { disable: true } },
  },
  render: (args) => ({
    components: { Heading },
    setup() {
      return { args, HEADING_WEIGHTS };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <Heading v-for="weight in HEADING_WEIGHTS" :key="weight" v-bind="args" :weight="weight">
          Weight: {{ weight }}
        </Heading>
      </div>
    `,
  }),
};

export const Tones: Story = {
  argTypes: {
    tone: { table: { disable: true } },
  },
  render: (args) => ({
    components: { Heading },
    setup() {
      return { args, HEADING_TONES };
    },
    template: /* html */ `
      <div class="flex flex-col gap-4">
        <Heading v-for="tone in HEADING_TONES" :key="tone" v-bind="args" :tone="tone">
          Tone: {{ tone }}
        </Heading>
      </div>
    `,
  }),
};
