import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full px-3 py-2 
          rounded-md border shadow-sm 
          bg-white text-gray-900 
          border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent

          dark:bg-neutral-800 dark:text-white 
          dark:border-neutral-600 
          dark:placeholder:text-neutral-400
          transition duration-150 ease-in-out

          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
