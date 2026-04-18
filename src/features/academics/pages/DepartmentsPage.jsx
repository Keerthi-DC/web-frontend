import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import useDepartments from "../hooks/useDepartments";

import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import Card from "../../../components/ui/Card";
import BietLoader from "../../../components/ui/BietLoader";


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

  if (loading) return <BietLoader />;

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
        {filteredDepartments.map((dept) => {
          const tags = Array.isArray(dept.programTypes)
            ? dept.programTypes
            : [dept.programTypes];

          return (
            <Card
              key={dept.departmentId}
              className="group !p-0 cursor-pointer overflow-hidden hover:-translate-y-2 transition-all duration-300"
            >
              <div onClick={() => navigate(`/departments/${dept.shortName}`)}>
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={dept.imageUrl}
                    alt={dept.name}
                    className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
                  />

                  {/* TAGS */}
                  {tags && (
                    <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-[#0B3C6D] text-white shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{dept.hod}</p>
                  <button className="mt-2 px-4 py-2 text-sm bg-[#0B3C6D] text-white rounded-lg">
                    Visit
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default DepartmentsPage;
