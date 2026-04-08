import React from "react";
import HeroSection from "../components/home/HeroSection";
import AnnouncementBar from "../components/home/AnnouncementBar";
import QuickFacts from "../components/home/QuickFacts";
import InstituteIntroSection from "../components/home/InstituteIntroSection";
import NewsSection from "../components/home/NewsSection";
import EventSection from "../components/home/EventSection";
import ProgramsSection from "../components/home/ProgramsSection";
import DepartmentsSection from "../components/home/DepartmentsSection";
import CampusLifeSection from "../components/home/CampusLifeSection";
import ResearchSection from "../components/home/ResearchSection";
import PlacementSection from "../components/home/PlacementSection";
import GallerySection from "../components/home/GallerySection";
import AlumniSection from "../components/home/AlumniSection";
import CallToActionSection from "../components/home/CallToActionSection";
import Footer from "../components/layout/Footer";

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
    <Footer />
  </div>
);

export default Home;
