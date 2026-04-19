import React, { useEffect } from 'react';
import useAudit from '../../../hooks/useAudit';
import useNotifications from '../hooks/useNotifications';
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import BietLoader from "../../../components/ui/BietLoader";
import ScrollReveal from "../../../components/ui/ScrollReveal";
import GlowingCard from "../../../components/ui/GlowingCard";
import { theme } from "../../../components/ui/theme";


const Notification = () => {
  const { notifications: events, loading, error } = useNotifications(); // make sure this returns a function!
  const audit = useAudit(); // make sure this returns a function!

  useEffect(() => {
    audit?.('[AUDIT] Component Mounted: Notification');
  }, []);

  if (loading) return <BietLoader />;
  if (error) {
    audit?.(`[AUDIT] Error in Notification: ${error}`);
  }

  return (
    <PageContainer>
      <SectionTitle>Notifications</SectionTitle>

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <ScrollReveal direction="up" staggerChildren staggerDelay={0.1} className="space-y-6">
          {events.map((e) => (
            <ScrollReveal key={e.id} direction="up" delay={0}>
              <GlowingCard padding="p-0">
                <div
                  className={`border-l-4 ${theme.borders.accentMedium} bg-white/60 backdrop-blur-md p-6 h-full transition-colors hover:bg-white/80`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className={`font-bold text-xl ${theme.colors.primaryText}`}>{e.title}</h2>
                    <span className="material-symbols-outlined text-gray-400">notifications_active</span>
                  </div>

                  <div className={`flex items-center mt-2 text-xs font-bold uppercase tracking-widest ${theme.colors.accentText} space-x-3`}>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {e.date}</span>
                    {e.time && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> {e.time}</span>}
                    {e.venue && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> {e.venue}</span>}
                  </div>

                  <p className="text-gray-700 mt-4 leading-relaxed">{e.description}</p>
                </div>
              </GlowingCard>
            </ScrollReveal>
          ))}
        </ScrollReveal>
      </div>
    </PageContainer>
  );
};

export default Notification;
