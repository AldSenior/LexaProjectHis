import { motion } from "framer-motion";

const PersonCard = ({ person, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="bg-[#F4A261]/95 rounded-lg p-5 max-w-sm w-full min-h-[26rem] flex flex-col mx-auto border border-[#8C5523] shadow-md"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <img
        src={person.image}
        alt={person.name}
        className="rounded-md mb-4 w-full h-72 object-cover bg-[#A0522D]/20"
      />
      <h3 className="text-xl font-semibold text-[#2F2F2F] font-['Cinzel'] tracking-tight line-clamp-2 mb-2">
        {person.name}
      </h3>
      <p className="text-[#2F2F2F] font-['Roboto'] text-sm leading-relaxed flex-1 mb-3">
        {person.description}
      </p>
      <p className="text-[#8C5523] font-['Roboto'] text-xs">
        Дата рождения: {person.birthDate}
      </p>
      <p className="text-[#8C5523] font-['Roboto'] text-xs">
        Дата смерти: {person.deathDate || "н/д"}
      </p>
    </motion.div>
  );
};

export default PersonCard;
