import React from "react";

// Reusable button used for 'View' actions across the accreditations pages.
// Props:
// - variant: 'primary' (default) | 'link' -> controls visual style
// - onClick: click handler
// - className: extra classes
const ViewButton = ({ children = "View", variant = "primary", onClick, className = "" }) => {
  const base = "inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300";

  if (variant === "link") {
    return (
      <button
        onClick={onClick}
        className={`${base} text-[#001430] hover:text-yellow-600 hover:underline group ${className}`}
      >
        {children}
        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    );
  }

  // primary
  return (
    <button
      onClick={onClick}
      className={`${base} bg-[#001430] hover:bg-[#00204a] text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg border border-transparent hover:border-yellow-500/50 ${className}`}
    >
      {children}
    </button>
  );
};

export default ViewButton;
