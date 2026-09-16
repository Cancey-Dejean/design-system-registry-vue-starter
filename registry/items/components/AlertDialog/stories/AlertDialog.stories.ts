import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../";
import { Button } from "../../Button";

const meta = {
  title: "Components/Alert Dialog",
  tags: ["autodocs"],
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
  render: (args) => ({
    components: {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
      Button,
    },
    setup: () => ({ args }),
    template: `
      <AlertDialog v-bind="args">
        <AlertDialogTrigger as-child>
          <Button variant="outline">Open dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Confirm only if you mean it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    `,
  }),
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Destructive confirmation for irreversible actions like delete. */
export const DeleteConfirmation: Story = {
  render: (args) => ({
    components: {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
      Button,
    },
    setup: () => ({ args }),
    template: `
      <AlertDialog v-bind="args">
        <AlertDialogTrigger as-child>
          <Button variant="destructive">Delete project</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the project and its data. You cannot undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    `,
  }),
};

/** Open on mount so the dialog content is visible without a click. */
export const Open: Story = {
  args: {
    defaultOpen: true,
  },
};
