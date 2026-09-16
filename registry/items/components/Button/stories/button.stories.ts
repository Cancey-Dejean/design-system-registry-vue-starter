import Spinner from "@registry/components/Spinner/Spinner.vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { cn } from "cn";
import { BUTTON_SIZES, BUTTON_VARIANTS, Button, type ButtonProps } from "..";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: BUTTON_VARIANTS },
    size: {
      control: "select",
      options: BUTTON_SIZES.filter((size) => !size.startsWith("icon")),
    },
    class: { control: false },
    as: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    default: "Button",
    variant: "primary",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** `loading` is a story-only control: Button has no such prop, the story composes Spinner instead. */
type LoadingStoryArgs = ButtonProps & {
  default?: string;
  loading?: boolean;
};

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Icon: Story = {
  args: {
    icon: true,
    size: "icon-md",
  },
  argTypes: {
    size: {
      control: "select",
      options: BUTTON_SIZES.filter((option) => option?.startsWith("icon")),
    },
    default: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: /* html */ '<Button v-bind="args">+</Button>',
  }),
};

export const Loading: StoryObj<LoadingStoryArgs> = {
  args: {
    default: "Button",
    loading: true,
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Story-only control — compose Spinner inside Button (not a Button prop)",
    },
  },
  render: (args) => ({
    components: { Button, Spinner },
    setup() {
      return { args, cn };
    },
    template: /* html */ `
      <div data-slot="button-cta-group" class="relative flex items-center justify-center gap-4">
        <Button :variant="args.variant" :size="args.size" :class="args.class">
          <template v-if="args.loading">
            <Spinner
              class="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 animate-spin cursor-progress opacity-50"
            />
            <span :class="cn(args.loading && 'opacity-0')">{{ args.default }}</span>
          </template>
          <span v-else>{{ args.default || "Button" }}</span>
        </Button>
      </div>
    `,
  }),
};
