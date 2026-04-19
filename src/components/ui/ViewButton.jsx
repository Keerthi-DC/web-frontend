import React from "react";
import { theme } from "./theme";

// Reusable button used for 'View' actions across the accreditations pages.
// Props:
// - variant: 'primary' (default) | 'link' -> controls visual style
// - onClick: click handler
// - className: extra classes
const ViewButton = ({ children = "View", variant = "primary", onClick, className = "" }) => {
  if (variant === "link") {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${theme.colors.accentText} ${theme.colors.accentHoverText} group ${className}`}
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
      className={`${theme.buttons.primary} ${className}`}
    >
      {children}
    </button>
  );
};

export default ViewButton;
