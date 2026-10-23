import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within } from "storybook/test";
import { DotCanvas, DOT_CANVAS_SIZES, type DotCanvasSize } from "..";

const meta: Meta<{ size: DotCanvasSize }> = {
  title: "Components/Dot Canvas",
  component: DotCanvas,
  argTypes: { size: { control: "select", options: [...DOT_CANVAS_SIZES] } },
  args: { size: 24 },
  render: (args) => ({
    components: { DotCanvas },
    setup: () => ({ args }),
    template: /* html */ `<div class="relative h-64 w-full rounded-lg border"><DotCanvas v-bind="args" data-testid="dot-canvas" /></div>`,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement).getByTestId("dot-canvas");
    await expect(canvas).toHaveAttribute("aria-hidden", "true");
    await expect(getComputedStyle(canvas).pointerEvents).toBe("none");
    await expect(getComputedStyle(canvas).backgroundSize).toBe(`${args.size}px ${args.size}px`);
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Dense: Story = { args: { size: DOT_CANVAS_SIZES[0] } };
export const Medium: Story = { args: { size: DOT_CANVAS_SIZES[1] } };
