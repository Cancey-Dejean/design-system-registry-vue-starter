<script setup lang="ts">
import { ref } from "vue";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from ".";

const value = ref("");
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <InputOTP v-model="value" :maxlength="6">
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
    <p class="text-sm text-muted-foreground">
      <template v-if="value === ''"> Enter the code we texted you. </template>
      <template v-else> You entered: {{ value }} </template>
    </p>
  </div>
</template>
