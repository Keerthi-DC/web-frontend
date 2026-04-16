import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // ✅ use shared service

const LIST_FACULTY_QUERY = `
query ListFaculty($tenantId: ID) {
  listFaculty(tenantId: $tenantId) {
    items {
      facultyId
      name
      designation
      profileImage
      cvUrl
    }
  }
}
`;

const mockFaculty = [
  {
    facultyId: "1",
    name: "Dr. Sample Faculty",
    designation: "Professor",
    profileImage: "https://picsum.photos/200",
    cvUrl: "#",
  },
];

const useFaculty = (tenantId) => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFaculty = async () => {
    try {
      const res = await graphqlRequest(LIST_FACULTY_QUERY, { tenantId });

      if (res?.data?.listFaculty?.items) {
        setFaculty(res.data.listFaculty.items);
      } else {
        setFaculty(mockFaculty); // fallback
      }
    } catch (err) {
      setError(err);
      setFaculty(mockFaculty); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, [tenantId]);

  return { faculty, loading, error, refetch: fetchFaculty };
};

export default useFaculty;