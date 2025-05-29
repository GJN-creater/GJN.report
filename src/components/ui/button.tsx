import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost" | "secondary";
  size?: "xs" | "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm hover:shadow-md active:scale-[0.98]";

    const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default:
        "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus-visible:ring-indigo-500 ring-offset-white dark:ring-offset-neutral-900",
      outline:
        "border border-gray-300 text-gray-800 dark:text-gray-100 bg-white dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 focus-visible:ring-gray-400 ring-offset-white dark:ring-offset-neutral-900",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 ring-offset-white dark:ring-offset-neutral-900",
      ghost:
        "bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-800 dark:text-gray-200 focus-visible:ring-gray-300 ring-offset-white dark:ring-offset-neutral-900",
      secondary:
        "bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-600 focus-visible:ring-gray-400 ring-offset-white dark:ring-offset-neutral-900",
    };

    const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base",
      icon: "p-2", // 아이콘 전용 버튼
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
