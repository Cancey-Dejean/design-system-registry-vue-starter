import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Bold, Italic, Underline } from "@lucide/vue";
import { ref } from "vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Toggle, TOGGLE_SIZES, TOGGLE_VARIANTS } from "..";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `
        <StorybookWrapperSimple><story /></StorybookWrapperSimple>
      `,
    }),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: TOGGLE_VARIANTS,
    },
    size: {
      control: "select",
      options: TOGGLE_SIZES,
    },
    disabled: { control: "boolean" },
    defaultValue: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    defaultValue: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Icon-only bold toggle. */
export const Default: Story = {
  render: (args) => ({
    components: { Toggle, Bold },
    setup: () => ({ args }),
    template: /* html */ `
      <Toggle v-bind="args" aria-label="Toggle bold">
        <Bold class="h-4 w-4" />
      </Toggle>
    `,
  }),
};

/** Outline style toggle. */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => ({
    components: { Toggle, Bold },
    setup: () => ({ args }),
    template: /* html */ `
      <Toggle v-bind="args" aria-label="Toggle bold">
        <Bold />
      </Toggle>
    `,
  }),
};

/** Icon with adjacent text. */
export const WithText: Story = {
  render: (args) => ({
    components: { Toggle, Italic },
    setup: () => ({ args }),
    template: /* html */ `
      <Toggle v-bind="args" aria-label="Toggle italic">
        <Italic />
        Italic
      </Toggle>
    `,
  }),
};

/** Small and large size comparison. */
export const Sizes: Story = {
  render: () => ({
    components: { Toggle, Italic },
    template: /* html */ `
      <div class="flex items-center gap-2">
        <Toggle size="sm" aria-label="Toggle italic small">
          <Italic />
        </Toggle>
        <Toggle aria-label="Toggle italic default">
          <Italic />
        </Toggle>
        <Toggle size="lg" aria-label="Toggle italic large">
          <Italic />
        </Toggle>
      </div>
    `,
  }),
};

/** Disabled pressed toggle. */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: true,
  },
  render: (args) => ({
    components: { Toggle, Underline },
    setup: () => ({ args }),
    template: /* html */ `
      <Toggle v-bind="args" aria-label="Toggle underline">
        <Underline class="h-4 w-4" />
      </Toggle>
    `,
  }),
};

/** Controlled pressed state with v-model. */
export const Controlled: Story = {
  render: () => ({
    components: { Toggle, Bold },
    setup() {
      const pressed = ref(false);
      return { pressed };
    },
    template: /* html */ `
      <div class="flex flex-col items-center gap-3">
        <Toggle v-model="pressed" aria-label="Toggle bold">
          <Bold class="h-4 w-4" />
        </Toggle>
        <p class="text-muted-foreground text-sm">
          Pressed:
          <span class="text-foreground font-medium">{{ pressed }}</span>
        </p>
      </div>
    `,
  }),
};
