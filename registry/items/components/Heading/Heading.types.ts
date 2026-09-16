import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "vue";
import type { headingCva } from "./";

type HeadingVariantProps = VariantProps<typeof headingCva>;

export type HeadingProps = {
  level?: NonNullable<HeadingVariantProps["level"]>;
  size?: HeadingVariantProps["size"];
  weight?: HeadingVariantProps["weight"];
  tone?: HeadingVariantProps["tone"];
  class?: HTMLAttributes["class"];
};
