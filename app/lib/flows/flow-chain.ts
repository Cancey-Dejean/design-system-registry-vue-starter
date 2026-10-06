import { GlobeIcon, PackageIcon, TerminalIcon } from "@lucide/vue";
import type { Edge } from "@vue-flow/core";

import { registryConfig } from "~/lib/registry/config";
import {
  getDependents,
  getFlowLayers,
  getInstallStepId,
  getLocalDependencies,
  type RegistryFlowGraph,
  type RegistryFlowInstallStep,
} from "~/lib/registry/flow-graph";

import { getFlowEdgeStyle } from "./flow-canvas";
import {
  FLOW_CHAIN_WIDTH,
  FLOW_PROP_WIDTH,
  estimateChainNodeHeight,
  estimatePropNodeHeight,
  flowColors,
  getApiSummary,
  getRegistryTypeIcon,
  getRegistryTypeLabel,
  type FlowChainNode,
  type FlowChainNodeData,
  type FlowPropNode,
  type FlowPropNodeData,
} from "./flow-nodes";

export type ChainMode = "installs" | "dependents";

export const CHAIN_ROOT_ID = "chain:root";
export const CHAIN_NPM_ID = "chain:npm";
const COLUMN_GAP = FLOW_CHAIN_WIDTH + 40;
const LAYER_GAP = 70;
const ROW_GAP = 24;
const MAX_ROW_NODES = 3;
const PROP_GAP = 88;
const PROP_STACK_GAP = 14;

export type ChainModel = {
  layers: Map<string, number>;
  specs: Map<string, FlowChainNodeData>;
  edges: Edge[];
};

function getItemSpec(
  graph: RegistryFlowGraph,
  name: string,
  overrides: Partial<FlowChainNodeData>,
): FlowChainNodeData {
  const item = graph.items.get(name);

  return {
    label: item?.title ?? name,
    icon: item ? getRegistryTypeIcon(item.type) : PackageIcon,
    kind: `registry:${item ? getRegistryTypeLabel(item.type) : "item"}`,
    lines: [],
    variant: "item",
    target: name,
    apiSummary: item ? getApiSummary(item.api) : undefined,
    ...overrides,
  };
}

export function buildInstallChain(
  graph: RegistryFlowGraph,
  name: string,
  steps: readonly RegistryFlowInstallStep[],
  packages: readonly string[],
): ChainModel {
  const stepNumbers = new Map(steps.map((step, index) => [getInstallStepId(step), index + 1]));
  const layers = new Map<string, number>([[CHAIN_ROOT_ID, 0]]);
  const specs = new Map<string, FlowChainNodeData>();
  const edges: Edge[] = [{ id: `${CHAIN_ROOT_ID}->${name}`, source: CHAIN_ROOT_ID, target: name }];

  const itemLayers = getFlowLayers(graph, name, "up");

  for (const [itemName, layer] of itemLayers) {
    layers.set(itemName, layer + 1);
  }

  for (const [itemName, itemLayer] of itemLayers) {
    const layer = itemLayer + 1;
    const item = graph.items.get(itemName);

    specs.set(
      itemName,
      getItemSpec(graph, itemName, {
        kind: `registry:${item ? getRegistryTypeLabel(item.type) : "item"} · ${itemName === name ? "requested" : "dependency"}`,
        lines: item?.files ?? [],
        linesArePaths: true,
        step: stepNumbers.get(itemName),
      }),
    );

    for (const dependency of getLocalDependencies(graph, itemName)) {
      edges.push({ id: `${itemName}->${dependency}`, source: itemName, target: dependency });
    }

    for (const dependency of item?.remoteDependencies ?? []) {
      layers.set(dependency.id, Math.max(layers.get(dependency.id) ?? 0, layer + 1));
      specs.set(dependency.id, {
        label: dependency.name,
        icon: GlobeIcon,
        kind: `remote · ${dependency.source}`,
        lines: [],
        variant: "remote",
        step: stepNumbers.get(dependency.id),
      });
      edges.push({ id: `${itemName}->${dependency.id}`, source: itemName, target: dependency.id });
    }
  }

  specs.set(CHAIN_ROOT_ID, {
    label: `shadcn-vue add ${registryConfig.namespace}/${name}`,
    icon: TerminalIcon,
    kind: "you run",
    lines: [],
    variant: "root",
  });

  if (packages.length > 0) {
    const lastLayer = Math.max(...layers.values());

    for (const [id, layer] of layers) {
      if (layer === lastLayer) {
        edges.push({
          id: `${id}->${CHAIN_NPM_ID}`,
          source: id,
          target: CHAIN_NPM_ID,
          style: getFlowEdgeStyle(flowColors.neutral, { strokeDasharray: "4 4", opacity: 0.6 }),
        });
      }
    }

    layers.set(CHAIN_NPM_ID, lastLayer + 1);
    specs.set(CHAIN_NPM_ID, {
      label: `npm install · ${packages.length}`,
      icon: PackageIcon,
      kind: "then",
      lines: packages,
      variant: "sink",
    });
  }

  return { layers, specs, edges };
}

