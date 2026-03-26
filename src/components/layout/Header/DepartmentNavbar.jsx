import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./DepartmentNavbar.css";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

const DepartmentNavbar = () => {
  const [menu, setMenu] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [badgeLogo, setBadgeLogo] = useState("/dept-badge.png");

  const location = useLocation();

  // 🔥 DEBUG PATH
  console.log("FULL PATH:", location.pathname);

  const shortName = location.pathname.split("/")[2] || "";

  console.log("SHORT NAME:", shortName);
  console.log("API_URL:", API_URL);
  console.log("API_KEY:", API_KEY);

  const icons = [
    "https://img.icons8.com/color/48/graduation-cap.png",
    "https://img.icons8.com/color/48/book.png",
    "https://img.icons8.com/color/48/source-code.png",
    "https://img.icons8.com/color/48/microscope.png",
    "https://img.icons8.com/color/48/artificial-intelligence.png",
    "https://img.icons8.com/color/48/combo-chart.png",
    "https://img.icons8.com/color/48/laptop.png",
    "https://img.icons8.com/color/48/database.png",
    "https://img.icons8.com/color/48/engineering.png",
    "https://img.icons8.com/color/48/network.png",
  ];

  // ✅ Fetch menu
  useEffect(() => {
    console.log("Fetching menu JSON...");
    fetch("/data/departmentNavbar.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Menu Data:", data);
        setMenu(data.menu);
      })
      .catch((err) => console.error("Failed to load menu", err));
  }, []);

  // ✅ Fetch department name + logo
  useEffect(() => {
    console.log("USE EFFECT TRIGGERED");

    if (!shortName) {
      console.log("❌ shortName is EMPTY → API will NOT call");
      return;
    }

    const fetchDeptData = async () => {
      try {
        console.log("🚀 Calling listDepartments API...");

        const res1 = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            query: `
              query ListDepartments {
                listDepartments {
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

        console.log("✅ listDepartments response received");

        const result1 = await res1.json();
        console.log("📦 listDepartments DATA:", result1);

        const departments =
          result1?.data?.listDepartments?.items || [];

        const currentDept = departments.find(
          (d) => d.shortName === shortName
        );

        console.log("🎯 Current Dept:", currentDept);

        const deptId = currentDept?.departmentId;
        console.log("📌 Dept ID:", deptId);

        setDepartmentName(currentDept?.name || "Department");

        // 🔹 STEP 2: Fetch logo
        if (deptId) {
          console.log("🚀 Calling getDeptIntroduction API...");

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

          console.log("✅ Logo API response received");

          const result2 = await res2.json();
          console.log("🖼 Logo DATA:", result2);
          console.log("❌ ERRORS:", result2.errors);

          const logo =
            result2?.data?.getDeptIntroduction?.logoUrl;

          console.log("🔗 Logo URL:", logo);

          if (logo) {
            setBadgeLogo(logo);
          } else {
            console.log("⚠️ Logo is NULL → using default");
          }
        } else {
          console.log("❌ No deptId found → skipping logo API");
        }
      } catch (err) {
        console.error("❌ ERROR fetching department data:", err);
        setDepartmentName("Department");
      }
    };

    fetchDeptData();
  }, [shortName]);

  return (
    <header className="w-full shadow-md sticky top-0 z-50 bg-white">
      
      <div className="bg-[#0a2a66] text-white relative">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center space-x-4">
            <img
              src="/assets/BIET_logo.png"
              alt="Department Logo"
              className="h-16 w-auto animate-float"
            />

            <div>
              <h2 className="text-lg font-semibold">
                {departmentName || "Loading..."}
              </h2>
              <p className="text-sm text-blue-200 hidden md:block">
                Bapuji Institute of Engineering & Technology
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded text-black text-sm focus:outline-none"
            />

            <img
              src={badgeLogo}
              alt="Department Badge"
              className="h-16 w-auto animate-float"
              onError={(e) => {
                console.log("❌ Image failed to load → fallback");
                e.target.src = "/dept-badge.png";
              }}
            />
          </div>

          <button
            className="md:hidden text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        <div className="icon-strip">
          <div className="icon-track">
            {[...icons, ...icons].map((src, idx) => (
              <img key={idx} src={src} alt="icon" className="icon-item" />
            ))}
          </div>
        </div>
      </div>

      <nav className="bg-[#001a4d] text-white text-sm flex items-center justify-end py-1 px-6">
        <div
          className={`max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-center md:space-x-8 py-3 ${
            mobileOpen ? "block" : "hidden md:flex"
          }`}
        >
          {menu.map((item, i) => (
            <div key={i} className="relative group">
              
              <NavLink
                to={`/departments/${shortName}${item.path || ""}`}
                className="text-white hover:text-blue-300 font-medium px-3 py-2"
              >
                {item.label}
              </NavLink>

              {item.dropdown && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-30">
                  <AnimatePresence>
                    {item.dropdown.map((sub, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <NavLink
                          to={`/departments/${shortName}${sub.path}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {sub.label}
                        </NavLink>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default DepartmentNavbar;