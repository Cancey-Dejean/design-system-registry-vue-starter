<script setup lang="ts">
import { Input } from "../Input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from ".";
</script>

<template>
  <FieldGroup class="max-w-sm">
    <Field>
      <FieldLabel for="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@example.com" />
      <FieldDescription>We will never share your email.</FieldDescription>
    </Field>
  </FieldGroup>
</template>
