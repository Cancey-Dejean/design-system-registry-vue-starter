import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ArrowUpRightIcon, Bell, Cloud, FolderCode, RefreshCcw } from "@lucide/vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Button } from "../../Button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../";

const emptyParts = {
  ArrowUpRightIcon,
  Bell,
  Button,
  Cloud,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  FolderCode,
  RefreshCcw,
};

const meta = {
  title: "Components/Empty",
  tags: ["autodocs"],
  component: Empty,
  parameters: {
    layout: "padded",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-lg px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Icon media with title, description, and action buttons. */
export const Default: Story = {
  render: () => ({
    components: emptyParts,
    template: `
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderCode />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            You haven't created any projects yet. Get started by creating your first
            project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div class="flex gap-2">
            <Button>Create Project</Button>
            <Button variant="outline">Import Project</Button>
          </div>
        </EmptyContent>
        <Button variant="ghost" as-child class="text-muted-foreground" size="sm">
          <a href="#">
            Learn More <ArrowUpRightIcon />
          </a>
        </Button>
      </Empty>
    `,
  }),
};

/** Dashed outline empty state. */
export const Outline: Story = {
  render: () => ({
    components: emptyParts,
    template: `
      <Empty class="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Cloud />
          </EmptyMedia>
          <EmptyTitle>Cloud Storage Empty</EmptyTitle>
          <EmptyDescription>
            Upload files to your cloud storage to access them anywhere.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">Upload Files</Button>
        </EmptyContent>
      </Empty>
    `,
  }),
};

/** Gradient background empty state. */
export const Background: Story = {
  render: () => ({
    components: emptyParts,
    template: `
      <Empty class="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Bell />
          </EmptyMedia>
          <EmptyTitle>No Notifications</EmptyTitle>
          <EmptyDescription>
            You're all caught up. New notifications will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            <RefreshCcw />
            Refresh
          </Button>
        </EmptyContent>
      </Empty>
    `,
  }),
};
