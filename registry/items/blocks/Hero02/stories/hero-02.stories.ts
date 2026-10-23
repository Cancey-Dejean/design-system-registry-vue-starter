import type { Meta, StoryObj } from "@storybook/vue3";
import { Hero02 } from "..";
const meta: Meta<typeof Hero02> = {
  title: "Components/Hero02",
  component: Hero02,
  parameters: { layout: "fullscreen" },
};
export default meta;
export const Default: StoryObj<typeof Hero02> = {};
