import type { VariantProps } from "class-variance-authority";
import type { ToggleProps as RekaToggleProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { toggleCva } from "./Toggle.variants";

export type ToggleVariants = VariantProps<typeof toggleCva>;

export type ToggleVariant = NonNullable<ToggleVariants["variant"]>;
export type ToggleSize = NonNullable<ToggleVariants["size"]>;

export type ToggleProps = RekaToggleProps & {
  class?: HTMLAttributes["class"];
  variant?: ToggleVariant;
  size?: ToggleSize;
};
