import type { Meta, StoryObj } from "@storybook/vue3";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "..";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => ({
    components: { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle },
    template: `
      <Card class="max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent><p>Card Content</p></CardContent>
        <CardFooter><p>Card Footer</p></CardFooter>
      </Card>
    `,
  }),
};
