import { useState, useEffect } from "react";
import { graphqlRequest } from "../../../services/graphql";

const globalCache = {};
const globalPromises = {};

const DEPARTMENT_HOME_QUERY = `
  query GetDepartmentHome($deptId: ID!, $tenantId: ID!) {
    getHodProfile(deptId: $deptId, tenantId: $tenantId) {
      name
      message
      imageUrl
    }
    intro: getDeptIntroduction(deptId: $deptId, tenantId: $tenantId) {
      departmentName
      imageUrl
      description
    }
    about: getDeptAbout(deptId: $deptId, tenantId: $tenantId) {
      vision
      mission
    }
    swot: getDeptSwot(deptId: $deptId, tenantId: $tenantId) {
      strengths
      weaknesses
      opportunities
      threats
    }
    listFaculty(deptId: $deptId, tenantId: $tenantId) {
      items {
        name
        profileImage
        designation
      }
    }
    listPlacementOverviews(deptId: $deptId, tenantId: $tenantId) {
      items {
        placementOverviewId
        academicYear
        highestPackage
        companiesVisited
        studentsInCampus
        studentsOffCampus
      }
    }
    listPatents(deptId: $deptId, tenantId: $tenantId) {
      items { text }
    }
    studentAchievements: listAchievements(deptId: $deptId, type: "student", tenantId: $tenantId) {
      items { text type }
    }
    staffAchievements: listAchievements(deptId: $deptId, type: "staff", tenantId: $tenantId) {
      items { text type }
    }
  }
`;

const useDepartmentHome = (deptId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deptId) return;

    const fetchData = async () => {
      // 1. Check if we already have the data
      if (globalCache[deptId]) {
        setData(globalCache[deptId]);
        setLoading(false);
        return;
      }

      // 2. If a request is already in flight, wait for it
      if (!globalPromises[deptId]) {
        globalPromises[deptId] = graphqlRequest(DEPARTMENT_HOME_QUERY, {
          deptId,
          tenantId: "biet-college",
        });
      }

      setLoading(true);
      setError(null);
      try {
        const res = await globalPromises[deptId];
        globalCache[deptId] = res?.data || {};
        setData(res?.data || {});
      } catch (err) {
        console.error("Error fetching Department Home data:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deptId]);

  const hod = data?.getHodProfile || {
    name: "Default HOD",
    message: "Welcome",
    imageUrl: "/assets/default-hod.png",
  };

  const intro = data?.intro ? {
    hero: {
      title: data.intro.departmentName,
      image: data.intro.imageUrl,
    },
    about: {
      intro: data.intro.description,
      vision: data.about?.vision,
      mission: data.about?.mission,
    },
    swot: data.swot,
  } : null;

  const facultyItems = data?.listFaculty?.items || [];
  const faculty = facultyItems.length > 0 ? facultyItems : [
    {
      name: "John Doe",
      profileImage: "/assets/default.png",
      designation: "Professor",
    },
  ];

  const placements = data?.listPlacementOverviews?.items || [];
  
  const research = {
    patents: data?.listPatents?.items || [],
    grants: [] // Removed data?.listResearchGrants?.items to avoid permission error
  };

  const achievements = [
    ...(data?.studentAchievements?.items || []),
    ...(data?.staffAchievements?.items || [])
  ].map(item => ({
    text: item.text,
    name: item.type === "student" ? "Student" : "Faculty",
    photo: "/assets/default-user.png",
  }));

  return { hod, intro, faculty, placements, research, achievements, loading: loading && !!deptId, error };
};

export default useDepartmentHome;
