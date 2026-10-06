<script setup lang="ts">
import { SearchIcon, TableIcon } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@registry/components/Dialog/index.ts";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@registry/components/InputGroup/index.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@registry/components/Table/index.ts";
import { cn } from "cn";
import { flowSidebarScrollClassName } from "~/lib/flows/flow-canvas";
import type { RegistryFlowItem, RegistryFlowProp } from "~/lib/registry/flow-data";

const props = defineProps<{ item: RegistryFlowItem }>();

const query = ref("");

const rows = computed<RegistryFlowProp[]>(() => [
  ...props.item.api.variants.map((variant) => ({
    name: variant.name,
    optional: true,
    type: variant.options.map((option) => `"${option}"`).join(" | "),
    defaultValue: variant.defaultValue === undefined ? undefined : `"${variant.defaultValue}"`,
  })),
  ...props.item.api.props,
]);

const visibleRows = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase();

  return normalizedQuery
    ? rows.value.filter((row) => row.name.toLowerCase().includes(normalizedQuery))
    : rows.value;
});

function onOpenChange(open: boolean) {
  if (!open) {
    query.value = "";
  }
}
</script>

<template>
  <Dialog @update:open="onOpenChange">
    <DialogTrigger as-child>
      <Button size="sm" class="mt-2 h-7 self-start px-2.5">
        <TableIcon class="size-3.5!" />
        Detailed list
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle class="font-mono">
          {{ `<${item.api.component ?? item.title}>` }} props
        </DialogTitle>
        <DialogDescription>
          Every variant and prop {{ item.title }} declares, with its type and default value.
        </DialogDescription>
      </DialogHeader>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          v-model="query"
          placeholder="Search props…"
          aria-label="Search props by name"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText aria-live="polite" class="font-mono text-xs tabular-nums">
            {{ visibleRows.length }}/{{ rows.length }}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <div class="overflow-hidden rounded-lg border">
        <Table class="table-fixed font-mono text-xs">
          <colgroup>
            <col class="w-48" />
            <col />
            <col class="w-36" />
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div :class="cn('max-h-[50svh] overflow-y-auto', flowSidebarScrollClassName)">
          <Table class="table-fixed font-mono text-xs">
            <colgroup>
              <col class="w-48" />
              <col />
              <col class="w-36" />
            </colgroup>
            <TableBody>
              <TableRow v-if="visibleRows.length === 0" class="hover:bg-transparent">
                <TableCell colspan="3" class="py-6 text-center font-sans text-muted-foreground">
                  No props match “{{ query.trim() }}”.
                </TableCell>
              </TableRow>
              <TableRow v-for="row in visibleRows" :key="row.name">
                <TableCell class="align-top font-medium">
                  {{ row.name }}<span v-if="row.optional" class="text-muted-foreground">?</span>
                  <span v-else class="ml-1.5 font-sans text-[10px] text-muted-foreground uppercase">
                    required
                  </span>
                </TableCell>
                <TableCell class="align-top break-words whitespace-normal text-muted-foreground">
                  {{ row.type }}
                </TableCell>
                <TableCell class="align-top break-words whitespace-normal">
                  <template v-if="row.defaultValue !== undefined">{{ row.defaultValue }}</template>
                  <span v-else class="text-muted-foreground">—</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
