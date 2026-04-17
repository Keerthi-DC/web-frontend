import { useState } from "react";
import { graphqlRequest } from "../../../services/graphql"; // correct relative path to src/services/graphql.js

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

export const useVision = () => {
  // start with local mock data so the UI works offline / as a fallback
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getVision) {
        setData(res.data.getVision);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load vision");
      // keep existing mockData as fallback
    } finally {
      setLoading(false);
    }
  };

  // NOTE: we don't auto-fetch on mount so the hook behaves like `useAboutOverview` (immediate mock/fallback).
  // Call `refetch()` (returned below) to attempt a network fetch when desired.

  return {
    data,
    loading,
    error,
    refetch: fetchVision,
    isEmpty: !data,
  };
};

export default useVision;