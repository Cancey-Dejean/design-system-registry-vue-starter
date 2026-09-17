import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { LOGO_SIZES, LogoGallery, Logo, LOGOS } from "@registry/components/Logos";

const meta = {
  title: "Components/Logo",
  component: Logo,
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
    logo: "three-portals",
    size: "lg",
  },
  argTypes: {
    logo: {
      description: "The logo to display",
      control: { type: "select" },
      options: Object.keys(LOGOS),
    },
    size: {
      description: "The size of the logo",
      control: { type: "select" },
      options: LOGO_SIZES,
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single typed logo with size control. */
export const Default: Story = {
  render: (args) => ({
    components: { Logo },
    setup: () => ({ args }),
    template: /* html */ `<Logo v-bind="args" />`,
  }),
};

/** Searchable gallery; click a tile to copy SVG markup or download an image logo. */
export const AllLogos: Story = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='mx-auto w-full max-w-6xl p-8'><story /></StorybookWrapperSimple>`,
    }),
  ],
  render: () => ({
    components: { LogoGallery },
    template: /* html */ `<LogoGallery />`,
  }),
};
