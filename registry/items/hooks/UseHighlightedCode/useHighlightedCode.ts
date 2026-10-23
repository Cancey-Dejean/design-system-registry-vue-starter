import { shallowRef, toValue, watch, watchEffect, type MaybeRefOrGetter } from "vue";
import {
  createIncrementalHighlight,
  loadHighlighter,
  type HighlightedLine,
  type LoadedCodeHighlighter,
} from "@registry/components/CodeBlock/highlighter";

/** Reactive, race-safe and incremental syntax highlighting with plain-text fallback. */
export function useHighlightedCode(
  value: MaybeRefOrGetter<string>,
  language: MaybeRefOrGetter<string>,
) {
  const loaded = shallowRef<LoadedCodeHighlighter>(null);
  const lines = shallowRef<HighlightedLine[]>([]);
  const update = createIncrementalHighlight();
  watch(
    () => toValue(language),
    async (currentLanguage, _old, onCleanup) => {
      let cancelled = false;
      onCleanup(() => {
        cancelled = true;
      });
      loaded.value = null;
      try {
        const next = await loadHighlighter(currentLanguage);
        if (!cancelled) loaded.value = next;
      } catch {
        // Plain text remains available if a grammar cannot be loaded.
      }
    },
    { immediate: true },
  );
  watchEffect(() => {
    lines.value = update(toValue(value), loaded.value);
  });
  return lines;
}
