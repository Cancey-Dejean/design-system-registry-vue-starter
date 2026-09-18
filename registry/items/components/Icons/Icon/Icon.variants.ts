import { cn } from "cn";
import { cva } from "class-variance-authority";

const iconBase = cn("");

const iconConfig = {
  variants: {
    size: {
      sm: "size-3",
      md: "size-4",
      lg: "size-6",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
  },
} as const;

export const iconCva = cva(iconBase, {
  ...iconConfig,
  compoundVariants: [...iconConfig.compoundVariants],
});

export const ICON_SIZES = Object.keys(
  iconConfig.variants.size,
) as (keyof typeof iconConfig.variants.size)[];

export const iconVariants = iconCva;
