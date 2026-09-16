<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import { ButtonGroup } from "@registry/components/Button-group/index.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@registry/components/Dropdown-menu/index.ts";
import {
  type DocsPageActionUrls,
  getDocsPageMarkdown,
  getPromptUrl,
  getV0RegistryItemUrl,
} from "~/lib/docs-page-actions";
import BrandIcon from "./BrandIcon.vue";
import CopyButton from "./CopyButton.vue";

const props = defineProps<
  DocsPageActionUrls & {
    class?: string;
  }
>();

interface MenuItem {
  label: string;
  icon: "markdown" | "v0" | "chatgpt" | "claude" | "perplexity";
  href: (urls: DocsPageActionUrls) => string | null;
}

const menuItems: readonly MenuItem[] = [
  {
    label: "View as Markdown",
    icon: "markdown",
    href: ({ markdownPath }) => markdownPath,
  },
  {
    label: "Open in v0",
    icon: "v0",
    href: ({ pageDescription, pageTitle, registryItemJsonUrl }) =>
      registryItemJsonUrl
        ? getV0RegistryItemUrl({
            prompt: pageDescription,
            registryItemJsonUrl,
            title: pageTitle,
          })
        : null,
  },
  {
    label: "Open in ChatGPT",
    icon: "chatgpt",
    href: ({ pageUrl }) => getPromptUrl("https://chatgpt.com", pageUrl),
  },
  {
    label: "Open in Claude",
    icon: "claude",
    href: ({ pageUrl }) => getPromptUrl("https://claude.ai/new", pageUrl),
  },
  {
    label: "Open in Perplexity",
    icon: "perplexity",
    href: ({ pageUrl }) => getPromptUrl("https://www.perplexity.ai/search", pageUrl),
  },
];

const resolvedItems = computed(() =>
  menuItems
    .map((item) => ({ ...item, href: item.href(props) }))
    .filter((item): item is MenuItem & { href: string } => Boolean(item.href)),
);
</script>

<template>
  <ButtonGroup :class="props.class">
    <CopyButton
      :value="() => getDocsPageMarkdown(markdownPath)"
      show-label
      copy-label="Copy Page"
      copied-label="Copied"
      variant="outline"
      size="md"
    />
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button size="icon-md" variant="outline">
          <ChevronDown aria-hidden="true" />
          <span class="sr-only">Open page actions menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-max min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem
            v-for="item in resolvedItems"
            :key="item.label"
            as-child
            class="cursor-pointer gap-2"
          >
            <a :href="item.href" target="_blank" rel="noopener noreferrer">
              <BrandIcon :name="item.icon" class="text-muted-foreground" />
              <span>{{ item.label }}</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
