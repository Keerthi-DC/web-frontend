import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TimeTablePage renders the institute's common timetable.
 * Data is fetched from ``/data/timetable.json``.
 * Each program is displayed in a separate table.
 */
const TimeTablePage = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/timetable.json')
      .then((r) => r.json())
      .then((data) => {
        setTimetables(data.timetables || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[AUDIT] Error loading timetable:', err);
        setLoading(false);
      });
  }, []);

  const slotColor = (code) => {
    const mapping = {
      A: 'bg-green-100',
      B: 'bg-purple-100',
      C: 'bg-blue-100',
      D: 'bg-orange-100',
      E: 'bg-red-100',
      F: 'bg-yellow-100',
      G: 'bg-olive-100',
    };
    return mapping[code.charAt(0)] || 'bg-gray-200';
  };

  if (loading) {
    return <div className="p-6 flex justify-center items-center text-gray-500">Loading timetable…</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto py-6 px-4"
    >
      <h1 className="text-3xl font-semibold mb-3">Institute Common Time Table</h1>
      <p className="text-gray-700 mb-6">This is the Institute's common time‑table for all programmes. Each letter represents a particular slot. A specific subject is taught in each slot.</p>

      {timetables.map((t, idx) => (
        <section key={idx} className="mb-12">
          <h2 className="text-xl font-medium mb-4">{t.program}</h2>
          <div className="overflow-x-auto">
            <motion.table
              className="min-w-full border border-gray-300 rounded-lg"
              whileHover={{ backgroundColor: '#f8fafc' }}
            >
              <thead>
                <tr>
                  <th className="p-2 w-24 text-left font-semibold bg-gray-100">Days</th>
                  {t.slots.map((s, i) => (
                    <th key={i} className="p-2 w-32 text-center font-semibold bg-gray-100">
                      {i < 4 ? `Slot ${i + 1}` : i === 4 ? 'Lunch Break' : i === 5 ? 'Slot 5' : `Slot ${i + 1}`}
                    </th>
                  ))}
                  <th className="p-2 w-32 text-center font-semibold bg-gray-100">Extra Hr</th>
                </tr>
              </thead>
              <tbody>
                {t.days.map((d, di) => (
                  <tr key={di} className="hover:bg-gray-50 transition">
                    <td className="p-2 font-medium bg-gray-200">{d.day}</td>
                    {d.classes.map((c, ci) => (
                      <td key={ci} className={`p-2 text-center ${slotColor(c)} font-mono`}>{c}</td>
                    ))}
                    <td className="p-2 font-medium bg-gray-200">{d.classes[d.classes.length - 1]}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </section>
      ))}
    </motion.div>
  );
};

export default TimeTablePage;
