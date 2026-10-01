import { fc, test } from "@fast-check/vitest";
import { expect } from "vite-plus/test";

import { BUTTON_SIZES, BUTTON_VARIANTS, buttonVariants } from "../Button.variants";

/** `fc.constantFrom` requires a non-empty tuple. Variant exports are arrays. */
function oneOf<T extends string>(values: readonly T[]) {
  const [first, ...rest] = values;
  if (first === undefined) {
    throw new Error("constantFrom needs at least one value");
  }
  return fc.constantFrom(first, ...rest);
}

const variantClass = {
  primary: "bg-primary",
  outline: "border-border",
  secondary: "bg-secondary",
  ghost: "hover:bg-muted",
  destructive: "bg-destructive/10",
} as const satisfies Record<(typeof BUTTON_VARIANTS)[number], string>;

test.prop({
  variant: oneOf(BUTTON_VARIANTS),
  size: oneOf(BUTTON_SIZES),
})("buttonVariants returns a stable class string for the variant", ({ variant, size }) => {
  const classes = buttonVariants({ variant, size });

  expect(classes).toEqual(expect.any(String));
  expect(classes.length).toBeGreaterThan(0);
  expect(buttonVariants({ variant, size })).toBe(classes);
  expect(classes.split(" ")).toContain(variantClass[variant]);
});
