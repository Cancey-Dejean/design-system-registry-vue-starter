---
name: switch
type: registry:ui
title: Switch
description: A control that allows the user to toggle between on and off states.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: Switch.vue
    type: registry:ui
    target: components/ui/switch/Switch.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/switch/index.ts
---

Use switch for binary settings that take effect immediately, unlike a checkbox which is typically
used inside a form that's submitted.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Switch } from "@/components/ui/switch";

const airplaneMode = ref(false);
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch id="airplane-mode" v-model="airplaneMode" />
    <label for="airplane-mode">Airplane Mode</label>
  </div>
</template>
```

Supports controlled/uncontrolled state via `v-model` (or `defaultChecked`) and `disabled`. Built on
reka-ui's Switch primitive.
