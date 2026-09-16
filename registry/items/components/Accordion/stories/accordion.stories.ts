import type { Meta, StoryObj } from "@storybook/vue3";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "..";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => ({
    components: { Accordion, AccordionContent, AccordionItem, AccordionTrigger },
    template: /* html */ `
      <Accordion type="single" :default-value="['item-1']" collapsible class="max-w-sm">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes. It comes with default styles.</AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
};
