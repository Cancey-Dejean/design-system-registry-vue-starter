---
name: stepper
type: registry:ui
title: Stepper
description: A set of steps that are used to indicate progress through a multi-step process.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: Stepper.vue
    type: registry:ui
    target: components/ui/stepper/Stepper.vue
  - path: StepperDescription.vue
    type: registry:ui
    target: components/ui/stepper/StepperDescription.vue
  - path: StepperIndicator.vue
    type: registry:ui
    target: components/ui/stepper/StepperIndicator.vue
  - path: StepperItem.vue
    type: registry:ui
    target: components/ui/stepper/StepperItem.vue
  - path: StepperSeparator.vue
    type: registry:ui
    target: components/ui/stepper/StepperSeparator.vue
  - path: StepperTitle.vue
    type: registry:ui
    target: components/ui/stepper/StepperTitle.vue
  - path: StepperTrigger.vue
    type: registry:ui
    target: components/ui/stepper/StepperTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/stepper/index.ts
---

Use stepper to walk users through a sequence of steps, such as a checkout or onboarding flow.
Each `StepperItem` represents one step and tracks its own active/completed state via reka-ui.

```vue
<script setup lang="ts">
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

const steps = [
  { step: 1, title: "Address", description: "Add your address" },
  { step: 2, title: "Shipping", description: "Set shipping details" },
  { step: 3, title: "Confirm", description: "Review your order" },
];
</script>

<template>
  <Stepper default-value="1">
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      :step="item.step"
      class="relative flex-1"
    >
      <StepperTrigger>
        <StepperIndicator>{{ item.step }}</StepperIndicator>
        <div class="flex flex-col">
          <StepperTitle>{{ item.title }}</StepperTitle>
          <StepperDescription>{{ item.description }}</StepperDescription>
        </div>
      </StepperTrigger>
      <StepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="absolute top-4 left-[calc(50%+1.25rem)] h-0.5 w-[calc(100%-2.5rem)]"
      />
    </StepperItem>
  </Stepper>
</template>
```
