import { motion } from "framer-motion";

import pink from "../../assets/floating-balloons/pink-balloon.png";
import black from "../../assets/floating-balloons/black-balloon.png";
import purple from "../../assets/floating-balloons/purple-balloon.png";
import gold from "../../assets/floating-balloons/gold-balloon.png";
import red from "../../assets/floating-balloons/red-balloon.png";


const balloonImages = [
  pink,
  red,
  purple,
  black,
  gold,
];

function FloatingBalloons() {
  const balloons = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {balloons.map((_, index) => {
        const image =
          balloonImages[index % balloonImages.length];

        const startX = Math.random() * window.innerWidth;

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
                y: "120vh",
                x: startX,
                opacity: 0.9,
            }}
            animate={{
              y: "-20vh",
              x: [
                startX,
                startX + 15,
                startX - 10,
                startX + 25,
                startX,
              ],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            <img
              src={image}
              alt="floating balloon"
              className="w-20 md:w-24"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default FloatingBalloons;