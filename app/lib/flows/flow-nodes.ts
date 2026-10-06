import {
  BoxIcon,
  BracesIcon,
  ComponentIcon,
  FileCodeIcon,
  LayersIcon,
  PaletteIcon,
  ZapIcon,
} from "@lucide/vue";
import type { Node } from "@vue-flow/core";
import type { Component, CSSProperties } from "vue";

import type { RegistryFlowApi } from "~/lib/registry/flow-data";
import type { RegistryItemType } from "~/lib/registry/item-types";

export const flowColors = {
  up: "oklch(0.62 0.17 252)",
  down: "oklch(0.72 0.16 65)",
  neutral: "var(--muted-foreground)",
  faint: "var(--border)",
} as const;

const registryTypeIcons: Partial<Record<RegistryItemType, Component>> = {
  "registry:ui": ComponentIcon,
  "registry:component": ComponentIcon,
  "registry:block": LayersIcon,
  "registry:hook": ZapIcon,
  "registry:lib": BracesIcon,
  "registry:file": FileCodeIcon,
  "registry:page": FileCodeIcon,
  "registry:style": PaletteIcon,
  "registry:theme": PaletteIcon,
};

export function getRegistryTypeIcon(type: RegistryItemType): Component {
  return registryTypeIcons[type] ?? BoxIcon;
}

export function getRegistryTypeLabel(type: RegistryItemType): string {
  return type.replace("registry:", "");
}

export function splitFilePath(path: string): { directory: string; base: string } {
  const index = path.lastIndexOf("/");

  return index === -1
    ? { directory: "", base: path }
    : { directory: path.slice(0, index + 1), base: path.slice(index + 1) };
}

type NoNodeEvents = Record<string, never>;

export const hiddenHandleStyle: CSSProperties = { opacity: 0, pointerEvents: "none" };

export type FlowTone = "default" | "focus" | "up" | "down" | "dim" | "package" | "remote" | "empty";

export const flowToneClassNames: Record<FlowTone, string> = {
  default: "border-border bg-card",
  focus: "border-primary bg-primary text-primary-foreground shadow-lg",
  up: "border-blue-500/45 bg-blue-500/10",
  down: "border-amber-500/50 bg-amber-500/10",
  dim: "border-border bg-card opacity-30",
  package: "border-border bg-muted font-mono text-xs shadow-none",
  remote: "border-dashed border-border bg-muted font-mono text-xs shadow-none",
  empty:
    "justify-center border-dashed border-border bg-transparent text-muted-foreground shadow-none",
};

export const FLOW_ITEM_WIDTH = 220;
export const FLOW_ITEM_HEIGHT = 38;

export type FlowItemNodeData = {
  label: string;
  icon?: Component;
  meta?: string;
  tone: FlowTone;
  target?: string;
  title?: string;
};

export type FlowItemNode = Node<FlowItemNodeData, NoNodeEvents, "item">;

export type FlowLabelNodeData = { label: string; width?: number };

export type FlowLabelNode = Node<FlowLabelNodeData, NoNodeEvents, "label">;

export type FlowFocusNodeData = {
  title: string;
  type: RegistryItemType;
  files: readonly string[];
};

export type FlowFocusNode = Node<FlowFocusNodeData, NoNodeEvents, "focus">;

export const FLOW_FOCUS_WIDTH = 240;

export type FlowChainNodeData = {
  label: string;
  icon: Component;
  kind: string;
  step?: number;
  lines: readonly string[];
  linesArePaths?: boolean;
  variant: "item" | "root" | "remote" | "sink";
  target?: string;
  apiSummary?: string;
};

export function getApiSummary(api: RegistryFlowApi): string | undefined {
  const parts = api.variants.map((variant) => `${variant.name} ${variant.options.length}`);

  if (api.props.length > 0) {
    parts.push(`${api.props.length} ${api.props.length === 1 ? "prop" : "props"}`);
  }

  return parts.length > 0 ? parts.join(" · ") : undefined;
}

export type FlowChainNode = Node<FlowChainNodeData, NoNodeEvents, "chain">;

export const FLOW_CHAIN_WIDTH = 240;
export const FLOW_CHAIN_TITLE_CENTER = 40;

export function estimateChainNodeHeight(lineCount: number, hasApiSummary = false): number {
  return 62 + (lineCount > 0 ? 18 + lineCount * 18 : 0) + (hasApiSummary ? 27 : 0);
}

export type FlowPropNodeRow = { label: string; detail?: string; isDefault?: boolean };

export type FlowPropNodeData = {
  owner: string;
  label: string;
  rows: readonly FlowPropNodeRow[];
  expanded: boolean;
};

export type FlowPropNode = Node<FlowPropNodeData, NoNodeEvents, "prop">;

export const FLOW_PROP_WIDTH = 184;
export const FLOW_PROP_HEADER_HEIGHT = 34;
export const FLOW_PROP_ROW_HEIGHT = 22;

export function estimatePropNodeHeight(rowCount: number, expanded: boolean): number {
  return FLOW_PROP_HEADER_HEIGHT + (expanded ? rowCount * FLOW_PROP_ROW_HEIGHT + 10 : 0);
}
