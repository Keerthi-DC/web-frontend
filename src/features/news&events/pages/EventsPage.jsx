import React from "react";
import useEvents from "../hooks/useEvents";
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import BietLoader from "../../../components/ui/BietLoader";


const EventsPage = () => {
  const { events, loading, error } = useEvents();

  if (loading) return <BietLoader />;
  if (error) console.error(error);
  if (!events.length) return null;

  return (
    <PageContainer>
      <SectionTitle>All Events</SectionTitle>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {events.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-lg shadow-md overflow-hidden
              transform transition-all duration-300
              hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image with zoom animation */}
              <div className="overflow-hidden">
                <img
                  src={e.image}
                  alt={e.title}
                  className="h-56 w-full object-cover
                  transition-transform duration-500
                  hover:scale-110"
                />
              </div>

              <div className="p-4">

                <h3 className="text-xl font-bold mb-1">
                  {e.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {e.time} | {e.venue}
                </p>

                <p className="text-gray-700">
                  {e.detail}
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>
    </PageContainer>
  );
};

export default EventsPage;
