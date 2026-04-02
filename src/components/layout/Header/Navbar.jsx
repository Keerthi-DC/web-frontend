import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import TopBar from "./TopBar";
import logo from "../../../../assets/BIET_logo.png";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/data/navbar.json")
      .then((res) => res.json())
      .then((data) => setMenuItems(data.menu));
  }, []);

  // ICON MAP
  const iconMap = {
    Academics: "school",
    Admissions: "auto_stories",
    Accreditations: "verified",
    "Campus Life": "park",
    About: "info",
    Research: "science",
    "News & Events": "newspaper",
  };

  return (
    <header className="sticky top-0 z-50">
      {/* TOP BAR */}
      <TopBar />

      {/* MAIN NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-sm border-b">
        <div className="w-full px-6 py-4 flex items-center">
          
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-4">
            <Link to="/">
             <div className="h-16 w-16 rounded-full overflow-hidden border border-gray-200 shadow-md flex items-center justify-center bg-white">
              <img
                src={logo}
                alt="College Logo"
                className="h-full w-full object-contain"
              />
            </div>
            </Link>

            <div className="leading-tight">
              <h1 className="text-lg font-extrabold text-[#001430] tracking-wide">
                Bapuji Institute of
              </h1>
              <h1 className="text-sm font-extrabold text-[#001430] tracking-wide">
                Engineering & Technology
              </h1>
            </div>
          </div>

          {/* CENTER: MENU */}
          <div className="hidden md:flex flex-1 justify-evenly items-center">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                
                <NavLink
                  to={item.path || "#"}
                  end
                  className={({ isActive }) =>
  `flex items-center gap-2 text-sm font-semibold transition-all ${
    isActive
      ? "text-[#001430]"   // only color
      : "text-gray-500 hover:text-blue-700"
  }`
}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {iconMap[item.label]}
                  </span>

                  {item.label}
                </NavLink>

                {/* DROPDOWN */}
                {item.dropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200 overflow-hidden z-50">

                    {item.dropdown.map((sub) => (
                      <NavLink
                        key={sub.label}
                        to={sub.path}
                        className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <span className="material-symbols-outlined text-[16px] text-gray-400">
                          arrow_right
                        </span>

                        {sub.label}
                      </NavLink>
                    ))}

                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: ICONS */}
          <div className="flex items-center gap-3">
          

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-white px-6 pb-4 space-y-2 border-t">
            {menuItems.map((item) => (
              <div key={item.label}>
                <NavLink
                  to={item.path || "#"}
                  end
                  className="flex items-center gap-2 py-3 text-gray-800 font-medium"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {iconMap[item.label]}
                  </span>

                  {item.label}
                </NavLink>

                {item.dropdown &&
                  item.dropdown.map((sub) => (
                    <NavLink
                      key={sub.label}
                      to={sub.path}
                      className="flex items-center gap-2 pl-6 py-2 text-sm text-gray-500"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_right
                      </span>

                      {sub.label}
                    </NavLink>
                  ))}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;