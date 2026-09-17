import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {
  VisAxis,
  VisCrosshair,
  VisGroupedBar,
  VisLine,
  VisTooltip,
  VisXYContainer,
} from "@unovis/vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import type { ChartConfig } from "../Chart.types";
import ChartContainer from "../ChartContainer.vue";
import ChartLegendContent from "../ChartLegendContent.vue";
import ChartTooltipContent from "../ChartTooltipContent.vue";
import { componentToString } from "../utils";

const ChartCrosshair = VisCrosshair;
const ChartTooltip = VisTooltip;

const chartData = [
  { date: new Date("2024-01-01"), desktop: 186, mobile: 80 },
  { date: new Date("2024-02-01"), desktop: 305, mobile: 200 },
  { date: new Date("2024-03-01"), desktop: 237, mobile: 120 },
  { date: new Date("2024-04-01"), desktop: 73, mobile: 190 },
  { date: new Date("2024-05-01"), desktop: 209, mobile: 130 },
  { date: new Date("2024-06-01"), desktop: 214, mobile: 140 },
];

type Data = (typeof chartData)[number];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const chartParts = {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  VisAxis,
  VisGroupedBar,
  VisLine,
  VisXYContainer,
};

const meta = {
  title: "Components/Chart",
  tags: ["autodocs"],
  component: ChartContainer,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-lg px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
  args: {
    config: chartConfig,
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Grouped bar chart with axes, tooltip, and legend. */
export const Default: Story = {
  render: () => ({
    components: chartParts,
    setup() {
      return {
        chartData,
        chartConfig,
        componentToString,
        formatMonth: (d: number) =>
          new Date(d).toLocaleDateString("en-US", {
            month: "short",
          }),
        formatLongMonth: (d: number | Date) =>
          new Date(d).toLocaleDateString("en-US", {
            month: "long",
          }),
        x: (d: Data) => d.date,
        y: [(d: Data) => d.desktop, (d: Data) => d.mobile],
        colors: [chartConfig.desktop.color, chartConfig.mobile.color],
        tickValues: chartData.map((d) => d.date),
        emptyTick: (_d: number) => "",
      };
    },
    template: `
      <ChartContainer :config="chartConfig" class="min-h-[200px] w-full">
        <VisXYContainer :data="chartData">
          <VisGroupedBar
            :x="x"
            :y="y"
            :color="colors"
            :rounded-corners="4"
            bar-padding="0.1"
            group-padding="0"
          />
          <VisAxis
            type="x"
            :x="x"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :tick-format="formatMonth"
            :tick-values="tickValues"
          />
          <VisAxis
            type="y"
            :tick-format="emptyTick"
            :tick-line="false"
            :domain-line="false"
            :grid-line="true"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, {
              labelFormatter: formatLongMonth,
            })"
            :color="colors"
          />
        </VisXYContainer>
        <ChartLegendContent />
      </ChartContainer>
    `,
  }),
};

/** Simple line chart for a single series. */
export const Line: Story = {
  render: () => ({
    components: chartParts,
    setup() {
      return {
        chartData,
        chartConfig: {
          desktop: chartConfig.desktop,
        } satisfies ChartConfig,
        componentToString,
        formatMonth: (d: number) =>
          new Date(d).toLocaleDateString("en-US", {
            month: "short",
          }),
        formatLongMonth: (d: number | Date) =>
          new Date(d).toLocaleDateString("en-US", {
            month: "long",
          }),
        x: (d: Data) => d.date,
        y: (d: Data) => d.desktop,
        color: chartConfig.desktop.color,
        tickValues: chartData.map((d) => d.date),
        emptyTick: (_d: number) => "",
      };
    },
    template: `
      <ChartContainer :config="chartConfig" class="min-h-[200px] w-full">
        <VisXYContainer :data="chartData">
          <VisLine :x="x" :y="y" :color="color" />
          <VisAxis
            type="x"
            :x="x"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :tick-format="formatMonth"
            :tick-values="tickValues"
          />
          <VisAxis
            type="y"
            :tick-format="emptyTick"
            :tick-line="false"
            :domain-line="false"
            :grid-line="true"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, {
              labelFormatter: formatLongMonth,
            })"
            :color="[color]"
          />
        </VisXYContainer>
        <ChartLegendContent />
      </ChartContainer>
    `,
  }),
};

/** Bar chart without tooltip or legend. */
export const BarsOnly: Story = {
  render: () => ({
    components: chartParts,
    setup() {
      return {
        chartData,
        chartConfig,
        x: (d: Data) => d.date,
        y: [(d: Data) => d.desktop, (d: Data) => d.mobile],
        colors: [chartConfig.desktop.color, chartConfig.mobile.color],
      };
    },
    template: `
      <ChartContainer :config="chartConfig" class="min-h-[200px] w-full">
        <VisXYContainer :data="chartData">
          <VisGroupedBar
            :x="x"
            :y="y"
            :color="colors"
            :rounded-corners="4"
            bar-padding="0.1"
            group-padding="0"
          />
        </VisXYContainer>
      </ChartContainer>
    `,
  }),
};
