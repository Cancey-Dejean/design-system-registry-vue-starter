<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from ".";
</script>

<template>
  <ResizablePanelGroup direction="horizontal" class="h-64 w-full max-w-md rounded-lg border">
    <ResizablePanel :default-size="30" :min-size="20">
      <div class="flex h-full flex-col gap-1 p-4">
        <span class="text-sm font-semibold">Explorer</span>
        <span class="text-muted-foreground text-sm">index.ts</span>
        <span class="text-muted-foreground text-sm">utils.ts</span>
      </div>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="70">
      <div class="flex h-full items-center justify-center p-4">
        <span class="text-muted-foreground text-sm">Select a file to preview</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
