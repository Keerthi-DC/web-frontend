import React from "react";
import { Link, useLocation } from "react-router-dom";

const DepartmentFooter = () => {
  const location = useLocation();

  // Extract shortName exactly like navbar
  const shortName = location.pathname.split("/")[2] || "";

  // Simple mapping
  const deptMap = {
    cse: "Computer Science and Engineering",
    ise: "Information Science and Engineering",
    ece: "Electronics and Communication Engineering",
    mech: "Mechanical Engineering",
    civil: "Civil Engineering",
  };

  const departmentName =
    deptMap[shortName?.toLowerCase()] || shortName?.toUpperCase() || "Department";

  return (
    <footer className="bg-[#001430] text-white mt-20 relative overflow-hidden border-t border-yellow-500/30">
      {/* Decorative ambient glows */}
      <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-white drop-shadow-md">
              {departmentName}
            </h2>
            <p className="text-sm text-blue-100/70 font-medium leading-relaxed">
              Bapuji Institute of Engineering & Technology,
              Davangere, Karnataka
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-bold text-yellow-500 mb-6 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={`/departments/${shortName}`} className="text-blue-100/70 hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to={`/departments/${shortName}/people`} className="text-blue-100/70 hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
                  People
                </Link>
              </li>
              <li>
                <Link to={`/departments/${shortName}/research`} className="text-blue-100/70 hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
                  Research
                </Link>
              </li>
              <li>
                <Link to={`/departments/${shortName}/gallery`} className="text-blue-100/70 hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to={`/departments/${shortName}/alumni`} className="text-blue-100/70 hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
                  Alumni
                </Link>
              </li>
            </ul>
          </div>

          {/* Academics Column */}
          <div>
            <h3 className="text-sm font-bold text-yellow-500 mb-6 uppercase tracking-wider">
              Academics
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to={`/departments/${shortName}/academics`} className="text-blue-100/70 hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
                  Programs
                </Link>
              </li>
              <li>
                <Link to={`/departments/${shortName}/activities`} className="text-blue-100/70 hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
                  Activities
                </Link>
              </li>
              <li>
                <Link to={`/departments/${shortName}/achievements`} className="text-blue-100/70 hover:text-yellow-500 hover:translate-x-1 transition-all inline-block">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold text-yellow-500 mb-6 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-blue-100/70">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-yellow-500 text-[20px]">mail</span>
                <a href={`mailto:${shortName}@biet.edu`} className="hover:text-white transition-colors">
                  {shortName || "hod"}@biet.edu
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-yellow-500 text-[20px]">phone</span>
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-yellow-500 text-[20px]">location_on</span>
                <span>BIET Campus, Davangere</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center relative z-10">
          <p className="text-xs text-blue-200/60 font-medium">
            © {new Date().getFullYear()} {departmentName} - BIET. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-xs font-medium">
            <Link to="#" className="text-blue-200/60 hover:text-yellow-500 transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-blue-200/60 hover:text-yellow-500 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default DepartmentFooter;