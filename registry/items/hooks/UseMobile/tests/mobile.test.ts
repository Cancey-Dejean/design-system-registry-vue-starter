import { afterEach, expect, test, vi } from "vite-plus/test";
import { MOBILE_BREAKPOINT_QUERY, useIsMobile, useMobile } from "../useMobile";
import { mountComposable } from "./mount";

afterEach(() => vi.unstubAllGlobals());

function createMedia(matches: boolean) {
  const media = Object.assign(new EventTarget(), { matches });
  const add = vi.spyOn(media, "addEventListener");
  const remove = vi.spyOn(media, "removeEventListener");
  const matchMedia = vi.fn(() => media);
  vi.stubGlobal("window", { matchMedia });
  return { media, add, remove, matchMedia };
}

test("mount reads the current media query and reacts to breakpoint changes", () => {
  const { media, matchMedia } = createMedia(true);
  const { result, unmount } = mountComposable(() => useIsMobile());
  try {
    expect(matchMedia).toHaveBeenCalledWith(MOBILE_BREAKPOINT_QUERY);
    expect(result.value).toBe(true);
    media.matches = false;
    media.dispatchEvent(new Event("change"));
    expect(result.value).toBe(false);
    media.matches = true;
    media.dispatchEvent(new Event("change"));
    expect(result.value).toBe(true);
  } finally {
    unmount();
  }
});

test("unmount removes the same listener and prevents later updates", () => {
  const { media, add, remove } = createMedia(false);
  const { result, unmount } = mountComposable(() => useMobile());
  const listener = add.mock.calls[0]?.[1];
  unmount();
  expect(remove).toHaveBeenCalledWith("change", listener);
  media.matches = true;
  media.dispatchEvent(new Event("change"));
  expect(result.value).toBe(false);
});

test("each mounted consumer owns its listener and custom query", () => {
  const { media, matchMedia } = createMedia(false);
  const first = mountComposable(() => useIsMobile("(max-width: 48rem)"));
  const second = mountComposable(() => useMobile());
  try {
    expect(matchMedia).toHaveBeenCalledWith("(max-width: 48rem)");
    expect(matchMedia).toHaveBeenCalledWith(MOBILE_BREAKPOINT_QUERY);
    first.unmount();
    media.matches = true;
    media.dispatchEvent(new Event("change"));
    expect(first.result.value).toBe(false);
    expect(second.result.value).toBe(true);
  } finally {
    second.unmount();
  }
});
