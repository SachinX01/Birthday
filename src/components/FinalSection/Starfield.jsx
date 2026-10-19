import { motion } from "framer-motion";

const stars = [
  { top: "8%", left: "12%", size: "text-2xl", delay: 0 },
  { top: "18%", left: "82%", size: "text-lg", delay: 1.4 },
  { top: "30%", left: "7%", size: "text-xl", delay: 2.2 },
  { top: "42%", left: "91%", size: "text-2xl", delay: 0.8 },
  { top: "56%", left: "15%", size: "text-lg", delay: 1.8 },
  { top: "68%", left: "86%", size: "text-xl", delay: 2.8 },
  { top: "80%", left: "9%", size: "text-2xl", delay: 1.1 },
  { top: "88%", left: "75%", size: "text-lg", delay: 2.5 },
];

function Starfield() {
  return (
    <>
      {stars.map((star, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className={`fixed ${star.size} text-[#d6ad68] pointer-events-none select-none z-20`}
          style={{ top: star.top, left: star.left }}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }}
          transition={{
            duration: 2.8,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.span>
      ))}
    </>
  );
}

export default Starfield;
