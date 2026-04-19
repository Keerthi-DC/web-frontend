import { theme } from "../../../components/ui/theme";
import React, { useEffect, useState, useRef } from "react";

const Counter = ({ value, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
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
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${theme.colors.primaryBg} py-16 px-12 md:px-24`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

        {facts.map((fact, index) => (
          <div key={index} className="text-center md:text-left">

            {/* NUMBER */}
            <p className={`${theme.colors.accentText} text-4xl font-extrabold mb-2`}>
              <Counter value={fact.value} start={visible} />
            </p>

            {/* TITLE */}
            <p className="text-white/60 text-xs font-bold uppercase tracking-wider">
              {fact.title}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default QuickFacts;