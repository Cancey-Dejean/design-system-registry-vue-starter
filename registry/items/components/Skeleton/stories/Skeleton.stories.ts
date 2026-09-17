import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Skeleton } from "../";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
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
    class: { control: false },
  },
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: /* html */ `<Skeleton v-bind="args" class="h-4 w-[200px]" />`,
  }),
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** An avatar and two lines of text, the classic loading placeholder. */
export const Profile: Story = {
  render: () => ({
    components: { Skeleton },
    template: /* html */ `
      <div class="flex items-center gap-4">
        <Skeleton class="size-12 rounded-full" />
        <div class="flex flex-col gap-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    `,
  }),
};

/** A thumbnail above two lines of text, for card-shaped content. */
export const Card: Story = {
  render: () => ({
    components: { Skeleton },
    template: /* html */ `
      <div class="flex flex-col gap-3">
        <Skeleton class="h-[125px] w-[250px] rounded-xl" />
        <div class="flex flex-col gap-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    `,
  }),
};
