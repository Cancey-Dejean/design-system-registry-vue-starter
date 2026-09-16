import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { Bold, Italic, Underline } from "@lucide/vue"
import { ref } from "vue"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { ToggleGroup, ToggleGroupItem } from ".."

const parts = {
  ToggleGroup,
  ToggleGroupItem,
  Bold,
  Italic,
  Underline,
}

const meta = {
  title: "Components/Toggle Group",
  tags: ["autodocs"],
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    type: "multiple",
    variant: "default",
    size: "default",
    disabled: false,
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Multiple formatting toggles. */
export const Default: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => ({
    components: parts,
    setup: () => ({ args }),
    template: `
      <ToggleGroup v-bind="args">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline class="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

/** Outline connected items. */
export const Outline: Story = {
  args: {
    type: "multiple",
    variant: "outline",
  },
  render: (args) => ({
    components: parts,
    setup: () => ({ args }),
    template: `
      <ToggleGroup v-bind="args">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline class="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

/** Single selection only. */
export const Single: Story = {
  args: {
    type: "single",
    variant: "outline",
  },
  render: (args) => ({
    components: parts,
    setup: () => ({ args }),
    template: `
      <ToggleGroup v-bind="args">
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

/** Small and large size comparison. */
export const Sizes: Story = {
  render: () => ({
    components: parts,
    template: `
      <div class="flex flex-col items-center gap-4">
        <ToggleGroup type="multiple" size="sm" variant="outline">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline class="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline class="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="multiple" size="lg" variant="outline">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline class="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    `,
  }),
}

/** Disabled group. */
export const Disabled: Story = {
  args: {
    type: "multiple",
    disabled: true,
    defaultValue: ["bold"],
  },
  render: (args) => ({
    components: parts,
    setup: () => ({ args }),
    template: `
      <ToggleGroup v-bind="args">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline class="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

/** Controlled multiple selection with v-model. */
export const Controlled: Story = {
  render: () => ({
    components: parts,
    setup() {
      const formats = ref(["bold"])
      return { formats }
    },
    template: `
      <div class="flex flex-col items-center gap-3">
        <ToggleGroup v-model="formats" type="multiple" variant="outline">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline class="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <p class="text-muted-foreground text-sm">
          Active:
          <span class="text-foreground font-medium">
            {{ formats.join(", ") || "none" }}
          </span>
        </p>
      </div>
    `,
  }),
}
