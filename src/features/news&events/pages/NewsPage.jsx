import React from "react";
import useNews from "../hooks/useNews";
import PageContainer from "../../../components/ui/PageContainer";
import SectionTitle from "../../../components/ui/SectionTitle";
import BietLoader from "../../../components/ui/BietLoader";
import ScrollReveal from "../../../components/ui/ScrollReveal";
import GlowingCard from "../../../components/ui/GlowingCard";
import { theme } from "../../../components/ui/theme";

const News = () => {
  const { news, loading, error } = useNews();

  if (loading) return <BietLoader />;
  if (error) console.error(error);
  if (!news.length) return null;

  const truncate = (text, len = 120) =>
    text.length > len ? text.substring(0, len) + "…" : text;

  return (
    <PageContainer>
      <SectionTitle>News</SectionTitle>
      
      <div className="container mx-auto px-4 py-8">
        <ScrollReveal direction="up" staggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((n) => (
            <ScrollReveal key={n.id} direction="up" delay={0}>
              <GlowingCard padding="p-0">
                <div className="flex flex-col h-full bg-white/60 backdrop-blur-md rounded-[1.4rem] overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={n.image} 
                      alt={n.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                    <p className={`absolute bottom-3 left-4 ${theme.colors.accentText} text-xs font-bold uppercase tracking-widest`}>
                      {n.date}
                    </p>
                  </div>

                  <div className={`flex flex-col flex-grow p-6 border-t-4 ${theme.borders.accentMedium}`}>
                    <h4 className={`text-xl font-bold mb-3 ${theme.colors.primaryText} leading-snug`}>
                      {n.title}
                    </h4>
                    <p className="text-gray-600 text-sm flex-grow mb-6 leading-relaxed">
                      {truncate(n.details)}
                    </p>
                    
                    <button className={`text-xs font-bold uppercase tracking-widest ${theme.colors.primaryText} group-hover:${theme.colors.accentHoverText} flex items-center gap-2 mt-auto transition-colors`}>
                      Read Article →
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

export default News;
