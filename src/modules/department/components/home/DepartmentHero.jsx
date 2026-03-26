import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DepartmentEventsPreview from "./DepartmentEventsPreview";
import StudentCycle from "./StudentCycle";
import "./DepartmentHero.css";

const headingVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const DepartmentHero = ({ data }) => {
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeadingVisible(true), 1200); // faster animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[65vh] w-full overflow-hidden">
      
      {/* Background */}
      <img
        src={data.image}
        alt={data.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex items-center px-10 gap-6">
        
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-2/3 text-white">
          
          {/* TITLE — ALWAYS VISIBLE */}
          <h1 className="text-3xl sm:text-5xl font-bold">
            {data.title}
          </h1>

          {/* SUBTITLE — ANIMATED */}
          <motion.p
            className="mt-3 text-lg sm:text-xl text-white/90 max-w-2xl"
            variants={headingVariants}
            initial="hidden"
            animate={headingVisible ? "visible" : "hidden"}
            style={{ transitionDelay: "0.2s" }}
          >
            {data.subtitle}
          </motion.p>

          <StudentCycle />
        </div>

        {/* RIGHT EVENTS CARD */}
        <div className="hidden lg:block lg:w-1/3">
          <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg h-[320px] flex flex-col overflow-hidden">
            
            {/* Title */}
            <h2 className="text-xl font-semibold p-4 pb-2">
              Upcoming Events
            </h2>

            {/* Scrollable Infinite Events */}
            <div className="flex-1 overflow-hidden px-4">
              <DepartmentEventsPreview />
            </div>

            {/* Fixed Button */}
            <div className="p-3 border-t bg-white">
              <a
                href={`/departments/${data?.id || "cse"}/events`}
                className="w-full inline-flex justify-center items-center px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                View All Events →
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DepartmentHero;