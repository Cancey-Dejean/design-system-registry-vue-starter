<script setup lang="ts">
import { ChevronRightIcon } from "@lucide/vue";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemSeparator, ItemTitle } from ".";
</script>

<template>
  <ItemGroup class="w-full max-w-md rounded-md border">
    <Item>
      <ItemContent>
        <ItemTitle>Messages</ItemTitle>
        <ItemDescription>3 unread conversations</ItemDescription>
      </ItemContent>
    </Item>
    <ItemSeparator />
    <Item>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>5 new alerts</ItemDescription>
      </ItemContent>
    </Item>
    <ItemSeparator />
    <Item as-child>
      <a href="#">
        <ItemContent>
          <ItemTitle>Settings</ItemTitle>
          <ItemDescription>Account and privacy</ItemDescription>
        </ItemContent>
        <ChevronRightIcon class="size-4 text-muted-foreground" />
      </a>
    </Item>
  </ItemGroup>
</template>
