import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "vue-input-otp";
import { ref } from "vue";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../";

const otpParts = {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
};

const meta = {
  title: "Components/Input OTP",
  tags: ["autodocs"],
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
  args: {
    maxlength: 6,
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Six-digit OTP with a separator between two groups. */
export const Default: Story = {
  render: () => ({
    components: otpParts,
    template: `
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
    `,
  }),
};

/** Digits and letters via pattern. */
export const Pattern: Story = {
  render: () => ({
    components: otpParts,
    setup: () => ({ REGEXP_ONLY_DIGITS_AND_CHARS }),
    template: `
      <InputOTP :maxlength="6" :pattern="REGEXP_ONLY_DIGITS_AND_CHARS">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
          <InputOTPSlot :index="4" />
          <InputOTPSlot :index="5" />
        </InputOTPGroup>
      </InputOTP>
    `,
  }),
};

/** Multiple group separators. */
export const Separator: Story = {
  render: () => ({
    components: otpParts,
    template: `
      <InputOTP :maxlength="6">
        <InputOTPGroup>
          <InputOTPSlot :index="0" />
          <InputOTPSlot :index="1" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot :index="2" />
          <InputOTPSlot :index="3" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot :index="4" />
          <InputOTPSlot :index="5" />
        </InputOTPGroup>
      </InputOTP>
    `,
  }),
};

/** Controlled value with live display. */
export const Controlled: Story = {
  render: () => ({
    components: otpParts,
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="space-y-2">
        <InputOTP v-model="value" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
        <div class="text-center text-sm">
          <template v-if="value === ''">
            Enter your one-time password.
          </template>
          <template v-else>
            You entered: {{ value }}
          </template>
        </div>
      </div>
    `,
  }),
};
