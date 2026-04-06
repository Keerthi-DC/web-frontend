import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CoursesPage from "./CoursesPage";
import TimetablePage from "./DepartmentTimetablePage";
import MaterialsPage from "./MaterialsPage";
import InnovativeTeachingPage from "./InnovativeTeachingPage";
import ResultsPage from "./ResultsPage";

export default function DepartmentAcademics() {
  return (
    <div >
      <Routes>
        <Route path="courses" element={<CoursesPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="teaching" element={<InnovativeTeachingPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate replace to="courses" />} />
      </Routes>
    </div>
  );
}
