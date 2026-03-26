import React, { useEffect, useState, useRef } from "react";

const Counter = ({ value, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0); // reset when leaving section
      return;
    }

    let current = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      current += increment;

      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [start, value]);

  return <span>{count}+</span>;
};

const QuickFacts = () => {
  const [facts, setFacts] = useState([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    fetch("/data/quickFacts.json")
      .then((res) => res.json())
      .then((data) => setFacts(data));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {facts.map((fact, index) => (
          <div
            key={index}
            className={`bg-white p-8 rounded-xl shadow-md text-center
            transition duration-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-5xl font-bold text-blue-900">
              <Counter value={fact.value} start={visible} />
            </h2>

            <h3 className="text-lg font-semibold mt-4">
              {fact.title}
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              {fact.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default QuickFacts;