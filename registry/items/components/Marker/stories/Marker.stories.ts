import type { Meta, StoryObj } from "@storybook/vue3-vite"
import { FileTextIcon, GitBranchIcon, SearchIcon } from "@lucide/vue"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { Spinner } from "../../Spinner"
import { Marker, MarkerContent, MarkerIcon } from ".."

const markerParts = {
  FileTextIcon,
  GitBranchIcon,
  Marker,
  MarkerContent,
  MarkerIcon,
  SearchIcon,
  Spinner,
}

const meta = {
  title: "Components/Marker",
  tags: ["autodocs"],
  component: Marker,
  parameters: {
    layout: "padded",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-sm px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

/** Conversation markers: note, streaming status, separator, and activity. */
export const Default: Story = {
  render: () => ({
    components: markerParts,
    template: `
      <div class="flex w-full max-w-sm flex-col gap-8 py-4">
        <Marker>
          <MarkerIcon>
            <GitBranchIcon />
          </MarkerIcon>
          <MarkerContent>Switched to a new branch</MarkerContent>
        </Marker>
        <Marker role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent class="shimmer">Thinking...</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerContent>Conversation compacted</MarkerContent>
        </Marker>
        <Marker>
          <MarkerIcon>
            <SearchIcon />
          </MarkerIcon>
          <MarkerContent>Explored 4 files</MarkerContent>
        </Marker>
      </div>
    `,
  }),
}

/** Default, separator, and border layouts. */
export const Variants: Story = {
  render: () => ({
    components: markerParts,
    template: `
      <div class="flex w-full max-w-sm flex-col gap-8 py-4">
        <Marker>
          <MarkerContent>A default marker for inline notes.</MarkerContent>
        </Marker>
        <Marker variant="separator">
          <MarkerContent>A separator marker</MarkerContent>
        </Marker>
        <Marker variant="border">
          <MarkerContent>A border marker for row boundaries.</MarkerContent>
        </Marker>
      </div>
    `,
  }),
}

/** Streaming markers with role="status" and Spinner. */
export const Status: Story = {
  render: () => ({
    components: markerParts,
    template: `
      <div class="flex w-full max-w-sm flex-col gap-8 py-4">
        <Marker role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent>Compacting conversation</MarkerContent>
        </Marker>
        <Marker variant="separator" role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent>Running tests</MarkerContent>
        </Marker>
      </div>
    `,
  }),
}

/** Bordered activity rows for a tool log. */
export const Border: Story = {
  render: () => ({
    components: markerParts,
    template: `
      <div class="flex w-full max-w-sm flex-col gap-3 py-4">
        <Marker variant="border">
          <MarkerIcon>
            <GitBranchIcon />
          </MarkerIcon>
          <MarkerContent>Switched to release-candidate</MarkerContent>
        </Marker>
        <Marker variant="border">
          <MarkerIcon>
            <SearchIcon />
          </MarkerIcon>
          <MarkerContent>Reviewed 8 related files</MarkerContent>
        </Marker>
        <Marker variant="border">
          <MarkerIcon>
            <FileTextIcon />
          </MarkerIcon>
          <MarkerContent>Opened implementation notes</MarkerContent>
        </Marker>
      </div>
    `,
  }),
}
