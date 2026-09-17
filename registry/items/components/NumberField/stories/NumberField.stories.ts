import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Label } from "@registry/components/Label";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@registry/components/NumberField";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";

const numberFieldParts = {
  Label,
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
};

const meta = {
  title: "Components/Number Field",
  component: NumberField,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-xs px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Age field with label and steppers. */
export const Default: Story = {
  render: () => ({
    components: numberFieldParts,
    template: `
      <NumberField id="age" :default-value="18" :min="0" class="w-full">
        <Label for="age">Age</Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    `,
  }),
};

/** Disabled steppers and input. */
export const Disabled: Story = {
  render: () => ({
    components: numberFieldParts,
    template: `
      <NumberField id="age-disabled" :default-value="18" :min="0" disabled class="w-full">
        <Label for="age-disabled">Age</Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    `,
  }),
};

/** Decimal with signed display. */
export const Decimal: Story = {
  render: () => ({
    components: numberFieldParts,
    template: `
      <NumberField
        id="decimal"
        :default-value="5"
        :format-options="{
          signDisplay: 'exceptZero',
          minimumFractionDigits: 1,
        }"
        class="w-full"
      >
        <Label for="decimal">Number</Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    `,
  }),
};

/** Percent formatting via Intl options. */
export const Percentage: Story = {
  render: () => ({
    components: numberFieldParts,
    template: `
      <NumberField
        id="percent"
        :default-value="0.05"
        :step="0.01"
        :format-options="{
          style: 'percent',
        }"
        class="w-full"
      >
        <Label for="percent">Percent</Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    `,
  }),
};

/** Currency formatting with min/max bounds. */
export const Currency: Story = {
  render: () => ({
    components: numberFieldParts,
    template: `
      <NumberField
        id="currency"
        :default-value="1500"
        :min="0"
        :format-options="{
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'code',
          currencySign: 'accounting',
        }"
        class="w-full"
      >
        <Label for="currency">Balance</Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    `,
  }),
};
