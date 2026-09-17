---
name: message
type: registry:ui
title: Message
description: A chat message layout primitive with avatar, header, content, and footer slots.
dependencies:
  - reka-ui
files:
  - path: Message.vue
    type: registry:ui
    target: components/ui/message/Message.vue
  - path: MessageAvatar.vue
    type: registry:ui
    target: components/ui/message/MessageAvatar.vue
  - path: MessageContent.vue
    type: registry:ui
    target: components/ui/message/MessageContent.vue
  - path: MessageFooter.vue
    type: registry:ui
    target: components/ui/message/MessageFooter.vue
  - path: MessageGroup.vue
    type: registry:ui
    target: components/ui/message/MessageGroup.vue
  - path: MessageHeader.vue
    type: registry:ui
    target: components/ui/message/MessageHeader.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/message/index.ts
---

Use `Message` to build chat and conversation UIs. Set `align="end"` to flip a message to the opposite
side (typically the current user), and group consecutive messages from the same sender with
`MessageGroup`.

```vue
<script setup lang="ts">
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
</script>

<template>
  <Message align="end">
    <MessageAvatar>
      <img src="/avatar.png" alt="User avatar" />
    </MessageAvatar>
    <MessageContent>
      <MessageHeader>You</MessageHeader>
      <p>Sounds good, let's ship it.</p>
    </MessageContent>
  </Message>
</template>
```
