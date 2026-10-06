import { describe, expect, test } from "vite-plus/test";

import { toRemoteRegistryDependency, type RegistryFlowItem } from "./flow-data";
import {
  createRegistryFlowGraph,
  getDependencyDepths,
  getFlowLayers,
  getFlowRole,
  getInstallOrder,
  getInstallPackages,
  getInstallStepId,
  getTransitiveNeighbors,
  getVia,
} from "./flow-graph";

function item(name: string, overrides: Partial<RegistryFlowItem> = {}): RegistryFlowItem {
  return {
    name,
    type: "registry:ui",
    title: name,
    dependencies: [],
    localDependencies: [],
    remoteDependencies: [],
    files: [`components/ui/${name}/index.ts`],
    api: { variants: [], props: [] },
    ...overrides,
  };
}

const graph = createRegistryFlowGraph([
  item("input", { dependencies: ["@base-ui/react"] }),
  item("textarea"),
  item("input-group", {
    localDependencies: ["input", "textarea"],
    dependencies: ["class-variance-authority"],
  }),
  item("combobox", {
    localDependencies: ["input-group"],
    remoteDependencies: [
      toRemoteRegistryDependency("https://ui.shadcn.com/r/styles/base-nova/button.json"),
    ],
    dependencies: ["@base-ui/react"],
  }),
  item("loner", { localDependencies: ["missing-item"] }),
]);

describe("registry flow graph", () => {
  test("indexes dependents and ignores unknown local dependencies", () => {
    expect(graph.dependents.get("input")).toEqual(["input-group"]);
    expect(graph.dependents.get("input-group")).toEqual(["combobox"]);
    expect(getFlowRole(graph, "input")).toBe("shared");
    expect(getFlowRole(graph, "combobox")).toBe("composite");
    expect(getFlowRole(graph, "loner")).toBe("standalone");
  });

  test("walks transitive dependencies and dependents", () => {
    expect([...getTransitiveNeighbors(graph, "combobox", "up")].toSorted()).toEqual([
      "input",
      "input-group",
      "textarea",
    ]);
    expect([...getTransitiveNeighbors(graph, "input", "down")].toSorted()).toEqual([
      "combobox",
      "input-group",
    ]);
    expect(getVia(graph, "combobox", "input", "up")).toBe("input-group");
    expect(getVia(graph, "combobox", "input-group", "up")).toBeNull();
  });

  test("computes depths and layers by longest path", () => {
    const depths = getDependencyDepths(graph);

    expect(depths.get("input")).toBe(0);
    expect(depths.get("input-group")).toBe(1);
    expect(depths.get("combobox")).toBe(2);
    expect(Object.fromEntries(getFlowLayers(graph, "input", "down"))).toEqual({
      input: 0,
      "input-group": 1,
      combobox: 2,
    });
  });

  test("orders installs dependencies-first and dedupes packages", () => {
    const steps = getInstallOrder(graph, "combobox");

    expect(steps.map(getInstallStepId)).toEqual([
      "input",
      "textarea",
      "input-group",
      "remote:https://ui.shadcn.com/r/styles/base-nova/button.json",
      "combobox",
    ]);
    expect(getInstallPackages(graph, steps)).toEqual([
      "@base-ui/react",
      "class-variance-authority",
    ]);
  });

  test("survives dependency cycles", () => {
    const cyclic = createRegistryFlowGraph([
      item("a", { localDependencies: ["b"] }),
      item("b", { localDependencies: ["a"] }),
    ]);

    expect(getInstallOrder(cyclic, "a").map(getInstallStepId)).toEqual(["b", "a"]);
    expect(getTransitiveNeighbors(cyclic, "a", "up")).toEqual(new Set(["b"]));
    expect(getDependencyDepths(cyclic).get("a")).toBeGreaterThanOrEqual(0);
  });
});

describe("remote registry dependencies", () => {
  test("labels URLs, namespaced items, and bare shadcn names", () => {
    expect(
      toRemoteRegistryDependency("https://ui.shadcn.com/r/styles/base-nova/button.json"),
    ).toMatchObject({ name: "button", source: "ui.shadcn.com" });
    expect(toRemoteRegistryDependency("@acme/card")).toMatchObject({
      name: "card",
      source: "@acme",
    });
    expect(toRemoteRegistryDependency("button")).toMatchObject({
      name: "button",
      source: "shadcn",
    });
  });
});
