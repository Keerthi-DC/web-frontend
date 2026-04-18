import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import DepartmentHero from "../components/home/DepartmentHero";
import DepartmentIntro from "../components/home/DepartmentIntro";
import DepartmentHOD from "../components/home/DepartmentHOD";
import FacultyPreview from "../components/home/FacultyPreview";
import ResearchPreview from "../components/home/ResearchPreview";
import PlacementStats from "../components/home/PlacementStats";
import AchievementsPreview from "../components/home/AchievementsPreview";
import GalleryPreview from "../components/home/GalleryPreview";
import QuickLinksPreview from "../components/home/QuickLinksPreview";

import { useDepartmentMeta } from "../hooks/useDepartmentMeta";
import useDepartmentHome from "../hooks/useDepartmentHome";
import BietLoader from "../../../components/ui/BietLoader";

const DepartmentHome = () => {
  const params = useParams();
  const shortName = params.shortName || params.id;
  
  const { getId, isReady } = useDepartmentMeta();
  const deptId = isReady ? getId(shortName) : null;
  const { loading } = useDepartmentHome(deptId);

  if (!isReady || loading) return <BietLoader />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <DepartmentHero />
      <DepartmentIntro />
      <DepartmentHOD />
      <FacultyPreview />
      <ResearchPreview />
      <PlacementStats />
      <AchievementsPreview />
      <QuickLinksPreview shortName={shortName} />
      <GalleryPreview />
    </motion.div>
  );
};

export default DepartmentHome;
