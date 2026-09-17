import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { CalendarDaysIcon } from "@lucide/vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Avatar, AvatarFallback, AvatarImage } from "../../Avatar";
import { Button } from "../../Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../";

const hoverCardParts = {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  CalendarDaysIcon,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
};

const meta = {
  title: "Components/Hover Card",
  tags: ["autodocs"],
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Profile-style hover preview with avatar and metadata. */
export const Default: Story = {
  render: () => ({
    components: hoverCardParts,
    template: `
      <HoverCard>
        <HoverCardTrigger as-child>
          <Button variant="ghost">@nuxt</Button>
        </HoverCardTrigger>
        <HoverCardContent class="w-80">
          <div class="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">@nuxt</h4>
              <p class="text-sm">
                The Vue Framework – The Progressive Web Framework.
              </p>
              <div class="flex items-center pt-2">
                <CalendarDaysIcon class="mr-2 size-4 opacity-70" />
                <span class="text-xs text-muted-foreground">
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    `,
  }),
};

/** Simple text content on hover. */
export const Simple: Story = {
  render: () => ({
    components: hoverCardParts,
    template: `
      <HoverCard>
        <HoverCardTrigger as-child>
          <Button variant="outline">Hover</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          The Vue Framework – created and maintained by Evan You.
        </HoverCardContent>
      </HoverCard>
    `,
  }),
};
