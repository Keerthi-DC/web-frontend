import React from "react";
import useProspectus from "../hooks/useProspectus";
import BietLoader from "../../../components/ui/BietLoader";


export default function ProspectusPage() {
  const { data, loading, error } = useProspectus();

  if (loading) return <BietLoader />;

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">Failed to load prospectus</div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center text-gray-500">No prospectus found</div>
    );
  }

  return (
    <section className="bg-[#f5f6f8] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <span className="inline-block bg-[#e6ebf5] text-[#1e3a8a] text-xs font-semibold px-4 py-1 rounded-full mb-6">
          ACADEMIC SESSION 2025-26
        </span>

        <h1 className="text-5xl font-bold text-[#0b2c5e] mb-6">
          {data.title}
        </h1>

        <p className="text-gray-600 max-w-2xl mb-10 text-lg">
          {data.description}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mb-12">
          <a
            href={data.fileUrl}
            download
            className="bg-[#0b2c5e] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#082347] transition"
          >
            ⬇ Download {data.fileName || "PDF"}
          </a>

          <a
            href={data.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            👁 Open in New Tab
          </a>
        </div>

        {/* PDF PREVIEW */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
          <iframe
            src={data.fileUrl}
            title="Prospectus PDF"
            className="w-full h-[700px]"
          />
        </div>

        {/* FOOTER */}
        <p className="text-sm text-gray-400 mt-6">
          Last updated: {data.uploadedAt || "N/A"}
        </p>

      </div>
    </section>
  );
}
