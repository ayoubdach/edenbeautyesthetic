import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Sarah M.', role: 'Cliente régulière', text: 'Un salon d\'une élégance rare ! L\'équipe est aux petits soins et le résultat est toujours impeccable. Mes ongles n\'ont jamais été aussi beaux.', rating: 5, avatar: 'S' },
  { name: 'Leila K.', role: 'Mariée', text: 'J\'ai fait appel à Eden Beauty pour mon mariage et c\'était magique. Ma coiffure et ma manucure étaient exactement comme je les imaginais. Merci infiniment !', rating: 5, avatar: 'L' },
  { name: 'Nadia B.', role: 'Cliente VIP', text: 'Le pack beauté est une merveille. 3 heures de pur bonheur dans un cadre luxueux. Je recommande à toutes mes amies.', rating: 5, avatar: 'N' },
  { name: 'Amel T.', role: 'Cliente', text: 'Le nail art ici est d\'un niveau exceptionnel. Les designs sont créatifs, précis et tiennent parfaitement dans le temps. Une vraie artiste !', rating: 5, avatar: 'A' },
  { name: 'Rania H.', role: 'Cliente régulière', text: 'Ambiance zen, produits de qualité et professionnelles compétentes. Eden Beauty est devenu mon rendez-vous beauté mensuel incontournable.', rating: 5, avatar: 'R' },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  return (
    <section id="testimonials" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-eden-dark via-[#150820] to-eden-dark" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-eden-pink/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-eden-purple/5 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-eden-rose text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Avis Clients
          </span>
          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl gradient-text mb-6">
            Témoignages
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative min-h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-pink rounded-3xl p-8 sm:p-12 text-center w-full max-w-3xl mx-auto"
              >
                <Quote size={36} className="text-eden-pink/20 mx-auto mb-6" />

                <p className="font-serif text-xl sm:text-2xl text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                  "{testimonials[current].text}"
                </p>

                <div className="flex items-center justify-center gap-1 mb-5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eden-pink to-eden-purple flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[current].avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif text-lg text-white">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-eden-rose/60 text-xs">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className="flex gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
                  style={{ width: index === current ? 32 : 10 }}
                >
                  <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                    index === current ? 'bg-gradient-to-r from-eden-pink to-eden-purple' : 'bg-white/20 hover:bg-white/30'
                  }`} />
                  {index === current && isAutoPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: 'linear' }}
                      key={`progress-${current}`}
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
