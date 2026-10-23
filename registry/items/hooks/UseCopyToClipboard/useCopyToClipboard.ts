import { computed, getCurrentScope, onScopeDispose, readonly, shallowRef } from "vue";

export type CopyState =
  | { status: "idle"; value: null; error: null }
  | { status: "copied"; value: string; error: null }
  | { status: "error"; value: null; error: Error };

export function useCopyToClipboard() {
  const state = shallowRef<CopyState>({ status: "idle", value: null, error: null });
  let revision = 0;
  function reset() {
    revision++;
    state.value = { status: "idle", value: null, error: null };
  }
  async function copy(value: string): Promise<boolean> {
    const current = ++revision;
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        throw new Error("Clipboard is unavailable. Use a secure browser context.");
      }
      await navigator.clipboard.writeText(value);
      if (revision === current) state.value = { status: "copied", value, error: null };
      return true;
    } catch (cause) {
      const error = cause instanceof Error ? cause : new Error("Copy failed.");
      if (revision === current) state.value = { status: "error", value: null, error };
      return false;
    }
  }
  if (getCurrentScope())
    onScopeDispose(() => {
      revision++;
    });
  return {
    state: readonly(state),
    status: computed(() => state.value.status),
    value: computed(() => state.value.value),
    error: computed(() => state.value.error),
    copy,
    reset,
  };
}
