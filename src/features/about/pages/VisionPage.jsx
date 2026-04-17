import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import Card from "../../../components/ui/Card";
import useVision from "../hooks/useVision";

export default function VisionPage() {
  const { data, loading, error } = useVision();
  const [activeTab, setActiveTab] = useState("vision");

  if (loading) return <PageContainer><SectionTitle>Loading…</SectionTitle></PageContainer>;
  if (error) return <PageContainer><p>{error}</p></PageContainer>;
  if (!data) return null;

  const { intro, vision, mission, qualityPolicy, swot } = data;

  return (
    <PageContainer>
      {/* INTRO */}
      <SectionTitle>{intro?.title}</SectionTitle>
      <p className="text-gray-600 max-w-3xl mx-auto mb-8">{intro?.description}</p>

      {/* TAB NAV */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {["vision", "mission", "quality", "swot"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeTab === tab
                ? "bg-[#001b4b] text-white"
                : "bg-white shadow text-gray-700"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-5xl mx-auto">
        {activeTab === "vision" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-4">{vision?.title}</h2>
            <p>{vision?.content}</p>
          </Card>
        )}

        {activeTab === "mission" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-4">{mission?.title}</h2>
            <p>{mission?.content}</p>
          </Card>
        )}

        {activeTab === "quality" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-6 text-center">{qualityPolicy?.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {qualityPolicy?.points?.map((point, idx) => (
                <div key={idx} className="flex gap-3 bg-gray-50 p-4 rounded-lg items-start">
                  <FaCheckCircle className="text-green-600 mt-1" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "swot" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Swot title="Strengths" data={swot?.strengths} color="green" />
            <Swot title="Weakness" data={swot?.weakness} color="red" />
            <Swot title="Opportunities" data={swot?.opportunities} color="blue" />
            <Swot title="Threats" data={swot?.threats} color="yellow" />
          </div>
        )}
      </div>
    </PageContainer>
  );
}

const Swot = ({ title, data, color }) => (
  <Card className={color === "green" ? "bg-green-50" : color === "red" ? "bg-red-50" : color === "blue" ? "bg-blue-50" : "bg-yellow-50"}>
    <h3 className="font-semibold mb-3">{title}</h3>
    {data?.map((item, i) => (
      <p key={i}>• {item}</p>
    ))}
  </Card>
);
