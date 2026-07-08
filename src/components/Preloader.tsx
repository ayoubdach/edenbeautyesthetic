import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Butterfly from './Butterfly';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setExit(true), 400);
          setTimeout(onComplete, 900);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-eden-dark flex flex-col items-center justify-center"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-eden-dark via-[#1a0a2e] to-eden-dark" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-eden-pink/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-eden-purple/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center"
          >
            <Butterfly size={80} color="#e91e8c" delay={0} />
            <h1 className="font-script text-5xl sm:text-6xl gradient-text mt-4">Eden Beauty</h1>
            <p className="text-eden-rose/50 text-xs tracking-[0.4em] uppercase mt-2">Ongles & Coiffure</p>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-eden-pink to-eden-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.p
            className="relative z-10 mt-3 text-white/30 text-xs font-mono"
            animate={{ opacity: progress >= 100 ? 0 : 1 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
