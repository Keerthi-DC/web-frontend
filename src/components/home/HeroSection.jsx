import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch("/data/hero.json")
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch((err) => console.error(err));
  }, []);

  if (!hero) return null;

  return (
    <section className="relative h-[75vh] flex items-center overflow-hidden hero-light">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center hero-bg"
        style={{ backgroundImage: `url(${hero.image})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-white hero-float">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-6">
            {hero.title}
          </h1>

          <p className="text-lg mb-8 text-gray-200">
            {hero.description}
          </p>

          <div className="flex gap-4">
            {hero.buttons.map((btn, index) => (
              <a
                key={index}
                href={btn.link}
                className=" bg-yellow-400 text-black px-6 py-3 rounded font-semibold hero-btn"
              >
                → {btn.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;