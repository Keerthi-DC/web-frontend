import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FeeStructurePage() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/data/feeStructure.json")
      .then((res) => res.json())
      .then((json) => {
        if (isMounted) {
          const dataArray = Array.isArray(json)
            ? json
            : Array.isArray(json.feeStructure)
            ? json.feeStructure
            : [];

          setFees(dataArray);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load fee structure:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto py-10 px-4 text-center">
        <p className="text-gray-600">Loading…</p>
      </section>
    );
  }

  if (!fees.length) {
    return (
      <section className="max-w-4xl mx-auto py-10 px-4 text-center">
        <p className="text-gray-500">No fee documents available.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold text-blue-900 mb-6">
        Fee Structure
      </h1>

      {fees.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="flex justify-between items-center border-b py-5"
        >
          <span className="flex items-center gap-2">
            📄 {item.title}
          </span>

          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            View
          </a>
        </motion.div>
      ))}
    </section>
  );
}