import { expect, test } from "vite-plus/test";
import { isThemeMode, nextThemeMode, resolveThemeMode } from "./modeToggle";
import { isBrandTheme } from "../ThemeToggle/themeToggle";
test("cycles light, dark and system modes", () => {
  expect(nextThemeMode("light")).toBe("dark");
  expect(nextThemeMode("dark")).toBe("auto");
  expect(nextThemeMode("auto")).toBe("light");
});
test("system preference resolves only in auto mode", () => {
  expect(resolveThemeMode("auto", true)).toBe("dark");
  expect(resolveThemeMode("auto", false)).toBe("light");
  expect(resolveThemeMode("light", true)).toBe("light");
});
test("rejects unknown persisted mode and brand values", () => {
  expect(isThemeMode("system")).toBe(false);
  expect(isThemeMode("auto")).toBe(true);
  expect(isBrandTheme("theme-tertiary")).toBe(true);
  expect(isBrandTheme("invalid")).toBe(false);
});
