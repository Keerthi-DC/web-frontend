import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_ACCREDITATION_RECORDS } from "../graphql/queries";

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const useAICTE = () => {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sectionsList = [
          { title: "AICTE — EOA", variables: { type: "AICTE", section: "EOA" } },
          { title: "AICTE — IDEA LAB", variables: { type: "AICTE", section: "IDEA LAB" } },
          { title: "AICTE — SPICES Activities", variables: { type: "AICTE", section: "SPICES", sub_section: "Activities" } },
          { title: "AICTE — SPICES Clubs", variables: { type: "AICTE", section: "SPICES", sub_section: "Clubs" } },
        ];

        const result = await Promise.all(
          sectionsList.map(async (sec) => {
            const res = await graphqlRequest(
              LIST_ACCREDITATION_RECORDS,
              { tenantId: "biet-college", ...sec.variables }
            );

            // ✅ IMPORTANT FIX
            const items = res?.data?.listAccreditationRecords?.items || [];

            return {
              title: sec.title,
              id: slugify(sec.title),
              items: items.map((i) => ({
                name: i.title,
                file: i.file_url,
                year: i.year,
                description: i.description,
              })),
            };
          })
        );

        setSections(result);
        setActiveId(result[0]?.id);
      } catch (err) {
        console.error("AICTE ERROR:", err);
        setError(err);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeId),
    [sections, activeId]
  );

  return {
    loading,
    error,
    sections,
    activeId,
    setActiveId,
    activeSection,
  };
};

// ✅ THIS LINE FIXES YOUR ERROR
export default useAICTE;