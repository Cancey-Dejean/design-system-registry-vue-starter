import type {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  RowSelectionState,
  SortingState,
  TableOptions,
  VisibilityState,
} from "@tanstack/vue-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { ref, toValue, type MaybeRefOrGetter } from "vue";

export interface UseDataTableOptions<TData extends RowData, TValue = unknown> {
  data: MaybeRefOrGetter<TData[]>;
  columns: MaybeRefOrGetter<ColumnDef<TData, TValue>[]>;
  initialPageSize?: number;
  getRowId?: TableOptions<TData>["getRowId"];
}

/** Vue-native state for a client-side TanStack Table v8. */
export function useDataTable<TData extends RowData, TValue = unknown>(
  options: UseDataTableOptions<TData, TValue>,
) {
  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const columnVisibility = ref<VisibilityState>({});
  const rowSelection = ref<RowSelectionState>({});
  const globalFilter = ref("");
  const pageSize = options.initialPageSize ?? 10;

  return useVueTable<TData>({
    get data() {
      return toValue(options.data);
    },
    get columns() {
      return toValue(options.columns);
    },
    getRowId: options.getRowId,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : 10,
      },
    },
    onSortingChange: (update) => {
      sorting.value = typeof update === "function" ? update(sorting.value) : update;
    },
    onColumnFiltersChange: (update) => {
      columnFilters.value = typeof update === "function" ? update(columnFilters.value) : update;
    },
    onColumnVisibilityChange: (update) => {
      columnVisibility.value =
        typeof update === "function" ? update(columnVisibility.value) : update;
    },
    onRowSelectionChange: (update) => {
      rowSelection.value = typeof update === "function" ? update(rowSelection.value) : update;
    },
    onGlobalFilterChange: (update) => {
      globalFilter.value = typeof update === "function" ? update(globalFilter.value) : update;
    },
    state: {
      get sorting() {
        return sorting.value;
      },
      get columnFilters() {
        return columnFilters.value;
      },
      get columnVisibility() {
        return columnVisibility.value;
      },
      get rowSelection() {
        return rowSelection.value;
      },
      get globalFilter() {
        return globalFilter.value;
      },
    },
  });
}
