import { useQuery } from "@apollo/client/react";
import { GET_GYM } from "../graphql/queries";

const mockData = {
  title: "Gym",
  images: [
    "/images/gym1.jpg",
    "/images/gym2.jpg",
    "/images/gym3.jpg"
  ]
};

const useGym = () => {
  const { data: apolloData, loading, error, refetch } = useQuery(GET_GYM, { fetchPolicy: "cache-first" });

  const data = apolloData?.getGym || mockData;

  return {
    data,
    loading,
    error,
    refetch,
    isEmpty: !data,
  };
};

export default useGym;