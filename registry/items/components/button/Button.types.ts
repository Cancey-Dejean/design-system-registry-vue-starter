import type { VariantProps } from "class-variance-authority";
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { buttonCva } from ".";

type ButtonVariantProps = VariantProps<typeof buttonCva>;

export type ButtonProps = PrimitiveProps & {
  /** The variant of the button */
  variant?: ButtonVariantProps["variant"];
  /** Whether the button has an icon */
  icon?: boolean;
  /** The size of the button */
  size?: ButtonVariantProps["size"];
  /** Whether the button is full width */
  fullWidth?: boolean;
  class?: HTMLAttributes["class"];
};
