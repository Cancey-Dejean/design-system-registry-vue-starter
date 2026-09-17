<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from ".";
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem> New Tab <MenubarShortcut>⌘T</MenubarShortcut> </MenubarItem>
        <MenubarItem> New Window <MenubarShortcut>⌘N</MenubarShortcut> </MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Share</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Email link</MenubarItem>
            <MenubarItem>Copy link</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem> Print... <MenubarShortcut>⌘P</MenubarShortcut> </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem> Undo <MenubarShortcut>⌘Z</MenubarShortcut> </MenubarItem>
        <MenubarItem> Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut> </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Cut</MenubarItem>
        <MenubarItem>Copy</MenubarItem>
        <MenubarItem>Paste</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
