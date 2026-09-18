import { cn } from "cn";
import { cva } from "class-variance-authority";

const logoBase = cn("");

const logoConfig = {
  variants: {
    size: {
      sm: "h-4 w-auto",
      md: "h-6 w-auto",
      lg: "h-10 w-auto",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
  },
} as const;

export const logoCva = cva(logoBase, {
  ...logoConfig,
  compoundVariants: [...logoConfig.compoundVariants],
});

export const LOGO_SIZES = Object.keys(
  logoConfig.variants.size,
) as (keyof typeof logoConfig.variants.size)[];

export const logoVariants = logoCva;
