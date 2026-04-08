import BietGuide from "./components/BietGuide";
// import ChatBot from "./components/ChatBot";
  import "./aws-config";
  import { Routes, Route, useLocation } from "react-router-dom";
  import Navbar from "./components/layout/Header/Navbar";
  import DepartmentNavbar from "./components/layout/Header/DepartmentNavbar";
  import Home from "./pages/Home";
  import NewsPage from "./components/news&events/NewsPage";
  import EventsPage from "./components/news&events/EventsPage";
  import NotificationsPage from "./components/news&events/Notification";
  import GalleryPage from "./pages/GalleryPage";
  import ResearchPage from "./pages/ResearchPage";
  import PlacementsPage from "./pages/PlacementsPage";
  import DepartmentsPage from "./pages/DepartmentsPage";
  import AcademicsPage from "./pages/AcademicsPage";
  import ProgramsPage from "./pages/ProgramsPage";
  import FacultyPage from "./pages/FacultyPage";
  import AcademicCalendar from "./pages/AcademicCalendar";
  import TimeTablePage from "./pages/TimeTablePage";
  import SyllabusPage from "./pages/SyllabusPage";
  import ResultAnalysis from "./pages/ResultAnalysisPage";
  import AdmissionOverview from "./components/admissions/OverviewPage";
  import ProspectusPage from "./components/admissions/ProspectusPage";
  import FeeStructurePage from "./components/admissions/FeeStructurePage";
  
  import DepartmentHome from "./modules/department/pages/DepartmentHome";
  import DepartmentEvents from "./modules/department/pages/DepartmentEvents";
  import DepartmentPlacements from "./modules/department/pages/DepartmentPlacements";
  import DepartmentAchievements from "./modules/department/pages/DepartmentAchievements";
  import DepartmentPeople from "./modules/department/pages/DepartmentPeople";
  import DepartmentResearch from "./modules/department/pages/DepartmentResearch";
  import DepartmentAcademics from "./modules/department/pages/DepartmentAcademics";
  import ScrollToHash from "./components/common/ScrollToHash";
  import DepartmentActivities from "./modules/department/pages/DepartmentActivities";
  import DepartmentAlumni from "./modules/department/pages/DepartmentAlumni";
  import DepartmentGallery from "./modules/department/pages/DepartmentGallery";
  import DepartmentNewsletter from "./modules/department/pages/DepartmentNewsletter";
  import DepartmentAccreditation from "./modules/department/pages/DepartmentAccreditation";
  
  import AICTEPage from "./components/accreditations/AICTEPage";
  import NAACPage from "./components/accreditations/NAACPage";
  import NBAPage from "./components/accreditations/NBAPage";
  import AISHEPage from "./components/accreditations/AISHEPage";
  
  import ScholarshipPage from "./components/admissions/ScholarshipPage";
  import EnquiryPage from "./components/admissions/EnquiryPage";

  import AboutOverview from "./components/about/AboutOverviewPage";
  import VisionPage from "./components/about/VisionPage";


  const App = () => {
    const location = useLocation();
    const isDepartmentPage = location.pathname.startsWith("/departments/");

    return (
      <div className="w-full">
        <ScrollToHash />
        {isDepartmentPage ?<DepartmentNavbar /> : <Navbar />}
        <BietGuide />
        <Routes>
          {/* general pages */}
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/placements" element={<PlacementsPage />} />

          {/*accreditation pages */}
          <Route path="/accreditations/naac" element={<NAACPage />} />
          <Route path="/accreditations/nba" element={<NBAPage />} />
          <Route path="/accreditations/aicte" element={<AICTEPage />} />
          <Route path="/accreditations/aishe" element={<AISHEPage />} />

          {/* academics-specific pages */}
          <Route path="/academics/departments" element={<DepartmentsPage />} />
          <Route path="/academics/programs" element={<ProgramsPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/academics/faculty" element={<FacultyPage />} />
          <Route path="/academics/academic-calendar" element={<AcademicCalendar />} />
          <Route path="/academics/time-tables" element={<TimeTablePage />} />
          <Route path="/academics/syllabus" element={<SyllabusPage />} />
          <Route path="/academics/result-analysis" element={<ResultAnalysis />} />

          {/* admission‑specific pages */}
          <Route path="/admissions/overview" element={<AdmissionOverview />} />
          <Route path="/admissions/prospectus" element={<ProspectusPage />} />
          <Route path="/admissions/fee-structure" element={<FeeStructurePage />} />
          <Route path="/admissions/scholarships" element={<ScholarshipPage />} />
          <Route path="/admissions/enquiry" element={<EnquiryPage />} />

          {/* about‑specific pages */}
          <Route path="/about/overview" element={<AboutOverview />} />
          <Route path="/about/vision" element={<VisionPage />} />

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
          <Route path="/departments/:shortName/accreditation"element={<DepartmentAccreditation />}/>
        </Routes>
     </div >
    );
  };

  export default App;