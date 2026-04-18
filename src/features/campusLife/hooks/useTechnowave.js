

const mockData = {
  title: "Technowave",
  items: [
    { title: "ECE Newsletter", pdf: "/pdfs/ece.pdf" }
  ]
};

const useTechnowave = () => {
  return {
    data: mockData,
    loading: false,
    error: null,
    refetch: () => {},
    isEmpty: !mockData,
  };
};

export default useTechnowave;