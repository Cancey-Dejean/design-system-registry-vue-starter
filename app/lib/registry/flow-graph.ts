import type { RegistryFlowItem, RegistryFlowRemoteDependency } from "./flow-data";

const registryItemCollator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

function compareRegistryItemNames(a: RegistryFlowItem, b: RegistryFlowItem): number {
  return (
    registryItemCollator.compare(a.title, b.title) || registryItemCollator.compare(a.name, b.name)
  );
}

export type RegistryFlowDirection = "up" | "down";

export type RegistryFlowRole = "shared" | "composite" | "standalone";

export type RegistryFlowGraph = {
  items: ReadonlyMap<string, RegistryFlowItem>;
  names: readonly string[];
  dependents: ReadonlyMap<string, readonly string[]>;
};

export type RegistryFlowInstallStep =
  | { kind: "item"; name: string }
  | { kind: "remote"; dependency: RegistryFlowRemoteDependency };

export function createRegistryFlowGraph(items: readonly RegistryFlowItem[]): RegistryFlowGraph {
  const sorted = items.toSorted(compareRegistryItemNames);
  const byName = new Map(sorted.map((item) => [item.name, item]));
  const dependents = new Map<string, string[]>();

  for (const item of sorted) {
    for (const dependency of item.localDependencies) {
      if (!byName.has(dependency) || dependency === item.name) {
        continue;
      }

      dependents.set(dependency, [...(dependents.get(dependency) ?? []), item.name]);
    }
  }

  return {
    items: byName,
    names: sorted.map((item) => item.name),
    dependents,
  };
}

export function getLocalDependencies(graph: RegistryFlowGraph, name: string): string[] {
  return (graph.items.get(name)?.localDependencies ?? []).filter(
    (dependency) => dependency !== name && graph.items.has(dependency),
  );
}

export function getDependents(graph: RegistryFlowGraph, name: string): readonly string[] {
  return graph.dependents.get(name) ?? [];
}

export function getNeighbors(
  graph: RegistryFlowGraph,
  name: string,
  direction: RegistryFlowDirection,
): readonly string[] {
  return direction === "up" ? getLocalDependencies(graph, name) : getDependents(graph, name);
}

export function getTransitiveNeighbors(
  graph: RegistryFlowGraph,
  name: string,
  direction: RegistryFlowDirection,
): Set<string> {
  const seen = new Set<string>();
  const stack = [...getNeighbors(graph, name, direction)];

  for (let next = stack.pop(); next !== undefined; next = stack.pop()) {
    if (next === name || seen.has(next)) {
      continue;
    }

    seen.add(next);
    stack.push(...getNeighbors(graph, next, direction));
  }

  return seen;
}

/** Returns the direct neighbor that leads to `target`, or `null` when `target` is direct. */
export function getVia(
  graph: RegistryFlowGraph,
  name: string,
  target: string,
  direction: RegistryFlowDirection,
): string | null {
  const direct = getNeighbors(graph, name, direction);

  if (direct.includes(target)) {
    return null;
  }

  return (
    direct.find((neighbor) => getTransitiveNeighbors(graph, neighbor, direction).has(target)) ??
    null
  );
}

export function getFlowRole(graph: RegistryFlowGraph, name: string): RegistryFlowRole {
  if (getDependents(graph, name).length > 0) {
    return "shared";
  }

  return getLocalDependencies(graph, name).length > 0 ? "composite" : "standalone";
}

export function isConnected(graph: RegistryFlowGraph, name: string): boolean {
  return getFlowRole(graph, name) !== "standalone";
}

/** Longest dependency chain below each item: foundations are 0. */
export function getDependencyDepths(graph: RegistryFlowGraph): Map<string, number> {
  const depths = new Map<string, number>();
  const visiting = new Set<string>();

  const visit = (name: string): number => {
    const known = depths.get(name);

    if (known !== undefined) {
      return known;
    }

    if (visiting.has(name)) {
      return 0;
    }

    visiting.add(name);
    const dependencies = getLocalDependencies(graph, name);
    const depth = dependencies.length > 0 ? 1 + Math.max(...dependencies.map(visit)) : 0;
    visiting.delete(name);
    depths.set(name, depth);

    return depth;
  };

  graph.names.forEach(visit);

  return depths;
}

/** Longest-path layer of every item reachable from `name` in `direction`; `name` is layer 0. */
export function getFlowLayers(
  graph: RegistryFlowGraph,
  name: string,
  direction: RegistryFlowDirection,
): Map<string, number> {
  const layers = new Map([[name, 0]]);
  const path = new Set([name]);

  const visit = (current: string, depth: number) => {
    for (const next of getNeighbors(graph, current, direction)) {
      if (path.has(next) || (layers.get(next) ?? -1) >= depth + 1) {
        continue;
      }

      layers.set(next, depth + 1);
      path.add(next);
      visit(next, depth + 1);
      path.delete(next);
    }
  };

  visit(name, 0);

  return layers;
}

/** Dependencies first, the requested item last — the order the CLI needs them in place. */
export function getInstallOrder(graph: RegistryFlowGraph, name: string): RegistryFlowInstallStep[] {
  const steps: RegistryFlowInstallStep[] = [];
  const seen = new Set<string>();

  const visit = (current: string) => {
    if (seen.has(current)) {
      return;
    }

    seen.add(current);
    getLocalDependencies(graph, current).forEach(visit);

    for (const dependency of graph.items.get(current)?.remoteDependencies ?? []) {
      if (!seen.has(dependency.id)) {
        seen.add(dependency.id);
        steps.push({ kind: "remote", dependency });
      }
    }

    steps.push({ kind: "item", name: current });
  };

  if (graph.items.has(name)) {
    visit(name);
  }

  return steps;
}

export function getInstallPackages(
  graph: RegistryFlowGraph,
  steps: readonly RegistryFlowInstallStep[],
): string[] {
  const packages = new Set<string>();

  for (const step of steps) {
    if (step.kind === "item") {
      graph.items.get(step.name)?.dependencies.forEach((dependency) => packages.add(dependency));
    }
  }

  return [...packages].toSorted();
}

export function getInstallStepId(step: RegistryFlowInstallStep): string {
  return step.kind === "item" ? step.name : step.dependency.id;
}
