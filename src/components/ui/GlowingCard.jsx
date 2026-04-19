import React from "react";
import { motion } from "framer-motion";

const GlowingCard = ({ children, className = "", glowColor = "#D4AF37", padding = "p-1" }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-[1.5rem] overflow-hidden group ${className}`}
    >
      {/* Background border beam animation */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, transparent 0deg, ${glowColor}50 180deg, transparent 360deg)`,
          animation: "border-beam 4s linear infinite",
        }}
      />
      
      {/* Dark overlay to mask the center of the beam */}
      <div className={`relative h-full w-full rounded-[1.4rem] bg-[#0A1128]/90 backdrop-blur-xl border border-white/10 ${padding} z-10 overflow-hidden`}>
        {/* Subtle inner hover glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at 50% 120%, ${glowColor}, transparent)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-20 h-full">
          {children}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes border-beam {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </motion.div>
  );
};

export default GlowingCard;
