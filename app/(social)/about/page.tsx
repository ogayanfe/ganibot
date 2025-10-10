"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdGTranslate } from "react-icons/md";
import { GiNigeria } from "react-icons/gi";
import { FaBackward } from "react-icons/fa6";

import HeaderButton from "@/components/button/header-button";
import Footer from "@/components/footer";

export default function Page() {
  const [language, setLanguage] = useState<"en" | "ha">("en");

  // Smooth auto-scroll effect
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      window.scrollBy({ top: 2, behavior: "smooth" });
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (reachedBottom) clearInterval(scrollInterval);
    }, 70);

    return () => clearInterval(scrollInterval);
  }, [language]);

  const content = {
    en: {
      title: "About Project – Gani",
      description: `
Gani is a Hausa-first voice assistant designed to bridge the gap between 
millions of Hausa speakers and the digital world. While global voice 
technologies (like Siri, Alexa, Google Assistant) thrive in English and 
other international languages, Hausa — spoken by over 50 million people — 
remains underrepresented.

With Gani, users can:
• Speak in Hausa and get instant responses in Hausa.
• Ask for translations, definitions, weather updates, and basic information.
• Enjoy an inclusive and culturally relevant digital experience.

The project’s mission is to make technology accessible in local languages, 
starting with Hausa, and later expanding to other African languages.
At its core, Gani is not just a tool — it is a bridge between culture and technology.
      `,
    },
    ha: {
      title: "Game da Aikin – Gani",
      description: `
Gani mataimaki ne na murya wanda aka gina da Hausa domin rage tazara 
tsakanin miliyoyin masu amfani da Hausa da duniyar fasaha. Duk da yake 
Siri, Alexa, da Google Assistant suna da karfi a Turanci da wasu harsuna, 
Hausa — wanda fiye da mutum miliyan 50 ke amfani da shi — ba ta samu isasshen wakilci ba.

Tare da Gani, mai amfani zai iya:
• Yin magana da Hausa kuma ya samu amsa a Hausa.
• Neman fassara, ma’anoni, yanayin iska, da sauran bayanai.
• Jin dadin amfani da fasaha cikin harshen da ya dace da al’adu.

Manufar aikin ita ce kawo fasaha cikin harsunan gida, 
fara da Hausa sannan a fadada zuwa wasu harsunan Afirka.
A asali, Gani ba kawai kayan aiki ba ne — gada ce tsakanin al’adu da fasaha.
      `,
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="min-h-screen flex flex-col justify-center items-center transition-colors duration-300 py-12 px-4"
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl mx-auto backdrop-blur-md p-6 md:p-10 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center items-center mb-8"
          >
            <HeaderButton
              title=""
              icon={<FaBackward size={20} />}
              href="/"
              className="bg-blue-500 hover:bg-blue-600 transition"
            />
            <h1 className="font-semibold text-lg md:text-2xl text-center flex-1">
              {content[language].title}
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              title="Change Language"
              onClick={() => setLanguage(language === "en" ? "ha" : "en")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm md:text-base"
            >
              {language === "en" ? (
                <GiNigeria size={18} />
              ) : (
                <MdGTranslate size={18} />
              )}
              {language === "en" ? "Hausa" : "English"}
            </motion.button>
          </motion.div>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed text-sm md:text-lg font-mono"
            >
              {content[language].description}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <Footer />
    </>
  );
}
