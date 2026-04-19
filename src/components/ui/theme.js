export const theme = {
  colors: {
    primaryBg: "bg-[#001430]",
    primaryText: "text-[#001430]",
    primaryHoverText: "hover:text-[#001430]",
    primaryHoverBg: "hover:bg-[#00204a]",
    
    accentText: "text-yellow-500",
    accentHoverText: "hover:text-yellow-600",
    accentBg: "bg-yellow-500",
    accentBorder: "border-yellow-500",
    
    gradientPrimaryToAccent: "bg-gradient-to-r from-[#001430] to-yellow-500",
    gradientPrimaryViaAccent: "bg-gradient-to-r from-[#001430] via-yellow-500 to-[#001430]",
    gradientOverlay: "bg-gradient-to-t from-[#001430]/60 to-transparent",
  },
  glass: {
    navbar: "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50",
    dropdown: "bg-white/95 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100",
    sidebar: "bg-white/80 border-b border-gray-100",
  },
  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    glowAccent: "shadow-[0_0_15px_rgba(202,138,4,0.3)]",
  },
  radius: {
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  },
  borders: {
    accentSubtle: "border-yellow-500/30",
    accentMedium: "border-yellow-500/50",
    light: "border-gray-100",
  }
};
