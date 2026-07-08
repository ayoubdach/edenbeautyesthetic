import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Heart, Scissors, Gem, Flower2, Droplets, Leaf, ScissorsLineDashed, Paintbrush, Palette } from 'lucide-react';

const services = [
  { icon: Paintbrush, title: 'Pose Vernis', desc: 'Vernis classique ou semi-permanent', price: '20', old: '30', image: '/images/nails-service.jpg', gem: '💎' },
  { icon: Sparkles, title: 'Mini Soin', desc: 'Coup d\'éclat express', price: '10', old: '15', image: '/images/pedicure-service.jpg', gem: '✨' },
  { icon: Scissors, title: 'Brushing', desc: 'Volume & brillance', price: '12', old: '18', image: '/images/hair-service.jpg', gem: '💇‍♀️' },
  { icon: Heart, title: 'Pack Main & Pied', desc: 'Forfait complet beauté', price: '50', old: '70', image: '/images/pedicure-service.jpg', gem: '👐' },
  { icon: Gem, title: 'Capsule Américaine', desc: 'Qualité supérieure', price: '40', old: '55', image: '/images/gallery-1.jpg', gem: '💅' },
  { icon: Flower2, title: 'Soin Visage', desc: 'Hydratation & éclat', price: '40', old: '55', image: '/images/gallery-2.jpg', gem: '🌸' },
  { icon: Droplets, title: 'Épilation Corps', desc: 'Techniques douces', price: '60', old: '80', image: '/images/gallery-3.jpg', gem: '🌿' },
  { icon: Leaf, title: 'Soin Capillaire', desc: 'Nourrissant & réparateur', price: '40', old: '55', image: '/images/gallery-5.jpg', gem: '🍃' },
  { icon: ScissorsLineDashed, title: 'Kératine', desc: 'Lissage parfait', price: '120', old: '160', image: '/images/hair-service.jpg', gem: '✂️' },
  { icon: Palette, title: 'Coloration & Mèche', desc: 'Look unique', price: '180', old: '220', image: '/images/gallery-3.jpg', gem: '🎨' },
];

function CrystalCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setRotate({ x: y, y: x });
    setShinePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShinePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden group cursor-pointer"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Crystal shine overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eden-rose/30 to-transparent" />

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0210] via-[#0a0210]/50 to-transparent" />

          {/* Gem emoji */}
          <div className="absolute top-3 left-3 text-2xl drop-shadow-lg">{service.gem}</div>

          {/* Discount badge */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/80 to-orange-500/80 text-white text-[10px] font-bold tracking-wider">
            -{Math.round((1 - parseInt(service.price) / parseInt(service.old)) * 100)}%
          </div>
        </div>

        {/* Content */}
        <div className="p-5 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-xl text-white group-hover:text-eden-rose transition-colors">
              {service.title}
            </h3>
            <service.icon size={16} className="text-eden-rose/50" />
          </div>
          <p className="text-white/30 text-xs mb-4">{service.desc}</p>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{service.price}</span>
              <span className="text-xs text-white/40">DT</span>
              <span className="text-xs text-white/20 line-through ml-1">{service.old} DT</span>
            </div>
            <a
              href="#booking"
              className="text-[10px] text-eden-rose/60 hover:text-eden-rose uppercase tracking-wider transition-colors"
            >
              Réserver →
            </a>
          </div>
        </div>

        {/* Bottom glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eden-pink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export default function CrystalCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050208] via-[#0a0412] to-[#050208]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
          >
            <span className="text-amber-300 text-xs tracking-[0.2em] uppercase font-medium">
              👑 Offre Privilège · Clientes Fidèles
            </span>
          </motion.div>

          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl gradient-text mb-4">
            Nos Soins
          </h2>
          <p className="font-serif text-lg text-white/40 max-w-xl mx-auto">
            Chaque prestation est un rituel de beauté, pensé pour vous.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {services.map((service, index) => (
            <CrystalCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
