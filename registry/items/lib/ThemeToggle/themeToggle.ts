export const themes = ["theme-primary", "theme-secondary", "theme-tertiary"] as const;
export type BrandTheme = (typeof themes)[number];
export const THEME_STORAGE_KEY = "data-theme";
export const themeLabels: Record<BrandTheme, string> = {
  "theme-primary": "Primary",
  "theme-secondary": "Secondary",
  "theme-tertiary": "Tertiary",
};
export function isBrandTheme(value: unknown): value is BrandTheme {
  return themes.includes(value as BrandTheme);
}
