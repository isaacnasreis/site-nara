import { motion } from "framer-motion";

interface FloatingBubblesProps {
  bubbles?: string[];
}

interface BubbleConfig {
  id: number;
  type: number;
  size: number;
  position: {
    left?: string;
    right?: string;
    top: string;
  };
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
}

const BUBBLE_CONFIGS: BubbleConfig[] = [
  // Lateral Esquerda
  {
    id: 1,
    type: 0,
    size: 52,
    position: { left: "3%", top: "22%" },
    duration: 18,
    delay: 0,
    driftX: 14,
    driftY: 20,
    opacity: 0.65,
  },
  {
    id: 2,
    type: 1,
    size: 72,
    position: { left: "7%", top: "56%" },
    duration: 22,
    delay: 2,
    driftX: -12,
    driftY: -22,
    opacity: 0.55,
  },
  // Lateral Direita
  {
    id: 3,
    type: 0,
    size: 58,
    position: { right: "4%", top: "28%" },
    duration: 20,
    delay: 1.5,
    driftX: -15,
    driftY: 18,
    opacity: 0.6,
  },
  {
    id: 4,
    type: 1,
    size: 76,
    position: { right: "8%", top: "62%" },
    duration: 24,
    delay: 3,
    driftX: 12,
    driftY: -20,
    opacity: 0.5,
  },
];

export default function FloatingBubbles({
  bubbles = [],
}: FloatingBubblesProps) {
  if (!bubbles || bubbles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
    >
      {BUBBLE_CONFIGS.map((cfg) => {
        const bubbleSrc = bubbles[cfg.type % bubbles.length];
        return (
          <motion.div
            key={cfg.id}
            className="absolute select-none will-change-transform"
            style={{
              ...cfg.position,
              width: cfg.size,
              height: cfg.size,
              opacity: cfg.opacity,
            }}
            animate={{
              x: [0, cfg.driftX, cfg.driftX * -0.8, 0],
              y: [0, cfg.driftY * -1, cfg.driftY * 0.8, 0],
              rotate: [0, 7, -4, 0],
              scale: [1, 1.04, 0.95, 1],
            }}
            transition={{
              duration: cfg.duration,
              delay: cfg.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={bubbleSrc}
              alt=""
              className="w-full h-full object-contain mix-blend-multiply"
              loading="lazy"
              draggable={false}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
