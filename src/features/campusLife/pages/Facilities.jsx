import React from "react";
import useFacilities from "../hooks/useFacilities";

import PageContainer from "../../../components/ui/PageContainer";
import Sidebar from "../../../components/ui/Sidebar";
import SectionTitle from "../../../components/ui/SectionTitle";
import SectionRenderer from "../../../components/ui/SectionRenderer";
import BietLoader from "../../../components/ui/BietLoader";


const Facilities = () => {
  const { data, activeId, setActiveId, loading, error } = useFacilities();

  if (loading) return <BietLoader />;

  if (error) {
    return (
      <PageContainer>
        <div className="text-red-500">
          Backend not available — showing fallback data
        </div>
      </PageContainer>
    );
  }

  if (!data || !data.sidebar?.length) {
    return <PageContainer>No facilities available</PageContainer>;
  }

  const selected = data?.content?.[activeId];

  return (
    <PageContainer>
      <div className="grid md:grid-cols-[280px_1fr] gap-10">

        {/* ✅ SIDEBAR */}
        <Sidebar
          items={data.sidebar.map((item) => ({
            id: item.id,
            title: item.title,
          }))}
          activeId={activeId}
          setActiveId={setActiveId}
        />

        {/* ✅ MAIN */}
        <div>
          <SectionTitle title={selected?.title || "Facility"} />

          {/* ✅ FALLBACK SAFE */}
          {!selected ? (
            <div className="text-gray-500 py-20">
              No content available for this section
            </div>
          ) : !selected.sections?.length ? (
            <div className="text-gray-500 py-20">
              No details available
            </div>
          ) : (
            selected.sections.map((section, idx) => (
              <SectionRenderer key={idx} section={section} />
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Facilities;
