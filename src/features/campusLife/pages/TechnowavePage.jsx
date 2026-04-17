import React from "react";
import useTechnowave from "../hooks/useTechnowave";
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";

export default function TechnowavePage() {
  const { data, loading, error } = useTechnowave();

  if (loading) {
    return <section className="p-6 text-center">Loading...</section>;
  }

  // hook returns fallback if error
  const display = data;

  if (!display) {
    return <PageContainer><div className="text-center p-6 text-gray-500">No data found</div></PageContainer>;
  }

  return (
    <PageContainer>
      <SectionTitle>{display.title}</SectionTitle>

      <div className="space-y-4">
        {display.items.map((item, i) => (
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
    </PageContainer>
  );
}
