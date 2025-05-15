"use client";
import { useState } from "react";

export default function EventFilterClient({ onFilter }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilter({ date, category });
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="date"
          className="border border-[#8C5523] rounded-lg px-3 py-2 bg-[#F4A261]/50 text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="border border-[#8C5523] rounded-lg px-3 py-2 bg-[#F4A261]/50 text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Все категории</option>
          <option value="Военное">Военные</option>
          <option value="Политическое">Политические</option>
          <option value="Социальное">Социальные</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-[#8C5523] text-white rounded-lg px-4 py-2 hover:bg-[#A0522D] transition-colors"
        >
          Применить фильтры
        </button>
      </div>
    </div>
  );
}
