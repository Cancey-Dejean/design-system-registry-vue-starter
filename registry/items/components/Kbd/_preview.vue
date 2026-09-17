<script setup lang="ts">
import { SearchIcon } from "@lucide/vue";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../InputGroup";
import { Kbd, KbdGroup } from ".";
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-6">
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </InputGroupAddon>
    </InputGroup>
    <p class="text-muted-foreground text-sm">
      Press
      <Kbd>Ctrl</Kbd>
      +
      <Kbd>B</Kbd>
      to toggle the sidebar.
    </p>
  </div>
</template>
