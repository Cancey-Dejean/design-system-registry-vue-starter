import { useStorage } from "@vueuse/core";
import { type PackageManager } from "~/lib/package-managers";

export function usePreferredPackageManager() {
  // useStorage syncs across tabs (listens to the "storage" event) and components on the same
  // page (shared ref) automatically — no need to hand-roll the custom-event broadcast source
  // uses for this.
  return useStorage<PackageManager>("preferred-pm", "npm");
}
