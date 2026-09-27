<script setup lang="ts">
import { Button } from "@registry/components/Button";
import Heading from "@registry/components/Heading/Heading.vue";
import { Logo } from "@registry/components/Logos";
import { registryConfig } from "~/lib/registry/config";
</script>

<template>
  <div class="flex h-dvh flex-1 flex-col items-center justify-center px-4 py-24 sm:py-32">
    <div class="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
      <!-- <h1 class="font-mono text-2xl font-bold tracking-tighter sm:text-3xl">
        {{ registryConfig.name }}
      </h1> -->
      <Heading size="3xl" class="shimmer">
        {{ registryConfig.name }}
      </Heading>
      <p class="max-w-lg text-base text-muted-foreground">{{ registryConfig.description }}</p>
      <div class="flex items-center gap-3">
        <Button size="lg" as-child>
          <NuxtLink to="/components"> Browse </NuxtLink>
        </Button>
        <Button
          variant="outline"
          size="lg"
          as="a"
          :href="registryConfig.storybookUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo logo="storybook" />
          Storybook
        </Button>
      </div>
    </div>
  </div>
</template>
