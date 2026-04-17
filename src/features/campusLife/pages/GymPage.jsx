import React from "react";
import useGym from "../hooks/useGym";
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";

export default function GymPage() {
  const { data, loading } = useGym();

  if (loading) return <p className="p-6">Loading...</p>;
  if (!data) return <PageContainer><p className="p-6">No gym data</p></PageContainer>;

  return (
    <PageContainer>
      <SectionTitle>{data.title}</SectionTitle>

      <div className="grid grid-cols-3 gap-4">
        {data.images.map((img, i) => (
          <img key={i} src={img} className="rounded-xl shadow" />
        ))}
      </div>
    </PageContainer>
  );
}
