import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * AcademicCalendar displays the university academic calendars.
 * Data is fetched from ``/data/academicCalendar.json``.
 */
const AcademicCalendar = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetch('/data/academicCalendar.json')
      .then(r => r.json())
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('[AUDIT] Error loading academic calendar:', err);
        setLoading(false);
      });
  }, []);

  // Unique years in the data
  const years = useMemo(() => {
    const set = new Set(entries.map(e => e.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [entries]);

  const filtered = useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(search.toLowerCase());
      const matchesYear = yearFilter === 'All' || entry.year.toString() === yearFilter;
      const matchesCategory = categoryFilter === 'All' || entry.category === categoryFilter;
      return matchesSearch && matchesYear && matchesCategory;
    });
  }, [entries, search, yearFilter, categoryFilter]);

  const currentEntries = filtered.filter(e => e.category === 'current');
  const historicalEntries = filtered.filter(e => e.category === 'historical');

  if (loading) {
    return <div className="p-6 flex justify-center items-center text-gray-500">Loading academic calendar…</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto py-6 px-4"
    >
      <h1 className="text-3xl font-semibold mb-4">Academic Calendar</h1>
      <p className="text-gray-700 mb-6">
        The dates below represent official academic deadlines and informational dates for the semester displayed.
      </p>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
        <input
          type="text"
          placeholder="Search title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
        />
        <select
          value={yearFilter}
          onChange={e => setYearFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="All">All Years</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="All">All Categories</option>
          <option value="current">Current</option>
          <option value="historical">Historical</option>
        </select>
      </div>

      {/* Current Calendars */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium mb-4">Academic Calendar – Current</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEntries.map(entry => (
            <motion.div
              key={entry.id}
              className="rounded-xl shadow-lg bg-white hover:shadow-2xl transition cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="p-6 flex flex-col items-center">
                <svg className="w-12 h-12 text-indigo-500 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l18 18" stroke="currentColor" strokeWidth="2"/><path d="M13 2v4" stroke="currentColor" strokeWidth="2"/><path d="M11 2v4" stroke="currentColor" strokeWidth="2"/><path d="M3 12h4" stroke="currentColor" strokeWidth="2"/><path d="M12 13v4" stroke="currentColor" strokeWidth="2"/><path d="M13 17h4" stroke="currentColor" strokeWidth="2"/></svg>
                <h3 className="text-lg font-semibold text-center">{entry.title}</h3>
                <span className="mt-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">{entry.semester}</span>
                <span className="mt-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">{entry.version}</span>
                <button
                  onClick={() => window.open(entry.pdf, '_blank')}
                  className="mt-4 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >View PDF</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Historical Calendars */}
      <section>
        <h2 className="text-2xl font-medium mb-2">Historical Academic Calendars</h2>
        <p className="text-gray-600 mb-6">For your reference, academic calendars for previous semesters are available below.</p>
        <AnimatePresence>
  {historicalEntries.length === 0 && <p>No historical entries.</p>}

  {Array.from(new Set(historicalEntries.map((e) => e.year)))
    .sort((a, b) => b - a)
    .map((year) => {
      const yearEntries = historicalEntries.filter((e) => e.year === year);

      return (
        <HistoryYearSection
          key={year}
          year={year}
          entries={yearEntries}
        />
      );
    })}
</AnimatePresence>
      </section>
    </motion.div>
  );
};

const HistoryYearSection = ({ year, entries }) => {
  const [open, setOpen] = useState(true);
  return (
    <motion.div className="mb-4" initial={false} animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-gray-50 px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        <span className="font-medium text-lg">{year}</span>
        <svg className={`w-6 h-6 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="bg-white px-4 py-2">
          <ul className="space-y-2">
            {entries.map(entry => (
              <li key={entry.id} className="flex items-center justify-between">
                <span>{entry.title}</span>
                <button onClick={() => window.open(entry.pdf, '_blank')} className="text-indigo-600 hover:underline">View PDF</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};
HistoryYearSection.propTypes = { year: PropTypes.number.isRequired, entries: PropTypes.array.isRequired };

AcademicCalendar.propTypes = {};

export default AcademicCalendar;
