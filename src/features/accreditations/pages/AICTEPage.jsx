import React from "react";
import useAICTE from "../hooks/useAICTE";

import PageContainer from "../../../components/ui/PageContainer";
import Sidebar from "../../../components/ui/Sidebar";
import SectionTitle from "../../../components/ui/SectionTitle";
import Card from "../../../components/ui/Card";
import BietLoader from "../../../components/ui/BietLoader";


const AICTEPage = () => {
  const {
    loading,
    error,
    sections,
    activeId,
    setActiveId,
    activeSection,
  } = useAICTE();

  if (loading) return <BietLoader />;
  if (error) return <PageContainer>Failed to load</PageContainer>;
  if (!sections.length) return <PageContainer>No data</PageContainer>;

  return (
    <PageContainer>
      <div className="grid md:grid-cols-[280px_1fr] gap-10">

        {/* SIDEBAR */}
        <Sidebar
          items={sections}
          activeId={activeId}
          setActiveId={setActiveId}
        />

        {/* MAIN */}
        <div>
          <SectionTitle title="AICTE Information Portal" />

          {activeSection && (
            <>
              <h2 className="text-xl font-semibold mb-6">
                {activeSection.title}
              </h2>

              {/* EMPTY STATE */}
              {!activeSection.items.length ? (
                <div className="text-center text-gray-500 py-20">
                  No documents available for this section
                </div>
              ) : activeSection.id.includes("eoa") ? (
                // ✅ EOA TABLE
                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-[#0b2d5c] text-white">
                      <tr>
                        <th className="p-3 text-left">Subject</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSection.items.map((item, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">{item.name}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() =>
                                window.open(item.file, "_blank")
                              }
                              className="bg-[#0b2d5c] text-white px-4 py-1 rounded"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // ✅ CARDS
                <div className="grid md:grid-cols-2 gap-6">
                  {activeSection.items.map((item, i) => (
                    <Card key={i}>
                      <h3 className="font-semibold mb-2">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.description}
                        </p>
                      )}

                      {item.year && (
                        <p className="text-xs text-gray-500 mb-3">
                          Year: {item.year}
                        </p>
                      )}

                      <button
                        onClick={() =>
                          window.open(item.file, "_blank")
                        }
                        className="bg-[#0b2d5c] text-white px-4 py-2 rounded"
                      >
                        View Document
                      </button>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default AICTEPage;
