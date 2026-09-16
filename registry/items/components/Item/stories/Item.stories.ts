import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { BadgeCheckIcon, ChevronRightIcon, ShieldAlertIcon } from "@lucide/vue";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import { Button } from "../../Button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../";

const itemParts = {
  BadgeCheckIcon,
  Button,
  ChevronRightIcon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  ShieldAlertIcon,
};

const meta = {
  title: "Components/Item",
  tags: ["autodocs"],
  component: Item,
  parameters: {
    layout: "padded",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-md px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Outline item with action button and compact link row. */
export const Default: Story = {
  render: () => ({
    components: itemParts,
    template: `
      <div class="flex w-full max-w-md flex-col gap-6">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Basic Item</ItemTitle>
            <ItemDescription>
              A simple item with title and description.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">Action</Button>
          </ItemActions>
        </Item>
        <Item variant="outline" size="sm" as-child>
          <a href="#">
            <ItemMedia>
              <BadgeCheckIcon class="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Your profile has been verified.</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon class="size-4" />
            </ItemActions>
          </a>
        </Item>
      </div>
    `,
  }),
};

/** Default, outline, and muted surface treatments. */
export const Variants: Story = {
  render: () => ({
    components: itemParts,
    template: `
      <div class="flex flex-col gap-6">
        <Item>
          <ItemContent>
            <ItemTitle>Default Variant</ItemTitle>
            <ItemDescription>
              Standard styling with subtle background and borders.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">Open</Button>
          </ItemActions>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Outline Variant</ItemTitle>
            <ItemDescription>
              Outlined style with clear borders and transparent background.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">Open</Button>
          </ItemActions>
        </Item>
        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Muted Variant</ItemTitle>
            <ItemDescription>
              Subdued appearance with muted colors for secondary content.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">Open</Button>
          </ItemActions>
        </Item>
      </div>
    `,
  }),
};

/** Icon media treatment for alerts and notices. */
export const Icon: Story = {
  render: () => ({
    components: itemParts,
    template: `
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">Review</Button>
        </ItemActions>
      </Item>
    `,
  }),
};

/** Grouped list rows with separators. */
export const Group: Story = {
  render: () => ({
    components: itemParts,
    template: `
      <ItemGroup class="w-full max-w-md rounded-md border">
        <Item>
          <ItemContent>
            <ItemTitle>Messages</ItemTitle>
            <ItemDescription>3 unread conversations</ItemDescription>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemContent>
            <ItemTitle>Notifications</ItemTitle>
            <ItemDescription>5 new alerts</ItemDescription>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item>
          <ItemContent>
            <ItemTitle>Settings</ItemTitle>
            <ItemDescription>Account and privacy</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon class="size-4" />
          </ItemActions>
        </Item>
      </ItemGroup>
    `,
  }),
};
