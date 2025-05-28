import * as React from "react";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onCheckedChange, ...props }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onCheckedChange(e.target.checked)}
        className="sr-only"
        {...props}
      />
      <div className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 transition ${checked ? 'bg-blue-600' : ''}`}>
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${checked ? 'translate-x-5' : ''}`} />
      </div>
      <span className="text-sm text-gray-800 dark:text-gray-100">{label}</span>
    </label>
  );
};
