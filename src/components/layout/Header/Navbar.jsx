import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import TopBar from "./TopBar";
const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    fetch("/data/navbar.json")
      .then((res) => res.json())
      .then((data) => setMenuItems(data.menu));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const iconMap = {
    Academics: "school",
    Admissions: "auto_stories",
    Accreditations: "verified",
    "Campus Life": "park",
    About: "info",
    Research: "science",
    "News & Events": "newspaper",
    "Institutional Cells": "hub", // ⭐ NEW
    Placement: "work", // ⭐ NEW
  };

  return (
    <header className="sticky top-0 z-50">
      <TopBar />

      <nav className=" bg-gray-50 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-700 cursor-pointer">
        <div className="w-full px-6 py-4 flex items-center">

          {/* LOGO */}
          

          {/* DESKTOP MENU */}
          <div className="hidden md:flex flex-1 justify-evenly items-center">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative z-50"
                onClick={(e) => e.stopPropagation()} // prevent closing
              >

                {/* CLICKABLE PARENT */}
                <div
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === item.label ? null : item.label
                    )
                  }
                  className={`flex items-center gap-2 text-sm font-semibold cursor-pointer relative group transition duration-300 ${activeDropdown === item.label ? "text-blue-700" : "text-gray-600 hover:text-blue-700"}`}>

                  <span className="material-symbols-outlined text-[18px]">
                    {iconMap[item.label]}
                  </span>
                  {item.label}
                </div>

                {/* DROPDOWN */}
                {item.dropdown && activeDropdown === item.label && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-60 bg-white rounded-2xl shadow-xl transition-all duration-200 origin-top animate-in fade-in zoom-in-95">
                    {item.dropdown.map((sub) => (
                      <NavLink
                        key={sub.label}
                        to={sub.path}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
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

          {/* MOBILE BUTTON */}
          <div className="flex items-center gap-3">
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

                {/* MOBILE PARENT */}
                <div className="flex items-center gap-2 py-3 text-gray-800 font-medium">
                  <span className="material-symbols-outlined text-[18px]">
                    {iconMap[item.label]}
                  </span>
                  {item.label}
                </div>

                {/* MOBILE DROPDOWN */}
                {item.dropdown &&
                  item.dropdown.map((sub) => (
                    <NavLink
                      key={sub.label}
                      to={sub.path}
                      onClick={() => setMobileOpen(false)}
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