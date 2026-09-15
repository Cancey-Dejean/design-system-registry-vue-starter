<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue";
</script>

<template>
  <footer class="mt-10">
    <div
      class="mx-auto flex max-w-screen-2xl items-center justify-center px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8"
    >
      <a
        href="#/company-name"
        target="_blank"
        rel="noopener noreferrer"
        class="text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        Powered by <span class="font-bold underline">Company Name</span>
        <ArrowUpRight class="ml-px inline-block size-3 -translate-y-px" />
      </a>
    </div>
  </footer>
</template>
