import React from "react";
import HeroSection from "../components/HeroSection";
import AnnouncementBar from "../components/AnnouncementBar";
import QuickFacts from "../components/QuickFacts";
import InstituteIntroSection from "../components/InstituteIntroSection";
import NewsSection from "../components/NewsSection";
import EventSection from "../components/EventSection";
import ProgramsSection from "../components/ProgramsSection";
import DepartmentsSection from "../components/DepartmentsSection";
import CampusLifeSection from "../components/CampusLifeSection";
import ResearchSection from "../components/ResearchSection";
import PlacementSection from "../components/PlacementSection";
import GallerySection from "../components/GallerySection";
import AlumniSection from "../components/AlumniSection";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../../../components/layout/Footer";

const Home = () => (
  <div className="flex flex-col min-h-screen p-4 m-4 gap-4">
    <HeroSection />
    <AnnouncementBar />
    <QuickFacts />
    <InstituteIntroSection />
    <NewsSection />
    <EventSection />
    <ProgramsSection />
    <DepartmentsSection />
    <CampusLifeSection />
    <ResearchSection />
    <PlacementSection />
    <GallerySection />
    <AlumniSection />
    <CallToActionSection />
  </div>
);

export default Home;
