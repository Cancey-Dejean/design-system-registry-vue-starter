import type { Meta, StoryObj } from "@storybook/vue3";
import { Input } from "../../Input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "..";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => ({
    components: { Field, FieldDescription, FieldGroup, FieldLabel, Input },
    template: `
      <FieldGroup class="max-w-sm">
        <Field>
          <FieldLabel for="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
          <FieldDescription>We will never share your email.</FieldDescription>
        </Field>
      </FieldGroup>
    `,
  }),
};
