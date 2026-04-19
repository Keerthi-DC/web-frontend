import React, { useEffect, useState } from "react";

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
      <div className="absolute inset-0 z-0">
        <img
          src={imageOverride || hero.image}
          alt="hero"
          className="w-full h-full object-cover"
        />

        {/* GRADIENT OVERLAY (IMPORTANT) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001c40] via-[#001c40]/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-12 md:px-24 max-w-4xl text-white">

        {/* Badge */}
        <span className="inline-block px-4 py-1 mb-6 bg-yellow-300 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full">
          Enrolling for 2027
        </span>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-8">
          {hero.title}
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-6">

          {/* Primary */}
          <a
            href={hero.buttons[0]?.link}
            className="px-10 py-4 bg-yellow-400 text-black font-bold uppercase tracking-widest rounded-lg hover:shadow-xl transition-all"
          >
            {hero.buttons[0]?.text}
          </a>

          {/* Glass button */}
          <a
            href={hero.buttons[1]?.link}
            className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-white/20 transition-all"
          >
            {hero.buttons[1]?.text}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;