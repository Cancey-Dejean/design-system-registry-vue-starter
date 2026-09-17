import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@registry/components/NativeSelect";

const nativeSelectParts = {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
};

const meta = {
  title: "Components/Native Select",
  tags: ["autodocs"],
  component: NativeSelect,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ `<StorybookWrapperSimple class='w-full max-w-xs px-4'><story /></StorybookWrapperSimple>`,
    }),
  ],
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic status select with placeholder option. */
export const Default: Story = {
  render: () => ({
    components: nativeSelectParts,
    template: /* html */ `
      <NativeSelect aria-label="Status">
        <NativeSelectOption value="">Select status</NativeSelectOption>
        <NativeSelectOption value="todo">Todo</NativeSelectOption>
        <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
        <NativeSelectOption value="done">Done</NativeSelectOption>
        <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
      </NativeSelect>
    `,
  }),
};

/** Options organized with NativeSelectOptGroup. */
export const WithGroups: Story = {
  render: () => ({
    components: nativeSelectParts,
    template: /* html */ `
      <NativeSelect aria-label="Department">
        <NativeSelectOption value="">Select department</NativeSelectOption>
        <NativeSelectOptGroup label="Engineering">
          <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
          <NativeSelectOption value="backend">Backend</NativeSelectOption>
          <NativeSelectOption value="devops">DevOps</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Sales">
          <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
          <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
          <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Operations">
          <NativeSelectOption value="support">Customer Support</NativeSelectOption>
          <NativeSelectOption value="product-manager">Product Manager</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    `,
  }),
};

/** Entire select disabled. */
export const Disabled: Story = {
  render: () => ({
    components: nativeSelectParts,
    template: /* html */ `
      <NativeSelect disabled aria-label="Priority">
        <NativeSelectOption value="">Select priority</NativeSelectOption>
        <NativeSelectOption value="low">Low</NativeSelectOption>
        <NativeSelectOption value="medium">Medium</NativeSelectOption>
        <NativeSelectOption value="high">High</NativeSelectOption>
      </NativeSelect>
    `,
  }),
};

/** Validation error styling via aria-invalid. */
export const Invalid: Story = {
  render: () => ({
    components: nativeSelectParts,
    template: /* html */ `
      <NativeSelect aria-invalid="true" aria-label="Role">
        <NativeSelectOption value="">Select role</NativeSelectOption>
        <NativeSelectOption value="admin">Admin</NativeSelectOption>
        <NativeSelectOption value="editor">Editor</NativeSelectOption>
        <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
      </NativeSelect>
    `,
  }),
};
