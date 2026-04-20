import { theme } from "../../../components/ui/theme";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";
import BietLoader from "../../../components/ui/BietLoader";

import useCommittees from "../hooks/useDepartmentCommittees";

const DepartmentAccreditation = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const deptId = isReady ? getId(shortName) : null;
  const [selectedTab, setSelectedTab] = useState("DAB");

  const { dabMembers, pacMembers, loading } = useCommittees(deptId);

  // ✅ INITIALS
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // ✅ CARD SECTION
  const renderCards = (list, title) => (
    <div className="mb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-[#0b3c5d]">
          {title}
        </h2>

        <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
          The committee bridges the gap between academia and industry,
          ensuring curriculum stays aligned with evolving standards.
        </p>

        <div className={`w-20 h-[2px] ${theme.colors.primaryBg} mt-4 mx-auto`}></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((item) => (
          <div
            key={item.committeeMemberId}
            className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-md ${theme.colors.primaryBg} text-white font-semibold text-sm`}>
              {getInitials(item.name)}
            </div>

            <h3 className="mt-4 font-semibold text-[#0b3c5d]">
              {item.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
              {item.designation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Accreditation
      </h1>

      {/* ✅ TOGGLE BUTTONS */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setSelectedTab("DAB")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition ${
            selectedTab === "DAB"
              ? "${theme.colors.primaryBg} text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          DAB Members
        </button>

        <button
          onClick={() => setSelectedTab("PAC")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition ${
            selectedTab === "PAC"
              ? "${theme.colors.primaryBg} text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
        </button>
      </div>

      {loading || !isReady ? (
        <BietLoader />
      ) : (
        <>
          {selectedTab === "DAB" &&
            dabMembers.length > 0 &&
            renderCards(
              dabMembers,
              "Department Advisory Board (DAB) Members"
            )}

          {selectedTab === "PAC" &&
            pacMembers.length > 0 &&
            renderCards(
              pacMembers,
              "Program Assessment Committee (PAC) Members"
            )}
        </>
      )}
    </div>
  );
};

export default DepartmentAccreditation;
