import { theme } from "../../../components/ui/theme";
import React from "react";
import { Link } from "react-router-dom";
import useEvents from "../../news&events/hooks/useEvents";
import BietLoader from "../../../components/ui/BietLoader";
import ScrollReveal from "../../../components/ui/ScrollReveal";
import GlowingCard from "../../../components/ui/GlowingCard";


const EventSection = () => {
  const { events, loading, error } = useEvents();

  if (loading) return <BietLoader />;
  if (error) console.error(error);
  if (!events.length) return null;

  const displayed = events.slice(0, 3);

  return (
    <section className="py-24 px-12 md:px-24 bg-white">

      {/* HEADER */}
      <ScrollReveal direction="up" className="mb-12">
        <h2 className={`text-4xl font-bold ${theme.colors.primaryText}`}>
          Upcoming Events
        </h2>
      </ScrollReveal>

      {/* GRID */}
      <ScrollReveal direction="up" delay={0.2} staggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {displayed.map((e, index) => (
          <GlowingCard key={index} padding="p-0">
            <div
              className={`border-l-4 ${theme.borders.accentMedium} bg-[#f3f4f5]/80 backdrop-blur-sm p-8 h-full transition-colors hover:bg-white/40`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-black ${theme.colors.accentText}`}>
                  {e.date}
                </span>

                <span className="material-symbols-outlined text-gray-400">
                  event
                </span>
              </div>

              <h4 className={`text-lg font-bold ${theme.colors.primaryText} mb-2`}>
                {e.title}
              </h4>

              <p className="text-sm text-gray-500 mb-4">
                {e.venue || "Main Auditorium"} {e.time ? `, ${e.time}` : ""}
              </p>

              <button className={`text-xs font-bold ${theme.colors.primaryText} ${theme.colors.accentHoverText} flex items-center gap-1`}>
                Register Now →
              </button>
            </div>
          </GlowingCard>
        ))}

      </ScrollReveal>

      {/* VIEW MORE */}
      <ScrollReveal direction="fade" delay={0.4} className="mt-16 text-center">
        <Link
          to="/events"
          className={theme.buttons.outline}
        >
          View All Events →
        </Link>
      </ScrollReveal>

    </section>
  );
};

export default EventSection;