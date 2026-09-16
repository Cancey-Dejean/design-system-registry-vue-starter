<script setup lang="ts">
import { ChevronDown, Copy } from "@lucide/vue";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../Dropdown-menu";
import { ButtonGroup, ButtonGroupSeparator } from ".";
</script>

<template>
  <div class="flex flex-col gap-6">
    <ButtonGroup>
      <Button variant="outline">Copy Page</Button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="icon-md" variant="outline">
            <ChevronDown aria-hidden="true" />
            <span class="sr-only">Open page actions menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem>View as Markdown</DropdownMenuItem>
            <DropdownMenuItem>Open in v0</DropdownMenuItem>
            <DropdownMenuItem>Open in ChatGPT</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>

    <ButtonGroup>
      <Button variant="secondary" size="sm">
        <Copy aria-hidden="true" />
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">Paste</Button>
    </ButtonGroup>
  </div>
</template>
