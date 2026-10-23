---
name: announcement-bar
type: registry:block
title: AnnouncementBar
description: A themed announcement strip with an optional carousel of messages.
categories:
  - announcement-bar
dependencies:
  - "@lucide/vue"
  - "embla-carousel-vue"
  - "class-variance-authority"
localRegistryDependencies:
  - button
files:
  - path: AnnouncementBar.variants.ts
    type: registry:block
    target: components/blocks/announcement-bar/AnnouncementBar.variants.ts
  - path: AnnouncementBar.vue
    type: registry:block
    target: components/blocks/announcement-bar/AnnouncementBar.vue
  - path: AnnouncementBarSlider.vue
    type: registry:block
    target: components/blocks/announcement-bar/AnnouncementBarSlider.vue
  - path: SlideContent.ts
    type: registry:block
    target: components/blocks/announcement-bar/SlideContent.ts
  - path: index.ts
    type: registry:block
    target: components/blocks/announcement-bar/index.ts
  - path: slides.ts
    type: registry:block
    target: components/blocks/announcement-bar/slides.ts
  - path: types.ts
    type: registry:block
    target: components/blocks/announcement-bar/types.ts
---

A themed announcement strip with an optional carousel of messages.

```vue
<script setup lang="ts">
import { AnnouncementBar } from "@/components/blocks/announcement-bar";
</script>

<template><AnnouncementBar>Your announcement</AnnouncementBar></template>
```
