<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import { ButtonGroup } from "@registry/components/ButtonGroup/index.ts";

const neighbors = useDocsPageNeighbors();
</script>

<template>
  <ButtonGroup v-if="neighbors.previous && neighbors.next" class="overflow-hidden rounded-full">
    <Button variant="primary" size="icon-md" as-child>
      <NuxtLink
        :to="neighbors.previous.routePath"
        :aria-label="`Previous page: ${neighbors.previous.title}`"
      >
        <ChevronLeft />
      </NuxtLink>
    </Button>
    <Button variant="primary" size="icon-md" as-child>
      <NuxtLink :to="neighbors.next.routePath" :aria-label="`Next page: ${neighbors.next.title}`">
        <ChevronRight />
      </NuxtLink>
    </Button>
  </ButtonGroup>
</template>
