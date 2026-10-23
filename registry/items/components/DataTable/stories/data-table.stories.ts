import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, userEvent, within } from "storybook/test";
import DataTableDemo from "../_preview.vue";
import { DataTable } from "..";

const meta: Meta<typeof DataTableDemo> = {
  title: "Components/Data Table",
  component: DataTableDemo,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const filter = canvas.getByRole("textbox", { name: "Filter emails…" });
    await userEvent.type(filter, "ken99");
    await expect(canvas.getByText("ken99@yahoo.com")).toBeVisible();
    await expect(canvas.queryByText("abe45@gmail.com")).not.toBeInTheDocument();
    await userEvent.clear(filter);
    await userEvent.click(canvas.getByRole("checkbox", { name: "Select row m5gr84i9" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("1 of 6 row(s) selected.");
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(canvas.getByText("riley@example.com")).toBeVisible();
    await expect(canvas.queryByText("ken99@yahoo.com")).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Previous" }));
    await expect(canvas.getByRole("checkbox", { name: "Select row m5gr84i9" })).toBeChecked();
  },
};

export const Empty: Story = {
  render: () => ({
    components: { DataTable },
    setup: () => ({ columns: [{ accessorKey: "email", header: "Email" }], data: [] }),
    template: /* html */ `<DataTable :columns="columns" :data="data" />`,
  }),
};
