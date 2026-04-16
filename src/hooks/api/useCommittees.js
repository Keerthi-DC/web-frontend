import { useEffect, useState } from "react";
import { graphqlRequest } from "../../services/graphql"; // adjust path

      const mockData = {
        title: "Committees",
        sections: [
          {
            title: "Autonomous Committees",
            committees: [
              {
                title: "Finance Committee",
                type: "simple",
                members: [
                  "Dr. H.B. Aravind",
                  "Prof. Y. Vrushabhendrappa",
                  "Governing Body Nominee",
                  "Dr.G P Desai",
                  "Dr. C P Anila Kumar",
                  "Dr. Sujith Kumar S H (MBA)",
                  "Dr. Leela G H",
                  "Dr. T N Vijaya Kumar",
                  "Sri. T C Rajashekar",
                  "Sri. Arun kumar K C",
                  "Sri. Prashanth B"
                ]
              },
              {
                title: "Budget Approval Committee",
                type: "simple",
                members: ["Finance Committee Members"]
              },
              {
                title: "Purchase Committee",
                type: "simple",
                members: [
                  "Finance Committee Members",
                  "Concerned HOD",
                  "Dr. Basavana Gowda S N"
                ]
              },
              {
                title: "Consultancy Co-ordinators",
                type: "simple",
                members: [
                  "Dr. S Suresh",
                  "Dr. R S Chikkanagoudar"
                ]
              }
            ]
          },
          {
            title: "Dean : Academics",
            committees: [
              {
                title: "Main",
                type: "simple",
                members: [
                  "Dr. Dinesh Y N",
                  "Dr. Pradeep N",
                  "Dr. Chidananda G"
                ]
              },
              {
                title: "IQAC",
                type: "simple",
                members: [
                  "Dr. C P Anilakumar",
                  "Dr. Chidananda G",
                  "Dr. Nirmala S O",
                  "Dr. S R Basavarajappa",
                  "Dr. Gururaj T",
                  "Dr. Arun Kumar G H",
                  "Dr. A B Vinayaka Patil",
                  "Dr. G Y Vishwanath (MBA)",
                  "DQAC of all departments"
                ]
              }
            ]
          },
          {
            title: "Examination Cell/CoE",
            committees: [
              {
                title: "Main",
                type: "simple",
                members: [
                  "Dr. Kumarappa S",
                  "Dr. Anjaneya L H",
                  "Dr. Kiran Kumar G H",
                  "Dr. Basavana Gowda S N",
                  "Dr. Patil N S",
                  "Sri. Vijay K S (MBA)"
                ]
              }
            ]
          },
          {
            title: "IQAC",
            committees: [
              {
                title: "Main",
                type: "simple",
                members: [
                  "Dr. C P Anila Kumar",
                  "Dr. Chidananda G"
                ]
              },
              {
                title: "Strategic Planning / IDP Committee",
                type: "simple",
                members: [
                  "Dr. Sujith Kumar S H (MBA)",
                  "Dr. K M Prakash",
                  "Dr. Nirmala S O"
                ]
              },
              {
                title: "Staff Selection and Promotion Committee",
                type: "simple",
                members: [
                  "Sri. Siddesh A S",
                  "Dr. Ashok K",
                  "Dr. Sreenivas B R",
                  "Concerned HOD"
                ]
              },
              {
                title: "DQAC Coordinators",
                type: "simple",
                members: ["All Department Level"]
              },
              {
                title: "Audit and Feedback Analysis Committee",
                type: "simple",
                members: ["IQAC members"]
              }
            ]
          },
          {
            title: "Dean : Training Placement and Career Advancement",
            committees: [
              {
                title: "Main",
                type: "simple",
                members: ["Dr. Nirmala C R"]
              },
              {
                title: "Training and Placement Committee",
                type: "simple",
                members: [
                  "Dr. Nirmala C R & Department Coordinators"
                ]
              },
              {
                title: "Career Advancement Cell",
                type: "detailed",
                headers: ["Role", "Name"],
                rows: [
                  ["NPTEL - SPOC", "Dr. Bhuvaneshwari K V"],
                  ["VTU Online Course Coordinator", "Dr. Santhosh K C"],
                  ["BE Honors Coordinator", "Sri. Punith S P"],
                  ["Minors Degree Coordinators", "Sri. Punith B H"],
                  ["ABC Committee", "Department Coordinators"]
                ]
              },
              {
                title: "EDC",
                type: "simple",
                members: [
                  "Dr. Banumathi K L",
                  "Sri. Santhosh T",
                  "Dr. Prakash S Alalageri (MBA)",
                  "Dr. Y C Mohan (MBA)",
                  "Department Coordinators"
                ]
              },
              {
                title: "Internship Training Committee",
                type: "simple",
                members: [
                  "Dr. Gangadharappa S",
                  "Dr. Geetha M (MCA)",
                  "Dr. Chaitra K S (MBA)",
                  "Department Coordinators"
                ]
              },
              {
                title: "Skill Development Cell",
                type: "simple",
                members: [
                  "Dr. G Manavendra",
                  "Dr. Sharan A S",
                  "Dr. N S Manjunath",
                  "Department Coordinators"
                ]
              }
            ]
          },
          {
            title: "Dean: Admission",
            committees: [
              {
                title: "Main",
                type: "simple",
                members: ["Dr. Leela G H"]
              },
              {
                title: "Admission Committee",
                type: "simple",
                members: [
                  "Dr. Leela G H",
                  "Dr. Avinash K G",
                  "Dr. Shruthi Kantharaj (MBA)",
                  "Department Coordinators"
                ]
              },
              {
                title: "Student Induction Program Committee",
                type: "simple",
                members: ["Dr. N S Basavarajappa and Team"]
              }
            ]
          },
          {
            title: "Dean: Student Welfare",
            committees: [
              {
                title: "Main",
                type: "simple",
                members: [
                  "Dr. Vinutha H P",
                  "Smt. Bhagya S",
                  "Dr. Shivakumaraswamy G M",
                  "Sri Satish D Raikar (MBA)",
                  "Advisors/Conveners/Coordinators (Rotation)"
                ]
              },
              {
                title: "Anti-Ragging Committee",
                type: "simple",
                members: [
                  "Dr. Ashwini M Rao",
                  "Dr. T N Vijay Kumar and team"
                ]
              },
              {
                title: "Grievance Redressal Committee",
                type: "simple",
                members: ["Prof. M E Ashtalatha and team"]
              },
              {
                title: "CICC",
                type: "simple",
                members: ["Smt. Geetha V K and team"]
              },
              {
                title: "SC/ST Cell",
                type: "simple",
                members: ["Smt. Vaudeva Nayaka B L and team"]
              },
              {
                title: "Hostel Wardens",
                type: "simple",
                members: [
                  "Dr. Manavendra G and team",
                  "Dr. Chandrashekhar S M and team",
                  "Dr. Anitha G and team"
                ]
              },
              {
                title: "Cultural Committee",
                type: "simple",
                members: [
                  "Dr. Chandrashekhar S M",
                  "Sri. Vinay M T",
                  "Sri. Sreenidhi Kulkarni",
                  "Sri. Chandrashekhar M V",
                  "Department Coordinators"
                ]
              }
            ]
          },
          {
            title: "Dean: Infrastructure Planning and Maintenance",
            committees: [
              {
                title: "Main",
                type: "simple",
                members: [
                  "Dr. S B Mallikarjun",
                  "Dr. S Suresh",
                  "Sri. R S Chikkanagoudar"
                ]
              },
              {
                title: "Resident Engineer",
                type: "simple",
                members: ["Sri. Ravi Kumar"]
              },
              {
                title: "Maintenance Department",
                type: "simple",
                members: ["Sri. M C Patel"]
              },
              {
                title: "Security Cell",
                type: "simple",
                members: ["Sri. Nagaraj H (Office)"]
              },
              {
                title: "Canteen",
                type: "simple",
                members: [
                  "Dr. S Suresh",
                  "Sri. R S Chikkanagoudar"
                ]
              },
              {
                title: "Library",
                type: "simple",
                members: ["Dr. K V Manjunath and Team"]
              }
            ]
          }
        ]
      };
const useCommittees = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `
    query GetCommittees {
      getCommittees {
        title
        sections {
          title
          committees {
            title
            type
            members
          }
        }
      }
    }
  `;

  const fetchCommittees = async () => {
    try {
      const res = await graphqlRequest(query);

      if (res?.data?.getCommittees) {
        setData(res.data.getCommittees);
      } else {
        setData(mockData); // fallback
      }
    } catch (err) {
      setError(err);
      setData(mockData); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommittees();
  }, []);

  return { data, loading, error, refetch: fetchCommittees };
};

export default useCommittees;