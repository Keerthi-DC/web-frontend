import { theme } from "./theme";

const SectionTitle = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center mb-8 ${className}`}>
      <h2 className={`text-3xl font-bold ${theme.colors.primaryText} text-center tracking-tight`}>
        {children}
      </h2>
      <div className="w-24 h-1.5 mt-3 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-full opacity-80" />
    </div>
  );
};

export default SectionTitle;
