import { cva } from "class-variance-authority";
import { cn } from "cn";

const sectionBase = cn("mx-auto w-full px-6");
const sectionConfig = {
  variants: {
    padding: {
      sm: "py-12 md:py-16",
      md: "py-20 md:py-24",
      lg: "py-24 md:py-32",
    },
  },
  compoundVariants: [],
  defaultVariants: { padding: "md" },
} as const;

export const sectionCva = cva(sectionBase, {
  ...sectionConfig,
  compoundVariants: [...sectionConfig.compoundVariants],
});
export const SECTION_PADDINGS = Object.keys(
  sectionConfig.variants.padding,
) as (keyof typeof sectionConfig.variants.padding)[];
export const sectionVariants = sectionCva;
