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
        className={`w-4 h-4 shrink-0 rounded border border-gray-300 dark:border-neutral-600
          text-blue-600 dark:checked:bg-blue-500 dark:checked:border-blue-500
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition
          ${className}`}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
