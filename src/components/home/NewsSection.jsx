import React, { useEffect, useState } from "react";

export const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((e) => console.error(e));
  }, []);

  if (!news.length) return null;

  const featured = news[0];
  const others = news.slice(1, 4);

  const truncate = (text, len = 90) =>
    text.length > len ? text.substring(0, len) + "…" : text;

  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold m-20 shake-text">News Updates</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Featured Card */}
        <div className="flex flex-col gap-3 hero-float border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src={featured.image}
            alt={featured.title}
            className="h-150 w-full object-cover rounded-lg"
          />

          <h3 className="text-xl font-bold">{featured.title}</h3>
          <p className="text-xs text-gray-500">{featured.date}</p>
          <p className="text-sm">{truncate(featured.details)}</p>
        </div>

        {/* Other Cards */}
        <div className="grid gap-4">
          {others.map((n) => (
            <div
              key={n.id}
              className="flex gap-4 border rounded-lg p-4 items-start shadow-md hero-float hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={n.image}
                alt={n.title}
                className="h-20 w-20 object-cover rounded"
              />

              {/* Text */}
              <div>
                <h4 className="text-base font-semibold">{n.title}</h4>
                <p className="text-xs text-gray-500">{n.date}</p>
                <p className="text-sm mt-1">{truncate(n.details)}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="text-center mt-8">
        <a
          href="/news"
          className=" bg-yellow-400 text-black px-6 py-3 rounded font-semibold hero-btn"
        >
          View More
        </a>
      </div>
    </section>
  );
};

export default NewsSection;