import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Sarah M.', role: 'Cliente régulière', text: 'Un salon d\'une élégance rare ! L\'équipe est aux petits soins et le résultat est toujours impeccable.', rating: 5, avatar: 'S', color: '#e91e8c' },
  { name: 'Leila K.', role: 'Mariée', text: 'J\'ai fait appel à Eden Beauty pour mon mariage et c\'était magique. Ma coiffure et ma manucure étaient parfaites !', rating: 5, avatar: 'L', color: '#ff6b9d' },
  { name: 'Nadia B.', role: 'Cliente VIP', text: 'Le pack beauté est une merveille. 3 heures de pur bonheur dans un cadre luxueux.', rating: 5, avatar: 'N', color: '#c77dff' },
  { name: 'Amel T.', role: 'Cliente', text: 'Le nail art ici est d\'un niveau exceptionnel. Les designs sont créatifs, précis et tiennent parfaitement.', rating: 5, avatar: 'A', color: '#7b1fa2' },
  { name: 'Rania H.', role: 'Cliente régulière', text: 'Ambiance zen, produits de qualité et professionnelles compétentes. Mon rendez-vous incontournable.', rating: 5, avatar: 'R', color: '#e91e8c' },
];

export default function Carousel3D() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  const getCardStyle = (index: number) => {
    const diff = index - current;
    const normalizedDiff = ((diff % testimonials.length) + testimonials.length) % testimonials.length;
    const adjustedDiff = normalizedDiff > testimonials.length / 2 ? normalizedDiff - testimonials.length : normalizedDiff;

    const angle = adjustedDiff * 45;
    const translateZ = adjustedDiff === 0 ? 200 : 100 - Math.abs(adjustedDiff) * 50;
    const translateX = adjustedDiff * 320;
    const opacity = adjustedDiff === 0 ? 1 : 0.4;
    const scale = adjustedDiff === 0 ? 1 : 0.8;

    return {
      transform: `perspective(1200px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${angle}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - Math.abs(adjustedDiff),
    };
  };

  return (
    <section id="testimonials" className="relative py-28 sm:py-36 overflow-hidden" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
      <div className="absolute inset-0 bg-gradient-to-b from-eden-dark via-[#150820] to-eden-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-eden-rose text-sm tracking-[0.3em] uppercase font-medium">Avis Clients</span>
          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl gradient-text mt-4">Témoignages</h2>
        </div>

        <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: 1200 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              animate={getCardStyle(i)}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-[320px] sm:w-[380px] glass-pink rounded-3xl p-8 text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Quote size={32} className="text-eden-pink/20 mx-auto mb-4" />
              <p className="font-serif text-lg text-white/70 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #7b1fa2)` }}
                >
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-gradient-to-r from-eden-pink to-eden-purple' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
