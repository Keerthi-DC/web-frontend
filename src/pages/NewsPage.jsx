import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((e) => console.error(e));
  }, []);

  if (!news.length) return null;

  const truncate = (text, len = 120) =>
    text.length > len ? text.substring(0, len) + "…" : text;

  return (
    <section className="p-20">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {news.map((n) => (
          <div key={n.id} className="border rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 hero-float">
            <img src={n.image} alt={n.title} className="h-40 w-full object-cover" />

            <div className="p-4">
              <h4 className="text-xl font-semibold mb-1">{n.title}</h4>
              <p className="text-sm text-gray-500">{n.date}</p>
              <p className="mt-2">{truncate(n.details)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;