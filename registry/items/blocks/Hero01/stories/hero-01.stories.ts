import type { Meta, StoryObj } from "@storybook/vue3";
import { Hero01 } from "..";
const meta: Meta<typeof Hero01> = {
  title: "Components/Hero01",
  component: Hero01,
  parameters: { layout: "fullscreen" },
};
export default meta;
export const Default: StoryObj<typeof Hero01> = {};
