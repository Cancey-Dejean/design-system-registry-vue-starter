import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Moon, Sun } from "@lucide/vue";
import { ref } from "vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Label } from "@registry/components/Label";
import { Switch } from "@registry/components/Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='w-full max-w-sm px-4'><story /></StorybookWrapperSimple>`,
    }),
  ],
  argTypes: {
    disabled: { control: "boolean" },
    defaultValue: { control: "boolean" },
  },
  args: {
    disabled: false,
    defaultValue: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Airplane Mode switch with a paired label. */
export const Default: Story = {
  render: (args) => ({
    components: { Switch, Label },
    setup: () => ({ args }),
    template: /* html */ `
      <div class="flex items-center space-x-2">
        <Switch id="airplane-mode" v-bind="args" />
        <Label for="airplane-mode">Airplane Mode</Label>
      </div>
    `,
  }),
};

/** Controlled toggle with v-model. */
export const Controlled: Story = {
  render: () => ({
    components: { Switch, Label },
    setup() {
      const enabled = ref(true);
      return { enabled };
    },
    template: /* html */ `
      <div class="grid gap-2">
        <div class="flex items-center space-x-2">
          <Switch id="notifications" v-model="enabled" />
          <Label for="notifications">Notifications</Label>
        </div>
        <p class="text-muted-foreground text-sm">
          Status:
          <span class="text-foreground font-medium">
            {{ enabled ? "On" : "Off" }}
          </span>
        </p>
      </div>
    `,
  }),
};

/** Disabled switch that cannot be toggled. */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: true,
  },
  render: (args) => ({
    components: { Switch, Label },
    setup: () => ({ args }),
    template: /* html */ `
      <div class="flex items-center space-x-2">
        <Switch id="airplane-disabled" v-bind="args" />
        <Label for="airplane-disabled">Airplane Mode</Label>
      </div>
    `,
  }),
};

/** Thumb slot for optional icons. */
export const WithThumbIcon: Story = {
  render: () => ({
    components: { Switch, Label, Moon, Sun },
    setup() {
      const dark = ref(false);
      return { dark };
    },
    template: /* html */ `
      <div class="flex items-center space-x-2">
        <Switch id="theme" v-model="dark">
          <template #thumb>
            <Moon v-if="dark" class="size-3" />
            <Sun v-else class="size-3" />
          </template>
        </Switch>
        <Label for="theme">{{ dark ? "Dark" : "Light" }} mode</Label>
      </div>
    `,
  }),
};
