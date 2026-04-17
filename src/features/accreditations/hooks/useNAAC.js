import { useEffect, useState, useMemo } from "react";
import { graphqlRequest } from "../../../services/graphql";
import { LIST_ACCREDITATION_RECORDS } from "../graphql/queries";

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const useNAAC = () => {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const config = [
          "Accreditation Certificates",
          "IQAC",
          "AQAR Reports",
          "IIQA",
          "SSR Documents",
        ];

        const result = await Promise.all(
          config.map(async (sec) => {
            const res = await graphqlRequest(
              LIST_ACCREDITATION_RECORDS,
              { tenantId: "biet-college", type: "NAAC", section: sec }
            );

            const items = res?.data?.listAccreditationRecords?.items || [];

            return {
              title: sec,
              id: slugify(sec),
              items: items.map((i) => ({
                name: i.title,
                file: i.file_url,
              })),
            };
          })
        );

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

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeId),
    [sections, activeId]
  );

  return { loading, error, sections, activeId, setActiveId, activeSection };
};

export default useNAAC;