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
    <div className="bg-gray-200 text-gray-700 text-xs md:text-sm px-4 md:px-6 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <div className="h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden border shadow bg-white flex items-center justify-center">
            <img src={logo} alt="Logo" className="object-contain h-full w-full" />
          </div>
        </Link>

        <div className="leading-tight">
          <h1 className="text-sm md:text-base font-bold text-[#001430]">
            Bapuji Institute of Engineering And Technology
          </h1>
          <h1 className="text-xs md:text-sm font-bold text-[#001430]">
            ಬಾಪೂಜಿ ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ತಾಂತ್ರಿಕ ಮಹಾವಿದ್ಯಾಲಯ
          </h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap gap-3 md:gap-4 justify-start md:justify-end">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="hover:text-yellow-600 transition text-xs md:text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopBar;