import { fileURLToPath, URL } from "node:url";

import type { StorybookConfig } from "@storybook/vue3-vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

const config: StorybookConfig = {
  stories: ["../registry/items/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-themes",
  ],
  framework: "@storybook/vue3-vite",
  async viteFinal(config) {
    // Storybook loads vite.config.ts, which is Vite+-only (no Vue plugin, no Nuxt aliases).
    // @storybook/vue3-vite doesn't inject @vitejs/plugin-vue, so add it here along with the
    // aliases every registry component/story relies on (normally supplied by nuxt.config.ts).
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [vue(), tailwindcss()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("../app", import.meta.url)),
          "#registry-ui": fileURLToPath(new URL("../registry/items/components", import.meta.url)),
          "@registry": fileURLToPath(new URL("../registry/items", import.meta.url)),
        },
      },
    });
  },
};

export default config;
