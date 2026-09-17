import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { InfoIcon, Mail, SendHorizontal } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@registry/components/Tooltip";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
  InputGroupInput,
} from "@registry/components/InputGroup";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple><story /></StorybookWrapperSimple>`,
    }),
  ],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A leading icon addon focuses the input when clicked. */
export const Default: Story = {
  render: () => ({
    components: {
      InputGroup,
      InputGroupAddon,
      InputGroupInput,
      InputGroupText,
      InputGroupButton,
      Tooltip,
      TooltipContent,
      TooltipProvider,
      TooltipTrigger,
      InfoIcon,
    },
    template: /* html */ `
    <InputGroup>
      <InputGroupInput placeholder="example.com" class="!pl-1" />
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <InputGroupButton class="rounded-full" size="icon-xs">
                <InfoIcon class="size-4" />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </InputGroupAddon>
    </InputGroup>
    `,
  }),
};

/** A trailing addon can hold an interactive control, not just an icon. */
export const WithTrailingButton: Story = {
  render: () => ({
    components: { InputGroup, InputGroupAddon, Button, SendHorizontal },
    template: /* html */ `
      <InputGroup class="w-full max-w-xs">
        <input data-slot="input-group-control" class="w-full text-sm outline-none" placeholder="Message..." />
        <InputGroupAddon align="inline-end">
          <Button variant="ghost" size="icon-sm">
            <SendHorizontal />
            <span class="sr-only">Send message</span>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    `,
  }),
};

/** A block-end addon adds helper copy below the control. */
export const WithHelperText: Story = {
  render: () => ({
    components: { InputGroup, InputGroupAddon, InputGroupText, Mail },
    template: /* html */ `
      <InputGroup class="w-full max-w-xs">
        <input data-slot="input-group-control" type="email" class="w-full text-sm outline-none" placeholder="Email" />
        <InputGroupAddon>
          <Mail class="size-4 opacity-50" />
        </InputGroupAddon>
        <InputGroupAddon align="block-end" class="border-t">
          <InputGroupText>We'll never share your email.</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    `,
  }),
};

/** Disabling the control disables the whole group via `:has()`. */
export const Disabled: Story = {
  render: () => ({
    components: { InputGroup, InputGroupAddon, Mail },
    template: /* html */ `
      <InputGroup class="w-full max-w-xs">
        <input data-slot="input-group-control" class="w-full text-sm outline-none" placeholder="Email" disabled />
        <InputGroupAddon>
          <Mail class="size-4 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    `,
  }),
};
