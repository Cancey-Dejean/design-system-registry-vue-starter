import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { defineProject, type UserWorkspaceConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineProject(
  async (): Promise<UserWorkspaceConfig> => ({
    plugins: await storybookTest({
      configDir: path.join(dirname, ".storybook"),
      storybookScript: "storybook dev -p 6006 --no-open",
    }),
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        provider: playwright(),
        headless: true,
        instances: [{ browser: "chromium" }],
      },
    },
  }),
);
