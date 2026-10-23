import { effectScope, ref } from "vue";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { useBodyOverflow } from "./useBodyOverflow";
afterEach(() => vi.unstubAllGlobals());
function body(initial: string[] = []) {
  const classes = new Set(initial);
  vi.stubGlobal("document", {
    body: {
      classList: {
        contains: (v: string) => classes.has(v),
        add: (v: string) => classes.add(v),
        remove: (v: string) => classes.delete(v),
      },
    },
  });
  return classes;
}
test("overlapping owners retain the lock until the last owner releases it", () => {
  const classes = body();
  const first = effectScope();
  const second = effectScope();
  const open = ref(true);
  first.run(() => useBodyOverflow(open));
  second.run(() => useBodyOverflow(true));
  open.value = false;
  expect(classes.has("overflow-hidden")).toBe(true);
  second.stop();
  expect(classes.has("overflow-hidden")).toBe(false);
  first.stop();
});
test("preserves a lock that existed before the composable", () => {
  const classes = body(["overflow-hidden"]);
  const scope = effectScope();
  scope.run(() => useBodyOverflow(true));
  scope.stop();
  expect(classes.has("overflow-hidden")).toBe(true);
});
