import { motion } from "framer-motion";

import bouquet from "../../assets/bouquet.png";
import coupleLeft from "../../assets/couple-left.png";
import coupleRight from "../../assets/couple-right.png";

import Petals from "../Common/Petals";

function Bouquet({ nextStep }) {
  return (
    <div
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        flex
        justify-center
        items-center
        px-4
        text-center
      "
    >
      {/* Falling Petals */}
      <Petals />

      {/* =====================================
          LEFT COUPLE / TREE
      ===================================== */}

      <motion.img
        src={coupleLeft}
        alt=""
        initial={{
          opacity: 0,
          x: -50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.4,
          ease: "easeOut",
        }}
        className="
          absolute
          bottom-0
          left-0

          w-24
          sm:w-28
          md:w-36
          lg:w-40

          h-auto
          object-contain

          pointer-events-none
          select-none

          z-[2]
        "
      />

      {/* =====================================
          RIGHT COUPLE / TREE
      ===================================== */}

      <motion.img
        src={coupleRight}
        alt=""
        initial={{
          opacity: 0,
          x: 50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.6,
          ease: "easeOut",
        }}
        className="
          absolute
          bottom-0
          right-0

          w-24
          sm:w-28
          md:w-36
          lg:w-40

          h-auto
          object-contain

          pointer-events-none
          select-none

          z-[2]
        "
      />

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div
        className="
          relative
          z-10

          w-full
          h-full

          flex
          flex-col
          justify-center
          items-center

          py-3
        "
      >
        {/* Heading */}

        <motion.h1
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl

            font-romantic
            text-pink-600

            leading-tight

            mb-2
          "
        >
          A Bouquet For You ❤️
        </motion.h1>

        {/* =====================================
            BOUQUET
        ===================================== */}

        <motion.img
          src={bouquet}
          alt="Rose Bouquet"
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 30,
            rotate: -35,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: -25,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="
            w-44
            sm:w-52
            md:w-60
            lg:w-64

            max-h-[34vh]
            object-contain

            drop-shadow-xl

            mb-2
          "
        />

        {/* =====================================
            ROMANTIC MESSAGE
        ===================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.7,
          }}
          className="
            text-xl
            sm:text-2xl
            md:text-3xl

            font-romantic
            text-pink-600

            leading-snug

            mb-2
          "
        >
          Every flower reminds me
          <br />
          of your beautiful smile.
        </motion.p>

        {/* =====================================
            HEART DIVIDER
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 1,
          }}
          className="
            flex
            items-center
            gap-2

            text-pink-400

            mb-2
          "
        >
          <span className="w-7 h-px bg-pink-300" />

          <motion.span
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm"
          >
            ❤️
          </motion.span>

          <span className="w-7 h-px bg-pink-300" />
        </motion.div>

        {/* =====================================
            SECOND MESSAGE
        ===================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 1.2,
          }}
          className="
            text-sm
            sm:text-base

            text-gray-600

            leading-5
            sm:leading-6

            max-w-sm

            mb-4
          "
        >
          You deserve all the happiness,
          <br />
          love and smiles in this world.
        </motion.p>

        {/* =====================================
            CONTINUE BUTTON
        ===================================== */}

        <motion.button
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 1.5,
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={nextStep}
          className="
            bg-pink-500
            hover:bg-pink-600

            text-white
            text-sm

            px-5
            py-1.5

            rounded-full
            shadow-lg

            transition-colors
            duration-300
          "
        >
          Continue →
        </motion.button>
      </div>
    </div>
  );
}

export default Bouquet;