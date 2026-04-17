import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import useDepartments from "../hooks/useDepartments";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import Card from "../components/ui/Card";

const DepartmentsPage = () => {
  const {
    filteredDepartments,
    searchTerm,
    setSearchTerm,
    activeType,
    setActiveType,
    loading,
  } = useDepartments();

  const navigate = useNavigate();

  const Tab = ({ type, label }) => (
    <button
      onClick={() => setActiveType(type)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${
          activeType === type
            ? "bg-[#0B3C6D] text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );

  if (loading) {
    return (
      <PageContainer>
        <SectionTitle>Loading Departments...</SectionTitle>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionTitle>Departments</SectionTitle>

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search departments..."
            className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-[#0B3C6D]"
          />

          {searchTerm && (
            <X
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
       <Tab type="ug" label="UG" />
<Tab type="pg" label="PG" />
<Tab type="research" label="Research" />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {filteredDepartments.map((dept) => (
          <Card
            key={dept.departmentId}
            onClick={() => navigate(`/departments/${dept.shortName}`)}
            image={dept.imageUrl}
            title={dept.name}
            subtitle={dept.hod}
            tags={
              Array.isArray(dept.programTypes)
                ? dept.programTypes
                : [dept.programTypes]
            }
          >
            <button className="mt-2 px-4 py-2 text-sm bg-[#0B3C6D] text-white rounded-lg">
              Visit
            </button>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default DepartmentsPage;
