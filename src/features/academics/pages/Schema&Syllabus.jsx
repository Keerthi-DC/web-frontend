import React from "react";
import useSyllabus from "../hooks/useSyllabus";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import Card from "../components/ui/Card";

const SyllabusPage = () => {
  const {
    filteredSyllabus,
    search,
    setSearch,
    loading,
  } = useSyllabus();

  if (loading) {
    return <PageContainer><SectionTitle>Loading...</SectionTitle></PageContainer>;
  }

  return (
    <PageContainer>

      <SectionTitle>Syllabus</SectionTitle>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {filteredSyllabus.map((item) => (
          <Card key={item.id}>
            <h3>{item.department}</h3>
          </Card>
        ))}
      </div>

    </PageContainer>
  );
};

export default SyllabusPage;
