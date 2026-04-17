import React from "react";
import useSports from "../hooks/useSports";
import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";

export default function SportsPage() {
  const { data, loading } = useSports();

  if (loading) return <p>Loading...</p>;
  if (!data) return <PageContainer><p>No sports data</p></PageContainer>;

  return (
    <PageContainer>
      <SectionTitle>{data.title}</SectionTitle>

      {data.reports.map((r, i) => (
        <div key={i} className="bg-white p-4 rounded shadow my-2 flex justify-between">
          <p>{r.title}</p>
          <a href={r.pdf} className="text-blue-500">Download</a>
        </div>
      ))}
    </PageContainer>
  );
}