import type { ComputedRef, InjectionKey } from "vue";

export type TraceStatus = "running" | "error" | "pending";
export const traceStatusKey: InjectionKey<ComputedRef<TraceStatus | undefined>> =
  Symbol("TraceStatus");
