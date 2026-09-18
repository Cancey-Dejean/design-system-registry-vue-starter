import { cn } from "cn";
import { cva } from "class-variance-authority";

const toggleBase = cn(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap",
  "hover:bg-muted hover:text-muted-foreground",
  "disabled:pointer-events-none disabled:opacity-50",
  "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 outline-none",
  "transition-[color,box-shadow]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
);

const toggleConfig = {
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
} as const;

export const toggleCva = cva(toggleBase, {
  ...toggleConfig,
  compoundVariants: [...toggleConfig.compoundVariants],
});

export const TOGGLE_VARIANTS = Object.keys(
  toggleConfig.variants.variant,
) as (keyof typeof toggleConfig.variants.variant)[];

export const TOGGLE_SIZES = Object.keys(
  toggleConfig.variants.size,
) as (keyof typeof toggleConfig.variants.size)[];

export const toggleVariants = toggleCva;
