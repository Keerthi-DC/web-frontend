import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql";

const useDepartmentHome = (deptId) => {
  const [data, setData] = useState({
    hod: null,
    intro: null,
    faculty: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deptId) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        const [hodRes, introRes, facultyRes] = await Promise.all([
          // HOD
          graphqlRequest(
            `
            query ($deptId: ID!) {
              getHodProfile(deptId: $deptId, tenantId: "biet-college") {
                name
                message
                imageUrl
              }
            }
            `,
            { deptId }
          ),

          // INTRO + ABOUT + SWOT
          graphqlRequest(
            `
            query ($deptId: ID!) {
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
            { deptId }
          ),

          // FACULTY
          graphqlRequest(
            `
            query ($deptId: ID!) {
              listFaculty(deptId: $deptId, tenantId: "biet-college") {
                items {
                  name
                  profileImage
                  designation
                }
              }
            }
            `,
            { deptId }
          ),
        ]);

        const hod = hodRes?.getHodProfile;
        const introData = introRes;
        const faculty = facultyRes?.listFaculty?.items || [];

        setData({
          hod: hod || {
            name: "Default HOD",
            message: "Welcome",
            imageUrl: "/assets/default-hod.png",
          },

          intro: introData
            ? {
                hero: {
                  title: introData.intro?.departmentName,
                  image: introData.intro?.imageUrl,
                },
                about: {
                  intro: introData.intro?.description,
                  vision: introData.about?.vision,
                  mission: introData.about?.mission,
                },
                swot: introData.swot,
              }
            : null,

          faculty:
            faculty.length > 0
              ? faculty
              : [
                  {
                    name: "John Doe",
                    profileImage: "/assets/default.png",
                    designation: "Professor",
                  },
                ],
        });
      } catch (err) {
        console.error("Failed to load department data:", err);
        setError("Failed to load department data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [deptId]);

  return { ...data, loading, error };
};

export default useDepartmentHome;