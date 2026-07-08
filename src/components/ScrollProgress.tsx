import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #e91e8c, #ff6b9d, #c77dff, #7b1fa2)',
        boxShadow: '0 0 10px rgba(233, 30, 140, 0.5)',
      }}
    />
  );
}
