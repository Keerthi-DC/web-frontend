

const mockData = {
  title: "Green Campus",
  description: "Eco-friendly initiatives",
  images: ["/images/g1.jpg", "/images/g2.jpg"]
};

const useGreenCampus = () => {
  return {
    data: mockData,
    loading: false,
    error: null,
    refetch: () => {},
    isEmpty: !mockData,
  };
};

export default useGreenCampus;