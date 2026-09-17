<script setup lang="ts">
import { Label } from "../Label";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from ".";
</script>

<template>
  <NumberField id="quantity" :default-value="1" :min="1" :max="10" class="w-full max-w-40">
    <Label for="quantity">Quantity</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
