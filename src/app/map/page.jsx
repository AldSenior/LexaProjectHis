"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MyMapComponent from "../components/MyMapClient";
import { events } from "../events";

const MapPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState(events);

  useEffect(() => {
    let filtered = events || [];
    if (selectedCategory !== "all") {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredMarkers(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-[#A0522D] text-white p-6 sm:p-10">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-[#D4A017] text-center font-['Cinzel'] mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      >
        Карта событий
      </motion.h1>

      <div className="w-full h-[600px] max-w-7xl mx-auto rounded-xl overflow-hidden shadow-2xl relative">
        <MyMapComponent events={filteredMarkers} />
      </div>
    </div>
  );
};

export default MapPage;
