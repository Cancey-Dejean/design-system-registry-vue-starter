<script setup lang="ts">
import { cn } from "cn";
import type { SectionProps } from "./Section.types";
import { sectionVariants } from "./Section.variants";

const props = withDefaults(defineProps<SectionProps>(), { padding: "md" });
</script>

<template>
  <section
    data-slot="section"
    :data-size="padding"
    :class="cn(sectionVariants({ padding }), props.class)"
  >
    <slot />
  </section>
</template>
