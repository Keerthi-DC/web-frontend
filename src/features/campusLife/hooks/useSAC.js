

const mockData = {
  title: "Student Academic Council",
  description: "Develops leadership and communication skills.",
  members: [
    { name: "Prof. Y Yuvashankarappa", role: "Director" },
    { name: "Dr. H B Aravind", role: "Principal" }
  ]
};

const useSAC = () => {
  return {
    data: mockData,
    loading: false,
    error: null,
    refetch: () => {},
    isEmpty: !mockData,
  };
};

export default useSAC;