import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "reka-ui";
import type { textCva } from "./Text.variants";

type TextVariantProps = VariantProps<typeof textCva>;

export type TextProps = PrimitiveProps & {
  size?: TextVariantProps["size"];
  weight?: TextVariantProps["weight"];
  tone?: TextVariantProps["tone"];
  align?: TextVariantProps["align"];
  class?: HTMLAttributes["class"];
};
