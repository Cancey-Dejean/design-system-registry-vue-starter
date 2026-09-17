<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from ".";

const components = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Tooltip",
    href: "#",
    description: "A popup that displays information when an element receives focus or hover.",
  },
];
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[300px] gap-2 p-1">
            <li v-for="component in components" :key="component.title">
              <NavigationMenuLink as-child>
                <a :href="component.href">
                  <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                  <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    {{ component.description }}
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink as-child>
          <a :class="navigationMenuTriggerStyle()" href="#">Documentation</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
