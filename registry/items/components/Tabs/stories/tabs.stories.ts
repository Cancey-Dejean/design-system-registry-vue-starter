import type { Meta, StoryObj } from "@storybook/vue3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@registry/components/Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => ({
    components: { Tabs, TabsContent, TabsList, TabsTrigger },
    template: /* html */ `
      <Tabs default-value="account" class="max-w-sm">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    `,
  }),
};

export const LineVariant: Story = {
  render: () => ({
    components: { Tabs, TabsContent, TabsList, TabsTrigger },
    template: /* html */ `
      <Tabs default-value="account" class="max-w-sm">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    `,
  }),
};
