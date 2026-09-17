<script setup lang="ts">
import { CalendarDaysIcon } from "@lucide/vue";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { Button } from "../Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from ".";
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Button variant="ghost">@nuxt</Button>
    </HoverCardTrigger>
    <HoverCardContent class="w-80">
      <div class="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" alt="@nuxt" />
          <AvatarFallback>NX</AvatarFallback>
        </Avatar>
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">@nuxt</h4>
          <p class="text-sm">The Vue Framework – The Progressive Web Framework.</p>
          <div class="flex items-center pt-2">
            <CalendarDaysIcon class="mr-2 size-4 opacity-70" />
            <span class="text-xs text-muted-foreground"> Joined December 2021 </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
