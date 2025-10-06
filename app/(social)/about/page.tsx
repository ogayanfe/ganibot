"use client";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { MdGTranslate } from "react-icons/md";
import { GiNigeria } from "react-icons/gi";
import { FaBackward } from "react-icons/fa6";
import HeaderButton from "@/components/button/header-button";

export default function Page() {
  const [language, setLanguage] = useState<"en" | "ha">("en");

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      window.scrollBy({ top: 1, behavior: "smooth" });
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        clearInterval(scrollInterval); // stop at the bottom
      }
    }, 3000); // adjust speed (lower is slower)

    return () => clearInterval(scrollInterval);
  }, []);

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
      <div className="min-h-screen py-16">
        <div className="w-full max-w-4xl mx-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <HeaderButton title="Home" icon={<FaBackward size={22}/>} href="/"></HeaderButton>
            <h1 className="font-bold text-[.7rem] md:text-2xl dark:text-gray-300 text-gray-700 font-mono">{content[language].title}</h1>
            <button
              type="button"
              title="Change Language"
              onClick={() => setLanguage(language === "en" ? "ha" : "en")}
              className="flex items-center gap-2 bg-blue-500 dark:bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-mono"
            >
              {language === "en" ? <GiNigeria /> : <MdGTranslate />}
              {language === "en" ? "Hausa" : "English"}
            </button>
          </div>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed text-[.7rem] md:text-2xl dark:text-gray-300 font-mono">
            {content[language].description}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
