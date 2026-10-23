import type { HTMLAttributes } from "vue";
import type { VariantProps } from "class-variance-authority";
import type { sectionVariants } from "./Section.variants";

export type SectionVariants = VariantProps<typeof sectionVariants>;
export interface SectionProps {
  padding?: SectionVariants["padding"];
  class?: HTMLAttributes["class"];
}
