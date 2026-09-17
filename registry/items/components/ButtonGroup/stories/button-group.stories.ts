import type { Meta, StoryObj } from "@storybook/vue3";
import { ChevronDown } from "@lucide/vue";

import Button from "@registry/components/Button/Button.vue";
import ButtonGroup from "../ButtonGroup.vue";
import ButtonGroupSeparator from "../ButtonGroupSeparator.vue";
import ButtonGroupText from "../ButtonGroupText.vue";
import DropdownMenu from "@registry/components/DropdownMenu/DropdownMenu.vue";
import DropdownMenuContent from "@registry/components/DropdownMenu/DropdownMenuContent.vue";
import DropdownMenuItem from "@registry/components/DropdownMenu/DropdownMenuItem.vue";
import DropdownMenuTrigger from "@registry/components/DropdownMenu/DropdownMenuTrigger.vue";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => ({
    components: { ButtonGroup, Button },
    template: /* html */ `
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
        <Button variant="outline">Snooze</Button>
      </ButtonGroup>
    `,
  }),
};

export const Split: Story = {
  render: () => ({
    components: { ButtonGroup, ButtonGroupSeparator, Button },
    template: /* html */ `
      <ButtonGroup>
        <Button variant="secondary">Button</Button>
        <ButtonGroupSeparator />
        <Button size="icon-md" variant="secondary">+</Button>
      </ButtonGroup>
    `,
  }),
};

export const WithDropdownMenu: Story = {
  render: () => ({
    components: {
      ButtonGroup,
      Button,
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
      ChevronDown,
    },
    template: /* html */ `
      <ButtonGroup>
        <Button variant="outline">Copy Page</Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button size="icon-md" variant="outline">
              <ChevronDown aria-hidden="true" />
              <span class="sr-only">Open page actions menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View as Markdown</DropdownMenuItem>
            <DropdownMenuItem>Open in v0</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { ButtonGroup, Button },
    template: /* html */ `
      <ButtonGroup orientation="vertical" class="h-fit" aria-label="Media controls">
        <Button variant="outline" size="icon-md">+</Button>
        <Button variant="outline" size="icon-md">-</Button>
      </ButtonGroup>
    `,
  }),
};

export const WithText: Story = {
  render: () => ({
    components: { ButtonGroup, ButtonGroupText, Button },
    template: /* html */ `
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Button variant="outline">example.com</Button>
      </ButtonGroup>
    `,
  }),
};
