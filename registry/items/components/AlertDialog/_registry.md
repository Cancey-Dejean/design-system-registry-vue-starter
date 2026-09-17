---
name: alert-dialog
type: registry:ui
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
dependencies:
  - reka-ui
  - "@vueuse/core"
localRegistryDependencies:
  - button
files:
  - path: AlertDialog.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialog.vue
  - path: AlertDialogAction.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialogAction.vue
  - path: AlertDialogCancel.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialogCancel.vue
  - path: AlertDialogContent.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialogContent.vue
  - path: AlertDialogDescription.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialogDescription.vue
  - path: AlertDialogFooter.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialogFooter.vue
  - path: AlertDialogHeader.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialogHeader.vue
  - path: AlertDialogTitle.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialogTitle.vue
  - path: AlertDialogTrigger.vue
    type: registry:ui
    target: components/ui/alert-dialog/AlertDialogTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/alert-dialog/index.ts
---

Use alert dialog for destructive or otherwise irreversible actions that require explicit
confirmation before proceeding, such as deleting a resource. Unlike `Dialog`, it cannot be
dismissed by clicking outside or pressing escape, forcing the user to pick an explicit action.

```vue
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="destructive">Delete account</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

Built on [reka-ui's Alert Dialog](https://reka-ui.com/docs/components/alert-dialog). `AlertDialogAction`
and `AlertDialogCancel` reuse `Button`'s variants for consistent styling.
