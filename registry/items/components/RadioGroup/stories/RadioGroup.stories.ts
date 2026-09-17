import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import Label from "../../Label/Label.vue";
import RadioGroup from "../RadioGroup.vue";
import RadioGroupItem from "../RadioGroupItem.vue";

const radioParts = {
  Label,
  RadioGroup,
  RadioGroupItem,
};

const meta = {
  title: "Components/Radio Group",
  tags: ["autodocs"],
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-sm px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Spacing options with a default selection. */
export const Default: Story = {
  render: () => ({
    components: radioParts,
    template: `
      <RadioGroup default-value="comfortable">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r1" value="default" />
          <Label for="r1">Default</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r2" value="comfortable" />
          <Label for="r2">Comfortable</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r3" value="compact" />
          <Label for="r3">Compact</Label>
        </div>
      </RadioGroup>
    `,
  }),
};

/** Controlled value bound with v-model. */
export const Controlled: Story = {
  render: () => ({
    components: radioParts,
    setup() {
      const plan = ref("pro");
      return { plan };
    },
    template: `
      <div class="grid gap-3">
        <RadioGroup v-model="plan">
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="plan-free" value="free" />
            <Label for="plan-free">Free</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="plan-pro" value="pro" />
            <Label for="plan-pro">Pro</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="plan-enterprise" value="enterprise" />
            <Label for="plan-enterprise">Enterprise</Label>
          </div>
        </RadioGroup>
        <p class="text-muted-foreground text-sm">
          Selected: <span class="text-foreground font-medium">{{ plan }}</span>
        </p>
      </div>
    `,
  }),
};

/** Disabled group that cannot change selection. */
export const Disabled: Story = {
  render: () => ({
    components: radioParts,
    template: `
      <RadioGroup default-value="comfortable" disabled>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="d1" value="default" />
          <Label for="d1">Default</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="d2" value="comfortable" />
          <Label for="d2">Comfortable</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="d3" value="compact" />
          <Label for="d3">Compact</Label>
        </div>
      </RadioGroup>
    `,
  }),
};

/** Card-style plan options with descriptions. */
export const Cards: Story = {
  render: () => ({
    components: radioParts,
    setup() {
      const plan = ref("starter");
      return { plan };
    },
    template: `
      <RadioGroup v-model="plan" class="grid gap-3">
        <Label
          for="card-starter"
          class="hover:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-[[data-state=checked]]:border-primary"
        >
          <RadioGroupItem id="card-starter" value="starter" class="mt-0.5" />
          <div class="grid gap-1.5 font-normal">
            <p class="text-sm leading-none font-medium">Starter</p>
            <p class="text-muted-foreground text-sm">
              For individuals getting started with a small project.
            </p>
          </div>
        </Label>
        <Label
          for="card-growth"
          class="hover:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-[[data-state=checked]]:border-primary"
        >
          <RadioGroupItem id="card-growth" value="growth" class="mt-0.5" />
          <div class="grid gap-1.5 font-normal">
            <p class="text-sm leading-none font-medium">Growth</p>
            <p class="text-muted-foreground text-sm">
              For teams that need collaboration and higher limits.
            </p>
          </div>
        </Label>
        <Label
          for="card-scale"
          class="hover:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-[[data-state=checked]]:border-primary"
        >
          <RadioGroupItem id="card-scale" value="scale" class="mt-0.5" />
          <div class="grid gap-1.5 font-normal">
            <p class="text-sm leading-none font-medium">Scale</p>
            <p class="text-muted-foreground text-sm">
              For organizations that need advanced controls and support.
            </p>
          </div>
        </Label>
      </RadioGroup>
    `,
  }),
};
