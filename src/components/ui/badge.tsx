import * as React from "react";
import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "border-transparent bg-white text-[#0a0a0c] hover:bg-white/80",
  secondary:
    "border-transparent bg-white/10 text-white hover:bg-white/20",
  destructive:
    "border-transparent bg-red-500 text-white hover:bg-red-500/80",
  outline:
    "text-white border border-white/20",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        "transition-colors focus:outline-none focus:ring-2 focus:ring-white/60",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
