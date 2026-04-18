

const mockData = {
  title: "Gym",
  images: [
    "/images/gym1.jpg",
    "/images/gym2.jpg",
    "/images/gym3.jpg"
  ]
};

const useGym = () => {
  return {
    data: mockData,
    loading: false,
    error: null,
    refetch: () => {},
    isEmpty: !mockData,
  };
};

export default useGym;