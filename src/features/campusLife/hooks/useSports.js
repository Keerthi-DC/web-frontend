import { useQuery } from "@apollo/client/react";
import { GET_SPORTS } from "../graphql/queries";

const mockData = {
  title: "Sports",
  reports: [
    { title: "Sports 2023-24", pdf: "/pdfs/s1.pdf" },
    { title: "Sports 2022-23", pdf: "/pdfs/s2.pdf" }
  ]
};

const useSports = () => {
  const { data: apolloData, loading, error, refetch } = useQuery(GET_SPORTS, { fetchPolicy: "cache-first" });

  const data = apolloData?.getSports || mockData;

  return {
    data,
    loading,
    error,
    refetch,
    isEmpty: !data,
  };
};

export default useSports;