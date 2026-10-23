import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { registryConfig } from "./app/lib/registry/config";

// @vue/compiler-sfc's own resolveExt() checks fileExists(path) on the bare import
// specifier *before* trying `index.ts`, so a plain existsSync() here would report
// `true` for a directory (e.g. `import { X } from "."`) and hand that directory
// straight to readFile, crashing with EISDIR. Must confirm it's a file.
function isFile(file: string): boolean {
  try {
    return statSync(file).isFile();
  } catch {
    return false;
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~~/registry/items/files/styles/globals.css"],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      // Static nuxt.config.ts head only accepts a string titleTemplate (it's serialized at
      // build time). The "no title -> just the site name" fallback needs a function, which
      // is only supported by the runtime useHead() ReactiveHead type — see app/app.vue.
      meta: [{ name: "description", content: registryConfig.description }],
    },
  },
  alias: {
    // The docs shell imports UI primitives straight from the published registry source
    // (registry/items/components/**) instead of keeping a separate app/components/ui copy —
    // single source of truth for both the docs site and what `shadcn-vue add` installs.
    "#registry-ui": fileURLToPath(new URL("./registry/items/components", import.meta.url)),
    // Shorthand for any file inside registry/items — e.g. @registry/components/button/Button.vue
    "@registry": fileURLToPath(new URL("./registry/items", import.meta.url)),
  },
  typescript: {
    tsConfig: {
      // Bring registry source files into the TypeScript project so the IDE resolves
      // @registry/* imports (and cross-file types) inside registry/items correctly.
      include: ["../registry/**/*"],
      compilerOptions: {
        paths: {
          "@registry/*": ["../registry/items/*"],
        },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    vue: {
      // @vue/compiler-sfc's defineProps<T>() type resolution needs fs access to follow types
      // imported from other packages (e.g. reka-ui's PrimitiveProps). It only auto-detects a
      // Node environment; running under bun via vite-plus doesn't trip that check, so it's
      // passed explicitly here — otherwise every component using such a type fails to compile
      // with "No fs option provided to compileScript in non-Node environment."
      script: {
        fs: {
          fileExists: (file: string) => isFile(file),
          readFile: (file: string) => readFileSync(file, "utf-8"),
        },
      },
    },
  },
  nitro: {
    // server/utils/{docs,registry}-catalog.ts read markdown/source files at runtime via
    // node:fs with dynamically-computed paths (slug/name only known per-request). Nitro's
    // build-time file tracer can't see those paths statically, so on a serverless deploy
    // (Vercel) the files never get bundled into the function — works in dev only, since the
    // full repo is on disk there. serverAssets bundles them explicitly and exposes them
    // through useStorage("assets:<baseName>") instead, which the tracer does pick up.
    serverAssets: [
      { baseName: "docs", dir: fileURLToPath(new URL("./content/docs", import.meta.url)) },
      {
        baseName: "registry-items",
        dir: fileURLToPath(new URL("./registry/items", import.meta.url)),
      },
    ],
  },
  modules: [
    "./modules/registry-storybook",
    "@nuxt/a11y",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/color-mode",
    "@nuxt/content",
  ],
  colorMode: {
    classSuffix: "",
  },
  content: {
    build: {
      markdown: {
        // Include h3s in the generated table of contents (default only goes to h2), so the
        // right-side "On This Page" nav can show nested sub-sections.
        toc: { depth: 3, searchDepth: 3 },
      },
    },
  },
});
