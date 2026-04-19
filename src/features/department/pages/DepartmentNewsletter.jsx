import { theme } from "../../../components/ui/theme";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";
import BietLoader from "../../../components/ui/BietLoader";

const DepartmentNewsletter = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Resolve deptId (for consistency)
        const deptId = getId(shortName);
        console.log("Resolved deptId:", deptId);

        // ✅ Use shortName for JSON (IMPORTANT)
        const res = await fetch(`/data/departments/${shortName}.json`);
        const json = await res.json();

        setData(json);
      } catch (err) {
        console.error("Error loading newsletter:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shortName, isReady]);

  if (loading) return <BietLoader />;

  if (!data)
    return <div className="text-center py-20">No data found.</div>;

  const newsletters = data.newsletter || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">
        Newsletter
      </h1>

      {newsletters.length === 0 ? (
        <p className="text-gray-500">
          No newsletters available.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {newsletters.map((n, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded shadow"
            >
              <h3 className="text-lg font-semibold mb-4">
                {n.title}
              </h3>

              <a
                href={n.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${theme.colors.primaryBg} text-white px-4 py-2 rounded hover:bg-blue-800`}
              >
                <span>⬇</span>
                View / Download PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentNewsletter;
