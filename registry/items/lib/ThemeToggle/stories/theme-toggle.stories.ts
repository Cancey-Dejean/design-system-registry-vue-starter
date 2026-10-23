import type { Meta, StoryObj } from "@storybook/vue3";
import { onUnmounted } from "vue";
import { expect, userEvent, within } from "storybook/test";
import { ThemeToggle, themes, themeLabels, type BrandTheme } from "..";

const storageKey = "storybook-brand-theme";
const meta: Meta<{ defaultTheme: BrandTheme; storageKey: string }> = {
  title: "Components/Theme Toggle",
  component: ThemeToggle,
  args: { defaultTheme: "theme-primary", storageKey },
  decorators: [
    () => ({
      setup() {
        const root = document.documentElement;
        const initialTheme = root.getAttribute("data-theme");
        const initialStored = localStorage.getItem(storageKey);
        root.removeAttribute("data-theme");
        localStorage.removeItem(storageKey);
        onUnmounted(() => {
          if (initialTheme === null) root.removeAttribute("data-theme");
          else root.setAttribute("data-theme", initialTheme);
          if (initialStored === null) localStorage.removeItem(storageKey);
          else localStorage.setItem(storageKey, initialStored);
        });
        return {};
      },
      template: /* html */ `<story />`,
    }),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const theme of [themes[1], themes[2], themes[0]]) {
      const option = canvas.getByRole("button", { name: themeLabels[theme] });
      await userEvent.click(option);
      await expect(document.documentElement).toHaveAttribute("data-theme", theme);
      await expect(localStorage.getItem(storageKey)).toBe(theme);
      await expect(option).toHaveAttribute("aria-pressed", "true");
    }
    // Clicking the active single-select option must not clear the current theme.
    await userEvent.click(canvas.getByRole("button", { name: themeLabels[themes[0]] }));
    await expect(document.documentElement).toHaveAttribute("data-theme", themes[0]);
  },
};
