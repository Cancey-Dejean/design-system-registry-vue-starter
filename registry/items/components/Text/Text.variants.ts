import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const textBase = cn("tracking-tight");

const textConfig = {
  variants: {
    size: {
      xs: "text-12",
      sm: "text-14",
      md: "text-16",
      lg: "md:text-18 text-16",
      xl: "md:text-20 text-16",
    },
    weight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      brand: "text-primary",
      danger: "text-destructive",
      success: "text-green-600",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    weight: "regular",
    tone: "default",
    align: "left",
  },
} as const;

export const textCva = cva(textBase, {
  ...textConfig,
  compoundVariants: [...textConfig.compoundVariants],
});

export const TEXT_SIZES = Object.keys(
  textConfig.variants.size,
) as (keyof typeof textConfig.variants.size)[];

export const TEXT_ALIGNMENTS = Object.keys(
  textConfig.variants.align,
) as (keyof typeof textConfig.variants.align)[];

export const TEXT_WEIGHTS = Object.keys(
  textConfig.variants.weight,
) as (keyof typeof textConfig.variants.weight)[];

export const TEXT_TONES = Object.keys(
  textConfig.variants.tone,
) as (keyof typeof textConfig.variants.tone)[];

export const textVariants = textCva;
