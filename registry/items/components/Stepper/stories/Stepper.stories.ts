import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { BookUser, Check, Circle, CreditCard, Dot, Truck } from "@lucide/vue"
import { ref } from "vue"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { Button } from "../../Button/"

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from ".."

const checkoutSteps = [
  {
    step: 1,
    title: "Address",
    description: "Add your address",
    icon: BookUser,
  },
  {
    step: 2,
    title: "Shipping",
    description: "Set your preferred",
    icon: Truck,
  },
  {
    step: 3,
    title: "Payment",
    description: "Add any payment",
    icon: CreditCard,
  },
  {
    step: 4,
    title: "Checkout",
    description: "Confirm your order",
  },
]

const onboardingSteps = [
  {
    step: 1,
    title: "Your details",
    description: "Provide your name and email",
  },
  {
    step: 2,
    title: "Company details",
    description: "A few details about your company",
  },
  {
    step: 3,
    title: "Invite your team",
    description: "Start collaborating with your team",
  },
]

const stepperParts = {
  BookUser,
  Button,
  Check,
  Circle,
  CreditCard,
  Dot,
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
  Truck,
}

const meta = {
  title: "Components/Stepper",
  tags: ["autodocs"],
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-3xl px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

/** Checkout flow with icons in indicators. */
export const Default: Story = {
  render: () => ({
    components: stepperParts,
    setup: () => ({ steps: checkoutSteps }),
    template: `
      <Stepper class="flex w-full items-start gap-2">
        <StepperItem
          v-for="item in steps"
          :key="item.step"
          :step="item.step"
          class="relative flex w-full flex-col items-center justify-center"
        >
          <StepperTrigger>
            <StepperIndicator v-slot="{ step }" class="bg-muted">
              <component :is="item.icon" v-if="item.icon" class="size-4" />
              <span v-else>{{ step }}</span>
            </StepperIndicator>
          </StepperTrigger>
          <StepperSeparator
            v-if="item.step !== steps[steps.length - 1]?.step"
            class="absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />
          <div class="flex flex-col items-center">
            <StepperTitle>{{ item.title }}</StepperTitle>
            <StepperDescription>{{ item.description }}</StepperDescription>
          </div>
        </StepperItem>
      </Stepper>
    `,
  }),
}

/** Horizontal steps with button triggers and progress nav. */
export const Horizontal: Story = {
  render: () => ({
    components: stepperParts,
    setup() {
      const stepIndex = ref(1)
      const steps = onboardingSteps
      return { stepIndex, steps }
    },
    template: `
      <div class="grid w-full gap-6">
        <Stepper v-model="stepIndex" class="flex w-full items-start gap-2">
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full flex-col items-center justify-center"
            :step="step.step"
          >
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1]?.step"
              class="absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />
            <StepperTrigger as-child>
              <Button
                :variant="state === 'completed' || state === 'active' ? 'primary' : 'outline'"
                size="icon-md"
                icon
                class="z-10 shrink-0 rounded-full"
                :class="[state === 'active' && 'ring-ring ring-offset-background ring-2 ring-offset-2']"
              >
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>
            <div class="mt-5 flex flex-col items-center text-center">
              <StepperTitle
                class="text-sm font-semibold transition lg:text-base"
                :class="[state === 'active' && 'text-primary']"
              >
                {{ step.title }}
              </StepperTitle>
              <StepperDescription
                class="text-muted-foreground text-xs transition lg:text-sm"
                :class="[state === 'active' && 'text-primary']"
              >
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperItem>
        </Stepper>
        <div class="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            :disabled="stepIndex <= 1"
            @click="stepIndex = Math.max(1, stepIndex - 1)"
          >
            Back
          </Button>
          <p class="text-muted-foreground text-sm">
            Step {{ stepIndex }} of {{ steps.length }}
          </p>
          <Button
            size="sm"
            :disabled="stepIndex >= steps.length"
            @click="stepIndex = Math.min(steps.length, stepIndex + 1)"
          >
            Next
          </Button>
        </div>
      </div>
    `,
  }),
}

/** Stacked vertical orientation. */
export const Vertical: Story = {
  render: () => ({
    components: stepperParts,
    setup() {
      const stepIndex = ref(1)
      const steps = onboardingSteps.map((step) => ({
        ...step,
        description:
          step.step === 1
            ? "Provide your name and email address."
            : step.step === 2
              ? "A few details about your company."
              : "Start collaborating with your team.",
      }))
      return { stepIndex, steps }
    },
    template: `
      <div class="grid w-full max-w-md gap-6">
        <Stepper
          v-model="stepIndex"
          orientation="vertical"
          class="flex w-full flex-col justify-start gap-10"
        >
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full items-start gap-6"
            :step="step.step"
          >
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1]?.step"
              class="absolute top-[38px] left-[18px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />
            <StepperTrigger as-child>
              <Button
                :variant="state === 'completed' || state === 'active' ? 'primary' : 'outline'"
                size="icon-md"
                icon
                class="z-10 shrink-0 rounded-full"
                :class="[state === 'active' && 'ring-ring ring-offset-background ring-2 ring-offset-2']"
              >
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>
            <div class="flex flex-col gap-1">
              <StepperTitle
                class="text-sm font-semibold transition lg:text-base"
                :class="[state === 'active' && 'text-primary']"
              >
                {{ step.title }}
              </StepperTitle>
              <StepperDescription
                class="text-muted-foreground text-xs transition lg:text-sm"
                :class="[state === 'active' && 'text-primary']"
              >
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperItem>
        </Stepper>
        <div class="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            :disabled="stepIndex <= 1"
            @click="stepIndex = Math.max(1, stepIndex - 1)"
          >
            Back
          </Button>
          <Button
            size="sm"
            :disabled="stepIndex >= steps.length"
            @click="stepIndex = Math.min(steps.length, stepIndex + 1)"
          >
            Next
          </Button>
        </div>
      </div>
    `,
  }),
}
