import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Butterfly3D({ className = '', size = 100 }: { className?: string; size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`${className}`} style={{ perspective: 600 }}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: size,
          height: size,
        }}
        className="relative"
      >
        {/* Left wing */}
        <motion.div
          animate={{ rotateY: [0, 55, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            transformOrigin: 'right center',
            position: 'absolute',
            left: 0,
            top: '10%',
            width: '45%',
            height: '80%',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg viewBox="0 0 50 80" className="w-full h-full drop-shadow-[0_0_15px_rgba(233,30,140,0.5)]">
            <defs>
              <linearGradient id="wingL" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e91e8c" />
                <stop offset="50%" stopColor="#ff6b9d" />
                <stop offset="100%" stopColor="#c77dff" />
              </linearGradient>
            </defs>
            <path d="M48 5 Q5 15 2 35 Q0 55 15 60 Q35 65 48 40 Z" fill="url(#wingL)" opacity="0.9" />
            <path d="M48 40 Q30 55 20 70 Q15 80 25 78 Q40 75 48 55 Z" fill="url(#wingL)" opacity="0.7" />
            <circle cx="18" cy="30" r="3" fill="white" opacity="0.6" />
            <circle cx="12" cy="45" r="2" fill="white" opacity="0.4" />
            <circle cx="28" cy="65" r="2.5" fill="white" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Right wing */}
        <motion.div
          animate={{ rotateY: [0, -55, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            transformOrigin: 'left center',
            position: 'absolute',
            right: 0,
            top: '10%',
            width: '45%',
            height: '80%',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg viewBox="0 0 50 80" className="w-full h-full drop-shadow-[0_0_15px_rgba(233,30,140,0.5)]">
            <defs>
              <linearGradient id="wingR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e91e8c" />
                <stop offset="50%" stopColor="#ff6b9d" />
                <stop offset="100%" stopColor="#c77dff" />
              </linearGradient>
            </defs>
            <path d="M2 5 Q45 15 48 35 Q50 55 35 60 Q15 65 2 40 Z" fill="url(#wingR)" opacity="0.9" />
            <path d="M2 40 Q20 55 30 70 Q35 80 25 78 Q10 75 2 55 Z" fill="url(#wingR)" opacity="0.7" />
            <circle cx="32" cy="30" r="3" fill="white" opacity="0.6" />
            <circle cx="38" cy="45" r="2" fill="white" opacity="0.4" />
            <circle cx="22" cy="65" r="2.5" fill="white" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Body */}
        <div
          className="absolute left-1/2 top-[15%] -translate-x-1/2 w-[8%] h-[70%] rounded-full"
          style={{
            background: 'linear-gradient(180deg, #1a0a2e, #e91e8c, #1a0a2e)',
            boxShadow: '0 0 20px rgba(233,30,140,0.4)',
          }}
        />

        {/* Antennae */}
        <div className="absolute left-1/2 top-[5%] -translate-x-1/2">
          <div className="absolute w-[1px] h-6 bg-eden-pink/60 -rotate-[25deg] -left-1 origin-bottom" />
          <div className="absolute w-[1px] h-6 bg-eden-pink/60 rotate-[25deg] -right-1 origin-bottom" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-eden-pink -left-2 -top-1" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-eden-pink -right-2 -top-1" />
        </div>
      </motion.div>
    </div>
  );
}
