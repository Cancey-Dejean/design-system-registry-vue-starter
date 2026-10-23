<script setup lang="ts" generic="TData extends RowData, TValue = unknown">
import type { ColumnDef, RowData, TableOptions } from "@tanstack/vue-table";
import { FlexRender } from "@tanstack/vue-table";
import { ArrowUpDown } from "@lucide/vue";
import { computed } from "vue";
import { Button } from "#registry-ui/Button";
import { Checkbox } from "#registry-ui/Checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "#registry-ui/DropdownMenu";
import { Input } from "#registry-ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#registry-ui/Table";
import { useDataTable } from "./useDataTable";

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterColumnId?: string;
    filterPlaceholder?: string;
    showToolbar?: boolean;
    showPagination?: boolean;
    showSelectionCount?: boolean;
    showColumnVisibility?: boolean;
    initialPageSize?: number;
    enableGlobalFilter?: boolean;
    enableRowSelection?: boolean;
    getRowId?: TableOptions<TData>["getRowId"];
    emptyMessage?: string;
  }>(),
  {
    filterColumnId: "email",
    filterPlaceholder: "Filter emails…",
    showToolbar: true,
    showPagination: true,
    showSelectionCount: true,
    showColumnVisibility: true,
    initialPageSize: 10,
    enableGlobalFilter: false,
    enableRowSelection: false,
    emptyMessage: "No results.",
  },
);
const table = useDataTable<TData, TValue>({
  data: () => props.data,
  columns: () => props.columns,
  initialPageSize: props.initialPageSize,
  getRowId: props.getRowId,
});
const filterColumn = computed(() =>
  table.getAllLeafColumns().find((column) => column.id === props.filterColumnId),
);
const filterValue = computed(() =>
  String(
    (props.enableGlobalFilter
      ? table.getState().globalFilter
      : filterColumn.value?.getFilterValue()) ?? "",
  ),
);
const hideableColumns = computed(() =>
  table.getAllLeafColumns().filter((column) => column.getCanHide()),
);
function setFilterValue(value: string | number) {
  if (props.enableGlobalFilter) table.setGlobalFilter(String(value));
  else filterColumn.value?.setFilterValue(String(value));
}
defineExpose({ table });
</script>

<template>
  <div class="w-full" data-slot="data-table">
    <div v-if="showToolbar" class="flex flex-wrap items-center gap-2 py-4">
      <slot name="toolbar" :table="table">
        <Input
          v-if="enableGlobalFilter || filterColumn"
          :model-value="filterValue"
          :placeholder="filterPlaceholder"
          :aria-label="filterPlaceholder"
          class="max-w-sm"
          @update:model-value="setFilterValue"
        />
        <DropdownMenu v-if="showColumnVisibility && hideableColumns.length">
          <DropdownMenuTrigger as-child
            ><Button variant="outline" class="ml-auto">Columns</Button></DropdownMenuTrigger
          >
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                v-for="column in hideableColumns"
                :key="column.id"
                :model-value="column.getIsVisible()"
                @update:model-value="column.toggleVisibility($event === true)"
              >
                {{
                  typeof column.columnDef.header === "string" ? column.columnDef.header : column.id
                }}
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </slot>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="group in table.getHeaderGroups()" :key="group.id">
            <TableHead
              v-if="enableRowSelection && group.depth === 0"
              :rowspan="table.getHeaderGroups().length"
            >
              <Checkbox
                :model-value="
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && 'indeterminate')
                "
                aria-label="Select all rows on this page"
                @update:model-value="table.toggleAllPageRowsSelected($event === true)"
              />
            </TableHead>
            <TableHead
              v-for="header in group.headers"
              :key="header.id"
              :colspan="header.colSpan"
              :aria-sort="
                header.column.getIsSorted() === 'asc'
                  ? 'ascending'
                  : header.column.getIsSorted() === 'desc'
                    ? 'descending'
                    : undefined
              "
            >
              <slot
                v-if="!header.isPlaceholder"
                :name="`header-${header.column.id}`"
                :header="header"
                :table="table"
              >
                <Button
                  v-if="
                    typeof header.column.columnDef.header === 'string' && header.column.getCanSort()
                  "
                  variant="ghost"
                  size="sm"
                  @click="header.column.toggleSorting()"
                >
                  {{ header.column.columnDef.header }}<ArrowUpDown data-icon="inline-end" />
                </Button>
                <FlexRender
                  v-else
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </slot>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-if="enableRowSelection"
              ><Checkbox
                :model-value="row.getIsSelected()"
                :disabled="!row.getCanSelect()"
                :aria-label="`Select row ${row.id}`"
                @update:model-value="row.toggleSelected($event === true)"
            /></TableCell>
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <slot :name="`cell-${cell.column.id}`" :cell="cell" :row="row" :table="table"
                ><FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"
              /></slot>
            </TableCell>
          </TableRow>
          <TableRow v-if="!table.getRowModel().rows.length"
            ><TableCell
              :colspan="
                Math.max(1, table.getVisibleLeafColumns().length + (enableRowSelection ? 1 : 0))
              "
              class="h-24 text-center"
              ><slot name="empty" :table="table">{{ emptyMessage }}</slot></TableCell
            ></TableRow
          >
        </TableBody>
      </Table>
    </div>
    <div
      v-if="showPagination || showSelectionCount"
      class="flex flex-wrap items-center justify-end gap-2 py-4"
    >
      <slot name="footer" :table="table">
        <div v-if="showSelectionCount" class="mr-auto text-sm text-muted-foreground" role="status">
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <template v-if="showPagination">
          <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
            >Previous</Button
          >
          <Button
            variant="outline"
            size="sm"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
            >Next</Button
          >
        </template>
      </slot>
    </div>
  </div>
</template>
