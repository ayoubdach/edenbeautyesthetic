import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Eye } from 'lucide-react';

const galleryImages = [
  { src: '/images/nails-service.jpg', title: 'Manucure Élégante', category: 'Ongles' },
  { src: '/images/hair-service.jpg', title: 'Coiffure Glamour', category: 'Cheveux' },
  { src: '/images/pedicure-service.jpg', title: 'Pédicure Spa', category: 'Ongles' },
  { src: '/images/gallery-1.jpg', title: 'Nail Art Floral', category: 'Ongles' },
  { src: '/images/gallery-2.jpg', title: 'Chignon Romantique', category: 'Cheveux' },
  { src: '/images/gallery-3.jpg', title: 'Coloration Tendance', category: 'Cheveux' },
  { src: '/images/gallery-4.jpg', title: 'Nail Art 3D', category: 'Ongles' },
  { src: '/images/gallery-5.jpg', title: 'Brushing Volume', category: 'Cheveux' },
  { src: '/images/gallery-6.jpg', title: 'Spa Pédicure', category: 'Ongles' },
];

function GalleryItem({ image, index }: { image: typeof galleryImages[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="gallery-item relative rounded-xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with reveal animation */}
      <div className="relative overflow-hidden" style={{ minHeight: index % 3 === 0 ? '320px' : index % 3 === 1 ? '260px' : '290px' }}>
        <motion.img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
        />

        {/* Reveal overlay */}
        <motion.div
          initial={{ y: 0 }}
          animate={isInView ? { y: '-100%' } : {}}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-eden-dark z-10"
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-eden-dark/95 via-eden-dark/40 to-transparent z-20 flex flex-col justify-end p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-eden-rose text-[10px] tracking-[0.3em] uppercase font-medium mb-1"
          >
            {image.category}
          </motion.span>
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="font-serif text-xl text-white"
          >
            {image.title}
          </motion.h3>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            <ZoomIn size={16} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-eden-rose/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-eden-rose/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-eden-dark via-[#0f0515] to-eden-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-eden-rose text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Portfolio
          </span>
          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl gradient-text mb-6">
            Galerie
          </h2>
          <p className="font-serif text-lg text-white/50 max-w-2xl mx-auto">
            Quelques unes de nos créations. Chaque réalisation est unique et personnalisée selon vos envies.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {galleryImages.map((image, index) => (
            <div key={image.src} onClick={() => setSelectedImage(image)} className="break-inside-avoid">
              <GalleryItem image={image} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-14 right-0 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full"
                />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <span className="text-eden-rose text-[10px] tracking-[0.3em] uppercase">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif text-2xl text-white mt-1">
                    {selectedImage.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-white/30 text-sm">
                  <Eye size={16} />
                  <span>Aperçu</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
