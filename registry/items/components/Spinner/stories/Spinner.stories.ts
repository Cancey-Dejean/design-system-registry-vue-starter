import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Spinner } from "../";

const meta = {
  title: "Components/Spinner",
  tags: ["autodocs"],
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    class: { control: "text" },
  },
  args: {
    class: "",
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    class: "size-8",
  },
};

export const Muted: Story = {
  args: {
    class: "size-6 text-muted-foreground",
  },
};
