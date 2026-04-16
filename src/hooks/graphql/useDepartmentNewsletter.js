import { useEffect, useState } from "react";

const useDepartmentNewsletter = (shortName) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shortName) {
      setLoading(false); // 🔥 important fix
      return;
    }

    try {
      const mockData = {
        newsletter: [
          {
            title: "Department Newsletter 2026",
            pdf: "/pdfs/news1.pdf",
          },
          {
            title: "Department Newsletter 2025",
            pdf: "/pdfs/news2.pdf",
          },
          {
            title: "Research Highlights 2024",
            pdf: "/pdfs/news3.pdf",
          },
        ],
      };

      setData(mockData);
    } catch (err) {
      console.error("Error loading newsletter:", err);
    } finally {
      setLoading(false);
    }
  }, [shortName]);

  return { data, loading };
};

export default useDepartmentNewsletter;