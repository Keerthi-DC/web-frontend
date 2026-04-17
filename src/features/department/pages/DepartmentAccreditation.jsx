import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../hooks/useDepartmentMeta";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

// ✅ QUERY (FIXED & SAFE)
const LIST_COMMITTEE = `
  query ListCommitteeMembers($deptId: ID!, $committee: String, $tenantId: ID!) {
    listCommitteeMembers(deptId: $deptId, committee: $committee, tenantId: $tenantId) {
      items {
        committeeMemberId
        name
        designation
        order
      }
    }
  }
`;

const DepartmentAccreditation = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [dabMembers, setDabMembers] = useState([]);
  const [pacMembers, setPacMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW: Toggle state
  const [selectedTab, setSelectedTab] = useState("DAB");

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchCommittees = async () => {
      try {
        setLoading(true);

        const deptId = getId(shortName);
        if (!deptId) return;

        const makeRequest = (committee) =>
          fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
            body: JSON.stringify({
              query: LIST_COMMITTEE,
              variables: {
                deptId,
                committee,
                tenantId: "biet-college",
              },
            }),
          });

        const [dabRes, pacRes] = await Promise.all([
          makeRequest("DAB"),
          makeRequest("PAC"),
        ]);

        const dabResult = await dabRes.json();
        const pacResult = await pacRes.json();

        const dabList =
          dabResult?.data?.listCommitteeMembers?.items || [];

        const pacList =
          pacResult?.data?.listCommitteeMembers?.items || [];

        setDabMembers(
          dabList.sort((a, b) => (a.order || 0) - (b.order || 0))
        );

        setPacMembers(
          pacList.sort((a, b) => (a.order || 0) - (b.order || 0))
        );
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommittees();
  }, [shortName, isReady]);

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

        <div className="w-20 h-[2px] bg-[#0b3c5d] mt-4 mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((item) => (
          <div
            key={item.committeeMemberId}
            className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-md bg-[#0b3c5d] text-white font-semibold text-sm">
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
              ? "bg-[#0b3c5d] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          DAB Members
        </button>

        <button
          onClick={() => setSelectedTab("PAC")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition ${
            selectedTab === "PAC"
              ? "bg-[#0b3c5d] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          PAC Members
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
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
