import React from "react";
import useGreenCampus from "../hooks/useGreenCampus";
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";

export default function GreenCampusPage() {
  const { data, loading, error } = useGreenCampus();

  if (loading) {
    return <section className="p-6 text-center">Loading...</section>;
  }

  if (!data) {
    return (
      <PageContainer>
        <div className="text-center text-red-600 p-6">No data found</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionTitle>{data.title}</SectionTitle>

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
    </PageContainer>
  );
}
