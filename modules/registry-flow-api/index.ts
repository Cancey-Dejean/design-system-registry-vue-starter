import { addServerTemplate, addTypeTemplate, defineNuxtModule } from "@nuxt/kit";

import { getRegistryApis } from "./extract";

/**
 * Reading component props needs the TypeScript checker and the registry sources
 * on disk, neither of which a deployed server function has. So the props are
 * read once at build time and handed to Nitro as a virtual module. In dev,
 * restart the server to pick up changed props.
 */
export default defineNuxtModule({
  meta: { name: "registry-flow-api" },
  setup(_options, nuxt) {
    addServerTemplate({
      filename: "#registry-flow-api",
      getContents: () => `export default ${JSON.stringify(getRegistryApis(nuxt.options.rootDir))};`,
    });

    addTypeTemplate(
      {
        filename: "types/registry-flow-api.d.ts",
        getContents: () =>
          [
            'declare module "#registry-flow-api" {',
            '  import type { RegistryFlowApi } from "~/lib/registry/flow-data";',
            "  const apis: Record<string, RegistryFlowApi>;",
            "  export default apis;",
            "}",
            "",
          ].join("\n"),
      },
      { nitro: true, nuxt: true },
    );
  },
});
