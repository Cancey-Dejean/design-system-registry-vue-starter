<script setup lang="ts">
import { AspectRatio } from "./";
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <AspectRatio :ratio="16 / 9" class="overflow-hidden rounded-lg border bg-muted">
      <div class="flex size-full items-center justify-center text-sm text-muted-foreground">
        16 : 9
      </div>
    </AspectRatio>
    <div class="grid w-full grid-cols-2 gap-4">
      <AspectRatio :ratio="1" class="overflow-hidden rounded-lg border bg-muted">
        <div class="flex size-full items-center justify-center text-sm text-muted-foreground">
          1 : 1
        </div>
      </AspectRatio>
      <AspectRatio :ratio="3 / 4" class="overflow-hidden rounded-lg border bg-muted">
        <div class="flex size-full items-center justify-center text-sm text-muted-foreground">
          3 : 4
        </div>
      </AspectRatio>
    </div>
  </div>
</template>
