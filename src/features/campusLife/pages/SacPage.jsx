import React from "react";
import useSAC from "../hooks/useSAC";
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";

export default function SACPage() {
  const { data, loading } = useSAC();

  if (loading) return <p>Loading...</p>;
  if (!data) return <PageContainer><p>No data</p></PageContainer>;

  return (
    <PageContainer>
      <SectionTitle>{data.title}</SectionTitle>
      <p className="my-4">{data.description}</p>

      {data.members.map((m, i) => (
        <div key={i} className="bg-white p-4 rounded shadow my-2">
          <p>{m.name}</p>
          <p className="text-gray-500">{m.role}</p>
        </div>
      ))}
    </PageContainer>
  );
}
