<script setup lang="ts">
import { ChevronsUpDownIcon } from "@lucide/vue";
import { Button } from "../Button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from ".";
</script>

<template>
  <Collapsible class="w-full max-w-sm">
    <div class="flex items-center justify-between gap-4 px-1">
      <span class="text-sm font-semibold">@peduarte starred 3 repositories</span>
      <CollapsibleTrigger as-child>
        <Button variant="ghost" size="icon-sm">
          <ChevronsUpDownIcon />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <div class="border-border mt-2 rounded-md border px-4 py-2 font-mono text-sm">
      @radix-ui/primitives
    </div>
    <CollapsibleContent class="mt-2 flex flex-col gap-2">
      <div class="border-border rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/colors
      </div>
      <div class="border-border rounded-md border px-4 py-2 font-mono text-sm">
        @stitches/react
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
