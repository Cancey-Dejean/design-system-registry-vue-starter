<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { DataTable } from ".";

interface Payment {
  id: string;
  email: string;
  status: string;
  amount: number;
}
const data: Payment[] = [
  { id: "m5gr84i9", email: "ken99@yahoo.com", status: "success", amount: 316 },
  { id: "3u1reuv4", email: "abe45@gmail.com", status: "success", amount: 242 },
  { id: "derv1ws0", email: "monserrat44@gmail.com", status: "processing", amount: 837 },
  { id: "5kma53ae", email: "silas22@gmail.com", status: "success", amount: 874 },
  { id: "bhqecj4p", email: "carmella@hotmail.com", status: "failed", amount: 721 },
  { id: "x3a7n20q", email: "riley@example.com", status: "pending", amount: 128 },
];
const columns: ColumnDef<Payment>[] = [
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) =>
      h(
        "span",
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
          Number(getValue()),
        ),
      ),
  },
];
</script>

<template>
  <DataTable
    :columns="columns"
    :data="data"
    :initial-page-size="3"
    :get-row-id="(row) => row.id"
    enable-row-selection
  />
</template>
