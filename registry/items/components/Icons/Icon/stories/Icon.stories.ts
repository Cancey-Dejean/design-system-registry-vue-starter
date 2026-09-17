import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { ICON_SIZES, IconGallery, Icon, ICONS } from "@registry/components/Icons";

const meta = {
  title: "Components/Icon",
  tags: ["autodocs"],
  component: Icon,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple><story /></StorybookWrapperSimple>`,
    }),
  ],
  args: {
    icon: "aperture",
    size: "lg",
  },
  argTypes: {
    icon: {
      description: "The icon to display",
      control: { type: "select" },
      options: Object.keys(ICONS),
    },
    size: {
      description: "The size of the icon",
      control: { type: "select" },
      options: ICON_SIZES,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single typed icon with size control. */
export const Default: Story = {
  render: (args) => ({
    components: { Icon },
    setup: () => ({ args }),
    template: /* html */ `<Icon v-bind="args" />`,
  }),
};

/** Searchable gallery; click a tile to copy SVG markup. */
export const AllIcons: Story = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        /* html */ `<StorybookWrapperSimple class='mx-auto w-full max-w-6xl p-8'><story /></StorybookWrapperSimple>`,
    }),
  ],
  render: () => ({
    components: { IconGallery },
    template: /* html */ `<IconGallery />`,
  }),
};
