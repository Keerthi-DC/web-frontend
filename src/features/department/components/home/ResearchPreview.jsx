import { theme } from "../../../../components/ui/theme";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../hooks/useDepartmentMeta";
import { Award, FileText, Layers } from "lucide-react";
import useDepartmentResearch from "../../hooks/useDepartmentResearch";

const ResearchPreview = () => {
  const navigate = useNavigate();
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [data, setData] = useState({
    patents: [],
    grants: []
  });

  const [animatedCounts, setAnimatedCounts] = useState({
    patents: 0,
    grants: 0
  });

  const deptId = isReady ? getId(shortName) : null;
  const { data: researchData, loading } = useDepartmentResearch(deptId);

  useEffect(() => {
    if (researchData) {
      const patents = researchData.patents || [];
      const grants = researchData.grants || [];
      
      setData({ patents, grants });
      animateCount("patents", patents.length);
      animateCount("grants", grants.length);
    }
  }, [researchData]);

  const animateCount = (key, target) => {
    let start = 0;
    const duration = 800;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }

      setAnimatedCounts(prev => ({
        ...prev,
        [key]: Math.floor(start)
      }));
    }, 16);
  };

  const patentCount = data.patents.length;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-3xl font-bold mb-12 flex items-center gap-3">
          <div className="w-1 h-6 bg-blue-600" />
          <h2>Research Highlights</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {loading || !isReady ? (
            // 🔥 Skeleton Loader
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[160px] rounded-2xl bg-gray-200 animate-pulse"
              />
            ))
          ) : (
            <>
              {/* Filed Patents */}
              <div className="bg-blue-50 rounded-2xl p-6 flex flex-col justify-center items-center h-[160px] hover:shadow-md transition">
                <Award className="text-blue-600 mb-2" size={28} />
                <p className="text-3xl font-bold text-blue-700">
                  {animatedCounts.patents}
                </p>
                <p className="text-sm text-gray-600">Filed Patents</p>
              </div>

              {/* Total Patents */}
              <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col justify-center items-center h-[160px] hover:shadow-md transition">
                <Layers className="text-indigo-600 mb-2" size={28} />
                <p className="text-3xl font-bold text-indigo-700">
                  {patentCount}
                </p>
                <p className="text-sm text-gray-600">Total Patents</p>
              </div>

              {/* Grants */}
              <div className="bg-green-50 rounded-2xl p-6 flex flex-col justify-center items-center h-[160px] hover:shadow-md transition">
                <FileText className="text-green-600 mb-2" size={28} />
                <p className="text-3xl font-bold text-green-700">
                  {animatedCounts.grants}
                </p>
                <p className="text-sm text-gray-600">Grants</p>
              </div>
            </>
          )}

        </div>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() =>
              navigate(`/departments/${shortName}/research`)
            }
            className={theme.buttons.primary}
          >
            Explore Research →
          </button>
        </div>

      </div>
    </section>
  );
};

export default ResearchPreview;
