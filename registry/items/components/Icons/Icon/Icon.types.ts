import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "vue";
import type { iconVariants } from "../";

export type IconVariants = VariantProps<typeof iconVariants>;
export type IconKey = keyof typeof import("../icons").ICONS;

export type IconProps = {
  icon: IconKey;
  size?: IconVariants["size"];
  class?: HTMLAttributes["class"];
};
