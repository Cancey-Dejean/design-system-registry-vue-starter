import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "reka-ui";
import type { linkCva } from "./LinkText.variants";

type LinkVariantProps = VariantProps<typeof linkCva>;

export type LinkProps = PrimitiveProps & {
  tone?: LinkVariantProps["tone"];
  underline?: LinkVariantProps["underline"];
  size?: LinkVariantProps["size"];
  external?: boolean;
  href?: string;
  class?: HTMLAttributes["class"];
};
