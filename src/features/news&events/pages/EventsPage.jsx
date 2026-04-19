import React from "react";
import useEvents from "../hooks/useEvents";
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import BietLoader from "../../../components/ui/BietLoader";
import ScrollReveal from "../../../components/ui/ScrollReveal";
import GlowingCard from "../../../components/ui/GlowingCard";
import { theme } from "../../../components/ui/theme";

const EventsPage = () => {
  const { events, loading, error } = useEvents();

  if (loading) return <BietLoader />;
  if (error) console.error(error);
  if (!events.length) return null;

  return (
    <PageContainer>
      <SectionTitle>All Events</SectionTitle>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <ScrollReveal direction="up" staggerChildren staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {events.map((e) => (
            <ScrollReveal key={e.id} direction="up" delay={0}>
              <GlowingCard padding="p-0">
                <div className="flex flex-col h-full bg-white/60 backdrop-blur-md rounded-[1.4rem] overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={e.image} 
                      alt={e.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
                      <span className={`text-xs font-black ${theme.colors.primaryText}`}>{e.date}</span>
                    </div>
                  </div>

                  <div className={`flex flex-col flex-grow p-6 border-t-4 ${theme.borders.accentMedium}`}>
                    <h4 className={`text-xl font-bold mb-4 ${theme.colors.primaryText} leading-snug`}>
                      {e.title}
                    </h4>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {e.time}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {e.venue}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm flex-grow mb-6 leading-relaxed">
                      {e.detail}
                    </p>
                    
                    <button className={`text-xs font-bold uppercase tracking-widest ${theme.colors.primaryText} group-hover:${theme.colors.accentHoverText} flex items-center gap-2 mt-auto transition-colors`}>
                      Register Now →
                    </button>
                  </div>
                </div>
              </GlowingCard>
            </ScrollReveal>
          ))}

        </ScrollReveal>
      </div>
    </PageContainer>
  );
};

export default EventsPage;
