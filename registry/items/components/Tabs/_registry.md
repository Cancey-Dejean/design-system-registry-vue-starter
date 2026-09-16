---
name: tabs
type: registry:ui
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
dependencies:
  - reka-ui
  - class-variance-authority
files:
  - path: Tabs.vue
    type: registry:ui
    target: components/ui/tabs/Tabs.vue
  - path: TabsContent.vue
    type: registry:ui
    target: components/ui/tabs/TabsContent.vue
  - path: TabsList.vue
    type: registry:ui
    target: components/ui/tabs/TabsList.vue
  - path: TabsTrigger.vue
    type: registry:ui
    target: components/ui/tabs/TabsTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/tabs/index.ts
---

Use for switching between related views. Matches tab value to panel value.

```vue
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">Make changes to your account here.</TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
  </Tabs>
</template>
```

Set `TabsList` `variant` to `line` for an underline style. Pass `orientation="vertical"` on `Tabs`
for a vertical list. Built on reka-ui's Tabs primitive.
