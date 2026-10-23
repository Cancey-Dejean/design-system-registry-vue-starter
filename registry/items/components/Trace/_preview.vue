<script setup lang="ts">
import { Check, Search, Terminal } from "@lucide/vue";
import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
} from ".";
</script>

<template>
  <Trace class="max-w-lg">
    <TraceLine
      ><TraceIcon><Check /></TraceIcon><TraceTitle>Read the project files</TraceTitle
      ><TraceDescription>12 files</TraceDescription></TraceLine
    >
    <TraceLine status="running"
      ><TraceIcon><Search /></TraceIcon><TraceTitle>Searching the registry</TraceTitle></TraceLine
    >
    <TraceCollapsible>
      <TraceCollapsibleTrigger
        ><TraceLine
          ><TraceIcon><Terminal /></TraceIcon><TraceTitle>Ran the test suite</TraceTitle></TraceLine
        ></TraceCollapsibleTrigger
      >
      <TraceCollapsibleContent
        >All checks passed. Open this panel to inspect the result.</TraceCollapsibleContent
      >
    </TraceCollapsible>
    <TraceLine status="pending"
      ><TraceIcon><Terminal /></TraceIcon><TraceTitle>Waiting to publish</TraceTitle></TraceLine
    >
  </Trace>
</template>
