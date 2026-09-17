import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ChevronLeftIcon, ChevronRightIcon } from "@lucide/vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from "@registry/components/Pagination";

const paginationParts = {
  ChevronLeftIcon,
  ChevronRightIcon,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
};

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple><story /></StorybookWrapperSimple>`,
    }),
  ],
  args: {
    itemsPerPage: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Previous/next with page numbers for a small set. */
export const Default: Story = {
  render: () => ({
    components: paginationParts,
    template: /* html */ `
      <Pagination v-slot="{ page }" :items-per-page="10" :total="30" :default-page="2">
        <PaginationContent v-slot="{ items }">
          <PaginationPrevious />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :index="index" />
          </template>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    `,
  }),
};

/** Larger range with first/last jump controls and ellipses. */
export const WithEdges: Story = {
  render: () => ({
    components: paginationParts,
    template: /* html */ `
      <Pagination
        v-slot="{ page }"
        :items-per-page="10"
        :total="100"
        :sibling-count="1"
        :default-page="5"
        show-edges
      >
        <PaginationContent v-slot="{ items }">
          <PaginationFirst />
          <PaginationPrevious />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :index="index" />
          </template>
          <PaginationNext />
          <PaginationLast />
        </PaginationContent>
      </Pagination>
    `,
  }),
};

/** Icon-only previous and next for dense layouts. */
export const IconsOnly: Story = {
  render: () => ({
    components: paginationParts,
    template: /* html */ `
      <Pagination :items-per-page="10" :total="50" :default-page="1">
        <PaginationContent>
          <PaginationPrevious size="icon-md" class="px-0">
            <ChevronLeftIcon />
            <span class="sr-only">Previous</span>
          </PaginationPrevious>
          <PaginationNext size="icon-md" class="px-0">
            <span class="sr-only">Next</span>
            <ChevronRightIcon />
          </PaginationNext>
        </PaginationContent>
      </Pagination>
    `,
  }),
};
