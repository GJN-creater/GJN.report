import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2",
          "rounded-xl border shadow-inner",
          "bg-white text-gray-900 placeholder-gray-400",
          "border-gray-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "dark:bg-neutral-800 dark:text-white dark:border-neutral-600 dark:placeholder:text-neutral-500",
          "transition duration-200 ease-in-out",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
