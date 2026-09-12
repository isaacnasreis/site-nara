import { motion } from "framer-motion";

const Marquee = () => {
  const items = ["ilustradora", "✶", "designer editorial", "✶"];

  return (
    <div className="relative w-full overflow-hidden bg-paper py-4">
      <motion.div
        className="flex whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 65,
        }}
      >
        <div className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <span
              key={`block-1-${index}`}
              className="text-4xl sm:text-6xl md:text-8xl font-display font-medium text-ink px-4 tracking-tighter"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex shrink-0 items-center" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={`block-2-${index}`}
              className="text-4xl sm:text-6xl md:text-8xl font-display font-medium text-ink px-4 tracking-tighter"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
