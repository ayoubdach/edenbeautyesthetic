import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Clock, Star, Users, Gem } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Produits Certifiés', desc: 'Qualité professionnelle' },
  { icon: Award, label: '8 Ans d\'Expérience', desc: 'Excellence reconnue' },
  { icon: Clock, label: 'Ouvert 7j/7', desc: '10h - 21h' },
  { icon: Star, label: '4.9/5 Étoiles', desc: '2500+ avis' },
  { icon: Users, label: 'Clientes Fidèles', desc: 'Programme VIP' },
  { icon: Gem, label: 'Soins Premium', desc: 'Résultats garantis' },
];

function LiveCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      start = Math.floor(ease * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function TrustBadges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0412] via-[#0d0518] to-[#0a0412]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social proof header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-green-400/80 text-xs tracking-wider">En ligne maintenant</span>
          </div>
          <p className="text-white/30 text-sm">
            <LiveCounter target={247} /> clientes ont réservé ce mois-ci
          </p>
        </motion.div>

        {/* Badges grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group text-center p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-eden-pink/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eden-pink/10 to-eden-purple/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <badge.icon size={18} className="text-eden-rose/70" />
              </div>
              <p className="text-white/70 text-xs font-medium mb-0.5">{badge.label}</p>
              <p className="text-white/25 text-[10px]">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
