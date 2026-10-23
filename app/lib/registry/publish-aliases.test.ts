import { describe, expect, test } from "vite-plus/test";
import { createPublishedAliasMap, rewriteInternalAliasesForPublishing } from "./publish-aliases";

const aliases = createPublishedAliasMap([
  {
    name: "button",
    files: [
      { path: "index.ts", target: "components/ui/Button/index.ts" },
      { path: "Button.vue", target: "components/ui/Button/Button.vue" },
    ],
  },
  {
    name: "input-group",
    files: [{ path: "index.ts", target: "components/ui/input-group/index.ts" }],
  },
  {
    name: "sheet",
    files: [
      { path: "index.ts", target: "components/ui/sheet/index.ts" },
      { path: "SheetTitle.vue", target: "components/ui/sheet/SheetTitle.vue" },
    ],
  },
]);

describe("registry consumer import aliases", () => {
  test("rewrites both authoring aliases using actual manifest target casing", () => {
    const source =
      'import { Button } from "@registry/components/Button/index.ts";\nimport { InputGroup } from "#registry-ui/InputGroup";';
    expect(rewriteInternalAliasesForPublishing(source, aliases)).toBe(
      'import { Button } from "@/components/ui/Button/index.ts";\nimport { InputGroup } from "@/components/ui/input-group";',
    );
  });
  test("resolves direct subcomponent imports to published targets", () => {
    expect(
      rewriteInternalAliasesForPublishing(
        'import Title from "@registry/components/Sheet/SheetTitle.vue";',
        aliases,
      ),
    ).toBe('import Title from "@/components/ui/sheet/SheetTitle.vue";');
  });
  test("maps the shared registry utility to the consumer lib alias", () => {
    expect(
      rewriteInternalAliasesForPublishing('import { cn } from "@registry/lib/utils";', aliases),
    ).toBe('import { cn } from "@/lib/utils";');
  });
  test("preserves relative and npm imports", () => {
    const source = 'import { ref } from "vue"; import Thing from "./Thing.vue";';
    expect(rewriteInternalAliasesForPublishing(source, aliases)).toBe(source);
  });
  test("does not invent a target for an unpublished component", () => {
    expect(
      rewriteInternalAliasesForPublishing('import X from "#registry-ui/Unknown";', aliases),
    ).toBe('import X from "#registry-ui/Unknown";');
  });
});

// A published barrel must not re-export files that the CLI never installs.
test("published public barrels include their relative source exports", async () => {
  const { readFile } = await import("node:fs/promises");
  const { parse } = await import("yaml");
  for (const folder of ["InputGroup", "Spinner"]) {
    const directory = `registry/items/components/${folder}`;
    const manifest = parse(
      (await readFile(`${directory}/_registry.md`, "utf8")).split("---")[1]!,
    ) as { files: { path: string }[] };
    const published = new Set(manifest.files.map((file) => file.path));
    expect(published.has("index.ts"), `${folder} installs its public barrel`).toBe(true);
    const barrel = await readFile(`${directory}/index.ts`, "utf8");
    for (const match of barrel.matchAll(/from\s+["']\.\/([^"']+)["']/gu)) {
      const source = match[1]!;
      expect(
        [...published].some(
          (file) => file === source || file === `${source}.ts` || file === `${source}.vue`,
        ),
        `${folder}/index.ts exports ${source}`,
      ).toBe(true);
    }
  }
});

describe("relative component imports in published source", () => {
  const relativeAliases = createPublishedAliasMap([
    {
      name: "calendar",
      files: [{ path: "Calendar.vue", target: "components/ui/calendar/Calendar.vue" }],
    },
    {
      name: "popover",
      files: [
        { path: "Popover.vue", target: "components/ui/popover/Popover.vue" },
        { path: "PopoverContent.vue", target: "components/ui/popover/PopoverContent.vue" },
      ],
    },
    { name: "label", files: [{ path: "index.ts", target: "components/ui/label/index.ts" }] },
    { name: "toggle", files: [{ path: "index.ts", target: "components/ui/toggle/index.ts" }] },
    {
      name: "separator",
      files: [{ path: "index.ts", target: "components/ui/separator/index.ts" }],
    },
    {
      name: "native-select",
      files: [{ path: "index.ts", target: "components/ui/native-select/index.ts" }],
    },
    {
      name: "button",
      files: [{ path: "Button.variants.ts", target: "components/ui/Button/Button.variants.ts" }],
    },
  ]);

  test.each([
    ["DatePicker.vue", "../Calendar/Calendar.vue", "@/components/ui/calendar/Calendar.vue"],
    ["DatePicker.vue", "../Popover/Popover.vue", "@/components/ui/popover/Popover.vue"],
    [
      "DatePicker.vue",
      "../Popover/PopoverContent.vue",
      "@/components/ui/popover/PopoverContent.vue",
    ],
    ["FormLabel.vue", "../Label", "@/components/ui/label"],
    ["ToggleGroup.vue", "../Toggle", "@/components/ui/toggle"],
    ["ItemSeparator.vue", "../Separator", "@/components/ui/separator"],
    ["Calendar.vue", "../NativeSelect", "@/components/ui/native-select"],
    [
      "CalendarCellTrigger.vue",
      "../Button/Button.variants",
      "@/components/ui/Button/Button.variants",
    ],
    ["nested/Control.vue", "../../Label", "@/components/ui/label"],
  ])("rewrites %s import %s to its manifest destination", (sourcePath, specifier, target) => {
    expect(
      rewriteInternalAliasesForPublishing(
        `import X from "${specifier}";`,
        relativeAliases,
        sourcePath,
      ),
    ).toBe(`import X from "${target}";`);
  });

  test("preserves relative imports within the same item", () => {
    const source = 'import X from "../Label"; import Other from "./Other.vue";';
    expect(rewriteInternalAliasesForPublishing(source, relativeAliases, "nested/Control.vue")).toBe(
      source,
    );
  });

  test("preserves imports with no manifest target or source context", () => {
    const source = 'import X from "../Missing/Missing.vue";';
    expect(rewriteInternalAliasesForPublishing(source, relativeAliases, "Control.vue")).toBe(
      source,
    );
    expect(rewriteInternalAliasesForPublishing('import X from "../Label";', relativeAliases)).toBe(
      'import X from "../Label";',
    );
  });
});
