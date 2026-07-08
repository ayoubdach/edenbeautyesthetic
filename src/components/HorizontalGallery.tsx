import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  { src: '/images/nails-service.jpg', title: 'Manucure', subtitle: 'Élégance' },
  { src: '/images/hair-service.jpg', title: 'Coiffure', subtitle: 'Glamour' },
  { src: '/images/pedicure-service.jpg', title: 'Pédicure', subtitle: 'Bien-être' },
  { src: '/images/gallery-1.jpg', title: 'Nail Art', subtitle: 'Créativité' },
  { src: '/images/gallery-2.jpg', title: 'Chignon', subtitle: 'Romance' },
  { src: '/images/gallery-3.jpg', title: 'Coloration', subtitle: 'Tendance' },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      <div className="mb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <span className="text-eden-rose text-sm tracking-[0.3em] uppercase font-medium">Défilement</span>
        <h2 className="font-script text-4xl sm:text-5xl gradient-text mt-2">Nos Réalisations</h2>
      </div>

      <motion.div style={{ x }} className="flex gap-6 pl-8">
        {[...images, ...images].map((img, i) => (
          <motion.div
            key={i}
            className="relative shrink-0 w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-eden-dark/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-eden-rose/60 text-xs tracking-[0.3em] uppercase">{img.subtitle}</p>
              <h3 className="font-script text-3xl text-white mt-1">{img.title}</h3>
            </div>
            {/* Hover line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-eden-pink to-eden-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
