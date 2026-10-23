import { addTemplate, addTypeTemplate, defineNuxtModule, updateTemplates } from "@nuxt/kit";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { parse } from "yaml";

// Generate only link metadata; story implementations never enter the docs bundle.
export default defineNuxtModule({
  setup(_, nuxt) {
    const root = join(nuxt.options.rootDir, "registry/items");
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
      );
    const template = addTemplate({
      filename: "registry-storybook.mjs",
      write: true,
      getContents() {
        const links: Record<string, string> = {};
        for (const manifest of walk(root).filter((path) => path.endsWith("/_registry.md"))) {
          const dir = manifest.slice(0, -"/_registry.md".length);
          const frontmatter = readFileSync(manifest, "utf8").split("---")[1];
          const name = parse(frontmatter ?? "")?.name;
          if (!name || !existsSync(dir)) continue;
          const stories = walk(dir)
            .filter((path) => /\.stories\.[cm]?[jt]sx?$/.test(path))
            .sort(
              (a, b) =>
                Number(!a.includes("/stories/")) - Number(!b.includes("/stories/")) ||
                a.localeCompare(b),
            );
          for (const story of stories) {
            const source = readFileSync(story, "utf8");
            const title = source.match(/\btitle:\s*["']([^"']+)["']/)?.[1];
            const id = source.match(/\bid:\s*["']([^"']+)["']/)?.[1];
            const storyName = source.match(/export const (\w+)/)?.[1];
            if (!title || !storyName) continue;
            const sanitize = (value: string) =>
              value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
            links[name] =
              `${sanitize(id ?? title)}--${sanitize(storyName.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"))}`;
            break;
          }
        }
        return `export default ${JSON.stringify(links)};`;
      },
    });
    nuxt.options.alias["#registry-storybook"] = template.dst;
    addTypeTemplate({
      filename: "types/registry-storybook.d.ts",
      getContents: () =>
        'declare module "#registry-storybook" { const links: Record<string, string>; export default links; }',
    });
    nuxt.hook("builder:watch", async (_, path) => {
      if (
        relative(nuxt.options.rootDir, path).includes("registry/items") ||
        path.includes(".stories.")
      ) {
        await updateTemplates({ filter: (entry) => entry.dst === template.dst });
      }
    });
  },
});
