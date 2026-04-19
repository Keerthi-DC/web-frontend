import { theme } from "./theme";
import React from 'react';
import { motion } from 'framer-motion';

const BietLoader = ({ fullScreen = false }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
    : "flex flex-col items-center justify-center w-full py-24";

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Outer glowing spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#001c40] border-r-[#001c40]/30 shadow-[0_0_15px_rgba(0,28,64,0.2)]"
        />
        
        {/* Inner reverse spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-[#facc15] border-l-[#facc15]/40"
        />
        
        {/* Pulsing BIET Logo inside */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md p-1"
        >
          <img 
            src="/assets/BIET_logo.png" 
            alt="BIET Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-6 flex flex-col items-center"
      >
        <span className={`${theme.colors.primaryText} font-bold tracking-[0.2em] text-sm uppercase`}>
          BIET Davangere
        </span>
        <span className="text-gray-400 text-xs tracking-wider mt-1">
          Loading Data...
        </span>
      </motion.div>
    </div>
  );
};

export default BietLoader;
