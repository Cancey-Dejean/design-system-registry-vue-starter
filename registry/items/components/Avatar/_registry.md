---
name: avatar
type: registry:ui
title: Avatar
description: An image element with a fallback for representing a user or entity.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: Avatar.vue
    type: registry:ui
    target: components/ui/avatar/Avatar.vue
  - path: AvatarFallback.vue
    type: registry:ui
    target: components/ui/avatar/AvatarFallback.vue
  - path: AvatarImage.vue
    type: registry:ui
    target: components/ui/avatar/AvatarImage.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/avatar/index.ts
---

Use avatar to represent a user or entity, such as in a profile header, comment, or member list.
`AvatarFallback` renders automatically while the image loads or if it fails, so always provide
one — typically the user's initials.

```vue
<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
```

Built on [reka-ui's Avatar](https://reka-ui.com/docs/components/avatar).
