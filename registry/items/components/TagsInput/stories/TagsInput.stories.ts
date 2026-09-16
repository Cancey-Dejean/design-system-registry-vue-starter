import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { ref } from "vue"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { Label } from "../../Label"
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from ".."

const tagsParts = {
  Label,
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
}

const meta = {
  title: "Components/Tags Input",
  tags: ["autodocs"],
  component: TagsInput,
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
} satisfies Meta<typeof TagsInput>

export default meta
type Story = StoryObj<typeof meta>

/** Fruit tags with add/remove. */
export const Default: Story = {
  render: () => ({
    components: tagsParts,
    setup() {
      const modelValue = ref(["Apple", "Banana"])
      return { modelValue }
    },
    template: `
      <TagsInput v-model="modelValue" class="w-full">
        <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>
        <TagsInputInput placeholder="Fruits..." />
      </TagsInput>
    `,
  }),
}

/** Empty field ready for tags. */
export const Empty: Story = {
  render: () => ({
    components: tagsParts,
    setup() {
      const modelValue = ref<string[]>([])
      return { modelValue }
    },
    template: `
      <TagsInput v-model="modelValue" class="w-full">
        <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>
        <TagsInputInput placeholder="Add a tag..." />
      </TagsInput>
    `,
  }),
}

/** Disabled tags input. */
export const Disabled: Story = {
  render: () => ({
    components: tagsParts,
    setup() {
      const modelValue = ref(["Apple", "Banana"])
      return { modelValue }
    },
    template: `
      <TagsInput v-model="modelValue" disabled class="w-full">
        <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>
        <TagsInputInput placeholder="Fruits..." />
      </TagsInput>
    `,
  }),
}

/** Labeled field with live tag list. */
export const WithLabel: Story = {
  render: () => ({
    components: tagsParts,
    setup() {
      const modelValue = ref(["design", "vue", "ui"])
      return { modelValue }
    },
    template: `
      <div class="grid w-full gap-2">
        <Label for="tags">Tags</Label>
        <TagsInput id="tags" v-model="modelValue" class="w-full">
          <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput placeholder="Add tag..." />
        </TagsInput>
        <p class="text-muted-foreground text-sm">
          {{ modelValue.length }} tag{{ modelValue.length === 1 ? "" : "s" }}:
          <span class="text-foreground font-medium">
            {{ modelValue.join(", ") || "none" }}
          </span>
        </p>
      </div>
    `,
  }),
}
