import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickLinksPreview.css";

const images = [
  "https://picsum.photos/seed/activities/600/400",
  "https://picsum.photos/seed/achievements/600/400",
  "https://picsum.photos/seed/newsletter/600/400",
];

const CARD_DATA = [
  { title: "Activities", route: "activities", seed: images[0] },
  { title: "Achievements", route: "achievements", seed: images[1] },
  { title: "Newsletter", route: "newsletter", seed: images[2] },
];

export default function QuickLinksPreview({ shortName }) {
  const navigate = useNavigate();

  const go = (path) => () =>
    navigate(`/departments/${shortName}/${path}`);

  return (
    <div className="bg-gray-500 py-16 m-16 rounded-lg">
      <div className="text-3xl font-bold mb-12 flex items-center gap-3">
        <div className="w-1 h-6 bg-blue-600 m-4" />
        <h2>Quick links</h2>
      </div>

      <section className="quicklinks-container">
        {CARD_DATA.map((c) => (
          <div
            key={c.route}
            className="quicklinks-card"
            onClick={go(c.route)}
          >
            <div
              className="quicklinks-bg"
              style={{ backgroundImage: `url(${c.seed})` }}
            />
            <div className="quicklinks-overlay" />
            <div className="quicklinks-title">
              {c.title}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}