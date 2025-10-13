"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdGTranslate } from "react-icons/md";
import { GiNigeria } from "react-icons/gi";
import { FaBackward } from "react-icons/fa6";
import HeaderButton from "@/components/button/header-button";
import Footer from "@/components/footer";

// Typing animation component
const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-gray-800 dark:text-gray-100 font-medium text-base md:text-lg text-center mt-3"
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.9, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.p>
  );
};

export default function Page() {
  const [language, setLanguage] = useState<"en" | "ha">("en");

  const content = {
    en: {
      title: "About Project – Gani",
      description: `
Gani is a Hausa-first, AI-powered voice assistant designed to connect millions of Hausa speakers 
to the global digital ecosystem. While tools like Siri, Alexa, and Google Assistant excel in 
languages such as English, French, or Spanish, Hausa — one of Africa’s most widely spoken 
languages — has long been left behind.

With Gani, users can:
• Speak naturally in Hausa and receive fluent responses.
• Access translations, meanings, and daily information (e.g., news, weather, motivation).
• Experience digital technology in a culturally relevant and spiritually uplifting way.

Beyond voice interaction, Gani is built to foster inclusivity, empower digital literacy, 
and spark innovation within the Hausa-speaking community. The vision is to extend this 
initiative to other African languages, building a continent where technology feels familiar, 
not foreign.

At its heart, Gani is a movement — blending culture, AI, and accessibility into one simple idea:
“Technology should speak your language.”
      `,
      ayomide: `
I'm Ayomide — a mathematician and web developer passionate about using 
AI and education to transform lives. My focus is on creating purpose-driven systems 
that merge technology, culture, and destiny discovery. I lead youth mentorship programs, 
teach science and mathematics, and build creative software solutions that inspire hope and growth.
      `,
      ayanfe: `
I'm Odule Ayanfeoluwa — a backend engineer, DSA enthusiast, and lover of technology. 
I enjoy building robust systems that bring ideas to life and solving complex engineering problems. 
I’ve worked on several impactful software engineering projects and I’m passionate about innovation, 
collaboration, and crafting digital experiences that matter.
      `,
    },
    ha: {
      title: "Game da Aikin – Gani",
      description: `
Gani mataimaki ne na murya mai hankali da aka ƙirƙira da Hausa domin haɗa masu amfani da harshen 
Hausa da duniyar fasaha ta zamani. Duk da cewa Siri, Alexa da Google Assistant suna aiki da ƙarfi 
a harsunan Turanci, Faransanci, da Sifaniyanci — Hausa, ɗaya daga cikin manyan harsunan Afirka, 
ba ta sami isasshen wakilci ba.

Tare da Gani, mai amfani zai iya:
• Yin magana da Hausa cikin sauƙi kuma ya samu amsa a Hausa.
• Neman fassara, ma’anoni, da bayanai kamar labarai, yanayin iska, da kuma kalmomin karfafa gwiwa.
• Jin daɗin amfani da fasaha cikin harshen da ke da alaƙa da al’adarsa da ruhinsa.

Gani yana nufin kawo haɗin kai tsakanin al’adu da fasaha — da kuma haɓaka ilimin dijital 
ga al’ummar Hausa. Manufar ita ce fadada wannan manhaja zuwa wasu harsunan Afirka domin 
kowa ya ji fasaha tamkar nasa ce.

A takaice, Gani motsi ne — haɗin kai tsakanin al’ada, AI, da damar kowa:
“Fasaha ta kamata ta yi magana da harshenka.”
      `,
      ayomide: `
Ni ne Ayomide — masanin lissafi kuma mai haɓaka yanar gizo mai sha’awar 
haɗa AI da ilimi domin kawo sauyi a rayuwar mutane. Aikina yana mayar da hankali 
kan ƙirƙirar tsarin da ke haɗa fasaha, al’adu da gano manufar rayuwa. Ina koyar da 
dalibai, ina jagorantar matasa, kuma ina ƙirƙirar mafita masu amfani da fasaha domin 
ba da fata da ci gaba.
      `,
      ayanfe: `
Ni ne Odule Ayanfeoluwa — injiniya na bangaren baya (backend), mai son DSA, kuma mai sha’awar fasaha. 
Ina son gina tsarin da ke kawo tunani cikin gaskiya da kuma warware matsalolin injiniya masu sarkakiya. 
Na yi aiki a kan ayyukan software da dama masu tasiri kuma ina son haɗin gwiwa da ƙirƙirar abubuwan 
da ke kawo canji ta hanyar fasaha.
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
          {/* Header */}
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
              {language === "en" ? <GiNigeria size={18} /> : <MdGTranslate size={18} />}
              {language === "en" ? "Hausa" : "English"}
            </motion.button>
          </motion.div>

          {/* Ayomide Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center gap-6 mb-8"
          >
            <motion.img
              src="/ayomide.jpg"
              alt="Ayomide"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.3 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <div className="flex flex-col items-center md:items-start">
              <TypingText
                text={
                  language === "en"
                    ? "Hi, I’m Ayomide — Mathematician, Web Developer, and Purpose Architect."
                    : "Sannu, ni ne Ayomide — Masanin Lissafi, Mai haɓaka Yanar Gizo, kuma Mai tsara Manufa."
                }
              />
            </div>
          </motion.div>

          {/* Ayomide About */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
              {language === "en" ? "About Me" : "Game da Ni"}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm md:text-lg whitespace-pre-line">
              {content[language].ayomide}
            </p>
          </motion.div>

          {/* Ayanfe Section */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-6 mt-10 mb-8"
          >
            <motion.img
              src="/ayomide.jpg"
              alt="Odule Ayanfeoluwa"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.5 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />
            <div className="flex flex-col items-center md:items-start">
              <TypingText
                text={
                  language === "en"
                    ? "I’m Odule Ayanfeoluwa — Backend Engineer, DSA Enthusiast, and Tech Visionary."
                    : "Ni ne Odule Ayanfeoluwa — Injinia na Bangaren Baya, Masoyin DSA, kuma Mai hangen nesa a Fasaha."
                }
              />
            </div>
          </motion.div>

          {/* Ayanfe About */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
              {language === "en" ? "About Ayanfeoluwa" : "Game da Ayanfeoluwa"}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm md:text-lg whitespace-pre-line">
              {content[language].ayanfe}
            </p>
          </motion.div>

          {/* Project Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="mt-10"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                {language === "en" ? "About the Project" : "Game da Aikin"}
              </h2>
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed text-sm md:text-lg font-mono">
                {content[language].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <Footer />
    </>
  );
}
