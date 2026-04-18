const PageContainer = ({ children, className = "" }) => {
  return (
    <section className={`relative p-4 md:p-8 m-4 bg-gray-50/80 min-h-screen rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#001430] via-yellow-500 to-[#001430]" />
      
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
