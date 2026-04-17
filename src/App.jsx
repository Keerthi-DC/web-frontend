import React, { Suspense, lazy } from "react";
import BietGuide from "./components/BietGuide";
import "./aws-config";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Header/Navbar";
import DepartmentNavbar from "./components/layout/Header/DepartmentNavbar";
import Footer from "./components/layout/Footer";
import DepartmentFooter from "./components/layout/DepartmentFooter";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import ScrollToHash from "./components/ScrollToHash";

// Lazy-loaded feature pages
const Home = lazy(() => import("./features/home/pages/Home"));
const NewsPage = lazy(() => import("./features/news&events/pages/NewsPage"));
const EventsPage = lazy(() => import("./features/news&events/pages/EventsPage"));
const NotificationsPage = lazy(() => import("./features/news&events/pages/Notification"));
const GalleryPage = lazy(() => import("./features/gallery/pages/GalleryPage"));
const ResearchPage = lazy(() => import("./features/research/pages/ResearchPage"));
const PlacementsPage = lazy(() => import("./features/placements/pages/PlacementsPage"));

const FacultyPage = lazy(() => import("./features/faculty/pages/FacultyPage"));

const AboutOverviewPage = lazy(() => import("./features/about/pages/AboutOverviewPage"));
const FacilitiesPage = lazy(() => import("./features/about/pages/Facilities"));
const VisionPage = lazy(() => import("./features/about/pages/VisionPage"));
const CommitteesPage = lazy(() => import("./features/about/pages/CommitteesPage"));

const AcademicCalendar = lazy(() => import("./features/academics/pages/AcademicCalender"));
const DepartmentsPage = lazy(() => import("./features/academics/pages/DepartmentsPage"));
const SyllabusPage = lazy(() => import("./features/academics/pages/SchemaAndSyllabus"));
const RankPage = lazy(() => import("./features/academics/pages/RankPage"));

const AICTEPage = lazy(() => import("./features/accreditations/pages/AICTEPage"));
const AISHEPage = lazy(() => import("./features/accreditations/pages/AISHEPage"));
const NAACPage = lazy(() => import("./features/accreditations/pages/NAACPage"));
const NBAPage = lazy(() => import("./features/accreditations/pages/NBAPage"));

const AdmissionOverview = lazy(() => import("./features/admissions/pages/OverviewPage"));
const EnquiryPage = lazy(() => import("./features/admissions/pages/EnquiryPage"));
const FeeStructurePage = lazy(() => import("./features/admissions/pages/FeeStructurePage"));
const ProspectusPage = lazy(() => import("./features/admissions/pages/ProspectusPage"));
const ScholarshipPage = lazy(() => import("./features/admissions/pages/ScholarshipPage"));

const Facilities = lazy(() => import("./features/campusLife/pages/Facilities"));
const GymPage = lazy(() => import("./features/campusLife/pages/GymPage"));
const SACPage = lazy(() => import("./features/campusLife/pages/SacPage"));
const SportsPage = lazy(() => import("./features/campusLife/pages/SportsPage"));
const TechnowavePage = lazy(() => import("./features/campusLife/pages/TechnowavePage"));
const GreenCampusPage = lazy(() => import("./features/campusLife/pages/GreenCampusPage"));

