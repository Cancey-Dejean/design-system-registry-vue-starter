---
name: input-otp
type: registry:ui
title: Input OTP
description: Accessible one-time-password input with grouped, animated character slots.
dependencies:
  - reka-ui
  - "@vueuse/core"
  - "@lucide/vue"
  - vue-input-otp
files:
  - path: InputOTP.vue
    type: registry:ui
    target: components/ui/input-otp/InputOTP.vue
  - path: InputOTPGroup.vue
    type: registry:ui
    target: components/ui/input-otp/InputOTPGroup.vue
  - path: InputOTPSeparator.vue
    type: registry:ui
    target: components/ui/input-otp/InputOTPSeparator.vue
  - path: InputOTPSlot.vue
    type: registry:ui
    target: components/ui/input-otp/InputOTPSlot.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/input-otp/index.ts
---

Use for verification codes, PINs, and two-factor auth inputs where each character needs its own
focusable slot. Built on `vue-input-otp` for input handling and caret/selection logic, with slots
styled to match the design system.

```vue
<script setup lang="ts">
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
</script>

<template>
  <InputOTP :maxlength="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```
