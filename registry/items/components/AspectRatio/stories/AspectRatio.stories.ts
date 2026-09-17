import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { AspectRatio } from "../";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";

const meta = {
  title: "Components/Aspect Ratio",
  tags: ["autodocs"],
  component: AspectRatio,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => ({
      components: { StorybookWrapper },
      // Explicit width: AspectRatio is width:100% of its parent, and the
      // absolutely positioned child does not give the parent intrinsic size.
      template: /* html */ `<StorybookWrapper class="w-96"><story /></StorybookWrapper>`,
    }),
  ],
  argTypes: {
    ratio: {
      description: "Width divided by height",
      control: "select",
      options: [16 / 9, 1, 3 / 4, 21 / 9],
      labels: {
        [16 / 9]: "16 / 9",
        1: "1 / 1",
        [3 / 4]: "3 / 4",
        [21 / 9]: "21 / 9",
      },
    },
  },
  args: {
    ratio: 16 / 9,
  },
  render: (args) => ({
    components: { AspectRatio },
    setup: () => ({ args }),
    template: /* html */ `
      <AspectRatio v-bind="args" class="bg-muted overflow-hidden rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="size-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </AspectRatio>
    `,
  }),
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Landscape: Story = {
  args: {
    ratio: 16 / 9,
  },
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
};
