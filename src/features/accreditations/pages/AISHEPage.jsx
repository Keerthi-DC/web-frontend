import React from "react";
import useAISHE from "../hooks/useAISHE";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import Card from "../../../components/ui/Card";
import ViewButton from "../../../components/ui/ViewButton";
import BietLoader from "../../../components/ui/BietLoader";


const AISHEPage = () => {
  const { loading, error, data } = useAISHE();

  // ✅ Loading
  if (loading) return <BietLoader />;

  // ❌ Error
  if (error) {
    return (
      <PageContainer>
        <div className="h-[60vh] flex items-center justify-center text-red-500">
          Failed to load AISHE data
        </div>
      </PageContainer>
    );
  }

  // ⚠️ Empty
  if (!data.length) {
    return (
      <PageContainer>
        <div className="h-[60vh] flex items-center justify-center">
          No AISHE records found
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>

      <SectionTitle title="AISHE Reports" />

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((item, i) => (
          <Card key={i}>

            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-[#0b2d5c]">
                {item.title}
              </h3>

              <span className="text-xs text-gray-500">
                {item.year || "-"}
              </span>
            </div>

            <ViewButton onClick={() => window.open(item.file_url, "_blank")}>
              View Report
            </ViewButton>

          </Card>
        ))}
      </div>

    </PageContainer>
  );
};

export default AISHEPage;
