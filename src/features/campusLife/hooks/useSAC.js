import { useQuery } from "@apollo/client/react";
import { GET_SAC } from "../graphql/queries";

const mockData = {
  title: "Student Academic Council",
  description: "Develops leadership and communication skills.",
  members: [
    { name: "Prof. Y Yuvashankarappa", role: "Director" },
    { name: "Dr. H B Aravind", role: "Principal" }
  ]
};

const useSAC = () => {
  const { data: apolloData, loading, error, refetch } = useQuery(GET_SAC, { fetchPolicy: "cache-first" });

  const data = apolloData?.getSAC || mockData;

  return {
    data,
    loading,
    error,
    refetch,
    isEmpty: !data,
  };
};

export default useSAC;