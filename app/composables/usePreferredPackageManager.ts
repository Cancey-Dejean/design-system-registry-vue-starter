import { useStorage } from "@vueuse/core";
import { type PackageManager } from "~/lib/package-managers";

const DEFAULT_PACKAGE_MANAGER: PackageManager = "npm";

export function usePreferredPackageManager() {
  // useStorage syncs across tabs (listens to the "storage" event) and components on the same
  // page (shared ref) automatically — no need to hand-roll the custom-event broadcast source
  // uses for this.
  const stored = useStorage<PackageManager>("preferred-pm", DEFAULT_PACKAGE_MANAGER);

  // useStorage reads localStorage synchronously during setup(), so a returning visitor's saved
  // preference (e.g. "bun") already differs from the SSR-rendered default ("npm") by the time
  // the client hydrates — a hydration mismatch on every page that renders an install command.
  // Stay on the SSR-safe default until this component has mounted, then reveal the real value.
  const hydrated = ref(false);
  onMounted(() => {
    hydrated.value = true;
  });

  return computed<PackageManager>({
    get: () => (hydrated.value ? stored.value : DEFAULT_PACKAGE_MANAGER),
    set: (value) => {
      stored.value = value;
    },
  });
}
