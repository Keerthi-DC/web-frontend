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
import ScrollReveal from "../../../components/ui/ScrollReveal";

const Home = () => (
  <div className="flex flex-col min-h-screen pb-12 gap-12 overflow-hidden">
    <HeroSection />
    
    <ScrollReveal direction="up" viewportAmount={0.2}>
      <AnnouncementBar />
    </ScrollReveal>

    <ScrollReveal direction="up" delay={0.1} viewportAmount={0.2}>
      <QuickFacts />
    </ScrollReveal>

    <ScrollReveal direction="fade" viewportAmount={0.2}>
      <InstituteIntroSection />
    </ScrollReveal>

    <NewsSection />
    <EventSection />

    <ScrollReveal direction="left" viewportAmount={0.1}>
      <ProgramsSection />
    </ScrollReveal>

    <DepartmentsSection />

    <ScrollReveal direction="right" viewportAmount={0.1}>
      <CampusLifeSection />
    </ScrollReveal>

    <ScrollReveal direction="up" viewportAmount={0.1}>
      <ResearchSection />
    </ScrollReveal>

    <ScrollReveal direction="scaleUp" viewportAmount={0.1}>
      <PlacementSection />
    </ScrollReveal>

    <ScrollReveal direction="fade" viewportAmount={0.1}>
      <GallerySection />
    </ScrollReveal>

    <ScrollReveal direction="up" viewportAmount={0.1}>
      <AlumniSection />
    </ScrollReveal>

    <CallToActionSection />
  </div>
);

export default Home;
