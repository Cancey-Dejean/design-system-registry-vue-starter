import { onScopeDispose, toValue, watch, type MaybeRefOrGetter } from "vue";

const locks = new WeakMap<HTMLElement, { count: number; existed: boolean }>();

/** Preserve existing locks and keep scrolling locked until every owner releases it. */
export function useBodyOverflow(isOpen: MaybeRefOrGetter<boolean>) {
  let release: (() => void) | undefined;
  const stop = watch(
    () => toValue(isOpen),
    (open) => {
      release?.();
      release = undefined;
      if (!open || typeof document === "undefined") return;
      const body = document.body;
      let lock = locks.get(body);
      if (!lock) {
        lock = { count: 0, existed: body.classList.contains("overflow-hidden") };
        locks.set(body, lock);
      }
      lock.count++;
      body.classList.add("overflow-hidden");
      release = () => {
        if (--lock.count === 0) {
          if (!lock.existed) body.classList.remove("overflow-hidden");
          locks.delete(body);
        }
      };
    },
    { immediate: true, flush: "sync" },
  );
  onScopeDispose(() => {
    stop();
    release?.();
    release = undefined;
  });
}
