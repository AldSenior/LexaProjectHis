"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Image from "next/image";

// Стили для кастомных точек слайдера (можно вынести в CSS файл)
const CustomDotsStyles = `
  .custom-dots {
    bottom: -25px; /* Расположение точек */
  }
  .custom-dots li button:before {
    font-size: 10px; /* Размер точек */
    color: #D4A017; /* Цвет активной точки */
    opacity: 0.5;
  }
  .custom-dots li.slick-active button:before {
    opacity: 1;
  }
`;

function Modal({ isVisible, onClose, event }) {
  if (!isVisible || !event || !Array.isArray(event) || event.length === 0) {
    // Улучшена проверка event
    // console.log("Modal not rendered: isVisible:", isVisible, "event:", event);
    return null;
  }

  const modalVariants = {
    /* ... (без изменений) ... */
  };

  const settings = {
    dots: true,
    infinite: event.length > 1, // Бесконечная прокрутка только если слайдов больше одного
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: event.length > 1, // Стрелки только если слайдов больше одного
    dotsClass: "slick-dots custom-dots", // Используем кастомный класс
    adaptiveHeight: true, // Полезно, если высота слайдов разная
  };

  return (
    <>
      <style jsx global>
        {CustomDotsStyles}
      </style>{" "}
      {/* Инъекция стилей для точек */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[9999] p-4" // Добавлен p-4 для отступов на мобильных
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        onClick={onClose} // Закрытие по клику на фон
      >
        <div
          className="bg-white/85 backdrop-blur-md w-full max-w-xl lg:max-w-2xl p-4 sm:p-6 rounded-xl shadow-xl border border-orange-200/70 relative overflow-hidden" // Увеличена max-width, добавлены отступы
          onClick={(e) => e.stopPropagation()} // Предотвращение закрытия при клике на модальное окно
        >
          <motion.button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 bg-white/50 hover:bg-gray-200/70 p-1.5 sm:p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 z-10" // Улучшены стили кнопки
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Закрыть модальное окно"
          >
            {/* Иконка крестика */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>

          {/* Проверка, чтобы Slider не рендерился с пустым event */}
          {event && event.length > 0 ? (
            <Slider {...settings}>
              {event.map(
                (
                  e,
                  index, // Добавлен index для key, если id не всегда уникальны в контексте event
                ) => (
                  <div
                    key={e.id || index}
                    className="px-1 sm:px-2 outline-none"
                  >
                    {" "}
                    {/* outline-none для слайдов */}
                    <div className="max-h-[70vh] sm:max-h-[75vh] overflow-y-auto p-2 sm:p-4 custom-scrollbar">
                      {" "}
                      {/* Ограничение высоты и скролл для контента слайда */}
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 font-['Playfair_Display']">
                        {e.title}
                      </h2>
                      <span className="text-xs sm:text-sm uppercase tracking-wider text-orange-600 font-semibold">
                        {e.date}
                      </span>
                      <p className="mt-2 sm:mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                        {e.description}
                      </p>
                      {e.personalities?.length > 0 && (
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-orange-200/50">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                            Упомянутые личности:
                          </h4>
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {e.personalities.map((person) => (
                              <div
                                key={person.id}
                                className="flex items-center gap-1.5 sm:gap-2 bg-orange-50/50 p-1 sm:p-1.5 rounded-md border border-orange-200/70"
                              >
                                {person.image ? (
                                  <Image
                                    src={person.image}
                                    alt={person.name || "Фото персоны"}
                                    width={28} // Уменьшил для компактности
                                    height={28}
                                    className="rounded-full ring-1 ring-orange-300 object-cover"
                                  />
                                ) : (
                                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500 ring-1 ring-gray-300">
                                    ?
                                  </div>
                                )}
                                <span className="text-xs sm:text-sm text-gray-700">
                                  {person.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ),
              )}
            </Slider>
          ) : (
            <div className="text-center p-10 text-gray-600">
              Нет данных для отображения.
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Modal;
