import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { CONTAINER_SIZES, Container } from "../";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";

const meta = {
  title: "Components/Container",
  tags: ["autodocs"],
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => ({
      components: { StorybookWrapper },
      template: "<StorybookWrapper><story /></StorybookWrapper>",
    }),
  ],
  argTypes: {
    size: {
      description: "Max-width size variant",
      control: "select",
      options: CONTAINER_SIZES,
    },
    class: { control: false },
  },
  args: {
    size: "base",
    default: "Content goes here...",
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Container },
    setup: () => ({ args }),
    template: /* html */ `
      <Container
        v-bind="args"
        class="flex items-center justify-center rounded-2xl border border-dashed bg-background p-4"
      >
        {{ args.default }}
      </Container>
    `,
  }),
};

export const Sizes: Story = {
  argTypes: {
    size: { table: { disable: true } },
  },
  render: () => ({
    components: { Container },
    setup: () => ({ sizes: CONTAINER_SIZES }),
    template: /* html */ `
      <div class="flex w-full flex-col gap-4">
        <Container
          v-for="size in sizes"
          :key="size"
          :size="size"
          class="flex items-center justify-center rounded-2xl border border-dashed bg-background p-4"
        >
          size={{ size }}
        </Container>
      </div>
    `,
  }),
};
