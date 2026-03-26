import React, { useEffect, useState } from "react";

const AnnouncementBar = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/data/announcements.json")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div className="bg-[#0a2a66] text-white py-2 overflow-hidden">
      <div className="ticker">
        {messages.map((msg, index) => (
          <span key={index} className="mx-10">
            {msg.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;