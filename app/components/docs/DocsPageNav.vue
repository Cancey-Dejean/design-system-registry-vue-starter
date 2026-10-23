<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import { ButtonGroup } from "@registry/components/ButtonGroup/index.ts";

const neighbors = useDocsPageNeighbors();
</script>

<template>
  <ButtonGroup v-if="neighbors.previous || neighbors.next" aria-label="Page navigation">
    <Button v-if="neighbors.previous" variant="outline" size="icon-md" as-child>
      <NuxtLink
        :to="neighbors.previous.routePath"
        :aria-label="`Previous page: ${neighbors.previous.title}`"
      >
        <ChevronLeft />
      </NuxtLink>
    </Button>
    <Button v-else variant="outline" size="icon-md" disabled aria-label="Previous page">
      <ChevronLeft />
    </Button>
    <Button v-if="neighbors.next" variant="outline" size="icon-md" as-child>
      <NuxtLink :to="neighbors.next.routePath" :aria-label="`Next page: ${neighbors.next.title}`">
        <ChevronRight />
      </NuxtLink>
    </Button>
    <Button v-else variant="outline" size="icon-md" disabled aria-label="Next page">
      <ChevronRight />
    </Button>
  </ButtonGroup>
</template>
