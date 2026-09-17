import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Hero } from "..";

const meta = {
  title: "Blocks/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    class: { control: false },
  },
  args: {},
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
