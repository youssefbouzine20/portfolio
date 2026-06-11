import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-white text-[#0a0a0c] shadow hover:bg-white/90",
  destructive:
    "bg-red-500 text-white shadow-sm hover:bg-red-500/90",
  outline:
    "border border-white/20 bg-transparent shadow-sm hover:bg-white/10 hover:text-white",
  secondary:
    "bg-white/10 text-white shadow-sm hover:bg-white/20",
  ghost:
    "hover:bg-white/10 hover:text-white",
  link:
    "text-white underline-offset-4 hover:underline",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-11 rounded-md px-8 text-base",
  icon: "h-9 w-9",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
