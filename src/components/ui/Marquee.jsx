import { motion } from "framer-motion";

const Marquee = () => {
  const items = [
    "DESIGN GRÁFICO",
    "✶",
    "ILUSTRAÇÃO",
    "✶",
    "IDENTIDADE VISUAL",
    "✶",
  ];

  const marqueeContent = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-paper border-y border-ink/10 py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }} // Ajuste o -1000 dependendo da largura do conteúdo real
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // Quanto maior, mais lento
        }}
      >
        {marqueeContent.map((item, index) => (
          <span
            key={index}
            className="text-4xl md:text-6xl font-display font-medium text-ink px-4 uppercase tracking-tighter"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;