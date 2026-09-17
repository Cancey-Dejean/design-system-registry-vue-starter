---
name: alert
type: registry:ui
title: Alert
description: Displays a callout for user attention, with optional destructive styling.
dependencies:
  - class-variance-authority
files:
  - path: Alert.variants.ts
    type: registry:ui
    target: components/ui/alert/Alert.variants.ts
  - path: Alert.vue
    type: registry:ui
    target: components/ui/alert/Alert.vue
  - path: AlertDescription.vue
    type: registry:ui
    target: components/ui/alert/AlertDescription.vue
  - path: AlertTitle.vue
    type: registry:ui
    target: components/ui/alert/AlertTitle.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/alert/index.ts
---

Use alert to surface important, non-blocking information inline with the page content, such as
form validation summaries or status messages. Pass an icon as the first child to get the built-in
two-column layout, and use `variant="destructive"` for errors.

```vue
<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "@lucide/vue";
</script>

<template>
  <Alert variant="destructive">
    <AlertCircleIcon />
    <AlertTitle>Unable to process payment</AlertTitle>
    <AlertDescription>Please verify your billing information and try again.</AlertDescription>
  </Alert>
</template>
```
