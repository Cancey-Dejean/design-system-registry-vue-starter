<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from ".";
</script>

<template>
  <Select>
    <SelectTrigger class="w-56">
      <SelectValue placeholder="Select a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Frameworks</SelectLabel>
        <SelectItem value="nuxt">Nuxt</SelectItem>
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="sveltekit">SvelteKit</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
        <SelectItem value="remix">Remix</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
