import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { theme } from "../../ui/theme";
import { useQuery, gql } from "@apollo/client";
import { useDepartmentMeta } from "../../../features/department/hooks/useDepartmentMeta";
import "./DepartmentNavbar.css";

const GET_DEPT_LOGO = gql`
  query GetDeptLogo($deptId: ID!) {
    getDeptIntroduction(deptId: $deptId, tenantId: "biet-college") {
      logoUrl
    }
  }
`;

const DepartmentNavbar = () => {
  const [menu, setMenu] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const shortName = location.pathname.split("/")[2] || "";

  const iconMap = {
    Home: "home",
    People: "groups",
    Research: "science",
    Academics: "school",
    Achievements: "emoji_events",
    Activities: "event",
    Alumni: "diversity_3",
    Gallery: "photo_library",
    Overview: "info",
    Faculty: "groups",
    Laboratories: "biotech",
    Events: "event",
    Placements: "work",
  };

  useEffect(() => {
    fetch("/data/departmentNavbar.json")
      .then((res) => res.json())
      .then((data) => setMenu(data.menu))
      .catch((err) => console.error(err));
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

  const { getId, getName, isReady } = useDepartmentMeta();
  const deptId = isReady ? getId(shortName) : null;
  const departmentName = isReady ? getName(shortName) : "Loading...";

  const { data: logoData } = useQuery(GET_DEPT_LOGO, {
    variables: { deptId },
    skip: !deptId,
    fetchPolicy: "cache-first",
  });

  const badgeLogo = logoData?.getDeptIntroduction?.logoUrl || "/dept-badge.png";

  return (
    <>
      {/* 🔷 TOP BAR - Scrolls out of view naturally */}
      <div className="z-[100] relative">
        <div className={`${theme.colors.primaryBg} relative overflow-hidden transition-all duration-500 ease-in-out border-b ${theme.borders.accentSubtle}`}>
        {/* Decorative ambient glow */}
        <div className={`absolute top-[-50px] right-[-50px] w-[300px] h-[300px] ${theme.colors.accentBg}/10 rounded-full blur-3xl pointer-events-none`}></div>

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-10">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 md:h-16 md:w-16 ${theme.radius.full} overflow-hidden border-2 ${theme.borders.accentMedium} ${theme.shadows.glowAccent} bg-white flex items-center justify-center`}>
              <img src="/assets/BIET_logo.png" className="h-full w-full object-contain p-1" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-wide drop-shadow-md">
                {departmentName || "Loading..."}
              </h2>
              <p className={`text-xs md:text-sm font-semibold ${theme.colors.accentText} tracking-wider hidden md:block`}>
                Bapuji Institute of Engineering & Technology
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-6">
            <div className={`flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-inner backdrop-blur-sm focus-within:${theme.borders.accentMedium}/50 transition-colors`}>
              <span className="material-symbols-outlined text-gray-300 mr-2">
                search
              </span>
              <input className="bg-transparent outline-none text-sm text-white placeholder-gray-300 w-48" placeholder="Search department..." />
            </div>

            <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
              <img src={badgeLogo} className="h-full w-full object-contain p-1" />
            </div>
          </div>
        </div>
      </div>
      </div>

      <header className="sticky top-0 z-[100]">
        {/* 🔥 NAVBAR - Becomes glassmorphic on scroll */}
        <nav className={`transition-all duration-300 ${scrolled ? theme.glass.navbar : "bg-white shadow-sm"} relative`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* MOBILE BUTTON */}
          <div className="md:hidden py-3">
             <button
              className={`p-2 ${theme.colors.primaryText} ${theme.colors.accentHoverText} transition-colors`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>

          <div className={`hidden md:flex absolute left-6 transition-all duration-500 items-center ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
            <img src={badgeLogo || "/assets/BIET_logo.png"} alt="Logo" className="h-10 w-10 object-contain drop-shadow-md bg-white rounded-full p-1" />
          </div>

          <div
            className={`flex-col md:flex-row md:justify-center md:gap-8 lg:gap-10 py-3 w-full ${
              mobileOpen ? "flex" : "hidden md:flex"
            }`}
          >
            {menu.map((item, i) => {
              const fullPath = `/departments/${shortName}${item.path || ""}`;

              return (
                <div key={i} className="relative group">

                  <NavLink
                    to={fullPath}
                    className={({ isActive }) => `flex items-center gap-1.5 px-2 py-2 text-sm font-bold transition-all duration-300 cursor-pointer ${isActive ? theme.colors.primaryText : `text-gray-600 ${theme.colors.primaryHoverText}`}`}
                  >
                    <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:scale-110 group-${theme.colors.accentHoverText}`}>
                      {iconMap[item.label]}
                    </span>

                    {item.label}

                    {/* Animated underline */}
                    <span className={`absolute left-0 -bottom-1 h-0.5 ${theme.colors.gradientPrimaryToAccent} w-0 group-hover:w-full transition-all duration-300`}></span>
                  </NavLink>

                  {/* DROPDOWN */}
                  {item.dropdown && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-[10px] w-64 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className={`${theme.glass.dropdown} ${theme.radius["2xl"]} animate-in fade-in slide-in-from-top-2 shadow-2xl overflow-hidden`}>
                        <div className={`absolute top-0 left-0 w-full h-1 ${theme.colors.gradientPrimaryToAccent}`} />
                        <div className="py-2 relative bg-white/60 backdrop-blur-3xl">
                          {item.dropdown.map((sub, j) => (
                            <NavLink
                              key={j}
                              to={`/departments/${shortName}${sub.path}`}
                              className={`flex items-center gap-3 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-[#D4AF37]/10 ${theme.colors.primaryHoverText} transition-all duration-300 relative group/link`}
                            >
                              <span className={`material-symbols-outlined text-[18px] text-[#0A1128]/40 group-hover/link:text-[#D4AF37] transform transition-transform group-hover/link:translate-x-1`}>
                                arrow_right
                              </span>
                              <span className="transform transition-transform duration-300 group-hover/link:translate-x-1">{sub.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </nav>
      </header>
    </>
  );
};

export default DepartmentNavbar;