import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import StatCard from "../components/ui/StatCard";

const FacultyPage = () => {

  const location = useLocation();

  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState("All");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  /* ---------------------------
     Read department query param
  --------------------------- */

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const dept = params.get("department");

    if (dept && dept !== "undefined" && dept !== "null") {
      setDeptFilter(dept);
    } else {
      setDeptFilter("All");
    }

  }, [location]);

  /* ---------------------------
     Fetch faculty from AppSync
  --------------------------- */

  useEffect(() => {

    const fetchFaculty = async () => {

      try {

        const response = await fetch(
          "https://gh6gat7bdrg2ditrfb2b7zsiqe.appsync-api.ap-south-1.amazonaws.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "da2-pmh5ou3irbgntczk43qj4r6aum"
            },
            body: JSON.stringify({
              query: `
                query {
                  listFaculty {
                    id
                    name
                    photo
                    department
                    designation
                    education
                    experience
                    linkedin
                    research
                    subjects
                    cv
                  }
                }
              `
            })
          }
        );

        const result = await response.json();

        console.log("GraphQL response:", result);

        if (result.data?.listFaculty?.items) {
          setFaculty(result.data.listFaculty.items);
        }
        else if (Array.isArray(result.data?.listFaculty)) {
          setFaculty(result.data.listFaculty);
        }

        setLoading(false);

      } catch (error) {

        console.error("GraphQL error:", error);
        setLoading(false);

      }

    };

    fetchFaculty();

  }, []);

  /* ---------------------------
     Unique departments
  --------------------------- */

  const departments = useMemo(() => {

    const set = new Set();

    faculty.forEach((f) => {
      if (f.department) set.add(f.department);
    });

    return Array.from(set).sort();

  }, [faculty]);

  /* ---------------------------
     Filtering
  --------------------------- */

  const filteredFaculty = useMemo(() => {

    return faculty.filter((f) => {

      const matchesSearch = (f.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDept =
        deptFilter === "All" ||
        (f.department || "") === deptFilter;

      const matchesDesignation =
        designationFilter === "All" ||
        (f.designation || "") === designationFilter;

      return matchesSearch && matchesDept && matchesDesignation;

    });

  }, [faculty, search, deptFilter, designationFilter]);

  /* ---------------------------
     Stats
  --------------------------- */

  const stats = useMemo(() => {

    const total = faculty.length;

    const deptCount =
      new Set(
        faculty
          .map((f) => f.department)
          .filter(Boolean)
      ).size;

    const professors =
      faculty.filter((f) =>
        (f.designation || "").includes("Professor")
      ).length;

    const staff =
      faculty.filter(
        (f) => (f.designation || "") === "Staff / Peon"
      ).length;

    return { total, deptCount, professors, staff };

  }, [faculty]);

  /* ---------------------------
     Modal Controls
  --------------------------- */

  const openModal = (faculty) => {
    setSelectedFaculty(faculty);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFaculty(null);
  };

  const designationOptions = [
    "Assistant Professor",
    "Associate Professor",
    "HOD",
    "Dean",
    "Principal",
    "Staff / Peon"
  ];

  /* ---------------------------
     Loading Screen
  --------------------------- */

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-pulse text-gray-500">
          Loading Faculty Directory...
        </div>
      </div>
    );
  }

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6 px-4"
    >

      <h1 className="text-3xl font-semibold mb-4">
        Faculty
      </h1>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <StatCard title="Total Faculty" value={stats.total} />
        <StatCard title="Departments" value={stats.deptCount} />
        <StatCard title="Professors" value={stats.professors} />
        <StatCard title="Staff" value={stats.staff} />

      </div>

      {/* Filters */}

      <div className="flex flex-col sm:flex-row gap-4 mb-4">

        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
        />

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >

          <option value="All">All Departments</option>

          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}

        </select>

        <select
          value={designationFilter}
          onChange={(e) => setDesignationFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >

          <option value="All">All Designations</option>

          {designationOptions.map((d) => (
            <option key={d}>{d}</option>
          ))}

        </select>

      </div>

      {/* Desktop Table */}

      <div className="hidden md:block">

        <table className="min-w-full divide-y divide-gray-200">

          <thead>
            <tr>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Designation</th>
              <th className="px-6 py-3">Education</th>
              <th className="px-6 py-3">Experience</th>
              <th className="px-6 py-3">LinkedIn</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">

            {filteredFaculty.map((f) => (

              <motion.tr
                key={f.id}
                whileHover={{
                  y: -2,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}
              >

                <td className="px-6 py-4">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>

                <td className="px-6 py-4">{f.name}</td>
                <td className="px-6 py-4">{f.department}</td>
                <td className="px-6 py-4">{f.designation}</td>
                <td className="px-6 py-4">{f.education}</td>
                <td className="px-6 py-4">{f.experience}</td>

                <td className="px-6 py-4">
                  <a href={f.linkedin} target="_blank">
                    LinkedIn
                  </a>
                </td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => openModal(f)}
                    className="px-4 py-1 bg-indigo-600 text-white rounded"
                  >
                    Read More
                  </button>

                </td>

              </motion.tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile View */}

      <div className="md:hidden grid grid-cols-1 gap-4">

        {filteredFaculty.map((f) => (

          <div
            key={f.id}
            className="border rounded-lg p-4 flex items-center space-x-4"
          >

            <img
              src={f.photo}
              alt={f.name}
              className="w-16 h-16 rounded-full"
            />

            <div className="flex-1">

              <h3 className="text-lg font-semibold">
                {f.name}
              </h3>

              <p className="text-sm text-gray-600">
                {f.department} – {f.designation}
              </p>

              <button
                onClick={() => openModal(f)}
                className="text-indigo-600 mt-2"
              >
                Read More
              </button>

            </div>

          </div>

        ))}

      </div>

      {modalOpen && selectedFaculty && (
        <Modal faculty={selectedFaculty} onClose={closeModal} />
      )}

    </motion.div>

  );

};

/* ---------------------------
   Modal Component
--------------------------- */

const Modal = ({ faculty, onClose }) => (

  <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

    <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-2/3">

      <button
        onClick={onClose}
        className="float-right text-gray-600"
      >
        ✕
      </button>

      <div className="flex flex-col md:flex-row gap-4">

        <img
          src={faculty.photo}
          alt={faculty.name}
          className="w-32 h-32 rounded-full"
        />

        <div>

          <h2 className="text-2xl font-semibold">
            {faculty.name}
          </h2>

          <p><strong>Department:</strong> {faculty.department}</p>
          <p><strong>Designation:</strong> {faculty.designation}</p>
          <p><strong>Education:</strong> {faculty.education}</p>
          <p><strong>Experience:</strong> {faculty.experience}</p>
          <p><strong>Research:</strong> {faculty.research}</p>
          <p><strong>Subjects:</strong> {faculty.subjects}</p>

        </div>

      </div>

    </div>

  </motion.div>

);

Modal.propTypes = {
  faculty: PropTypes.object,
  onClose: PropTypes.func
};

export default FacultyPage;