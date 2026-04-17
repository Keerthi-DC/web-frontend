import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DepartmentEventsPreview from "./DepartmentEventsPreview";
import { useDepartmentMeta } from "../../hooks/useDepartmentMeta";
import useDepartmentHome from "../../hooks/useDepartmentHome";

import "./DepartmentHero.css";

const DepartmentHero = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();
  const deptId = isReady ? getId(shortName) : null;
  const { intro, loading } = useDepartmentHome(deptId);

  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeadingVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const data = intro?.hero || {};

  if (loading) return null;

  return (
    <section className="relative h-[65vh] w-full overflow-hidden">

      {/* ✅ SAFE BACKGROUND */}
      <img
        src={data?.image || "/assets/default-dept.jpg"}
        alt={data?.title || "Department"}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex items-center px-10 gap-6">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-2/3 text-white">

          {/* TITLE */}
          <motion.h1
            className="text-3xl sm:text-5xl font-bold leading-tight tracking-wide"
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
            className="mt-5 h-1 bg-blue-500 rounded"
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
        <div className="flex-1 overflow-hidden px-4">
          <DepartmentEventsPreview />
        </div>

      </div>
    </section>
  );
};

export default DepartmentHero;
