import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const registryItemType = z.enum([
  "registry:ui",
  "registry:component",
  "registry:block",
  "registry:base",
  "registry:font",
  "registry:lib",
  "registry:hook",
  "registry:page",
  "registry:file",
  "registry:style",
  "registry:theme",
  "registry:item",
]);

export default defineContentConfig({
  collections: {
    registryItems: defineCollection({
      type: "page",
      source: {
        include: "**/_registry.md",
        cwd: "registry/items",
      },
      schema: z.object({
        name: z.string(),
        type: registryItemType,
        title: z.string().optional(),
        description: z.string(),
        categories: z.array(z.string()).optional(),
        keywords: z.array(z.string()).optional(),
        dependencies: z.array(z.string()).optional(),
        localRegistryDependencies: z.array(z.string()).optional(),
        files: z
          .array(
            z.object({
              path: z.string(),
              type: registryItemType,
              target: z.string().optional(),
            }),
          )
          .optional(),
      }),
    }),
    docs: defineCollection({
      type: "page",
      source: {
        include: "**/*.{md,mdx}",
        cwd: "content/docs",
      },
      schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number(),
        audience: z.enum(["maintainers"]).optional(),
      }),
    }),
  },
});
