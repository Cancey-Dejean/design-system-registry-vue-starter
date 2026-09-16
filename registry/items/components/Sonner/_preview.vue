<script setup lang="ts">
import "vue-sonner/style.css";
import { toast } from "vue-sonner";
import { Button } from "../Button";
import { Toaster } from ".";
</script>

<template>
  <Toaster />
  <Button
    variant="outline"
    @click="
      () =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => {},
          },
        })
    "
  >
    Add to calendar
  </Button>
</template>
