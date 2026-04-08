import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#001c40] text-white pt-16 pb-8">
      <div className="px-12 md:px-24">

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* LOGO + ADDRESS */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Your Logo</h3>

            <p className="text-sm text-gray-300 leading-relaxed">
              325, Shamanur Rd, BIET,<br />
              Davanagere, Karnataka 577004
            </p>
          </div>

          {/* COLUMN */}
          {[
            {
              title: "About Us",
              links: ["BEA", "Director Office", "Principal Office", "Campus Life"]
            },
            {
              title: "Academics",
              links: ["Undergraduate", "Postgraduate", "Research"]
            },
            {
              title: "Information For",
              links: ["Current Students", "Faculty / Staff", "Alumni", "Visitors", "Career"]
            },
            {
              title: "Tools",
              links: ["Student Portal", "ERP Login", "Downloads"]
            }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-yellow-400 mb-4">
                {section.title}
              </h4>

              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to="#"
                      className="text-sm text-gray-300 hover:text-white transition"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-gray-400">
            Copyright © 2025 Bapuji Institute of Engineering and Technology, Davanagere
          </p>

          <div className="flex gap-6 text-xs uppercase tracking-wider">
            <Link to="#" className="hover:text-yellow-400">Terms of use</Link>
            <Link to="#" className="hover:text-yellow-400">Privacy Policy</Link>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;