import React, { useEffect, useState } from "react";

export default function SACPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/sac.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="my-4">{data.description}</p>

      {data.members.map((m, i) => (
        <div key={i} className="bg-white p-4 rounded shadow my-2">
          <p>{m.name}</p>
          <p className="text-gray-500">{m.role}</p>
        </div>
      ))}
    </section>
  );
}