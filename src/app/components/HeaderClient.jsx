"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Mountain from "../../../public/mountain-silhouette.svg";

export default function HeaderClient({ linkstit }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <header className="relative bg-gradient-to-r from-[#8C5523] to-[#2F2F2F] text-white py-6 md:py-8 shadow-2xl">
      {/* <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
        <Image
          src={Mountain}
          alt="Mountain Silhouette"
          width={120}
          height={120}
          className="animate-pulse"
        />
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative z-20 h-16 md:h-auto">
        <Link href="/">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-['Cinzel'] font-bold text-[#D4A017] text-center md:text-left"
          >
            Война в Афганистане 1979–1989
          </motion.h1>
        </Link>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden md:flex md:space-x-6 text-base font-['Roboto']"
        >
          {linkstit.map((item, i) => (
            <li key={i}>
              <Link href={item.link} className="relative group">
                <span className="relative z-10 text-white group-hover:text-[#D4A017] transition duration-300">
                  {item.title}
                </span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#D4A017] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </li>
          ))}
        </motion.ul>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-white hover:text-[#D4A017] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#D4A017] relative z-30"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-container"
            aria-label="Открыть главное меню"
          >
            <span className="sr-only">Открыть главное меню</span>
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu-container"
            className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-[#8C5523] to-[#2F2F2F] shadow-xl z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <ul className="flex flex-col items-stretch text-center space-y-1 py-3 font-['Roboto'] text-base">
              {linkstit.map((item, i) => (
                <li key={i} className="w-full">
                  <Link
                    href={item.link}
                    className="relative group block py-3 px-4 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10 text-white group-hover:text-[#D4A017] transition-colors duration-300">
                      {item.title}
                    </span>
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#D4A017] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
