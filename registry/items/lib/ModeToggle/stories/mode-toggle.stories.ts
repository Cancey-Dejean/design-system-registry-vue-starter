import type { Meta, StoryObj } from "@storybook/vue3";
import { onUnmounted } from "vue";
import { expect, userEvent, within } from "storybook/test";
import { ModeToggle, resolveThemeMode, type ThemeMode } from "..";

const storageKey = "storybook-mode-toggle";
const meta: Meta<{ defaultMode: ThemeMode; storageKey: string }> = {
  title: "Components/Mode Toggle",
  component: ModeToggle,
  args: { defaultMode: "light", storageKey },
  decorators: [
    () => ({
      setup() {
        const root = document.documentElement;
        const initialClass = root.className;
        const initialScheme = root.style.colorScheme;
        const initialStored = localStorage.getItem(storageKey);
        localStorage.removeItem(storageKey);
        onUnmounted(() => {
          root.className = initialClass;
          root.style.colorScheme = initialScheme;
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
    const button = canvas.getByRole("button", { name: /Theme mode: light/ });
    await userEvent.click(button);
    await expect(button).toHaveAttribute("data-mode", "dark");
    await expect(document.documentElement).toHaveClass("dark");
    await expect(localStorage.getItem(storageKey)).toBe("dark");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("data-mode", "auto");
    await expect(document.documentElement).toHaveClass(
      resolveThemeMode("auto", matchMedia("(prefers-color-scheme: dark)").matches),
    );
    await expect(localStorage.getItem(storageKey)).toBe("auto");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("data-mode", "light");
    await expect(document.documentElement).toHaveClass("light");
    await expect(localStorage.getItem(storageKey)).toBe("light");
  },
};
