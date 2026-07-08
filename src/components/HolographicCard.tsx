import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HolographicCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGradientPos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Holographic sheen */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
            : 'none',
        }}
      />
      {/* Rainbow border glow */}
      <div
        className="absolute inset-0 rounded-inherit opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: isHovered
            ? `linear-gradient(${gradientPos.x * 3.6}deg, rgba(233,30,140,0.3), rgba(199,125,255,0.3), rgba(123,31,162,0.3), rgba(255,107,157,0.3))`
            : 'none',
          mixBlendMode: 'screen',
        }}
      />
      {children}
    </motion.div>
  );
}
