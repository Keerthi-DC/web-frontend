import { useEffect, useState } from "react";

// ✅ Proper fallback with content
const mockData = {
  sidebar: [
    { id: "boys-hostel", title: "BOYS HOSTEL" },
    { id: "ladies-hostel", title: "LADIES HOSTEL" },
    { id: "canteen", title: "CANTEEN / CAFETERIA" }
  ],

  content: {
    "boys-hostel": {
      title: "Boys Hostel",
      sections: [
        {
          type: "paragraph",
          text: "Comfortable hostel facilities for boys with all amenities."
        }
      ]
    },

    "ladies-hostel": {
      title: "Ladies Hostel",
      sections: [
        {
          type: "paragraph",
          text: "Safe and secure hostel for female students."
        }
      ]
    },

    "canteen": {
      title: "Canteen",
      sections: [
        {
          type: "paragraph",
          text: "Cafeteria serving hygienic and affordable food."
        }
      ]
    }
  }
};

const useFacilities = () => {
  const [data, setData] = useState(mockData);
  const [activeId, setActiveId] = useState(mockData.sidebar[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return {
    data,
    activeId,
    setActiveId,
    loading,
    error,
    refetch: () => {}
  };
};

export default useFacilities;