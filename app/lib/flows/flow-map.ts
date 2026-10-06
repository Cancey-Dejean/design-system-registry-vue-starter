import {
  getDependencyDepths,
  isConnected,
  type RegistryFlowGraph,
} from "~/lib/registry/flow-graph";

import type { FlowTone } from "./flow-nodes";

export const MAP_COLUMN_GAP = 320;
export const MAP_ROW_GAP = 60;
export const mapColumnNames = ["Foundations", "Composites", "Compositions", "Assemblies"];

export type FlowMapLayout = {
  connected: string[];
  columns: string[][];
  positions: Map<string, { x: number; y: number }>;
};

export function getMapLayout(graph: RegistryFlowGraph): FlowMapLayout {
  const depths = getDependencyDepths(graph);
  const connected = graph.names.filter((name) => isConnected(graph, name));
  const columns: string[][] = [];

  for (const name of connected) {
    const depth = depths.get(name) ?? 0;
    columns[depth] = [...(columns[depth] ?? []), name];
  }

  const sortedColumns = Array.from(columns, (column) =>
    (column ?? []).toSorted((a, b) => {
      const typeA = graph.items.get(a)?.type ?? "";
      const typeB = graph.items.get(b)?.type ?? "";

      return typeA.localeCompare(typeB) || a.localeCompare(b);
    }),
  );
  const tallest = Math.max(1, ...sortedColumns.map((column) => column.length));
  const positions = new Map<string, { x: number; y: number }>();

  sortedColumns.forEach((column, depth) => {
    const offset = ((tallest - column.length) * MAP_ROW_GAP) / 2;

    column.forEach((name, index) => {
      positions.set(name, { x: depth * MAP_COLUMN_GAP, y: offset + index * MAP_ROW_GAP });
    });
  });

  return { connected, columns: sortedColumns, positions };
}

export function getMapTone(
  name: string,
  active: string | null,
  up: ReadonlySet<string>,
  down: ReadonlySet<string>,
  query: string,
): FlowTone {
  if (name === active) {
    return "focus";
  }

  if (query && !name.includes(query)) {
    return "dim";
  }

  if (up.has(name)) {
    return "up";
  }

  if (down.has(name)) {
    return "down";
  }

  return active ? "dim" : "default";
}
