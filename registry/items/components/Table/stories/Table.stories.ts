import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import Table from "../Table.vue";
import TableBody from "../TableBody.vue";
import TableCaption from "../TableCaption.vue";
import TableCell from "../TableCell.vue";
import TableEmpty from "../TableEmpty.vue";
import TableFooter from "../TableFooter.vue";
import TableHead from "../TableHead.vue";
import TableHeader from "../TableHeader.vue";
import TableRow from "../TableRow.vue";
import DataTableDemo from "./DataTableDemo.vue";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const tableParts = {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-3xl px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Static invoice table with caption and footer total. */
export const Default: Story = {
  render: () => ({
    components: tableParts,
    setup: () => ({ invoices }),
    template: `
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
            <TableCell>{{ invoice.paymentStatus }}</TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell class="text-right">{{ invoice.totalAmount }}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan="3">Total</TableCell>
            <TableCell class="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    `,
  }),
};

/** Empty state using TableEmpty. */
export const Empty: Story = {
  render: () => ({
    components: tableParts,
    template: `
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty :colspan="3">No invoices found.</TableEmpty>
        </TableBody>
      </Table>
    `,
  }),
};

/**
 * TanStack data table with sorting, filtering, selection, and pagination.
 * Mirrors the shadcn-vue Data Table pattern.
 */
export const DataTable: Story = {
  render: () => ({
    components: { DataTableDemo },
    template: "<DataTableDemo />",
  }),
};
