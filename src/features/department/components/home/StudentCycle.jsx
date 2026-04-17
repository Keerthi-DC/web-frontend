  import React from "react";
  import { motion } from "framer-motion";

  const stages = [
    { icon: "🎓" },
    { icon: "📚" },
    { icon: "🎉" },
    { icon: "🛠️" },
  ];

  const calcX = (i) => i * 80;

  const StudentCycle = () => {
    const positions = stages.map((_, i) => calcX(i)).concat([calcX(stages.length)]);

    return (
      <div style={{ position: "relative", width: "400px", margin: "0 auto" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "2px",
            background: "#E5E7EB",
            zIndex: 0,
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "40px",
            height: "40px",
            marginTop: "-20px",
            zIndex: 1,
          }}
          animate={{ x: positions }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "#3B82F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              fontSize: "1.5rem",
            }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            👨‍🎓
          </motion.div>
        </motion.div>

        {stages.map((s, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: "70%",
              left: `${calcX(i)}px`,
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 3, ease: "easeOut" }}
          >
            <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
          </motion.div>
        ))}
      </div>
    );
  };

  export default StudentCycle;
