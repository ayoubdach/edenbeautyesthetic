import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Heart, Scissors, Gem, Flower2, Droplets, Leaf, ScissorsLineDashed, Paintbrush, Palette } from 'lucide-react';
import MagneticButton from './MagneticButton';
import HolographicCard from './HolographicCard';
import RippleClick from './RippleClick';

const services = [
  { icon: Paintbrush, title: 'Pose Vernis', description: 'Pose de vernis classique ou semi-permanent avec soin des cuticules pour des ongles impeccables.', price: '20 DT', oldPrice: '30 DT', image: '/images/nails-service.jpg' },
  { icon: Sparkles, title: 'Mini Soin', description: 'Soin express pour un coup d\'éclat rapide. Parfait pour celles qui sont pressées.', price: '10 DT', oldPrice: '15 DT', image: '/images/pedicure-service.jpg' },
  { icon: Scissors, title: 'Brushing', description: 'Brushing professionnel pour donner du volume et de la brillance à votre chevelure.', price: '12 DT', oldPrice: '18 DT', image: '/images/hair-service.jpg' },
  { icon: Heart, title: 'Pack Main & Pied', description: 'Forfait complet incluant soin des mains et des pieds pour une beauté totale.', price: '50 DT', oldPrice: '70 DT', image: '/images/pedicure-service.jpg' },
  { icon: Gem, title: 'Capsule Américaine VP', description: 'Pose de capsules américaines de qualité supérieure pour des ongles longs et élégants.', price: '40 DT', oldPrice: '55 DT', image: '/images/gallery-1.jpg' },
  { icon: Flower2, title: 'Soin Visage', description: 'Soin du visage complet pour hydrater, purifier et illuminer votre peau.', price: '40 DT', oldPrice: '55 DT', image: '/images/gallery-2.jpg' },
  { icon: Droplets, title: 'Épilation Corps', description: 'Épilation complète du corps avec des techniques douces et des produits de qualité.', price: '60 DT', oldPrice: '80 DT', image: '/images/gallery-3.jpg' },
  { icon: Leaf, title: 'Soin Capillaire', description: 'Traitement nourrissant et réparateur pour des cheveux sains et brillants.', price: '40 DT', oldPrice: '55 DT', image: '/images/gallery-5.jpg' },
  { icon: ScissorsLineDashed, title: 'Kératine', description: 'Lissage à la kératine pour des cheveux lisses, brillants et faciles à coiffer.', price: '120 DT', oldPrice: '160 DT', image: '/images/hair-service.jpg' },
  { icon: Palette, title: 'Coloration & Mèche', description: 'Coloration professionnelle et mèches personnalisées pour un look unique.', price: '180 DT', oldPrice: '220 DT', image: '/images/gallery-3.jpg' },
];

function TiltCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <RippleClick>
      <HolographicCard className="rounded-2xl">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-2xl overflow-hidden glass-pink transition-transform duration-300 ease-out will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
          }}
        />

        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-eden-dark via-eden-dark/50 to-transparent" />
          <div className="absolute top-3 right-3 w-10 h-10 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
            <service.icon size={18} className="text-eden-rose" />
          </div>
          {/* Discount badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/80 to-orange-500/80 text-white text-[10px] font-bold tracking-wider uppercase">
            Promo
          </div>
        </div>

        {/* Content */}
        <div className="p-5 relative z-10">
          <h3 className="font-serif text-xl text-white mb-2 group-hover:text-eden-rose transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">
            {service.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-eden-rose font-bold text-xl">{service.price}</span>
              <span className="text-white/25 text-xs line-through">{service.oldPrice}</span>
            </div>
            <MagneticButton>
              <a
                href="#booking"
                className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-white/5"
              >
                Réserver →
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Hover glow border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 80px rgba(233, 30, 140, 0.08), 0 0 40px rgba(233, 30, 140, 0.1)' }}
        />
      </div>
      </HolographicCard>
      </RippleClick>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-eden-dark via-[#150820] to-eden-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/25 mb-8"
          >
            <span className="text-lg">👑</span>
            <span className="text-amber-300 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
              Offre Privilège · Clientes Fidèles
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-block text-eden-rose text-sm tracking-[0.3em] uppercase font-medium mb-4"
          >
            Nos Prestations
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-script text-5xl sm:text-6xl md:text-7xl gradient-text mb-6"
          >
            Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="font-serif text-lg text-white/50 max-w-2xl mx-auto"
          >
            Des soins sur mesure pour révéler votre beauté naturelle. Chaque prestation est réalisée avec passion et expertise.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <TiltCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
