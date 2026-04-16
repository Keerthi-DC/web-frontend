import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  title: "Admissions are now open for 2027",
  description:
    "Begin your journey at one of Karnataka’s premier engineering institutions. Apply now and shape your future with innovation and excellence.",
  image: "/assets/hero-campus.jpg",
  buttons: [
    {
      text: "Apply Now",
      link: "/admissions",
    },
    {
      text: "Learn More",
      link: "/about",
    },
  ],
};

const useHero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetHero {
      getHero {
        title
        description
        image
        buttons {
          text
          link
        }
      }
    }
  `;

  const fetchHero = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getHero) {
        setHero(res.data.getHero);
      } else {
        setHero(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setHero(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  return {
    hero,
    loading,
    error,
    refetch: fetchHero,
    isEmpty: !hero,
  };
};

export default useHero;