---
name: attachment
type: registry:ui
title: Attachment
description: Displays a file, image, or upload as a card with media, title, description, and actions.
dependencies:
  - reka-ui
  - class-variance-authority
localRegistryDependencies:
  - button
files:
  - path: Attachment.variants.ts
    type: registry:ui
    target: components/ui/attachment/Attachment.variants.ts
  - path: Attachment.vue
    type: registry:ui
    target: components/ui/attachment/Attachment.vue
  - path: AttachmentAction.vue
    type: registry:ui
    target: components/ui/attachment/AttachmentAction.vue
  - path: AttachmentActions.vue
    type: registry:ui
    target: components/ui/attachment/AttachmentActions.vue
  - path: AttachmentContent.vue
    type: registry:ui
    target: components/ui/attachment/AttachmentContent.vue
  - path: AttachmentDescription.vue
    type: registry:ui
    target: components/ui/attachment/AttachmentDescription.vue
  - path: AttachmentGroup.vue
    type: registry:ui
    target: components/ui/attachment/AttachmentGroup.vue
  - path: AttachmentMedia.vue
    type: registry:ui
    target: components/ui/attachment/AttachmentMedia.vue
  - path: AttachmentTitle.vue
    type: registry:ui
    target: components/ui/attachment/AttachmentTitle.vue
  - path: AttachmentTrigger.vue
    type: registry:ui
    target: components/ui/attachment/AttachmentTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/attachment/index.ts
---

Use attachment to represent an uploaded or attachable file — in a chat composer, a file list, or
an upload queue. Set `state` to `"idle"`, `"uploading"`, `"processing"`, `"error"`, or `"done"` to
drive the built-in loading and error styling, and group several with `AttachmentGroup` for a
horizontally scrollable row.

```vue
<script setup lang="ts">
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { FileIcon, XIcon } from "@lucide/vue";
</script>

<template>
  <AttachmentGroup>
    <Attachment state="done">
      <AttachmentMedia>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>1.2 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove attachment">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </AttachmentGroup>
</template>
```

`AttachmentTrigger` overlays the whole card to make it clickable (for example, to open a preview),
and `AttachmentAction` reuses `Button`'s variants so actions like remove or retry stay consistent
with the rest of the design system.
