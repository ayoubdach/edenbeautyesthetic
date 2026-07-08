import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Typewriter({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [display, setDisplay] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [started, text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {display}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        className="inline-block w-[2px] h-[1em] bg-eden-rose ml-1 align-middle"
      />
    </span>
  );
}
