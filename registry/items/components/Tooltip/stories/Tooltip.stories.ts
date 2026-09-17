import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Plus } from "@lucide/vue";
import { Button } from "@registry/components/Button";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../";

const tooltipParts = {
  Button,
  Plus,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple><story /></StorybookWrapperSimple>`,
    }),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** An icon-only button needs a tooltip to label its action. */
export const Default: Story = {
  render: () => ({
    components: tooltipParts,
    template: /* html */ `
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="icon-md">
              <Plus />
              <span class="sr-only">Add to library</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Add to library
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    `,
  }),
};

/** Any trigger works, not just icon buttons. */
export const WithText: Story = {
  render: () => ({
    components: tooltipParts,
    template: /* html */ `
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            The Vue Framework – created and maintained by Evan You.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    `,
  }),
};

/** \`side\` controls which edge of the trigger the content opens from. */
export const Sides: Story = {
  render: () => ({
    components: tooltipParts,
    template: /* html */ `
      <TooltipProvider>
        <div class="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">Opens above</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">Opens to the right</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Opens below</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline">Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">Opens to the left</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    `,
  }),
};
