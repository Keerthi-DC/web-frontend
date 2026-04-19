import { theme } from "./theme";
import { motion } from "framer-motion";

const PageContainer = ({ children, className = "" }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative p-4 md:p-8 mx-2 my-4 md:m-8 lg:m-12 bg-white min-h-screen ${theme.radius["2xl"]} ${theme.shadows.md} border ${theme.borders.light} overflow-hidden ${className}`}
    >
      {/* Decorative top accent line */}
      <div className={`absolute top-0 left-0 w-full h-1 ${theme.colors.gradientPrimaryViaAccent}`} />
      
      {/* Subtle BIET Watermark */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] bg-no-repeat bg-center bg-fixed"
        style={{
          backgroundImage: "url('/assets/BIET_logo.png')",
          backgroundSize: "50%",
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default PageContainer;
