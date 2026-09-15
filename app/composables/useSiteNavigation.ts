import type { SiteNavigationSection } from "~/lib/navigation";

export function useSiteNavigation() {
  return useFetch<SiteNavigationSection[]>("/api/navigation", {
    key: "site-navigation",
    default: () => [],
  });
}
