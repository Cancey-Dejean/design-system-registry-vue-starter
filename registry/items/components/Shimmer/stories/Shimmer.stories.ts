import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Shimmer } from "@registry/components/Shimmer";

const meta = {
  title: "Components/Shimmer",
  component: Shimmer,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='flex h-40 w-full max-w-sm items-center justify-center'><story /></StorybookWrapperSimple>`,
    }),
  ],
} satisfies Meta<typeof Shimmer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Streaming / loading label with shimmer animation. */
export const Default: Story = {
  render: () => ({
    components: { Shimmer },
    template: /* html */ `
      <div class="flex h-full w-full items-center justify-center">
        <Shimmer class="text-sm text-muted-foreground">
          Generating response&hellip;
        </Shimmer>
      </div>
    `,
  }),
};

/** Emphasized shimmer on primary text. */
export const Primary: Story = {
  render: () => ({
    components: { Shimmer },
    template: /* html */ `
      <Shimmer class="text-base font-medium">
        Thinking&hellip;
      </Shimmer>
    `,
  }),
};

/** Render as a span inside surrounding copy. */
export const AsSpan: Story = {
  render: () => ({
    components: { Shimmer },
    template: /* html */ `
      <p class="text-sm text-muted-foreground">
        Status:
        <Shimmer as="span" class="font-medium text-foreground">
          Uploading file&hellip;
        </Shimmer>
      </p>
    `,
  }),
};
