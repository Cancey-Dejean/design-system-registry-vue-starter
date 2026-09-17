import type { VariantProps } from "class-variance-authority";
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { buttonCva } from ".";

type ButtonVariantProps = VariantProps<typeof buttonCva>;

export type ButtonProps = PrimitiveProps & {
  variant?: ButtonVariantProps["variant"];
  icon?: boolean;
  size?: ButtonVariantProps["size"];
  fullWidth?: boolean;
  class?: HTMLAttributes["class"];
};
