<script setup lang="ts">
import { Card, CardContent } from "../Card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from ".";

const highlights = [
  { title: "Design tokens", detail: "Shared colors, spacing, and type across every component." },
  { title: "Accessible by default", detail: "Keyboard and screen reader support built in." },
  { title: "Themeable", detail: "Swap CSS variables to match any brand in minutes." },
  { title: "Copy & paste", detail: "Drop components straight into your app, no install step." },
];
</script>

<template>
  <Carousel class="w-full max-w-xs">
    <CarouselContent>
      <CarouselItem v-for="highlight in highlights" :key="highlight.title">
        <Card>
          <CardContent class="flex aspect-square flex-col justify-center gap-2 p-6 text-center">
            <p class="text-lg font-semibold">{{ highlight.title }}</p>
            <p class="text-muted-foreground text-sm">{{ highlight.detail }}</p>
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
