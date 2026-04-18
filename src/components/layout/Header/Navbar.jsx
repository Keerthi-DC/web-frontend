import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import TopBar from "./TopBar";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch("/data/navbar.json")
      .then((res) => res.json())
      .then((data) => setMenuItems(data.menu));
  }, []);

  // Handle Scroll for Glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    "Institutional Cells": "hub",
    Placement: "work",
  };

  return (
    <header className="sticky top-0 z-[100]">
      <div className={`transition-all duration-500 ease-in-out ${scrolled ? "h-0 overflow-hidden opacity-0" : "opacity-100"}`}>
        <TopBar />
      </div>

      <nav className={`transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50" : "bg-white shadow-sm"} flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#001430] cursor-pointer`}>
        <div className="w-full px-6 py-4 flex items-center justify-between md:justify-center relative">
          
          {/* LOGO - visible on mobile or when scrolled */}
          <div className={`md:hidden flex items-center gap-2 font-bold text-[#001430]`}>
            <span>Menu</span>
          </div>
          
          <div className={`hidden md:flex absolute left-6 transition-all duration-500 ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
             <img src="/assets/BIET_logo.png" alt="Logo" className="h-10 w-10 object-contain drop-shadow-md" />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex justify-evenly items-center gap-6 lg:gap-10">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* CLICKABLE PARENT */}
                <div
                  className={`flex items-center gap-1.5 text-sm font-bold cursor-pointer relative transition-colors duration-300 ${activeDropdown === item.label ? "text-[#001430]" : "text-gray-600 hover:text-[#001430]"}`}>
                  
                  <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:text-yellow-600">
                    {iconMap[item.label]}
                  </span>
                  {item.label}

                  {/* Animated underline */}
                  <span className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#001430] to-yellow-500 transition-all duration-300 ${activeDropdown === item.label ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </div>

                {/* DROPDOWN */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-300 animate-in fade-in slide-in-from-top-2 overflow-hidden z-50">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#001430] to-yellow-500" />
                    <div className="py-2">
                      {item.dropdown.map((sub) => (
                        <NavLink
                          key={sub.label}
                          to={sub.path}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#001430] transition-colors relative group/link"
                        >
                          <span className="material-symbols-outlined text-[18px] text-yellow-500 transform transition-transform group-hover/link:translate-x-1">
                            arrow_right
                          </span>
                          <span className="transform transition-transform group-hover/link:translate-x-1">{sub.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex md:hidden items-center gap-3">
            <button
              className="p-2 text-[#001430] hover:text-yellow-600 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="material-symbols-outlined text-2xl">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-300 origin-top overflow-hidden ${mobileOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"}`}>
          <div className="px-6 py-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.label} className="border-b border-gray-50 last:border-0 pb-2">
                {/* MOBILE PARENT */}
                <div className="flex items-center gap-3 py-3 text-[#001430] font-bold">
                  <span className="material-symbols-outlined text-[20px] text-yellow-600">
                    {iconMap[item.label]}
                  </span>
                  {item.label}
                </div>

                {/* MOBILE DROPDOWN */}
                {item.dropdown && (
                  <div className="pl-6 space-y-1">
                    {item.dropdown.map((sub) => (
                      <NavLink
                        key={sub.label}
                        to={sub.path}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-2.5 text-sm font-medium text-gray-600 hover:text-[#001430]"
                      >
                        <span className="material-symbols-outlined text-[16px] text-yellow-500">
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;