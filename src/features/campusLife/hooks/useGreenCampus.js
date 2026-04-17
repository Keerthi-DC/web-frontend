import { useQuery } from "@apollo/client/react";
import { GET_GREEN_CAMPUS } from "../graphql/queries";

const mockData = {
  title: "Green Campus",
  description: "Eco-friendly initiatives",
  images: ["/images/g1.jpg", "/images/g2.jpg"]
};

const useGreenCampus = () => {
  const { data: apolloData, loading, error, refetch } = useQuery(GET_GREEN_CAMPUS, { fetchPolicy: "cache-first" });
  
  const data = apolloData?.getGreenCampus || mockData;

  return {
    data,
    loading,
    error,
    refetch,
    isEmpty: !data,
  };
};

export default useGreenCampus;