---
name: command
type: registry:ui
title: Command
description: Command menu for search and quick actions.
dependencies:
  - "@vueuse/core"
  - reka-ui
  - "@lucide/vue"
localRegistryDependencies:
  - dialog
  - input-group
files:
  - path: Command.vue
    type: registry:ui
    target: components/ui/command/Command.vue
  - path: CommandDialog.vue
    type: registry:ui
    target: components/ui/command/CommandDialog.vue
  - path: CommandEmpty.vue
    type: registry:ui
    target: components/ui/command/CommandEmpty.vue
  - path: CommandGroup.vue
    type: registry:ui
    target: components/ui/command/CommandGroup.vue
  - path: CommandInput.vue
    type: registry:ui
    target: components/ui/command/CommandInput.vue
  - path: CommandItem.vue
    type: registry:ui
    target: components/ui/command/CommandItem.vue
  - path: CommandList.vue
    type: registry:ui
    target: components/ui/command/CommandList.vue
  - path: CommandSeparator.vue
    type: registry:ui
    target: components/ui/command/CommandSeparator.vue
  - path: CommandShortcut.vue
    type: registry:ui
    target: components/ui/command/CommandShortcut.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/command/index.ts
---

Use command for searchable action menus and keyboard-driven palettes. Built on
[reka-ui's Listbox](https://reka-ui.com/docs/components/listbox) — unlike the source project,
which wraps the React-only `cmdk` package, this port has no separate command-palette dependency.

```vue
<script setup lang="ts">
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
</script>

<template>
  <Command class="max-w-sm rounded-lg border">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Calendar</CommandItem>
        <CommandItem>Search Emoji</CommandItem>
        <CommandItem>Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>
          Profile
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          Settings
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

Wrap with `CommandDialog` (composes `Dialog`) for a modal command palette — installing `command`
also installs `dialog`.
