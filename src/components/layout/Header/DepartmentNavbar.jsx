import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./DepartmentNavbar.css";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

const DepartmentNavbar = () => {
  const [menu, setMenu] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [badgeLogo, setBadgeLogo] = useState("/dept-badge.png");

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

  useEffect(() => {
    if (!shortName) return;

    const fetchDeptData = async () => {
      try {
        const res1 = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            query: `
              query ListDepartments {
                listDepartments(tenantId: "biet-college"){
                  items {
                    departmentId
                    name
                    shortName
                  }
                }
              }
            `,
          }),
        });

        const result1 = await res1.json();
        const departments =
          result1?.data?.listDepartments?.items || [];

        const currentDept = departments.find(
          (d) => d.shortName === shortName
        );

        const deptId = currentDept?.departmentId;
        setDepartmentName(currentDept?.name || "Department");

        if (deptId) {
          const res2 = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
            body: JSON.stringify({
              query: `
                query GetDeptLogo($deptId: ID!) {
                  getDeptIntroduction(deptId: $deptId, tenantId: "biet-college") {
                    logoUrl
                  }
                }
              `,
              variables: { deptId },
            }),
          });

          const result2 = await res2.json();
          const logo =
            result2?.data?.getDeptIntroduction?.logoUrl;

          if (logo) setBadgeLogo(logo);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDeptData();
  }, [shortName]);

  return (
    <header className="sticky top-0 z-50">

      {/* 🔷 TOP */}
      <div className="bg-white/90 backdrop-blur-xl border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <img src="/assets/BIET_logo.png" className="h-14" />
            <div>
              <h2 className="font-bold text-black">
                {departmentName || "Loading..."}
              </h2>
              <p className="text-sm text-gray-500 hidden md:block">
                Bapuji Institute of Engineering & Technology
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow-sm">
              <span className="material-symbols-outlined text-gray-400 mr-2">
                search
              </span>
              <input className="outline-none text-sm" placeholder="Search" />
            </div>

            <img src={badgeLogo} className="h-14" />
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* 🔥 NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-xl border-b shadow-sm">
        <div
          className={`max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row md:justify-center md:gap-10 ${
            mobileOpen ? "block" : "hidden md:flex"
          }`}
        >
          {menu.map((item, i) => {
            const fullPath = `/departments/${shortName}${item.path || ""}`;

            return (
              <div key={i} className="relative group">

                <NavLink
                  to={fullPath}
                  className="flex items-center gap-2 px-2 py-1 text-sm font-semibold 
                  text-black transition-all duration-200 
                  hover:scale-105 hover:opacity-70"
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
                  transition-all duration-200 z-50">

                    {item.dropdown.map((sub, j) => (
                      <NavLink
                        key={j}
                        to={`/departments/${shortName}${sub.path}`}
                        className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <span className="material-symbols-outlined text-gray-400 text-[16px]">
                          arrow_right
                        </span>
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default DepartmentNavbar;