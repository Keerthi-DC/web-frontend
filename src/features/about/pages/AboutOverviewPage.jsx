import React from "react";
import { useAboutOverview } from "../hooks/useAboutOverview";
import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import { FaCheckCircle } from "react-icons/fa";

export default function AboutOverviewPage() {
  const { data, loading, error } = useAboutOverview();

  if (loading) return <PageContainer><SectionTitle>Loading…</SectionTitle></PageContainer>;
  if (error) return <PageContainer><p>{error}</p></PageContainer>;
  if (!data) return null;

  const {
    hero,
    about,
    growth,
    leadership,
    anthem,
    governanceCouncil,
    davangere,
  } = data;

  return (
    <PageContainer>
      {/* HERO */}
      <Card className="relative h-64 md:h-96 mb-12 rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero?.image})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#001b4b]/80 to-[#002f76]/80" />
        <div className="relative z-10 p-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero?.title}</h1>
          <h2 className="text-xl md:text-2xl text-blue-100">{hero?.subtitle}</h2>
        </div>
      </Card>

      {/* ABOUT */}
      <Card>
        <SectionTitle>{about?.title}</SectionTitle>
        <p>{about?.description}</p>
      </Card>

      {/* GROWTH */}
      <Card>
        <SectionTitle>{growth?.title}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {growth?.points?.map((p, i) => (
            <Card key={i} className="bg-gray-100 p-6 rounded-2xl flex items-start gap-4">
              <FaCheckCircle className="text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">{p.title}</h4>
                <p className="text-gray-600">{p.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* LEADERSHIP */}
      <Card>
        <SectionTitle>{leadership?.title}</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {leadership?.items?.map((l, i) => (
            <Card key={i} className="bg-white rounded-xl shadow p-6">
              <img
                src={l.image}
                alt={l.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="mt-4">
                <h4 className="font-semibold text-lg" >{l.title}</h4>
                <p className="text-sm text-gray-600">{l.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* ANTHEM */}
      <Card>
        <SectionTitle>{anthem?.title}</SectionTitle>
        <ul className="list-disc list-inside mt-4 space-y-2">
          {anthem?.lines?.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </Card>

      {/* GOVERNING COUNCIL */}
      <Card>
        <SectionTitle>Governing Council</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {governanceCouncil?.map((m, i) => (
            <Card key={i} className="bg-gray-100 p-6 rounded-2xl text-center hover:shadow-lg transition">
              <img
                src={m.image}
                alt={m.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="font-semibold text-gray-800">{m.name}</h4>
              <p className="text-sm text-gray-600">{m.role}</p>
            </Card>
          ))}
        </div>
      </Card>

      {/* DAVANGERE */}
      <Card>
        <SectionTitle>{davangere?.title}</SectionTitle>
        <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
          <img
            src={davangere?.image}
            alt={davangere?.title}
            className="md:w-1/2 rounded-lg"
          />
          <p className="text-gray-700">{davangere?.description}</p>
        </div>
      </Card>
    </PageContainer>
  );
}
