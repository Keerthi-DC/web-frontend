 import React, { useEffect, useState } from 'react';

  export default function ProspectusPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let isMounted = true;
      fetch('/data/prospectus.json')
        .then((res) => res.json())
        .then((json) => {
          if (isMounted) {
            setData(json.prospectus);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error('Error loading prospectus data:', err);
          if (isMounted) {
            setLoading(false);
          }
        });
      return () => {
        isMounted = false;
      };
    }, []);

    if (loading || !data) {
      return (
        <section className="py-12 px-4 text-center">
          <p className="text-gray-500">Loading…</p>
        </section>
      );
    }

    return (
      <section className="max-w-4xl mx-auto py-12 px-4">
        {/* Heading */}
        <h1 className="text-4xl font-semibold text-center mb-4">Prospectus</h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">{data.title}</h2>

        {/* Description */}
        <p className="text-center text-gray-700 mb-8">{data.description}</p>

        {/* PDF Download link */}
        <div className="text-center mb-8">
          <a
            href={data.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700
  transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 16L12 20L16 16M12 7V13" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {data.title} PDF
          </a>
        </div>

        {/* Page previews */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.pages.map((src, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={src}
                alt={`${data.title} page ${index + 1}`}
                className="w-full h-auto rounded shadow-lg object-contain"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }