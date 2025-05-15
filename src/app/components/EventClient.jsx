"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function EventsClient({ events }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl w-full">
      {events.map((event) => (
        <motion.div
          key={event.id}
          className="h-full"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </div>
  );
}
