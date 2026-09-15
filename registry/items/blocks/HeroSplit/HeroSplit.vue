<script setup lang="ts">
import { cn } from "@/lib/utils";
import { heroSplitVariants, themeClasses, type HeroSplitProps } from "./";
import { computed } from "vue";

const props = withDefaults(defineProps<HeroSplitProps>(), {
  theme: "indigo",
  logoAlt: "Your Company",
  codeTabs: () => [{ name: "NotificationSetting.jsx", active: true }, { name: "App.jsx" }],
});

defineSlots<{
  "code-panel"(): unknown;
}>();

const t = computed(() => themeClasses[props.theme ?? "indigo"]);
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <div :class="cn(heroSplitVariants({ theme }), 'bg-linear-to-b', t.sectionBg)">
      <div
        class="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40"
      >
        <!-- Left column -->
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-2xl">
            <div class="max-w-lg">
              <!-- Logo -->
              <template v-if="logoSrc">
                <img
                  :src="logoSrc"
                  :alt="logoAlt"
                  class="h-11"
                  :class="logoDarkSrc ? 'dark:hidden' : ''"
                />
                <img
                  v-if="logoDarkSrc"
                  :src="logoDarkSrc"
                  :alt="logoAlt"
                  class="h-11 not-dark:hidden"
                />
              </template>

              <!-- Badge / announcement -->
              <div v-if="badge || announcement" class="mt-24 sm:mt-32 lg:mt-16">
                <a :href="badgeHref ?? '#'" class="inline-flex space-x-6">
                  <span
                    v-if="badge"
                    :class="
                      cn(
                        'rounded-full px-3 py-1 text-sm/6 font-semibold ring-1 ring-inset',
                        t.badgeBg,
                        t.badgeText,
                        t.badgeRing,
                        t.badgeBgDark,
                        t.badgeTextDark,
                        t.badgeRingDark,
                      )
                    "
                  >
                    {{ badge }}
                  </span>
                  <span
                    v-if="announcement"
                    class="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600 dark:text-gray-300"
                  >
                    <span>{{ announcement }}</span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="size-5 text-gray-400 dark:text-gray-500"
                    >
                      <path
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
              </div>

              <!-- Title -->
              <h1
                class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white"
              >
                {{ title }}
              </h1>

              <!-- Description -->
              <p
                v-if="description"
                class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400"
              >
                {{ description }}
              </p>

              <!-- CTAs -->
              <div v-if="primaryCta || secondaryCta" class="mt-10 flex items-center gap-x-6">
                <a
                  v-if="primaryCta"
                  :href="primaryCta.href"
                  :class="
                    cn(
                      'rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2',
                      t.ctaBtn,
                      t.ctaBtnHover,
                      t.ctaBtnFocus,
                      t.ctaBtnDark,
                      t.ctaBtnHoverDark,
                      t.ctaBtnFocusDark,
                    )
                  "
                >
                  {{ primaryCta.label }}
                </a>
                <a
                  v-if="secondaryCta"
                  :href="secondaryCta.href"
                  class="text-sm/6 font-semibold text-gray-900 dark:text-white"
                >
                  {{ secondaryCta.label }}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column: code panel -->
        <div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div
            aria-hidden="true"
            :class="
              cn(
                'absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl ring-1 md:-mr-20 lg:-mr-36 dark:bg-gray-800/30',
                t.skewBg,
              )
            "
          />
          <div class="shadow-lg md:rounded-3xl">
            <div
              :class="
                cn('[clip-path:inset(0)] md:[clip-path:inset(0_round_var(--radius-3xl))]', t.panel)
              "
            >
              <div
                aria-hidden="true"
                :class="
                  cn(
                    'absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] opacity-20 inset-ring inset-ring-white md:ml-20 lg:ml-36',
                    t.panelAccent,
                  )
                "
              />
              <div class="relative px-6 pt-8 sm:pt-16 md:pr-0 md:pl-16">
                <div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <div class="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                    <!-- Tab bar -->
                    <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <template v-for="tab in codeTabs" :key="tab.name">
                          <div
                            :class="
                              cn(
                                'px-4 py-2',
                                tab.active
                                  ? 'border-r border-b border-r-white/10 border-b-white/20 bg-white/5 text-white'
                                  : 'border-r border-gray-600/10',
                              )
                            "
                          >
                            {{ tab.name }}
                          </div>
                        </template>
                      </div>
                    </div>
                    <!-- Code content slot -->
                    <div class="px-6 pt-6 pb-14">
                      <slot name="code-panel" />
                    </div>
                  </div>
                </div>
                <div
                  aria-hidden="true"
                  class="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset md:rounded-3xl dark:ring-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32 dark:from-gray-900"
      />
    </div>
  </div>
</template>
