import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, User, Sparkles, MessageCircle, AlertCircle, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';

const WHATSAPP_NUMBER = '21626444561';
const services = ['Pose Vernis', 'Mini Soin', 'Brushing', 'Pack Main & Pied', 'Capsule Américaine VP', 'Soin Visage', 'Épilation Corps', 'Soin Capillaire', 'Kératine', 'Coloration & Mèche'];
const times = ['10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

export default function VIPBooking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Votre nom, princesse';
    if (!form.phone.trim()) e.phone = 'Votre numéro';
    if (!form.service) e.service = 'Choisissez votre soin';
    if (!form.date) e.date = 'Choisissez votre jour';
    if (!form.time) e.time = 'Choisissez votre heure';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const lines = [
      '👑 *RÉSERVATION VIP — EDEN BEAUTY*',
      '',
      `👤 Nom : ${form.name}`,
      `📞 Téléphone : ${form.phone}`,
      form.email && `📧 Email : ${form.email}`,
      `💅 Service : ${form.service}`,
      `📅 Date : ${form.date}`,
      `⏰ Heure : ${form.time}`,
      form.notes && `📝 Notes : ${form.notes}`,
      '',
      '✨ Merci de confirmer ma réservation !',
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage()}`, '_blank');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#e91e8c', '#ffd700', '#ff6b9d', '#c77dff'] });
    setSubmitted(true);
  };

  const input = (name: string, placeholder: string, type = 'text', required = true) => (
    <div>
      <input
        type={type} name={name} required={required}
        value={form[name as keyof typeof form]} placeholder={placeholder}
        onChange={(e) => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: '' }); }}
        className={`w-full px-5 py-4 rounded-xl bg-white/[0.03] border text-white placeholder-white/20 text-sm transition-all duration-300 ${
          errors[name] ? 'border-red-400/40 focus:border-red-400' : 'border-white/5 focus:border-eden-pink/40'
        }`}
      />
      <AnimatePresence>
        {errors[name] && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400/70 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle size={10} /> {errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section id="booking" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050208] via-[#0a0412] to-[#050208]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-eden-pink/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-lg mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <Crown size={32} className="text-amber-400/60 mx-auto mb-4" />
          <h2 className="font-script text-5xl sm:text-6xl gradient-text mb-3">Votre Pass VIP</h2>
          <p className="text-white/30 text-sm">Remplissez votre invitation. Nous vous confirmons sur WhatsApp.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.8 }}
          className="relative rounded-3xl p-8 sm:p-10"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 80px rgba(233,30,140,0.05), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Golden corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-amber-500/20 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-amber-500/20 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-amber-500/20 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-amber-500/20 rounded-br-3xl" />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle size={40} className="text-[#25D366]" />
                </div>
                <h3 className="font-script text-3xl gradient-text mb-2">Invitation envoyée !</h3>
                <p className="text-white/40 text-sm mb-6">Votre demande est partie vers WhatsApp. À très vite !</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' }); setErrors({}); }}
                  className="px-6 py-2.5 rounded-full border border-white/10 text-white/50 text-sm hover:bg-white/5 transition-all">
                  Nouvelle réservation
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="flex items-center gap-2 text-amber-400/60 text-xs tracking-wider uppercase mb-2">
                  <User size={12} /> Identité
                </div>
                {input('name', 'Votre prénom & nom *')}
                {input('phone', 'Votre numéro WhatsApp *', 'tel')}
                {input('email', 'Votre email', 'email', false)}

                <div className="flex items-center gap-2 text-amber-400/60 text-xs tracking-wider uppercase mb-2 pt-2">
                  <Sparkles size={12} /> Votre Soin
                </div>
                <div>
                  <select name="service" value={form.service} onChange={(e) => { setForm({ ...form, service: e.target.value }); setErrors({ ...errors, service: '' }); }}
                    className={`w-full px-5 py-4 rounded-xl bg-white/[0.03] border text-white text-sm appearance-none cursor-pointer transition-all ${errors.service ? 'border-red-400/40' : 'border-white/5 focus:border-eden-pink/40'}`}>
                    <option value="" className="bg-[#0a0412]">Choisir un soin *</option>
                    {services.map((s) => <option key={s} value={s} className="bg-[#0a0412]">{s}</option>)}
                  </select>
                  <AnimatePresence>
                    {errors.service && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400/70 text-xs mt-1.5"><AlertCircle size={10} className="inline mr-1" />{errors.service}</motion.p>}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 text-amber-400/60 text-xs tracking-wider uppercase mb-2 pt-2">
                  <Calendar size={12} /> Date & Heure
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input type="date" name="date" required value={form.date} onChange={(e) => { setForm({ ...form, date: e.target.value }); setErrors({ ...errors, date: '' }); }}
                      className={`w-full px-4 py-4 rounded-xl bg-white/[0.03] border text-white text-sm transition-all ${errors.date ? 'border-red-400/40' : 'border-white/5 focus:border-eden-pink/40'}`} />
                    {errors.date && <p className="text-red-400/70 text-xs mt-1"><AlertCircle size={10} className="inline mr-1" />{errors.date}</p>}
                  </div>
                  <div>
                    <select name="time" required value={form.time} onChange={(e) => { setForm({ ...form, time: e.target.value }); setErrors({ ...errors, time: '' }); }}
                      className={`w-full px-4 py-4 rounded-xl bg-white/[0.03] border text-white text-sm appearance-none cursor-pointer transition-all ${errors.time ? 'border-red-400/40' : 'border-white/5 focus:border-eden-pink/40'}`}>
                      <option value="" className="bg-[#0a0412]">Heure *</option>
                      {times.map((t) => <option key={t} value={t} className="bg-[#0a0412]">{t}</option>)}
                    </select>
                    {errors.time && <p className="text-red-400/70 text-xs mt-1"><AlertCircle size={10} className="inline mr-1" />{errors.time}</p>}
                  </div>
                </div>

                <textarea name="notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/5 text-white placeholder-white/20 text-sm resize-none focus:border-eden-pink/40 transition-all"
                  placeholder="Une envie particulière ? Dites-nous tout..." />

                <button type="submit"
                  className="w-full py-4 rounded-xl text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 4px 20px rgba(37,211,102,0.2)' }}>
                  <MessageCircle size={18} />
                  Envoyer sur WhatsApp
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
