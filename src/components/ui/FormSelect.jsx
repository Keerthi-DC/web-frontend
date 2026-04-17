import React, { forwardRef } from "react";

const FormSelect = forwardRef(({ label, error, options = [], defaultOption = "Select an option", className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        {...props}
        className={`w-full p-3 border-b bg-white focus:outline-none focus:border-primary transition-colors ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        } ${className}`}
      >
        <option value="" disabled hidden>
          {defaultOption}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-xs mt-1 animate-pulse">
          {error.message}
        </p>
      )}
    </div>
  );
});

FormSelect.displayName = "FormSelect";

export default FormSelect;
