"use client";

import { personalities } from "./personalities";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PersonCard = dynamic(() => import("../components/PersonCard"), {
  ssr: false,
});

const titleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const PersonalityPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#2F2F2F] to-[#A0522D]">
        <div className="text-center text-[#D4A017] text-lg font-['Cinzel']">
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F2F2F] to-[#A0522D] text-white p-4 sm:p-6 md:p-8">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D4A017] text-center font-['Cinzel'] mb-6"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Личности войны в Афганистане
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {personalities.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default PersonalityPage;
