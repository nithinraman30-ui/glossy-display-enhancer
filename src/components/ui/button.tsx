import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background/70 backdrop-blur shadow-sm hover:border-primary/40 hover:bg-secondary/70",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "rounded-full hover:bg-secondary/70",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-primary-foreground shadow-elegant hover:-translate-y-0.5 hover:shadow-glow",
        gold: "bg-gradient-gold text-gold-foreground shadow-gold hover:-translate-y-0.5",
        ink: "bg-ink text-primary-foreground shadow-elegant hover:-translate-y-0.5 hover:shadow-glow",
        glass:
          "glass text-foreground shadow-soft hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant",
        sos: "bg-destructive text-destructive-foreground shadow-[0_0_0_0_color-mix(in_oklab,var(--destructive)_60%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-16px_color-mix(in_oklab,var(--destructive)_70%,transparent)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
