"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalities } from "../personalities/personalities";
import { events } from "../events";

// Варианты анимаций
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.2, transition: { duration: 0.6, ease: "easeOut" } },
};

const featuredEvent = events[0];

export default function HomeClient() {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    import("framer-motion")
      .then((mod) => {
        if (!mod.motion || typeof mod.motion !== "function") {
          setError("Не удалось загрузить библиотеку анимаций");
        }
      })
      .catch((err) => {
        console.error("Framer-motion import failed:", err);
        setError("Не удалось загрузить библиотеку анимаций");
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2F2F2F] to-[#A0522D] text-white text-center pt-20">
        Ошибка: {error}
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2F2F2F] to-[#A0522D] text-white text-center pt-20">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F2F2F] to-[#A0522D] text-white font-['Roboto'] pb-6">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4 sm:px-6 pt-20">
        <motion.div
          className="absolute inset-0 z-0"
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/fonlexa.jpg"
            alt="Фон войны в Афганистане"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
        </motion.div>
        <motion.div
          className="relative max-w-5xl mx-auto z-10"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Cinzel'] font-bold text-[#D4A017] mb-4">
            Война в Афганистане (1979–1989)
          </h1>
          <p className="text-base sm:text-lg text-[#E8D9B8] max-w-3xl mx-auto mb-6 leading-relaxed">
            Исследуйте ключевые события, личности и последствия советской
            интервенции в Афганистане, изменившей региональную и мировую
            историю.
          </p>
        </motion.div>
      </section>

      {/* Featured Event */}
      <section id="events" className="max-w-5xl mx-auto my-10 px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-[#D4A017] mb-6 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Ключевое событие
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#E8D9B8]/95 rounded-lg p-6 border border-[#8C5523] shadow-sm"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative h-48 rounded-md overflow-hidden">
            <Image
              src={featuredEvent.image || "/afganis.jpg"}
              alt={featuredEvent.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-['Cinzel'] font-semibold text-[#2F2F2F] mb-2">
              {featuredEvent.title}
            </h3>
            <p className="text-xs text-[#8C5523] font-['Roboto'] mb-2">
              {featuredEvent.date}
            </p>
            <p className="text-sm text-[#4A3C31] font-['Roboto'] mb-4">
              {featuredEvent.description}
            </p>
            <Link
              href="/events"
              className="inline-flex px-4 py-2 bg-[#8C5523] text-white font-['Roboto'] font-medium rounded-md hover:bg-[#A0522D] transition-colors duration-200"
              aria-label="Посмотреть все события войны"
            >
              Все события
            </Link>
          </div>
        </motion.div>
      </section>

      <section id="mapsec" className="max-w-5xl mx-auto my-10 px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-[#D4A017] mb-6 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Интерактивная карта
        </motion.h2>
        <motion.div
          className="relative h-48 sm:h-64 bg-[url('/kartalexa.jpg')] bg-cover bg-center rounded-lg shadow-sm"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[#2F2F2F]/50 flex items-center justify-center">
            <Link
              href="/map"
              className="inline-flex px-4 py-2 bg-[#D4A017] text-[#2F2F2F] font-['Roboto'] font-medium rounded-md hover:bg-[#E8D9B8] transition-colors duration-200"
              aria-label="Исследовать интерактивную карту"
            >
              Исследовать карту
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Personalities Preview */}
      <section id="figures" className="max-w-5xl mx-auto my-10 px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-[#D4A017] mb-6 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Личности
        </motion.h2>
        <motion.p
          className="text-base text-[#E8D9B8] max-w-3xl mx-auto mb-6 text-center font-['Roboto'] leading-relaxed"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Познакомьтесь с ключевыми фигурами, определившими ход войны в
          Афганистане.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalities.slice(0, 3).map((person) => (
            <motion.div
              key={person.id}
              className="bg-[#E8D9B8]/95 rounded-lg p-4 border border-[#8C5523] shadow-sm w-full max-w-sm"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full overflow-hidden border border-[#8C5523]">
                <Image
                  src={person.image}
                  alt={person.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <h3 className="text-base font-['Cinzel'] font-semibold text-[#2F2F2F] text-center mb-1">
                {person.name}
              </h3>
              <p className="text-xs text-[#4A3C31] font-['Roboto'] text-center mb-2">
                {person.birthDate} - {person.deathDate || "н/д"}
              </p>
              <p className="text-xs text-[#4A3C31] font-['Roboto'] text-center">
                {person.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            href="/personalities"
            className="inline-flex px-4 py-2 bg-[#8C5523] text-white font-['Roboto'] font-medium rounded-md hover:bg-[#A0522D] transition-colors duration-200"
            aria-label="Посмотреть всех личностей войны"
          >
            Все личности
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
