---
name: logos
type: registry:ui
title: Logos
description: A typed logo component with size variants and a brand logo set.
dependencies:
  - "@lucide/vue"
  - "@vueuse/core"
  - class-variance-authority
files:
  - path: index.ts
    type: registry:ui
    target: "@ui/Logos/index.ts"
  - path: logos.ts
    type: registry:ui
    target: "@ui/Logos/logos.ts"
  - path: Logo/Logo.vue
    type: registry:ui
    target: "@ui/Logos/Logo/Logo.vue"
  - path: Logo/Logo.types.ts
    type: registry:ui
    target: "@ui/Logos/Logo/Logo.types.ts"
  - path: Logo/Logo.variants.ts
    type: registry:ui
    target: "@ui/Logos/Logo/Logo.variants.ts"
  - path: LogoGrid.vue
    type: registry:ui
    target: "@ui/Logos/LogoGrid.vue"
  - path: LogoGallery.vue
    type: registry:ui
    target: "@ui/Logos/LogoGallery.vue"
  - path: LogoSet/AlphaWave.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/AlphaWave.vue"
  - path: LogoSet/Apple.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/Apple.vue"
  - path: LogoSet/AppleStore.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/AppleStore.vue"
  - path: LogoSet/BrandLogo.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/BrandLogo.vue"
  - path: LogoSet/Facebook.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/Facebook.vue"
  - path: LogoSet/Google.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/Google.vue"
  - path: LogoSet/Instagram.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/Instagram.vue"
  - path: LogoSet/LeapYear.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/LeapYear.vue"
  - path: LogoSet/LogoText.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/LogoText.vue"
  - path: LogoSet/MainLogo.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/MainLogo.vue"
  - path: LogoSet/Nuxt.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/Nuxt.vue"
  - path: LogoSet/PlayStore.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/PlayStore.vue"
  - path: LogoSet/Storybook.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/Storybook.vue"
  - path: LogoSet/ThreePortals.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/ThreePortals.vue"
  - path: LogoSet/VoxelLabs.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/VoxelLabs.vue"
  - path: LogoSet/Vue.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/Vue.vue"
  - path: LogoSet/X.vue
    type: registry:ui
    target: "@ui/Logos/LogoSet/X.vue"
---

Use `Logo` with a typed `logo` key and optional `size`. Browse the set with `LogoGallery`, or import
individual SVGs from `LogoSet`.

```vue
<script setup lang="ts">
import { Logo } from "@ui/Logos";
</script>

<template>
  <Logo logo="three-portals" size="md" />
  <Logo logo="vue" size="lg" />
</template>
```
