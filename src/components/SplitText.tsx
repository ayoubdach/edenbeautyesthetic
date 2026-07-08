import { motion } from 'framer-motion';

export default function SplitText({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={{ perspective: 500 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block mr-[0.25em]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
