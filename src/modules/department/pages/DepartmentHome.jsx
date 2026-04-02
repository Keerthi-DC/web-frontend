import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDepartmentMeta } from "../../../hooks/useDepartmentMeta";

import DepartmentHero from "../components/home/DepartmentHero";
import DepartmentIntro from "../components/home/DepartmentIntro";
import DepartmentHOD from "../components/home/DepartmentHOD";
import FacultyPreview from "../components/home/FacultyPreview";
import ResearchPreview from "../components/home/ResearchPreview";
import PlacementStats from "../components/home/PlacementStats";
import AchievementsPreview from "../components/home/AchievementsPreview";
import GalleryPreview from "../components/home/GalleryPreview";
import Footer from "../../../components/Footer";
import QuickLinksPreview from "../components/home/QuickLinksPreview";

const API_URL = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

const DepartmentHome = () => {
  const { shortName } = useParams();
  const { getId, isReady } = useDepartmentMeta();

  const [deptId, setDeptId] = useState(null);
  const [hod, setHod] = useState(null);
  const [introData, setIntroData] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!shortName || !isReady) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // ✅ Resolve deptId using hook
        const resolvedDeptId = getId(shortName);
        console.log("Resolved deptId:", resolvedDeptId);

        if (!resolvedDeptId) {
          throw new Error("Department not found");
        }

        setDeptId(resolvedDeptId);

        // =========================
        // ✅ HOD
        // =========================
        let hodData = null;
        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
            body: JSON.stringify({
              query: `
                query GetHod($deptId: ID!) {
                  getHodProfile(deptId: $deptId, tenantId: "biet-college") {
                    name
                    message
                    imageUrl
                  }
                }
              `,
              variables: { deptId: resolvedDeptId },
            }),
          });

          const result = await res.json();
          hodData = result?.data?.getHodProfile;
        } catch (e) {
          console.warn("HOD API failed:", e);
        }

        setHod(
          hodData || {
            name: "Dr. Dummy HOD",
            message: "Welcome to our department.",
            imageUrl: "/assets/default-hod.png",
          }
        );

        // =========================
        // ✅ INTRO / ABOUT / SWOT
        // =========================
        let introResData = null;

        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
            body: JSON.stringify({
              query: `
                query GetDeptDetails($deptId: ID!) {
                  intro: getDeptIntroduction(deptId: $deptId, tenantId: "biet-college") {
                    departmentName
                    imageUrl
                    description
                  }
                  about: getDeptAbout(deptId: $deptId, tenantId: "biet-college") {
                    vision
                    mission
                  }
                  swot: getDeptSwot(deptId: $deptId, tenantId: "biet-college") {
                    strengths
                    weaknesses
                    opportunities
                    threats
                  }
                }
              `,
              variables: { deptId: resolvedDeptId },
            }),
          });

          const result = await res.json();
          introResData = result?.data;
        } catch (e) {
          console.warn("Intro API failed:", e);
        }

        if (introResData?.intro) {
          setIntroData({
            hero: {
              title: introResData.intro.departmentName,
              image: introResData.intro.imageUrl,
            },
            about: {
              intro: introResData.intro.description,
              vision: introResData.about?.vision,
              mission: introResData.about?.mission,
            },
            swot: introResData.swot,
          });
        } else {
          setIntroData({
            hero: {
              title: "Department",
              image: "/assets/default-dept.jpg",
            },
            about: {
              intro: "Dummy description",
              vision: "Excellence",
              mission: "Innovation",
            },
            swot: {
              strengths: ["Strong academics"],
              weaknesses: ["Limited resources"],
              opportunities: ["Growth"],
              threats: ["Competition"],
            },
          });
        }

        // =========================
        // ✅ FACULTY
        // =========================
        let facultyList = [];

        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
            body: JSON.stringify({
              query: `
                query GetFaculty($deptId: ID!) {
                  listFaculty(deptId: $deptId, tenantId: "biet-college") {
                    items {
                      name
                      profileImage
                      designation
                    }
                  }
                }
              `,
              variables: { deptId: resolvedDeptId },
            }),
          });

          const result = await res.json();
          facultyList = result?.data?.listFaculty?.items || [];
        } catch (e) {
          console.warn("Faculty API failed:", e);
        }

        setFaculty(
          facultyList.length > 0
            ? facultyList
            : [
                {
                  name: "John Doe",
                  profileImage: "/assets/default-faculty.png",
                  designation: "Professor",
                },
              ]
        );

      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [shortName, isReady]);

  // =========================
  // ✅ UI STATES
  // =========================
  if (loading) {
    return <div className="p-8 text-center">Loading…</div>;
  }

  if (err) {
    return <div className="p-8 text-center text-red-600">{err}</div>;
  }

  if (!introData) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <DepartmentHero data={introData.hero} />
      <DepartmentIntro data={introData} />
      <DepartmentHOD data={hod} />
      <FacultyPreview data={faculty} slug={deptId} />
      <ResearchPreview data={{}} />
      <PlacementStats data={{}} />
      <AchievementsPreview/>
      <QuickLinksPreview shortName={shortName} />
      <GalleryPreview data={{}} />
      <Footer />
    </motion.div>
  );
};

export default DepartmentHome;