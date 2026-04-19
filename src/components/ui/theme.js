export const theme = {
  colors: {
    primaryBg: "bg-[#0A1128]", // Midnight Blue
    primaryText: "text-[#0A1128]",
    primaryHoverText: "hover:text-[#1c2c59]",
    primaryHoverBg: "hover:bg-[#1c2c59]",
    
    accentText: "text-[#D4AF37]", // Champagne Gold
    accentHoverText: "hover:text-[#b5952f]",
    accentBg: "bg-[#D4AF37]",
    accentBorder: "border-[#D4AF37]",
    
    gradientPrimaryToAccent: "bg-gradient-to-r from-[#0A1128] via-[#1c2c59] to-[#D4AF37]",
    gradientPrimaryViaAccent: "bg-gradient-to-r from-[#0A1128] via-[#D4AF37] to-[#0A1128]",
    gradientOverlay: "bg-gradient-to-t from-[#0A1128]/80 via-[#0A1128]/40 to-transparent",
  },
  glass: {
    navbar: "bg-white/60 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-white/50",
    dropdown: "bg-white/70 backdrop-blur-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/60",
    sidebar: "bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
    card: "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
  },
  shadows: {
    sm: "shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
    md: "shadow-[0_8px_30px_rgba(0,0,0,0.05)]",
    lg: "shadow-[0_16px_50px_rgba(0,0,0,0.08)]",
    glowAccent: "shadow-[0_0_25px_rgba(212,175,55,0.4)]",
  },
  radius: {
    md: "rounded-xl",
    lg: "rounded-[1.25rem]",
    xl: "rounded-[1.5rem]",
    "2xl": "rounded-[2rem]",
    full: "rounded-full",
  },
  borders: {
    accentSubtle: "border-[#D4AF37]/20",
    accentMedium: "border-[#D4AF37]/50",
    light: "border-white/60",
  },
  buttons: {
    primary: "inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-500 bg-[#D4AF37] text-[#0A1128] px-8 py-3 rounded-[1.25rem] shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95",
    secondary: "inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-500 bg-white/60 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-white/50 px-8 py-3 rounded-[1.25rem] text-[#0A1128] hover:bg-white/80 active:scale-95",
    glass: "inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-[1.25rem] text-white hover:bg-white/20 hover:scale-105 active:scale-95",
    outline: "inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-500 border-2 border-[#0A1128] text-[#0A1128] px-8 py-3 rounded-[1.25rem] hover:bg-[#0A1128] hover:text-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-95",
    link: "inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 text-[#D4AF37] hover:text-[#b5952f] active:scale-95 group",
  }
};
