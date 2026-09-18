import { cn } from "cn";
import { cva, type VariantProps } from "class-variance-authority";

const alertBase = cn(
  "relative grid w-full items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm",
  "grid-cols-[0_1fr] has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3",
  "[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
);

const alertConfig = {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive:
        "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "default",
  },
} as const;

export const alertCva = cva(alertBase, {
  ...alertConfig,
  compoundVariants: [...alertConfig.compoundVariants],
});

export type AlertVariants = VariantProps<typeof alertCva>;

export const ALERT_VARIANTS = Object.keys(
  alertConfig.variants.variant,
) as (keyof typeof alertConfig.variants.variant)[];

export const alertVariants = alertCva;
