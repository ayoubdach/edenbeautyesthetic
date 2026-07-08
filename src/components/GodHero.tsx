import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function GodHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [portalOpen, setPortalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const timer = setTimeout(() => setPortalOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const portalX = (mousePos.x - 0.5) * 30;
  const portalY = (mousePos.y - 0.5) * 30;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep space background */}
      <div className="absolute inset-0 bg-[#050208]" />

      {/* Animated nebula layers */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 80% 60% at ${50 + portalX * 0.3}% ${40 + portalY * 0.3}%, rgba(233,30,140,0.15) 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 60% 80% at ${60 - portalX * 0.2}% ${50 - portalY * 0.2}%, rgba(123,31,162,0.12) 0%, transparent 50%)`,
          }}
        />
      </motion.div>

      {/* The Portal - Central magical opening */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={portalOpen ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(233,30,140,0.1), rgba(199,125,255,0.1), rgba(123,31,162,0.1), transparent)',
            transform: `translate(${portalX}px, ${portalY}px)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Rotating rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: 0 }}
            animate={portalOpen ? {
              scale: 1,
              rotate: 360,
            } : {}}
            transition={{
              scale: { duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] },
              rotate: { duration: 20 + i * 10, repeat: Infinity, ease: 'linear' },
            }}
            className="absolute rounded-full border border-white/5"
            style={{
              width: `${300 + i * 120}px`,
              height: `${300 + i * 120}px`,
              transform: `translate(${portalX * (1 - i * 0.2)}px, ${portalY * (1 - i * 0.2)}px)`,
            }}
          >
            {/* Orbiting dot */}
            <div
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i === 0 ? '#e91e8c' : i === 1 ? '#c77dff' : '#ff6b9d',
                boxShadow: `0 0 10px ${i === 0 ? '#e91e8c' : i === 1 ? '#c77dff' : '#ff6b9d'}`,
                top: '0',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </motion.div>
        ))}

        {/* Central glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={portalOpen ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(233,30,140,0.2) 0%, rgba(123,31,162,0.1) 40%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Top sparkle line */}
        <motion.div
          initial={{ width: 0 }}
          animate={portalOpen ? { width: '100%' } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-eden-rose/50 to-transparent mx-auto mb-12 max-w-xs"
        />

        {/* Eden Beauty - massive title */}
        <div className="relative mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={portalOpen ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] leading-none"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #ff6b9d 40%, #e91e8c 70%, #7b1fa2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(233,30,140,0.3))',
            }}
          >
            Eden
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={portalOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none -mt-4 sm:-mt-8"
            style={{
              background: 'linear-gradient(180deg, #ff6b9d 0%, #e91e8c 50%, #7b1fa2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Beauty
          </motion.h1>
        </div>

        {/* Tagline with typewriter feel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={portalOpen ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-eden-rose/50" />
          <Sparkles size={14} className="text-eden-rose/70" />
          <span className="text-eden-rose/80 tracking-[0.6em] uppercase text-[10px] sm:text-xs font-medium">
            Ongles & Coiffure
          </span>
          <Sparkles size={14} className="text-eden-rose/70" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-eden-rose/50" />
        </motion.div>

        {/* The Hook - emotional copy */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={portalOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-white/50 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Où la magie opère
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={portalOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-white/25 text-sm max-w-md mx-auto mb-12"
        >
          Manar City, 3ème étage · 10h - 21h
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={portalOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="group relative px-10 py-5 rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #e91e8c, #7b1fa2)',
              boxShadow: '0 0 40px rgba(233,30,140,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2 text-white font-medium text-sm tracking-wide">
              <Sparkles size={16} />
              Réserver ma séance
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-eden-purple to-eden-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a
            href="#services"
            className="px-10 py-5 rounded-full border border-white/10 text-white/50 font-medium text-sm tracking-wide hover:bg-white/5 hover:border-white/20 transition-all"
          >
            Découvrir nos soins
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={portalOpen ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#services" className="flex flex-col items-center gap-3 text-white/20 hover:text-white/40 transition-colors">
          <span className="text-[9px] tracking-[0.5em] uppercase">Entrer</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
