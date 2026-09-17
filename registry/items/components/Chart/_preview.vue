<script setup lang="ts">
import type { ChartConfig } from ".";
import { VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue";
import {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from ".";

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
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const x = (d: Data) => d.date;
const y = [(d: Data) => d.desktop, (d: Data) => d.mobile];
const colors = [chartConfig.desktop.color, chartConfig.mobile.color];
const tickValues = chartData.map((d) => d.date);
const emptyTick = () => "";

function formatMonth(d: number) {
  return new Date(d).toLocaleDateString("en-US", { month: "short" });
}

function formatLongMonth(d: number | Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "long" });
}
</script>

<template>
  <ChartContainer :config="chartConfig" class="min-h-50 w-full">
    <VisXYContainer :data="chartData">
      <VisGroupedBar :x="x" :y="y" :color="colors" :rounded-corners="4" bar-padding="0.1" group-padding="0" />
      <VisAxis
        type="x"
        :x="x"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
        :tick-format="formatMonth"
        :tick-values="tickValues"
      />
      <VisAxis type="y" :tick-format="emptyTick" :tick-line="false" :domain-line="false" :grid-line="true" />
      <ChartTooltip />
      <ChartCrosshair
        :template="
          componentToString(chartConfig, ChartTooltipContent, {
            labelFormatter: formatLongMonth,
          })
        "
        :color="colors"
      />
    </VisXYContainer>
    <ChartLegendContent />
  </ChartContainer>
</template>