export function buildDependentsChain(graph: RegistryFlowGraph, name: string): ChainModel {
  const layers = getFlowLayers(graph, name, "down");
  const specs = new Map<string, FlowChainNodeData>();
  const edges: Edge[] = [];

  for (const [itemName, layer] of layers) {
    specs.set(
      itemName,
      getItemSpec(graph, itemName, {
        kind: itemName === name ? "you change" : `affected · depth ${layer}`,
        variant: itemName === name ? "root" : "item",
        target: itemName === name ? undefined : itemName,
      }),
    );

    for (const dependent of getDependents(graph, itemName)) {
      if (layers.has(dependent)) {
        edges.push({
          id: `${itemName}->${dependent}`,
          source: itemName,
          target: dependent,
          style: getFlowEdgeStyle(flowColors.down),
        });
      }
    }
  }

  return { layers, specs, edges };
}

export type ChainPropSpec = Omit<FlowPropNodeData, "expanded"> & { id: string };

export function getPropSpecs(
  graph: RegistryFlowGraph,
  ids: Iterable<string>,
): Map<string, ChainPropSpec[]> {
  const propSpecs = new Map<string, ChainPropSpec[]>();

  for (const owner of ids) {
    const api = graph.items.get(owner)?.api;

    if (!api) {
      continue;
    }

    const specs: ChainPropSpec[] = api.variants.map((variant) => ({
      id: `prop:${owner}:${variant.name}`,
      owner,
      label: variant.name,
      rows: variant.options.map((option) => ({
        label: option,
        isDefault: option === variant.defaultValue,
      })),
    }));

    if (api.props.length > 0) {
      specs.push({
        id: `prop:${owner}:*`,
        owner,
        label: "props",
        rows: api.props.map((prop) => ({
          label: `${prop.name}${prop.optional ? "?" : ""}`,
          detail: prop.defaultValue === undefined ? prop.type : `= ${prop.defaultValue}`,
        })),
      });
    }

    if (specs.length > 0) {
      propSpecs.set(owner, specs);
    }
  }

  return propSpecs;
}

export function layoutChain(
  { layers, specs, edges }: ChainModel,
  propSpecs: ReadonlyMap<string, readonly ChainPropSpec[]> | undefined,
  expandedProps: ReadonlySet<string>,
) {
  const byLayer: string[][] = [];

  for (const [id, layer] of layers) {
    byLayer[layer] = [...(byLayer[layer] ?? []), id];
  }

  const columnGap = propSpecs ? COLUMN_GAP + PROP_GAP + FLOW_PROP_WIDTH : COLUMN_GAP;
  const nodes: (FlowChainNode | FlowPropNode)[] = [];
  const propEdges: Edge[] = [];
  // Turning each edge inside the gap above its target row keeps horizontal
  // runs clear of prop stacks, which make rows taller than their chain nodes.
  const turnY = new Map<string, number>();
  let y = 0;
  let gapAbove = 0;

  for (const ids of byLayer) {
    const sorted = (ids ?? []).toSorted();

    for (let start = 0; start < sorted.length; start += MAX_ROW_NODES) {
      const row = sorted.slice(start, start + MAX_ROW_NODES);
      let rowHeight = 0;

      row.forEach((id, index) => {
        const spec = specs.get(id);

        if (!spec) {
          return;
        }

        if (gapAbove > 0) {
          turnY.set(id, y - gapAbove / 2);
        }

        const x = (index - (row.length - 1) / 2) * columnGap;
        const ownProps = propSpecs?.get(id) ?? [];
        let propY = y;

        rowHeight = Math.max(
          rowHeight,
          estimateChainNodeHeight(spec.lines.length, !propSpecs && Boolean(spec.apiSummary)),
        );
        nodes.push({
          id,
          type: "chain",
          position: { x, y },
          data: propSpecs ? { ...spec, apiSummary: undefined } : spec,
        });

        for (const { id: propId, ...propData } of ownProps) {
          const expanded = expandedProps.has(propId);

          nodes.push({
            id: propId,
            type: "prop",
            position: { x: x + FLOW_CHAIN_WIDTH + PROP_GAP, y: propY },
            data: { ...propData, expanded },
          });
          propEdges.push({
            id: `${id}->${propId}`,
            source: id,
            sourceHandle: "props",
            target: propId,
            type: "default",
            style: getFlowEdgeStyle(flowColors.neutral, { opacity: 0.45 }),
          });
          propY += estimatePropNodeHeight(propData.rows.length, expanded) + PROP_STACK_GAP;
        }

        rowHeight = Math.max(rowHeight, propY - y - PROP_STACK_GAP);
      });

      gapAbove = start + MAX_ROW_NODES < sorted.length ? ROW_GAP : LAYER_GAP;
      y += rowHeight + gapAbove;
    }
  }

  return {
    nodes,
    edges: [
      ...edges.map(
        (edge): Edge => ({
          style: getFlowEdgeStyle(flowColors.neutral),
          ...edge,
          type: "chain",
          data: { turnY: turnY.get(edge.target) },
        }),
      ),
      ...propEdges,
    ],
  };
}
