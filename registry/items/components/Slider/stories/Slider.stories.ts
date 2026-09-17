import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Slider } from "@registry/components/Slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='w-full max-w-sm px-4'><story /></StorybookWrapperSimple>`,
    }),
  ],
  args: {
    max: 100,
    step: 1,
    defaultValue: [50],
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single thumb at mid range. */
export const Default: Story = {
  render: (args) => ({
    components: { Slider },
    setup: () => ({ args }),
    template: /* html */ `<Slider v-bind="args" class="w-full" />`,
  }),
};

/** Two thumbs for a value range. */
export const Range: Story = {
  args: {
    defaultValue: [25, 75],
  },
  render: (args) => ({
    components: { Slider },
    setup: () => ({ args }),
    template: /* html */ `<Slider v-bind="args" class="w-full" />`,
  }),
};

/** Controlled value with v-model. */
export const Controlled: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([40]);
      return { value };
    },
    template: /* html */ `
      <div class="grid w-full gap-3">
        <Slider v-model="value" :max="100" :step="1" class="w-full" />
        <p class="text-muted-foreground text-sm">
          Value: <span class="text-foreground font-medium">{{ value[0] }}</span>
        </p>
      </div>
    `,
  }),
};

/** Vertical slider for tall layouts. */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    defaultValue: [50],
  },
  render: (args) => ({
    components: { Slider },
    setup: () => ({ args }),
    template: /* html */ `
      <div class="flex h-48 justify-center">
        <Slider v-bind="args" />
      </div>
    `,
  }),
};

/** Disabled slider that cannot be moved. */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: [50],
  },
  render: (args) => ({
    components: { Slider },
    setup: () => ({ args }),
    template: /* html */ `<Slider v-bind="args" class="w-full" />`,
  }),
};
