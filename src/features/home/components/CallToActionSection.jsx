import React from "react";
import { useNavigate } from "react-router-dom";

const CallToActionSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-12 md:px-24 bg-[#001c40] text-white text-center">

      {/* TITLE */}
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Ready to Shape Your Future?
      </h2>

      {/* DESCRIPTION */}
      <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
        Join our vibrant academic community and take the first step toward a successful and innovative career.
      </p>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 flex-wrap">

        <button
          onClick={() => navigate("/admissions")}
          className="px-10 py-4 bg-yellow-400 text-black font-bold uppercase tracking-widest rounded-lg hover:shadow-xl transition-all"
        >
          Apply Now
        </button>

        <button
          onClick={() => navigate("/programs")}
          className="px-10 py-4 bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold uppercase tracking-widest rounded-lg hover:bg-white/20 transition-all"
        >
          Explore Programs
        </button>

      </div>

    </section>
  );
};

export default CallToActionSection;