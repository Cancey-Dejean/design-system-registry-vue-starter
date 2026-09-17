<script setup lang="ts">
import { Bubble, BubbleContent } from "../Bubble";
import { Message, MessageContent } from "../Message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from ".";

const messages = [
  {
    id: "1",
    role: "user" as const,
    text: "The scroll behavior in our chat feels jarring whenever the AI streams a reply.",
  },
  {
    id: "2",
    role: "assistant" as const,
    text: "Wrap your message list in MessageScroller and turn on autoScroll — the viewport pins to the bottom as tokens arrive.",
  },
  {
    id: "3",
    role: "user" as const,
    text: "What about when someone sends a brand new message?",
  },
  {
    id: "4",
    role: "assistant" as const,
    text: "MessageScrollerItem fixes that with turn anchoring — set scrollAnchor on the turn that should settle near the top.",
  },
  {
    id: "5",
    role: "user" as const,
    text: "And if I've scrolled up to re-read an older answer?",
  },
  {
    id: "6",
    role: "assistant" as const,
    text: "Auto-scroll only runs when the viewport is already pinned to the bottom, otherwise the jump-to-end button appears.",
  },
];
</script>

<template>
  <MessageScrollerProvider auto-scroll default-scroll-position="last-anchor">
    <MessageScroller class="h-72 w-full max-w-md rounded-xl border">
      <MessageScrollerViewport>
        <MessageScrollerContent class="gap-6 p-4">
          <MessageScrollerItem
            v-for="message in messages"
            :key="message.id"
            :message-id="message.id"
            :scroll-anchor="message.role === 'user'"
          >
            <Message :align="message.role === 'user' ? 'end' : 'start'">
              <MessageContent>
                <Bubble :variant="message.role === 'assistant' ? 'muted' : 'default'">
                  <BubbleContent>{{ message.text }}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  </MessageScrollerProvider>
</template>
