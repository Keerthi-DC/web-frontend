import React from "react";
import useRanks from "../hooks/useRank";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import Card from "../../../components/ui/Card";
import BietLoader from "../../../components/ui/BietLoader";


const RankPage = () => {
  const { data, loading } = useRanks();

  if (loading) return <BietLoader />;

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
