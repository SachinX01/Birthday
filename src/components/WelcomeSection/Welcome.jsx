import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import birthdayData from "../../data/birthdayData";
import FloatingHearts from "../../components/Common/FloatingHearts";

function Welcome({ nextStep }) {
  const [showName, setShowName] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowName(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setShowLine1(true);
    }, 2000);

    const timer3 = setTimeout(() => {
      setShowLine2(true);
    }, 3000);

    const timer4 = setTimeout(() => {
      setShowButton(true);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex justify-center items-center px-6">
      <FloatingHearts />
      <div className="text-center">

        {/* Heart Animation */}

        <motion.h1
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-6xl mb-4"
        >
          ❤️
        </motion.h1>

        {/* Happy Birthday */}

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-pink-600 mb-5"
        >
          Happy Birthday
        </motion.h1>

        {/* Name */}

        {showName && (
          // <motion.h2
          //   initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   className="text-2xl font-semibold text-gray-700 mb-5"
          // >
          //   {birthdayData.name}
          // </motion.h2>
          <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.8 }}
           className="font-babyday m-2 text-2xl sm:text-3xl text-[#4B1426]"
        >
           {birthdayData.name}
          </motion.h2>
        )}

        {/* Line 1 */}

        {showLine1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-gray-500 mb-4"
          >
            Today is your special day.
          </motion.p>
        )}

        {/* Line 2 */}

        {showLine2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg text-gray-500">
              I spent some time creating
            </p>

            <p className="text-lg text-gray-500 mb-2">
              this little surprise just for you.
            </p>

            <p className="text-lg text-gray-500 mb-8">
              I hope it brings a smile to your face.
            </p>
          </motion.div>
        )}

        {/* Button */}

        {showButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="
            bg-pink-500
            text-white
            px-5
            py-1
            rounded-full
            shadow-lg
            text-lg
            "
          >
            Open Your Birthday Surprise
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default Welcome;