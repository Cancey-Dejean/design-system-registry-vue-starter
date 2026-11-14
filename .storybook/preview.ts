/// <reference types="vite/client" />
import type { Preview } from "@storybook/vue3-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

import "../registry/items/files/styles/globals.css";

const preview: Preview = {
  globalTypes: {
    accent: {
      description: "Accent palette",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "default", title: "Primary" },
          { value: "theme-secondary", title: "Secondary" },
          { value: "theme-tertiary", title: "Tertiary" },
        ],
      },
    },
  },
  initialGlobals: {
    accent: "theme-secondary",
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [],
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    // Matches @nuxtjs/color-mode's classSuffix: "" convention — .light/.dark on <html>.
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (story, context) => {
      const accent = context.globals.accent;
      if (accent === "theme-secondary" || accent === "theme-tertiary") {
        document.documentElement.setAttribute("data-theme", accent);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      return story();
    },
  ],
};

export default preview;
