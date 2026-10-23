import { cva } from "class-variance-authority";
import { cn } from "cn";

const codeBlockBase = cn(
  "group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl text-sm has-[>[data-slot=code-block-content]:focus-visible]:ring-3 has-[>[data-slot=code-block-content]:focus-visible]:ring-ring/30 data-[size=sm]:rounded-xl data-[size=sm]:text-xs",
);
const codeBlockConfig = {
  variants: {
    variant: {
      default: "bg-muted text-foreground ring-1 ring-foreground/5 dark:ring-foreground/10",
      destructive:
        "bg-destructive/5 text-destructive ring-1 ring-destructive/15 dark:bg-destructive/10 dark:ring-destructive/20",
    },
    size: { default: "", sm: "" },
  },
  compoundVariants: [],
  defaultVariants: { variant: "default", size: "default" },
} as const;
export const codeBlockCva = cva(codeBlockBase, {
  ...codeBlockConfig,
  compoundVariants: [...codeBlockConfig.compoundVariants],
});
export const CODE_BLOCK_VARIANTS = Object.keys(
  codeBlockConfig.variants.variant,
) as (keyof typeof codeBlockConfig.variants.variant)[];
export const CODE_BLOCK_SIZES = Object.keys(
  codeBlockConfig.variants.size,
) as (keyof typeof codeBlockConfig.variants.size)[];
export const codeBlockVariants = codeBlockCva;

const codeBlockLineBase = cn(
  "relative -mx-4 block min-h-lh px-4 group-data-[size=sm]/code-block:-mx-3 group-data-[size=sm]/code-block:px-3 before:min-w-6 before:text-end before:text-muted-foreground after:absolute after:start-1 after:top-0 after:text-muted-foreground after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none",
);
const codeBlockLineConfig = {
  variants: {
    variant: {
      default: "",
      added: "bg-foreground/5 after:content-['+']",
      removed: "bg-destructive/10 after:text-destructive after:content-['−']",
      highlighted: "bg-foreground/5",
    },
  },
  compoundVariants: [],
  defaultVariants: { variant: "default" },
} as const;
export const codeBlockLineCva = cva(codeBlockLineBase, {
  ...codeBlockLineConfig,
  compoundVariants: [...codeBlockLineConfig.compoundVariants],
});
export const CODE_BLOCK_LINE_VARIANTS = Object.keys(
  codeBlockLineConfig.variants.variant,
) as (keyof typeof codeBlockLineConfig.variants.variant)[];
export const codeBlockLineVariants = codeBlockLineCva;
