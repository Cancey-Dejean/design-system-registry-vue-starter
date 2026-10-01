import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    projects: ["./vitest.unit.config.ts", "./vitest.storybook.config.ts"],
  },
  run: {
    tasks: {
      "registry:new": {
        // TODO: fix TTY weirdness -- for now, run `./scripts/new.ts` from the command line directly.
        command: "bun --bun ./scripts/new.ts",
      },
      "registry:doctor": {
        command: "bun --bun ./scripts/doctor.ts",
      },
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }, "@shadcn/lint"],
    // components.json `ui` is the consumer install alias (`@/components/ui`).
    // This repo imports published components through the other prefixes.
    settings: {
      shadcn: {
        ui: ["#registry-ui", "@registry/components", "@/components/ui"],
      },
    },
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
