import { cn } from "cn";
import { cva } from "class-variance-authority";

const headingBase = cn("leading-relaxed");

const headingConfig = {
  variants: {
    level: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    },
    size: {
      xs: "text-xl",
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
      "2xl": "text-6xl",
      "3xl": "sm:text-7xl text-3xl",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      brand: "text-primary",
      danger: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    weight: "semibold",
    tone: "default",
  },
} as const;

export const headingCva = cva("", {
  ...headingConfig,
  compoundVariants: [...headingConfig.compoundVariants],
});

// Export the level variants
export const HEADING_LEVELS = Object.keys(
  headingConfig.variants.level,
) as unknown as (keyof typeof headingConfig.variants.level)[];

export const HEADING_SIZES = Object.keys(
  headingConfig.variants.size,
) as (keyof typeof headingConfig.variants.size)[];

export const HEADING_WEIGHTS = Object.keys(
  headingConfig.variants.weight,
) as (keyof typeof headingConfig.variants.weight)[];

export const HEADING_TONES = Object.keys(
  headingConfig.variants.tone,
) as (keyof typeof headingConfig.variants.tone)[];

// cn() treats text-* sizes as line-height conflicts and keeps the later class, so
// leading must be merged after the size variants — not as the CVA base.
export const headingVariants = (props?: Parameters<typeof headingCva>[0]) =>
  cn(headingCva(props), headingBase);
