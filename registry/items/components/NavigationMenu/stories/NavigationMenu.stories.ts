import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@registry/components/NavigationMenu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const navigationMenuParts = {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
};

const meta = {
  title: "Components/Navigation Menu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='flex min-h-80 items-start justify-center pt-8'>
        <story />
      </StorybookWrapperSimple>`,
    }),
  ],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full nav with Getting started mega-menu, Components grid, and Documentation link. */
export const Default: Story = {
  render: () => ({
    components: navigationMenuParts,
    setup: () => ({ components, navigationMenuTriggerStyle }),
    template: /* html */ `
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li class="row-span-3">
                  <NavigationMenuLink as-child>
                    <a
                      class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="#"
                    >
                      <div class="mt-4 mb-2 text-lg font-medium">shadcn/vue</div>
                      <p class="text-muted-foreground text-sm leading-tight">
                        Beautifully designed components built with Reka UI.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">
                      <div class="text-sm font-medium leading-none">Introduction</div>
                      <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        Re-usable components built using Reka UI and Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">
                      <div class="text-sm font-medium leading-none">Installation</div>
                      <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        How to install dependencies and structure your app.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">
                      <div class="text-sm font-medium leading-none">Typography</div>
                      <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        Styles for headings, paragraphs, lists...etc
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li v-for="component in components" :key="component.title">
                  <NavigationMenuLink as-child>
                    <a :href="component.href">
                      <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                      <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {{ component.description }}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <a :class="navigationMenuTriggerStyle()" href="#">Documentation</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    `,
  }),
};

/** Compact menu without the shared sliding viewport. */
export const WithoutViewport: Story = {
  render: () => ({
    components: navigationMenuParts,
    setup: () => ({ navigationMenuTriggerStyle }),
    template: /* html */ `
      <NavigationMenu :viewport="false">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[200px] gap-1 p-1">
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">Link One</a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">Link Two</a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">Link Three</a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[200px] gap-1 p-1">
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">Link Four</a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">Link Five</a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <a :class="navigationMenuTriggerStyle()" href="#">Link</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    `,
  }),
};
