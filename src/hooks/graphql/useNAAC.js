import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../services/graphql";

const QUERY = `
  query ListAccreditationRecords(
    $type: String!
    $section: String
    $sub_section: String
    $sub_sub_section: String
    $department: String
    $tenantId: ID
  ) {
    listAccreditationRecords(
      type: $type
      section: $section
      sub_section: $sub_section
      sub_sub_section: $sub_sub_section
      department: $department
      tenantId: $tenantId
    ) {
      items {
        title
        file_url
      }
    }
  }
`;

const fetchAccreditation = async (variables) => {
  try {
    const res = await graphqlRequest(QUERY, {
      tenantId: "biet-college",
      ...variables,
    });

    return res?.listAccreditationRecords?.items || [];
  } catch (err) {
    console.error("Accreditation fetch error:", err);
    return [];
  }
};

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const useNAAC = () => {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sectionsList = [
          { title: "Accreditation Certificates", variables: { type: "NAAC", section: "Accreditation Certificates" } },
          { title: "IQAC", variables: { type: "NAAC", section: "IQAC" } },
          { title: "AQAR Reports", variables: { type: "NAAC", section: "AQAR Reports" } },
          { title: "IIQA", variables: { type: "NAAC", section: "IIQA" } },
          { title: "SSR Documents", variables: { type: "NAAC", section: "SSR Documents" } },
        ];

        const result = [];

        for (let sec of sectionsList) {
          const items = await fetchAccreditation(sec.variables);

          result.push({
            title: sec.title,
            id: slugify(sec.title),
            items: items.map((i) => ({
              name: i.title,
              file: i.file_url,
            })),
          });
        }

        setSections(result);
        setActiveId(result[0]?.id);
      } catch (err) {
        console.error(err);
        setError(err);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const activeSection = useMemo(() => {
    return sections.find((sec) => sec.id === activeId);
  }, [sections, activeId]);

  return {
    loading,
    error,
    sections,
    activeId,
    setActiveId,
    activeSection,
  };
};

export default useNAAC;