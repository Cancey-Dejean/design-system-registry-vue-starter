import { useSessionStorage } from "@vueuse/core";

export const flowLayouts = ["map", "lanes", "chain"] as const;

export type FlowLayout = (typeof flowLayouts)[number];

export const defaultFlowLayout: FlowLayout = "lanes";

const FLOW_LAYOUT_STORAGE_KEY = "component-flows:layout";

function isFlowLayout(value: unknown): value is FlowLayout {
  return typeof value === "string" && flowLayouts.some((layout) => layout === value);
}

/** The chosen flows layout, persisted for the browser session (not across sessions). */
export function useFlowLayout() {
  const stored = useSessionStorage<string>(FLOW_LAYOUT_STORAGE_KEY, defaultFlowLayout);

  return computed<FlowLayout>({
    get: () => (isFlowLayout(stored.value) ? stored.value : defaultFlowLayout),
    set: (layout) => {
      stored.value = layout;
    },
  });
}
