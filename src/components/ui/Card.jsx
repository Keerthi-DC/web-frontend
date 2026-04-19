import { theme } from "./theme";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`group relative bg-white ${theme.radius.xl} ${theme.shadows.sm} hover:${theme.shadows.lg} border ${theme.borders.light} transition-all duration-300 p-6 overflow-hidden ${className}`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${theme.colors.gradientPrimaryToAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      {children}
    </div>
  );
};

export default Card;
