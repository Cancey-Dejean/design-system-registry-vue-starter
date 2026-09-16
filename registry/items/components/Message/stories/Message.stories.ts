import type { Meta, StoryObj } from "@storybook/vue3-vite"
import {
  CopyIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@lucide/vue"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { Button } from "../../Button"
import { Marker, MarkerContent } from "../../Marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from ".."
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../../Bubble"
import { Avatar, AvatarFallback, AvatarImage } from "../../Avatar"

const messageParts = {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
  Button,
  CopyIcon,
  Marker,
  MarkerContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
}

const meta = {
  title: "Components/Message",
  tags: ["autodocs"],
  component: Message,
  parameters: {
    layout: "padded",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-sm px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

/** Conversation thread with avatars, groups, reactions, and typing marker. */
export const Default: Story = {
  render: () => ({
    components: messageParts,
    template: `
      <div class="flex w-full max-w-sm flex-col gap-6 py-4">
        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@me" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble>
              <BubbleContent>Deploying to prod real quick.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" alt="@rabbit" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>It's 4:55 PM. On a Friday.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@me" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble>
              <BubbleContent>It's a one-line change.</BubbleContent>
            </Bubble>
            <MessageFooter>Delivered</MessageFooter>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" alt="@rabbit" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <BubbleGroup>
              <Bubble variant="muted">
                <BubbleContent>It's always a one-line change 😭.</BubbleContent>
              </Bubble>
              <Bubble variant="muted">
                <BubbleContent>Alright, let me take a look.</BubbleContent>
                <BubbleReactions aria-label="Reactions: thumbs up">
                  <span>👍</span>
                </BubbleReactions>
              </Bubble>
            </BubbleGroup>
          </MessageContent>
        </Message>
        <Marker role="status">
          <MarkerContent class="shimmer">
            <span class="font-medium">Oliver</span> is typing...
          </MarkerContent>
        </Marker>
      </div>
    `,
  }),
}

/** Stacked messages from the same sender with spacer avatars. */
export const Group: Story = {
  render: () => ({
    components: messageParts,
    template: `
      <div class="flex w-full max-w-sm flex-col gap-6 py-4">
        <MessageGroup>
          <Message>
            <MessageAvatar />
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
      </div>
    `,
  }),
}

/** Sender name header and delivery status footer. */
export const HeaderAndFooter: Story = {
  render: () => ({
    components: messageParts,
    template: `
      <div class="flex w-full max-w-sm flex-col gap-8 py-4">
        <Message>
          <MessageContent>
            <MessageHeader>Olivia</MessageHeader>
            <Bubble variant="muted">
              <BubbleContent>I already checked the logs.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>
                Send the report to the team. Ping @shadcn if you need help.
              </BubbleContent>
            </Bubble>
            <MessageFooter>
              <div>
                Read <span class="font-normal">Yesterday</span>
              </div>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>
    `,
  }),
}

/** Footer action buttons for copy, feedback, and retry. */
export const Actions: Story = {
  render: () => ({
    components: messageParts,
    template: `
      <div class="flex w-full max-w-sm flex-col gap-8 py-4">
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                The install failure is coming from the workspace package.
              </BubbleContent>
            </Bubble>
            <MessageFooter>
              <Button variant="ghost" size="icon-sm" icon aria-label="Copy" title="Copy">
                <CopyIcon />
              </Button>
              <Button variant="ghost" size="icon-sm" icon aria-label="Like" title="Like">
                <ThumbsUpIcon />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                icon
                aria-label="Dislike"
                title="Dislike"
              >
                <ThumbsDownIcon />
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
            </Bubble>
            <MessageFooter class="gap-2">
              <span class="font-normal text-destructive">Failed to send</span>
              <Button
                variant="ghost"
                size="icon-sm"
                icon
                title="Retry"
                aria-label="Retry"
              >
                <RefreshCcwIcon />
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>
    `,
  }),
}
