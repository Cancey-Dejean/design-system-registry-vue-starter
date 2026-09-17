<script setup lang="ts">
import { Bubble, BubbleContent, BubbleReactions } from ".";
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <Bubble variant="muted">
      <BubbleContent>I checked the registry output and removed the stale route.</BubbleContent>
      <BubbleReactions role="img" aria-label="Reaction: thumbs up">
        <span>👍</span>
      </BubbleReactions>
    </Bubble>
    <Bubble align="end">
      <BubbleContent>Nice catch. Ship it whenever you are ready.</BubbleContent>
    </Bubble>
  </div>
</template>
