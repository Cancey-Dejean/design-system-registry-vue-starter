<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { Bubble, BubbleContent } from "../Bubble";
import { Message, MessageAvatar, MessageContent, MessageFooter } from ".";
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
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
  </div>
</template>
