import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Code2Icon, PlusIcon, TrashIcon } from "@lucide/vue";
import { ref } from "vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../";

const contextMenuParts = {
  Code2Icon,
  PlusIcon,
  TrashIcon,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};

const meta = {
  title: "Components/Context Menu",
  tags: ["autodocs"],
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full docs demo with submenu, checkboxes, and radios. */
export const Default: Story = {
  render: () => ({
    components: contextMenuParts,
    setup() {
      const showBookmarks = ref(true);
      const showFullUrls = ref(false);
      const person = ref("pedro");
      return { showBookmarks, showFullUrls, person };
    },
    template: `
      <ContextMenu>
        <ContextMenuTrigger
          class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
        >
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent class="w-52">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent class="w-44">
              <ContextMenuItem inset>
                Save Page...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <PlusIcon />
                Create Shortcut...
              </ContextMenuItem>
              <ContextMenuItem inset>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Code2Icon />
                Developer Tools
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <TrashIcon />
                Delete
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem v-model="showBookmarks">
            Show Bookmarks
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem v-model="showFullUrls">
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup v-model="person">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    `,
  }),
};

/** Minimal menu with a few actions. */
export const Simple: Story = {
  render: () => ({
    components: contextMenuParts,
    template: `
      <ContextMenu>
        <ContextMenuTrigger
          class="flex h-[120px] w-[240px] items-center justify-center rounded-md border border-dashed text-sm"
        >
          Right click
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Subscription</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    `,
  }),
};
