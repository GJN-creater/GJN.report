import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative",
        "rounded-2xl border border-gray-200 dark:border-neutral-700",
        "bg-white dark:bg-neutral-800 text-black dark:text-white",
        "shadow-md hover:shadow-lg transition-all duration-300 ease-in-out",
        "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        "hover:-translate-y-[2px]",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
