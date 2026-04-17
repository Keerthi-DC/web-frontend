import React from "react";
import useNAAC from "../hooks/useNAAC";

import PageContainer from "../../../components/ui/PageContainer";
import Sidebar from "../../../components/ui/Sidebar";
import SectionTitle from "../../../components/ui/SectionTitle";
import Card from "../../../components/ui/Card";
import ViewButton from "../../../components/ui/ViewButton";

const NAACPage = () => {
  const { loading, error, sections, activeId, setActiveId, activeSection } = useNAAC();

  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error loading</PageContainer>;
  if (!sections.length) return <PageContainer>No data</PageContainer>;

  return (
    <PageContainer>
      <div className="grid md:grid-cols-[280px_1fr] gap-10">

        <Sidebar items={sections} activeId={activeId} setActiveId={setActiveId} />

        <div>
          <SectionTitle title="NAAC Accreditation" />

          {activeSection && (
            <div className="grid md:grid-cols-2 gap-6">
              {activeSection.items.map((item, i) => (
                <Card key={i}>
                  <h3>{item.name}</h3>
                  <ViewButton onClick={() => window.open(item.file)}>
                    View
                  </ViewButton>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </PageContainer>
  );
};

export default NAACPage;
