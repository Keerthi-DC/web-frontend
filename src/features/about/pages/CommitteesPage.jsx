import React, { useState } from "react";
import useCommittees from "../hooks/useCommittees";
import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Sidebar from "../components/ui/Sidebar";

const iconMap = {
  "vs-committee": "groups",
  "government-regulations": "move_to_inbox",
  "institutional-assurance": "corporate_fare",
  "alumni-relations": "group",
  "student-support": "person",
};

export default function CommitteesPage() {
  const { data, loading, error } = useCommittees();
  const [activeSection, setActiveSection] = useState(0);

  if (loading)
    return (
      <PageContainer>
        <SectionTitle>Loading…</SectionTitle>
      </PageContainer>
    );

  if (error)
    return (
      <PageContainer>
        <p>{error}</p>
      </PageContainer>
    );

  if (!data) return null;

  const { title, sections } = data;

  // ✅ IMPORTANT: include type
  const items = sections.map((s, idx) => ({
    id: idx.toString(),
    title: s.title,
    type: s.type,
  }));

  const renderCommittee = (committee, idx) => (
    <Card
      key={idx}
      className="mb-4 bg-white/60 backdrop-blur-lg border border-white/20 shadow-md rounded-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#0f2a44]">
            {iconMap[committee.type] || "groups"}
          </span>
          <span className="font-semibold text-[#0f2a44]">
            {committee.title}
          </span>
        </div>

        <span className="text-xs text-gray-500">
          {committee.members?.length || 0} members
        </span>
      </div>

      <div className="mt-2">
        {committee.members?.map((m, i) => (
          <p key={i} className="text-sm text-gray-700">
            {m}
          </p>
        ))}
      </div>
    </Card>
  );

  return (
    <PageContainer>
      <SectionTitle>{title}</SectionTitle>

      <div className="flex h-full">

        {/* ✅ SIDEBAR */}
        <Sidebar
          items={items}
          activeId={activeSection.toString()}
          setActiveId={(id) => setActiveSection(Number(id))}
          iconMap={iconMap}
        />

        {/* ✅ CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4 text-[#0f2a44]">
            {sections[activeSection]?.title}
          </h2>

          {sections[activeSection]?.committees?.map((c, i) =>
            renderCommittee(c, i)
          )}
        </div>
      </div>
    </PageContainer>
  );
}