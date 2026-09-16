import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../";
import { sections } from "./Accordion.data.ts";
import StorybookWrapper from "@registry/utility/StorybookWrapper.vue";

const meta = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  component: Accordion,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    () => ({
      components: { StorybookWrapper },
      template: /* html */ `<StorybookWrapper><story /></StorybookWrapper>`,
    }),
  ],
  argTypes: {
    type: {
      description: "Allow one open section or several",
      control: "inline-radio",
      options: ["single", "multiple"],
    },
    collapsible: {
      description: "Let the open section close again (single type only)",
      control: "boolean",
    },
    disabled: { control: "boolean" },
  },
  args: {
    type: "single",
    collapsible: true,
    disabled: false,
  },
  render: (args) => ({
    components: { Accordion, AccordionContent, AccordionItem, AccordionTrigger },
    setup: () => ({ args, sections }),
    template: /* html */ `
      <Accordion v-bind="args" class="w-full max-w-md">
        <AccordionItem v-for="section in sections" :key="section.value" :value="section.value">
          <AccordionTrigger>{{ section.question }}</AccordionTrigger>
          <AccordionContent>{{ section.answer }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "shipping",
  },
};

export const Multiple: Story = {
  args: {
    type: "multiple",
    defaultValue: ["shipping", "returns"],
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "shipping",
    disabled: true,
  },
};
