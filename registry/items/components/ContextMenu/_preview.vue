<script setup lang="ts">
import { CopyIcon, DownloadIcon, PencilIcon, TrashIcon } from "@lucide/vue";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from ".";
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="flex h-32 w-full max-w-sm items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground"
    >
      Right click this card
    </ContextMenuTrigger>
    <ContextMenuContent class="w-48">
      <ContextMenuItem>
        <PencilIcon />
        Rename
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        <CopyIcon />
        Duplicate
      </ContextMenuItem>
      <ContextMenuItem>
        <DownloadIcon />
        Download
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="destructive">
        <TrashIcon />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
