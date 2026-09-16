import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { CheckIcon, ChevronsUpDownIcon } from "@lucide/vue";
import { ref } from "vue";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import Button from "../../Button/Button.vue";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
} from "../";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const timezones = [
  {
    label: "Americas",
    timezones: [
      { value: "America/New_York", label: "(GMT-5) New York" },
      { value: "America/Los_Angeles", label: "(GMT-8) Los Angeles" },
      { value: "America/Chicago", label: "(GMT-6) Chicago" },
    ],
  },
  {
    label: "Europe",
    timezones: [
      { value: "Europe/London", label: "(GMT+0) London" },
      { value: "Europe/Paris", label: "(GMT+1) Paris" },
      { value: "Europe/Berlin", label: "(GMT+1) Berlin" },
    ],
  },
];

const comboboxParts = {
  Button,
  CheckIcon,
  ChevronsUpDownIcon,
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
};

const meta = {
  title: "Components/Combobox",
  tags: ["autodocs"],
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Searchable single-select framework picker. */
export const Default: Story = {
  render: () => ({
    components: comboboxParts,
    setup() {
      const selectedFramework = ref<(typeof frameworks)[number]>();
      return { frameworks, selectedFramework };
    },
    template: `
      <Combobox v-model="selectedFramework" by="label">
        <ComboboxAnchor as-child>
          <ComboboxTrigger as-child>
            <Button variant="outline" class="w-[200px] justify-between">
              {{ selectedFramework?.label ?? "Select framework..." }}
              <ChevronsUpDownIcon class="opacity-50" />
            </Button>
          </ComboboxTrigger>
        </ComboboxAnchor>
        <ComboboxList>
          <ComboboxInput placeholder="Search framework..." />
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxGroup>
            <ComboboxItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework"
            >
              {{ framework.label }}
              <ComboboxItemIndicator>
                <CheckIcon />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
    `,
  }),
};

/** Multi-select with checkbox-style indicators. */
export const Multiple: Story = {
  render: () => ({
    components: comboboxParts,
    setup() {
      const selectedFrameworks = ref<typeof frameworks>([]);
      return { frameworks, selectedFrameworks };
    },
    template: `
      <Combobox v-model="selectedFrameworks" multiple by="label">
        <ComboboxAnchor as-child>
          <ComboboxTrigger as-child>
            <Button variant="outline" class="w-[280px] justify-between">
              <span class="truncate">
                {{
                  selectedFrameworks.length > 0
                    ? selectedFrameworks.map((framework) => framework.label).join(", ")
                    : "Select frameworks..."
                }}
              </span>
              <ChevronsUpDownIcon class="opacity-50" />
            </Button>
          </ComboboxTrigger>
        </ComboboxAnchor>
        <ComboboxList class="w-[280px]" align="start">
          <ComboboxInput placeholder="Search framework..." />
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxGroup>
            <ComboboxItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework"
            >
              <div
                class="border-input data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground pointer-events-none size-4 shrink-0 rounded-[4px] border transition-all select-none *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100"
                :data-selected="selectedFrameworks.some((f) => f.value === framework.value)"
              >
                <CheckIcon class="size-3.5 text-current" />
              </div>
              {{ framework.label }}
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
    `,
  }),
};

/** Grouped options with a scrollable viewport. */
export const Grouped: Story = {
  render: () => ({
    components: comboboxParts,
    setup() {
      const selectedTimezone = ref(timezones[0]!.timezones[0]!);
      return { timezones, selectedTimezone };
    },
    template: `
      <Combobox v-model="selectedTimezone" by="label">
        <ComboboxAnchor as-child>
          <ComboboxTrigger as-child>
            <Button variant="outline" class="w-[220px] justify-between">
              {{ selectedTimezone?.label ?? "Select timezone..." }}
              <ChevronsUpDownIcon class="opacity-50" />
            </Button>
          </ComboboxTrigger>
        </ComboboxAnchor>
        <ComboboxList class="w-72" align="start">
          <ComboboxInput placeholder="Search timezone..." />
          <ComboboxViewport class="max-h-[260px]">
            <ComboboxEmpty>No timezone found.</ComboboxEmpty>
            <ComboboxGroup
              v-for="region in timezones"
              :key="region.label"
              :heading="region.label"
            >
              <ComboboxItem
                v-for="timezone in region.timezones"
                :key="timezone.value"
                :value="timezone"
              >
                {{ timezone.label }}
                <ComboboxItemIndicator>
                  <CheckIcon />
                </ComboboxItemIndicator>
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxViewport>
        </ComboboxList>
      </Combobox>
    `,
  }),
};
