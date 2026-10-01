<script setup lang="ts">
import type { TocLink } from "@nuxt/content";
import { useEventListener } from "@vueuse/core";
import { cn } from "@registry/lib/utils";

const props = defineProps<{
  links: readonly TocLink[];
}>();

const activeId = ref<string | null>(null);

function flatten(links: readonly TocLink[]): TocLink[] {
  return links.flatMap((link) => [link, ...(link.children ? flatten(link.children) : [])]);
}

const flatLinks = computed(() => flatten(props.links));

function linkClass(id: string): string {
  return cn(
    "block border-l-2 -ml-px py-1 pl-3 transition-colors",
    activeId.value === id
      ? "border-foreground font-medium text-foreground"
      : "border-transparent text-muted-foreground hover:text-foreground",
  );
}

// The activation line: a heading counts as "reached" once it scrolls above this many px
// from the top of the viewport (clears the sticky header). Picking "the last heading that's
// been scrolled past" by direct position, rather than an IntersectionObserver rootMargin
// zone, avoids that zone never being entered at all on short pages (content height close to
// viewport height) — which left activeId either frozen or unable to reach the last section.
const ACTIVATION_OFFSET = 96;

// Clicking a link sets activeId directly; on a short page the resulting anchor-jump can
// max out the scroll position without truly reaching that heading (there's nowhere left to
// scroll), so the very next scroll-driven update would immediately overrule the click with
// whatever heading the "scrolled to bottom" check below picks instead. Suppress scroll-driven
// updates for a moment after a click so the explicit choice sticks.
let suppressUntil = 0;

function onLinkClick(id: string) {
  activeId.value = id;
  suppressUntil = Date.now() + 600;
}

function updateActive() {
  if (Date.now() < suppressUntil) return;

  const headingEls = flatLinks.value
    .map((link) => ({ id: link.id, el: document.getElementById(link.id) }))
    .filter((entry): entry is { id: string; el: HTMLElement } => entry.el !== null);

  if (headingEls.length === 0) return;

  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

  if (scrolledToBottom) {
    activeId.value = headingEls[headingEls.length - 1]!.id;
    return;
  }

  let current = headingEls[0]!.id;
  for (const { id, el } of headingEls) {
    if (el.getBoundingClientRect().top > ACTIVATION_OFFSET) break;
    current = id;
  }
  activeId.value = current;
}

useEventListener(window, "scroll", updateActive, { passive: true });

onMounted(updateActive);
</script>

<template>
  <nav aria-label="On this page" class="flex flex-col gap-3 text-sm">
    <span class="font-medium text-foreground">On This Page</span>
    <ul class="flex flex-col">
      <li v-for="link in links" :key="link.id">
        <a :href="`#${link.id}`" :class="linkClass(link.id)" @click="onLinkClick(link.id)">{{
          link.text
        }}</a>
        <ul v-if="link.children?.length" class="ml-3">
          <li v-for="child in link.children" :key="child.id">
            <a :href="`#${child.id}`" :class="linkClass(child.id)" @click="onLinkClick(child.id)">{{
              child.text
            }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
