<script setup lang="ts">
import { GitBranchIcon, SearchIcon } from "@lucide/vue";
import { Spinner } from "../Spinner";
import { Marker, MarkerContent, MarkerIcon } from ".";
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8">
    <Marker>
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent>Thinking...</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>Conversation compacted</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  </div>
</template>
