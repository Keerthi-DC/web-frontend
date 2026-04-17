import React from "react";

const ResearchSection = () => {
  return (
    <section className="py-24 px-12 md:px-24 bg-[#f8f9fa]">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

        {/* ================= LEFT ================= */}
        <div>
          <h2 className="text-4xl font-bold text-[#001c40] mb-10">
            Research & Innovation
          </h2>

          {/* MAIN CARD */}
          <div className="bg-white p-12 rounded-3xl shadow-sm">

            <div className="flex items-center gap-6 mb-8">

              <span className="material-symbols-outlined text-5xl text-yellow-400">
                menu_book
              </span>

              <div>
                <h4 className="text-4xl font-extrabold text-[#001c40]">
                  120+
                </h4>

                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Publications This Year
                </p>
              </div>

            </div>

            <p className="text-gray-600 leading-relaxed text-lg italic">
              Our faculty and students are constantly pushing the boundaries of knowledge, 
              with groundbreaking research featured in leading international journals.
            </p>

          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div>
          <h2 className="text-4xl font-bold text-[#001c40] mb-10">
            Innovation Highlights
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-[#001c40] p-8 rounded-2xl text-white">
              <h4 className="text-3xl font-bold mb-1">45+</h4>
              <p className="text-[10px] uppercase font-bold text-white/50">
                Patents Filed
              </p>
            </div>

            <div className="bg-yellow-200 p-8 rounded-2xl text-[#001c40]">
              <h4 className="text-3xl font-bold mb-1">6+</h4>
              <p className="text-[10px] uppercase font-bold opacity-60">
                Research Labs
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-2xl">
              <h4 className="text-3xl font-bold text-[#001c40] mb-1">$2.5M</h4>
              <p className="text-[10px] uppercase font-bold text-gray-400">
                Grants Received
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-2xl">
              <h4 className="text-3xl font-bold text-[#001c40] mb-1">20+</h4>
              <p className="text-[10px] uppercase font-bold text-gray-400">
                Active Projects
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ResearchSection;