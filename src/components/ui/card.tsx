import * as React from "react";
import { cn } from "@lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white text-black shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
