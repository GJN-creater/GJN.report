import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost" | "secondary";
  size?: "xs" | "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-semibold transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
      outline: "border border-gray-300 text-gray-800 dark:text-gray-100 bg-white dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 focus-visible:ring-gray-400",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
      ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-800 dark:text-gray-200",
      secondary: "bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-600",
    };

    const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
      icon: "p-2", // 아이콘 전용 버튼
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
