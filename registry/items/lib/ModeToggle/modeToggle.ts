export type ThemeMode = "light" | "dark" | "auto";
export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark" || value === "auto";
}
export function nextThemeMode(mode: ThemeMode): ThemeMode {
  return mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
}
export function resolveThemeMode(mode: ThemeMode, prefersDark: boolean): "light" | "dark" {
  return mode === "auto" ? (prefersDark ? "dark" : "light") : mode;
}
