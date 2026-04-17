import React, { forwardRef } from "react";

const FormInput = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...props}
        className={`w-full p-3 border-b focus:outline-none focus:border-primary transition-colors ${
          error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
        } ${className}`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 animate-pulse">
          {error.message}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
