 import React, { useEffect, useState, useMemo } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';

  /**
   * ResultAnalysisPage
   *
   * Displays a semester‑wise result analysis report grid with
   * even/odd semester tabs, modal preview, and download links.
   */
  const ResultAnalysisPage = () => {
    /* ---------- state ---------- */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('even'); // 'even' | 'odd'

    /* ---------- fetch data ---------- */
    useEffect(() => {
      fetch('/data/resultAnalysis.json')
        .then((r) => r.json())
        .then((json) => {
          setData(json.resultAnalysis || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('[AUDIT] Error loading result analysis:', err);
          setLoading(false);
        });
    }, []);

    /* ---------- helpers ---------- */
    const isEvenSemester = (title) => {
      const match = title.match(/(\d+)/);
      return match && parseInt(match[1], 10) % 2 === 0;
    };

    const filtered = useMemo(() => {
      return data.filter((item) =>
        activeTab === 'even' ? isEvenSemester(item.title) : !isEvenSemester(item.title)
      );
    }, [data, activeTab]);

    /* ---------- modal preview ---------- */
    const [preview, setPreview] = useState(null); // image url or null

    /* ---------- render ---------- */
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto py-8 px-4"
      >
        <h1 className="text-3xl font-semibold mb-2">Result Analysis</h1>
        <p className="text-gray-700 mb-6">
          Semester‑wise result analysis reports for various departments.
        </p>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              activeTab === 'even' ?
                'bg-indigo-600 text-white' :
                'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('even')}
          >
            Even Semester
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              activeTab === 'odd' ?
                'bg-indigo-600 text-white' :
                'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('odd')}
          >
            Odd Semester
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-gray-500 text-center">Loading result analysis…</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-102 transition transform
  duration-200"
                whileHover={{ y: -4 }}
              >
                {/* Header */}
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

                {/* Metadata */}
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Department:</span> {item.department}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Batch:</span> {item.batch}
                </p>

                {/* Preview image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={item.image}
                    alt={`${item.title} preview`}
                    className="w-48 h-32 object-cover rounded-md"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    onClick={() => setPreview(item.image)}
                  >
                    View
                  </button>
                  <a
                    href={item.pdf ?? item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition
  text-center"
                  >
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-gray-500 text-center">
                No results found for the selected semester type.
              </p>
            )}
          </div>
        )}

        {/* Modal preview */}
        <AnimatePresence>
          {preview && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow-xl p-4 relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  aria-label="Close preview"
                  onClick={() => setPreview(null)}
                >
                  ×
                </button>
                <img src={preview} alt="Preview" className="max-w-full max-h-96 object-contain" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  export default ResultAnalysisPage;