import React, { useEffect, useState } from "react";

export default function SportsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/sports.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>

      {data.reports.map((r, i) => (
        <div key={i} className="bg-white p-4 rounded shadow my-2 flex justify-between">
          <p>{r.title}</p>
          <a href={r.pdf} className="text-blue-500">Download</a>
        </div>
      ))}
    </section>
  );
}