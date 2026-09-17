import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ChevronsUpDown } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
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
    disabled: { control: "boolean" },
  },
  args: {
    disabled: false,
  },
  render: (args) => ({
    components: { Collapsible, CollapsibleContent, CollapsibleTrigger, Button, ChevronsUpDown },
    setup: () => ({ args }),
    template: /* html */ `
      <Collapsible v-bind="args" class="w-full max-w-sm">
        <div class="flex items-center justify-between gap-4 px-1">
          <span class="text-sm font-semibold">@peduarte starred 3 repositories</span>
          <CollapsibleTrigger as-child>
            <Button variant="ghost" size="icon-sm">
              <ChevronsUpDown />
              <span class="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div class="rounded-md border border-border px-4 py-2 font-mono text-sm mt-2">
          @radix-ui/primitives
        </div>
        <CollapsibleContent class="flex flex-col gap-2 mt-2">
          <div class="rounded-md border border-border px-4 py-2 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div class="rounded-md border border-border px-4 py-2 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    `,
  }),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultOpen: false,
  },
};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultOpen: false,
    disabled: true,
  },
};
