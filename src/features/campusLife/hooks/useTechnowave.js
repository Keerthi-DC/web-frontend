import { useEffect, useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // adjust path
import { GET_TECHNOWAVE } from "../graphql/queries";

const mockData = {
  title: "Technowave",
  items: [
    { title: "ECE Newsletter", pdf: "/pdfs/ece.pdf" }
  ]
};

const useTechnowave = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = GET_TECHNOWAVE;

  const fetchTechnowave = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getTechnowave) {
        setData(res.data.getTechnowave);
      } else {
        // No fallback fetch here — pages will provide mockData when JSONs are removed
        setData(mockData);
      }
    } catch (err) {
      setError(err);
      // Pages should render their own mockData if GraphQL fails
      setData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnowave();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchTechnowave,
    isEmpty: !data,
  };
};

export default useTechnowave;