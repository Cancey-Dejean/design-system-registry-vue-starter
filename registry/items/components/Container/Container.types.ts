import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "vue";
import type { containerCva } from "./";

type ContainerVariantProps = VariantProps<typeof containerCva>;

export type ContainerProps = {
  size?: ContainerVariantProps["size"];
  class?: HTMLAttributes["class"];
};
