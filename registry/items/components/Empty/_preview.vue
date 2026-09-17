<script setup lang="ts">
import { FolderCodeIcon } from "@lucide/vue";
import { Button } from "../Button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from ".";
</script>

<template>
  <Empty class="border border-dashed">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderCodeIcon />
      </EmptyMedia>
      <EmptyTitle>No Projects Yet</EmptyTitle>
      <EmptyDescription>
        You haven't created any projects yet. Get started by creating your first project.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div class="flex gap-2">
        <Button>Create Project</Button>
        <Button variant="outline">Import Project</Button>
      </div>
    </EmptyContent>
  </Empty>
</template>
