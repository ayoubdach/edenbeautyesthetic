import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Butterfly, { ButterflyCanvas } from './Butterfly';
import MagneticButton from './MagneticButton';
import GlitchText from './GlitchText';
import Typewriter from './Typewriter';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleChars = 'Eden Beauty'.split('');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.15)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
      </motion.div>

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-eden-dark/70 via-eden-dark/50 to-eden-dark" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-eden-dark/40 via-transparent to-eden-dark/40" />

      {/* Animated mesh gradient blobs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #e91e8c, transparent)',
            top: '10%',
            left: '20%',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: 'transform 1s ease-out',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #7b1fa2, transparent)',
            bottom: '10%',
            right: '15%',
            transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`,
            transition: 'transform 1s ease-out',
          }}
        />
      </div>

      {/* Particle canvas */}
      <ButterflyCanvas />

      {/* Floating butterflies */}
      <div className="absolute top-[12%] left-[8%] z-[2] opacity-50">
        <Butterfly size={45} color="#ff6b9d" delay={0} />
      </div>
      <div className="absolute top-[22%] right-[12%] z-[2] opacity-40">
        <Butterfly size={35} color="#c77dff" delay={2} />
      </div>
      <div className="absolute bottom-[25%] left-[15%] z-[2] opacity-35">
        <Butterfly size={28} color="#e91e8c" delay={4} />
      </div>
      <div className="absolute top-[55%] right-[8%] z-[2] opacity-45">
        <Butterfly size={38} color="#ff6b9d" delay={1} />
      </div>
      <div className="absolute top-[38%] left-[3%] z-[2] opacity-25">
        <Butterfly size={22} color="#c77dff" delay={3} />
      </div>
      <div className="absolute bottom-[40%] right-[20%] z-[2] opacity-30">
        <Butterfly size={30} color="#e91e8c" delay={5} />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-[3] text-center px-4 max-w-5xl mx-auto"
      >
        {/* Logo butterfly */}
        <motion.div
          initial={{ opacity: 0, y: -50, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Butterfly size={100} color="#e91e8c" delay={0} />
            <div className="absolute inset-0 blur-2xl bg-eden-pink/40 rounded-full scale-150" />
          </div>
        </motion.div>

        {/* Title with character animation */}
        <motion.h1
          className="font-script text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] gradient-text mb-4 leading-none"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -90 },
                visible: { opacity: 1, y: 0, rotateX: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-px w-16 bg-gradient-to-r from-transparent to-eden-rose origin-left"
          />
          <Sparkles size={16} className="text-eden-rose" />
          <GlitchText text="Ongles & Coiffure" className="text-eden-rose/90 tracking-[0.5em] uppercase text-xs sm:text-sm font-medium" />
          <Sparkles size={16} className="text-eden-rose" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-px w-16 bg-gradient-to-l from-transparent to-eden-rose origin-right"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          <Typewriter text="Découvrez l'art de la beauté dans un cadre luxueux et apaisant." delay={1200} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticButton>
            <a
              href="#booking"
              className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-eden-pink to-eden-purple text-white font-medium text-sm tracking-wide overflow-hidden transition-all hover:shadow-2xl hover:shadow-eden-pink/50 inline-flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={16} />
                Réserver maintenant
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-eden-purple to-eden-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#services"
              className="group relative px-10 py-5 rounded-full border border-white/20 text-white/80 font-medium text-sm tracking-wide hover:bg-white/5 hover:border-white/40 transition-all inline-flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Nos services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-eden-pink/10 to-eden-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3]"
      >
        <a href="#services" className="flex flex-col items-center gap-3 text-white/30 hover:text-white/60 transition-colors group">
          <span className="text-[10px] tracking-[0.4em] uppercase font-medium">Découvrir</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2 group-hover:border-white/40 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-eden-rose"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
