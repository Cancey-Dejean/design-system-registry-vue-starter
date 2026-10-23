import { effectScope } from "vue";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { useCopyToClipboard } from "./useCopyToClipboard";
afterEach(() => vi.unstubAllGlobals());
test("reports the copied value and can reset", async () => {
  vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  const scope = effectScope();
  const copy = scope.run(() => useCopyToClipboard())!;
  expect(await copy.copy("hello")).toBe(true);
  expect(copy.state.value).toEqual({ status: "copied", value: "hello", error: null });
  copy.reset();
  expect(copy.status.value).toBe("idle");
  scope.stop();
});
test("clipboard failure is reactive and does not throw", async () => {
  const failure = new Error("Permission denied");
  vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(failure) } });
  const scope = effectScope();
  const copy = scope.run(() => useCopyToClipboard())!;
  expect(await copy.copy("hello")).toBe(false);
  expect(copy.error.value).toBe(failure);
  scope.stop();
});
test("reset invalidates an in-flight copy", async () => {
  let finish!: () => void;
  vi.stubGlobal("navigator", {
    clipboard: {
      writeText: () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    },
  });
  const scope = effectScope();
  const copy = scope.run(() => useCopyToClipboard())!;
  const pending = copy.copy("old");
  copy.reset();
  finish();
  await pending;
  expect(copy.status.value).toBe("idle");
  scope.stop();
});
