import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, x)));
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-eden-dark via-[#0d0415] to-eden-dark" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-eden-rose text-sm tracking-[0.3em] uppercase font-medium">Avant / Après</span>
          <h2 className="font-script text-5xl sm:text-6xl gradient-text mt-4">Transformation</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden select-none"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* After image (full width) */}
          <div className="relative aspect-[16/9]">
            <img
              src="/images/hair-service.jpg"
              alt="Après"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-eden-pink/80 text-white text-xs font-medium">
              Après
            </span>
          </div>

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="/images/gallery-5.jpg"
              alt="Avant"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${100 / (sliderPosition / 100)}%` }}
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
              Avant
            </span>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white/50 cursor-ew-resize"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-4 bg-eden-dark/30 rounded-full" />
                <div className="w-0.5 h-4 bg-eden-dark/30 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
