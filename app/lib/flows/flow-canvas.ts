import type { FlowProps, Styles } from "@vue-flow/core";
import type { InjectionKey, Ref } from "vue";

import type { RegistryFlowGraph } from "~/lib/registry/flow-graph";

export type FlowViewProps = {
  graph: RegistryFlowGraph;
  selected: string;
};

export const flowSidebarScrollClassName =
  "scroll-fade overscroll-contain [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent";

export const flowToolbarClassName =
  "flex flex-wrap items-center justify-between gap-2 border-b bg-card px-4 py-2.5";

export const flowToolbarLabelClassName =
  "font-mono text-[11px] tracking-wider text-muted-foreground uppercase";

export const flowSegmentedClassName = "inline-flex flex-wrap gap-0.5 rounded-lg border p-0.5";

export const flowSegmentClassName =
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-muted aria-pressed:font-medium aria-pressed:text-foreground";

export const flowCanvasDefaults = {
  nodesDraggable: false,
  nodesConnectable: false,
  elementsSelectable: false,
  minZoom: 0.3,
  maxZoom: 1.6,
} satisfies Partial<FlowProps>;

export function getFlowEdgeStyle(stroke: string, extra: Styles = {}): Styles {
  return { stroke, strokeWidth: 1.5, ...extra };
}

// Hover state lives outside node data so hovering keeps the nodes array
// stable. New node objects make Vue Flow re-measure and repaint every node.
export const flowChainHotKey: InjectionKey<Readonly<Ref<string | null>>> = Symbol("flow-chain-hot");

export const flowPropToggleKey: InjectionKey<(id: string) => void> = Symbol("flow-prop-toggle");
