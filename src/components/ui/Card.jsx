const Card = ({ children, className = "" }) => {
  return (
    <div className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 p-6 overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#001430] to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {children}
    </div>
  );
};

export default Card;
