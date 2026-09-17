<script setup lang="ts">
import { Plus } from "@lucide/vue";
import { Button } from "../Button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from ".";
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" size="icon-md">
          <Plus />
          <span class="sr-only">Add to library</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
