import type { Meta, StoryObj } from "@storybook/vue3";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  CODE_BLOCK_VARIANTS,
  CODE_BLOCK_SIZES,
} from "..";

const source = 'const greeting = "hello";\nconsole.log(greeting);';
type CodeBlockStoryArgs = {
  variant?: (typeof CODE_BLOCK_VARIANTS)[number];
  size?: (typeof CODE_BLOCK_SIZES)[number];
};

const meta: Meta<CodeBlockStoryArgs> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: CODE_BLOCK_VARIANTS },
    size: { control: "select", options: CODE_BLOCK_SIZES },
  },
  args: { variant: "default", size: "default" },
};
export default meta;
type Story = StoryObj<CodeBlockStoryArgs>;

export const Default: Story = {
  render: (args) => ({
    components: {
      CodeBlock,
      CodeBlockHeader,
      CodeBlockTitle,
      CodeBlockActions,
      CodeBlockCopyButton,
      CodeBlockContent,
    },
    setup: () => ({ args, source }),
    template: /* html */ `<CodeBlock v-bind="args" class="max-w-xl"><CodeBlockHeader><CodeBlockTitle>greeting.ts</CodeBlockTitle><CodeBlockActions><CodeBlockCopyButton :value="source" /></CodeBlockActions></CodeBlockHeader><CodeBlockContent :code="source" line-numbers /></CodeBlock>`,
  }),
};
export const Diff: Story = {
  render: () => ({
    components: { CodeBlock, CodeBlockContent, CodeBlockLine, CodeBlockFooter },
    template: /* html */ `<CodeBlock class="max-w-xl"><CodeBlockContent line-numbers :start-line="12"><CodeBlockLine variant="removed" content="const greeting = 'old';" /><CodeBlockLine variant="added" content="const greeting = 'hello';" /><CodeBlockLine variant="highlighted" content="console.log(greeting);" /></CodeBlockContent><CodeBlockFooter>1 addition, 1 deletion</CodeBlockFooter></CodeBlock>`,
  }),
};
export const Destructive: Story = { ...Default, args: { variant: "destructive", size: "sm" } };
