---
name: field
type: registry:ui
title: Field
description: Combine labels, controls, descriptions, and errors into accessible form fields.
dependencies:
  - class-variance-authority
localRegistryDependencies:
  - label
  - separator
files:
  - path: Field.vue
    type: registry:ui
    target: components/ui/field/Field.vue
  - path: FieldContent.vue
    type: registry:ui
    target: components/ui/field/FieldContent.vue
  - path: FieldDescription.vue
    type: registry:ui
    target: components/ui/field/FieldDescription.vue
  - path: FieldError.vue
    type: registry:ui
    target: components/ui/field/FieldError.vue
  - path: FieldGroup.vue
    type: registry:ui
    target: components/ui/field/FieldGroup.vue
  - path: FieldLabel.vue
    type: registry:ui
    target: components/ui/field/FieldLabel.vue
  - path: FieldLegend.vue
    type: registry:ui
    target: components/ui/field/FieldLegend.vue
  - path: FieldSeparator.vue
    type: registry:ui
    target: components/ui/field/FieldSeparator.vue
  - path: FieldSet.vue
    type: registry:ui
    target: components/ui/field/FieldSet.vue
  - path: FieldTitle.vue
    type: registry:ui
    target: components/ui/field/FieldTitle.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/field/index.ts
---

Use field primitives to structure form controls with consistent labels, help text, and validation
errors.

```vue
<script setup lang="ts">
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
</script>

<template>
  <FieldGroup>
    <Field>
      <FieldLabel for="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@example.com" />
      <FieldDescription>We will never share your email.</FieldDescription>
    </Field>
  </FieldGroup>
</template>
```

Orientations: `vertical` (default), `horizontal`, and `responsive` (stacks until the
`@md/field-group` breakpoint). Use `FieldError` with an `errors` prop for form libraries, or pass
children. `FieldSet` + `FieldLegend` group related controls; `FieldSeparator` divides sections.
