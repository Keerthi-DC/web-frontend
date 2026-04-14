import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ✅ SAME helper (keep consistent everywhere)
const fetchGraphQL = async (query) => {
  try {
    const res = await fetch(import.meta.env.VITE_APPSYNC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_APPSYNC_API_KEY,
      },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();
    return result?.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default function FeeStructurePage() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFees = async () => {
      try {
        const res = await fetchGraphQL(`
          query {
            listFeeDocuments(tenantId: "biet-college") {
              feeDocId
              title
              fileUrl
            }
          }
        `);

        if (isMounted) {
          setFees(res?.listFeeDocuments || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load fee documents:", err);
        if (isMounted) setLoading(false);
      }
    };

    loadFees();

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