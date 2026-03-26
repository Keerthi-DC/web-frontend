import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CoursesPage from "./CoursesPage";
import TimetablePage from "./TimetablePage";
import MaterialsPage from "./MaterialsPage";
import TeachingPage from "./TeachingPage";
import ResultsPage from "./ResultsPage";

export default function DepartmentAcademics() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      <h1 className="text-4xl font-bold text-center">Academics</h1>
      <Routes>
        <Route path="courses" element={<CoursesPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="teaching" element={<TeachingPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate replace to="courses" />} />
      </Routes>
    </div>
  );
}
