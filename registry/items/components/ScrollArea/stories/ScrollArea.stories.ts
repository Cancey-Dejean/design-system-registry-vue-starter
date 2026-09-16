import type { Meta, StoryObj } from "@storybook/vue3-vite"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { Separator } from "../../Separator"
import { ScrollArea, ScrollBar } from ".."

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
)

const works = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

const scrollParts = {
  ScrollArea,
  ScrollBar,
  Separator,
}

const meta = {
  title: "Components/ScrollArea",
  tags: ["autodocs"],
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

/** Vertical tag list in a fixed-height viewport. */
export const Default: Story = {
  render: () => ({
    components: scrollParts,
    setup: () => ({ tags }),
    template: `
      <ScrollArea class="h-72 w-48 rounded-md border">
        <div class="p-4">
          <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
          <template v-for="tag in tags" :key="tag">
            <div class="text-sm">
              {{ tag }}
            </div>
            <Separator class="my-2" />
          </template>
        </div>
      </ScrollArea>
    `,
  }),
}

/** Long prose block with constrained height. */
export const Text: Story = {
  render: () => ({
    components: scrollParts,
    template: `
      <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then one day, the king tripped over one of Jokester's whoopee cushions and
        fell into the moat. He was so embarrassed that he decided to make Jokester the
        official court jester.
      </ScrollArea>
    `,
  }),
}

/** Horizontal image strip with an explicit horizontal scrollbar. */
export const Horizontal: Story = {
  render: () => ({
    components: scrollParts,
    setup: () => ({ works }),
    template: `
      <ScrollArea class="w-96 rounded-md border whitespace-nowrap">
        <div class="flex w-max space-x-4 p-4">
          <figure
            v-for="artwork in works"
            :key="artwork.artist"
            class="shrink-0"
          >
            <div class="overflow-hidden rounded-md">
              <img
                :src="artwork.art"
                :alt="\`Photo by \${artwork.artist}\`"
                class="aspect-3/4 h-fit w-fit object-cover"
                width="300"
                height="400"
              >
            </div>
            <figcaption class="text-muted-foreground pt-2 text-xs">
              Photo by
              <span class="text-foreground font-semibold">
                {{ artwork.artist }}
              </span>
            </figcaption>
          </figure>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    `,
  }),
}
