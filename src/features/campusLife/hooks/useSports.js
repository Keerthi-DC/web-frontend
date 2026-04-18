

const mockData = {
  title: "Sports",
  reports: [
    { title: "Sports 2023-24", pdf: "/pdfs/s1.pdf" },
    { title: "Sports 2022-23", pdf: "/pdfs/s2.pdf" }
  ]
};

const useSports = () => {
  return {
    data: mockData,
    loading: false,
    error: null,
    refetch: () => {},
    isEmpty: !mockData,
  };
};

export default useSports;