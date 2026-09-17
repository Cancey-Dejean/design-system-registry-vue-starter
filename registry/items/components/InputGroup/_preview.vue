<script setup lang="ts">
import { SendHorizontalIcon } from "@lucide/vue";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from ".";
</script>

<template>
  <InputGroup class="w-full max-w-xs">
    <InputGroupInput placeholder="example.com" class="!pl-1" />
    <InputGroupAddon>
      <InputGroupText>https://</InputGroupText>
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <InputGroupButton size="icon-sm">
        <SendHorizontalIcon />
        <span class="sr-only">Submit</span>
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
