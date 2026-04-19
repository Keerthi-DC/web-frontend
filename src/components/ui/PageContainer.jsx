import { theme } from "./theme";

const PageContainer = ({ children, className = "" }) => {
  return (
    <section className={`relative p-4 md:p-8 m-4 bg-gray-50/80 min-h-screen ${theme.radius["2xl"]} ${theme.shadows.sm} border ${theme.borders.light} overflow-hidden ${className}`}>
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
    </section>
  );
};

export default PageContainer;
