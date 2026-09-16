import { useStorage } from "@vueuse/core";

export const accentThemes = [
  { value: "default", label: "Default", swatch: "oklch(0.205 0 0)" },
  { value: "theme-secondary", label: "Amber", swatch: "oklch(0.72 0.19 50)" },
  { value: "theme-tertiary", label: "Violet", swatch: "oklch(0.55 0.24 295)" },
] as const;

export type AccentTheme = (typeof accentThemes)[number]["value"];

export function isAccentTheme(value: string | null | undefined): value is AccentTheme {
  return accentThemes.some((option) => option.value === value);
}

const DEFAULT_ACCENT_THEME: AccentTheme = "default";
export const ACCENT_THEME_STORAGE_KEY = "accent-theme";

function applyAccentTheme(value: AccentTheme) {
  if (value === DEFAULT_ACCENT_THEME) {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", value);
  }
}

export function useAccentTheme() {
  // useStorage syncs across tabs and same-page components automatically (see
  // usePreferredPackageManager.ts for the same pattern).
  const stored = useStorage<AccentTheme>(ACCENT_THEME_STORAGE_KEY, DEFAULT_ACCENT_THEME);

  // Keep the data-theme attribute on <html> in sync with the stored preference. The initial
  // value on first paint is set synchronously by the blocking script in app.vue (avoiding a
  // flash of the wrong accent) — this watcher only needs to handle later changes.
  watch(
    stored,
    (value) => {
      if (import.meta.client) {
        applyAccentTheme(value);
      }
    },
    { immediate: true },
  );

  // Same hydration hazard as usePreferredPackageManager: useStorage reads localStorage
  // synchronously during setup(), so a returning visitor's saved accent already differs from
  // the SSR-rendered default by the time the client hydrates — stay on the default until mounted.
  const hydrated = ref(false);
  onMounted(() => {
    hydrated.value = true;
  });

  return computed<AccentTheme>({
    get: () => (hydrated.value ? stored.value : DEFAULT_ACCENT_THEME),
    set: (value) => {
      stored.value = value;
    },
  });
}
