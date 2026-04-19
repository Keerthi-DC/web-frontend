import { theme } from "../../../components/ui/theme";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useHomeDepartments } from "../hooks/useHomeDepartments";
import BietLoader from "../../../components/ui/BietLoader";
import ScrollReveal from "../../../components/ui/ScrollReveal";
import GlowingCard from "../../../components/ui/GlowingCard";
import { motion } from "framer-motion";

const DepartmentsSection = () => {
  const { departments, loading } = useHomeDepartments();
  const navigate = useNavigate();

  if (loading) return <BietLoader />;
  if (!departments.length) return null;

  return (
    <section className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 ${theme.colors.primaryBg} text-white rounded-[2rem] md:rounded-[3rem]`}>

      {/* HEADER */}
      <ScrollReveal direction="up" className="text-center mb-16">
        <h3 className="text-4xl font-bold mb-4">
          Specialized Departments
        </h3>

        <p className="text-white/60 text-sm max-w-xl mx-auto">
          Explore our diverse academic departments shaping future innovators.
        </p>
      </ScrollReveal>

      {/* GRID */}
      <ScrollReveal direction="up" delay={0.2} staggerChildren staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

        {departments.map((dep, index) => (
          <motion.div key={index} variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}>
            <GlowingCard padding="p-0">
              <div
                onClick={() => navigate(`/departments/${dep.shortName}`)}
                className="bg-white/5 backdrop-blur-md p-6 h-full text-center cursor-pointer transition-colors hover:bg-white/10"
              >
                {/* SHORT NAME */}
                <h5 className={`font-bold ${theme.colors.accentText} mb-2 text-lg`}>
                  {dep.shortName}
                </h5>

                {/* FULL NAME */}
                <p className="text-xs text-white/70">
                  {dep.name}
                </p>
              </div>
            </GlowingCard>
          </motion.div>
        ))}

      </ScrollReveal>

      {/* BUTTON */}
      <ScrollReveal direction="fade" delay={0.4} className="mt-16 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/academics/departments")}
          className={theme.buttons.primary}
        >
          View All Departments →
        </motion.button>
      </ScrollReveal>

    </section>
  );
};

export default DepartmentsSection;