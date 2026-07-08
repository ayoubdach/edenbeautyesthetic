import { motion } from 'framer-motion';

const orbs = [
  { size: 300, color: '#e91e8c', x: '10%', y: '20%', delay: 0 },
  { size: 200, color: '#7b1fa2', x: '80%', y: '60%', delay: 2 },
  { size: 250, color: '#ff6b9d', x: '60%', y: '10%', delay: 4 },
  { size: 180, color: '#c77dff', x: '30%', y: '70%', delay: 1 },
  { size: 150, color: '#e91e8c', x: '85%', y: '30%', delay: 3 },
];

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}15, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 20,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
