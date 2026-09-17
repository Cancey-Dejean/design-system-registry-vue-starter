import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Button } from "../../Button";
import { Popover, PopoverContent, PopoverTrigger } from "../";

const popoverParts = {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
};

const meta = {
  title: "Components/Popover",
  tags: ["autodocs"],
  component: Popover,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Button trigger with rich content in a portal. */
export const Default: Story = {
  render: () => ({
    components: popoverParts,
    template: `
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Dimensions</h4>
              <p class="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div class="grid gap-2 text-sm">
              <div class="grid grid-cols-3 items-center gap-4">
                <span>Width</span>
                <span class="col-span-2 text-muted-foreground">100%</span>
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <span>Max. width</span>
                <span class="col-span-2 text-muted-foreground">300px</span>
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <span>Height</span>
                <span class="col-span-2 text-muted-foreground">25px</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    `,
  }),
};
