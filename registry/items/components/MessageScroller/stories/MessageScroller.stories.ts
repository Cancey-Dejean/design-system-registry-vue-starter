import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { computed, ref } from "vue";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import { Button } from "@registry/components/Button";
import { Message, MessageContent } from "@registry/components/Message";
import {
  MessageScrollerProvider,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
  MessageScroller,
} from "@registry/components/MessageScroller";
import { Bubble, BubbleContent } from "@registry/components/Bubble";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const scrollerParts = {
  Bubble,
  BubbleContent,
  Button,
  Message,
  MessageContent,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
};

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    text: "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.",
  },
  {
    id: "2",
    role: "assistant",
    text: "That's the classic streaming scroll problem. Wrap your message list in MessageScroller and turn on autoScroll — the viewport pins to the bottom as tokens arrive.",
  },
  {
    id: "3",
    role: "user",
    text: "Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top.",
  },
  {
    id: "4",
    role: "assistant",
    text: "MessageScrollerItem fixes that with turn anchoring. Set scrollAnchor on the turn that should settle near the top instead of blindly snapping to the document bottom.",
  },
  {
    id: "5",
    role: "user",
    text: "And if they've scrolled up to re-read an older answer? I don't want to yank them back down.",
  },
  {
    id: "6",
    role: "assistant",
    text: "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom. When there is unseen content, MessageScrollerButton appears so one tap jumps back to the newest message.",
  },
  {
    id: "7",
    role: "user",
    text: "Last one — does this work with assistive tech?",
  },
  {
    id: "8",
    role: "assistant",
    text: 'MessageScrollerContent sets role="log" and aria-relevant="additions" by default, so screen readers announce new messages as they stream in.',
  },
];

const scriptedMessages: ChatMessage[] = [
  {
    id: "script-1",
    role: "user",
    text: "Can you show me how anchoring behaves when a new prompt starts the turn?",
  },
  {
    id: "script-2",
    role: "assistant",
    text: "Append the user prompt first, then the assistant response. With scrollAnchor on user rows, the prompt settles near the top and the reply fills in below.",
  },
  {
    id: "script-3",
    role: "user",
    text: "What if I scroll up while new messages arrive?",
  },
  {
    id: "script-4",
    role: "assistant",
    text: "Auto-scroll pauses. Use the jump button when you're ready to follow the live edge again.",
  },
  {
    id: "script-5",
    role: "user",
    text: "Perfect — ship it.",
  },
  {
    id: "script-6",
    role: "assistant",
    text: "You're set. Keep the provider height-bounded and compose Message / Bubble inside each item.",
  },
];

const meta = {
  title: "Components/Message Scroller",
  tags: ["autodocs"],
  component: MessageScroller,
  parameters: {
    layout: "padded",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='w-full max-w-md px-4'><story /></StorybookWrapperSimple>`,
    }),
  ],
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Bounded chat transcript with turn anchors and jump-to-end control. */
export const Default: Story = {
  render: () => ({
    components: scrollerParts,
    setup: () => ({ messages: sampleMessages }),
    template: /* html */ `
      <MessageScrollerProvider auto-scroll default-scroll-position="last-anchor">
        <MessageScroller class="h-96 w-full rounded-xl border">
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
    `,
  }),
};

/** Append scripted turns to exercise auto-scroll and the jump button. */
export const Interactive: Story = {
  render: () => ({
    components: scrollerParts,
    setup() {
      const messages = ref<ChatMessage[]>([]);
      const index = ref(0);
      const nextMessage = computed(() => scriptedMessages[index.value] ?? null);

      function send() {
        const next = nextMessage.value;
        if (!next) return;
        messages.value = [...messages.value, next];
        index.value += 1;
      }

      function reset() {
        messages.value = [];
        index.value = 0;
      }

      return { messages, nextMessage, send, reset };
    },
    template: /* html */ `
      <div class="flex w-full flex-col gap-3">
        <MessageScrollerProvider auto-scroll default-scroll-position="last-anchor">
          <MessageScroller class="h-96 w-full rounded-xl border">
            <MessageScrollerViewport>
              <MessageScrollerContent class="gap-6 p-4">
                <p
                  v-if="messages.length === 0"
                  class="text-muted-foreground py-12 text-center text-sm"
                >
                  Press send to add the next scripted turn.
                </p>
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
        <div class="flex gap-2">
          <Button class="flex-1" :disabled="!nextMessage" @click="send">
            {{ nextMessage ? "Send next" : "No more messages" }}
          </Button>
          <Button variant="outline" :disabled="messages.length === 0" @click="reset">
            Reset
          </Button>
        </div>
      </div>
    `,
  }),
};
