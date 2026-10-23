import { ref } from "vue";
import { expect, userEvent, within } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import {
  AnnouncementBar,
  AnnouncementBarSlider,
  ANNOUNCEMENT_BAR_THEMES,
  type AnnouncementTheme,
} from "..";
const meta: Meta<{ theme?: AnnouncementTheme }> = {
  title: "Components/AnnouncementBar",
  component: AnnouncementBar,
  argTypes: { theme: { control: "select", options: ANNOUNCEMENT_BAR_THEMES } },
  args: { theme: "light" },
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => ({
    components: { AnnouncementBar },
    setup: () => ({ args }),
    template: /* html */ `<AnnouncementBar v-bind="args"><p class="text-center text-sm">New components are available. <a href="#" class="underline">Explore the registry</a></p></AnnouncementBar>`,
  }),
};
export const Slider: Story = {
  render: () => ({
    components: { AnnouncementBarSlider },
    template: /* html */ `<AnnouncementBarSlider theme="gray"><p>First announcement</p><p>Second announcement</p></AnnouncementBarSlider>`,
  }),
};

export const DynamicMessages: Story = {
  render: () => ({
    components: { AnnouncementBarSlider },
    setup: () => ({ messages: ref(["First announcement"]) }),
    template: /* html */ `<div><button type="button" @click="messages = ['Updated announcement', 'Second announcement']">Update messages</button><AnnouncementBarSlider><p v-for="message in messages" :key="message">{{ message }}</p></AnnouncementBarSlider></div>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole("button", { name: "Next announcement" }),
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Update messages" }));
    await expect(canvas.getByText("Updated announcement")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Next announcement" })).toBeVisible();
  },
};
