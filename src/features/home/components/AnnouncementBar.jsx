import { theme } from "../../../components/ui/theme";
import React, { useEffect, useState } from "react";

const AnnouncementBar = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/data/announcements.json")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  if (!messages.length) return null;

  return (
    <div className={`w-full ${theme.colors.primaryBg} text-white py-3 overflow-hidden relative`}>

      {/* Gradient fade (left & right) */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#001c40] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#001c40] to-transparent z-10"></div>

      {/* Scrolling Content */}
      <div className="flex whitespace-nowrap animate-scroll">

        {[...messages, ...messages].map((msg, index) => (
          <span
            key={index}
            className="mx-12 text-sm font-medium tracking-wide"
          >
            {msg.text}
          </span>
        ))}

      </div>
    </div>
  );
};

export default AnnouncementBar;