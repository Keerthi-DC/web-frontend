import { useQuery } from "@apollo/client/react";
import { GET_TECHNOWAVE } from "../graphql/queries";

const mockData = {
  title: "Technowave",
  items: [
    { title: "ECE Newsletter", pdf: "/pdfs/ece.pdf" }
  ]
};

const useTechnowave = () => {
  const { data: apolloData, loading, error, refetch } = useQuery(GET_TECHNOWAVE, { fetchPolicy: "cache-first" });

  const data = apolloData?.getTechnowave || mockData;

  return {
    data,
    loading,
    error,
    refetch,
    isEmpty: !data,
  };
};

export default useTechnowave;