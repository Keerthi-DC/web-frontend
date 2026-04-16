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
        year
        description
      }
    }
  }
`;

/**
 * useAICTE Hook
 * Fetches AICTE accreditation sections and organizes them
 */
const useAICTE = () => {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [loading, setLoading] = useState(true);

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  useEffect(() => {
    const loadData = async () => {
      try {
        const sectionsList = [
          { title: "AICTE — EOA", variables: { type: "AICTE", section: "EOA" } },
          { title: "AICTE — IDEA LAB", variables: { type: "AICTE", section: "IDEA LAB" } },
          {
            title: "AICTE — SPICES Activities",
            variables: { type: "AICTE", section: "SPICES", sub_section: "Activities" },
          },
          {
            title: "AICTE — SPICES Clubs",
            variables: { type: "AICTE", section: "SPICES", sub_section: "Clubs" },
          },
        ];

        const result = [];

        for (let sec of sectionsList) {
          const data = await graphqlRequest(QUERY, {
            tenantId: "biet-college",
            ...sec.variables,
          });

          const items = data?.listAccreditationRecords?.items || [];

          result.push({
            title: sec.title,
            id: slugify(sec.title),
            items: items.map((i) => ({
              name: i.title,
              file: i.file_url,
              year: i.year,
              description: i.description,
            })),
          });
        }

        setSections(result);
        setActiveId(result[0]?.id);
      } catch (err) {
        console.error("Failed to load AICTE data:", err);
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
    sections,
    activeId,
    setActiveId,
    activeSection,
  };
};

export default useAICTE;