import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, userEvent, within } from "storybook/test";
import QuestionnairePreview from "../_preview.vue";
import { Questionnaire } from "..";

const meta = {
  title: "Components/Questionnaire",
  component: Questionnaire,
  tags: ["autodocs"],
  render: () => ({
    components: { QuestionnairePreview },
    template: /* html */ `<QuestionnairePreview />`,
  }),
} satisfies Meta<typeof Questionnaire>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(canvas.getByRole("alert")).toHaveTextContent("Choose an answer to continue.");
    await userEvent.click(canvas.getByRole("radio", { name: "Build the feature" }));
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await expect(canvas.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");
    await userEvent.click(canvas.getByRole("checkbox", { name: "Tests" }));
    await userEvent.click(canvas.getByRole("checkbox", { name: "Documentation" }));
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await userEvent.click(canvas.getByRole("button", { name: "Previous" }));
    await expect(canvas.getByRole("checkbox", { name: "Tests" })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "Documentation" })).toBeChecked();
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await userEvent.click(canvas.getByRole("radio", { name: "Start now" }));
    await userEvent.click(canvas.getByRole("button", { name: "Save plan" }));
    const result = JSON.parse(canvas.getByLabelText("Submitted answers").textContent ?? "{}");
    await expect(result).toEqual({ task: ["build"], sources: ["tests", "docs"], timing: ["now"] });
  },
};

export const FreeformAndSkip: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Other task" }),
      "Investigate accessibility",
    );
    await userEvent.click(canvas.getByRole("button", { name: "Next" }));
    await userEvent.click(canvas.getByRole("checkbox", { name: "Tests" }));
    await userEvent.click(canvas.getByRole("button", { name: "Skip" }));
    await userEvent.click(canvas.getByRole("radio", { name: "Schedule later" }));
    await userEvent.click(canvas.getByRole("button", { name: "Save plan" }));
    const result = JSON.parse(canvas.getByLabelText("Submitted answers").textContent ?? "{}");
    await expect(result).toEqual({ task: ["Investigate accessibility"], timing: ["later"] });
  },
};

export const KeyboardShortcuts: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("radio", { name: "Inspect the implementation" }).focus();
    await userEvent.keyboard("b");
    await expect(canvas.getByRole("radio", { name: "Build the feature" })).toBeChecked();
    await userEvent.keyboard("{Control>}{Enter}{/Control}");
    await expect(canvas.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");
  },
};
