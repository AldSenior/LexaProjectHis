import { motion } from "framer-motion";

export default function EventCard({ event }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="bg-[#E8D9B8]/90 rounded-lg p-4 max-w-sm w-full min-h-[16rem] flex flex-col border border-[#8C5523] shadow-sm"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
    >
      <h2 className="text-lg font-semibold text-[#2F2F2F] font-['Cinzel'] tracking-tight line-clamp-2 mb-2">
        {event.title}
      </h2>
      <p className="text-[#8C5523] font-['Roboto'] text-xs mb-2">
        {event.date}
      </p>
      <p className="text-[#4A3C31] font-['Roboto'] text-sm leading-relaxed flex-1">
        {event.description}
      </p>
    </motion.div>
  );
}
