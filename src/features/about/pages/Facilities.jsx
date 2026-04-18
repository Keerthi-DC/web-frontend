import React from "react";
import { useFacilities } from "../hooks/useFacilities";
import PageContainer from "../../../components/ui/PageContainer";
import Sidebar from "../../../components/ui/Sidebar";
import SectionRenderer from "../../../components/ui/SectionRenderer";
import SectionTitle from "../../../components/ui/SectionTitle";
import BietLoader from "../../../components/ui/BietLoader";


const iconMap = {
  "boys-hostel": "home",
  "ladies-hostel": "female",
  "ladies-rest-room": "meeting_room",
  "canteen": "restaurant",
  "dispensary": "medical_services",
  "guest-house": "apartment",
  "red-cross": "emergency",
  "ncc": "military_tech",
  "nss": "volunteer_activism",
  "internet": "wifi",
  "elearning": "computer",
  "language-lab": "record_voice_over",
};

export default function FacilitiesPage() {
  const { data, activeId, setActiveId, loading, error } = useFacilities();

  if (loading) return <BietLoader />;
  if (error) return <PageContainer><p>{error}</p></PageContainer>;
  if (!data) return null;

  const sidebarItems = data?.sidebar?.map((item) => ({ id: item.id, title: item.title }));
  const selected = data?.content?.[activeId] || {};

  return (
    <PageContainer className="flex min-h-screen bg-white">
      <Sidebar
        items={sidebarItems}
        activeId={activeId}
        setActiveId={setActiveId}
        iconMap={iconMap}
      />
      <div className="flex-1 p-6 max-w-5xl">
        <SectionTitle>{selected.title}</SectionTitle>
        {selected.sections?.map((s, i) => (
          <SectionRenderer key={i} section={s} />
        ))}
      </div>
    </PageContainer>
  );
}
