import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { SearchIcon } from "@lucide/vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Button } from "@registry/components/Button";
import { InputGroupAddon, InputGroup, InputGroupInput } from "@registry/components/InputGroup";
import { Kbd, KbdGroup } from "@registry/components/Kbd";

const kbdParts = {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Kbd,
  KbdGroup,
  SearchIcon,
};

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Modifier keys and a Ctrl+B chord. */
export const Default: Story = {
  render: () => ({
    components: kbdParts,
    template: `
      <div class="flex flex-col items-center gap-4">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⌃</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>B</Kbd>
        </KbdGroup>
      </div>
    `,
  }),
};

/** Inline groups inside helper copy. */
export const Group: Story = {
  render: () => ({
    components: kbdParts,
    template: `
      <p class="text-muted-foreground text-sm">
        Use
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>
        to open the command palette
      </p>
    `,
  }),
};

/** Keys embedded in outline buttons. */
export const WithButton: Story = {
  render: () => ({
    components: kbdParts,
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <Button variant="outline" size="sm" class="pr-2">
          Accept <Kbd>⏎</Kbd>
        </Button>
        <Button variant="outline" size="sm" class="pr-2">
          Cancel <Kbd>Esc</Kbd>
        </Button>
      </div>
    `,
  }),
};

/** Search field with keyboard shortcut addon. */
export const WithInputGroup: Story = {
  render: () => ({
    components: kbdParts,
    template: `
      <div class="flex w-full max-w-xs flex-col gap-6">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>
    `,
  }),
};
