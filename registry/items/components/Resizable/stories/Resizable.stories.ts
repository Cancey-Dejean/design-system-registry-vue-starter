import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@registry/components/Resizable";

const resizableParts = {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
};

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='w-full max-w-2xl px-4'><story /></StorybookWrapperSimple>`,
    }),
  ],
  args: {
    direction: "horizontal",
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nested horizontal and vertical panel layout. */
export const Default: Story = {
  render: () => ({
    components: resizableParts,
    template: /* html */ `
      <ResizablePanelGroup
        direction="horizontal"
        class="max-w-md rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel :default-size="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :default-size="50">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel :default-size="25">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel :default-size="75">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    `,
  }),
};

/** Stacked panels that resize vertically. */
export const Vertical: Story = {
  render: () => ({
    components: resizableParts,
    template: /* html */ `
      <ResizablePanelGroup
        direction="vertical"
        class="min-h-[200px] max-w-md rounded-lg border"
      >
        <ResizablePanel :default-size="25">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :default-size="75">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    `,
  }),
};

/** Horizontal split with a visible drag handle. */
export const WithHandle: Story = {
  render: () => ({
    components: resizableParts,
    template: /* html */ `
      <ResizablePanelGroup
        direction="horizontal"
        class="min-h-[200px] max-w-md rounded-lg border"
      >
        <ResizablePanel :default-size="25">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle with-handle />
        <ResizablePanel :default-size="75">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    `,
  }),
};
