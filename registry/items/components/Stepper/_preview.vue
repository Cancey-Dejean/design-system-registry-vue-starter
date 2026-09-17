<script setup lang="ts">
import { Check, CreditCard, MapPin, Truck } from "@lucide/vue";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from ".";

const steps = [
  { step: 1, title: "Address", description: "Add your address", icon: MapPin },
  { step: 2, title: "Shipping", description: "Choose a carrier", icon: Truck },
  { step: 3, title: "Payment", description: "Add payment details", icon: CreditCard },
];
</script>

<template>
  <Stepper :default-value="2" class="w-full max-w-md items-start">
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      v-slot="{ state }"
      :step="item.step"
      class="relative flex w-full flex-col items-center justify-center"
    >
      <StepperTrigger>
        <StepperIndicator>
          <Check v-if="state === 'completed'" class="size-4" />
          <component :is="item.icon" v-else class="size-4" />
        </StepperIndicator>
      </StepperTrigger>
      <StepperSeparator
        v-if="item.step !== steps.length"
        class="absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] block h-0.5 shrink-0 rounded-full"
      />
      <div class="mt-2 flex flex-col items-center text-center">
        <StepperTitle>{{ item.title }}</StepperTitle>
        <StepperDescription>{{ item.description }}</StepperDescription>
      </div>
    </StepperItem>
  </Stepper>
</template>
