import * as React from "react"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block mb-1 text-sm font-medium text-gray-700 ${className}`}
        {...props}
      >
        {children}
      </label>
    )
  }
)

Label.displayName = "Label"
