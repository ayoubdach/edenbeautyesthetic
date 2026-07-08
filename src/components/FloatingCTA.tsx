import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY > heroHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="glass-pink rounded-full px-5 py-3 flex items-center gap-4 shadow-xl shadow-eden-pink/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Réservez maintenant</span>
            </div>
            <a
              href="https://wa.me/21626444561?text=Bonjour%20Eden%20Beauty%20!%20%F0%9F%91%8B"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-medium hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
