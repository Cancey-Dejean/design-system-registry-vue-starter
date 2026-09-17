import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { onMounted, onUnmounted, ref } from "vue";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import { Progress } from "..";

const meta = {
  title: "Components/Progress",
  tags: ["autodocs"],
  component: Progress,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='w-full max-w-sm px-4'><story /></StorybookWrapperSimple>`,
    }),
  ],
  argTypes: {
    modelValue: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
  args: {
    modelValue: 33,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Progress bar bound to a static completion value. */
export const Default: Story = {
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: /* html */ `<Progress v-bind="args" class="w-full" />`,
  }),
};

/** Empty progress at zero percent. */
export const Empty: Story = {
  args: {
    modelValue: 0,
  },
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: /* html */ `<Progress v-bind="args" class="w-full" />`,
  }),
};

/** Full progress at one hundred percent. */
export const Complete: Story = {
  args: {
    modelValue: 100,
  },
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: /* html */ `<Progress v-bind="args" class="w-full" />`,
  }),
};

/** Animates from 13% to 66% after a short delay. */
export const Animated: Story = {
  argTypes: {
    modelValue: { table: { disable: true } },
  },
  render: () => ({
    components: { Progress },
    setup() {
      const progress = ref(13);
      let timer: ReturnType<typeof setTimeout> | undefined;

      onMounted(() => {
        timer = setTimeout(() => {
          progress.value = 66;
        }, 500);
      });

      onUnmounted(() => {
        if (timer) clearTimeout(timer);
      });

      return { progress };
    },
    template: /* html */ `<Progress :model-value="progress" class="w-full" />`,
  }),
};
