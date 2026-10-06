import { GlobeIcon, PackageIcon } from "@lucide/vue";
import type { Edge } from "@vue-flow/core";

import {
  getDependents,
  getLocalDependencies,
  type RegistryFlowGraph,
} from "~/lib/registry/flow-graph";

import { getFlowEdgeStyle } from "./flow-canvas";
import {
  FLOW_FOCUS_WIDTH,
  flowColors,
  getRegistryTypeIcon,
  type FlowFocusNode,
  type FlowItemNode,
  type FlowItemNodeData,
  type FlowLabelNode,
} from "./flow-nodes";

export type LanesDirection = "up" | "both" | "down";
export type LanesNode = FlowItemNode | FlowLabelNode | FlowFocusNode;

const ROW_HEIGHT = 50;
const COLUMN_X = { up: 0, focus: 270, down: 270 + FLOW_FOCUS_WIDTH + 60 } as const;

type LaneEntry = {
  id: string;
  node: FlowItemNodeData;
  dashed: boolean;
};

function getUpstreamEntries(graph: RegistryFlowGraph, name: string): LaneEntry[] {
  const item = graph.items.get(name);

  if (!item) {
    return [];
  }

  return [
    ...getLocalDependencies(graph, name).map((dependency): LaneEntry => {
      const dependencyItem = graph.items.get(dependency);
      const count = getLocalDependencies(graph, dependency).length;

      return {
        id: dependency,
        dashed: false,
        node: {
          label: dependencyItem?.title ?? dependency,
          icon: dependencyItem ? getRegistryTypeIcon(dependencyItem.type) : undefined,
          meta: `${count} ${count === 1 ? "dep" : "deps"}`,
          tone: "default",
          target: dependency,
          title: `Trace ${dependencyItem?.title ?? dependency}`,
        },
      };
    }),
    ...item.remoteDependencies.map(
      (dependency): LaneEntry => ({
        id: dependency.id,
        dashed: true,
        node: {
          label: dependency.name,
          icon: GlobeIcon,
          meta: dependency.source,
          tone: "remote",
          title: `${dependency.source}/${dependency.name}`,
        },
      }),
    ),
    ...item.dependencies.map(
      (dependency): LaneEntry => ({
        id: `npm:${dependency}`,
        dashed: true,
        node: {
          label: dependency,
          icon: PackageIcon,
          meta: "npm",
          tone: "package",
          title: dependency,
        },
      }),
    ),
  ];
}

function getDownstreamEntries(graph: RegistryFlowGraph, name: string): LaneEntry[] {
  return getDependents(graph, name).map((dependent) => {
    const dependentItem = graph.items.get(dependent);
    const count = getDependents(graph, dependent).length;

    return {
      id: dependent,
      dashed: false,
      node: {
        label: dependentItem?.title ?? dependent,
        icon: dependentItem ? getRegistryTypeIcon(dependentItem.type) : undefined,
        meta: `${count} ${count === 1 ? "use" : "uses"}`,
        tone: "default",
        target: dependent,
        title: `Trace ${dependentItem?.title ?? dependent}`,
      },
    };
  });
}

export function buildLanes(graph: RegistryFlowGraph, name: string, direction: LanesDirection) {
  const item = graph.items.get(name);
  const showUp = direction !== "down";
  const showDown = direction !== "up";
  const upEntries = showUp ? getUpstreamEntries(graph, name) : [];
  const downEntries = showDown ? getDownstreamEntries(graph, name) : [];
  const focusHeight = 52 + (item?.files.length ?? 0) * 19;
  const rows = Math.max(
    upEntries.length,
    downEntries.length,
    Math.ceil(focusHeight / ROW_HEIGHT),
    1,
  );
  const totalHeight = rows * ROW_HEIGHT;
  const nodes: LanesNode[] = [];
  const edges: Edge[] = [];

  const placeColumn = (entries: LaneEntry[], side: "up" | "down") => {
    const x = COLUMN_X[side];

    if (entries.length === 0) {
      nodes.push({
        id: `empty-${side}`,
        type: "item",
        position: { x, y: totalHeight / 2 - 19 },
        data: {
          label: side === "up" ? "No dependencies" : "Not used by other items",
          tone: "empty",
        },
      });
      return;
    }

    const top = (totalHeight - entries.length * ROW_HEIGHT) / 2;
    const stroke = side === "up" ? flowColors.up : flowColors.down;

    entries.forEach((entry, index) => {
      nodes.push({
        id: entry.id,
        type: "item",
        position: { x, y: top + index * ROW_HEIGHT },
        data: entry.node,
      });
      edges.push({
        id: `${side}:${entry.id}`,
        source: side === "up" ? entry.id : name,
        target: side === "up" ? name : entry.id,
        style: getFlowEdgeStyle(
          stroke,
          entry.dashed ? { strokeDasharray: "4 4", opacity: 0.6 } : {},
        ),
      });
    });
  };

  if (showUp) {
    placeColumn(upEntries, "up");
    nodes.push({
      id: "label-up",
      type: "label",
      position: { x: COLUMN_X.up, y: -36 },
      data: { label: "Depends on" },
    });
  }

  if (showDown) {
    placeColumn(downEntries, "down");
    nodes.push({
      id: "label-down",
      type: "label",
      position: { x: COLUMN_X.down, y: -36 },
      data: { label: "Used by" },
    });
  }

  if (item) {
    nodes.push(
      {
        id: name,
        type: "focus",
        position: { x: COLUMN_X.focus, y: (totalHeight - focusHeight) / 2 },
        data: { title: item.title, type: item.type, files: item.files },
      },
      {
        id: "label-focus",
        type: "label",
        position: { x: COLUMN_X.focus, y: -36 },
        data: { label: "Component · installs to", width: FLOW_FOCUS_WIDTH },
      },
    );
  }

  return { nodes, edges, height: Math.max(280, totalHeight + 120) };
}
