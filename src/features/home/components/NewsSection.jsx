import { theme } from "../../../components/ui/theme";
import React from "react";
import useNews from "../../news&events/hooks/useNews";
import BietLoader from "../../../components/ui/BietLoader";
import ScrollReveal from "../../../components/ui/ScrollReveal";


const NewsSection = () => {
  const { news, loading, error } = useNews();

  if (loading) return <BietLoader />;
  if (error) console.error(error);
  if (!news.length) return null;

  const featured = news[0];
  const others = news.slice(1, 4);

  return (
    <section className="py-24 px-12 md:px-24 bg-white">

      {/* HEADER */}
      <ScrollReveal direction="up" className="flex justify-between items-end mb-16">
        <div>
          <h2 className={`text-4xl font-bold ${theme.colors.primaryText} mb-4`}>
            News Updates
          </h2>
          <div className={`w-20 h-1 ${theme.colors.accentBg}`}></div>
        </div>

        <a
          href="/news"
          className={theme.buttons.outline}
        >
          View All →
        </a>
      </ScrollReveal>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* FEATURED */}
        <ScrollReveal direction="left" delay={0.2} className="lg:col-span-2">
          <div className="relative rounded-[2rem] overflow-hidden group h-[500px]">

            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute bottom-0 p-10 text-white">
              <span className={`${theme.colors.accentBg} text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded mb-4 inline-block`}>
                Breaking
              </span>

              <h3 className="text-3xl font-bold mb-4 leading-tight">
                {featured.title}
              </h3>

              <p className="text-white/80 italic mb-6 line-clamp-2">
                {featured.details}
              </p>

              <button className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                Read Article →
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* SIDE NEWS */}
        <ScrollReveal direction="right" delay={0.3} staggerChildren staggerDelay={0.15} className="space-y-8">
          {others.map((n, index) => (
            <ScrollReveal key={index} direction="up" delay={0}>
              <div className="flex gap-6 group cursor-pointer">
              <img
                src={n.image}
                alt={n.title}
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
              />

              <div>
                <p className={`${theme.colors.accentText} text-[10px] font-bold uppercase mb-1`}>
                  {n.date}
                </p>

                <h4 className={`font-bold ${theme.colors.primaryText} leading-snug group-${theme.colors.accentHoverText} transition-colors`}>
                  {n.title}
                </h4>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </ScrollReveal>

      </div>
    </section>
  );
};

export default NewsSection;