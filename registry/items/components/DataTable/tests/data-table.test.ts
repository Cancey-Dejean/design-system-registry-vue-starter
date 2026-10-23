import { describe, expect, test } from "vite-plus/test";
import { effectScope, nextTick, ref } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { useDataTable } from "../useDataTable";

interface Person {
  id: string;
  name: string;
  email: string;
  age: number;
}
const people: Person[] = [
  { id: "c", name: "Cora", email: "cora@example.com", age: 34 },
  { id: "a", name: "Ada", email: "ada@example.com", age: 25 },
  { id: "b", name: "Ben", email: "ben@work.test", age: 42 },
];
const columns: ColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "age", header: "Age" },
];

function setup() {
  const scope = effectScope();
  const data = ref([...people]);
  const table = scope.run(() =>
    useDataTable({ data, columns, initialPageSize: 2, getRowId: (row) => row.id }),
  )!;
  return { scope, table, data };
}

describe("data table state", () => {
  test("sorting changes visible order while pagination stays bounded", () => {
    const { scope, table } = setup();
    try {
      table.setSorting([{ id: "name", desc: false }]);
      expect(table.getRowModel().rows.map((row) => row.id)).toEqual(["a", "b"]);
      expect(table.getCanPreviousPage()).toBe(false);
      table.nextPage();
      expect(table.getRowModel().rows.map((row) => row.id)).toEqual(["c"]);
      expect(table.getCanNextPage()).toBe(false);
    } finally {
      scope.stop();
    }
  });
  test("column and global filters compose and clearing them restores all rows", () => {
    const { scope, table } = setup();
    try {
      table.getColumn("email")!.setFilterValue("example.com");
      expect(table.getFilteredRowModel().rows.map((row) => row.id)).toEqual(["c", "a"]);
      table.setGlobalFilter("Ada");
      expect(table.getFilteredRowModel().rows.map((row) => row.id)).toEqual(["a"]);
      table.resetColumnFilters();
      table.setGlobalFilter("");
      expect(table.getFilteredRowModel().rows).toHaveLength(3);
    } finally {
      scope.stop();
    }
  });
  test("selection follows stable row IDs after reactive data updates", async () => {
    const { scope, table, data } = setup();
    try {
      table.getRow("a").toggleSelected(true);
      data.value = [...people].reverse();
      await nextTick();
      expect(table.getSelectedRowModel().rows.map((row) => row.original.name)).toEqual(["Ada"]);
      table.getColumn("email")!.setFilterValue("work.test");
      expect(table.getFilteredSelectedRowModel().rows).toHaveLength(0);
    } finally {
      scope.stop();
    }
  });
  test("column visibility changes rendered cells without removing data", () => {
    const { scope, table } = setup();
    try {
      table.getColumn("email")!.toggleVisibility(false);
      expect(table.getVisibleLeafColumns().map((column) => column.id)).toEqual(["name", "age"]);
      expect(table.getRowModel().rows[0]!.original.email).toBe("cora@example.com");
      table.getColumn("email")!.toggleVisibility(true);
      expect(table.getVisibleLeafColumns()).toHaveLength(3);
    } finally {
      scope.stop();
    }
  });
});
