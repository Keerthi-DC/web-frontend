import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SyllabusPage renders a searchable & filterable table of syllabus documents.
 * Clicking "View" opens a modal with a PDF preview.
 */
const SyllabusPage = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [regulationFilter, setRegulationFilter] = useState('All');
  const [modalDoc, setModalDoc] = useState(null);

  useEffect(() => {
    fetch('/data/syllabus.json')
      .then((r) => r.json())
      .then((data) => {
        setSyllabus(data.syllabus || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[AUDIT] Error loading syllabus:', err);
        setLoading(false);
      });
  }, []);

  const departments = useMemo(() => Array.from(new Set(syllabus.map(s => s.department))) , [syllabus]);
  const programs = useMemo(() => Array.from(new Set(syllabus.map(s => s.program))) , [syllabus]);
  const semesters = useMemo(() => Array.from(new Set(syllabus.map(s => s.semester))) , [syllabus]);
  const regulations = useMemo(() => Array.from(new Set(syllabus.map(s => s.regulation))) , [syllabus]);

  const filteredSyllabus = useMemo(() => {
    return syllabus.filter(item => {
      const matchesSearch = item.department.toLowerCase().includes(search.toLowerCase());
      const matchesProgram = programFilter === 'All' || item.program === programFilter;
      const matchesSemester = semesterFilter === 'All' || item.semester === semesterFilter;
      const matchesRegulation = regulationFilter === 'All' || item.regulation === regulationFilter;
      return matchesSearch && matchesProgram && matchesSemester && matchesRegulation;
    });
  }, [syllabus, search, programFilter, semesterFilter, regulationFilter]);

  if (loading) {
    return <div className="p-6 flex justify-center items-center text-gray-500">Loading syllabus…</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto py-6 px-4"
    >
      <h1 className="text-3xl font-semibold mb-2">Syllabus</h1>
      <p className="text-gray-700 mb-6">
        Download the syllabus for various programs, semesters, and regulations.
      </p>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Department"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <select
          value={programFilter}
          onChange={e => setProgramFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="All">All Programs</option>
          {programs.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={semesterFilter}
          onChange={e => setSemesterFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="All">All Semesters</option>
          {semesters.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={regulationFilter}
          onChange={e => setRegulationFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="All">All Regulations</option>
          {regulations.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="shadow rounded overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regulation</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSyllabus.map(item => (
              <motion.tr
                key={item.id}
                className="hover:bg-gray-50 transition cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <td className="px-4 py-2">{item.department}</td>
                <td className="px-4 py-2">{item.program}</td>
                <td className="px-4 py-2">{item.semester}</td>
                <td className="px-4 py-2">{item.regulation}</td>
                <td className="px-4 py-2">{item.year}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setModalDoc(item.document)}
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </motion.tr>
            ))}
            {filteredSyllabus.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No syllabus entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {modalDoc && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-semibold">Syllabus Preview</h2>
                <button
                  onClick={() => setModalDoc(null)}
                  aria-label="Close"
                  className="text-gray-500 hover:text-gray-700"
                >×</button>
              </div>
              <div className="p-4">
                {/* Simple iframe preview; in real app could use PDF viewer */}
                <iframe
                  src={modalDoc}
                  title="Syllabus PDF"
                  className="w-full h-96"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

SyllabusPage.propTypes = {};

export default SyllabusPage;
