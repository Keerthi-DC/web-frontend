import React from "react";
import useRanks from "../hooks/useRank";

import PageContainer from "../components/ui/PageContainer";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";

const RankPage = () => {
  const { data, loading } = useRanks();

  if (loading) {
    return <PageContainer><SectionTitle>Loading...</SectionTitle></PageContainer>;
  }

  return (
    <PageContainer>
      <SectionTitle>Ranks</SectionTitle>

      {data.map((item) => (
        <Card key={item.id}>
          {item.title}
        </Card>
      ))}
    </PageContainer>
  );
};

export default RankPage;