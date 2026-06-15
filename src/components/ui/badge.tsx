import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border font-mono text-[9px] uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/30 bg-white/5 text-white/70",
        active: "border-white bg-white text-black",
        outline: "border-white/20 text-white/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), "px-2 py-0.5", className)} {...props} />;
}

export { Badge, badgeVariants };
