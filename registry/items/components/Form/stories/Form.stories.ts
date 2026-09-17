import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";
import { Button } from "@registry/components/Button";
import { Checkbox } from "@registry/components/Checkbox";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@registry/components/Form";

const inputClass =
  "border-input bg-background h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none aria-invalid:border-destructive";

const formParts = {
  Button,
  Checkbox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};

const meta = {
  title: "Components/Form",
  tags: ["autodocs"],
  component: FormItem,
  parameters: {
    layout: "padded",
  },
  decorators: [
    () => ({
      components: { StorybookWrapper },
      template: /* html */ `<StorybookWrapper class='w-full max-w-sm px-4'><story /></StorybookWrapper>`,
    }),
  ],
} satisfies Meta<typeof FormItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Username field with Zod validation via vee-validate. */
export const Default: Story = {
  render: () => ({
    components: formParts,
    setup() {
      const formSchema = toTypedSchema(
        z.object({
          username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
          }),
        }),
      );

      const form = useForm({
        validationSchema: formSchema,
      });

      const onSubmit = form.handleSubmit(() => {
        // Story-only submit handler.
      });

      return { onSubmit, inputClass };
    },
    template: /* html */ `
      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <input
                type="text"
                placeholder="shadcn"
                :class="inputClass"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit">Submit</Button>
      </form>
    `,
  }),
};

/** Multi-field form with email and terms checkbox. */
export const Profile: Story = {
  render: () => ({
    components: formParts,
    setup() {
      const formSchema = toTypedSchema(
        z.object({
          email: z.string().email({
            message: "Please enter a valid email.",
          }),
          username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
          }),
          terms: z.boolean().refine((value) => value === true, {
            message: "You must accept the terms.",
          }),
        }),
      );

      const form = useForm({
        validationSchema: formSchema,
        initialValues: {
          email: "",
          username: "",
          terms: false,
        },
      });

      const onSubmit = form.handleSubmit(() => {
        // Story-only submit handler.
      });

      return { onSubmit, inputClass };
    },
    template: /* html */ `
      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <input
                type="text"
                placeholder="shadcn"
                :class="inputClass"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <input
                type="email"
                placeholder="you@example.com"
                :class="inputClass"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" type="checkbox" name="terms">
          <FormItem class="flex flex-row items-start gap-3 space-y-0">
            <FormControl>
              <Checkbox
                :model-value="value"
                @update:model-value="(v) => handleChange(!!v)"
              />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Accept terms and conditions</FormLabel>
              <FormDescription>
                You agree to our Terms of Service and Privacy Policy.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <Button type="submit">Create account</Button>
      </form>
    `,
  }),
};
