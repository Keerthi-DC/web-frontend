import React, { useEffect, useState } from "react";

export default function GreenCampusPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/greenCampus.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
        setError("Failed to load green campus data");
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
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <p className="mb-6 text-gray-600">{data.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={img}
              alt={`green-${i}`}
              className="w-full h-56 object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}