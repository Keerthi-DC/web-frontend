import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const OverviewPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeProgram, setActiveProgram] = useState(null);

  useEffect(() => {
    fetch('/data/admissionOverview.json')
      .then((r) => r.json())
      .then((json) => {
        setData(json.overview || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[AUDIT] Error loading admission overview:', err);
        setLoading(false);
      });
  }, []);

  // ✅ Hooks must always run
  const programs = useMemo(() => data?.programs || [], [data]);
  const eligibility = useMemo(() => data?.eligibility || [], [data]);
  const steps = useMemo(() => data?.process || [], [data]);
  const dates = useMemo(() => data?.dates || [], [data]);
  const downloads = useMemo(() => data?.downloads || [], [data]);

  if (loading || !data) {
    return (
      <div className="p-6 flex justify-center items-center text-gray-500">
        Loading admissions overview…
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto py-8 px-4"
    >
      <section className="mb-12">
        <h1 className="text-3xl font-semibold mb-4">Admissions Overview</h1>
        <p className="text-gray-700">{data.introduction.description}</p>
      </section>

      {/* Programs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Programs Offered</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <motion.div
              key={p.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-sm text-gray-600">Duration: {p.duration}</p>
              <p className="text-sm text-gray-600">Mode: {p.mode}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Eligibility Criteria</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {eligibility.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
};

export default OverviewPage;