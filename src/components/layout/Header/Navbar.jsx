import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import TopBar from "./TopBar";
import logo from "../../../../assets/BIET_logo.png";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  useEffect(() => {
    fetch("/data/navbar.json")
      .then((res) => res.json())
      .then((data) => setMenuItems(data.menu));
  }, []);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const toggleDropdown = (index) =>
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />

      <nav className="w-full bg-[#0a2a66] text-white py-3 px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src={logo} alt="College Logo" className="h-16 w-auto animate-float" />
          </Link>

          <div className="text-left">
            <div className="font-semibold text-lg">Bapuji Institute of</div>
            <div className="text-lg"> Engineering &Technology</div>
            <div className="text-xs">Autonomous Institute</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">

          {menuItems.map((item, idx) => (
            <div key={item.label} className="relative group">

              <NavLink
                to={"#"}
                className="hover:text-yellow-300 transition"
              >
                {item.label}
              </NavLink>

              {item.dropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                transition-all duration-200">

                  {item.dropdown.map((sub) => (
                    <NavLink
                      key={sub.label}
                      to={sub.path}
                      className="block px-5 py-3 text-sm hover:bg-blue-50"
                    >
                      {sub.label}
                    </NavLink>
                  ))}

                </div>
              )}
            </div>
          ))}

        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          ☰
        </button>

      </nav>
    </header>
  );
};

export default Navbar;