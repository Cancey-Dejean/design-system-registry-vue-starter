---
name: message-scroller
type: registry:ui
title: Message Scroller
description: An auto-scrolling viewport for chat-style message lists that tracks the live edge and lets users scroll away and back.
dependencies:
  - "@lucide/vue"
localRegistryDependencies:
  - button
files:
  - path: MessageScroller.vue
    type: registry:ui
    target: components/ui/message-scroller/MessageScroller.vue
  - path: MessageScrollerButton.vue
    type: registry:ui
    target: components/ui/message-scroller/MessageScrollerButton.vue
  - path: MessageScrollerContent.vue
    type: registry:ui
    target: components/ui/message-scroller/MessageScrollerContent.vue
  - path: MessageScrollerItem.vue
    type: registry:ui
    target: components/ui/message-scroller/MessageScrollerItem.vue
  - path: MessageScrollerProvider.vue
    type: registry:ui
    target: components/ui/message-scroller/MessageScrollerProvider.vue
  - path: MessageScrollerViewport.vue
    type: registry:ui
    target: components/ui/message-scroller/MessageScrollerViewport.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/message-scroller/index.ts
  - path: useMessageScroller.ts
    type: registry:ui
    target: components/ui/message-scroller/useMessageScroller.ts
---

Use message scroller to wrap a chat or feed-style list that should auto-follow new content while the
reader is at the bottom, but stay put the moment they scroll away. Wrap the list in `MessageScrollerProvider`,
render items inside `MessageScrollerViewport` > `MessageScrollerContent`, and mark each row with
`MessageScrollerItem` so the engine can measure and anchor around it.

```vue
<script setup lang="ts">
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

const messages = [
  { id: "1", text: "Hey, are you around?" },
  { id: "2", text: "Just pushed the new build." },
];
</script>

<template>
  <MessageScrollerProvider auto-scroll default-scroll-position="end">
    <MessageScroller class="h-96 rounded-lg border">
      <MessageScrollerViewport>
        <MessageScrollerContent>
          <MessageScrollerItem v-for="message in messages" :key="message.id" :message-id="message.id">
            {{ message.text }}
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
```

`MessageScrollerButton` reads scroll state from context and fades itself out when the corresponding edge
isn't scrollable, so it can be dropped in without extra wiring. The `useMessageScroller` composable exposes
`scrollToEnd`, `scrollToStart`, and `scrollToMessage` for imperative control from outside the template.
