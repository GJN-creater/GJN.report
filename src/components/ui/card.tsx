import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 dark:border-neutral-700",
        "bg-white dark:bg-neutral-800 text-black dark:text-white",
        "shadow-card transition-colors duration-200 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
