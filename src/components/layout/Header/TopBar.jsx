import React from "react";
import { Link } from "react-router-dom";
const logo = "/assets/BIET_logo.png";

const TopBar = () => {
  const links = [
    { label: "Students", href: "/students" },
    { label: "Staff", href: "/staff" },
    { label: "Parents", href: "/parents" },
    { label: "Visitors", href: "/visitors" },
    { label: "Alumni", href: "/alumni" },
    { label: "Career", href: "/career" },
  ];

  return (
    <div className="bg-[#001430] relative overflow-hidden text-gray-200 text-xs md:text-sm px-4 md:px-8 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-md z-50 border-b border-yellow-500/30">
      {/* Decorative ambient glow */}
      <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* LEFT */}
      <div className="flex items-center gap-4 relative z-10">
        <Link to="/" className="group">
          <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-[0_0_15px_rgba(202,138,4,0.3)] bg-white flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:border-yellow-400">
            <img src={logo} alt="Logo" className="object-contain h-full w-full p-1 transition-transform duration-500 group-hover:scale-110" />
          </div>
        </Link>

        <div className="leading-tight flex flex-col justify-center">
          <h1 className="text-sm md:text-lg font-extrabold text-white tracking-wide drop-shadow-md">
            Bapuji Institute of Engineering And Technology
          </h1>
          <h1 className="text-xs md:text-sm font-semibold text-yellow-500 tracking-wider">
            ಬಾಪೂಜಿ ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ತಾಂತ್ರಿಕ ಮಹಾವಿದ್ಯಾಲಯ
          </h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap gap-4 md:gap-6 justify-start md:justify-end relative z-10">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="relative font-medium text-gray-300 hover:text-white transition-colors text-xs md:text-sm group"
          >
            {link.label}
            {/* Animated underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBar;