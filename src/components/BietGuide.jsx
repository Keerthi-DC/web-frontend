import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "./BietGuide.css";

const routeMessages = {
  "/": "Hey! Welcome to BIET 👋",
  "/placements": "Check out placements 🚀",
  "/research": "Explore research 🔬",
  default: "Ask me anything!",
};

const BietGuide = () => {
  const navigator = useRef(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: -60, y: -60 }); // start at bottom right
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(routeMessages["/"]);
  const animControls = useAnimation();
  const location = useLocation();

  /*  Route‑based message update  */
  useEffect(() => {
    setCurrentMsg(routeMessages[location.pathname] ?? routeMessages.default);
    /* Auto‑close bubble when route changes */
    setBubbleOpen(false);
  }, [location.pathname]);

  /*  Idle animation (float + wave)  */
  useEffect(() => {
    const seq = async () => {
      while (true) {
        await animControls.start({
          y: [-5, 5, -5],
          rotate: [0, 10, -10, 0],
          transition: { duration: 3.5, ease: "easeInOut" },
        });
      }
    };
    seq();
  }, [animControls]);

  /* Drag handlers */
  const onMouseDown = (e) => {
    e.preventDefault();
    const rect = navigator.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPos({ x: newX, y: newY });
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  /* Bubble toggle */
  const toggleBubble = () => setBubbleOpen((o) => !o);

  return (
    <motion.div
      ref={navigator}
      className="biet-guide"
      animate={animControls}
      onMouseDown={onMouseDown}
      onClick={toggleBubble}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      <img src="/assets/BIET_GUIDE_BYTE.png" alt="BIET Guide" />
      {bubbleOpen && (
        <motion.div
          className="chat-bubble"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {currentMsg}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BietGuide;
