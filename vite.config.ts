import { defineConfig } from "vite-plus";

export default defineConfig({
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
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
