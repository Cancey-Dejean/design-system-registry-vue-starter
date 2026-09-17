import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "vue";
import type { logoVariants } from "./Logo.variants";

export type LogoVariants = VariantProps<typeof logoVariants>;
export type LogoKey = keyof typeof import("../logos").LOGOS;

export type LogoProps = {
  logo: LogoKey;
  size?: LogoVariants["size"];
  class?: HTMLAttributes["class"];
};
