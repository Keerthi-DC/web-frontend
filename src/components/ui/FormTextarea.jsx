import React, { forwardRef } from "react";

const FormTextarea = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        {...props}
        className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
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

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
