import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { registryConfig } from "./app/lib/registry/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~~/registry/items/files/styles/globals.css"],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: (title: string) =>
        title ? `${title} — ${registryConfig.name}` : registryConfig.name,
      meta: [{ name: "description", content: registryConfig.description }],
    },
  },
  alias: {
    // The docs shell imports UI primitives straight from the published registry source
    // (registry/items/components/**) instead of keeping a separate app/components/ui copy —
    // single source of truth for both the docs site and what `shadcn-vue add` installs.
    "#registry-ui": fileURLToPath(new URL("./registry/items/components", import.meta.url)),
  },
  vue: {
    // @vue/compiler-sfc's defineProps<T>() type resolution needs fs access to follow types
    // imported from other packages (e.g. reka-ui's PrimitiveProps). It only auto-detects a
    // Node environment; running under bun via vite-plus doesn't trip that check, so it's
    // passed explicitly here — otherwise every component using such a type fails to compile
    // with "No fs option provided to compileScript in non-Node environment."
    script: {
      fs: {
        fileExists: (file: string) => existsSync(file),
        readFile: (file: string) => readFileSync(file, "utf-8"),
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  hooks: {
    "vite:extendConfig": (config: { vue?: { script?: { fs?: unknown } } }) => {
      config.vue ??= {};
      config.vue.script ??= {};
      config.vue.script.fs = {
        fileExists: (file: string) => existsSync(file),
        readFile: (file: string) => readFileSync(file, "utf-8"),
      };
    },
  },
  modules: [
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
});
