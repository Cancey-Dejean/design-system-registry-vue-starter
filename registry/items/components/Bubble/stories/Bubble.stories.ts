import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions, BUBBLE_VARIANTS } from "../";

const bubbleParts = {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
};

const meta = {
  title: "Components/Bubble",
  tags: ["autodocs"],
  component: Bubble,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-sm px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: BUBBLE_VARIANTS,
    },
    align: {
      control: "inline-radio",
      options: ["start", "end"],
    },
  },
  args: {
    variant: "default",
    align: "start",
  },
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic bubble with content and a reaction. */
export const Default: Story = {
  render: (args) => ({
    components: bubbleParts,
    setup: () => ({ args }),
    template: `
      <Bubble v-bind="args">
        <BubbleContent>I checked the registry output and removed the stale route.</BubbleContent>
        <BubbleReactions>
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
    `,
  }),
};

/** Outbound message aligned to the end. */
export const AlignEnd: Story = {
  args: {
    align: "end",
  },
  render: (args) => ({
    components: bubbleParts,
    setup: () => ({ args }),
    template: `
      <Bubble v-bind="args">
        <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
      </Bubble>
    `,
  }),
};

/** All visual variants. */
export const Variants: Story = {
  argTypes: {
    variant: { table: { disable: true } },
  },
  render: () => ({
    components: bubbleParts,
    setup: () => ({ variants: BUBBLE_VARIANTS }),
    template: `
      <div class="flex w-full flex-col gap-3">
        <Bubble v-for="variant in variants" :key="variant" :variant="variant">
          <BubbleContent>{{ variant }}</BubbleContent>
        </Bubble>
      </div>
    `,
  }),
};

/** Grouped inbound messages with reactions. */
export const Group: Story = {
  render: () => ({
    components: bubbleParts,
    template: `
      <BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            I can group messages, switch sides, and keep the whole thread easy to scan.
          </BubbleContent>
          <BubbleReactions role="img" aria-label="Reaction: thumbs up">
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
      </BubbleGroup>
    `,
  }),
};

/** Full thread matching the docs demo. */
export const Thread: Story = {
  render: () => ({
    components: bubbleParts,
    template: `
      <div class="flex w-full flex-col gap-8">
        <Bubble align="end">
          <BubbleContent>Hey there! what's up?</BubbleContent>
        </Bubble>
        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>
              I can group messages, switch sides, and keep the whole thread easy to scan.
            </BubbleContent>
            <BubbleReactions role="img" aria-label="Reaction: thumbs up">
              <span>👍</span>
            </BubbleReactions>
          </Bubble>
        </BubbleGroup>
        <Bubble align="end">
          <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
          </BubbleContent>
          <BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
            <span>👍</span>
            <span>🔥</span>
            <span>👀</span>
            <span>+2</span>
          </BubbleReactions>
        </Bubble>
      </div>
    `,
  }),
};
