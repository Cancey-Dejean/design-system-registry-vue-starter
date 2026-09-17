<script setup lang="ts">
import { Label } from "../Label";
import { RadioGroup, RadioGroupItem } from ".";
</script>

<template>
  <RadioGroup default-value="email" class="max-w-sm">
    <div class="flex items-center gap-2">
      <RadioGroupItem id="notify-email" value="email" />
      <Label for="notify-email">Email</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="notify-sms" value="sms" />
      <Label for="notify-sms">Text message</Label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="notify-none" value="none" />
      <Label for="notify-none">Never</Label>
    </div>
  </RadioGroup>
</template>
