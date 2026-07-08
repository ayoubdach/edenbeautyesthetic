import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Award, Users, Clock, Star } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';

const stats = [
  { icon: Users, value: 2500, suffix: '+', label: 'Clientes satisfaites' },
  { icon: Award, value: 8, suffix: '+', label: 'Années d\'expérience' },
  { icon: Star, value: 49, suffix: '/50', label: 'Note moyenne', isDecimal: true },
  { icon: Clock, value: 15, suffix: '+', label: 'Services proposés' },
];

export default function About() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-eden-dark via-[#120618] to-eden-dark" />

      {/* Decorative floating elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-eden-pink/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-eden-purple/5 rounded-full blur-[100px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block text-eden-rose text-sm tracking-[0.3em] uppercase font-medium mb-4"
            >
              À Propos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-script text-5xl sm:text-6xl md:text-7xl gradient-text mb-8"
            >
              Notre Histoire
            </motion.h2>

            <div className="space-y-5 font-serif text-lg text-white/50 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                Fondé avec une passion débordante pour l'art de la beauté, Eden Beauty est bien plus qu'un simple salon. C'est un sanctuaire où chaque femme peut se sentir spéciale et choyée.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                Nos expertes en onglerie et coiffure allient technique impeccable et créativité sans limite pour vous offrir des résultats à la hauteur de vos attentes.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                Nous utilisons uniquement des produits de qualité professionnelle, sélectionnés avec soin pour préserver la santé de vos ongles et de vos cheveux.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <MagneticButton>
                <a
                  href="#booking"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-eden-pink to-eden-purple text-white font-medium text-sm hover:shadow-lg hover:shadow-eden-pink/30 transition-all inline-block"
                >
                  Prendre rendez-vous
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#gallery"
                  className="px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-medium text-sm hover:bg-white/5 transition-all inline-block"
                >
                  Voir nos réalisations
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right - Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image with parallax */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] mb-6">
              <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                <img
                  src="/images/about-bg.jpg"
                  alt="Eden Beauty Salon"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-eden-dark/80 via-transparent to-transparent" />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute bottom-6 left-6 glass-pink rounded-2xl px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-eden-pink to-eden-purple flex items-center justify-center">
                    <Star size={18} className="text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Excellence</p>
                    <p className="text-white/40 text-xs">Reconnue depuis 2016</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="glass-pink rounded-2xl p-5 text-center group hover:bg-eden-pink/10 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-eden-pink/20 to-eden-purple/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon size={20} className="text-eden-rose" />
                  </div>
                  <div className="font-script text-3xl sm:text-4xl gradient-text mb-1">
                    {stat.isDecimal ? (
                      <span><AnimatedCounter target={stat.value} duration={2500} suffix="" />{stat.suffix}</span>
                    ) : (
                      <AnimatedCounter target={stat.value} duration={2500} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="text-white/40 text-[11px] tracking-wide uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
