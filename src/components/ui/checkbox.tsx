import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      onChange?.(e);
    };

    return (
      <input
        ref={ref}
        type="checkbox"
        onChange={handleChange}
        className={`
          w-4 h-4 shrink-0 rounded-md border border-gray-300 dark:border-neutral-600
          checked:bg-indigo-600 checked:border-indigo-600
          dark:checked:bg-indigo-500 dark:checked:border-indigo-500
          focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
          transition-all duration-200 ease-in-out
          shadow-sm appearance-none cursor-pointer
          ${className}
        `}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
