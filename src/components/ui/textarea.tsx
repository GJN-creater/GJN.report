import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-600",
          "bg-white dark:bg-neutral-800 text-gray-900 dark:text-white",
          "placeholder-gray-400 dark:placeholder-neutral-500",
          "shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "transition duration-200 ease-in-out resize-y",
          className
        )}
        rows={4}
        spellCheck={false}
        autoComplete="off"
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
