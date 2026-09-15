import { motion } from "framer-motion";
import ilustracao4 from "../../assets/ilustracoes/bolhas/1.png";

const Marquee = () => {
  const imgSrc =
    typeof ilustracao4 === "object" && ilustracao4?.src
      ? ilustracao4.src
      : ilustracao4;

  const items = [
    { type: "text", value: "Ilustradora" },
    { type: "image", value: imgSrc },
    { type: "text", value: "Designer editorial" },
    { type: "image", value: imgSrc },
    { type: "text", value: "Ilustradora" },
    { type: "image", value: imgSrc },
    { type: "text", value: "Designer editorial" },
    { type: "image", value: imgSrc },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-paper py-4 select-none">
      <motion.div
        className="flex whitespace-nowrap w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        <div className="flex shrink-0 items-center">
          {items.map((item, index) =>
            item.type === "text" ? (
              <span
                key={`block-1-${index}`}
                className="text-6xl sm:text-8xl md:text-10xl font-display font-medium text-ink px-4 tracking-tighter lowercase"
              >
                {item.value}
              </span>
            ) : (
              <img
                key={`block-1-${index}`}
                src={item.value}
                alt="Ilustração Nara Oliveira"
                className="h-10 sm:h-16 md:h-20 w-auto object-contain mx-3 sm:mx-6 md:mx-8 inline-block pointer-events-none"
              />
            ),
          )}
        </div>

        <div className="flex shrink-0 items-center" aria-hidden="true">
          {items.map((item, index) =>
            item.type === "text" ? (
              <span
                key={`block-2-${index}`}
                className="text-6xl sm:text-8xl md:text-10xl font-display font-medium text-ink px-4 tracking-tighter lowercase"
              >
                {item.value}
              </span>
            ) : (
              <img
                key={`block-2-${index}`}
                src={item.value}
                alt=""
                className="h-10 sm:h-16 md:h-20 w-auto object-contain mx-3 sm:mx-6 md:mx-8 inline-block pointer-events-none"
              />
            ),
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
