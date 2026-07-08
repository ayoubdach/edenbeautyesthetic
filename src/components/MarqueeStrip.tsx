import Marquee from 'react-fast-marquee';

const words = ['✨', 'Pose Vernis', '💅', 'Brushing', '🦋', 'Kératine', '✨', 'Soin Visage', '💎', 'Coloration', '🌸', 'Épilation', '✨', 'Nail Art', '👑', 'Manar City'];

export default function MarqueeStrip() {
  return (
    <div className="relative py-6 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-eden-dark via-transparent to-eden-dark z-10 pointer-events-none" />
      <Marquee speed={40} gradient={false} className="overflow-hidden">
        {words.map((word, i) => (
          <span
            key={i}
            className={`mx-8 text-lg font-serif tracking-wide ${
              i % 2 === 0 ? 'text-white/20' : 'text-eden-rose/30'
            }`}
          >
            {word}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
