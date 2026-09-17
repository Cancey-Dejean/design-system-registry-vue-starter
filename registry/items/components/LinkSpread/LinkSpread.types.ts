import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "reka-ui";

export type LinkSpreadProps = PrimitiveProps & {
  /** The destination URL. */
  href?: string;
  class?: HTMLAttributes["class"];
  external?: boolean;
};
