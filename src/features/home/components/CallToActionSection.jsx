import { theme } from "../../../components/ui/theme";
import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "../../../components/ui/ScrollReveal";

const CallToActionSection = () => {
  const navigate = useNavigate();

  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 ${theme.colors.primaryBg} text-white text-center rounded-[2rem] md:rounded-none`}>

      <ScrollReveal direction="scaleUp" className="max-w-4xl mx-auto">
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
            className={theme.buttons.primary}
          >
            Apply Now
          </button>

          <button
            onClick={() => navigate("/programs")}
            className={theme.buttons.glass}
          >
            Explore Programs
          </button>

        </div>
      </ScrollReveal>

    </section>
  );
};

export default CallToActionSection;