const DepartmentHome = lazy(() => import("./features/department/pages/DepartmentHome"));
const DepartmentEvents = lazy(() => import("./features/department/pages/DepartmentEvents"));
const DepartmentPlacements = lazy(() => import("./features/department/pages/DepartmentPlacements"));
const DepartmentAchievements = lazy(() => import("./features/department/pages/DepartmentAchievements"));
const DepartmentPeople = lazy(() => import("./features/department/pages/DepartmentPeople"));
const DepartmentResearch = lazy(() => import("./features/department/pages/DepartmentResearch"));
const DepartmentAcademics = lazy(() => import("./features/department/pages/DepartmentAcademics"));
const DepartmentActivities = lazy(() => import("./features/department/pages/DepartmentActivities"));
const DepartmentAlumni = lazy(() => import("./features/department/pages/DepartmentAlumni"));
const DepartmentGallery = lazy(() => import("./features/department/pages/DepartmentGallery"));
const DepartmentNewsletter = lazy(() => import("./features/department/pages/DepartmentNewsletter"));
const DepartmentAccreditation = lazy(() => import("./features/department/pages/DepartmentAccreditation"));

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  const location = useLocation();
  const isDepartmentPage = location.pathname.startsWith("/departments/");

  return (
    <div className="w-full relative flex flex-col min-h-screen">
      <ScrollToHash />
      <Toaster position="top-right" />
      {isDepartmentPage ? <DepartmentNavbar /> : <Navbar />}
      <BietGuide />
      
      <main className="flex-grow">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* general pages */}
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/placements" element={<PlacementsPage />} />

              {/* about‑specific pages */}
              <Route path="/about/overview" element={<AboutOverviewPage />} />
              <Route path="/about/facilities" element={<FacilitiesPage />} />
              <Route path="/about/vision" element={<VisionPage />} />
              <Route path="/about/committees" element={<CommitteesPage />} />

              {/* academics-specific pages */}
              <Route path="/academics/departments" element={<DepartmentsPage />} />
              <Route path="/academics/academic-calendar" element={<AcademicCalendar />} />
              <Route path="/academics/syllabus" element={<SyllabusPage />} />
              <Route path="/academics/rank" element={<RankPage />} />

              {/* accreditation pages */}
              <Route path="/accreditations/naac" element={<NAACPage />} />
              <Route path="/accreditations/nba" element={<NBAPage />} />
              <Route path="/accreditations/aicte" element={<AICTEPage />} />
              <Route path="/accreditations/aishe" element={<AISHEPage />} />

              {/* admission‑specific pages */}
              <Route path="/admissions/overview" element={<AdmissionOverview />} />
              <Route path="/admissions/prospectus" element={<ProspectusPage />} />
              <Route path="/admissions/fee-structure" element={<FeeStructurePage />} />
              <Route path="/admissions/scholarships" element={<ScholarshipPage />} />
              <Route path="/admissions/enquiry" element={<EnquiryPage />} />

              {/* campus life‑specific pages */}
              <Route path="/campus-life/facilities" element={<Facilities />} />
              <Route path="/campus-life/gym" element={<GymPage />} />
              <Route path="/campus-life/sac" element={<SACPage />} />
              <Route path="/campus-life/sports" element={<SportsPage />} />
              <Route path="/campus-life/technowave" element={<TechnowavePage />} />
              <Route path="/campus-life/green-campus" element={<GreenCampusPage />} />

              {/* department‑specific pages */}
              <Route path="/departments/:shortName" element={<DepartmentHome />} />
              <Route path="/departments/:shortName/events" element={<DepartmentEvents />} />
              <Route path="/departments/:shortName/placements" element={<DepartmentPlacements />} />
              <Route path="/departments/:shortName/achievements" element={<DepartmentAchievements />} />
              <Route path="/departments/:shortName/people" element={<DepartmentPeople />} />
              <Route path="/departments/:shortName/research" element={<DepartmentResearch />} />
              <Route path="/departments/:shortName/academics/*" element={<DepartmentAcademics />} />
              <Route path="/departments/:shortName/activities" element={<DepartmentActivities />} />
              <Route path="/departments/:shortName/alumni" element={<DepartmentAlumni />} />
              <Route path="/departments/:shortName/gallery" element={<DepartmentGallery />} />
              <Route path="/departments/:shortName/newsletter" element={<DepartmentNewsletter />} />
              <Route path="/departments/:shortName/accreditation" element={<DepartmentAccreditation />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {isDepartmentPage ? <DepartmentFooter /> : <Footer />}
    </div>
  );
};

export default App;