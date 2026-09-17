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
} from ".";

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
];
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="invoice in invoices" :key="invoice.invoice">
        <TableCell class="font-medium">{{ invoice.invoice }}</TableCell>
        <TableCell>{{ invoice.status }}</TableCell>
        <TableCell>{{ invoice.method }}</TableCell>
        <TableCell class="text-right">{{ invoice.amount }}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan="3">Total</TableCell>
        <TableCell class="text-right">$750.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>
