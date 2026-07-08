import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import MagneticButton from './MagneticButton';

const WHATSAPP_NUMBER = '21626444561';

const services = [
  'Pose Vernis', 'Mini Soin', 'Brushing', 'Pack Main & Pied',
  'Capsule Américaine VP', 'Soin Visage', 'Épilation Corps',
  'Soin Capillaire', 'Kératine', 'Coloration & Mèche',
];

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00',
];

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
}

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', date: '', time: '', notes: '',
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.service) newErrors.service = 'Veuillez choisir un service';
    if (!formData.date) newErrors.date = 'Veuillez choisir une date';
    if (!formData.time) newErrors.time = 'Veuillez choisir une heure';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      '👋 Bonjour Eden Beauty !',
      '',
      '✨ Je souhaite réserver un rendez-vous :',
      '',
      `👤 *Nom* : ${formData.name || 'Non renseigné'}`,
      `📞 *Téléphone* : ${formData.phone || 'Non renseigné'}`,
    ];
    if (formData.email) lines.push(`📧 *Email* : ${formData.email}`);
    lines.push(
      `💅 *Service* : ${formData.service || 'Non renseigné'}`,
      `📅 *Date* : ${formData.date || 'Non renseignée'}`,
      `⏰ *Heure* : ${formData.time || 'Non renseignée'}`
    );
    if (formData.notes) lines.push(`📝 *Notes* : ${formData.notes}`);
    lines.push('', 'Merci de me confirmer ma réservation ! 🙏', '', '— Envoyé depuis edenbeauty.tn');
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Confetti explosion
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ['#e91e8c', '#ff6b9d', '#c77dff', '#7b1fa2', '#25D366'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNewBooking = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' });
    setErrors({});
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-white/25 transition-all duration-300 ${
      errors[field as keyof FormErrors]
        ? 'border-red-400/50 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.1)]'
        : focusedField === field
        ? 'border-eden-pink/50 shadow-[0_0_0_3px_rgba(233,30,140,0.1)]'
        : 'border-white/10 hover:border-white/20'
    }`;

  return (
    <section id="booking" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-eden-dark via-[#120618] to-eden-dark" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-eden-rose text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Réservez
          </span>
          <h2 className="font-script text-5xl sm:text-6xl md:text-7xl gradient-text mb-6">
            Réservation
          </h2>
          <p className="font-serif text-lg text-white/50 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous et votre demande sera envoyée directement sur WhatsApp.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-pink rounded-3xl p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-eden-pink/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-eden-purple/10 rounded-full blur-3xl" />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-14 relative z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/10 flex items-center justify-center mx-auto mb-8"
                >
                  <MessageCircle size={48} className="text-[#25D366]" />
                </motion.div>
                <h3 className="font-script text-4xl gradient-text mb-4">
                  Message envoyé !
                </h3>
                <p className="text-white/50 font-serif text-lg max-w-md mx-auto mb-2">
                  Votre demande de réservation a été envoyée sur WhatsApp.
                </p>
                <p className="text-white/30 text-sm max-w-md mx-auto">
                  Nous vous répondrons très prochainement pour confirmer votre rendez-vous.
                </p>
                <MagneticButton>
                  <button
                    onClick={handleNewBooking}
                    className="mt-10 px-8 py-3.5 rounded-full border border-white/20 text-white/80 hover:bg-white/5 transition-all"
                  >
                    Nouvelle réservation
                  </button>
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/50 text-sm mb-2 flex items-center gap-2">
                      <User size={14} className="text-eden-rose" />
                      Nom complet *
                    </label>
                    <input
                      type="text" name="name" required
                      value={formData.name} onChange={handleChange}
                      onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                      className={inputClass('name')}
                      placeholder="Votre nom"
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-2 flex items-center gap-2">
                      <Phone size={14} className="text-eden-rose" />
                      Téléphone *
                    </label>
                    <input
                      type="tel" name="phone" required
                      value={formData.phone} onChange={handleChange}
                      onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                      className={inputClass('phone')}
                      placeholder="+216 XX XXX XXX"
                    />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-2 flex items-center gap-2">
                    <Mail size={14} className="text-eden-rose" />
                    Email
                  </label>
                  <input
                    type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    className={inputClass('email')}
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-eden-rose" />
                    Service souhaité *
                  </label>
                  <select
                    name="service" required
                    value={formData.service} onChange={handleChange}
                    onFocus={() => setFocusedField('service')} onBlur={() => setFocusedField(null)}
                    className={inputClass('service')}
                  >
                    <option value="" className="bg-eden-dark">Choisir un service</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-eden-dark">{s}</option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.service && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.service}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/50 text-sm mb-2 flex items-center gap-2">
                      <Calendar size={14} className="text-eden-rose" />
                      Date préférée *
                    </label>
                    <input
                      type="date" name="date" required
                      value={formData.date} onChange={handleChange}
                      onFocus={() => setFocusedField('date')} onBlur={() => setFocusedField(null)}
                      className={inputClass('date')}
                    />
                    <AnimatePresence>
                      {errors.date && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.date}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-2 flex items-center gap-2">
                      <Clock size={14} className="text-eden-rose" />
                      Heure préférée *
                    </label>
                    <select
                      name="time" required
                      value={formData.time} onChange={handleChange}
                      onFocus={() => setFocusedField('time')} onBlur={() => setFocusedField(null)}
                      className={inputClass('time')}
                    >
                      <option value="" className="bg-eden-dark">Choisir une heure</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t} className="bg-eden-dark">{t}</option>
                      ))}
                    </select>
                    <AnimatePresence>
                      {errors.time && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.time}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-2">Notes (optionnel)</label>
                  <textarea
                    name="notes" rows={3}
                    value={formData.notes} onChange={handleChange}
                    onFocus={() => setFocusedField('notes')} onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 transition-all duration-300 focus:border-eden-pink/50 focus:shadow-[0_0_0_3px_rgba(233,30,140,0.1)] resize-none hover:border-white/20"
                    placeholder="Décrivez vos envies ou demandes spéciales..."
                  />
                </div>

                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-medium text-sm tracking-wide hover:shadow-lg hover:shadow-[#25D366]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Envoyer sur WhatsApp
                  </button>
                </MagneticButton>

                <p className="text-center text-white/25 text-xs">
                  En cliquant, vous serez redirigé vers WhatsApp avec votre message pré-rempli.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
