<script setup lang="ts">
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

const visible = ref(false);
const progress = ref(0);

let isNavigating = false;
let hasShown = false;
let showTimer: ReturnType<typeof setTimeout> | undefined;
let trickleTimer: ReturnType<typeof setInterval> | undefined;
let finishTimer: ReturnType<typeof setTimeout> | undefined;
let resetTimer: ReturnType<typeof setTimeout> | undefined;
let safetyTimer: ReturnType<typeof setTimeout> | undefined;

function clearTimers() {
  clearTimeout(showTimer);
  clearInterval(trickleTimer);
  clearTimeout(finishTimer);
  clearTimeout(resetTimer);
  clearTimeout(safetyTimer);
}

function start() {
  if (isNavigating) return;

  isNavigating = true;
  hasShown = false;
  clearTimers();

  showTimer = setTimeout(() => {
    hasShown = true;
    visible.value = true;
    progress.value = 8;

    trickleTimer = setInterval(() => {
      if (!isNavigating) return;
      progress.value = clamp(progress.value + Math.max(0.5, (90 - progress.value) * 0.08), 0, 90);
    }, 200);
  }, 120);

  safetyTimer = setTimeout(() => {
    isNavigating = false;
    hasShown = false;
    clearTimers();
    visible.value = false;
    progress.value = 0;
  }, 12_000);
}

function done() {
  if (!isNavigating) return;

  isNavigating = false;
  clearTimers();

  if (!hasShown) {
    hasShown = false;
    visible.value = false;
    progress.value = 0;
    return;
  }

  hasShown = false;
  visible.value = true;
  progress.value = 100;

  finishTimer = setTimeout(() => {
    visible.value = false;
    resetTimer = setTimeout(() => {
      progress.value = 0;
    }, 200);
  }, 200);
}

const router = useRouter();
const removeBeforeEach = router.beforeEach((to, from) => {
  if (to.path !== from.path) start();
});
const removeAfterEach = router.afterEach(() => done());
router.onError(() => done());

onUnmounted(() => {
  removeBeforeEach();
  removeAfterEach();
  clearTimers();
});
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none fixed inset-x-0 top-0 z-[10000] h-0.5 transition-opacity duration-200 ease-out motion-reduce:transition-none"
    :style="{ opacity: visible ? 1 : 0 }"
  >
    <div
      class="h-full origin-left bg-primary shadow-[0_0_8px_var(--primary)] transition-transform duration-150 ease-out motion-reduce:transition-none"
      :style="{ transform: `scaleX(${clamp(progress, 0, 100) / 100})` }"
    />
  </div>
</template>
