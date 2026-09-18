import { cn } from "cn";
import { cva } from "class-variance-authority";

const containerBase = cn("mx-auto w-full px-4 md:px-6");

const containerConfig = {
  variants: {
    size: {
      base: "max-w-7xl",
      contained: "max-w-[1024px]",
      thin: "max-w-[980px]",
      full: "max-w-full",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "base",
  },
} as const;

export const containerCva = cva(containerBase, {
  ...containerConfig,
  compoundVariants: [...containerConfig.compoundVariants],
});

export const CONTAINER_SIZES = Object.keys(
  containerConfig.variants.size,
) as (keyof typeof containerConfig.variants.size)[];

export const containerVariants = containerCva;
