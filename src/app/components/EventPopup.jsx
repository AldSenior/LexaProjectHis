"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useActionState } from "react";
import { urezpers } from "../events";

export default function EventPopup({ isVisible, onSubmit, onCancel }) {
  const [state, handleSubmit, isPending] = useActionState(
    async (_prevState, formData) => {
      const title = formData.get("title")?.toString() || "";
      if (!title.trim()) {
        return { error: "Название события не может быть пустым." };
      }
      const newEventData = {
        title,
        date: formData.get("date")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        category: formData.get("category")?.toString() || "",
        personalities: formData.getAll("personalities"),
      };
      onSubmit(newEventData);
      return { error: null };
    },
    { error: null },
  );

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-[#2F2F2F]/60 flex items-center justify-center p-4 z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onCancel}
    >
      <motion.div
        className="bg-[#F4A261]/90 backdrop-blur-md border border-[#8C5523] p-5 sm:p-6 rounded-xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-[#2F2F2F] mb-4 text-center font-['Cinzel']">
          Новое событие
        </h2>
        {state.error && (
          <p className="text-red-500 text-sm mb-2">{state.error}</p>
        )}
        <form action={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            name="title"
            placeholder="Название события*"
            className="p-2 sm:p-3 border border-[#8C5523] rounded-lg bg-white/70 text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#D4A017] placeholder-[#8C5523]"
            required
          />
          <input
            type="text"
            name="date"
            placeholder="Дата (например, Декабрь 1979)"
            className="p-2 sm:p-3 border border-[#8C5523] rounded-lg bg-white/70 text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#D4A017] placeholder-[#8C5523]"
          />
          <textarea
            name="description"
            placeholder="Описание"
            className="p-2 sm:p-3 border border-[#8C5523] rounded-lg bg-white/70 text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#D4A017] h-20 sm:h-24 placeholder-[#8C5523]"
          />
          <input
            type="text"
            name="category"
            placeholder="Категория"
            className="p-2 sm:p-3 border border-[#8C5523] rounded-lg bg-white/70 text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#D4A017] placeholder-[#8C5523]"
          />
          <div className="flex flex-col gap-1 sm:gap-2 max-h-28 sm:max-h-32 overflow-y-auto border border-[#8C5523] p-2 rounded-md bg-white/50">
            <p className="text-sm font-semibold text-[#2F2F2F] mb-1">
              Персоны:
            </p>
            {urezpers.map((person) => (
              <label
                key={person.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-[#F4A261]/50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  name="personalities"
                  value={person.id}
                  className="w-4 h-4 text-[#D4A017] focus:ring-[#D4A017] border-[#8C5523] rounded"
                />
                <span className="text-xs sm:text-sm text-[#2F2F2F]">
                  {person.name}
                </span>
              </label>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
            <motion.button
              type="submit"
              disabled={isPending}
              className="flex-1 p-2 sm:p-3 bg-[#D4A017] text-[#2F2F2F] rounded-lg font-semibold hover:bg-[#F4A261] transition-shadow shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Сохранить
            </motion.button>
            <motion.button
              type="button"
              onClick={onCancel}
              className="flex-1 p-2 sm:p-3 bg-[#8C5523] text-white rounded-lg font-semibold hover:bg-[#A0522D] transition-shadow shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Отмена
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
