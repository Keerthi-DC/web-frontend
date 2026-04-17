import React from "react";
import { motion } from "framer-motion";
import useFeeDocuments from "../hooks/useFeeDocuments";

export default function FeeStructurePage() {
  const { data: fees, loading, error } = useFeeDocuments();

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto py-10 px-4 text-center">
        <p className="text-gray-600">Loading…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-4xl mx-auto py-10 px-4 text-center">
        <p className="text-red-500">Failed to load fee documents.</p>
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
          key={item.feeDocId} // ✅ FIXED KEY
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="flex justify-between items-center border-b py-5"
        >
          <span className="flex items-center gap-2">
            📄 {item.title}
          </span>

          <div className="flex gap-3">
            {/* 👁 View */}
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              View
            </a>

            {/* ⬇ Download */}
            <a
              href={item.fileUrl}
              download
              className="bg-[#002f76] text-white px-4 py-2 rounded hover:bg-blue-900 transition"
            >
              Download
            </a>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
