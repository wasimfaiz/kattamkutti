import { motion } from "framer-motion";
import { useMemo } from "react";

const Confetti = ({ isActive }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      size: 8 + Math.random() * 8,
      color: [
        "hsl(180, 100%, 50%)", // cyan
        "hsl(320, 100%, 60%)", // pink
        "hsl(280, 100%, 65%)", // purple
        "hsl(50, 100%, 55%)",  // yellow
      ][Math.floor(Math.random() * 4)],
    }));
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}vw`, 
            y: -20,
            rotate: 0,
            opacity: 1 
          }}
          animate={{ 
            y: "110vh",
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: particle.duration,
            delay: particle.delay,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
