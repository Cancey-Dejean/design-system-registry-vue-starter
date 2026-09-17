---
name: chart
type: registry:ui
title: Chart
description: A themeable wrapper around Unovis for building bar, line, and area charts with tooltips and legends.
dependencies:
  - reka-ui
  - "@vueuse/core"
  - "@unovis/vue"
files:
  - path: Chart.context.ts
    type: registry:ui
    target: components/ui/chart/Chart.context.ts
  - path: Chart.types.ts
    type: registry:ui
    target: components/ui/chart/Chart.types.ts
  - path: ChartContainer.vue
    type: registry:ui
    target: components/ui/chart/ChartContainer.vue
  - path: ChartLegendContent.vue
    type: registry:ui
    target: components/ui/chart/ChartLegendContent.vue
  - path: ChartStyle.vue
    type: registry:ui
    target: components/ui/chart/ChartStyle.vue
  - path: ChartTooltipContent.vue
    type: registry:ui
    target: components/ui/chart/ChartTooltipContent.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/chart/index.ts
  - path: utils.ts
    type: registry:ui
    target: components/ui/chart/utils.ts
---

Use chart to visualize series data with consistent theming across light and dark mode. Define a
`ChartConfig` mapping each data key to a label and color, pass it to `ChartContainer`, and compose
the actual marks with [Unovis](https://unovis.dev/) components (`VisXYContainer`, `VisLine`,
`VisGroupedBar`, `VisAxis`, ...) inside it — `ChartContainer` only provides the theme CSS variables
and shared layout, it doesn't render marks itself.

```vue
<script setup lang="ts">
import { VisAxis, VisLine, VisXYContainer } from "@unovis/vue";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

const chartData = [
  { date: new Date("2024-01-01"), desktop: 186 },
  { date: new Date("2024-02-01"), desktop: 305 },
  { date: new Date("2024-03-01"), desktop: 237 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig;
</script>

<template>
  <ChartContainer :config="chartConfig" class="min-h-50 w-full">
    <VisXYContainer :data="chartData">
      <VisLine :x="(d) => d.date" :y="(d) => d.desktop" :color="chartConfig.desktop.color" />
      <VisAxis type="x" :x="(d) => d.date" />
    </VisXYContainer>
  </ChartContainer>
</template>
```

Add `ChartTooltipContent` with `VisTooltip`/`VisCrosshair` (re-exported here as `ChartTooltip`/
`ChartCrosshair`) for hover tooltips, and `ChartLegendContent` below the container for a legend —
`utils.ts`'s `componentToString` renders `ChartTooltipContent` to HTML for use as a crosshair
template, since Unovis tooltips expect a string, not a Vue component.
