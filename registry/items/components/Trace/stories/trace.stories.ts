import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, userEvent, within } from "storybook/test";
import TracePreview from "../_preview.vue";
import { Trace, TraceLine, TraceTitle, TraceDescription } from "..";

const meta = {
  title: "Components/Trace",
  component: Trace,
  tags: ["autodocs"],
} satisfies Meta<typeof Trace>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({ components: { TracePreview }, template: /* html */ `<TracePreview />` }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Ran the test suite" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText(/All checks passed/)).toBeVisible();
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(canvasElement.querySelector('[data-status="running"]')).toHaveAttribute(
      "aria-busy",
      "true",
    );
    await expect(canvasElement.querySelector('[data-status="pending"]')).toBeInTheDocument();
  },
};
export const Error: Story = {
  render: () => ({
    components: { Trace, TraceLine, TraceTitle, TraceDescription },
    template: /* html */ `<Trace><TraceLine status="error"><TraceTitle>Build failed</TraceTitle><TraceDescription>1 error</TraceDescription></TraceLine></Trace>`,
  }),
};
