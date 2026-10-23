import { onMounted, onScopeDispose } from "vue";

/** Like the reference, every browser resize invokes the close callback. */
export function useCloseMobileMenuOnResize(onClose: () => void) {
  onMounted(() => window.addEventListener("resize", onClose));
  onScopeDispose(() => {
    if (typeof window !== "undefined") window.removeEventListener("resize", onClose);
  });
}
