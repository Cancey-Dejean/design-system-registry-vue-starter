import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Avatar, AvatarFallback, AvatarImage } from "../";

const avatarParts = {
  Avatar,
  AvatarFallback,
  AvatarImage,
};

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple><story /></StorybookWrapperSimple>`,
    }),
  ],
  argTypes: {
    class: { control: "text" },
  },
  args: {
    class: "",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Image with initials fallback, matching the docs usage example. */
export const Default: Story = {
  render: (args) => ({
    components: avatarParts,
    setup: () => ({ args }),
    template: /* html */ `
      <Avatar v-bind="args">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    `,
  }),
};

/** Fallback only when no image is provided. */
export const Fallback: Story = {
  render: (args) => ({
    components: avatarParts,
    setup: () => ({ args }),
    template: /* html */ `
      <Avatar v-bind="args">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    `,
  }),
};

/** Size overrides via class. */
export const Sizes: Story = {
  render: () => ({
    components: avatarParts,
    template: /* html */ `
      <div class="flex items-center gap-4">
        <Avatar class="size-6">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar class="size-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    `,
  }),
};

/** Overlapping grayscale group from the docs demo. */
export const Group: Story = {
  render: () => ({
    components: avatarParts,
    template: /* html */ `
      <div class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
    `,
  }),
};
