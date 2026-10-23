<script setup lang="ts">
import { useId } from "vue";
import { ChevronRight } from "@lucide/vue";
import { Button } from "@registry/components/Button";
const patternId = useId();
</script>

<template>
  <section
    class="relative isolate overflow-hidden bg-background text-foreground"
    aria-label="Cloud product introduction"
  >
    <svg
      aria-hidden="true"
      class="absolute inset-0 -z-10 size-full stroke-border mask-[radial-gradient(100%_100%_at_top_right,white,transparent)]"
    >
      <defs>
        <pattern
          :id="patternId"
          x="50%"
          :y="-1"
          :width="200"
          :height="200"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg aria-hidden="true" x="50%" :y="-1" class="overflow-visible fill-muted/50">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          :stroke-width="0"
        />
      </svg>
      <rect :fill="`url(#${patternId})`" width="100%" height="100%" :stroke-width="0" />
    </svg>
    <div
      aria-hidden="true"
      class="absolute top-10 left-[calc(50%-4rem)] -z-10 blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
    >
      <div
        class="aspect-1108/632 w-277 bg-linear-to-r from-primary/20 to-secondary/20"
        style="
          clip-path: polygon(
            73.6% 51.7%,
            91.7% 11.8%,
            100% 46.4%,
            97.4% 82.2%,
            92.5% 84.9%,
            75.7% 64%,
            55.3% 47.5%,
            46.5% 49.4%,
            45% 62.9%,
            50.3% 87.2%,
            21.3% 64.1%,
            0.1% 100%,
            5.4% 51.1%,
            21.4% 63.9%,
            58.9% 0.2%,
            73.6% 51.7%
          );
        "
      />
    </div>
    <div class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
      <div class="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&amp;shade=600"
          class="h-11"
        />
        <div class="mt-8 lg:mt-10">
          <a href="/#" class="inline-flex items-center gap-6"
            ><span
              class="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-primary/20"
              >What's new</span
            ><span class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >Just shipped v1.0<ChevronRight class="size-5" /></span
          ></a>
        </div>
        <h1 class="mt-4 max-w-xl font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
          Deploy to the cloud with confidence
        </h1>
        <p class="mt-3 max-w-xl text-pretty text-lg text-muted-foreground">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
          Elit sunt amet fugiat veniam occaecat.
        </p>
        <div class="mt-6 flex flex-wrap items-center gap-2">
          <Button as="a" href="/#">Get started</Button
          ><Button variant="outline" as="a" href="/#">Learn more</Button>
        </div>
      </div>
      <div
        class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32"
      >
        <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <img
            alt="App screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
            :width="2432"
            :height="1442"
            class="w-304 rounded-md bg-muted shadow-xl ring-1 ring-border dark:hidden"
          /><img
            alt="App screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            :width="2432"
            :height="1442"
            class="hidden w-304 rounded-md bg-muted shadow-xl ring-1 ring-border dark:block"
          />
        </div>
      </div>
    </div>
  </section>
</template>
