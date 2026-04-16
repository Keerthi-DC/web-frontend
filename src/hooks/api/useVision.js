import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  intro: {
    title: "Vision, Mission & Strategy",
    description:
      "BIET continues to evolve to meet the demands of a competitive world.",
  },
  vision: {
    title: "Vision",
    content:
      "To be a centre of excellence recognized nationally and internationally.",
  },
  mission: {
    title: "Mission",
    content:
      "To provide quality engineering education and empower students.",
  },
  qualityPolicy: {
    title: "Quality Policy",
    points: [
      "Promoting discipline, punctuality and ethics",
      "Encouraging teacher-student interaction",
    ],
  },
  swot: {
    strengths: ["Strong management and leadership"],
    weakness: ["Limited research collaboration"],
    opportunities: ["Industry collaboration"],
    threats: ["Competition from top institutions"],
  },
};

const useVision = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetVision {
      getVision {
        intro { title description }
        vision { title content }
        mission { title content }
        qualityPolicy { title points }
        swot {
          strengths
          weakness
          opportunities
          threats
        }
      }
    }
  `;

  const fetchVision = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getVision) {
        setData(res.data.getVision);
      } else {
        setData(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setData(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVision();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchVision,
    isEmpty: !data,
  };
};

export default useVision;