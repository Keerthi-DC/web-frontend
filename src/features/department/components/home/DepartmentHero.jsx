import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DepartmentEventsPreview from "./DepartmentEventsPreview";
import { useDepartmentMeta } from "../../hooks/useDepartmentMeta";
import useDepartmentHome from "../../hooks/useDepartmentHome";

import "./DepartmentHero.css";
import BietLoader from "../../../../components/ui/BietLoader";


const DepartmentHero = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();
  const deptId = isReady ? getId(shortName) : null;
  const { intro, loading } = useDepartmentHome(deptId);



  const data = intro?.hero || {};

  if (loading) return <BietLoader />;

  return (
    <section className="relative min-h-[65vh] lg:h-[65vh] w-full overflow-hidden flex items-center">

      {/* ✅ SAFE BACKGROUND */}
      <img
        src={data?.image || "/assets/default-dept.jpg"}
        alt={data?.title || "Department"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 md:bg-black/50" />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 gap-10 py-16 lg:py-0 mt-8 lg:mt-0">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-3/5 text-white text-center lg:text-left">

          {/* TITLE */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-wide drop-shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {data?.title || "Department"}
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {data?.subtitle || "Welcome to our department."}
          </motion.p>

          {/* Accent line */}
          <motion.div
            className="mt-6 h-1 bg-blue-500 rounded mx-auto lg:mx-0"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: "easeOut",
            }}
          />

        </div>

        {/* RIGHT EVENTS CARD */}
        <div className="w-full lg:flex-1 max-w-md lg:max-w-none overflow-hidden">
          <DepartmentEventsPreview />
        </div>

      </div>
    </section>
  );
};

export default DepartmentHero;
