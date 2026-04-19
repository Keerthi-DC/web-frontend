import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { theme } from "../../../components/ui/theme";

const HeroSection = ({ imageOverride }) => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch("/data/hero.json")
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch((err) => console.error(err));
  }, []);

  if (!hero) return null;

  return (
    <section className="relative h-[820px] w-full overflow-hidden flex items-center">

      {/* Background */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={imageOverride || hero.image}
          alt="hero"
          className="w-full h-full object-cover"
        />

        {/* GRADIENT OVERLAY (IMPORTANT) */}
        <div className={`absolute inset-0 ${theme.colors.gradientOverlay}`}></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-4xl text-white mt-16 md:mt-0">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {/* Badge */}
          <span className={`inline-block px-3 py-1 md:px-4 md:py-1 mb-4 md:mb-6 ${theme.colors.accentBg} ${theme.colors.primaryText} font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-full`}>
            Enrolling for 2027
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 md:mb-8 drop-shadow-2xl">
            {hero.title}
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">

            {/* Primary */}
            <a
              href={hero.buttons[0]?.link}
              className={`${theme.buttons.primary} w-full sm:w-auto text-center`}
            >
              {hero.buttons[0]?.text}
            </a>

            {/* Glass button */}
            <a
              href={hero.buttons[1]?.link}
              className={`${theme.buttons.glass} w-full sm:w-auto text-center`}
            >
              {hero.buttons[1]?.text}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;