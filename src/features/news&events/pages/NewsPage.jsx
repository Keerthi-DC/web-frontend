import React from "react";
import useNews from "../hooks/useNews";
import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";

const News = () => {
  const { news, loading, error } = useNews();

  if (loading) return null;
  if (error) console.error(error);
  if (!news.length) return null;

  const truncate = (text, len = 120) =>
    text.length > len ? text.substring(0, len) + "…" : text;

  return (
    <PageContainer>
      <SectionTitle>News</SectionTitle>
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
    </PageContainer>
  );
};

export default News;