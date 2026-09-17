---
name: form
type: registry:ui
title: Form
description: Composable, validated form fields built on vee-validate with labels and error messages.
dependencies:
  - reka-ui
  - vee-validate
localRegistryDependencies:
  - label
files:
  - path: FormControl.vue
    type: registry:ui
    target: components/ui/form/FormControl.vue
  - path: FormDescription.vue
    type: registry:ui
    target: components/ui/form/FormDescription.vue
  - path: FormItem.vue
    type: registry:ui
    target: components/ui/form/FormItem.vue
  - path: FormLabel.vue
    type: registry:ui
    target: components/ui/form/FormLabel.vue
  - path: FormMessage.vue
    type: registry:ui
    target: components/ui/form/FormMessage.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/form/index.ts
  - path: injectionKeys.ts
    type: registry:ui
    target: components/ui/form/injectionKeys.ts
  - path: useFormField.ts
    type: registry:ui
    target: components/ui/form/useFormField.ts
---

Use these primitives to build accessible forms with per-field validation state — `FormField`
(re-exported from vee-validate) drives each field's context, and `FormLabel`/`FormMessage` read
error and id state from it automatically via `useFormField`. Pair with `@vee-validate/zod` for
schema validation.

```vue
<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, "Username must be at least 2 characters."),
  }),
);

function onSubmit(values: Record<string, unknown>) {
  console.log(values);
}
</script>

<template>
  <Form :validation-schema="formSchema" class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Submit</Button>
  </Form>
</template>
```
