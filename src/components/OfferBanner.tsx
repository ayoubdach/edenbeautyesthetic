import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Crown } from 'lucide-react';

export default function OfferBanner() {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.6 }}
      className="fixed top-20 left-0 right-0 z-40 px-4"
    >
      <div className="max-w-xl mx-auto">
        <div className="glass-pink rounded-2xl p-4 flex items-center justify-between gap-4 shadow-lg shadow-eden-pink/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center shrink-0">
              <Crown size={18} className="text-amber-300" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">👑 Offre Privilège Clientes Fidèles</p>
              <p className="text-white/40 text-xs">Jusqu'à 40% de réduction sur tous les services</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex gap-1.5">
              {[
                { value: timeLeft.hours, label: 'h' },
                { value: timeLeft.minutes, label: 'm' },
                { value: timeLeft.seconds, label: 's' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <span className="text-eden-rose font-mono text-sm font-bold">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-white/20 text-[9px]">{item.label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-white/20 hover:text-white/50 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
