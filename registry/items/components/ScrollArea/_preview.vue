<script setup lang="ts">
import { Separator } from "../Separator";
import { ScrollArea } from ".";

const releases = [
  "v2.4.0 — Added dark mode to the Chart component",
  "v2.3.2 — Fixed focus ring on disabled inputs",
  "v2.3.1 — Improved Sidebar collapse animation",
  "v2.3.0 — Introduced the Shimmer component",
  "v2.2.1 — Patched Select scroll button hit area",
  "v2.2.0 — Added RangeCalendar with two-month view",
  "v2.1.0 — Reworked Resizable panel persistence",
  "v2.0.0 — Migrated primitives to reka-ui",
];
</script>

<template>
  <ScrollArea class="h-64 w-full max-w-sm rounded-md border">
    <div class="p-4">
      <h4 class="mb-3 text-sm leading-none font-medium">Changelog</h4>
      <template v-for="release in releases" :key="release">
        <div class="text-sm">{{ release }}</div>
        <Separator class="my-2" />
      </template>
    </div>
  </ScrollArea>
</template>
