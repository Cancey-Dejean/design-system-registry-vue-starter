import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Minus, Plus } from "@lucide/vue";
import { ref } from "vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Button } from "@registry/components/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@registry/components/Drawer";

const drawerParts = {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Minus,
  Plus,
};

const meta = {
  title: "Components/Drawer",
  tags: ["autodocs"],
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple><story /></StorybookWrapperSimple>`,
    }),
  ],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Bottom drawer with an interactive goal counter. */
export const Default: Story = {
  render: () => ({
    components: drawerParts,
    setup() {
      const goal = ref(350);
      return { goal };
    },
    template: /* html */ `
      <Drawer>
        <DrawerTrigger as-child>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div class="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div class="p-4 pb-0">
              <div class="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  icon
                  class="shrink-0 rounded-full"
                  :disabled="goal <= 200"
                  @click="goal -= 10"
                >
                  <Minus />
                  <span class="sr-only">Decrease</span>
                </Button>
                <div class="flex-1 text-center">
                  <div class="text-7xl font-bold tracking-tighter">
                    {{ goal }}
                  </div>
                  <div class="text-muted-foreground text-[0.70rem] uppercase">
                    Calories/day
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon-sm"
                  icon
                  class="shrink-0 rounded-full"
                  :disabled="goal >= 400"
                  @click="goal += 10"
                >
                  <Plus />
                  <span class="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose as-child>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    `,
  }),
};

/** Simple confirmation drawer. */
export const Confirmation: Story = {
  render: () => ({
    components: drawerParts,
    template: /* html */ `
      <Drawer>
        <DrawerTrigger as-child>
          <Button variant="outline">Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose as-child>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    `,
  }),
};

/** Drawer opening from the right edge. */
export const Right: Story = {
  render: () => ({
    components: drawerParts,
    template: /* html */ `
      <Drawer direction="right">
        <DrawerTrigger as-child>
          <Button variant="outline">Open Right</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Sidebar Drawer</DrawerTitle>
            <DrawerDescription>
              Slides in from the right on larger layouts.
            </DrawerDescription>
          </DrawerHeader>
          <div class="px-4 text-sm text-muted-foreground">
            Use direction="right" for a side-panel style drawer.
          </div>
          <DrawerFooter>
            <DrawerClose as-child>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    `,
  }),
};
