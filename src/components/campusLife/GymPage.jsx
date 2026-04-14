import React, { useEffect, useState } from "react";

export default function GymPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/gym.json")
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>

      <div className="grid grid-cols-3 gap-4">
        {data.images.map((img, i) => (
          <img key={i} src={img} className="rounded-xl shadow" />
        ))}
      </div>
    </section>
  );
}