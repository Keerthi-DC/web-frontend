import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

// ✅ QUERY
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

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchCommittees = async () => {
      try {
        setLoading(true);

        const deptId = getId(shortName);
        if (!deptId) return;

        const [dabRes, pacRes] = await Promise.all([
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
                committee: "DAB",
                tenantId: "biet-college",
              },
            }),
          }),

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
                committee: "PAC",
                tenantId: "biet-college",
              },
            }),
          }),
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
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#0b3c5d]">
          {title}
        </h2>

        <p className="text-gray-500 mt-2 text-sm max-w-xl">
          The committee bridges the gap between academia and industry,
          ensuring curriculum stays aligned with evolving standards.
        </p>

        <div className="w-20 h-[2px] bg-[#0b3c5d] mt-4"></div>
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
      <h1 className="text-4xl font-bold mb-12 text-center">
        Accreditation
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {dabMembers.length > 0 &&
            renderCards(
              dabMembers,
              "Department Advisory Board (DAB) Members"
            )}

          {pacMembers.length > 0 &&
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