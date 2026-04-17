import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client/core";

const DEPARTMENT_HOME_QUERY = gql`
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
  }
`;

const useDepartmentHome = (deptId) => {
  const { data, loading, error } = useQuery(DEPARTMENT_HOME_QUERY, {
    variables: { deptId, tenantId: "biet-college" },
    skip: !deptId,
    fetchPolicy: "cache-first",
  });

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

  return { hod, intro, faculty, loading, error: error?.message || null };
};

export default useDepartmentHome;
