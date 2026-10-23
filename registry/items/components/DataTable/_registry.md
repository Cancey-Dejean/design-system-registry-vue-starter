---
name: data-table
type: registry:ui
title: Data Table
description: A reusable data table with sorting, filtering, column visibility, row selection, and pagination.
dependencies:
  - "@tanstack/vue-table@^8.21.3"
  - "@lucide/vue"
localRegistryDependencies:
  - table
  - button
  - checkbox
  - dropdown-menu
  - input
files:
  - path: DataTable.vue
    type: registry:ui
    target: components/ui/data-table/DataTable.vue
  - path: useDataTable.ts
    type: registry:ui
    target: components/ui/data-table/useDataTable.ts
  - path: index.ts
    type: registry:ui
    target: components/ui/data-table/index.ts
---

Pass typed TanStack Table v8 column definitions and your data to `DataTable`. Text column headers become sortable controls; custom headers and cell renderers remain supported. The default toolbar filters the `email` column and provides column visibility controls. Pagination defaults to ten rows.

```vue
<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import { DataTable } from "@/components/ui/data-table";

type Customer = { id: string; name: string; email: string };
const columns: ColumnDef<Customer>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];
const customers: Customer[] = [
  { id: "ada", name: "Ada", email: "ada@example.com" },
  { id: "ben", name: "Ben", email: "ben@example.com" },
];
</script>

<template>
  <DataTable
    :columns="columns"
    :data="customers"
    :get-row-id="(row) => row.id"
    enable-row-selection
  />
</template>
```

Set `filter-column-id` to another column ID and `filter-placeholder` to its visible label. Enable `enable-global-filter` to search all filterable columns instead. `show-toolbar`, `show-pagination`, `show-selection-count`, and `show-column-visibility` control the built-in UI. `initial-page-size` sets the starting page size. Use stable `get-row-id` values when rows can be reordered or replaced so selection follows the same record.

Use named `header-{columnId}` and `cell-{columnId}` slots to customize rendered content, or replace the `toolbar`, `footer`, and `empty` slots. Each receives the TanStack `table`; header and cell slots also receive their `header` or `cell` and `row` context. A component template ref exposes `table` for reading selected rows and controlling table state. The exported `useDataTable` composable provides the same sorting, column filtering, global filtering, visibility, selection, and pagination state when you need custom markup.

This Vue port uses `@tanstack/vue-table` v8, so use its `ColumnDef<TData>` API. React's v9 feature-registration and column-helper types are framework/version-specific and are not interchangeable with this component's definitions.
