import path from "node:path";

import { describe, expect, test } from "vite-plus/test";

import { createRegistryApiChecker, findRegistryApiSources, getRegistryItemApi } from "./extract";

const rootDir = path.resolve(import.meta.dirname, "..", "..");
const itemsDir = path.join(rootDir, "registry", "items");
const checker = createRegistryApiChecker(rootDir);
const sources = findRegistryApiSources(itemsDir);

function readApi(name: string) {
  const source = sources.find((entry) => entry.name === name);

  if (!source) {
    throw new Error(`No registry item named "${name}".`);
  }

  return getRegistryItemApi(source, checker, itemsDir);
}

describe("getRegistryItemApi", () => {
  test("reads cva variants with their defaults", () => {
    const api = readApi("container");

    expect(api.component).toBe("Container");
    expect(api.variants).toEqual([
      { name: "size", options: ["base", "contained", "thin", "full"], defaultValue: "base" },
    ]);
    expect(api.props).toEqual([]);
  });

  test("keeps own non-variant props and leaves out inherited primitive props", () => {
    const api = readApi("button");

    expect(api.variants.map((variant) => variant.name)).toEqual(["variant", "size"]);
    expect(api.variants[0]?.defaultValue).toBe("primary");
    expect(api.props.map((prop) => prop.name)).toEqual(["fullWidth", "icon"]);
    expect(api.props.every((prop) => prop.type === "boolean" && prop.optional)).toBe(true);
  });

  test("returns an empty API for items without component sources", () => {
    expect(
      getRegistryItemApi(
        {
          directory: path.join(itemsDir, "missing"),
          name: "missing",
          title: "Missing",
          files: ["styles.css"],
        },
        checker,
        itemsDir,
      ),
    ).toEqual({ variants: [], props: [] });
  });
});
