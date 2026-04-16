import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

const mockData = {
  subtitle: "BAPUJI EDUCATION ASSOCIATION",
  title:
    "Empowering generations through 50+ institutions in education since 1958",
  image: "https://picsum.photos/800/500?random=401",
  details: [
    // keep ALL your content SAME
  ],
  subAbout: [
    // keep SAME
  ],
};

const useInstituteIntro = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetInstituteIntro {
      getInstituteIntro {
        subtitle
        title
        image
        details
        subAbout {
          title
          detail
          link
          image
        }
      }
    }
  `;

  const fetchIntro = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getInstituteIntro) {
        setData(res.data.getInstituteIntro);
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
    fetchIntro();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchIntro,
    isEmpty: !data,
  };
};

export default useInstituteIntro;