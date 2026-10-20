import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import teddy from "../../assets/teddy.webp";
import birthdayData from "../../data/birthdayData";

function LoveLetter() {
  const letterText = birthdayData.letterBody.join("\n\n");
  const [typedText, setTypedText] = useState("");
  const typedParagraphs = typedText.split("\n\n");
  const isTyping = typedText.length < letterText.length;
  const letterContentRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      index += 1;
      setTypedText(letterText.slice(0, index));

      if (index >= letterText.length) {
        clearInterval(typingInterval);
      }
    }, 28);

    return () => clearInterval(typingInterval);
  }, [letterText]);

  useEffect(() => {
    const letterContent = letterContentRef.current;

    if (letterContent && isTyping) {
      letterContent.scrollTo({
        top: letterContent.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [typedText, isTyping]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="
        relative

        bg-orange-200

        w-[92vw]
        max-w-sm

        sm:max-w-md

        md:w-[480px]
        md:max-w-none

        lg:w-[520px]
        xl:w-[550px]

        h-[60vh]
        sm:h-[62vh]
        md:h-[70vh]
        lg:h-[72vh]
        xl:h-[74vh]

        max-h-[720px]

        rounded-3xl
        shadow-xl

        p-4
        sm:p-5
        md:p-6

        flex
        flex-col
      "
    >
      {/* ======================================
          HEADING
      ====================================== */}

      <h1
        className="
          shrink-0

          text-lg
          sm:text-xl
          md:text-2xl
          lg:text-3xl

          font-bold

          text-pink-600
          text-center

          mb-3
          md:mb-4
        "
      >
        A Message From My Heart ❤️
      </h1>

      {/* ======================================
          SCROLLABLE LETTER
      ====================================== */}

      <div
        ref={letterContentRef}
        className="
          custom-scrollbar

          flex-1
          min-h-0

          overflow-y-auto

          px-1
          pr-2
          md:px-3

          pb-12
          md:pb-16

          text-gray-800

          text-base
          sm:text-lg
          md:text-xl

          leading-8
          md:leading-9

          text-center
          font-cursive
        "
      >
        <p>
          {birthdayData.letterGreeting}
          <br />
          <br />

          {typedParagraphs.map((paragraph, index) => (
            <span
              key={`${paragraph}-${index}`}
              className={`block whitespace-pre-line mb-6 last:mb-0 ${
                /[\u0900-\u097F]/.test(paragraph)
                  ? "font-marathi text-[0.96em] leading-9"
                  : ""
              }`}
            >
              {paragraph}
              {isTyping && index === typedParagraphs.length - 1 && (
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block animate-pulse"
                >
                  ▌
                </span>
              )}
            </span>
          ))}
          {!isTyping && (
            <>
              <span className="mt-6 block">
                With love,
                <br />
                <br />
                {birthdayData.senderName} ❤️
              </span>
            </>
          )}
        </p>
      </div>

      {/* ======================================
          TEDDY BEAR
      ====================================== */}

      <motion.img
        src={teddy}
        alt="Teddy Bear"
        animate={{
          y: [0, -5, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute

          bottom-3
          right-3

          w-8
          h-8

          sm:w-10
          sm:h-10

          md:w-14
          md:h-14

          lg:w-16
          lg:h-16

          object-contain

          pointer-events-none
          select-none
        "
      />
    </motion.div>
  );
}

export default LoveLetter;