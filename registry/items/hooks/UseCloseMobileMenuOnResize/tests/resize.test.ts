import { afterEach, expect, test, vi } from "vite-plus/test";
import { useCloseMobileMenuOnResize } from "../useCloseMobileMenuOnResize";
import { mountComposable } from "../../UseMobile/tests/mount";

afterEach(() => vi.unstubAllGlobals());

test("each resize closes the menu and unmount releases its listener", () => {
  const window = new EventTarget();
  vi.stubGlobal("window", window);
  const close = vi.fn();
  const remove = vi.spyOn(window, "removeEventListener");
  const mounted = mountComposable(() => useCloseMobileMenuOnResize(close));
  expect(close).not.toHaveBeenCalled();
  window.dispatchEvent(new Event("resize"));
  window.dispatchEvent(new Event("resize"));
  expect(close).toHaveBeenCalledTimes(2);
  mounted.unmount();
  expect(remove).toHaveBeenCalledWith("resize", close);
  window.dispatchEvent(new Event("resize"));
  expect(close).toHaveBeenCalledTimes(2);
});

test("unmounting one consumer leaves another resize listener active", () => {
  const window = new EventTarget();
  vi.stubGlobal("window", window);
  const firstClose = vi.fn();
  const secondClose = vi.fn();
  const first = mountComposable(() => useCloseMobileMenuOnResize(firstClose));
  const second = mountComposable(() => useCloseMobileMenuOnResize(secondClose));
  try {
    first.unmount();
    window.dispatchEvent(new Event("resize"));
    expect(firstClose).not.toHaveBeenCalled();
    expect(secondClose).toHaveBeenCalledOnce();
  } finally {
    second.unmount();
  }
});
