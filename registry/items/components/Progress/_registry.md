---
name: progress
type: registry:ui
title: Progress
description: Displays an indicator showing the completion progress of a task.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: Progress.vue
    type: registry:ui
    target: components/ui/progress/Progress.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/progress/index.ts
---

Use progress to show determinate completion of a task, such as a file upload or multi-step form.

```vue
<script setup lang="ts">
import { Progress } from "@/components/ui/progress";
</script>

<template>
  <Progress :model-value="66" />
</template>
```

`modelValue` accepts a number between 0 and 100 and defaults to 0. Built on
[reka-ui's Progress](https://reka-ui.com/docs/components/progress).
