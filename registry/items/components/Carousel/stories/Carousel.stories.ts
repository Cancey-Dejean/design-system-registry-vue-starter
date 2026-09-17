import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { watchOnce } from "@vueuse/core";
import { ref } from "vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";

import { CardContent, Card } from "@registry/components/Card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../";

const carouselParts = {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
};

const meta = {
  title: "Components/Carousel",
  tags: ["autodocs"],
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        /* html */ `<StorybookWrapperSimple class='w-full max-w-md px-16'><story /></StorybookWrapperSimple>`,
    }),
  ],
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic horizontal carousel with numbered card slides. */
export const Default: Story = {
  render: (args) => ({
    components: carouselParts,
    setup: () => ({ args }),
    template: /* html */ `
      <Carousel v-bind="args" class="w-full max-w-xs">
        <CarouselContent>
          <CarouselItem v-for="i in 5" :key="i">
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-4xl font-semibold">{{ i }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    `,
  }),
};

/** Multiple slides visible via basis utilities. */
export const Sizes: Story = {
  render: () => ({
    components: carouselParts,
    template: /* html */ `
      <Carousel
        class="relative w-full max-w-xs"
        :opts="{ align: 'start' }"
      >
        <CarouselContent>
          <CarouselItem
            v-for="(_, index) in 5"
            :key="index"
            class="md:basis-1/2 lg:basis-1/3"
          >
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-3xl font-semibold">{{ index + 1 }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    `,
  }),
};

/** Vertical orientation with a fixed-height track. */
export const Orientation: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => ({
    components: carouselParts,
    setup: () => ({ args }),
    template: /* html */ `
      <Carousel
        v-bind="args"
        class="relative w-full max-w-xs"
        :opts="{ align: 'start' }"
      >
        <CarouselContent class="-mt-1 h-[200px]">
          <CarouselItem
            v-for="(_, index) in 5"
            :key="index"
            class="pt-1 md:basis-1/2"
          >
            <div class="p-1">
              <Card>
                <CardContent class="flex items-center justify-center p-6">
                  <span class="text-3xl font-semibold">{{ index + 1 }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    `,
  }),
};

/** Slide counter wired through the Embla API. */
export const WithApi: Story = {
  render: () => ({
    components: carouselParts,
    setup() {
      const api = ref<CarouselApi>();
      const totalCount = ref(0);
      const current = ref(0);

      function setApi(val: CarouselApi) {
        api.value = val;
      }

      watchOnce(api, (carouselApi) => {
        if (!carouselApi) return;

        totalCount.value = carouselApi.scrollSnapList().length;
        current.value = carouselApi.selectedScrollSnap() + 1;

        carouselApi.on("select", () => {
          current.value = carouselApi.selectedScrollSnap() + 1;
        });
      });

      return { setApi, totalCount, current };
    },
    template: /* html */ `
      <div class="w-full max-w-xs">
        <Carousel class="relative w-full" @init-api="setApi">
          <CarouselContent>
            <CarouselItem v-for="(_, index) in 5" :key="index">
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div class="text-muted-foreground py-2 text-center text-sm">
          Slide {{ current }} of {{ totalCount }}
        </div>
      </div>
    `,
  }),
};
