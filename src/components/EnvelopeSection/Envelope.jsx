import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import LoveLetter from "./LoveLetter";

import closeEnvelope from "../../assets/close-envelop.webp";
import openEnvelope from "../../assets/open-envelop.webp";

function Envelope({ nextStep }) {
  const [quizAnswer, setQuizAnswer] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizError, setQuizError] = useState("");
  const [opening, setOpening] = useState(false);
  const [showOpenEnvelope, setShowOpenEnvelope] =
    useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const pianoRef = useRef(null);
  const openTimerRef = useRef(null);
  const letterTimerRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const checkQuizAnswer = (event) => {
    event.preventDefault();

    const normalizedAnswer = quizAnswer
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    if (normalizedAnswer === "miniseashore") {
      setQuizPassed(true);
      setShowQuiz(false);
      setQuizError("");
      return;
    }

    setQuizError("Not quite… think about our college days again 😄");
  };

  // ==========================================
  // START SOFT PIANO
  // ==========================================

  const startPiano = () => {
    // Prevent creating another audio instance
    if (pianoRef.current) return;

    const piano = new Audio(
      "/music/soft-piano-envelope.mp3"
    );

    piano.loop = true;

    // Keep it soft
    piano.volume = 0.15;

    pianoRef.current = piano;

    piano.play().catch((error) => {
      console.log(
        "Envelope piano could not play:",
        error
      );
    });
  };

  // ==========================================
  // OPEN ENVELOPE
  // ==========================================

  const handleEnvelopeClick = () => {
    // Prevent multiple clicks
    if (opening) return;

    if (!quizPassed) {
      setShowQuiz(true);
      return;
    }

    setOpening(true);

    // Start piano from user interaction
    startPiano();

    // Show open envelope
    openTimerRef.current = setTimeout(() => {
      setShowOpenEnvelope(true);
    }, 300);

    // Letter comes out after envelope opens
    letterTimerRef.current = setTimeout(() => {
      setShowLetter(true);
    }, 900);
  };

  // ==========================================
  // FADE MUSIC + GO NEXT
  // ==========================================

  const handleNextStep = () => {
    const piano = pianoRef.current;

    // If audio never started, just continue
    if (!piano) {
      nextStep();
      return;
    }

    // Prevent multiple fade intervals
    if (fadeIntervalRef.current) return;

    const fadeDuration = 1200;
    const intervalTime = 50;

    const steps = fadeDuration / intervalTime;

    const startingVolume = piano.volume;
    const volumeStep = startingVolume / steps;

    fadeIntervalRef.current = setInterval(() => {
      const newVolume =
        piano.volume - volumeStep;

      if (newVolume > 0.01) {
        piano.volume = Math.max(
          0,
          Math.min(1, newVolume)
        );
      } else {
        clearInterval(fadeIntervalRef.current);

        fadeIntervalRef.current = null;

        piano.volume = 0;
        piano.pause();
        piano.currentTime = 0;

        pianoRef.current = null;

        nextStep();
      }
    }, intervalTime);
  };

  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      // Clear envelope timer
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }

      // Clear letter timer
      if (letterTimerRef.current) {
        clearTimeout(letterTimerRef.current);
      }

      // Clear music fade interval
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      // Stop piano if component unmounts
      if (pianoRef.current) {
        pianoRef.current.pause();
        pianoRef.current.currentTime = 0;
        pianoRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="
        relative
        min-h-[100dvh]
        w-full

        flex
        items-center
        justify-center

        px-4
        sm:px-5

        py-6

        text-center

        overflow-y-auto
      "
    >
      {/* ======================================
          BEFORE LETTER OPENS
      ====================================== */}

      {!showLetter && showQuiz && !quizPassed && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          onSubmit={checkQuizAnswer}
          className="
            absolute
            z-20
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-full
            max-w-md
            rounded-3xl
            border
            border-[#b58b52]/40
            bg-[#162438]/90
            p-6
            shadow-xl
          "
        >
          <p className="mb-3 text-3xl">🤔</p>
          <h1 className="mb-3 text-2xl font-semibold text-pink-600">
            Letter dekhna hai toh pehle iska jawab do 😌
          </h1>
          <p className="mb-5 text-base leading-7 text-gray-600">
            Where did we spend half of our college life?
          </p>
          <p className="mb-4 text-sm italic text-pink-400">
            Hint: It starts with M…
          </p>
          <input
            value={quizAnswer}
            onChange={(event) => {
              setQuizAnswer(event.target.value);
              setQuizError("");
            }}
            placeholder="Type your answer..."
            aria-label="Quiz answer"
            autoComplete="off"
            className="
              mb-3
              w-full
              rounded-full
              border
              border-[#b58b52]/50
              bg-[#0d1726]
              px-5
              py-3
              text-center
              text-white
              outline-none
              placeholder:text-gray-500
              focus:border-[#d6ad68]
            "
          />
          {quizError && (
            <p className="mb-3 text-sm text-pink-400">{quizError}</p>
          )}
          <button
            type="submit"
            className="
              rounded-full
              bg-pink-500
              px-6
              py-2
              font-semibold
              text-white
            "
          >
            Unlock the Letter 💌
          </button>
          <button
            type="button"
            onClick={() => setShowQuiz(false)}
            className="
              mt-3
              block
              w-full
              text-sm
              text-gray-500
              underline
              underline-offset-4
            "
          >
            Maybe later
          </button>
        </motion.form>
      )}

      {!showLetter && (
        <div
          className="
            relative
            z-10

            w-full

            flex
            flex-col
            items-center
            justify-center
          "
        >
          {/* ====================================
              HEADING
          ==================================== */}

          <motion.h1
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl

              font-romantic
              text-pink-600

              leading-tight

              mb-7
            "
          >
            A Message From My Heart ❤️
          </motion.h1>

          {/* ====================================
              ENVELOPE AREA
          ==================================== */}

          <div
            className="
              relative

              flex
              justify-center
              items-center

              w-full

              h-[220px]
              sm:h-[250px]
              md:h-[270px]
            "
          >
            <AnimatePresence mode="wait">

              {/* ==================================
                  CLOSED ENVELOPE
              ================================== */}

              {!showOpenEnvelope ? (
                <motion.img
                  key="closed-envelope"

                  src={closeEnvelope}

                  alt="Closed Envelope"

                  initial={{
                    opacity: 0,
                    scale: 0.85,
                    y: 20,
                  }}

                  animate={
                    opening
                      ? {
                          opacity: 0,
                          scale: 0.9,
                          y: 8,
                        }
                      : {
                          opacity: 1,
                          scale: 1,

                          y: [
                            0,
                            -7,
                            0,
                          ],
                        }
                  }

                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}

                  transition={
                    opening
                      ? {
                          duration: 0.3,
                        }
                      : {
                          opacity: {
                            duration: 0.5,
                          },

                          scale: {
                            duration: 0.5,
                          },

                          y: {
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                  }

                  whileHover={
                    opening
                      ? {}
                      : {
                          scale: 1.04,
                        }
                  }

                  whileTap={
                    opening
                      ? {}
                      : {
                          scale: 0.96,
                        }
                  }

                  onClick={handleEnvelopeClick}

                  className={`
                    w-56
                    sm:w-64
                    md:w-72

                    object-contain

                    select-none

                    ${
                      opening
                        ? "cursor-default"
                        : "cursor-pointer"
                    }
                  `}
                />
              ) : (

                /* ==================================
                    OPEN ENVELOPE
                ================================== */

                <motion.img
                  key="open-envelope"

                  src={openEnvelope}

                  alt="Open Envelope"

                  initial={{
                    opacity: 0,
                    scale: 0.85,
                    y: 10,
                  }}

                  animate={{
                    opacity: 1,

                    scale: [
                      0.85,
                      1.05,
                      1,
                    ],

                    y: 0,
                  }}

                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                  }}

                  className="
                    w-56
                    sm:w-64
                    md:w-72

                    object-contain

                    pointer-events-none
                    select-none
                  "
                />
              )}
            </AnimatePresence>
          </div>

          {/* ====================================
              TAP MESSAGE
          ==================================== */}

          <AnimatePresence>
            {!opening && (
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                }}
                className="
                  mt-1

                  text-sm
                  sm:text-base

                  font-cursive
                  italic

                  text-pink-400
                "
              >
                tap the envelope to open 💌
              </motion.p>
            )}
          </AnimatePresence>

          {/* ====================================
              OPENING MESSAGE
          ==================================== */}

          <AnimatePresence>
            {opening && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  mt-1

                  text-sm
                  sm:text-base

                  font-cursive
                  italic

                  text-pink-400
                "
              >
                a little message for you... ❤️
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ======================================
          LETTER REVEAL
      ====================================== */}

      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              relative

              w-full

              flex
              flex-col
              justify-center
              items-center

              gap-3

              z-10
            "
          >
            {/* ====================================
                ENVELOPE + LETTER
            ==================================== */}

            <div
              className="
                relative

                w-full
                max-w-[380px]

                flex
                justify-center
                items-center
              "
            >
              {/* ==================================
                  OPEN ENVELOPE BEHIND
              ================================== */}

              <motion.img
                src={openEnvelope}

                alt="Open Envelope"

                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 0.5,
                }}

                className="
                  absolute

                  bottom-0
                  left-1/2
                  -translate-x-1/2

                  w-56
                  sm:w-64
                  md:w-72

                  object-contain

                  z-0

                  pointer-events-none
                  select-none
                "
              />

              {/* ==================================
                  LOVE LETTER
              ================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 170,
                  scale: 0.88,
                }}

                animate={{
                  opacity: 1,
                  y: -15,
                  scale: 1,
                }}

                transition={{
                  duration: 1,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}

                className="
                  relative
                  z-10
                "
              >
                <LoveLetter />
              </motion.div>
            </div>

            {/* ====================================
                ONE LAST SURPRISE BUTTON
            ==================================== */}

            <motion.button
              initial={{
                opacity: 0,
                y: 15,
                scale: 0.9,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              transition={{
                duration: 0.5,
                delay: 1,
              }}

              whileHover={{
                scale: 1.05,
              }}

              whileTap={{
                scale: 0.95,
              }}

              onClick={handleNextStep}

              className="
                relative
                z-20

                bg-pink-500
                hover:bg-pink-600

                text-white

                text-sm
                sm:text-base

                font-semibold

                px-6
                py-1.5

                rounded-full

                shadow-lg

                shrink-0

                transition-colors
                duration-300
              "
            >
              One Last Surprise →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Envelope;