import type { Meta, StoryObj } from "@storybook/vue3";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@registry/components/Command";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => ({
    components: {
      Command,
      CommandEmpty,
      CommandGroup,
      CommandInput,
      CommandItem,
      CommandList,
      CommandSeparator,
      CommandShortcut,
    },
    template: /* html */ `
      <Command class="max-w-sm rounded-lg border">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem value="calendar">Calendar</CommandItem>
            <CommandItem value="search-emoji">Search Emoji</CommandItem>
            <CommandItem value="calculator">Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem value="profile">Profile<CommandShortcut>⌘P</CommandShortcut></CommandItem>
            <CommandItem value="settings">Settings<CommandShortcut>⌘S</CommandShortcut></CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    `,
  }),
};
