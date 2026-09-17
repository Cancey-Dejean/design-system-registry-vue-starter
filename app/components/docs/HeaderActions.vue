<script setup lang="ts">
import { Button } from "@registry/components/Button/index.ts";
import { registryConfig } from "~/lib/registry/config";
import AccentThemeToggle from "./AccentThemeToggle.vue";
import ThemeToggle from "./ThemeToggle.vue";
</script>

<template>
  <div class="flex items-center gap-1">
    <Button
      variant="ghost"
      size="icon-md"
      as="a"
      :href="registryConfig.storybookUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        viewBox="0 0 256 319"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
        class="size-4"
        aria-hidden="true"
      >
        <defs>
          <path
            d="M9.872 293.324.012 30.574C-.315 21.895 6.338 14.54 15.005 14L238.494.032c8.822-.552 16.42 6.153 16.972 14.975.02.332.031.665.031.998v286.314c0 8.839-7.165 16.004-16.004 16.004-.24 0-.48-.005-.718-.016l-213.627-9.595c-8.32-.373-14.963-7.065-15.276-15.388Z"
            id="storybook-icon-a"
          />
        </defs>
        <mask id="storybook-icon-b" fill="#fff">
          <use xlink:href="#storybook-icon-a" />
        </mask>
        <use fill="#FF4785" xlink:href="#storybook-icon-a" />
        <path
          d="m188.665 39.127 1.527-36.716L220.884 0l1.322 37.863a2.387 2.387 0 0 1-3.864 1.96l-11.835-9.325-14.013 10.63a2.387 2.387 0 0 1-3.829-2.001Zm-39.251 80.853c0 6.227 41.942 3.243 47.572-1.131 0-42.402-22.752-64.684-64.415-64.684-41.662 0-65.005 22.628-65.005 56.57 0 59.117 79.78 60.249 79.78 92.494 0 9.052-4.433 14.426-14.184 14.426-12.705 0-17.729-6.49-17.138-28.552 0-4.786-48.458-6.278-49.936 0-3.762 53.466 29.548 68.887 67.665 68.887 36.935 0 65.892-19.687 65.892-55.326 0-63.36-80.961-61.663-80.961-93.06 0-12.728 9.455-14.425 15.07-14.425 5.909 0 16.546 1.042 15.66 24.801Z"
          fill="#FFF"
          mask="url(#storybook-icon-b)"
        />
      </svg>
      <span class="sr-only">Storybook</span>
    </Button>
    <Button
      variant="ghost"
      size="icon-md"
      as="a"
      :href="registryConfig.repositoryUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
        <path
          d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.108-.775.418-1.305.762-1.605c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.23c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.23 3.297-1.23c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.91 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222c0 1.606-.014 2.898-.014 3.293c0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
      <span class="sr-only">GitHub</span>
    </Button>
    <AccentThemeToggle />
    <ThemeToggle />
  </div>
</template>
