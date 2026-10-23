import { onMounted, onScopeDispose, readonly, ref } from "vue";

export const MOBILE_BREAKPOINT_QUERY = "(max-width: 63.999rem)";
export function useIsMobile(query = MOBILE_BREAKPOINT_QUERY) {
  const isMobile = ref(false);
  let media: MediaQueryList | undefined;
  const update = () => {
    isMobile.value = media?.matches ?? false;
  };
  onMounted(() => {
    media = window.matchMedia(query);
    update();
    media.addEventListener("change", update);
  });
  onScopeDispose(() => media?.removeEventListener("change", update));
  return readonly(isMobile);
}
export const useMobile = useIsMobile;
