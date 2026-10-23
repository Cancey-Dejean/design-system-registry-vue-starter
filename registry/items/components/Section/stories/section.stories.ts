import type { Meta, StoryObj } from "@storybook/vue3";
import { Section, SECTION_PADDINGS, type SectionProps } from "..";

const meta = {
  title: "Components/Section",
  component: Section,
  tags: ["autodocs"],
  argTypes: { padding: { control: "select", options: SECTION_PADDINGS } },
  args: { padding: "md" },
  render: (args) => ({
    components: { Section },
    setup: () => ({ args }),
    template: /* html */ `<Section v-bind="args" class="rounded-lg border border-dashed text-center"><h2 class="text-lg font-semibold">Section content</h2><p>Consistent page rhythm at every screen size.</p></Section>`,
  }),
} satisfies Meta<SectionProps>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Compact: Story = { args: { padding: "sm" } };
export const Spacious: Story = { args: { padding: "lg" } };
