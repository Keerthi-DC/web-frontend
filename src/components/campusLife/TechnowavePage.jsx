import React, { useEffect, useState } from "react";

export default function TechnowavePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/technowave.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
        setError("Failed to load technowave data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <section className="p-6 text-center">Loading...</section>;
  }

  if (error || !data) {
    return (
      <section className="p-6 text-center text-red-600">
        {error || "No data found"}
      </section>
    );
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>

      <div className="space-y-4">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
          >
            <p className="font-medium">{item.title}</p>
            <a
              href={item.pdf}
              className="text-blue-600 font-semibold hover:underline"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}