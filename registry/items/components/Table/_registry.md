---
name: table
type: registry:ui
title: Table
description: A responsive table component for displaying tabular data.
dependencies:
  - "@tanstack/vue-table"
files:
  - path: Table.vue
    type: registry:ui
    target: components/ui/table/Table.vue
  - path: TableBody.vue
    type: registry:ui
    target: components/ui/table/TableBody.vue
  - path: TableCaption.vue
    type: registry:ui
    target: components/ui/table/TableCaption.vue
  - path: TableCell.vue
    type: registry:ui
    target: components/ui/table/TableCell.vue
  - path: TableEmpty.vue
    type: registry:ui
    target: components/ui/table/TableEmpty.vue
  - path: TableFooter.vue
    type: registry:ui
    target: components/ui/table/TableFooter.vue
  - path: TableHead.vue
    type: registry:ui
    target: components/ui/table/TableHead.vue
  - path: TableHeader.vue
    type: registry:ui
    target: components/ui/table/TableHeader.vue
  - path: TableRow.vue
    type: registry:ui
    target: components/ui/table/TableRow.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/table/index.ts
  - path: utils.ts
    type: registry:ui
    target: components/ui/table/utils.ts
---

Compose a table from the primitive parts below for simple, static tabular data. `TableEmpty`
renders a full-width row for empty states, and `utils.ts` exports a `valueUpdater` helper for
wiring up `@tanstack/vue-table`'s reactive state when you need sorting, filtering, or pagination.

```vue
<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
];
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in invoices" :key="row.invoice">
        <TableCell>{{ row.invoice }}</TableCell>
        <TableCell>{{ row.status }}</TableCell>
        <TableCell>{{ row.method }}</TableCell>
        <TableCell class="text-right">{{ row.amount }}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan="3">Total</TableCell>
        <TableCell class="text-right">$400.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>
```
