import type { VariantProps } from "class-variance-authority";
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { buttonCva } from "./Button.variants";

export type ButtonVariants = VariantProps<typeof buttonCva>;
export type ButtonSize = NonNullable<ButtonVariants["size"]>;
export type ButtonVariant = NonNullable<ButtonVariants["variant"]>;

export type ButtonProps = PrimitiveProps & {
  variant?: ButtonVariants["variant"];
  icon?: boolean;
  size?: ButtonVariants["size"];
  fullWidth?: boolean;
  class?: HTMLAttributes["class"];
};
