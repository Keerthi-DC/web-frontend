import React from "react";
import { Link, useLocation } from "react-router-dom";

const DepartmentFooter = () => {
  const location = useLocation();

  // ✅ extract shortName exactly like navbar
  const shortName = location.pathname.split("/")[2] || "";

  // ✅ simple mapping (same as backend)
  const deptMap = {
    cse: "Computer Science and Engineering",
    ise: "Information Science and Engineering",
    ece: "Electronics and Communication Engineering",
    mech: "Mechanical Engineering",
    civil: "Civil Engineering",
  };

  const departmentName =
    deptMap[shortName?.toLowerCase()] || shortName?.toUpperCase();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* ✅ FIXED */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              {departmentName} Department
            </h2>

            <p className="text-sm text-gray-400">
              Bapuji Institute of Engineering & Technology,
              Davangere
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-4 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to={`/departments/${shortName}`}>Home</Link></li>
              <li><Link to={`/departments/${shortName}/people`}>People</Link></li>
              <li><Link to={`/departments/${shortName}/research`}>Research</Link></li>
              <li><Link to={`/departments/${shortName}/alumni`}>Alumni</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-4 uppercase">
              Academics
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to={`/departments/${shortName}/academics`}>Programs</Link></li>
              <li><Link to={`/departments/${shortName}/activities`}>Activities</Link></li>
              <li><Link to={`/departments/${shortName}/achievements`}>Achievements</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-yellow-400 mb-4 uppercase">
              Contact
            </h3>
            <p className="text-sm text-gray-400">
              Email: cse@biet.edu <br />
              Phone: +91 XXXXX XXXXX
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} BIET Department
          </p>

          <div className="flex gap-4 text-xs">
            <Link to="#" className="hover:text-yellow-400">Privacy</Link>
            <Link to="#" className="hover:text-yellow-400">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default DepartmentFooter;