<script setup lang="ts">
import { Button } from "../Button";
import { Input } from "../Input";
import { Popover, PopoverContent, PopoverTrigger } from ".";
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Share</Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-1">
          <h4 class="leading-none font-medium">Share this dashboard</h4>
          <p class="text-muted-foreground text-sm">Anyone with the link can view it.</p>
        </div>
        <div class="flex items-center gap-2">
          <Input
            readonly
            default-value="https://app.example.com/d/sales-overview"
            class="text-xs"
          />
          <Button size="sm">Copy</Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
