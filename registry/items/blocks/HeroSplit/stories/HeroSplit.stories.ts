import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { HeroSplit, HERO_SPLIT_THEMES } from "../";

const meta = {
  title: "Blocks/Hero Split",
  tags: ["autodocs"],
  component: HeroSplit,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    theme: { control: "select", options: HERO_SPLIT_THEMES },
    class: { control: false },
  },
  args: {
    title: "Supercharge your web app",
    description:
      "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
    badge: "What's new",
    badgeHref: "#",
    announcement: "Just shipped v1.0",
    primaryCta: { label: "Documentation", href: "#" },
    secondaryCta: { label: "View on GitHub", href: "#" },
    theme: "indigo",
    codeTabs: [{ name: "NotificationSetting.jsx", active: true }, { name: "App.jsx" }],
  },
} satisfies Meta<typeof HeroSplit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLogo: Story = {
  args: {
    logoSrc: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600",
    logoDarkSrc: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500",
    logoAlt: "My Company",
  },
};

export const Violet: Story = {
  args: {
    theme: "violet",
    logoSrc: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=violet&shade=600",
    logoDarkSrc: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=violet&shade=500",
  },
};

export const Blue: Story = {
  args: {
    theme: "blue",
    logoSrc: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=600",
    logoDarkSrc: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=500",
  },
};

export const Rose: Story = {
  args: {
    theme: "rose",
    logoSrc: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=rose&shade=600",
    logoDarkSrc: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=rose&shade=500",
  },
};

export const NoCta: Story = {
  args: {
    primaryCta: undefined,
    secondaryCta: undefined,
  },
};

export const NoBadge: Story = {
  args: {
    badge: undefined,
    announcement: undefined,
  },
};

export const Themes: Story = {
  argTypes: {
    theme: { table: { disable: true } },
  },
  render: (args) => ({
    components: { HeroSplit },
    setup() {
      return { args, HERO_SPLIT_THEMES };
    },
    template: `
      <div class="flex flex-col">
        <HeroSplit
          v-for="theme in HERO_SPLIT_THEMES"
          :key="theme"
          v-bind="args"
          :theme="theme"
        />
      </div>
    `,
  }),
};
