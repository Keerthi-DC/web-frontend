import React from "react";

// Reusable button used for 'View' actions across the accreditations pages.
// Props:
// - variant: 'primary' (default) | 'link' -> controls visual style
// - onClick: click handler
// - className: extra classes
const ViewButton = ({ children = "View", variant = "primary", onClick, className = "" }) => {
  const base = "inline-flex items-center gap-2 text-sm font-medium";

  if (variant === "link") {
    return (
      <button
        onClick={onClick}
        className={`${base} text-[#0b2d5c] hover:underline ${className}`}
      >
        {children}
      </button>
    );
  }

  // primary
  return (
    <button
      onClick={onClick}
      className={`${base} bg-[#0b2d5c] text-white px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default ViewButton;
