import { MapPin, Phone, Clock, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Butterfly from './Butterfly';
import MagneticButton from './MagneticButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkVariants = {
    initial: { x: 0 },
    hover: { x: 4 },
  };

  return (
    <footer className="relative pt-24 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-eden-dark to-[#050208]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <Butterfly size={32} color="#e91e8c" delay={0} />
              <span className="font-script text-3xl gradient-text">Eden Beauty</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Votre sanctuaire de beauté à Manar City. Soins d'ongles et coiffure dans un cadre luxueux et apaisant.
            </p>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-eden-rose hover:bg-eden-pink/10 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-eden-rose hover:bg-eden-pink/10 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/21626444561"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">Services</h4>
            <ul className="space-y-3">
              {['Pose Vernis', 'Mini Soin', 'Brushing', 'Pack Main & Pied', 'Capsule Américaine VP', 'Soin Visage', 'Épilation Corps', 'Soin Capillaire', 'Kératine', 'Coloration & Mèche'].map((item) => (
                <motion.li key={item} initial="initial" whileHover="hover">
                  <motion.a
                    variants={linkVariants}
                    transition={{ type: 'spring', stiffness: 400 }}
                    href="#services"
                    className="text-white/40 text-sm hover:text-eden-rose transition-colors inline-block"
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/40 text-sm group">
                <MapPin size={16} className="text-eden-rose mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white/60 transition-colors">Manar City, 3ème étage</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm group">
                <Phone size={16} className="text-eden-rose shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+21626444561" className="hover:text-eden-rose transition-colors">+216 26 444 561</a>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eden-rose shrink-0 group-hover:scale-110 transition-transform">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a href="https://wa.me/21626444561" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg text-white mb-5">Horaires</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/40 text-sm">
                <Clock size={16} className="text-eden-rose mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/60">Lundi - Dimanche</p>
                  <p className="text-white/25 text-xs mt-0.5">10:00 - 21:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Eden Beauty. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors">Politique de confidentialité</a>
            <a href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <MagneticButton>
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-eden-pink to-eden-purple text-white flex items-center justify-center shadow-lg shadow-eden-pink/30 z-50"
        >
          <ArrowUp size={20} />
        </motion.button>
      </MagneticButton>
    </footer>
  );
}
