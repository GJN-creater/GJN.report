import * as React from "react";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onCheckedChange,
  description,
  ...props
}) => {
  return (
    <label
      className="group flex items-center gap-4 p-3 rounded-xl cursor-pointer 
                 transition-all duration-200 select-none
                 hover:bg-gray-100 dark:hover:bg-neutral-700
                 focus-within:ring-2 focus-within:ring-blue-500"
    >
      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
        {...props}
      />

      {/* Switch */}
      <div
        className={`w-12 h-7 flex-shrink-0 rounded-full p-[3px] flex items-center 
                    transition-colors duration-200
                    ${
                      checked
                        ? "bg-blue-600 dark:bg-blue-500"
                        : "bg-gray-300 dark:bg-neutral-600"
                    }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200
                      ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>

      {/* Label Text */}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
        {description && (
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {description}
          </span>
        )}
      </div>
    </label>
  );
};
