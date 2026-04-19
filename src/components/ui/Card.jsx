import { theme } from "./theme";
import { motion } from "framer-motion";

const Card = ({ children, className = "" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${theme.glass.card} ${theme.radius.xl} transition-all duration-500 p-6 overflow-hidden ${className}`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${theme.colors.gradientPrimaryToAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      {children}
    </motion.div>
  );
};

export default Card;
