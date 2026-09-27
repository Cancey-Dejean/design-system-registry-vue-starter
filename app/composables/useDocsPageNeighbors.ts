import { flattenSitePagerPages, getSitePagerNeighbors } from "~/lib/navigation";

export function useDocsPageNeighbors() {
  const route = useRoute();
  const { data: sections } = useSiteNavigation();

  return computed(() =>
    getSitePagerNeighbors(flattenSitePagerPages(sections.value ?? []), route.path),
  );
}
